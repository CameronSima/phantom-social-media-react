import React from 'react';
import { connect } from 'react-redux';
import '../Post.css';
import CommentEntry from '../../Comment/CommentEntry';
import { upvote, downvote } from '../../../redux/actions/Post';
import { PostDetails, LinkPreviewImage } from '../Post';
import { VoteWidget } from '../../SharedWidgets/Toolbar';
import { PostToolbar } from '../../SharedWidgets/Toolbar';
import { CommentList } from '../../Comment/Comment';


let PostDetail = ({ post, dispatch, user, upvoteHandler, downvoteHandler }) => {
  const {
    link_preview_img,
    savePost,
    slug,
    unsavePost,
    isSaved,
    created,
    id,
    body_text,
    comments,
    title,
    author,
    posted_in,
    score = 0,
    num_comments = 0
  } = post;


  return (
    <div className="col-md-8 post-list">
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
            upvoteHandler={() => { upvoteHandler(post) }}
            downVoteHandler={() => { downvoteHandler(post) }}
          />
          <h5 className="card-title">{title}</h5>

          <p className="card-text">{body_text}</p>
        </div>
        <LinkPreviewImage
          linkPreviewImageUrl={link_preview_img}
        />
        <div className="card-footer">

          <PostToolbar
            savePost={savePost}
            unsavePost={unsavePost}
            isSaved={isSaved}
            id={id}
            num_comments={num_comments}
          />

          <br/>
          {/* <CommentEntry /> */}
  
        </div>
      </div>
      
      <CommentList 
        user={user}
        dispatch={dispatch}
        comments={comments} />
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.User
});

const mapDispatchToProps = dispatch => ({
  upvoteHandler: async post => {
    const thunk = await upvote(post);
    thunk(dispatch);
  },
  downvoteHandler: async post => {
    const thunk = await downvote(post);
    thunk(dispatch);
  },
  // pass down to Comment for comment actions
  dispatch: dispatch
});

export default PostDetail = connect(mapStateToProps, mapDispatchToProps)(PostDetail)



