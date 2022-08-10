<template>
  <div class="row">
    <div class="col-md-8"><character-details :character_details="character_details" :spouse="spouse" :books_list="books_list" :loading_books="loading_books" > </character-details></div>
    <div class="col-md-4"><user-card :character_details="character_details" > </user-card></div>
  </div>
</template>
<script>
import CharacterDetails from '../../components/characters/CharacterDetails.vue';
import UserCard from '../../components/characters/UserCard.vue';
import CharactersService from "~/services/CharactersService";

export default {
  name: 'user',
  components: {
    CharacterDetails,
    UserCard
  },
  data(){
    return{
      character_details:[],
      spouse:[],
      loading_books:true,
      books_list:[],

    }
  },
  computed:{

  },
  created(){
    this.getCharacter()
  },
  mounted() {
  },
  methods:{
    async getCharacter(){
      let character = this.$route.params
      let character_url = this.$route.query
      console.log(character.character)
      let data = {id: character.character, characterUrl: character_url.url}
      let response = await CharactersService.getCharacter(data)
      if (response.data.status){
        this.character_details = response.data.data
        this.getSpouse(this.character_details.spouse)
        // this.setBooks(this.character_details.books)
      }
    },
    async getSpouse(url) {
      if (url.length > 0) {
        console.log(url)
        let response = await CharactersService.getSpouse(url)
        console.log(response)
        if (response.data) {
          this.spouse = response.data
        }
      }
    },
  }
};
</script>
<style></style>
