import express from 'express';
import webpack from 'webpack';
import render from "./render";
const app = express();
const config = require('../../webpack.config');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true, publicPath: config.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));

app.use('/dist', express.static('dist'))

app.get("*", (req, res, next) => {
  console.log("I get called: ", req.url);
  render(req, res)
})

// -----------------------------------------------------------------------------

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
