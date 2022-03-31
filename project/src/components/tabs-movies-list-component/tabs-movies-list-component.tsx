import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeGenre} from '../../store/action';
import {initialStateProps} from '../../store/reducer';
import {nanoid} from '@reduxjs/toolkit';

type TabsMoviesListProps = {
  genres: string[];
}

function TabsMoviesListComponent({genres}: TabsMoviesListProps):JSX.Element {
  const dispatch = useAppDispatch();
  const currentGenre = useAppSelector((state: initialStateProps) => state.genre);
  const isActive = (status: string) => status === currentGenre ? 'catalog__genres-item--active' : '';

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li key={nanoid()} className={`catalog__genres-item ${isActive(genre)}`}>
          <a onClick={() => {dispatch(changeGenre(genre));}} href="/#" className="catalog__genres-link">{genre}</a>
        </li>
      ))}
    </ul>
  );
}

export default TabsMoviesListComponent;
