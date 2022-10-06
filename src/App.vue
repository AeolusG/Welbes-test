<template>
  <MainTable />
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import MainTable from "./components/MainTable.vue";

export default {
  name: "App",
  components: {
    MainTable,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;

  text-align: center;
}
</style>
