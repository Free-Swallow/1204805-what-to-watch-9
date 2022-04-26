import {
  dataProcess,
  loadCurrentMovie,
  loadSimilarMovie,
  loadPromoMovie,
  loadFavoriteMovie,
  isPushFavoriteMovie,
  loadMovies,
  loadComments,
  isPushComment
} from './data-process';
import {makeFakeMovie, makeFakeComment} from '../../utils/mocks';

const movies = [makeFakeMovie()];
const movie = makeFakeMovie();

const comment = makeFakeComment();
const commentsList = [comment];

const mockState = {
  moviesList: [],
  isDataLoaded: false,
  isMyListLoaded: false,
  currentMovie: Object.assign({}),
  promo: Object.assign({}),
  favoriteMoviesList: [],
  similarMovies: [],
  currentMovieComments: [],
  isCurrentMovieLoaded: false,
  isCommentPush: false,
  isFavoriteMoviePush: false,
};

describe('Reducer: data', () => {
  it('without additional parameters should return initial state', () => {
    expect(dataProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        moviesList: [],
        isDataLoaded: false,
        isMyListLoaded: false,
        currentMovie: Object.assign({}),
        promo: Object.assign({}),
        favoriteMoviesList: [],
        similarMovies: [],
        currentMovieComments: [],
        isCurrentMovieLoaded: false,
        isCommentPush: false,
        isFavoriteMoviePush: false,
      });
  });

  it('should update movies list by load movies', () => {
    const state = Object.assign({}, mockState);

    expect(dataProcess.reducer(state, loadMovies(movies)))
      .toEqual({
        moviesList: movies,
        isDataLoaded: true,
        isMyListLoaded: false,
        currentMovie: Object.assign({}),
        promo: Object.assign({}),
        favoriteMoviesList: [],
        similarMovies: [],
        currentMovieComments: [],
        isCurrentMovieLoaded: false,
        isCommentPush: false,
        isFavoriteMoviePush: false,
      });
  });

  it('should update current movie by load movie', () => {
    const state = Object.assign({}, mockState);

    expect(dataProcess.reducer(state, loadCurrentMovie(movie)))
      .toEqual({
        moviesList: [],
        isDataLoaded: false,
        isMyListLoaded: false,
        currentMovie: movie,
        promo: Object.assign({}),
        favoriteMoviesList: [],
        similarMovies: [],
        currentMovieComments: [],
        isCurrentMovieLoaded: true,
        isCommentPush: false,
        isFavoriteMoviePush: false,
      });
  });

  it('should update promo by load movie', () => {
    const state = Object.assign({}, mockState);

    expect(dataProcess.reducer(state, loadPromoMovie(movie)))
      .toEqual(
        {
          moviesList: [],
          isDataLoaded: false,
          isMyListLoaded: false,
          currentMovie: Object.assign({}),
          promo: movie,
          favoriteMoviesList: [],
          similarMovies: [],
          currentMovieComments: [],
          isCurrentMovieLoaded: false,
          isCommentPush: false,
          isFavoriteMoviePush: false,
        },
      );
  });

  it('should update similar list by load movies', () => {
    const state = Object.assign({}, mockState);

    expect(dataProcess.reducer(state, loadSimilarMovie(movies)))
      .toEqual(
        {
          moviesList: [],
          isDataLoaded: false,
          isMyListLoaded: false,
          currentMovie: Object.assign({}),
          promo: Object.assign({}),
          favoriteMoviesList: [],
          similarMovies: movies,
          currentMovieComments: [],
          isCurrentMovieLoaded: false,
          isCommentPush: false,
          isFavoriteMoviePush: false,
        },
      );
  });

  it('should update comments list by load comments', () => {
    const state = Object.assign({}, mockState);

    expect(dataProcess.reducer(state, loadComments(commentsList)))
      .toEqual(
        {
          moviesList: [],
          isDataLoaded: false,
          isMyListLoaded: false,
          currentMovie: Object.assign({}),
          promo: Object.assign({}),
          favoriteMoviesList: [],
          similarMovies: [],
          currentMovieComments: commentsList,
          isCurrentMovieLoaded: false,
          isCommentPush: false,
          isFavoriteMoviePush: false,
        },
      );
  });

  it('should update state comment push', () => {
    const state = Object.assign({}, mockState);
    const pushIsDone = true;

    expect(dataProcess.reducer(state, isPushComment(pushIsDone)))
      .toEqual(
        {
          moviesList: [],
          isDataLoaded: false,
          isMyListLoaded: false,
          currentMovie: Object.assign({}),
          promo: Object.assign({}),
          favoriteMoviesList: [],
          similarMovies: [],
          currentMovieComments: [],
          isCurrentMovieLoaded: false,
          isCommentPush: true,
          isFavoriteMoviePush: false,
        },
      );
  });

  it('should update favorite list and state my list loaded', () => {
    const state = Object.assign({}, mockState);

    expect(dataProcess.reducer(state, loadFavoriteMovie(movies)))
      .toEqual(
        {
          moviesList: [],
          isDataLoaded: false,
          isMyListLoaded: true,
          currentMovie: Object.assign({}),
          promo: Object.assign({}),
          favoriteMoviesList: movies,
          similarMovies: [],
          currentMovieComments: [],
          isCurrentMovieLoaded: false,
          isCommentPush: false,
          isFavoriteMoviePush: false,
        },
      );
  });

  it('should update state favorite movie push', () => {
    const state = Object.assign({}, mockState);
    const favoriteMoviePushed = true;

    expect(dataProcess.reducer(state, isPushFavoriteMovie(favoriteMoviePushed)))
      .toEqual(
        {
          moviesList: [],
          isDataLoaded: false,
          isMyListLoaded: false,
          currentMovie: Object.assign({}),
          promo: Object.assign({}),
          favoriteMoviesList: [],
          similarMovies: [],
          currentMovieComments: [],
          isCurrentMovieLoaded: false,
          isCommentPush: false,
          isFavoriteMoviePush: true,
        },
      );
  });
});
