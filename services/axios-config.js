import axios from "axios";

export const apiPostClient = axios.create({
    baseURL: `${process.env.APIURL}`,
    withCredentials: false, // This is the default
    headers: { "Content-type": "application/json" }
})

export const apiGetClient = axios.create({
    baseURL: `${process.env.APIURL}`,
    withCredentials: false, // This is the default
    headers: { "Content-type": "application/json" }
})

export const apiServiceAppGetClient = axios.create({
    baseURL: `${process.env.SERVICE_APP_APIURL}`,
    withCredentials: false, // This is the default
})





