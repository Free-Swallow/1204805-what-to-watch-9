import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {Provider} from 'react-redux';
import {store} from './store';
import {fetchMoviesAction, checkAuthAction, fetchPromoMovieAction} from './store/api-actions';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import browserHistory from './browser-history';
import HistoryRouter from './components/history-route-component/history-route-component';

store.dispatch(fetchMoviesAction());
store.dispatch(checkAuthAction());
store.dispatch(fetchPromoMovieAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App/>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
