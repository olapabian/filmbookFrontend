import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post["Content-Type"] = 'application/json';

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

// Pobierz obrazek użytkownika po nazwie użytkownika
export const getUserImageByUsername = (username: string): Promise<AxiosResponse<Blob>> => {
    const token = getAuthToken();
    return axios.get(`/userImageByUsername/${username}`, {
        responseType: 'blob', // Określ typ odpowiedzi jako blob (binarny)
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }); 
};

// Pobierz obrazek użytkownika po ID
export const getUserImageById = (userId: number): Promise<AxiosResponse<Blob>> => {
    const token = getAuthToken();
    return axios.get(`/userImageById/${userId}`, {
        responseType: 'blob', // Określ typ odpowiedzi jako blob (binarny)
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }); 
};

export const insertUserImageById = (userId: number, image: Blob): Promise<void> => {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append('image', image); // Dodaj obrazek do danych formularza

    // Przekształć obiekt Blob do tablicy bajtów
    const reader = new FileReader();
    reader.readAsArrayBuffer(image);
    return new Promise((resolve, reject) => {
        reader.onload = () => {
            const arrayBuffer = reader.result as ArrayBuffer;
            const byteArray = new Uint8Array(arrayBuffer);
            axios.put(`/insertUserImageById/${userId}`, byteArray, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/octet-stream' // Zmień typ treści na application/octet-stream
                }
            }).then(() => {
                resolve();
            }).catch(error => {
                reject(error);
            });
        };
        reader.onerror = error => {
            reject(error);
        };
    });
};
export const deleteUserImageById = (userId: number): Promise<void> => {
    const token = getAuthToken();
    console.log(token);
    console.log(userId);
    return axios.delete(`/deleteUserImageById/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    });
};
