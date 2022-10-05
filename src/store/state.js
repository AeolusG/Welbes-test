export default {
  // "https://my-json-server.typicode.com//AeolusG/Welbex-test/items"
  actions: {
    fetchData() {
      let response = fetch(
        "https://github.com/AeolusG/Welbex-test/blob/master/db.json"
      );
      return response;
    },
  },
};
