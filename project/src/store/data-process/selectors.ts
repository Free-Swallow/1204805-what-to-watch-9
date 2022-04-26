import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {CommentsData, Movie, MoviesData} from '../../types/movies';

const getStatePushComment = (state: State): boolean => state[NameSpace.Data].isCommentPush;
const getMoviesList = (state: State): MoviesData => state[NameSpace.Data].moviesList;
const getStateDataLoad = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
const getStateFavoriteLoad = (state: State): boolean => state[NameSpace.Data].isMyListLoaded;
const getCurrentMovie = (state: State): Movie => state[NameSpace.Data].currentMovie;
const getPromo = (state: State): Movie => state[NameSpace.Data].promo;
const getFavoriteList = (state: State): MoviesData => state[NameSpace.Data].favoriteMoviesList;
const getSimilarList = (state: State): MoviesData => state[NameSpace.Data].similarMovies;
const getCommentList = (state: State): CommentsData => state[NameSpace.Data].currentMovieComments;
const getStateMovieLoad = (state: State): boolean => state[NameSpace.Data].isCurrentMovieLoaded;
const getStateFavoritePush = (state: State): boolean => state[NameSpace.Data].isFavoriteMoviePush;

export {
  getStatePushComment,
  getCommentList,
  getCurrentMovie,
  getFavoriteList,
  getMoviesList,
  getPromo,
  getSimilarList,
  getStateDataLoad,
  getStateFavoriteLoad,
  getStateFavoritePush,
  getStateMovieLoad
};
