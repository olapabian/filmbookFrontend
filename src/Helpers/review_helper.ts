import axios from "axios";
import {UserInfo} from "../Helpers/user_info_helper"
import { MovieInfoDto } from "../Helpers/search_helper";
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post["Content-Type"] = 'application/json';

export const getAuthToken = (): string | null => {
    return window.localStorage.getItem("auth_token");
}
export interface ReviewInfoResponse {
    movieId: number,
    userId: number,
    stars: number,
    content: string
}

export interface ReviewInfoResponseEdit {
    stars: number,
    content: string
}
export interface ReviewInfoDto {
    reviewId: number;
    stars: number;
    createdDate: Date;
    updatedDate: Date;
    createdTime: string;
    updatedTime: string;
    content: string;
    likes: number;
    commentsCount: number;
    usersWhoLikedIds: string;
    user: UserInfo;
    movieInfo: MovieInfoDto;
}

export const addReview = async (reviewInfoResponse: ReviewInfoResponse) => {
    try {
        const token = getAuthToken();
        await axios.post('/addReview', reviewInfoResponse, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error("Błąd podczas dodawania recenzji: ", error);
        throw error;
    }
};

export const deleteReviewById = async (reviewId: string) => {
    try {
        const token = getAuthToken();
        await axios.delete(`/deleteReviewById/${reviewId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error("Błąd podczas usuwania recenzji: ", error);
        throw error;
    }
};

export const editReviewById = async (reviewId: string, reviewInfoResponseEdit: ReviewInfoResponseEdit) => {
    try {
        const token = getAuthToken();
        await axios.patch(`/editReviewById/${reviewId}`, reviewInfoResponseEdit, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error("Błąd podczas edytowania recenzji: ", error);
        throw error;
    }
};

export const getReviewByReviewId = async (reviewId: string) => {
    try {
        const token = getAuthToken();
        const response = await axios.get(`/getReviewByReviewId/${reviewId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Błąd podczas pobierania recenzji: ", error);
        throw error;
    }
};

export const getReviewsByMovieId = async (movieId: string) => {
    try {
        const token = getAuthToken();
        const response = await axios.get(`/getReviewsByMovieId/${movieId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Błąd podczas pobierania recenzji: ", error);
        throw error;
    }
};

export const getReviewsByUserId = async (userId: string) => {
    try {
        const token = getAuthToken();
        const response = await axios.get(`/getReviewsByUserId/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Błąd podczas pobierania recenzji: ", error);
        throw error;
    }
};

export const getReviewsByMovieIdAndUsersIds = async (movieId: string, userIds: string[]) => {
    try {
        const token = getAuthToken();
        const response = await axios.post(`/getReviewsByMovieIdAndUsersIds/${movieId}`,  userIds , {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' // Ustawiamy Content-Type na application/json
            }
        });
        
        return response.data;
    } catch (error) {
        console.error("Błąd podczas pobierania recenzji: ", error);
        throw error;
    }

};




export const isUserReviewedThisMovie = async (movieId: string, userId: string) => {
    try {
        const token = getAuthToken();
        const response = await axios.get(`/isUserReviewedThisMovie/${movieId}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Błąd podczas sprawdzania recenzji użytkownika: ", error);
        throw error;
    }
};

export const getReviewsByUsersIds = async (userIds: string[]) => {
    try {
        const token = getAuthToken(); 
        const response = await axios.post('/getReviewsByUsersIds', userIds, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' // Ustawiamy Content-Type na application/json
            }
        });
        
        return response.data;
    } catch (error) {
        console.error("Błąd podczas pobierania recenzji: ", error);
        throw error;
    }
};