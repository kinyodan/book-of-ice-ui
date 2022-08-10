<template>
  <div>
    <h5>Book characters</h5>
    <span v-if="loading_characters">
      <loading-panel></loading-panel>
      </span>
    <div class="" v-else>
      <characters-table :characters_list="characters_list"></characters-table>
    </div>
  </div>
</template>
<script>
import {Table, TableColumn} from 'element-ui';
import BasePagination from "~/components/BasePagination";
import BaseDropdown from "~/components/BaseDropdown";
import CharactersTable from "~/components/characters/CharactersTable";
import LoadingPanel from "~/components/LoadingPanel";
import CharactesService from "~/services/CharactersService";

export default {
  data() {
    return {
      tableData: [],
      loading: true,
      currentPage: 0,
      perPage: 5,
      pageCount: 1,
      nextPage: 1,
      value: 1,
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
      characters_list:[],
      loading_characters:true,
    };
  },
  components: {
    BasePagination,
    BaseDropdown,
    CharactersTable,
    LoadingPanel,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  computed: {
    setPerPage() {
      return this.perPage
    },
  },
  created() {
    this.$nuxt.$on('input', ($event) => this.input($event))
    this.$nuxt.$on('triggerSort', ($event) => this.sortData($event))
  },
  mounted() {
    this.getAllCharactersList()
  },
  methods: {
    async getAllCharactersList() {
      console.log("characters_list------------------")
      this.characters_list=[]
      console.log("characters_list------------------")
      let data = {sortBy: this.sort_by, filters: this.filters}
      let response = await CharactesService.getAllCharactersList(data)
      console.log(response)
      if (response) {
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
        this.metadata = {total_age: total_age, total_characters: response.data.characterList.metadata.total_characters}

        //stop loading
        this.loading_characters = false
      }
    },
    sortData(sortParams) {
      let param_index = this.filterParams.findIndex(i => i.name === sortParams)
      console.log(param_index)
      if (param_index >= 0) {
        this.sort_by = this.filterParams[param_index]
        this.getAllCharactersList()
        console.log("sort data capture all characters")
      }
    },
    input(val){
      this.currentPage = val
      this.value=val
    },
  }
};
</script>
<style></style>