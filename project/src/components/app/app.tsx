import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import PlayerComponent from '../player-component/player-component';
import ErrorComponent from '../error-component/error-component';
import MainStartScreen from '../../pages/main-start-screen/main-start-screen';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import MoviePageScreen from '../../pages/movie-page-screen/movie-page-screen';
import PrivateRoute from '../private-route/private-route';
import {useAppSelector} from '../../hooks';
import {isCheckAuth} from '../../utils/utils';
import LoadingScreen from '../loading-component/loading-component';
import {getStateDataLoad} from '../../store/data-process/selectors';
import {getAuthStatus} from '../../store/user-process/selectors';

function App(): JSX.Element {
  const isDataLoaded = useAppSelector(getStateDataLoad);
  const authorizationStatus = useAppSelector(getAuthStatus);

  if (isCheckAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={<MainStartScreen/>}
      />
      <Route
        path={AppRoute.SignIn}
        element={<SignInScreen/>}
      />
      <Route path={AppRoute.Film}>
        <Route path=":id/*" element={<MoviePageScreen/>}/>
      </Route>
      <Route
        path={AppRoute.MyList}
        element={
          <PrivateRoute
            authorizationStatus={authorizationStatus}
          >
            <MyListScreen/>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.AddReview}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <AddReviewScreen/>
          </PrivateRoute>
        }
      />
      <Route path={AppRoute.Player}>
        <Route path=":id/*" element={<PlayerComponent/>}/>
      </Route>
      <Route
        path="*"
        element={<ErrorComponent/>}
      />
    </Routes>
  );
}

export default App;
