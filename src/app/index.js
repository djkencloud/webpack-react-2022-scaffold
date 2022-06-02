import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
// import { Route } from 'react-router';
// import { ConnectedRouter } from 'connected-react-router';

import GlobalStyles from './global-style';
import { fetchData } from './state/slices/data';
import { setUpBrowserListeners } from './state/slices/browserUtils';

import Header from './views/header';
import Footer from './views/footer';
import Content from './views/content';

import store from './state/store-router';

const container = document.getElementById('foot');
const root = createRoot(container);

const element = (
  <Provider store={store}>
    <GlobalStyles />
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  </Provider>
);

root.render(element);

/* Start up functions */
setUpBrowserListeners();
store.dispatch(fetchData());

/*

Alt set up using routes


const element = (
  <Provider store={store}>
    <div>
      <GlobalStyles />
      <ConnectedRouter history={history}>
        <Route exact path="/" component={Content} />
        <Route exact path="/footer" component={Footer} />
        <Route exact path="/head" component={Header} />
      </ConnectedRouter>
    </div>
  </Provider>
);


*/
