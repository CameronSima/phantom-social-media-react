import { GET_POPULAR_FEED, GET_USERS_SUB_POSTS } from '../ActionTypes'
import Api from '../../utils/api';


export const fetchPopularFeed = async () => (
    async dispatch => {
        const response = await Api.get('home');
        dispatch({
            type: GET_POPULAR_FEED,
            payload: response.data
        });
        return response.data;
    }
)

export const getFeed = async feedName => (
    async (dispatch, getState) => {
        if (getState().Feeds.hasOwnProperty(feedName)) {

        }
    }
)