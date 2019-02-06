import React, { Fragment } from 'react';

export default class CommentEntry extends React.PureComponent {

    state = {
        comment: "",
        hidden: true
    }

    enterComment = (e) => {
        this.setState({
            comment: e.target.value
        });
    }

    render() {
        return (
            <div className="comment-entry-box">
                <i className="fa fa-lock prefix grey-text" />
                <textarea 
                    rows="4" 
                    placeholder="comment" 
                    hidden={true}
                    onChange={this.enterComment} 
                    className="form-control" />
            </div>

        )
    }
}