import { combineReducers } from "redux";
import User from './User';
import PopularFeed from './PopularFeed';
import CurrentSub from './CurrentSub';

export default combineReducers({ 
    User,
    PopularFeed,
    CurrentSub
 });
