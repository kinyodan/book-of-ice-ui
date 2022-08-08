<template>
  <div>
  <div class="row">
    <div class="col-md-12">
      <h5>Book Comments section</h5>
      <base-input label="">
            <textarea
                class="form-control"
                placeholder="Type comment here"
                v-model="comment"
            >
            </textarea>
        <span class="field-error" ><small>{{ comment.length }}</small></span>
      </base-input>
      <span class="field-error" v-if="comment.length>500 || $v.comment.$error"><small>{{ commentErrorMessage }}</small></span>
      <base-button v-if="comment.length>0" @click="submitComment" native-type="submit" type="primary" class="btn-fill">
        Save comment
      </base-button>
      <base-button v-else disabled native-type="submit" type="primary" class="btn-fill">
        Save comment
      </base-button>
    </div>
  </div>
    <hr>
    <h5>Comments</h5>
    <loading-panel v-if="loading"></loading-panel>

    <base-table :data="comments" thead-classes="text-primary">
    <template slot-scope="{ row }">
      <td><i class="tim-icons icon-chat-33"></i></td>
      <td>
        <p class="title">{{ row.comment }}</p>
        <p class="text-muted">{{ row.comment }}</p>
        <p class="text-muted">{{ row.book_isbn }}</p>
        <small>posted on<p class="text-muted">{{ $moment(row.created_at) }}</p></small>
        <small>ip address: {{row.commenter_ip_adress}}</small>
      </td>

    </template>
  </base-table>
  </div>
</template>
<script>
import Vue from 'vue'
import { BaseTable } from '@/components';
import LoadingPanel from "~/components/LoadingPanel";
import CommentService from '@/services/CommentService'
import Vuelidate from 'vuelidate'
import {maxLength, minLength, required} from "vuelidate/lib/validators";
Vue.use(Vuelidate)

export default {
  components: {
    BaseTable,
    LoadingPanel
  },
  props:[
    'book_details',
    'comments',
    'loading'
  ],
  data() {
    return {
      comment: "",
      ip_address: "127.0.0.0",
      book_isbn: null,
      submitSuccess: false,
      submitSuccessMessage: "",
      submitError: false,
      submitErrorMessage: "",
      responseSuccess:false,
      responseSuccessMessage:"",
      commentErrorMessage: "",
      tableData: [
        {
          title: 'Update the Documentation',
          description: 'Dwuamish Head, Seattle, WA 8:47 AM',
          done: false
        },
        {
          title: 'GDPR Compliance',
          description:
            'The GDPR is a regulation that requires businesses to protect the personal data and privacy of Europe citizens for transactions that occur within EU member states.',
          done: true
        },
        {
          title: 'Solve the issues',
          description:
            'Fifty percent of all respondents said they would be more likely to shop at a company',
          done: false
        },
        {
          title: 'Release v2.0.0',
          description: 'Ra Ave SW, Seattle, WA 98116, SUA 11:19 AM',
          done: false
        },
        {
          title: 'Export the processed files',
          description:
            'The report also shows that consumers will not easily forgive a company once a breach exposing their personal data occurs.',
          done: false
        },
        {
          title: 'Arival at export process',
          description: 'Capitol Hill, Seattle, WA 12:34 AM',
          done: false
        }
      ]
    };
  },
  validations:{
    comment:{
      required,
      minLength: minLength(1),
      maxLength: maxLength(500),
    }
  },
  computed:{
    setLoading(){

    }
  },
  mounted() {
    this.getIpaddress()
  },
  methods:{
    async getIpaddress(){
      let getIpaddress = await CommentService.getIp()
      if(getIpaddress.status){
        this.ip_address = getIpaddress.data.ipAddress
      }
    },
    async submitComment(){
      try{
        this.$v.$touch()
        if (this.$v.$invalid) {
          if(this.comment.length > 500){
            this.updateCommentsError()
          }
          console.log("validation error ")
        }else{
          this.commentErrorMessage=""
          let data = {comment: this.comment, ip_address: this.ip_address, isbn: this.book_details.isbn}
          let response = await CommentService.addComment(data)
          if (response.data.status) {
            this.submitSuccess = true
            this.submitSuccessMessage = response.data.message
            this.comment = ""
            this.$nuxt.$emit("refreshComments", true)
            this.loading=false
          } else {
            this.submitError = true
            this.submitErrorMessage = response.data.message
          }
        }

      }catch (e){
        console.log(e)
      }
    },
    updateCommentsError(){
      this.commentErrorMessage="Comments limit is 500 Characters only"
    }
  },
};
</script>
<style></style>
