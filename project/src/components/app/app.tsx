import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import ErrorScreen from '../../pages/error-screen/error-screen';
import MainStartScreen from '../../pages/main-start-screen/main-start-screen';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import MoviePageScreen from '../../pages/movie-page-screen/movie-page-screen';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  movieName: string;
  movieRelease: number;
  movieKind: string;
}

function App({movieName, movieRelease, movieKind}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainStartScreen movieName={movieName} movieRelease={movieRelease} movieKind={movieKind} />}
        />
        <Route
          path={AppRoute.SignIn}
          element={<SignInScreen />}
        />
        <Route
          path={AppRoute.Film}
          element={<MoviePageScreen />}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.NoAuth}
            >
              <MyListScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.AddReview}
          element={<AddReviewScreen />}
        />
        <Route
          path={AppRoute.Player}
          element={<PlayerScreen />}
        />
        <Route
          path="*"
          element={<ErrorScreen link={AppRoute.Main} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
