import { LOAD_SUB } from '../ActionTypes';

const initialState = [];

const Subs = (state = initialState, action) => {

    switch(action.type) {
        case LOAD_SUB :

        return state.map(sub => {
            if (sub.id === action.payload.id) {
                return action.payload
            } else {
                return sub
            }
        })

        default:
            return state;

    }
}

export default Subs;