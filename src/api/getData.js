function getData() {
  return fetch("https://my-json-server.typicode.com/AeolusG/Welbex-test/items")
    .then((result) => result.json())
    .then((response) => response);
}

export default getData;
