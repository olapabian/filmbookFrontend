import axios, { AxiosResponse } from "axios";
import { MovieInfoDto } from "./search_helper";
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post["Content-Type"] = 'application/json';

export const getAuthToken = (): string | null => {
    return window.localStorage.getItem("auth_token");
}

export interface MoviePosterResponse {
    data: ArrayBuffer;
}

export const getMoviePosterById = async (movieId: string): Promise<MoviePosterResponse> => {
    const token = getAuthToken();
    return axios.get(`/getMoviePosterById/${movieId}`, {
        responseType: 'blob', // Określ typ odpowiedzi jako blob (binarny)
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }); 
}

export const getMovieInfoById = async (movieId: string): Promise<MovieInfoDto> => {
    try {
        const authToken = getAuthToken();
        if (!authToken) {
            throw new Error("Brak tokena autoryzacyjnego.");
        }
        return axios.get(`/getMovieInfoById/${movieId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
    } catch (error) {
        console.error("Błąd podczas wysyłania zapytania:", error);
        throw error;
    }
}
export const getMoviePhotosIdsByMovieId = async (movieId: string): Promise<string[]> => {
    const token = getAuthToken();
    return axios.get(`/getMoviePhotosIdsByMovieId/${movieId}`, {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }); 
}

export const getMoviePhotosByPhotoId = async (photoId: string): Promise<ArrayBuffer> => {
    const token = getAuthToken();
    return axios.get(`/getMoviePhotosByPhotoId/${photoId}`, {
        responseType: 'blob', 
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }); 
}

export const getMovieAverageRating = async (movieId: string) => {
    try {
        const authToken = getAuthToken(); 
        const response = await axios.get(`/getMovieAverageRating/${movieId}`, {
            headers: {
                Authorization: `Bearer ${authToken}` 
            }
        });
        return response.data; 
    } catch (error) {
        console.error("Błąd podczas pobierania średniej oceny filmu:", error);
        throw error;
    }
};

