<style scoped>
.md-helper >>> h1 {
  font-size: 2em;
  text-align: center;
}

.md-helper >>> h2 {
  font-size: 1.7em;
  text-align: center;
  padding-bottom: 1em;
  padding-top: 1em;
}

.md-helper >>> h3 {
  font-size: 1.4em;
  text-align: center;
  padding-bottom: 0.8em;
  padding-top: 0.8em;
}

.md-helper >>> h4 {
  font-size: 1em;
  text-align: center;
  padding-bottom: 0.5em;
  padding-top: 0.5em;
}

.md-helper >>> h5 {
  font-size: 1.25em;
  text-align: left;
}

.md-helper >>> p {
  font-size: 16px;
  text-align: left;
  line-height: 1.5;
  margin-bottom: 1em;
  text-indent: 35px;
}

.md-helper >>> table {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;
  border-collapse: collapse;
  max-width: 100%;
  overflow-x: auto;
  display: block;
}

.md-helper >>> th {
  border: 1px solid grey;
  border-collapse: collapse;
  padding: 5px;
  font-size: 16px;
}

.md-helper >>> td {
  border: 1px solid grey;
  border-collapse: collapse;
  padding: 5px;
  font-size: 16px;
}

.md-helper >>> hr {
  margin-top: 10px;
  margin-bottom: 10px;
}

.md-helper >>> img {
  width: 80%;
  display: block;
  margin: auto;
}

.md-helper >>> ol,
ul {
  text-align: left;
  padding-left: 70px;
}

.md-helper >>> li {
  font-size: 16px;
  line-height: 1.5;
  text-align: left;
}

.md-helper >>> iframe {
  width: 100%;
  max-width: 560px;
}

.md-helper >>> .yandexmap {
  max-width: inherit;
}

.md-helper >>> code {
  width: 90%;
  text-align: left;
}
</style>

<template>
  <v-app>
    <v-container fluid grid-list-xl>
      <v-layout wrap align-center>
        <v-flex xs12 sm6 d-flex>
          <v-select
            :items="pages"
            item-text="page_name"
            item-value="id"
            v-model="selectedValue"
            label="Выбор страницы"
            @change="fetchPage()"
          ></v-select>
        </v-flex>
        <v-flex xs12 sm4>
          <v-switch v-model="isPlace" :label="`Расположение элементов`"></v-switch>
        </v-flex>
        <v-flex xs12 sm2>
          <v-btn color="info" @click="savePage()">Принять изменения</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid grid-list-md>
      <v-layout v-if="isPlace" row wrap>
        <v-flex xs12 sm6>
          <v-textarea name="input-7-1" box label="Label" v-model="newsText" rows="30"></v-textarea>
        </v-flex>
        <v-flex xs12 sm6>
          <vue-markdown class="md-helper" show :source="newsText"></vue-markdown>
        </v-flex>
      </v-layout>
      <v-layout v-else row wrap>
        <v-flex xs12 sm12 md12 lg12>
          <v-textarea name="input-7-1" box label="Label" v-model="newsText" rows="30"></v-textarea>
        </v-flex>
        <v-flex xs12 sm12 md12 lg12>
          <vue-markdown class="md-helper" show :source="newsText"></vue-markdown>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar v-model="snackbar" :color="color" :timeout="50 * 100">
      {{ text }}
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import VueMarkdown from "vue-markdown";
import { mapGetters } from "vuex";
import { FETCH_PAGES, FETCH_PAGE, UPDATE_PAGE } from "@/store/actions.type";

export default {
  components: {
    VueMarkdown
  },
  data() {
    return {
      isPlace: true,
      selectedValue: null,
      snackbar: false,
      color: "success",
      text: "",
      newsText: ""
    };
  },
  mounted() {
    this.fetchPages();
  },
  methods: {
    fetchPages() {
      this.$store.dispatch(FETCH_PAGES);
    },
    async fetchPage() {
      await this.$store.dispatch(FETCH_PAGE, this.selectedValue);
      this.newsText = await this.$store.getters.page;
    },
    async savePage() {
      if (this.selectedValue === null) {
        this.color = "error";
        this.text = "Необходимо выбрать новость";
        this.snackbar = true;
      } else {
        try {
          const id = this.selectedValue;
          const content = this.newsText;
          await this.$store.dispatch(UPDATE_PAGE, { id, content });
          this.color = "success";
          this.text = "Данные успешно изменены";
          this.snackbar = true;
        } catch (err) {
          this.color = "error";
          this.text = "Произошла ошибка при изменении данных";
          this.snackbar = true;
        }
      }
    }
  },
  computed: {
    ...mapGetters(["pages", "page"])
  }
};
</script>
