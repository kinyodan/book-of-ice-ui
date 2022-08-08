import {apiPostClient, apiGetClient} from "./axios-config";

export default {
    getBooksList(data){
        return apiGetClient.get(`/books-list`)
    },

    getBook(bool_url){
        return apiGetClient.post(`/book?url=${bool_url}`)
    },
}
