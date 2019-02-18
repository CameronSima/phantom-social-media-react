import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PostDetail from './PostDetail';
import SideBar from '../../Sidebar/Sidebar';
import Api from '../../../utils/api';
import { loadPost, loadPostComments } from '../../../redux/actions/Post';
import { BrowserRouter as Router, Route, Link, match } from "react-router-dom";

// const Page = ({ post }) => (
//   <Fragment>
//     <PostDetail post={post} />
//     <SideBar {...post} />
//   </Fragment>
// )

class PostDetailPage extends PureComponent {


  componentDidMount() {
    const { postSlug, subSlug } = this.props.match.params;


    this.props.loadPost(postSlug);
    this.props.loadPostComments(postSlug);
  }

  render() {
    const post = this.props.currentPost;

    console.log("POST", post)

    return (
      <Fragment>
        <PostDetail post={post} />
        <SideBar {...post} />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  currentPost: state.CurrentPost,
  currentFeed: state.Feeds.currentFeed,
  feeds: state.Feeds.feeds
});

const mapDispatchToProps = dispatch => ({
  loadPost: slug => loadPost(slug)(dispatch),
  loadPostComments: slug => loadPostComments(slug)(dispatch)
});

PostDetailPage = connect(mapStateToProps, mapDispatchToProps)(PostDetailPage);
export default PostDetailPage;
