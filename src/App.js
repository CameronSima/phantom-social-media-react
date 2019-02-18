import React, { PureComponent, Fragment } from 'react';
import './App.css';
import Api from './utils/api';
import { Navbar } from './Components/Navbar/Navbar';
import { PostListPage } from './Components/Post/PostListPage';
import PostDetailPage from './Components/Post/PostDetailPage/PostDetailPage';
import SubPage from './Components/Sub/SubPage';
import NewPostModal from './Components/Post/NewPostModal/NewPostModal';
import { connect } from 'react-redux';
import { fetchPopularFeed } from './redux/actions/Feeds';
import { getUserDataFromLocalStorage, fetchAccount } from './redux/actions/User';

import { BrowserRouter as Router, Route, Switch, Link, match } from "react-router-dom";
import { LOAD_FEED_INTO_CURRENT_VIEW } from './redux/ActionTypes';

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
        <SubPage {...match} />
      }
    />
    <Route
      path={`${match.url}/:postID`}
      render={(match) =>
        <PostDetailPage {...match} />
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
    console.log("APP MOUNTED", this.props)
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
          <Switch>
            <Route
              path="/" exact
              render={(props) =>
                <PostListPage
                  {...props}
                  user={this.props.user}
                  posts={this.props.currentFeed.results} />
              }
            />
            <Route
              exact
              path="subs/:subSlug"
              component={SubPage}
              render={(match) =>
                <SubPage {...match} />
              }
            />

            <Route
              exact
              path="/subs/:subSlug/posts/:postSlug"
              render={(match) =>
                <PostDetailPage {...match} />
              }
            />
            </Switch>

            {/* <Route
              path="/subs/:id"
              component={SubPage}
            /> */}
            {/* <Route
              path="/:subID"
              component={SubAndPostDetailNestedRoutes}
            /> */}

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
  currentFeed: state.CurrentFeed,
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
    const feedData = await res(dispatch);
    console.log(feedData)
    dispatch({
      type: LOAD_FEED_INTO_CURRENT_VIEW,
      payload: feedData
    })
  },
});

App = connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
