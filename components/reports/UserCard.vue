<template>
  <card class="card-user card-user-01" style="background-color: #ffffff;">
    <div class="author">
      <p class="description" v-for="currency in currenciesList" >
        <a  class="dropdown-item" href="javascript:void(0)" @click="getTradingData(currency)" > {{ currency }} </a>
      </p>
    </div>
    <p>{{  }}</p>
    <div class="card-description"></div>
    <div slot="footer" class="button-container">
      <base-button class="btn-facebook" icon round>
        <i class="fab fa-facebook"></i>
      </base-button>
      <base-button class="btn-twitter" icon round>
        <i class="fab fa-twitter"></i>
      </base-button>
      <base-button class="btn-google" icon round>
        <i class="fab fa-google-plus"></i>
      </base-button>
    </div>
  </card>
</template>
<script>
import ApiService from '~/services/ApiService';

export default {
  props: {
    reportData: {
        type: Array,
        default: () => [],
        description: 'Table data'
      },
      sideListTag: {
        type: String,
        default: "",
        description: 'Table data'
      },
      currenciesList: {
        type: Array,
        default: () => [],
        description: 'Table data'
      }
  },
  methods:{
    getTradingData(event){
      this.$nuxt.$emit('set-trading-data',event)
      this.publishSetup(event)
    },
    async publishSetup(channel_id){
      let data = {"message": "websocket testing", "channel": channel_id }
      let formData = new FormData()
      formData.append("message", "websocket testing")
      formData.append("channel", channel_id)
      console.log(formData)
      let response = await ApiService.publishToWebsocket(data)
      console.log("sendMessage")
      console.log(response)
     },
  }
};
</script>
<style>
.btn-link{
  color: ##e14eca;
}
</style>
