<template>
  <div class="row">
    <div class="col-md-12">
      <card card-body-classes="table-full-width">
        <h4 slot="header" class="card-title">Books List</h4>
        <loading-panel v-if="loading"></loading-panel>
        <el-table :data="tableData">
          <el-table-column
              min-width="150"
              sortable
              label="Name"
          >
            <template #default="scope">
              <a :href="`books/${scope.row.isbn}?url=${scope.row.url}`">
              <div style="display: flex; align-items: center">
                <span style="margin-left: 10px">{{scope.row.name}}</br>
                  <small v-if="scope.row.comments_count">( {{scope.row.comments_count}} comments)</small>
                   <small v-else>( 0 comments)</small>
                </span>
              </div>
              </a>
            </template>
          </el-table-column>
          <el-table-column
              min-width="150"
              sortable
              label="Publisher"
              property="publisher"
          ></el-table-column>
          <el-table-column
              min-width="150"
              sortable
              label="Isbn"
              property="isbn"
          ></el-table-column>
          <el-table-column
              min-width="150"
              sortable
              align="right"
              header-align="right"
              label="released"
          >
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <el-icon><timer /></el-icon>
                <small style="margin-left: 10px">{{$moment(scope.row.released)}}</small>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </card>
    </div>
  </div>
</template>
<script>
import { Table, TableColumn } from 'element-ui';
import BooksService from "~/services/BooksService";
import LoadingPanel from "~/components/LoadingPanel";

export default {
  name: 'dashboard',
  components: {
    LoadingPanel,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data () {
    return {
      booksList:[],
      response_error:false,
      response_errorMessage:"",
      tableData: [ ],
      loading:true,
    };
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
   async getBooksList(){
      let response = await BooksService.getBooksList()
      if(response.data.status){
        this.tableData = Object.values(response.data.data)
        this.loading=false
      }else{
        this.response_error = response.message
        this.response_errorMessage = response.message
     }
   }
  },
  mounted () {
    this.getBooksList()
  }
}
</script>
<style></style>
