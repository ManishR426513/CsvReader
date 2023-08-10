import { combineReducers ,AnyAction } from '@reduxjs/toolkit';
import auth from "./Reducers/authSlice"

const rootReducer = combineReducers({
    auth ,
       
})


export default rootReducer