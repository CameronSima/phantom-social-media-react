import React from 'react';

const homeDescription = "The best website known to man.";

export const CommunityDetails = (props) => {
    const {
        title = "Home",
        description = homeDescription,
        userIsSubbed = false,
        num_subscribers = 0
    } = props;

    return (
        <div className="card">
            <div className="card-header">
                {title}
            </div>
            <div className="card-body">
                <div className="community-details-user-counts">
                    <span>
                        <div>{num_subscribers}</div>
                        <div>Subscribers</div>
                    </span>
                </div>
                <p>{description}</p>
                <button data-toggle="modal" data-target="#newPostModal" className="btn btn-outline-primary btn-lg btn-block">Post</button>
                <button className="btn btn-outline-success btn-lg btn-block">Create Community</button>

            </div>
        </div>
    )


}

