
import App from '../shared/App'
import ReactDOMServer from 'react-dom/server';
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { StaticRouter, matchPath } from "react-router-dom";
import serialize from 'serialize-javascript';
import Routes from "../shared/routes";
import counterApp from '../shared/reducers'

const store = createStore(counterApp)


function render(req, res) {
  const currentRoute = Routes.find( route => matchPath(req.url, route) || {});
  let promise;

  if(currentRoute.loadData) {
    promise = currentRoute.loadData();
  } else promise = Promise.resolve(true);

  promise.then(data => {
    const context = { data };
    const html = ReactDOMServer.renderToString(
      <Provider store={ store }>
        <StaticRouter
          location={req.url}
          context={context}
        >
          <App />
        </StaticRouter>
      </Provider>
    )
  
    if(context.url){
      res.writeHead(301, {
        Location: context.url
      })
      res.end();
    } else {
      const preloadedState = store.getState();
      res.write(renderFullPage(html, preloadedState));
      res.end();
    }
  })
}

function renderFullPage(html, preloadedState) {
  return `
    <html>
      <body>
        <div>
          <div id="root">${html}</div>
          <script>
            window.__PRELOADED_STATE__ = ${serialize(preloadedState)}
          </script>
          <script src="dist/main.js"></script>
          <script src="dist/base.js"></script>
        </div>
      </body>
    </html>
  `
}

if (module.hot) {
  module.hot.accept();
}
export default render;