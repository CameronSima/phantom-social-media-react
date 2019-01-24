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
                {posted_in.title}
            </div>
        </div>
        <div className="inline-text-item">
            <div className="inline-text-item">
                <small>by {author.username}</small>
            </div>
        </div>
        <div className="inline-text-item">
            <div className="inline-text-item">
                <small>{moment(created).fromNow()}</small>
            </div>
        </div>
    </Fragment>
)

let Post = (props) => {
    const {
        slug,
        user_downvoted,
        user_upvoted,
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
    } = props;

    return (
        <div className="card post" key={'post_' + title}>
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
                    upvoteHandler={() => { props.upvote(id) }}
                    downVoteHandler={() => { props.downvote(id) }}
                />
    
                <Link to={`/${posted_in.slug}/${slug}`}>
                    <h5 className="card-title">{title}</h5>
                </Link>

                <p className="card-text">{body_text}</p>
            </div>
            <LinkPreviewImage
                linkPreviewImageUrl={link_preview_img}
            />
            <div className="card-footer">

                <PostToolbar
                    save={savePost}
                    unsave={unsavePost}
                    isSaved={isSaved}
                    id={id}
                    num_comments={num_comments}
                />

            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    savePost: async (postId) => {
        const res = await savePost(postId);
        res(dispatch);
      },
      unsavePost: async (postId) => {
        const res = await unsavePost(postId);
        res(dispatch);
      },
    upvote: async (postId) => {
        const thunk = await upvote(postId);
        thunk(dispatch);
    },
    downvote: async (postId) => {
        const thunk = await downvote(postId);
        thunk(dispatch);
    }
});

export default Post = connect(null, mapDispatchToProps)(Post)



