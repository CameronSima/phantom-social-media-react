import { GET_POPULAR_FEED, UPVOTE_POST, DOWNVOTE_POST } from '../ActionTypes';

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
        user_upvoted: false
    }]
}

const upVote = (post, postId) => {
    if (post.user_downvoted) {
        post.score += 2;
        post.user_downvoted = false;
    } else if (!post.user_upvoted) {
        post.score++;
    }
    post.user_upvoted = true;
}

const downVote = (post, postId) => {
    if (post.user_upvoted) {
        post.score -= 2;
        post.user_upvoted = false;
    } else if (!post.user_downvoted) {
        post.score--;
    }
    post.user_downvoted = true;
}

const PopularFeed = (state = initialState, action) => {
    switch (action.type) {

        case DOWNVOTE_POST :
            return {
                ...state,
                results: state.results.map(post => {
                    if (post.id === action.payload) {
                        downVote(post, action.payload)
                    }
                    return post;
                })
            }

        case UPVOTE_POST :
            return {
                ...state,
                results: state.results.map(post => {
                    if (post.id === action.payload) {
                        upVote(post, action.payload);
                    }
                    return post;
                })
            }

        case GET_POPULAR_FEED :
            return action.payload
        default:
            return state;
    }
}

export default PopularFeed;