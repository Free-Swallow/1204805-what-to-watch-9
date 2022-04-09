import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, defaultGenre, STEP_MOVIES_SHOW} from '../../const';
import {ContentProcess} from '../../types/state';

const initialState: ContentProcess = {
  genre: defaultGenre,
  moviesCount: STEP_MOVIES_SHOW,
};

const contentProcess = createSlice({
  name: NameSpace.Content,
  initialState,
  reducers: {
    changeGenre: (state, action) => {
      state.genre = action.payload;
    },
    changeMoviesCount: (state) => {
      state.moviesCount = state.moviesCount + STEP_MOVIES_SHOW;
    },
    resetMoviesCount: (state) => {
      state.moviesCount = STEP_MOVIES_SHOW;
    },
  },
});

const {changeGenre, changeMoviesCount, resetMoviesCount} = contentProcess.actions;

export {contentProcess, changeGenre, changeMoviesCount, resetMoviesCount};
