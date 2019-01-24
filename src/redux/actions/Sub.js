import { LOAD_SUB, LOAD_SUB_ERROR } from '../ActionTypes';
import Api from '../../utils/api';

export const loadSub = id => (
    async dispatch => {
        try {
            const url = 'http://localhost:8000/subs/' + id + '/';
            const response = await Api.get(url, false);
        
            if (response.status === 200) {
                dispatch({
                    type: LOAD_SUB,
                    payload: response.data
                });
            } else {
                throw new Error(response.status_text)
            }
        } catch (e) {
            dispatch({
                type: LOAD_SUB_ERROR,
                payload: e
            });
        }
    }
)
