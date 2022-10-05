<template>
  <HelloWorld msg="Welcome to Your Vue.js App" />
  <MainTable />
  <TablePagination />
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import MainTable from "./components/MainTable.vue";
import TablePagination from "./components/Pagination.vue";

export default {
  name: "App",
  components: {
    MainTable,
    TablePagination,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
