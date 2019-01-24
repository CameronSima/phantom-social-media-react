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

export const VoteWidget = ({ upvoteHandler, downVoteHandler, score }) => (
    <div className="vote-widget d-none d-sm-inline"
        style={{
            display: "inline-block",
            width: "30px",
            float: "left"
        }}>
        <div onClick={upvoteHandler}>
            <img
                style={{ width: "16px" }}
                src={upVoteSVG} />
        </div>
        {score}
        <div onClick={downVoteHandler}>
            <img
                style={{ width: "16px" }}
                src={downVoteSVG} />
        </div>

    </div>
)

export const CommentToolBar = props => {
    return (
        <ToolBar
            {...props}
            commentIconText="Reply"
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

export const ToolBar = ({ commentIconText, isSaved, save, unsave, id }) => (
    <div>
        <MobileVoteWidget />

        <div className="inline-widget-item">
            <div className="inline-widget-item">
                <CommentsIcon />
            </div>
            <div className="inline-widget-item">
                <small className="text-muted">{commentIconText}</small>
            </div>
        </div>

        <div className="inline-widget-item">
            <div className="inline-widget-item">
                <SaveIcon
                    isSaved={isSaved}
                    unsave={unsave}
                    save={save}
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