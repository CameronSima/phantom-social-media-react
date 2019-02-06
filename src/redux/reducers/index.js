import { combineReducers } from "redux";
import User from './User';
import PopularFeed from './PopularFeed';
import CurrentSub from './CurrentSub';
import CurrentPost from './CurrentPost';

export default combineReducers({ 
    User,
    PopularFeed,
    CurrentSub,
    CurrentPost
 });
