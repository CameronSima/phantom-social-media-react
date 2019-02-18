import React from 'react';
import { connect } from 'react-redux';
import { loadSub, loadSubPosts } from '../../redux/actions/Sub';
import { PostListPage } from '../Post/PostListPage';

class SubPage extends React.PureComponent {

    componentDidMount() {
        const subId = this.props.match.params.subID;
        this.props.loadSub(subId);
    }

    render() {
        return (
            <PostListPage {...this.props.currentSub} />
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
    }
});

SubPage = connect(mapStateToProps, mapDispatchToProps)(SubPage);
export default SubPage;
