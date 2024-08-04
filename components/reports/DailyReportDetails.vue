<template>
  <card style="background-color: #ffffff;">
    <div class="col-md-12">
          <div  class="col-md-3 output-folder" >
            <card type="tasks" :header-classes="{ 'text-left': true }">  
              <template slot="header">
                 <strong>{{ tradingData }}</strong>

              </template>
            </card>
            <slot>
              <UToggle v-model="selected" />

                <input
                  v-model="bet_amount"
                  class="form-control"
                  type="text"
                  aria-describedby=""
                />
            </slot>
          </div>
          <div  class="col-md-3 output-folder" >
            <button type="submit" @click="submitTrade()" :disabled="disabled" class="btn">submit</button>
          </div>
          <!-- <span class="notify-success" v-if="response_success">{{ response_success_messege }}</span> -->
          <!-- <span class="notify-error" v-if="response_error">{{ response_errorMessage }}</span> -->
          <h4 slot="header" class="card-title">Payments</h4>
          <div  class="col-md-3" >
            <trade-result :clientId="this.tradingData"></trade-result>
            <!-- <base-dropdown
                menu-on-right=""
                tag="div"
                title-classes=" btn-link btn-icon"
                :class="{ 'float-left': isRTL }"
            >
              <span slot="title" class="">Select Filter</span>
              <a  class="dropdown-item" href="javascript:void" @click="getFolderData('sort_ascending')"> sort_ascending </a>
              <a  class="dropdown-item" href="javascript:void" @click="getFolderData('sort_ascending')"> sort_ascending </a>
              <a  class="dropdown-item" href="javascript:void" @click="getFolderData('sort_ascending')"> sort_ascending </a>
              <a  class="dropdown-item" href="javascript:void" @click="getFolderData('sort_ascending')"> sort_ascending </a>
           
            </base-dropdown> -->
          </div>  
    </div>

    <span v-if="loading">
    <loading-panel></loading-panel>
    </span>
    <div style="background-color: #ffffff;">
      <h5 slot="header" class="title"> </h5>
      <div class="row">
        <h5 slot="header" class="title" style="padding-left: 20px;padding-right: 20px; color: #909399 !important;">REPORT FOR -- <strong>{{ reportTitle }}</strong> </h5>
        <daily-reports-table :tableData="tableData"> </daily-reports-table>
      </div>
      <span v-if="loading">
        <loading-panel></loading-panel>
      </span>
    </div>
  </card>
</template>
<script>
import { Table, TableColumn } from 'element-ui';
import DailyReportsTable from "./DailyReportsTable.vue";
import ApiService from '~/services/ApiService';
import TradeResult from '../trade_area/TradeResult.vue';

export default {
  components: {
    DailyReportsTable,
    TradeResult,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
      description: 'Table data'
    },
    reportTitle:{
      type: String,
      default: "",
      description: 'Table data'
    },
    currencies: {
      type: Array,
      default: () => [],
      description: 'Currencies data'
    },
    tradingData: {
      type: String,
      default: null,
      description: 'Table data'
    }
  },
  data(){
      return{
        loading:true,
        data: "",
        bet_amount: null,
        currency: this.tradingData,
        tradeResponse: false,
        disabled: true,
        submitData: [],
        selected: null
      }
    },
    computed:{
      enableRTL () {
        console.log("--enableRTL--enableRTL")
        return this.setDisbaled()
      },
    },
    created(){
    
    },
    mounted() {
    },
    methods:{
      setDisbaled(){
        return this.bet_amount ? false : true
      },
      async submitTrade(){
        let data = {bet_amount:parseInt(this.bet_amount), currency: this.tradingData, is_otc: true}
        let formData = new FormData()
        formData.append("currency", this.tradingData)
        formData.append("bet_amount", this.bet_amount)
        console.log(formData)

        let response = await ApiService.submitTrade(data)
        console.log("submitTrade--submitTrade")
        
        if (response.data.status){
          this.tradeResponse = response.data
          console.log(this.tradeResponse)

        }
      },
    },
    watch: {
      bet_amount: function(newVal) {
        console.log(this.setDisbaled())
        console.log(newVal)
        let formData = new FormData()
        formData.append("currency", this.tradingData)
        formData.append("bet_amount", this.bet_amount)
        console.log('formData')
        console.log(formData)
        console.log(this.tradingData)
        console.log(this.bet_amount)
        this.disabled = this.setDisbaled()
      }
    }
};
</script>
<style>
.card-title{
  color:black !important;
}
</style>
