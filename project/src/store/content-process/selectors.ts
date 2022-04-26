import {NameSpace} from '../../const';
import {State} from '../../types/state';

const getGenre = (state: State): string => state[NameSpace.Content].genre;
const getMoviesCount = (state: State): number => state[NameSpace.Content].moviesCount;

export {getGenre, getMoviesCount};
