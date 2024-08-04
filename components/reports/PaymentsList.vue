<template>
  <div>  
 
<el-table :data="tableData">
    <el-table-column
        min-width="150"
        sortable
        label="Name"
    >
      <template #default="scope">
        <a :href="`#`">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{scope.row.payment_type}}</br>
          </span>
        </div>
        </a>
      </template>
    </el-table-column>

    <el-table-column
        min-width="150"
        sortable
        label="payment amount"
        property="payment_amount"
    >
    <template #default="scope">
        <a :href="`#`">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{scope.row.payment_amount}}</br>
          </span>
        </div>
        </a>
      </template>
  </el-table-column>
    <el-table-column
        min-width="150"
        sortable
        label="device id"
        property="device_id"
    >
    <template #default="scope">
        <a :href="`#`">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{scope.row.device_id}}</br>
          </span>
        </div>
        </a>
      </template>
  
  </el-table-column>
  <el-table-column
        min-width="150"
        sortable
        label="status"
        property="status"
    >
    <template #default="scope">
        <a :href="`books/`">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{scope.row.status}}</br>
          </span>
        </div>
        </a>
      </template>
  
  </el-table-column>
  <el-table-column
        min-width="150"
        sortable
        align="right"
        header-align="right"
        label="created"
    >
      <template #default="scope">
        <div style="display: flex; align-items: center; color:black !important;">
           
          <small style="margin-left: 10px; color:black !important;">{{$moment(scope.row.created)}}</small>
        </div>
      </template>
    </el-table-column>
  </el-table>
  
</div>
</template>

<script>
import { Table, TableColumn } from 'element-ui';

export default {
  name: 'PayementsLIst',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
      description: 'Table data'
    }
  },
  data () {
    return {
      booksList:[],
      response_error:false,
      response_errorMessage:"",
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
  created(){
  },
  mounted () {
  },
  methods: {
 
  }
}  
  </script>