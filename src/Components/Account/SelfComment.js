
const SelfCommentDetails = props => {
    return (
        <Fragment>
            <div className="inline-text-item">
                <div className="inline-text-item">
                    <small>{author.username}</small>
                </div>
            </div>
            <div className="inline-text-item">
                <div className="inline-text-item">
                    <small>commented on</small>
                </div>
                <div className="inline-text-item">
                    {Comment.title}
                </div>
            </div>
            <div className="inline-text-item">
                <div className="inline-text-item">
                    <small>{posted_in.title}</small>
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