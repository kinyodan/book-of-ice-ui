import {apiPostClient, apiGetClient} from "./axios-config";

export default {

    submitTrade(data){
        let headers = {
            Authorization: "",
            "Content-Type": "Application/json"
        }
        return apiPostClient.post(`/predict`, data)
    },

    publishToWebsocket(data){
        return apiPostClient.post(`/publish`, data)
    },

    getCurrenciesList(){
        return apiGetClient.get(`/get_currencies_list`)
    },

    getOutputFolderDataDailyReport(output_folder_name){
        return apiGetClient.get(`/get_daily_reports?output_folder_name=${output_folder_name}`)

    },
  
    
}




