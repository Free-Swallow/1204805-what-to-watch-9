import MoviesListComponent from '../../components/movies-list-component/movies-list-component';
import FooterComponent from '../../components/footer-component/footer-component';
import AuthComponent from '../../components/auth-component/auth-component';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {fetchFavoriteMovieList} from '../../store/api-actions';
import {useAppSelector, useAppDispatch} from '../../hooks';
import LoadingScreen from '../../components/loading-component/loading-component';
import {useEffect} from 'react';


function MyListScreen(): JSX.Element {
  const {favoriteMoviesList, isMyListLoaded} = useAppSelector(({DATA}) => DATA);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteMovieList());
  }, [dispatch]);

  if (!isMyListLoaded) {
    return <LoadingScreen />;
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.Main} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <AuthComponent />

      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <MoviesListComponent movies={favoriteMoviesList} />

      </section>

      <FooterComponent/>
    </div>
  );
}

export default MyListScreen;
