<template>
    <div class="row">
      <div class="col-lg-3">
        <card type="tasks" :header-classes="{ 'text-left': true }">
          <template slot="header">
            <p class="card-category d-inline">Sorting</p>
            <base-dropdown
                menu-on-right=""
                tag="div"
                title-classes=" btn-link btn-icon"
                :class="{ 'float-left': true }"
            >
              <span slot="title" class="">Select Output folder Name</span>
              <a v-for="currency in currenciesList " class="dropdown-item" href="javascript:void" @click="getFolderData(currency)"> {{ currency }} </a>
              {{currenciesList}}
              </base-dropdown>
          </template>
        </card>

        <div class=""><user-card :currenciesList="currenciesList"  :reportData="reportData" > </user-card></div>
      </div>
      <div class="col-md-9"><daily-report-details  :tradingData="tradingData" :tableData="collections_per_day"  :currenciesList="currenciesList" :reportTitle="reportTitle"> </daily-report-details></div>

    </div>
  </template>
  <script>
  import UserCard from '../../components/reports/UserCard.vue';
  import DailyReportDetails from '~/components/reports/DailyReportDetails.vue';
import ApiService from '~/services/ApiService';
import PaymentsService from '~/services/PaymentsService';

  export default {
    name: 'user',
    components: {
      DailyReportDetails,
      UserCard
    },
    data(){
      return{
        tableData:[],
        days_to_suspension:[],
        collections_per_agent:[],
        collections_per_day:[],
        output_folder_list:[],
        reportData:[] ,
        reportTitle: "",
        currenciesList: [],
        tradingData: ""
      }
    },
    computed:{
  
    },
    created(){
      this.getCurrenciesData()
      this.$nuxt.$on('set-trading-data', (event) => {
         this.setTradingData(event)
      })

    },
    mounted() {
    },
    methods:{
      async getCurrenciesData(){
        let response = await ApiService.getCurrenciesList()        
        if (response.data.status){
          this.currenciesList = response.data.data
        }
      },
      async getBuildData(){
        let response = await PaymentsService.getOutputFolderList()
        if (response.data.status){
          this.output_folder_list = response.data.data
        }
      },
      async getFolderData(event){
        let response = await PaymentsService.getOutputFolderDataDailyReport(event)
        if (response.data.status){
          this.reportData = response.data.data
        }      
      },
      async setTradingData(event){
        this.tradingData = event 
      }

    }
  };
  </script>
  <style></style>
  