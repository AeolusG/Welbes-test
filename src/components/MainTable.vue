<template>
  <div class="center">
    <div class="row g-0 m-3">
      <div class="col-3">
        <select class="form-select" v-model="selectedColumn">
          <option v-for="column in columns" :key="column">
            {{ column.name }}
          </option>
        </select>
      </div>
      <div class="col-3">
        <select class="form-select" v-model="selectedFilterValue">
          <option v-for="value in filtersValues" :key="value.id">
            {{ value.name }}
          </option>
        </select>
      </div>
      <div class="col-4">
        <input
          class="form-control"
          v-model="searchString"
          @input="filterData"
        />
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
        <tr class="" v-for="elem in filterData" :key="elem">
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
    <div v-else>
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
    };
  },

  computed: {
    filterData() {
      // let data = JSON.parse(JSON.stringify(this.tableData));
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
  },
  created() {
    this.tableData = [
      {
        count: 198,
        id: 1,
        name: "labor",
        date: "2022.03.10",
        distance: 660,
      },
      {
        count: 315,
        id: 2,
        name: "vero reic",
        date: "2022.03.10",
        distance: 1746,
      },
      {
        count: 532,
        id: 3,
        name: "io ad",
        date: "2022.03.10",
        distance: 1347,
      },
      {
        count: 128,
        id: 4,
        name: " odio s",
        date: "2022.03.10",
        distance: 677,
      },
      {
        count: 304,
        id: 5,
        name: "ro ea",
        date: "2022.03.10",
        distance: 1359,
      },
      {
        count: 967,
        id: 6,
        name: "git elige",
        date: "2022.03.10",
        distance: 1134,
      },
      {
        count: 592,
        id: 7,
        name: "ellat con",
        date: "2022.03.10",
        distance: 800,
      },
      {
        count: 350,
        id: 8,
        name: "omnis ",
        date: "2022.03.10",
        distance: 1456,
      },
      {
        count: 455,
        id: 9,
        name: "vident i",
        date: "2022.03.10",
        distance: 1141,
      },
      {
        count: 382,
        id: 10,
        name: " ",
        date: "2022.03.10",
        distance: 1557,
      },
      {
        count: 370,
        id: 11,
        name: "it la",
        date: "2022.03.10",
        distance: 652,
      },
      {
        count: 797,
        id: 12,
        name: "i ut",
        date: "2022.03.10",
        distance: 1344,
      },
      {
        count: 369,
        id: 13,
        name: "nventore",
        date: "2022.03.10",
        distance: 1452,
      },
      {
        count: 881,
        id: 14,
        name: "fi",
        date: "2022.03.10",
        distance: 1744,
      },
      {
        count: 278,
        id: 15,
        name: "bitis magnam ",
        date: "2022.03.10",
        distance: 794,
      },
      {
        count: 761,
        id: 16,
        name: "rendis",
        date: "2022.03.10",
        distance: 1044,
      },
      {
        count: 937,
        id: 17,
        name: "est an",
        date: "2022.03.10",
        distance: 893,
      },
      {
        count: 528,
        id: 18,
        name: "t ten",
        date: "2022.03.10",
        distance: 1203,
      },
      {
        count: 135,
        id: 19,
        name: "mp",
        date: "2022.03.10",
        distance: 1190,
      },
      {
        count: 388,
        id: 20,
        name: "tias e",
        date: "2022.03.10",
        distance: 1672,
      },
      {
        count: 325,
        id: 21,
        name: "i",
        date: "2022.03.10",
        distance: 775,
      },
      {
        count: 119,
        id: 22,
        name: "rro ",
        date: "2022.03.10",
        distance: 1932,
      },
      {
        count: 316,
        id: 23,
        name: "s temp",
        date: "2022.03.10",
        distance: 1544,
      },
      {
        count: 134,
        id: 24,
        name: "tempor",
        date: "2022.03.10",
        distance: 1428,
      },
      {
        count: 437,
        id: 25,
        name: "",
        date: "2022.03.10",
        distance: 1693,
      },
      {
        count: 532,
        id: 26,
        name: "leni",
        date: "2022.03.10",
        distance: 516,
      },
      {
        count: 215,
        id: 27,
        name: "loribus ",
        date: "2022.03.10",
        distance: 1034,
      },
      {
        count: 332,
        id: 28,
        name: "olupt",
        date: "2022.03.10",
        distance: 713,
      },
      {
        count: 265,
        id: 29,
        name: " d",
        date: "2022.03.10",
        distance: 1085,
      },
      {
        count: 152,
        id: 30,
        name: "asi ",
        date: "2022.03.10",
        distance: 1266,
      },
      {
        count: 279,
        id: 31,
        name: "lit u",
        date: "2022.03.10",
        distance: 1338,
      },
      {
        count: 570,
        id: 32,
        name: "orem arch",
        date: "2022.03.10",
        distance: 566,
      },
      {
        count: 90,
        id: 33,
        name: "tatum ",
        date: "2022.03.10",
        distance: 704,
      },
      {
        count: 879,
        id: 34,
        name: "nis nemo sun",
        date: "2022.03.10",
        distance: 1626,
      },
      {
        count: 457,
        id: 35,
        name: "lendus",
        date: "2022.03.10",
        distance: 1229,
      },
      {
        count: 425,
        id: 36,
        name: " et quis",
        date: "2022.03.10",
        distance: 1207,
      },
      {
        count: 551,
        id: 37,
        name: "ae venia",
        date: "2022.03.10",
        distance: 960,
      },
      {
        count: 809,
        id: 38,
        name: "es do",
        date: "2022.03.10",
        distance: 1219,
      },
      {
        count: 830,
        id: 39,
        name: "ssitatib",
        date: "2022.03.10",
        distance: 1509,
      },
      {
        count: 896,
        id: 40,
        name: "min",
        date: "2022.03.10",
        distance: 1800,
      },
      {
        count: 179,
        id: 41,
        name: "tas ",
        date: "2022.03.10",
        distance: 1939,
      },
      {
        count: 532,
        id: 42,
        name: "qui e",
        date: "2022.03.10",
        distance: 1649,
      },
      {
        count: 28,
        id: 43,
        name: "estias sint ",
        date: "2022.03.10",
        distance: 1066,
      },
      {
        count: 825,
        id: 44,
        name: "oles",
        date: "2022.03.10",
        distance: 1130,
      },
      {
        count: 442,
        id: 45,
        name: "m i",
        date: "2022.03.10",
        distance: 1642,
      },
      {
        count: 474,
        id: 46,
        name: "s",
        date: "2022.03.10",
        distance: 1536,
      },
      {
        count: 878,
        id: 47,
        name: "rum commodi e",
        date: "2022.03.10",
        distance: 1804,
      },
      {
        count: 976,
        id: 48,
        name: "quatur ani",
        date: "2022.03.10",
        distance: 1005,
      },
      {
        count: 610,
        id: 49,
        name: " placeat",
        date: "2022.03.10",
        distance: 1682,
      },
      {
        count: 98,
        id: 50,
        name: "lorum",
        date: "2022.03.10",
        distance: 1630,
      },
      {
        count: 217,
        id: 51,
        name: "lestias e",
        date: "2022.03.10",
        distance: 992,
      },
      {
        count: 736,
        id: 52,
        name: " ",
        date: "2022.03.10",
        distance: 1784,
      },
      {
        count: 713,
        id: 53,
        name: "iores alia",
        date: "2022.03.10",
        distance: 1295,
      },
      {
        count: 856,
        id: 54,
        name: "a eius tem",
        date: "2022.03.10",
        distance: 1449,
      },
      {
        count: 106,
        id: 55,
        name: " ",
        date: "2022.03.10",
        distance: 1800,
      },
      {
        count: 829,
        id: 56,
        name: "dolor",
        date: "2022.03.10",
        distance: 697,
      },
      {
        count: 112,
        id: 57,
        name: " quidem se",
        date: "2022.03.10",
        distance: 1385,
      },
      {
        count: 111,
        id: 58,
        name: "nt m",
        date: "2022.03.10",
        distance: 1063,
      },
      {
        count: 24,
        id: 59,
        name: "is duci",
        date: "2022.03.10",
        distance: 1996,
      },
      {
        count: 121,
        id: 60,
        name: "edita libe",
        date: "2022.03.10",
        distance: 773,
      },
      {
        count: 558,
        id: 61,
        name: "idem itaque ",
        date: "2022.03.10",
        distance: 1588,
      },
      {
        count: 253,
        id: 62,
        name: "ro beatae ",
        date: "2022.03.10",
        distance: 598,
      },
      {
        count: 930,
        id: 63,
        name: "caecati",
        date: "2022.03.10",
        distance: 762,
      },
      {
        count: 966,
        id: 64,
        name: "quatur a",
        date: "2022.03.10",
        distance: 1217,
      },
      {
        count: 821,
        id: 65,
        name: "m ea rat",
        date: "2022.03.10",
        distance: 1276,
      },
      {
        count: 816,
        id: 66,
        name: " nam con",
        date: "2022.03.10",
        distance: 1164,
      },
      {
        count: 634,
        id: 67,
        name: " consequ",
        date: "2022.03.10",
        distance: 1666,
      },
      {
        count: 456,
        id: 68,
        name: "hit",
        date: "2022.03.10",
        distance: 1312,
      },
      {
        count: 371,
        id: 69,
        name: "aut ea iure",
        date: "2022.03.10",
        distance: 1753,
      },
      {
        count: 232,
        id: 70,
        name: " m",
        date: "2022.03.10",
        distance: 869,
      },
      {
        count: 284,
        id: 71,
        name: "ar",
        date: "2022.03.10",
        distance: 500,
      },
      {
        count: 238,
        id: 72,
        name: "a sunt do",
        date: "2022.03.10",
        distance: 1337,
      },
      {
        count: 696,
        id: 73,
        name: " quia ipsa re",
        date: "2022.03.10",
        distance: 1141,
      },
      {
        count: 39,
        id: 74,
        name: " non illu",
        date: "2022.03.10",
        distance: 589,
      },
      {
        count: 947,
        id: 75,
        name: " ",
        date: "2022.03.10",
        distance: 1664,
      },
      {
        count: 594,
        id: 76,
        name: "rro ut solu",
        date: "2022.03.10",
        distance: 1269,
      },
      {
        count: 244,
        id: 77,
        name: "es et",
        date: "2022.03.10",
        distance: 789,
      },
      {
        count: 124,
        id: 78,
        name: "luptas vol",
        date: "2022.03.10",
        distance: 1410,
      },
      {
        count: 699,
        id: 79,
        name: "tae ",
        date: "2022.03.10",
        distance: 1121,
      },
      {
        count: 460,
        id: 80,
        name: "um",
        date: "2022.03.10",
        distance: 1556,
      },
      {
        count: 513,
        id: 81,
        name: "on cons",
        date: "2022.03.10",
        distance: 1502,
      },
      {
        count: 32,
        id: 82,
        name: "st non d",
        date: "2022.03.10",
        distance: 1862,
      },
      {
        count: 884,
        id: 83,
        name: "l qui accu",
        date: "2022.03.10",
        distance: 1416,
      },
      {
        count: 40,
        id: 84,
        name: "v",
        date: "2022.03.10",
        distance: 1622,
      },
      {
        count: 191,
        id: 85,
        name: " volu",
        date: "2022.03.10",
        distance: 1742,
      },
      {
        count: 362,
        id: 86,
        name: "scipit est",
        date: "2022.03.10",
        distance: 1617,
      },
      {
        count: 521,
        id: 87,
        name: "r aspe",
        date: "2022.03.10",
        distance: 992,
      },
      {
        count: 937,
        id: 88,
        name: "ciis a",
        date: "2022.03.10",
        distance: 1802,
      },
      {
        count: 1000,
        id: 89,
        name: " volup",
        date: "2022.03.10",
        distance: 822,
      },
      {
        count: 167,
        id: 90,
        name: "m vol",
        date: "2022.03.10",
        distance: 621,
      },
      {
        count: 926,
        id: 91,
        name: "lle",
        date: "2022.03.10",
        distance: 1219,
      },
      {
        count: 186,
        id: 92,
        name: "ellendus as",
        date: "2022.03.10",
        distance: 1822,
      },
      {
        count: 505,
        id: 93,
        name: "itia do",
        date: "2022.03.10",
        distance: 768,
      },
      {
        count: 803,
        id: 94,
        name: "o repudia",
        date: "2022.03.10",
        distance: 1598,
      },
      {
        count: 886,
        id: 95,
        name: "ptatem und",
        date: "2022.03.10",
        distance: 605,
      },
      {
        count: 585,
        id: 96,
        name: "n sit a",
        date: "2022.03.10",
        distance: 1503,
      },
      {
        count: 726,
        id: 97,
        name: "ciendis ",
        date: "2022.03.10",
        distance: 1763,
      },
      {
        count: 623,
        id: 98,
        name: "aesentium",
        date: "2022.03.10",
        distance: 1359,
      },
      {
        count: 130,
        id: 99,
        name: "antium del",
        date: "2022.03.10",
        distance: 916,
      },
      {
        count: 723,
        id: 100,
        name: "sint q",
        date: "2022.03.10",
        distance: 1365,
      },
      {
        count: 867,
        id: 101,
        name: "piciatis",
        date: "2022.03.10",
        distance: 676,
      },
      {
        count: 483,
        id: 102,
        name: "cia",
        date: "2022.03.10",
        distance: 1998,
      },
      {
        count: 674,
        id: 103,
        name: "m",
        date: "2022.03.10",
        distance: 804,
      },
      {
        count: 590,
        id: 104,
        name: "sumenda to",
        date: "2022.03.10",
        distance: 543,
      },
      {
        count: 914,
        id: 105,
        name: "tat",
        date: "2022.03.10",
        distance: 758,
      },
      {
        count: 804,
        id: 106,
        name: "res",
        date: "2022.03.10",
        distance: 556,
      },
      {
        count: 538,
        id: 107,
        name: "p",
        date: "2022.03.10",
        distance: 1674,
      },
      {
        count: 934,
        id: 108,
        name: "ritatis",
        date: "2022.03.10",
        distance: 1275,
      },
      {
        count: 89,
        id: 109,
        name: "niet ut simi",
        date: "2022.03.10",
        distance: 1753,
      },
      {
        count: 768,
        id: 110,
        name: "nt est",
        date: "2022.03.10",
        distance: 1594,
      },
      {
        count: 411,
        id: 111,
        name: "ssimus fa",
        date: "2022.03.10",
        distance: 1896,
      },
      {
        count: 822,
        id: 112,
        name: "e ",
        date: "2022.03.10",
        distance: 689,
      },
      {
        count: 299,
        id: 113,
        name: "t quo deb",
        date: "2022.03.10",
        distance: 1349,
      },
      {
        count: 429,
        id: 114,
        name: " et sunt ",
        date: "2022.03.10",
        distance: 1895,
      },
      {
        count: 568,
        id: 115,
        name: "ecati do",
        date: "2022.03.10",
        distance: 1282,
      },
      {
        count: 246,
        id: 139,
        name: "ariatu",
        date: "2022.03.10",
        distance: 1928,
      },
      {
        count: 661,
        id: 140,
        name: "nsectet",
        date: "2022.03.10",
        distance: 1118,
      },
      {
        count: 115,
        id: 141,
        name: "gnissim",
        date: "2022.03.10",
        distance: 1404,
      },
      {
        count: 883,
        id: 142,
        name: "olore sit",
        date: "2022.03.10",
        distance: 1110,
      },
    ];
  },
  methods: {
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
