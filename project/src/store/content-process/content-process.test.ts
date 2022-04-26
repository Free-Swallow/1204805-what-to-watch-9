import {contentProcess, changeGenre, changeMoviesCount, resetMoviesCount} from './content-process';
import {Genre} from '../../utils/mocks';
import {defaultGenre, STEP_MOVIES_SHOW} from '../../const';

describe('Reducer: content', () => {
  it('without additional parameters should return initial state', () => {
    expect(contentProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({genre: defaultGenre, moviesCount: STEP_MOVIES_SHOW});
  });

  it('should update genre to "Horror"', () => {
    const state = {
      genre: defaultGenre,
      moviesCount: STEP_MOVIES_SHOW,
    };

    expect(contentProcess.reducer(state, changeGenre(Genre.HORROR)))
      .toEqual({genre: Genre.HORROR, moviesCount: STEP_MOVIES_SHOW});
  });

  it('should update moviesCount from 8 to 16', () => {
    const state = {
      genre: defaultGenre,
      moviesCount: STEP_MOVIES_SHOW,
    };

    expect(contentProcess.reducer(state, changeMoviesCount()))
      .toEqual({genre: defaultGenre, moviesCount: STEP_MOVIES_SHOW + STEP_MOVIES_SHOW});
  });

  it('should reset moviesCount to 8', () => {
    const state = {
      genre: defaultGenre,
      moviesCount: STEP_MOVIES_SHOW + STEP_MOVIES_SHOW,
    };

    expect(contentProcess.reducer(state, resetMoviesCount()))
      .toEqual({genre: defaultGenre, moviesCount: STEP_MOVIES_SHOW});
  });
});
