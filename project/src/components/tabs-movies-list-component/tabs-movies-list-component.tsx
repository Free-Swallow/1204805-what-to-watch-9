import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeGenre, resetMoviesCount} from '../../store/content-process/content-process';
import {nanoid} from '@reduxjs/toolkit';
import {TabsMoviesListProps} from '../../types/components';
import {getGenre} from '../../store/content-process/selectors';

function TabsMoviesListComponent({genres}: TabsMoviesListProps):JSX.Element {
  const dispatch = useAppDispatch();
  const currentGenre = useAppSelector(getGenre);
  const isActive = (status: string) => status === currentGenre ? 'catalog__genres-item--active' : '';

  const handleClickTab = (genre: string) => {
    dispatch(changeGenre(genre));
    dispatch(resetMoviesCount());
  };

  return (
    <ul data-testid="kind-tabs" className="catalog__genres-list">
      {genres.map((genre) => (
        <li data-testid={`tab-genre-${genre}`} key={nanoid()} className={`catalog__genres-item ${isActive(genre)}`}>
          <a onClick={() => handleClickTab(genre)} href="/#" className="catalog__genres-link">{genre}</a>
        </li>
      ))}
    </ul>
  );
}

export default TabsMoviesListComponent;
