export const upVote = post => {
    if (post.user_downvoted) {
        post.score += 2;
        post.user_downvoted = false;
    } else if (!post.user_upvoted) {
        post.score++;
    }
    post.user_upvoted = true;
}

export const downVote = post => {
    if (post.user_upvoted) {
        post.score -= 2;
        post.user_upvoted = false;
    } else if (!post.user_downvoted) {
        post.score--;
    }
    post.user_downvoted = true;
    return post;
}

export const updatePosts = (posts, updatedPost, callback) => (
    posts.map(post => {
        if (post.id === updatedPost.id) {
            return callback(post);
        }
        return post;
    })
);