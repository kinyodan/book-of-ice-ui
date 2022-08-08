import {apiThreadGetClient, apiGetClient, apiPostClient} from "./axios-config";

export default {
    getComments(book_isbn){
        return apiGetClient.get(`/get-comments?isbn=${book_isbn}`)
    },

    addComment(formData){
        return apiGetClient.post(`/add-comment`, formData)
    },

    updateComment(comment_id,formData){
        return apiGetClient.post(`/update-comment/${comment_id}`,formData)
    },

    deleteComment(comment_id,formData){
        return apiGetClient.post(`/update-comment/${comment_id}`,formData)
    },

    getIp(){
      return apiGetClient.get(`https://api.db-ip.com/v2/free/self`)
    },

}
