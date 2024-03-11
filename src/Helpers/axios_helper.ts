import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8081';
axios.defaults.headers.post["Content-Type"] = 'application/json'; // Poprawka: 'application/json'

export const request = (method: any, url: any, data: any ) => {
    return axios({
        method: method,
        url: url,
        data: data 
    });
};
