import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus} from '../../const';
import {UserProcess} from '../../types/state';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    requireAuthorization: (state, action: {payload: AuthorizationStatus}) => {
      state.authorizationStatus = action.payload;
    },
  },
});

const {requireAuthorization} = userProcess.actions;

export {userProcess, requireAuthorization};
