import React, { PureComponent, Fragment } from 'react';
import { CommentToolBar } from '../SharedWidgets/Toolbar';
import { submitComment } from '../../redux/actions/Comment';
import { flatCommentsToTree } from '../../utils/CommentTree';
import moment from 'moment';
import './Comment.css'

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

const Replies = ({ user, dispatch, children, depth }) => {
    ++depth;
    const margin = 30;
    const classname = children.length > 1 ? "threadline" : ""
    return (
        children.map(comment =>
            <Fragment>

                <div className={classname} style={{ marginLeft: margin + "px" }}>
                    <Comment
                        comment={comment}
                        dispatch={dispatch}
                        user={user}

                    />
                    <Replies
                        depth={depth}
                        children={comment.children}
                        dispatch={dispatch}

                    />
                </div>

            </Fragment>
        )
    )
}


export const CommentList = ({ user, comments, dispatch }) => {

    const nestedComments = flatCommentsToTree(comments);
    return (
        <div>
            <CommentToolbar />
            {
                nestedComments.map(topLevelComment =>
                    <div key={`comment-${topLevelComment.id}`}
                        className="threadline">
                        <Comment
                            user={user}
                            dispatch={dispatch}
                            comment={topLevelComment}
                        />
                        <Replies
                            depth={0}
                            children={topLevelComment.children}
                            dispatch={dispatch}
                            user={user}
                        />
                    </div>
                )
            }

        </div>
    )
}

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

export class Comment extends React.PureComponent {

    state = {
        commentEntryHidden: true,
        commentReply: ''
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

    render() {
        console.log("REPLY PROPSA")
        console.log(this.props)
        const { score, author, created, body_html } = this.props.comment;
        return (
            <div className="comment-container">
                <CommentDetails
                    score={score}
                    author={author}
                    created={created}
                />
                <CommentBody body_html={body_html} />
                <CommentToolBar
                    commentIconHandler={this.toggleCommentEntry}
                    {...this.props.comment} />
                <CommentEntry
                    submit={this.submitReply}
                    enterComment={this.enterComment}
                    hidden={this.state.commentEntryHidden}
                />
            </div>
        )
    }

}