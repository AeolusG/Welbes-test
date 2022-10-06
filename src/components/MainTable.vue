<template>
  <div class="center">
    <div class="row g-0 m-3">
      <div class="col-3">
        <select class="form-select" v-model="selectedColumn">
          <option value="">Колонки</option>
          <option v-for="column in giveColumnsToFilter" :key="column">
            {{ column.name }}
          </option>
        </select>
      </div>
      <div class="col-3">
        <select class="form-select" v-model="selectedFilterValue">
          <option value="">Критерий</option>
          <option v-for="value in filtersValues" :key="value.id">
            {{ value.name }}
          </option>
        </select>
      </div>
      <div class="col-4">
        <input class="form-control" v-model="searchString" />
      </div>

      <div class="col-1">
        <button @click="reset" class="btn btn-outline-primary">
          <img src="../images/arrow-clockwise.svg" alt="" />
        </button>
      </div>
    </div>
    <table v-if="filterData.length > 0" class="table center">
      <thead>
        <th v-for="column in columns" :key="column.id">
          {{ column.name }}
        </th>
      </thead>
      <tbody>
        <tr class="" v-for="element in filterData" :key="element">
          <td>
            <div>{{ element.date }}</div>
          </td>
          <td>
            <div>{{ element.name }}</div>
          </td>
          <td>
            <div>{{ element.count }}</div>
          </td>
          <td>
            <div>{{ element.distance }}</div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else-if="searchString !== ''">
      <div>По вашему запросу ничего не найдено</div>
      <img
        src="../images/kisspng-emoji-sticker-gunshow-the-nib-emoticon-fine-5b47402395eeb1.6842179115313961316141.png"
        alt="A dog in a burning house"
      />
    </div>
    <div class="btn-group m-3">
      <button
        @click="changePage(page)"
        v-for="page in allPages"
        class="btn btn-outline-primary"
        :key="page"
        :class="{ active: page === pageNumber }"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "MainTable",

  data() {
    return {
      columns: [
        { name: "Дата", id: 1 },
        { name: "Название", id: 2 },
        { name: "Количество", id: 3 },
        { name: "Расстояние", id: 4 },
      ],
      filtersValues: [
        { name: "Равно", id: 5 },
        { name: "Больше", id: 6 },
        { name: "Меньше", id: 7 },
        { name: "Содержит", id: 8 },
      ],
      selectedColumn: "",
      selectedFilterValue: "",
      searchString: "",
      tableData: [],
      rowsPerPage: 10,
      pageNumber: 1,
      allPages: 0,
      isInvalid: false,
    };
  },

  async created() {
    this.tableData = await this.getData();
  },

  computed: {
    filterData() {
      let data = this.tableData;

      if (
        this.selectedColumn === "Количество" &&
        this.selectedFilterValue === "Больше"
      ) {
        data = this.tableData.filter((item) => item.count > this.searchString);
      }

      if (
        this.selectedColumn === "Расстояние" &&
        this.selectedFilterValue === "Больше"
      ) {
        data = this.tableData.filter(
          (item) => item.distance > this.searchString
        );
      }

      if (
        this.selectedColumn === "Количество" &&
        this.selectedFilterValue === "Меньше" &&
        this.searchString !== ""
      ) {
        data = this.tableData.filter((item) => item.count < this.searchString);
      }

      if (
        this.selectedColumn === "Расстояние" &&
        this.selectedFilterValue === "Меньше" &&
        this.searchString !== ""
      ) {
        data = this.tableData.filter(
          (item) => item.distance < this.searchString
        );
      }

      if (
        this.selectedColumn === "Расстояние" &&
        this.selectedFilterValue === "Равно" &&
        this.searchString !== ""
      ) {
        data = this.tableData.filter(
          (item) => item.distance === Number(this.searchString)
        );
      }

      if (
        this.selectedColumn === "Количество" &&
        this.selectedFilterValue === "Равно" &&
        this.searchString !== ""
      ) {
        data = this.tableData.filter(
          (item) => item.count === Number(this.searchString)
        );
      }

      if (
        this.selectedColumn === "Название" &&
        this.selectedFilterValue === "Содержит"
      ) {
        data = this.tableData.filter((item) =>
          item.name.includes(this.searchString)
        );
      }

      this.setAllPages(Math.ceil(data.length / this.rowsPerPage));

      return this.getElementsByPage(data);
    },

    giveColumnsToFilter() {
      return this.columns.slice(1, this.columns.length);
    },
  },

  methods: {
    ...mapActions(["getData"]),

    reset() {
      this.selectedColumn = "";
      this.selectedFilterValue = "";
      this.searchString = "";
    },

    setAllPages(number) {
      this.allPages = number;
    },

    getElementsByPage(data) {
      let firstIndex = this.pageNumber - 1;
      let lastIndex = firstIndex + this.rowsPerPage;
      const result = data.slice(firstIndex, lastIndex);

      return result;
    },

    changePage(page) {
      this.pageNumber = page;
    },
  },
};
</script>

<style scoped>
.center {
  margin: auto;
  max-width: 700px;
}

div {
  margin: 5px;
}
</style>
