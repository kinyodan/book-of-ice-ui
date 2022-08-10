<template>
  <card>
    <span v-if="setBooksDetails"></span>
    <span v-if="loading_character">
    <loading-panel></loading-panel>
    </span>
    <div v-else>
      <h5 slot="header" class="title">{{character_details.name}}</h5>
      <div class="row">
        <h5 slot="header" class="title" style="padding-left: 20px;padding-right: 20px;">Titles </h5>
        <span v-for="title in character_details.titles" class="col-md-8">
          <div>  {{title}}</div>
        </span>
        <div class="col-md-12">
          <h5 slot="header" class="title" style="padding-left: 20px;">Aliases: <span class="col-md-8" v-for="alias in character_details.aliases"><i>{{alias}}</i>,</span> </h5>
        </div>
        <div class="col-md-8">
          <h5 slot="header" class="title" style="padding-left: 20px;padding-right: 20px;">Culture: <span class="col-md-8"> {{character_details.culture }}</span></h5>
        </div>
        <div class="col-md-8">
          <h5 slot="header" class="title" style="padding-left: 20px;padding-right: 20px;">Gender: <span class="col-md-8"> {{character_details.gender }}</span></h5>
        </div>
        <div class="col-md-8">
          <h5 slot="header" class="title" style="padding-left: 20px;padding-right: 20px;">Died: <span class="col-md-8"> {{character_details.died }}</span></h5>
        </div>
      </div>
      <hr style="background: white">
      <div class="row">
        <div class="col-md-8">
          <h5 slot="header" class="title" style="padding-left: 20px;padding-right: 20px;">Born: <span class="col-md-8" > {{character_details.born}}</span></h5>
        </div>
        <div class="col-md-6">
          <h5 slot="header" class="title" style="padding-left: 20px;padding-right: 20px;">Died: <span class="col-md-8" > {{character_details.died}}</span></h5>
        </div>
      </div>
      <hr style="background: white">
      <div class="row">
        <div class="col-md-6">
          <h5 slot="header" class="title" style="padding-left: 20px;padding-right: 20px;">Father: <span class="col-md-8" >{{character_details.father}}&nbsp;</span> </h5>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <h5 slot="header" class="title" style="padding-left: 20px;padding-right: 20px;">Mother: <span class="col-md-8" >{{character_details.mother}}&nbsp;</span> </h5>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <h5 slot="header" class="title" style="padding-left: 20px;padding-right: 20px;">Spouse: <span class="col-md-8" >{{spouse.name}}&nbsp;</span> </h5>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h5 slot="header" class="title" style="padding-left: 20px;padding-right: 20px;">Tv Series: <span class="col-md-8" v-for="series in character_details.tvSeries">{{series}},</span> </h5>
        </div>
      </div>
      <hr style="background: white">
      <span v-if="loading_books">
        <loading-panel></loading-panel>
      </span>
    </div>
  </card>
</template>
<script>
import CharactersService from "~/services/CharactersService";
import BooksService from "~/services/BooksService";

export default {
  data() {
    return {
      user: {
        company: 'Creative Code Inc.',
        username: 'michael23',
        email: '',
        firstName: 'Mike',
        lastName: 'Andrew',
        address: 'Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09',
        city: 'New York',
        country: 'USA',
        postalCode: '',
        aboutMe: `Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.`
      },
      books:[]
    };
  },
  props:[
    "loading_character",
    'character_details',
    'spouse',
    'loading_books',
    'books_list'
  ],
  created(){
    this.getBooksList()
  },
  mounted(){
    console.log(this.character_details)
    // this.getSpouse(this.character_details.spouse)
  },
  methods: {
    updateProfile() {
      alert('Your data: ' + JSON.stringify(this.user));
    },
    async getBooksList(){
      let response = await BooksService.getBooksList()
      if(response.data.status){
        this.books = response.data.data
        this.loading=false
      }else{
        this.response_error = response.message
        this.response_errorMessage = response.message
      }
    },
    setBooksDetails(book_url){
      console.log("im triggered")
      let book_item = this.books.findIndex(i=> i.url===book_url)
      console.log(book_item)
    }
  }
};
</script>
<style></style>
