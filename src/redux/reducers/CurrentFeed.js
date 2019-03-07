import { SWITCH_FEED, LOAD_FEED_INTO_CURRENT_VIEW, GET_POPULAR_FEED, LOAD_SUB_POSTS, UPVOTE_POST, DOWNVOTE_POST, SAVE_POST, UN_SAVE_POST, SAVE_COMMENT } from '../ActionTypes';
import { updatePosts, upVote, downVote } from '../../utils/Post';

const initialState = {
    count: 0,
    next: null,
    previous: null,
    results: [{
        id: 0,
        url: "",
        slug: "",
        author: {
            url: "",
            username: ""
        },
        title: "",
        body_text: "",
        body_html: "",
        link_url: "",
        image_url: "",
        upvotes: 0,
        downvotes: 0,
        created: "",
        posted_in: "",
        user_downvoted: false,
        user_upvoted: false,
        user_saved: false
    }]
}

// All actions to the current view.
const CurrentFeed = (state = initialState, action) => {
    switch (action.type) {

        case UN_SAVE_POST :
            return {
                ...state,
                results: state.results.map(post => {
                    if (post.id === action.payload.id) {
                        return {
                            ...action.payload,
                            user_saved: false
                        }
                    } else {
                        return post;
                    }
                })
            }

        case SAVE_POST :
            return {
                ...state,
                results: state.results.map(post => {
                    if (post.id === action.payload.id) {
                        return {
                            ...action.payload,
                            user_saved: true
                        }
                    } else {
                        return post;
                    }
                })
            }

        case LOAD_FEED_INTO_CURRENT_VIEW :
            return action.payload ? action.payload : state;

        case DOWNVOTE_POST :
            if (state.results.some(post => post.id === action.payload.id)) {
                return {
                    ...state,
                    results: updatePosts(state.results, action.payload, downVote)
                }
            } else {
                return state
            }


        case UPVOTE_POST :
            return {
                ...state,
                results: updatePosts(state.results, action.payload, upVote)
            }

        default:
            return state;
    }
}

export default CurrentFeed;