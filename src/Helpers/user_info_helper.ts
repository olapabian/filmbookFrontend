import axios, { AxiosResponse } from "axios";
import "./axios_helper"
import { useState } from "react";
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post["Content-Type"] = 'application/json';


export interface UserInfo {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  gender: string;
  friendsIds: string;
}
export const getAuthToken = (): string | null => {
    return window.localStorage.getItem("auth_token");
}

  export const getUserInfo = (username: string | undefined): Promise<AxiosResponse<UserInfo>> => {
    const token = getAuthToken();
    return axios.get(`/userInfo/${username}`, {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }); 
};


export default {
    getUserInfo
};
