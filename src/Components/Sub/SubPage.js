import React from 'react';
import { connect } from 'react-redux';
import { loadSub } from '../../redux/actions/Sub';
import { PostListPage } from '../Post/PostListPage';

class SubPage extends React.PureComponent {

    componentDidMount() {

        // load cached data if we're navigating to the same sub as last time.
        if (this.props.match.params.subID !== this.props.currentSub.id) {
            this.props.loadSub(this.props.match.params.subID);
        }
    }

    render() {
        return (
            <PostListPage { ...this.props.currentSub } />
        )
    }
}

const mapStateToProps = state => ({
    currentSub: state.CurrentSub
});

const mapDispatchToProps = dispatch => ({
loadSub: async id => {
    const res = await loadSub(id);
    res(dispatch);
},
});
  
  SubPage = connect(mapStateToProps, mapDispatchToProps)(SubPage);
  export default SubPage;
  