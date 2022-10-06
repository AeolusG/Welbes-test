import { createStore } from "vuex";
import fetchData from "../api/index.js";

const store = createStore({
  actions: {
    async getData() {
      return await fetchData();
    },
  },
});

export default store;
