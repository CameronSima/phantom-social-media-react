import { LOAD_SUB, LOAD_SUB_POSTS, LOAD_SUB_POSTS_ERROR, LOAD_SUB_INTO_CURRENT_VIEW, LOAD_SUB_ERROR, LOAD_FEED_INTO_CURRENT_VIEW } from '../ActionTypes';
import Api from '../../utils/api';


export const loadSub = id => (
    async (dispatch, getState) => {
        const subData = getState().Subs.find(sub => sub.id === id);

        if (subData) {
            dispatch({
                type: LOAD_SUB_INTO_CURRENT_VIEW,
                payload: subData
            });

        } else {
            const thunk = loadSubData(id);
            await thunk(dispatch);
            // run again to load into current view, now that that 
            // the data is loaded and available.
            loadSub(id);
        }

        let subPosts = getState().Feeds.find(feed => feed.feedId === 'sub_' + id);

        if (!subPosts) {
            const thunk = loadSubPosts(id);
            subPosts = await thunk(dispatch);
        } 
        dispatch({
            type: LOAD_FEED_INTO_CURRENT_VIEW,
            payload: subPosts
        });
    }
);


export const loadSubData = id => (
    async dispatch => {
        try {
            const url = 'http://localhost:8000/subs/' + id + '/';
            const response = await Api.get(url, false);

            if (response.status === 200) {
                dispatch({
                    type: LOAD_SUB,
                    payload: response.data
                });
            } else {
                throw new Error(response.status_text)
            }
        } catch (e) {
            dispatch({
                type: LOAD_SUB_ERROR,
                payload: e
            });
        }
    }
)

export const loadSubPosts = id => (
    async dispatch => {
        try {
            const url = 'http://localhost:8000/posts/?sub_id=' + id;
            const response = await Api.get(url, false);

            if (response.status === 200) {
                dispatch({
                    type: LOAD_SUB_POSTS,
                    payload: response.data
                });
            } else {
                throw new Error(response.status_text)
            }
        } catch (e) {
            dispatch({
                type: LOAD_SUB_POSTS_ERROR,
                payload: e
            });
        }
    }
)
