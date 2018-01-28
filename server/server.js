const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const ReactSSR = require('react-dom/server');
const path = require('path');
const fs = require('fs');

const isDev = process.env.NODE_ENV === 'development';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid',
  resave: false,
  saveUninitialized: false,
  secret: 'react cnode class'
}));

if (!isDev) {
  const serverEntry = require('../dist/server-entry').default;
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');
  app.use('/public', express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    const appString = ReactSSR.renderToString(serverEntry);
    res.send(template.replace('<!--app-->', appString));
  });
} else {
  const devStatic = require('./utils/dev-static');
  devStatic(app);
}

app.listen('8888', () => {
  console.log('server is listening on 8888');
});
