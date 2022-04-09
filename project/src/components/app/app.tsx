import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import ErrorScreen from '../../pages/error-screen/error-screen';
import MainStartScreen from '../../pages/main-start-screen/main-start-screen';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import MoviePageScreen from '../../pages/movie-page-screen/movie-page-screen';
import PrivateRoute from '../private-route/private-route';
import {useAppSelector} from '../../hooks';
import {isCheckedAuth} from '../../utils';
import LoadingScreen from '../loading-component/loading-component';
import HistoryRouter from '../history-route-component/history-route-component';
import browserHistory from '../../browser-history';

function App(): JSX.Element {
  const {isDataLoaded} = useAppSelector(({DATA}) => DATA);
  const {authorizationStatus} = useAppSelector(({USER}) => USER);

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainStartScreen />}
        />
        <Route
          path={AppRoute.SignIn}
          element={<SignInScreen />}
        />
        <Route path={AppRoute.Film}>
          <Route path=":id/*" element={<MoviePageScreen />} />
        </Route>
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <MyListScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.AddReview}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <AddReviewScreen />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Player}>
          <Route path=":id/*" element={<PlayerScreen />} />
        </Route>
        <Route
          path="*"
          element={<ErrorScreen link={AppRoute.Main} />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
