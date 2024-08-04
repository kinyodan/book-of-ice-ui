<template>
  <div class="row">
    <div class="col-md-12">
      <card card-body-classes="table-full-width" style="background-color: #ffffff;" >
        <div class="col-md-12">
          <div  class="col-md-3 output-folder" >
            Enter output folder name
            <slot>
                <input
                  v-model="output_folder_name"
                  class="form-control"
                  type="text"
                  aria-describedby=""
                />
            </slot>
          </div>
          <div  class="col-md-3 output-folder" >
            Upload csv file
            <slot>
                <input
                  v-on:change="handleFileUpload()"
                  class="form-control"
                  id="csv-file"
                  type="file"
                  aria-describedby=""
                />
            </slot></br>
            <button type="submit" @click="subdmitForm()" class="btn">submit</button>
          </div>
          <span class="notify-success" v-if="response_success">{{ response_success_messege }}</span>
          <span class="notify-error" v-if="response_error">{{ response_errorMessage }}</span>
          <h4 slot="header" class="card-title">Payments</h4>
          <div  class="col-md-3" >
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
         <loading-panel v-if="loading"></loading-panel>
	       <PaymentsList  :tableData="tableData"></PaymentsList>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { Table, TableColumn } from 'element-ui';
import LoadingPanel from "~/components/LoadingPanel";
import BaseInput from '~/components/Inputs/BaseInput.vue';
import BaseFileinput from "~/components/Inputs/BaseFileInput.vue"
import PaymentsList from "~/components/reports/PaymentsList.vue"
import PaymentsService from "~/services/PaymentsService";

export default {
  name: 'dashboard',
  components: {
    LoadingPanel,
    BaseInput,
    BaseFileinput,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    PaymentsList,
  },
  data () {
    return {
      booksList:[],
      response_error:false,
      response_errorMessage:"",
      response_success:false,
      response_success_messege:"",
      tableData: [ ],
      loading:true,
      output_folder_name:"",
      csv_file:"",

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
      let response = await PaymentsService.getPaymentsList()
      if(response.data.status){
          this.tableData = Object.values(response.data.data.payments)
          this.loading=false
      }else{
          this.response_error = response.message
          this.response_errorMessage = response.message
      }
    },
    handleFileUpload(){
    this.csv_file = event.target.files[0];
    },
    async subdmitForm(){
      let formData = new FormData();
      formData.append('file', this.csv_file);
      // formData.append('output_folder', this.output_folder_name);
      let response = await PaymentsService.submitPayementData(this.output_folder_name,formData) 
      if(response.data.status){
          this.response_success = response.data.status
          this.response_success_messege = response.data.messege
          this.csv_file = null
          this.output_folder_name = ""
          event.target.value=null
          document.getElementById('csv-file').value= null;

      }else{
          this.response_error = response.data.status
          this.response_errorMessage = response.data.message
      }

    }
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
