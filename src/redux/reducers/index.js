import { combineReducers } from "redux";
import User from './User';
import Feeds from './Feeds';
import Subs from './Subs';
import CurrentSub from './CurrentSub';
import CurrentFeed from './CurrentFeed';
import CurrentPost from './CurrentPost';

export default combineReducers({ 
    User,
    CurrentSub,
    CurrentFeed,
    CurrentPost,
    Feeds, 
    Subs
 });
