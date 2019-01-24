import React, { Fragment } from 'react';

export default class CommentEntry extends React.PureComponent {

    state = {
        comment: ""
    }

    enterComment = (e) => {
        this.setState({
            comment: e.target.value
        });
    }

    render() {
        return (
            <Fragment>
                <i className="fa fa-lock prefix grey-text" />
                <textarea rows="4" placeholder="comment" onChange={this.enterComment} className="form-control" />
            </Fragment>
        )
    }
}