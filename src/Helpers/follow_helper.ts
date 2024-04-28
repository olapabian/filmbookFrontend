import axios, { AxiosResponse } from "axios";
import { getAuthToken } from "./axios_helper";
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post["Content-Type"] = 'application/json';
export const addFollow = (followerId: number, followingId: number): Promise<AxiosResponse<void>> => {

    console.log("add follow")
    const token = getAuthToken();
    return axios.post("/addFollow", { followerId, followingId }, {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }); 
};

export const removeFollow = (followerId: number, followingId: number): Promise<AxiosResponse<void>> => {
    const token = getAuthToken();
    return axios.post("/removeFollow", { followerId, followingId }, {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }); 
};
