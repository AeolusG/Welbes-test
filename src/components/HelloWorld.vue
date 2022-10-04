<template>
  <div class="table-center">
    <select v-model="selectedItem">
      <option v-for="title in titles.slice(1, titles.length)" :key="title">
        {{ title.name }}
      </option>
    </select>
    <select v-model="selectedType">
      <option v-for="sortType in sortTypes" :key="sortType.id">
        {{ sortType.name }}
      </option>
    </select>
    <input v-model="num" @input="sortBy" type="number" />
    <table class="table-border">
      <thead class="table-border">
        <th class="table-border" v-for="title in titles" :key="title.id">
          {{ title.name }}
        </th>
      </thead>
      <tbody>
        <tr class="table-border" v-for="elem in pagination" :key="elem">
          <td>
            <div>{{ elem.date }}</div>
          </td>
          <td>
            <div>{{ elem.name }}</div>
          </td>
          <td>
            <div>{{ elem.count }}</div>
          </td>
          <td>
            <div>{{ elem.distance }}</div>
          </td>
        </tr>
      </tbody>
    </table>
    <button
      @click="changePage(page)"
      class="btn"
      v-for="page in pages"
      :key="page"
      :class="{ btnActive: page === pageNumber }"
    >
      {{ page }}
    </button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      titles: [
        { name: "Дата", id: 1 },
        { name: "Название", id: 2 },
        { name: "Количество", id: 3 },
        { name: "Расстояние", id: 4 },
      ],
      sortTypes: [
        { name: "Равно", id: 5 },
        { name: "Больше", id: 6 },
        { name: "Меньше", id: 7 },
        { name: "Содержит", id: 8 },
      ],
      data: [
        { date: "2022.10.03", name: "fff", count: 3, distance: 4564, id: 1 },
        { date: "2022.10.03", name: "faa", count: 4, distance: 3556, id: 2 },
        { date: "2022.10.03", name: "sasa", count: 23, distance: 345, id: 3 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        {
          date: "2022.10.03",
          name: "sads",
          count: 244,
          distance: 300,
          id: 4,
        },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "awdsd", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        {
          date: "2022.10.03",
          name: "dvsd",
          count: 244,
          distance: 300,
          id: 4,
        },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "adafl", count: 244, distance: 300, id: 4 },
        {
          date: "2022.10.03",
          name: "dfl",
          count: 244,
          distance: 300,
          id: 4,
        },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        {
          date: "2022.10.03",
          name: "ssfl",
          count: 244,
          distance: 300,
          id: 4,
        },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
        { date: "2022.10.03", name: "lll", count: 244, distance: 300, id: 4 },
      ],
      rowsPerPage: 10,
      pageNumber: 1,
      selectedItem: "",
      selectedType: "",
      num: "",
      filteredData: [],
    };
  },
  computed: {
    pages() {
      if (this.num === "") {
        return Math.ceil(this.data.length / this.rowsPerPage);
      }
      return Math.ceil(this.filteredData.length / this.rowsPerPage);
    },
    pagination() {
      let firstIndex = this.pageNumber - 1;
      let lastIndex = firstIndex + this.rowsPerPage;
      if (this.num === "") {
        return this.data.slice(firstIndex, lastIndex);
      }
      const result = this.filteredData.slice(firstIndex, lastIndex);
      return result;
    },
  },
  methods: {
    changePage(page) {
      this.pageNumber = page;
    },
    sortBy() {
      const number = this.num;
      if (
        this.selectedItem === "Количество" &&
        this.selectedType === "Больше"
      ) {
        this.filteredData = this.data.filter((item) => item.count > number);
      }
      if (
        this.selectedItem === "Расстояние" &&
        this.selectedType === "Больше"
      ) {
        this.filteredData = this.data.filter((item) => item.distance > number);
      }
      if (
        this.selectedItem === "Количество" &&
        this.selectedType === "Меньше"
      ) {
        this.filteredData = this.data.filter((item) => item.count < number);
      }
      if (
        this.selectedItem === "Расстояние" &&
        this.selectedType === "Меньше"
      ) {
        this.filteredData = this.data.filter((item) => item.distance < number);
      }
    },
    doesContain() {},
  },
};
</script>

<style scoped>
.table-center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.table-border {
  border: thick double #808080;
  border-collapse: collapse;
}
td {
  border: thick double #808080;
  border-collapse: collapse;
}
div {
  margin: 5px;
}

.btn {
  display: inline;
  text-decoration: none;
  border: solid #808080 2px;
  padding: 10px;
  margin: 10px;
}
.btnActive {
  background-color: black;
  color: white;
}
.btn:hover {
  background-color: black;
  color: white;
  transition: 0.5s;
}
</style>
