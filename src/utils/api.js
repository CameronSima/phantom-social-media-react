import axios from 'axios';

class Api {
    baseUrl = 'http://localhost:8000';
    client = axios.create({
        baseURL: 'http://localhost:8000',
        // timeout: 15000,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    setToken(token) {
        this.client.defaults.headers.common['Authorization'] = "Token " + token;
    }

    removeToken() {
        this.client.defaults.headers.common['Authorization'] = "";
    }

    buildUrl(url, appendBaseUrl) {
        let path = appendBaseUrl ? this.baseUrl : "";
        path += "/" + url;
        return path;
    }

    async get(url, appendBaseUrl = true) {
        //const path = this.buildUrl(url, appendBaseUrl);
    
        return this.client.get(url);
    }

    async post(url, body, appendBaseUrl = true) {
        //const path = this.buildUrl(url, appendBaseUrl);
    
        return this.client.post(url, JSON.stringify(body));
    }
}

const instance = new Api();
export default instance;