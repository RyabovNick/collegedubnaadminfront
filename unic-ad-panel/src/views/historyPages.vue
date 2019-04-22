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

.v-note-wrapper {
  z-index: 2;
}
</style>

<template>
  <v-app>
    <v-container fluid grid-list-xl>
      <v-expansion-panel>
        <v-expansion-panel-content>
          <template v-slot:header>
            <div>Помощь</div>
          </template>
          <v-card>
            <v-card-text>
              На странице посмотреть старые версии страниц.
              <br>Если произошла какая-то ошибка при изменении, на этой странице можно посмотреть "как было" и скопировать обратно.
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-layout wrap align-center>
        <v-flex xs12 sm6 d-flex>
          <v-select
            :items="history"
            item-value="id"
            v-model="selectedValue"
            label="Выбор истории изменений"
            @change="fetchOneHistory()"
          >
            <template
              slot="selection"
              slot-scope="data"
            >{{ data.item.name}} - {{ data.item.date | date }}</template>
            <template
              slot="item"
              slot-scope="data"
            >{{ data.item.name}} - {{ data.item.date | date }}</template>
          </v-select>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid grid-list-md>
      <v-flex xs12>
        <mavon-editor
          class="md-helper"
          style="max-height: 800px"
          v-model="newsText"
          language="ru"
          :toolbars="toolbars"
        />
      </v-flex>
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
import { FETCH_HISTORY, FETCH_ONE_HISTORY } from "@/store/actions.type";

export default {
  components: {
    VueMarkdown
  },
  data() {
    return {
      selectedValue: null,
      snackbar: false,
      color: "success",
      text: "",
      newsText: "",
      toolbars: {
        bold: true,
        italic: true,
        header: true,
        underline: true,
        strikethrough: true,
        mark: true,
        superscript: true,
        subscript: true,
        quote: false,
        ol: true,
        ul: true,
        link: true,
        imagelink: true,
        code: true,
        table: true,
        fullscreen: true,
        readmodel: true,
        htmlcode: true,
        help: true,
        /* 1.3.5 */
        undo: true,
        redo: true,
        trash: false,
        save: false,
        /* 1.4.2 */
        navigation: true,
        /* 2.1.8 */
        alignleft: false,
        aligncenter: false,
        alignright: false,
        /* 2.2.1 */
        subfield: true,
        preview: true
      }
    };
  },
  mounted() {
    this.fetchHistory();
  },
  methods: {
    fetchHistory() {
      this.$store.dispatch(FETCH_HISTORY);
    },
    async fetchOneHistory() {
      await this.$store.dispatch(FETCH_ONE_HISTORY, this.selectedValue);
      this.newsText = await this.oneHistory[0].content;
    }
  },
  computed: {
    ...mapGetters(["history", "oneHistory"])
  }
};
</script>
