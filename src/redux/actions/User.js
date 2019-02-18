import { LOGIN, GET_USER_DATA_FROM_LOCAL_STORAGE, UN_SAVE_POST, SAVE_POST, GET_USER_ACCOUNT_DATA } from '../ActionTypes';
import Api from '../../utils/api';

export const getUserDataFromLocalStorage = () => {
    const token = localStorage.getItem('token');
    const accountUrl = localStorage.getItem('accountUrl');

    return {
        type: GET_USER_DATA_FROM_LOCAL_STORAGE,
        payload: {
            token: token,
            accountUrl: accountUrl
        }
    };
};

// If we found a token in localStorage, use the accountUrl to get
// the user's account.
export const fetchAccount = accountUrl => (
    async dispatch => {
        try {
            const response = await Api.get(accountUrl, false);
            dispatch({
                type: GET_USER_ACCOUNT_DATA,
                payload: response.data
            })
        } catch (e) {
            // an error here likely means the token is invalid.
            localStorage.removeItem('token');
            localStorage.removeItem('accountUrl');
            Api.removeToken();

        }

    }
)

export const login = async (username, password) => (
    async dispatch => {
        const { data, status } = await Api.post('api-token-auth/',  {
            username: username,
            password: password
        }, false);


        localStorage.setItem('token', data.token);
        localStorage.setItem('accountUrl', data.account.url);
  
        return dispatch({
            type: LOGIN,
            payload: {
                token: data.token,
                account: data.account
            }
        })
    }
)