import Api from '../../utils/api';
import { 
    LOAD_POST, 
    LOAD_POST_ERROR, 
    SUBMIT_NEW_POST, 
    SAVE_POST,
    UN_SAVE_POST,
    UPVOTE_POST, 
    DOWNVOTE_POST 
} from '../ActionTypes';

export const loadPost = id => (
    async dispatch => {
        try {
            const url = 'http://localhost:8000/posts/' + id + '/';
            const response = await Api.get(url, false);
        
            if (response.status === 200) {
                dispatch({
                    type: LOAD_POST,
                    payload: response.data
                });
            } else {
                throw new Error(response.status_text)
            }
        } catch (err) {
            dispatch({
                type: LOAD_POST_ERROR,
                payload: err
            });
        }
    }
)


export const submitPost = async (post) => (
    async dispatch => {
        try {
            const response = await Api.post('posts/', post);
            console.log("RES", response)
    
                dispatch({
                    type: SUBMIT_NEW_POST,
                    payload: response.data
                });
        } catch (e) {
            console.log("THE ERR", e)
        }
    }
)

export const savePost = async (postId) => (
    async dispatch => {
        const response = await Api.get('posts/' + postId + '/save/');
    
        if (response.statusText === 'Accepted') {
            return dispatch({
                type: SAVE_POST,
                payload: postId
            })
        }
    }
)

export const unsavePost = async (postId) => (
    async dispatch => {
        const response = await Api.get('posts/' + postId + '/unsave/');
        if (response.statusText === 'Accepted') {
            return dispatch({
                type: UN_SAVE_POST,
                payload: postId
            })
        }
    }
)

export const upvote = async (postId) => (
    async dispatch => {

        // Fire action optimistically to render change instantly.
        dispatch({
            type: UPVOTE_POST,
            payload: postId
        });
        const response = await Api.get('posts/' + postId + '/upvote/');
        if (response.statusText === 'Accepted') {
            return dispatch({
                type: UPVOTE_POST,
                payload: postId
            })
        }
    }
)

export const downvote = async (postId) => (
    async dispatch => {

        dispatch({
            type: DOWNVOTE_POST,
            payload: postId
        })

        const response = await Api.get('posts/' + postId + '/downvote/');
        console.log(response)
        if (response.statusText === 'Accepted') {
            return dispatch({
                type: DOWNVOTE_POST,
                payload: postId
            })
        }
    }
)