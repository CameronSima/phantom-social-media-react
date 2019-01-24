import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { submitPost } from '../../../redux/actions/Post';
import './NewPostModal.css';

const postTypes = { TEXT: "Text", LINK: "Link" };


const PostTypeSelector = ({ selectHandler, selectedPostType = postTypes.TEXT }) => (
    <ul className="nav nav-tabs">
        {Object.values(postTypes).map(postType => {
            return (
                <li className="nav-item"
                    style={{ cursor: 'pointer' }}
                    onClick={() => { selectHandler(postType) }}>
                    <p className={"nav-link" + (postType === selectedPostType ? " active" : "")} href="#">{postType}</p>
                </li>
            )
        })
        }
    </ul>
)

const PostingToSelector = ({ selectedSub, subs = [{ title: 'Home' }], postedToHandler }) => {
    const list = subs.map(sub => {
        return <a key={sub.id} onClick={() => { postedToHandler(sub) }} className="dropdown-item" href="#">{sub.title}</a>
    });

    //list.unshift(<div className="dropdown-divider"></div>)
    list.unshift(<div style={{textAlign: "center"}}><small>Subscriptions</small></div>)

    return (
        <div style={{ display: "inline-block", float: 'right' }}>
            Posting to :
    <div className="btn-group" style={{ marginLeft: "8px" }}>
                <button type="button" className="btn btn-success">{selectedSub.title}</button>
                <button type="button" className="btn btn-success dropdown-toggle dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="sr-only">Toggle Dropdown</span>
                </button>
                <div className="dropdown-menu">
                    { list }
                </div>
            </div>
        </div>
    )

}

class NewPostModal extends PureComponent {

    state = {
        post_type: postTypes.TEXT,
        title: "",
        body: "",
        link: "",
        posted_in: { title: "Home", id: 0 },
        nsfw: false,
    }

    selectPostType = (postType) => {
        this.setState({
            post_type: postType
        });
    }

    enterPostedTo = (url) => {
        console.log(url)
        this.setState({
            posted_in: url
        })
    }

    enterTitle = (e) => {
        this.setState({
            title: e.target.value
        });
    }

    enterLink = (e) => {
        this.setState({
            link: e.target.value
        });
    }

    enterBody = (e) => {
        this.setState({
            body: e.target.value
        });
    }

    submit = async () => {
        const payload = {
            body_text: this.state.body,
            title: this.state.title,
            posted_in: this.state.posted_in.id,
            link_url: this.state.link
        };

        if (this.state.post_type == postTypes.LINK) {
            delete payload.body_text;
        } else {
            delete payload.link_url;
        }
        const response = await this.props.submitPost(payload);
        console.log("RESPONSE IN COM", response)
    }

    render() {
        let bodyOrLink;

        if (this.state.post_type === postTypes.TEXT) {
            bodyOrLink = (
                <Fragment>
                    <i className="fa fa-lock prefix grey-text" />
                    <textarea rows="5" placeholder="text" onChange={this.enterBody} className="form-control" />
                </Fragment>
            )
        } else {
            bodyOrLink = (
                <Fragment>
                    <i className="fa fa-lock prefix grey-text" />
                    <textarea rows="2" placeholder="link" onChange={this.enterLink} className="form-control" />
                </Fragment>
            )
        }

        return (
            <div className="modal fade" data-backdrop="static" id="newPostModal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h4 className="modal-title w-100 font-weight-bold">New Post</h4>
                            <button type="button" className="close" id="closeModal" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body mx-3">

                            <div className="md-form mb-5">
                                <PostingToSelector
                                    selectedSub={this.state.posted_in}
                                    subs={this.props.account.subbed_to}
                                    postedToHandler={this.enterPostedTo}
                                />
                                <PostTypeSelector
                                    selectHandler={this.selectPostType}
                                    selectedPostType={this.state.post_type}
                                />
                            </div>

                            <div className="md-form mb-5">
                                <i className="fa fa-envelope prefix grey-text" />
                                <input type="text" placeholder="title" onChange={this.enterTitle} id="defaultForm-email" className="form-control validate" />

                            </div>
                            <div className="md-form mb-4">
                                {bodyOrLink}
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            <button onClick={this.submit} className="btn btn-success my-2 my-sm-0" >Post</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => (
    { ...state.User }
)

const mapDispatchToProps = dispatch => ({
    submitPost: async (post) => {
        const res = await submitPost(post);
        return res(dispatch);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPostModal)