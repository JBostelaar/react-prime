/* eslint 'global-require': 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from 'services/registerServiceWorker';

if (!__DEV__) registerServiceWorker();

const render = () => {
  const Root = require('app/components/Root').default;
  ReactDOM.render(<Root />, document.getElementById('app'));
};

if (__DEV__ && module.hot) {
  module.hot.accept('./app/components/Root', render);
}

render();
