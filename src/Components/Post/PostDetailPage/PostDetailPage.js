import React, { PureComponent, Fragment } from 'react';
import PostDetail from './PostDetail';
import SideBar from '../../Sidebar/Sidebar';
import Api from '../../../utils/api';
import { BrowserRouter as Router, Route, Link, match } from "react-router-dom";

const Page = ({ post }) => (
    <Fragment>
      <PostDetail {...post} />
      <SideBar {...post} />
    </Fragment>
  )
  
  export default class PostDetailPage extends PureComponent {
  
    state = {
      post: {}
    }
  
    componentDidMount() {
      this.getPostData();
    }
  
    getPostData = async () => {
      const id = this.props.match.params.postID;

      const url = 'http://localhost:8000/posts/' + id + '/';
      const response = await Api.get(url, false);
      this.setState({ 
        post: response.data 
      });
    }
  
    render() {

      console.log("POST DTAIL", this.props)
      return (
        <Page
          post={this.state.post}
        />
      )
    }
  }