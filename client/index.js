import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader'; //eslint-disable-line
import App from './views/app';

const root = document.getElementById('root');
const render = (Component) => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
  renderMethod(
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AppContainer>,
    root
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./views/app', () => {
    const NextApp = require('./views/app').default; //eslint-disable-line
    render(NextApp);
  });
}
