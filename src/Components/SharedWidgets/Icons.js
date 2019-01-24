import React from 'react';
import commentSVG from '../../icons/message-square.svg';
import saveSVG from '../../icons/save.svg';
import shareSVG from '../../icons/share.svg';
import checkSquareSVG from '../../icons/check-square.svg';

export const Icon = (props) => {

    const { isActive = false,
        activateHandler = () => { },
        deActivateHandler = () => { },
        child } = props;

    const icon = isActive ? checkSquareSVG : child;
    const handler = isActive ? deActivateHandler : activateHandler

    return (
        <div onClick={handler}>
            <img
                style={{
                    width: "15px"
                }}
                src={icon} />
        </div>
    )
}

export const CommentsIcon = () => (
    <Icon
        child={commentSVG}
    />
)

export const ShareIcon = (postId) => (
    <Icon child={shareSVG} />
)

export const SaveIcon = ({ postId, isSaved, save, unsave }) => (
    <Icon
        isActive={isSaved}
        child={saveSVG}
        activateHandler={() => save(postId)}
        deActivateHandler={() => unsave(postId)}
    />

)