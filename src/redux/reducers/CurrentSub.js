import { LOAD_SUB, LOAD_SUB_ERROR } from '../ActionTypes';

const initialState = {
    id: 0,
    title: "",
    slug: "",
    url: "",
    created: "",
    created_by: {
        id: 0,
        url: "",
        username: ""
    },
    num_subscribers: 0,
    admins: []
}

const CurrentSub = (state = initialState, action) => {
    
    switch (action.type) {

        case LOAD_SUB :
            return action.payload;

        case LOAD_SUB_ERROR :
            return state;

        default :
            return state;
    }
}

export default CurrentSub;