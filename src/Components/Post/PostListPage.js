import React, { Fragment } from 'react';
import SideBar from '../Sidebar/Sidebar';
import Post from './Post';

export const PostList = ({ posts = [], ...props }) => (
  <div className="col-md-8 post-list">
    {
      posts.map(post => {
        return <Post {...post}
          {...props}
           />
      })
    }
  </div>
)

export const PostListPage = props => (
  <Fragment>
    <PostList {...props} />
    <SideBar {...props} />
  </Fragment>
)