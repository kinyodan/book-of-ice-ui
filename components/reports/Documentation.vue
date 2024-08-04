<template>
  <div>  
 
<el-table :data="tableData">
    <el-table-column
        min-width="150"
        sortable
        label="path(Url)"
    >
      <template #default="scope">
        <a :href="`#`">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{scope.row["path"]}}</br>
          </span>
        </div>
        </a>
      </template>
    </el-table-column>


    <el-table-column
        min-width="150"
        sortable
        label="TYPE"
        property="type"
    >
    <template #default="scope">
        <a :href="`#`">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{scope.row["type"]}}</br>
          </span>
        </div>
        </a>
      </template>

  </el-table-column>
 
  <el-table-column
        min-width="150"
        sortable
        label="Description"
        property="description"
    >
    <template #default="scope">
        <a :href="`#`">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{scope.row["description"]}}</br>
          </span>
        </div>
        </a>
      </template>

  </el-table-column>

  </el-table>
  
</div>
</template>

<script>
import { Table, TableColumn } from 'element-ui';

export default {
  name: 'Documentation',
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