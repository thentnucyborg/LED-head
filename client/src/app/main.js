import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import Root from './components/Root';
import setupSocket from './services/Socket';

setupSocket({
  port: 8080,
  dispatch: store.dispatch,
});

const Main = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);

render(<Main />, document.getElementById('app'));
