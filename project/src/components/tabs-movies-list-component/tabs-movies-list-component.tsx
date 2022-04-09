import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeGenre, resetMoviesCount} from '../../store/content-process/content-process';
import {nanoid} from '@reduxjs/toolkit';
import {TabsMoviesListProps} from '../../types/components';

function TabsMoviesListComponent({genres}: TabsMoviesListProps):JSX.Element {
  const dispatch = useAppDispatch();
  const currentGenre = useAppSelector(({CONTENT}) => CONTENT.genre);
  const isActive = (status: string) => status === currentGenre ? 'catalog__genres-item--active' : '';

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li key={nanoid()} className={`catalog__genres-item ${isActive(genre)}`}>
          <a onClick={() => {dispatch(changeGenre(genre)); dispatch(resetMoviesCount());}} href="/#" className="catalog__genres-link">{genre}</a>
        </li>
      ))}
    </ul>
  );
}

export default TabsMoviesListComponent;
