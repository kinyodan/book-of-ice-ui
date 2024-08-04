import {apiPostClient, apiGetClient} from "./axios-config";

export default {
    getPaymentsList(){
        return apiGetClient.get(`/payments`)
    },

    getPayment(bool_url){
        return apiGetClient.post(`/book?url=${bool_url}`)
    },

    getBuild(){
        return apiGetClient.get(`/build`)
    },

    getOutputFolderList(){
        return apiGetClient.get(`/output_folder_list`)
    },
    getOutputFolderDataDailyReport(output_folder_name){
        return apiGetClient.get(`/get_daily_reports?output_folder_name=${output_folder_name}`)

    },
    getOutputFolderDataDaysToSuspension(output_folder_name){
        return apiGetClient.get(`/get_days_to_suspension?output_folder_name=${output_folder_name}`)

    },
    getOutputFolderDataAgentReport(output_folder_name){
        return apiGetClient.get(`/get_agent_reports?output_folder_name=${output_folder_name}`)

    },
    getOutputFolderDataPaymentTypeReport(output_folder_name){
        return apiGetClient.get(`/get_per_payment_type_reports?output_folder_name=${output_folder_name}`)

    },
    submitPayementData(output_folder_name,formData){
        return apiGetClient.post(`/collections_reports?output_folder=${output_folder_name}`, formData)
   
    },
    getDocumentationList(){
        return apiGetClient.get(`/`)
   
    }
 
    
    
}




