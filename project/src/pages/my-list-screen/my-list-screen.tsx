import MoviesListComponent from '../../components/movies-list-component/movies-list-component';
import FooterComponent from '../../components/footer-component/footer-component';
import AuthComponent from '../../components/auth-component/auth-component';
import {fetchFavoriteMovieList} from '../../store/api-actions';
import {useAppSelector, useAppDispatch} from '../../hooks';
import LoadingScreen from '../../components/loading-component/loading-component';
import {useEffect} from 'react';
import LogoComponent from '../../components/logo-component/logo-component';


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
        <LogoComponent classAttribute={''} />
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
