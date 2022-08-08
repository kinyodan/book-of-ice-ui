import {apiServiceAppGetClient, apiGetClient} from "./axios-config";

export default {
    getCharacterList(data){
        return apiGetClient.post(`/characters-list`, data)
    },

    getCharacter(data){
        return apiGetClient.post(`/get-character`,data)
    },

    getSpouse(url){
        return apiGetClient.get(`${url}`)
    },

    getCharacterBook(url){
        return apiGetClient.get(`${url}`)
    },

}
