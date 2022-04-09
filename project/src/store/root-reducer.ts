import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {userProcess} from './user-process/user-process';
import {contentProcess} from './content-process/content-process';
import {dataProcess} from './data-process/data-process';

const rootReducer = combineReducers({
  [NameSpace.Data]: dataProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Content]: contentProcess.reducer,
});

export {rootReducer};
