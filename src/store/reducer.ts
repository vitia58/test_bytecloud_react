import { combineReducers } from '@reduxjs/toolkit';
import { profileReducer } from './main';

export default combineReducers({
  main: profileReducer,
});
