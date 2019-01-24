
import { 

    LOGIN, 
    SAVE_POST, 
    GET_USER_DATA_FROM_LOCAL_STORAGE, 
    GET_USER_ACCOUNT_DATA, 
    UN_SAVE_POST,
    SUBMIT_NEW_POST

} from '../ActionTypes';
import Api from '../../utils/api';

const initialState = {
    token: "",
    isLoggedIn: false,
    account: {
        url: "",
        user: "",
        username: "",
        created: "",
        subbed_to: [],
        admin_of: [],
        comments: [],
        posts: [],
        saved_posts: [],
        saved_comments: [],
        upvoted_posts: [],
        upvoted_comments: [],
        downvoted_posts: [],
        downvoted_comments: []
    }
}

const User = (state = initialState, action) => {

    switch (action.type) {

        case SUBMIT_NEW_POST :
            return {
                ...state,
                account: {
                    ...state.account,
                    posts: state.account.posts.concat([action.payload])
                }
            }

        case UN_SAVE_POST : 
            return {
                ...state,
                account: {
                    ...state.account,
                    saved_posts: state.account.saved_posts.filter(id => id !== action.payload)
                }
            }

        case SAVE_POST :
            return {
                ...state,
                account: {
                    ...state.account,
                    saved_posts: state.account.saved_posts.concat(action.payload)
                }
            }

        case GET_USER_ACCOUNT_DATA :
            return {
                ...state,
                account: action.payload,
                isLoggedIn: true
            }

        case LOGIN :
            return {
                ...state,
                ...action.payload,
                isLoggedIn: true
            };

        case GET_USER_DATA_FROM_LOCAL_STORAGE :
            const { token, accountUrl } = action.payload;

            if (token && accountUrl) {
                Api.setToken(token);

                return {
                    ...state,
                    token: token,
                    account: {
                        ...state.account,
                        url: accountUrl
                    }
                }
            } else {
                return state;
            }

        default:
            return state;
    }
}

export default User;