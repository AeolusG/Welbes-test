import { createStore } from "vuex";
import fetchData from "/home/olya/rabstol/Welbex-test/src/api/getData.js";

const store = createStore({
  actions: {
    async getData() {
      return await fetchData();
    },
  },
});

export default store;
