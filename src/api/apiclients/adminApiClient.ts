import axios from "axios";

export const apiAdmin = axios.create({
    baseURL : "http://localhost:8080",
    headers : {
        'Content-Type' : 'application/json'
    },
    withCredentials: true,
})

apiAdmin.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("adminToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } 

        return config;
    }, (error) => {return Promise.reject(error)},
);