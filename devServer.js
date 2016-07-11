/**
 * This is just a dummy server to facilidate our React SPA examples.
 * For a more professional setup of Express, see...
 * http://expressjs.com/en/starter/generator.html
 */

const express = require('express');
const path = require('path');
const webpack = require ('webpack');
const config = require('./webpack.config');
const app = express();
const jsonServer = require('json-server');
const db = path.resolve('./data/db.json');


const port = 3000;
const isDev = process.env.NODE_ENV !== 'production';
/**
 * Anything in public can be accessed statically without
 * this express router getting involved
 */


if (isDev) {
  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      modules: true,
      chunkModules: true
    }
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log
  }));
  app.use('/public/css', express.static(path.join(__dirname, 'public/css')));

} else {
  app.use('/public', express.static(path.join(__dirname, 'public')));
}

app.use(jsonServer.defaults());
app.use('/api', jsonServer.router(db));

app.get('*', function(req, res, next) {
  // if (!!~req.originalUrl.indexOf('/api')) {
  //
  //   // req.route('/api', jsonServer.router(db));
  //   req.pipe(jsonServer.router(db)).pipe(res);
  // } else
   if (req.accepts('html')) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
  } else next()
})


app.listen(port);

console.log('Serving: localhost:', port, 'with: ', process.env.NODE_ENV);
