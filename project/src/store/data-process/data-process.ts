import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {DataProcess} from '../../types/state';

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
    loadMovies: (state, action) => {
      state.moviesList = action.payload;
      state.isDataLoaded = true;
    },
    loadCurrentMovie: (state, action) => {
      state.currentMovie = action.payload;
      state.isCurrentMovieLoaded = true;
    },
    loadPromoMovie: (state, action) => {
      state.promo = action.payload;
    },
    loadSimilarMovie: (state, action) => {
      state.similarMovies = action.payload;
    },
    loadComments: (state, action) => {
      state.currentMovieComments = action.payload;
    },
    isPushComment: (state, action) => {
      state.isCommentPush = action.payload;
    },
    loadFavoriteMovie: (state, action) => {
      state.favoriteMoviesList = action.payload;
      state.isMyListLoaded = true;
    },
    isPushFavoriteMovie: (state, action) => {
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
  isPushComment
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
