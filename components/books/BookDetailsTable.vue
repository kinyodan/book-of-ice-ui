<template>
   <div>
      <card card-body-classes="table-full-width">
        <div class="col-lg-4">
        <card type="tasks" :header-classes="{ 'text-left': isRTL }">
          <template slot="header">
            <p class="card-category d-inline">Sorting</p>
            <base-dropdown
                menu-on-right=""
                tag="div"
                title-classes=" btn-link btn-icon"
                :class="{ 'float-left': isRTL }"
            >
              <span slot="title" class="">Select Sort option</span>
              <a class="dropdown-item" href="#pablo" @click="sorting('name_ascending')"> Sort By Name Ascending </a>
              <a class="dropdown-item" href="#pablo" @click="sorting('name_descending')"> Sort By Name Descending </a>
<!--              <a class="dropdown-item" href="#pablo" @click="sorting('age_ascending')"> Sort By Age Ascending </a>-->
<!--              <a class="dropdown-item" href="#pablo" @click="sorting('age_ascending')"> Sort By Age Descending </a>-->
<!--              <a class="dropdown-item" href="#pablo" @click="sorting('gender_ascending')"> Sort By Gender Ascending </a>-->
<!--              <a class="dropdown-item" href="#pablo" @click="sorting('gender_ascending')"> Sort By Gender Descending </a>-->
            </base-dropdown>
          </template>
        </card>
        </div>

        <el-table :data="characters_list[currentPage]">
          <el-table-column
              min-width="150"
              sortable
              label="Name"
          >
            <template #default="scope">
              <a :href="`/characters/${scope.row.id}?url=${scope.row.url}`">
                <div style="display: flex; align-items: center">
                  <span style="margin-left: 10px">{{scope.row.name}}</span>
                </div>
              </a>
            </template>
          </el-table-column>
          <el-table-column
              min-width="150"
              sortable
              label="Gender"
              property="gender"
          ></el-table-column>
          <el-table-column
              min-width="150"
              sortable
              align="right"
              header-align="right"
              label="Played by"
              property="played_by"
          ></el-table-column>
        </el-table>
        <base-pagination :total="characters_list.length" :value="value" :perPage="setPerPage" :currentPage="currentPage"></base-pagination>
      </card>
   </div>
</template>
<script>
import { Table, TableColumn } from 'element-ui';
import BasePagination from "~/components/BasePagination";
import BaseDropdown from "~/components/BaseDropdown";

export default {
  data() {
    return {
      tableData:[],
      loading:true,
      currentPage:0,
      perPage:5,
      pageCount:1,
      nextPage:1,
      value:1,
      sortBy:null,
    };
  },
  components: {
    BasePagination,
    BaseDropdown,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  props:[
    'book_details',
    'characters_list',
  ],
  computed: {
    setPerPage(){
      return this.perPage
    },
  },
  created(){
    this.$nuxt.$on('input', ($event) => this.input($event))
  },
  mounted(){
  },
  methods: {
    updateProfile() {
      alert('Your data: ' + JSON.stringify(this.user));
    },
    input(val){
      this.currentPage = val
      this.value=val
    },
    sorting(sort_param){
      this.sortBy=sort_param
      this.$nuxt.$emit("triggerSort",this.sortBy)
    }
  }
};
</script>
<style></style>
