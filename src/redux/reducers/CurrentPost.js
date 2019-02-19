import { 
    LOAD_POST, 
    LOAD_POST_ERROR,
     LOAD_POST_COMMENTS, 
     SUBMIT_NEW_COMMENT, 
     LOAD_COMMENT_DESCENDANTS,
     LOAD_COMMENT_DESCENDANTS_ERROR,
     LOAD_MORE_COMMENTS,
     LOAD_MORE_COMMENTS_ERROR,
     UPVOTE_CURRENT_POST,
     DOWNVOTE_CURRENT_POST
     } from '../ActionTypes';

import { upVote, downVote } from '../../utils/Post';

const initialState = {
    author: {
        url: "",
        username: ""
    },
    body_text: "",
    comments: {
        count: 0,
        next: null,
        previous: null,
        results: []
    },
    id: null,
    image_url: null,
    link_url: null,
    num_comments: 0,
    score: 0,
    title: "",
    url: "",
    user_upvoted: false,
    user_downvoted: false,
    posted_in: {
        id: null,
        admins: [],
        created: "",
        created_by: "",
        num_subscribers: 0,
        slug: "",
        title: "",
        url: ""
    }
}

// Overwrite old comments if they happen to have also been pulled
// in from the latest batch.
const concatUnique = (oldComments, newComments) => {
    const result = [...newComments];

    oldComments.forEach(comment => {
        if (!result.some(c => c.id === comment.id)) {
            result.push(comment);
        }
    });
    return result;
}

const CurrentPost = (state = initialState, action) => {

    switch (action.type) {

        case LOAD_POST :
            return {
                ...state,
                ...action.payload
            }

        case UPVOTE_CURRENT_POST :
            return {...upVote(action.payload)};
        
        case DOWNVOTE_CURRENT_POST :
            return downVote(action.payload);
            

        case LOAD_MORE_COMMENTS :
            const commentsAlreadyLoaded = state.comments.results;
            const nextResultsSet = action.payload;
            return {
                ...state,
                comments: {
                    ...nextResultsSet,
                    results: [...nextResultsSet.results, ...commentsAlreadyLoaded]
                }

            }

        case LOAD_COMMENT_DESCENDANTS :
            return {
                ...state,
                comments: {
                    ...state.comments,
                    results: concatUnique(state.comments.results, action.payload.results)
                }
            }

            
        case LOAD_POST_COMMENTS :
            return {
                ...state,
                comments: action.payload
            }

        // When submitting a new comment, find the post and add it into state.
        case SUBMIT_NEW_COMMENT:
            const nextComments = [...state.comments.results];
            nextComments.unshift(action.payload);
            return {
                ...state,
                comments: {
                    ...state.comments,
                    results: nextComments
                }
            }

            default:
                return state;
    }
}

export default CurrentPost;