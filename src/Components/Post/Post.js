import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import './Post.css';
import { PostToolbar, VoteWidget } from '../SharedWidgets/Toolbar';
import moment from 'moment';
import { upvote, downvote, savePost, unsavePost } from '../../redux/actions/Post';
import { Link } from 'react-router-dom';


export const LinkPreviewImage = ({ linkPreviewImageUrl }) => {
    if (linkPreviewImageUrl) {
        return <img
            style={{
                width: "50%"
            }}
            className="img-fluid"
            src={decodeURIComponent(linkPreviewImageUrl)} />
    } else {
        return null;
    }
}

export const PostDetails = ({ posted_in = { title: "Home" }, author = { username: "" }, created }) => (
    <Fragment>
        <div className="inline-text-item">
            <div className="inline-text-item">
                <small>posted in</small>
            </div>
            <div className="inline-text-item">
                <Link to={`/subs/${posted_in.slug}/`}>
                    {posted_in.title}
                </Link>
            </div>
        </div>
        <div className="inline-text-item">
            <div className="inline-text-item">
                <small>by </small>
                <Link to={`/users/${author.username}/`}>
                    <small>{author.username}</small>
                </Link>
            </div>
        </div>
        <div className="inline-text-item">
            <div className="inline-text-item">
                <small>{moment(created).fromNow()}</small>
            </div>
        </div>
    </Fragment>
)

let Post = post => {
    const {
        slug,
        isDownvoted,
        isUpvoted,
        link_preview_img,
        savePost,
        unsavePost,
        isSaved,
        created,
        id,
        body_text,
        title,
        author,
        posted_in,
        score = 0,
        num_comments = 0,
        url
    } = post;

    return (
        <div key={`post-${id}`}
            className="card post" key={'post_' + title}>
            <div className="card-header">

                <PostDetails
                    posted_in={posted_in}
                    created={created}
                    author={author}
                />

            </div>
            <div className="card-body">

                <VoteWidget
                    score={score}
                    upvoteHandler={() => { upvote(post) }}
                    downVoteHandler={() => { downvote(post) }}
                />

                <Link to={`/subs/${posted_in.slug}/posts/${slug}`}>
                    <h5 className="card-title">{title}</h5>
                </Link>

                <p className="card-text">{body_text}</p>
            </div>
            <LinkPreviewImage
                linkPreviewImageUrl={link_preview_img}
            />
            <div className="card-footer">

                <PostToolbar
                    save={() => savePost(post)}
                    unsave={() => unsavePost(post)}
                    isSaved={isSaved}
                    id={id}
                    num_comments={num_comments}
                />

            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    user_account: state.User.account
});

const mapDispatchToProps = dispatch => ({
    savePost: async post => {
        const res = await savePost(post);
        res(dispatch);
    },
    unsavePost: async post => {
        const res = await unsavePost(post);
        res(dispatch);
    },
    upvote: async post => {
        const thunk = await upvote(post);
        thunk(dispatch);
    },
    downvote: async post => {
        const thunk = await downvote(post);
        thunk(dispatch);
    }
});

export default Post = connect(mapStateToProps, mapDispatchToProps)(Post)



