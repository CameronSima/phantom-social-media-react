import Api from '../../utils/api';
import { SUBMIT_NEW_COMMENT, UN_SAVE_COMMENT, SAVE_COMMENT, UPVOTE_COMMENT, DOWNVOTE_COMMENT } from '../ActionTypes';

export const submitComment = async (comment) => (
    async dispatch => {
        try {
            const response = await Api.post('comments/', comment);
            console.log("RES", response)

            if (response.status === 201) {
                dispatch({
                    type: SUBMIT_NEW_COMMENT,
                    payload: response.data
                });
            } else {
                throw new Error(response.statusText);
            }
        } catch (e) {
            console.log("THE ERR", e)
        }
    }
)

export const saveComment = async (commentId) => (
    async dispatch => {
        const response = await Api.get('comments/' + commentId + '/save/');
    
        if (response.statusText === 'Accepted') {
            return dispatch({
                type: SAVE_COMMENT,
                payload: commentId
            })
        }
    }
)

export const unsaveComment = async (commentId) => (
    async dispatch => {
        const response = await Api.get('comments/' + commentId + '/unsave/');
        if (response.statusText === 'Accepted') {
            return dispatch({
                type: UN_SAVE_COMMENT,
                payload: commentId
            })
        }
    }
)

export const upvote = async (commentId) => (
    async dispatch => {

        dispatch({
            type: UPVOTE_COMMENT,
            payload: commentId
        });
        const response = await Api.get('comments/' + commentId + '/upvote/');
        if (response.statusText === 'Accepted') {
            return dispatch({
                type: UPVOTE_COMMENT,
                payload: commentId
            })
        }
    }
)

export const downvote = async (commentId) => (
    async dispatch => {

        dispatch({
            type: DOWNVOTE_COMMENT,
            payload: commentId
        })

        const response = await Api.get('comments/' + commentId + '/downvote/');
        console.log(response)
        if (response.statusText === 'Accepted') {
            return dispatch({
                type: DOWNVOTE_COMMENT,
                payload: commentId
            })
        }
    }
)