import { GET_LOADED_FEED, GET_POPULAR_FEED } from "../ActionTypes";

const initialState = {
    currentFeed: 'Popular',
    feeds: []
};

const mergeFeeds = (feeds, updatedFeed, feedId) => {
    let merged = false;

    const nextFeeds = feeds.map(feed => {
        if (feed.feedId === feedId) {
            merged = true;
            return updatedFeed
        } else {
            return feed
        }
    });

    return merged ? nextFeeds : feeds.concat([{
        ...updatedFeed,
        feedId: feedId
    }]);
}

const Feeds = (state = initialState, action) => {

    switch(action.type) {

        case GET_POPULAR_FEED :
            return {
                currentFeed: 'Popular',
                feeds: mergeFeeds(state.feeds, action.payload, 'Popular')
            }


        default:
            return state




    }
}

export default Feeds;