import axios from "axios";


const api=axios.create({
    baseURL:"http://localhost:8080",
    headers: { "Content-Type": "application/json" }
});

    /* Attach JWT token to every request (if exists)*/

api.interceptors.request.use((config)=>{
    const token=localStorage.getItem("token");
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
});

    /* Auto logout if token is expired or invalid*/

api.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error.response && error.response.status===401){
            localStorage.removeItem("token");
            window.location.href="/login";
        }
        return Promise.reject(error);
    }
);

export default api;