<template>
    <div class="row">
      <div class="col-md-12">
        <card card-body-classes="table-full-width" style="background-color: #ffffff;" >
          <div class="col-md-12">
           <h4 slot="header" style="color: black;" class="card-title"> BACK-END API Documentation! -- {{ headerTitle }}</h4>
           
           <loading-panel v-if="loading"></loading-panel>
           <Documentation  :tableData="tableData"></Documentation>
          </div>
  
        </card>
   
      </div>
    </div>
  </template>
  <script>
  import { Table, TableColumn } from 'element-ui';
  import LoadingPanel from "~/components/LoadingPanel";
  import PaymentsService from "~/services/PaymentsService";
import Documentation from '~/components/reports/Documentation.vue';
  
  export default {
    name: 'DocumentatioHome',
    components: {
    LoadingPanel,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    Documentation
},
    data () {
      return {
        booksList:[],
        response_error:false,
        response_errorMessage:"",
        response_success:false,
        response_success_messege:"",
        tableData: [ ],
        headerTitle:"",
        loading:true,
      };
    },
    mounted () {
      this.getPaymentsList()
    },
    computed: {
      enableRTL () {
        return this.$route.query.enableRTL;
      },
      isRTL () {
        return this.$rtl.isRTL;
      },
  
    },
    methods: {
      async getPaymentsList(){
        let response = await PaymentsService.getDocumentationList()
        if(response.data.status){
            this.headerTitle = response.data.messege
            this.tableData = Object.values(response.data.api_path_documentation_data)
            this.loading=false
        }else{
            this.response_error = response.message
            this.response_errorMessage = response.message
        }
      },
      
    },
  
  }
  </script>
  <style>
  .output-folder input{
    color: black !important;
    font-size: 14px !important;
  }
  .notify-success{
   color: green !important;
  }
  .notify-error{
    color: red !important;
    
  }
  </style>
  