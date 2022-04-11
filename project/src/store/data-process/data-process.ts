import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {DataProcess} from '../../types/state';
import {CommentsData, Movie, MoviesData} from '../../types/movies';

const initialState: DataProcess = {
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

const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadMovies: (state, action: {payload: MoviesData}) => {
      state.moviesList = action.payload;
      state.isDataLoaded = true;
    },
    loadCurrentMovie: (state, action: {payload: Movie}) => {
      state.currentMovie = action.payload;
      state.isCurrentMovieLoaded = true;
    },
    loadPromoMovie: (state, action: {payload: Movie}) => {
      state.promo = action.payload;
    },
    loadSimilarMovie: (state, action: {payload: MoviesData}) => {
      state.similarMovies = action.payload;
    },
    loadComments: (state, action: {payload: CommentsData}) => {
      state.currentMovieComments = action.payload;
    },
    isPushComment: (state, action: {payload: boolean}) => {
      state.isCommentPush = action.payload;
    },
    loadFavoriteMovie: (state, action: {payload: MoviesData}) => {
      state.favoriteMoviesList = action.payload;
      state.isMyListLoaded = true;
    },
    isPushFavoriteMovie: (state, action: {payload: boolean}) => {
      state.isFavoriteMoviePush = action.payload;
    },
  },
});

const {
  loadCurrentMovie,
  loadSimilarMovie,
  loadPromoMovie,
  loadFavoriteMovie,
  isPushFavoriteMovie,
  loadMovies,
  loadComments,
  isPushComment,
} = dataProcess.actions;

export {
  dataProcess,
  loadCurrentMovie,
  loadSimilarMovie,
  loadPromoMovie,
  loadFavoriteMovie,
  isPushFavoriteMovie,
  loadMovies,
  loadComments,
  isPushComment
};
