import axios, { AxiosResponse } from "axios";
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post["Content-Type"] = 'application/json';

export const getAuthToken = (): string | null => {
    return window.localStorage.getItem("auth_token");
}
export interface UserInfo {
    userId: number;
    firstName: string;
    lastName: string;
    username: string;
    gender: string;
    friendsIds: string;
    folllowingIds: string;
    followersIds: string;
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
