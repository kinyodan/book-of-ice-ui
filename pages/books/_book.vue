<template>
  <div class="row">
    <div class="col-md-8"><book-details :book_details="book_details"  :loading_characters="loading_characters" :characters_list="characters_list"> </book-details></div>
    <div class="col-md-4 comments-wrapper"><comments :book_details="book_details" :comments="comments" :loading="loading"> </comments></div>
  </div>
</template>
<script>
import EditProfileForm from '@/components/UserProfile/EditProfileForm.vue';
import UserCard from '@/components/UserProfile/UserCard.vue';
import BooksService from "~/services/BooksService";
import CharactesService from "~/services/CharactersService";
import BookDetails from "~/components/books/BookDetails";
import Comments from "~/components/Dashboard/Comments";
import CommentService from "~/services/CommentService";

export default {
  name: 'book',
  title: "Books R us",
  head() {
    return {
      title: this.book_details.name,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'characters:total_age', name: 'characters:total_age', content: this.metadata.total_age },
        { hid: 'characters:total_characters', name: 'characters:total_characters', content: this.metadata.total_characters },
        { hid: 'og:title', name: 'og:title', content: this.book_details.name },
        {
          name: this.book_details.name,
          hid: 'og-title',
          property: 'og:title',
          content: this.book_details.name,
        },
      ],
    };
  },
  components: {
    Comments,
    EditProfileForm,
    UserCard,
    BookDetails
  },
  data(){
    return{
      book_details:[],
      responseError:false,
      responseErrorMessage:"",
      characters_list:[{metadata:{total_age:"",total_characters:""}}],
      metadata:[],
      comments:[],
      loading:true,
      loading_characters:true,
      sort_by:null,
      filters:[],
      filterParams:[
        { name: "name_ascending", column_name: 'name', order: 'ASC' },
        { name: "name_descending", column_name: 'name', order: 'DESC'  },
        { name: "age_ascending",  column_name: 'age', order: 'ASC' } ,
        { name: "age_descending",  column_name: 'age', order: 'DESC'  },
        { name: "gender_ascending",  column_name: 'gender', order: 'ASC'  },
        { name: "gender_descending",  column_name: 'gender', order: 'ASC' },
      ],
    }
  },
  created(){
    this.getBookDetails()
    this.$nuxt.$on('refreshComments', ($event) => this.getComments(this.book_details.isbn))
    this.$nuxt.$on('triggerSort', ($event) => this.sortData(this.book_details.isbn,$event))
  },
  computed:{
    setTotalAge(){
    }
  },
  methods:{
    async getBookDetails(){
      let url = this.$route.query.url
      let response = await BooksService.getBook(url)
      if(response.data.status){
        this.book_details = response.data.data
        await this.getComments(this.book_details.isbn)
        await this.loadCharacters(this.book_details.isbn)
      }else{
        this.responseError=true
        this.responseErrorMessage=response.data.message
      }
    },
    async loadCharacters(){

      let data = {isbn: this.book_details.isbn , sortBy: this.sort_by, filters: this.filters}
      let response = await CharactesService.getCharacterList(data)
      if(response){
        function sliceIntoChunks(arr, chunkSize) {
          const res = [];
          for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize);
            res.push(chunk);
          }
          return res;
        }
        this.characters_list = sliceIntoChunks(response.data.characterList.data, 10)

        //set the years metadata
        let total_age = response.data.characterList.metadata.total_age
        this.metadata = {total_age: total_age,total_characters: response.data.characterList.metadata.total_characters}

        //stop loading
        this.loading_characters=false
      }
    },
    async getComments(isbn){
      let response = await CommentService.getComments(isbn)
      if(response.data.status){
        this.responseSuccess = true
        this.responseSuccessMessage = response.data.message
        this.comments=response.data.data
        this.loading = false

      }else{
        this.submitError = true
        this.submitErrorMessage = response.data.message
      }
    },
    input(){
      console.log("event capture")
    },
    sortData(isbn,sortParams){
      let param_index = this.filterParams.findIndex(i => i.name===sortParams)
      console.log(param_index)
      if(param_index >= 0){
        this.sort_by = this.filterParams[param_index]
        this.loadCharacters()
        console.log("sort data capture")
      }
    }
  }
};
</script>
<style>
.comments-wrapper{
  background: #1e1e2f;
  height:600px;overflow:scroll;overflow-x:hidden;position:fixed !important;bottom:0;right:0;max-width:28%;
}
</style>
