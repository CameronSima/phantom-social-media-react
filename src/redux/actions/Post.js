import Api from '../../utils/api';
import {
    LOAD_POST,
    LOAD_POST_ERROR,
    SUBMIT_NEW_POST,
    SAVE_POST,
    UN_SAVE_POST,
    UPVOTE_POST,
    DOWNVOTE_POST,
    LOAD_POST_COMMENTS,
    LOAD_POST_COMMENTS_ERROR,
    UPVOTE_CURRENT_POST,
    DOWNVOTE_CURRENT_POST
} from '../ActionTypes';


export const loadPost = slug => (
    async dispatch => {
        try {
            const url = 'http://localhost:8000/posts/' + slug + '/';
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

export const loadPostComments = slug => (
    async dispatch => {
        try {
            const url = 'http://localhost:8000/comments/?post_slug=' + slug;
            const response = await Api.get(url, false);

            if (response.status === 200) {
                dispatch({
                    type: LOAD_POST_COMMENTS,
                    payload: response.data
                });
            } else {
                throw new Error(response.status_text)
            }
        } catch (err) {
            dispatch({
                type: LOAD_POST_COMMENTS_ERROR,
                payload: err
            });
        }
    }
)


export const submitPost = async post => (
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

export const savePost = async post => (
    async dispatch => {

        dispatch({
            type: SAVE_POST,
            payload: post
        });

        const response = await Api.get('posts/' + post.slug + '/save/');

        if (response.statusText !== 'Accepted') {
            return dispatch({
                type: UN_SAVE_POST,
                payload: post
            });
        }
    }
)

export const unsavePost = async post => (
    async dispatch => {

        dispatch({
            type: UN_SAVE_POST,
            payload: post
        });

        const response = await Api.get('posts/' + post.slug + '/unsave/');

        if (response.statusText === 'Accepted') {
            return dispatch({
                type: UN_SAVE_POST,
                payload: post
            })
        } else {
            dispatch({
                type: SAVE_POST,
                payload: post
            })
        }
    }
)

export const upvote = (post, type, errType) => (
    async dispatch => {

        dispatch({
            type: type,
            payload: post
        });

        try {
            const response = await Api.get('posts/' + post.slug + '/upvote/');
            if (response.statusText !== 'Accepted') {
                throw new Error(response.status_text);
            }
        } catch (err) {
            dispatch({
                type: errType,
                payload: post
            });
        }
    }
);

export const upvoteCurrentPost = post => (
    async dispatch => {
        upvote(post, UPVOTE_CURRENT_POST, DOWNVOTE_CURRENT_POST)(dispatch);
    }
)



// export const upvote = async post => (
//     async dispatch => {

//         // Fire action optimistically to render change ui instantly.
//         dispatch({
//             type: UPVOTE_POST,
//             payload: post
//         });
//         const response = await Api.get('posts/' + post.slug + '/upvote/');
//         if (response.statusText === 'Accepted') {
//             return dispatch({
//                 type: UPVOTE_POST,
//                 payload: post
//             })
//         }
//     }
// )

export const downvote = async post => (
    async dispatch => {

        dispatch({
            type: DOWNVOTE_POST,
            payload: post
        })

        const response = await Api.get('posts/' + post.slug + '/downvote/');

        if (response.statusText === 'Accepted') {
            return dispatch({
                type: DOWNVOTE_POST,
                payload: post
            })
        }
    }
)