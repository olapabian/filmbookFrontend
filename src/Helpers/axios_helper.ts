import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post["Content-Type"] = 'application/json'; // Poprawka: 'application/json'



export const getAuthToken = () => {
    return window.localStorage.getItem("auth_token");
}

export const setAuthToken = (token: string) => {
    window.localStorage.setItem("auth_token", token);
}
interface LoginData {
    username: string;
    password: string;
}
interface RegisterData {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    gender: string;
}

export const requestLogin = (method: string, url: string, data: LoginData ) => {
    let headers = {};
    if(getAuthToken() !== null && getAuthToken() !== "null"){
        headers = {"Authorization": `Bearer $ {getAuthToken()}`};
    }
    return axios({
        method: method,
        url: url,
        data: data 
    });
};

export const requestRegister = (method: string, url: string, data: RegisterData ) => {
    let headers = {};
    if(getAuthToken() !== null && getAuthToken() !== "null"){
        headers = {"Authorization": `Bearer $ {getAuthToken()}`};
        console.log(headers);
    }
    return axios({
        method: method,
        url: url,
        data: data 
    });
};

// import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// axios.defaults.baseURL = 'http://localhost:8081';
// axios.defaults.headers.post["Content-Type"] = 'application/json';

// export const getAuthToken = (): string | null => {
//     return window.localStorage.getItem("auth_token");
// }

// export const setAuthToken = (token: string): void => {
//     window.localStorage.setItem("auth_token", token);
// }

// export const request = <T>(method: AxiosRequestConfig["method"], url: string, data?: any): Promise<AxiosResponse<T>> => {
//     const headers: { [key: string]: string } = {};
//     const authToken = getAuthToken();
//     if (authToken !== null && authToken !== "null") {
//         headers["Authorization"] = `Bearer ${authToken}`;
//     }
//     return axios({
//         method: method,
//         url: url,
//         data: data,
//         headers: headers
//     });
// };
