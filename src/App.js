import React, { PureComponent, Fragment } from 'react';
import './App.css';
import Api from './utils/api';
import { Navbar } from './Components/Navbar/Navbar';
import SideBar from './Components/Sidebar/Sidebar';
import Post from './Components/Post/Post';
import { PostListPage } from './Components/Post/PostListPage';
import PostDetailPage from './Components/Post/PostDetailPage/PostDetailPage';
import SubPage from './Components/Sub/SubPage';
import NewPostModal from './Components/Post/NewPostModal/NewPostModal';
import { connect } from 'react-redux';
import { fetchPopularFeed } from './redux/actions/Feed';
import { getUserDataFromLocalStorage, fetchAccount } from './redux/actions/User';

import { BrowserRouter as Router, Route, Link, match } from "react-router-dom";

const Header = props => (
  <header className="App-header">
    <Navbar {...props} />

  </header>
)

const SubAndPostDetailNestedRoutes = ({ match, props }) => (
  <Fragment>
    <Route
      exact
      path={match.path}
      component={SubPage}
      render={(match) => 
        <SubPage { ...match } />
      }
    />
    <Route
      path={`${match.url}/:postID`}
      render={(match) =>
        <PostDetailPage { ...match } />
      }
    />

  </Fragment>
)

class App extends PureComponent {
  api = Api;
  state = {
    frontPageData: {
      results: [],
      timerStarted: false
    }
  }

  componentWillReceiveProps = props => {
    if (!props.user.isLoggedIn && props.user.token) {
      props.getUserAccountData(props.user.account.url)
        .then(props.fetchPopularFeed)
    }

    // // set up a timer to refresh data regularly.
    // if (props.user.isLoggedIn && !this.state.timerStarted) {


      
    //   // this.setState({
    //   //   timerStarted: true
    //   // }, () => {
    //   //   setInterval(props.fetchPopularFeed, 60000)
    //   // })
    // }
  }

  componentDidMount() {
    this.props.getUserDataFromLocalStorage();
  }

  render() {

    console.log("APP PAGE PROPS", this.props)
    const userSubs = this.props.user.account.subbed_to;

    return (
      <Router>
        <div className="container-fluid">
          <div className="row">
            <Header userSubs={userSubs} />
            <NewPostModal />
          </div>

          <div className="row">
            <Route
              path="/" exact
              render={(props) =>
                <PostListPage
                  {...props}
                  savedPosts={this.props.savedPosts}
                  posts={this.props.popularFeed.results} />
              }
            />

            {/* <Route
              path="/subs/:id"
              component={SubPage}
            /> */}
            <Route
              path="/:subID"
              component={SubAndPostDetailNestedRoutes}
            />

            {/* <Route
              path="/posts/:id"
              component={PostDetailPage}
            /> */}

          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  popularFeed: state.PopularFeed,
  savedPosts: state.User.account.saved_posts,
  user: state.User
});

const mapDispatchToProps = dispatch => ({
  getUserDataFromLocalStorage: () => dispatch(
    getUserDataFromLocalStorage()
  ),
  getUserAccountData: async (accountUrl) => {
    const res = await fetchAccount(accountUrl);
    return res(dispatch);
  },
  fetchPopularFeed: async () => {
    const res = await fetchPopularFeed();
    res(dispatch)
  },
});

App = connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
