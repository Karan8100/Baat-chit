import axios from "axios";

const base_Url = import.meta.env.MODE === "development" ? "http://localhost:4000/api" : "/api"; 
export const axiosInstance = axios.create({
    baseURL : base_Url,
    withCredentials: true, // Include credentials (cookies) in requests
})



//when export defualt used only one per file and can be imported with any name without {} brackets
//when export used multiple times in a file then it can be imported with the same name as used in the file with {} brackets