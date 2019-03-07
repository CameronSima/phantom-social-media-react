import React from 'react';
import './SharedWidgets.css';
import { ShareIcon, SaveIcon, CommentsIcon } from './Icons';
import upVoteSVG from '../../icons/arrow-up.svg'
import downVoteSVG from '../../icons/arrow-down.svg'

export const MobileVoteWidget = ({ upvoteHandler, downVoteHandler, score = 0 }) => (
    <div className="d-inline d-sm-none"
        style={{
            margin: "15px"
        }}>
        <div style={{
            display: "inline-block"
        }}
            onClick={upvoteHandler}>
            <img
                style={{ width: "16px" }}
                src={upVoteSVG} />
        </div>
        {score}
        <div style={{
            display: "inline-block"
        }}
            onClick={downVoteHandler}>
            <img
                style={{ width: "16px", fill: "red" }}
                src={downVoteSVG} />
        </div>

    </div>
)

export const VoteWidget = ({ user_vote, upvoteHandler, downVoteHandler, score }) => {

    const upvoteStyle = user_vote === 1 ? 'vote-arrow user-vote' : 'vote-arrow';
    const downvoteStyle = user_vote === -1 ? 'vote-arrow user-vote' : 'vote-arrow';

    return (
        <div className="vote-widget d-none d-sm-inline"
            style={{
                display: "inline-block",
                width: "30px",
                float: "left",
                cursor: "pointer"

            }}>
            <div onClick={upvoteHandler}>
                <img
                    className={upvoteStyle}
                    src={upVoteSVG} />
            </div>
            {score}
            <div onClick={downVoteHandler}>
                <img
                    className={downvoteStyle}
                    src={downVoteSVG} />
            </div>

        </div>
    )
}

export const CommentToolBar = props => {
    return (
        <ToolBar
            {...props}
            commentIconText="Reply"
            commentIconHandler={props.commentIconHandler}
        />
    )
}

export const PostToolbar = props => {
    const { num_comments } = props;
    return (
        <ToolBar
            {...props}
            commentIconText={num_comments}
        />
    )
}

export const ToolBar = props => {
    const { commentIconHandler, commentIconText, isSaved, save, unsave, id } = props;
    return (
        <div>
            <MobileVoteWidget />

            <div className="inline-widget-item">
                <div className="inline-widget-item">
                    <CommentsIcon
                        commentIconHandler={commentIconHandler}
                    />
                </div>
                <div className="inline-widget-item">
                    <small onClick={commentIconHandler} className="text-muted">{commentIconText}</small>
                </div>
            </div>

            <div className="inline-widget-item">
                <div className="inline-widget-item">
                    <SaveIcon
                        isSaved={isSaved}
                        save={save}
                        unsave={unsave}
                        postId={id} />
                </div>
                <div className="inline-widget-item">
                    <small className="text-muted">{isSaved ? "Unsave" : "Save"}</small>
                </div>
            </div>

            <div className="inline-widget-item">
                <div className="inline-widget-item">
                    <ShareIcon />
                </div>
                <div className="inline-widget-item">
                    <small className="text-muted">Share</small>
                </div>
            </div>
        </div>
    )

}