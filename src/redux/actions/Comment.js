import Api from '../../utils/api';
import { SUBMIT_NEW_COMMENT, UN_SAVE_COMMENT, SAVE_COMMENT, UPVOTE_COMMENT, DOWNVOTE_COMMENT } from '../ActionTypes';

export const submitPost = async (post) => (
    async dispatch => {
        try {
            const response = await Api.post('posts/', post);
            console.log("RES", response)
    
                dispatch({
                    type: SUBMIT_NEW_COMMENT,
                    payload: response.data
                });
        } catch (e) {
            console.log("THE ERR", e)
        }
    }
)

export const savePost = async (postId) => (
    async dispatch => {
        const response = await Api.get('comments/' + postId + '/save/');
    
        if (response.statusText === 'Accepted') {
            return dispatch({
                type: SAVE_COMMENT,
                payload: postId
            })
        }
    }
)

export const unsavePost = async (postId) => (
    async dispatch => {
        const response = await Api.get('comments/' + postId + '/unsave/');
        if (response.statusText === 'Accepted') {
            return dispatch({
                type: UN_SAVE_COMMENT,
                payload: postId
            })
        }
    }
)

export const upvote = async (postId) => (
    async dispatch => {

        dispatch({
            type: UPVOTE_POST,
            payload: postId
        });
        const response = await Api.get('comments/' + postId + '/upvote/');
        if (response.statusText === 'Accepted') {
            return dispatch({
                type: UPVOTE_COMMENT,
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

        const response = await Api.get('comments/' + postId + '/downvote/');
        console.log(response)
        if (response.statusText === 'Accepted') {
            return dispatch({
                type: DOWNVOTE_COMMENT,
                payload: postId
            })
        }
    }
)