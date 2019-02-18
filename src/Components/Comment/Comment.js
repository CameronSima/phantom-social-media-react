import React, { PureComponent, Fragment } from 'react';
import { CommentToolBar } from '../SharedWidgets/Toolbar';
import { submitComment, loadDescendants, saveComment, unsaveComment, loadMoreComments } from '../../redux/actions/Comment';
import { flatCommentsToTree } from '../../utils/CommentTree';
import { loadingUtil } from '../../utils/helpers';
import moment from 'moment';
import './Comment.css';

const baseMargin = 15;

const CommentDetails = ({ score, author, created }) => {

    return (
        <Fragment>
            <div className="inline-text-item">
                <div className="inline-text-item">
                    <small>{author.username}</small>
                </div>
            </div>
            <div className="inline-text-item">
                <div className="inline-text-item">
                    <small>{score} {score === 1 ? 'point' : 'points'}</small>
                </div>
            </div>
            <div className="inline-text-item">
                <div className="inline-text-item">
                    <small>{moment(created).fromNow()}</small>
                </div>
            </div>
        </Fragment>
    )
}

const CommentBody = ({ body_html }) => {
    return (
        <div className="comment-body" dangerouslySetInnerHTML={{ __html: body_html }} />
    )
}

const SortSelector = () => (
    <span>
        Sort by
    <div className="dropdown" style={{ display: "inline-block", marginLeft: "10px" }}>
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Best
  </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#">Hot</a>
                <a className="dropdown-item" href="#">Top</a>
                <a className="dropdown-item" href="#">New</a>
                <a className="dropdown-item" href="#">Controversial</a>
            </div>
        </div>
    </span>
)

const CommentToolbar = () => (
    <div className="comment-tools">
        <SortSelector />

    </div>
)

const RecurseComments = ({ user, dispatch, children, depth }) => {
    ++depth;
    const margin = baseMargin * depth;

    return (
        children.map(comment => {
            let spacerClass = 'threadline';
            if (comment.children.length > 0) {
                spacerClass += ' invisible';
            }

            return (
                <Fragment>
                    <div className="comment-row">
                        <div className={spacerClass} style={{ marginLeft: margin }} />
                        <Comment
                            comment={comment}
                            dispatch={dispatch}
                            user={user}
                        />
                    </div>
                    <RecurseComments
                        depth={depth}
                        children={comment.children}
                        dispatch={dispatch}
                        user={user}
                    />
                </Fragment>
            )

        })
    )
}

export class CommentList extends React.PureComponent {
    constructor(props) {
        super();
        this.state = {
            showLoadMoreButton: props.comments.next !== null,
            loadMoreButtonText: 'Load More Comments'
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.showLoadMoreButton === false &&
            nextProps.comments.next !== null) {
            this.setState({
                showLoadMoreButton: true
            });
        }
    }

    loadMoreHandler = async () => {
        const { comments, dispatch } = this.props;
        loadingUtil(
            this,
            'loadMoreButtonText',
            { loadMoreButtonText: 'Load More Comments' },
            () => loadMoreComments(comments.next)(dispatch)
        );
    }

    render() {
        const { user, comments, dispatch } = this.props;
        const { results } = comments;

        const nestedComments = flatCommentsToTree(results);
        return (
            <div className="comment-list-inner">
                <CommentToolbar />

                <RecurseComments
                    depth={0}
                    children={nestedComments}
                    dispatch={dispatch}
                    user={user}
                />

                <LoadMoreLink
                    text={this.state.loadMoreButtonText}
                    shouldShow={this.state.showLoadMoreButton}
                    clickHandler={this.loadMoreHandler}
                />

            </div>
        )
    }
};

const CommentEntry = ({ enterComment, hidden, submit }) => (
    <div className="comment-entry-box">
        <i className="fa fa-lock prefix grey-text" />
        <textarea
            rows="4"
            placeholder="comment"
            hidden={hidden}
            onChange={enterComment}
            className="form-control" />
        <button
            onClick={submit}
            hidden={hidden}
            className="btn btn-success comment-reply-button">Reply</button>
    </div>
)

const LoadMoreLink = ({ clickHandler, text, shouldShow }) => {
    if (shouldShow) {
        return (
            <button style={{ margin: '13px' }}
                onClick={clickHandler}
                type="button" className="btn btn-primary btn-lg btn-block">{text}</button>
        )
    } else {
        return <div></div>
    }

}

const LoadDescendantsLink = ({ shouldShow, loadDescendantsHandler, text }) => {
    if (shouldShow) {
        return (
            <div className='inline-widget-item'
                onClick={loadDescendantsHandler}
            >
                <small className="text-muted">{text}</small>
            </div>
        )
    } else {
        return <div></div>
    }
};


export class Comment extends React.PureComponent {

    constructor(props) {
        super();
        this.loadDescendantsHandler = this.loadDescendantsHandler.bind(this);
        this.state = {
            commentEntryHidden: true,
            commentReply: '',
            showLoadMore: props.comment.has_descendants && props.comment.children.length === 0,
            loadMoreText: 'load more'
        }
    }

    enterComment = (e) => {
        this.setState({
            commentReply: e.target.value
        });
    }

    toggleCommentEntry = () => {
        this.setState({
            commentEntryHidden: !this.state.commentEntryHidden,
            commentReply: ''
        });
    }

    submitReply = async () => {
        const { comment, user } = this.props;

        const commentReply = {
            post: comment.post,
            parent: comment.id,
            body_text: this.state.commentReply
        };

        this.toggleCommentEntry();

        const thunk = await submitComment(commentReply);
        return thunk(this.props.dispatch);
    }

    async loadDescendantsHandler() {

        loadingUtil(
            this,
            'loadMoreText',
            { showLoadMore: false },
            () => loadDescendants(this.props.comment.id)(this.props.dispatch)
        )
    }

    showLoadMore = () => {

        if (this.state.showLoadMore) {
            return (
                <div className='inline-widget-item'
                    onClick={this.loadDescendantsHandler}
                >
                    <small className="text-muted">{this.state.loadMoreText}</small>
                </div>
            )
        }
    }

    render() {
        const { score, author, created, body_html, id, user_saved } = this.props.comment;
        return (
            <div className="comment-container">

                <CommentDetails
                    score={score}
                    author={author}
                    created={created}
                />
                <CommentBody body_html={body_html} />

                <CommentToolBar
                    isSaved={user_saved}
                    unsave={() => unsaveComment(id)}
                    save={() => saveComment(id)}
                    commentIconHandler={this.toggleCommentEntry}
                    {...this.props.comment} />

                <CommentEntry
                    submit={this.submitReply}
                    enterComment={this.enterComment}
                    hidden={this.state.commentEntryHidden}
                />

                <LoadDescendantsLink
                    text={this.state.loadMoreText}
                    loadDescendantsHandler={this.loadDescendantsHandler}
                    shouldShow={this.state.showLoadMore}
                />
            </div>
        )
    }
}