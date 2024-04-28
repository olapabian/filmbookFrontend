import axios, { AxiosResponse } from "axios";
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post["Content-Type"] = 'application/json';
import { UserInfo } from "./user_info_helper";
export interface MovieInfoDto {
    movieId: number;
    title: string;
    releaseYear: string;
    overview: string;

  }
export const getAuthToken = (): string | null => {
    return window.localStorage.getItem("auth_token");
}

export const getPeopleSearchResults = async (searchExpression: string): Promise<UserInfo[]> => {
    try {
        const authToken = getAuthToken();
        if (!authToken) {
            throw new Error("Brak tokena autoryzacyjnego.");
        }
        const requestBody = { searchExpression };
        const response: AxiosResponse<UserInfo[]> = await axios.post("/peopleSearchResults", requestBody, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data; // Zwracanie danych z odpowiedzi, a nie response.data
    } catch (error) {
        console.error("Błąd podczas wysyłania zapytania:", error);
        throw error; 
    }
}

export const getLivePeopleSearchResults = async (searchExpression: string): Promise<UserInfo[]> => {
    try {
        const authToken = getAuthToken();
        if (!authToken) {
            throw new Error("Brak tokena autoryzacyjnego.");
        }
        const requestBody = { searchExpression };
        const response: AxiosResponse<UserInfo[]> = await axios.post("/livePeopleSearchResults", requestBody, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data; // Zwracanie danych z odpowiedzi, a nie response.data
    } catch (error) {
        console.error("Błąd podczas wysyłania zapytania:", error);
        throw error; 
    }
}
export const getMovieSearchResults = async (searchExpression: string): Promise<MovieInfoDto[]> => {
    try {
        const authToken = getAuthToken();
        if (!authToken) {
            throw new Error("Brak tokena autoryzacyjnego.");
        }
        const requestBody = { searchExpression };
        const response: AxiosResponse<MovieInfoDto[]> = await axios.post("/movieSearchResults", requestBody, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Błąd podczas wysyłania zapytania:", error);
        throw error; 
    }
}

export const getLiveMovieSearchResults = async (searchExpression: string): Promise<MovieInfoDto[]> => {
    try {
        const authToken = getAuthToken();
        if (!authToken) {
            throw new Error("Brak tokena autoryzacyjnego.");
        }
        const requestBody = { searchExpression };
        const response: AxiosResponse<MovieInfoDto[]> = await axios.post("/liveMovieSearchResults", requestBody, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Błąd podczas wysyłania zapytania:", error);
        throw error; 
    }
}