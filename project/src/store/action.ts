import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '../const';

const redirectToRoute = createAction<AppRoute>('main/redirect-to-route');

export {
  redirectToRoute
};
