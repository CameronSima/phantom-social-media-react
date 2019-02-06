import { LOAD_POST, LOAD_POST_ERROR, SUBMIT_NEW_COMMENT } from '../ActionTypes';

const initialState = {
    author: {
        url: "",
        username: ""
    },
    body_text: "",
    comments: [],
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

const CurrentPost = (state = initialState, action) => {

    switch (action.type) {
        case LOAD_POST :
            return action.payload;

        // When submitting a new comment, find the post and add it into state.
        case SUBMIT_NEW_COMMENT:
            return {
                ...state,
                comments: state.comments.concat([action.payload])
            }

            default:
                return state;
    }
}

export default CurrentPost;