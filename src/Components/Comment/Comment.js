import React, { PureComponent, Fragment } from 'react';
import { CommentToolBar } from '../SharedWidgets/Toolbar';
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

const Comment = post => {
    const { score, author, created, body_html } = post;

    return (
        <div className="comment-container">
            <CommentDetails
                score={score}
                author={author}
                created={created}
            />
            <CommentBody body_html={body_html} />
            <CommentToolBar {...post} />
            

        </div>
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

const Replies = ({ children, depth }) => {
    ++depth;
    console.log("DEPzh", depth)
    const margin = depth * 10;
    const classname = children.length > 1 ? "threadline" : ""
    return (
        children.map(comment =>
            <Fragment>
        
            <div className={classname} style={{marginLeft: margin + "px"}}>
                <Comment {...comment} />
                <Replies
                    depth={depth}
                    children={comment.children}

                />
            </div>
         
            </Fragment>
        )
    )
}

const TopLevelComments = ({ comments }) => (
    comments.map(topLevelComment =>
        <div className="threadline">
            <Comment
                {...topLevelComment}
            />
            <Replies
                depth={0}
                children={topLevelComment.children}
            />
        </div>
    )
)

export class CommentList extends PureComponent {

    toMap = comments => (
        comments.reduce((acc, curr) => {
            acc[curr.id] = curr;
            acc[curr.id]['children'] = [];
            return acc;
        }, {})
    )

    buildCommentTree = () => {
        let mappedComment;
        let tree = [];

        const comments = this.props.comments ? this.props.comments : [];
        const map = this.toMap(comments);

        for (let id in map) {
            if (map.hasOwnProperty(id)) {
                mappedComment = map[id];
                if (mappedComment.parent) {
                    map[mappedComment['parent']]['children'].push(mappedComment);
                } else {
                    tree.push(mappedComment);
                }
            }
        }
        return tree;
    }

    render() {
        console.log("CO<MMMTRENTS")
        console.log(this.props.comments)
        console.log(this.buildCommentTree())
        const nested = this.buildCommentTree();

        console.log("NESTED", nested)

        return (
            <div>
                <CommentToolbar />
                <TopLevelComments comments={nested} />
            </div>
        )
    }
}