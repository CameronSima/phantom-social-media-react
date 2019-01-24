import { GET_POPULAR_FEED, GET_USERS_SUB_POSTS } from '../ActionTypes'
import Api from '../../utils/api';


export const fetchPopularFeed = async () => (
    async dispatch => {
        const response = await Api.get('home');
        dispatch({
            type: GET_POPULAR_FEED,
            payload: response.data
        })
    }
)

export const fetchUserSubPostsFeed = async () => (
    async dispatch => {
        const response = await Api.get('subbed_posts');
        dispatch({
            type: GET_USERS_SUB_POSTS,
            payload: response.data
        })
    }
)