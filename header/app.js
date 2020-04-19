const express = require('express');
const path = require("path");
const app = express();
const fs = require('fs');
const jsdom = require('jsdom');
const jquery = require('jquery');
const proxy = require('express-http-proxy');
const request = require("request");
const async =  require("async");
const port = 7000;

app.use('/dist', proxy('http://localhost:3000'));
app.use('/__webpack_hmr', proxy('http://localhost:3000'));



const getAppShell = function (req, res) {
  async.parallel([
    function getAppContent(cb) {
      request("http://localhost:3000/blog", (err, htmlFragment) => {
        cb(null, htmlFragment.body);
      })
    },
  
    function getAppShell(cb) {
      fs.readFile('./public/index.html', 'utf8', (err, data) => {
        cb(null, data);
      })
    }
  ], function(err, resultArr) {
    const appContent = resultArr[0];
    const data = resultArr[1];
    const dom = new jsdom.JSDOM(data);
    const $ = jquery(dom.window);
    $('#content-wrapper').append(appContent);
    res.send(dom.serialize());
  })
};

app.get('/', getAppShell);

app.use(express.static('public'));
app.use(express.static('files'));

app.use('/static', express.static(path.join(__dirname, 'public')))

app.listen(port, () => console.log(`listening at http://localhost:${port}`));