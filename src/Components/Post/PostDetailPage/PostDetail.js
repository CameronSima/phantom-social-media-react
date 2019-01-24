import React from 'react';
import { connect } from 'react-redux';
import '../Post.css';
import CommentEntry from '../../Comment/CommentEntry';
import { upvote, downvote } from '../../../redux/actions/Post';
import { PostDetails, LinkPreviewImage } from '../Post';
import { VoteWidget } from '../../SharedWidgets/Toolbar';
import { PostToolbar } from '../../SharedWidgets/Toolbar';
import { CommentList } from '../../Comment/Comment';
import Editor from '../../SharedWidgets/Editor';


let PostDetail = post => {
  const {
    user_downvoted,
    user_upvoted,
    upvote, 
    downvote,
    link_preview_img,
    savePost,
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

  console.log("POST DETSAIL PROPS")
  console.log(post)

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
            upvoteHandler={() => { upvote(id) }}
            downVoteHandler={() => { downvote(id) }}
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
          <Editor />
        </div>
      </div>
      
      <CommentList comments={comments} />
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  upvote: async (postId) => {
    const thunk = await upvote(postId);
    thunk(dispatch);
  },
  downvote: async (postId) => {
    const thunk = await downvote(postId);
    thunk(dispatch);
  }
});

export default PostDetail = connect(null, mapDispatchToProps)(PostDetail)



