export const getUserInteractions = (post, user_account) => {

    if (!user_account) {
        return [false, false, false];
    }

    const post_arrays = [
        user_account.saved_posts, 
        user_account.upvoted_posts, 
        user_account.downvoted_posts
    ]
    return post_arrays.reduce(arr => arr.includes(post.id))
};