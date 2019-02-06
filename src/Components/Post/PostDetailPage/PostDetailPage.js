import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PostDetail from './PostDetail';
import SideBar from '../../Sidebar/Sidebar';
import Api from '../../../utils/api';
import { loadPost } from '../../../redux/actions/Post';
import { BrowserRouter as Router, Route, Link, match } from "react-router-dom";

const Page = ({ post }) => (
  <Fragment>
    <PostDetail post={post} />
    <SideBar {...post} />
  </Fragment>
)

class PostDetailPage extends PureComponent {

  componentDidMount() {
    const id = this.props.match.params.postID;
    this.props.loadPost(id);
  }

  render() {
    return (
      <Page
        post={this.props.currentPost}
      />
    )
  }
}

const mapStateToProps = state => ({
  currentPost: state.CurrentPost
});

const mapDispatchToProps = dispatch => ({
  loadPost: async id => {
    const res = await loadPost(id);
    res(dispatch);
  },
});

PostDetailPage = connect(mapStateToProps, mapDispatchToProps)(PostDetailPage);
export default PostDetailPage;
