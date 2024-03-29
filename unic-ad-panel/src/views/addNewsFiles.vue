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
              На странице можно загрузить фото к новостям.
              <br>Выберите необходимую новость
              <br>Выберите столько файлов, сколько нужно
              <br>Загрузка начнётся автоматически, по завершению будет уведомление об итоге выполнения
              <br>
              <b>Если файлы весят много, то нужно немного подождать, не спешите</b>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-layout wrap align-center>
        <v-flex xs12 sm12 d-flex>
          <v-select
            :items="listNews"
            item-value="id"
            v-model="selectedValue"
            label="Выберите новость"
          >
            <template
              slot="selection"
              slot-scope="data"
            >{{ data.item.title}} - {{ data.item.date_now }}</template>
            <template slot="item" slot-scope="data">{{ data.item.title}} - {{data.item.date_now }}</template>
          </v-select>
        </v-flex>
        <v-flex v-if="selectedValue !== null">
          <el-upload
            class="upload-demo"
            drag
            action
            :on-change="uploadFile"
            :auto-upload="false"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              Перетащите или
              <em>нажмите для загрузки</em>
            </div>
          </el-upload>
        </v-flex>
      </v-layout>
    </v-container>
    <section v-if="errored">
      <p>Приносим извинения, произошла ошибка. Пожалуйста, повторите позднее</p>
    </section>
    <section v-else>
      <div v-if="loading">Загрузка...</div>
      <v-toolbar flat color="white">
        <v-toolbar-title>Удаление фото у новостей</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-toolbar>
      <v-data-table :headers="headers" :items="photos" :search="search" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.idnews }}</td>
          <td class="text-xs-left">{{ props.item.link }}</td>
          <td class="justify-center layout px-0">
            <v-icon v-if="props.item.id !== null" small @click="deleteItem(props.item)">delete</v-icon>
          </td>
        </template>
      </v-data-table>
    </section>
    <v-snackbar v-model="snackbar" :color="color" :timeout="50 * 100">
      {{ text }}
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import {
  FETCH_LIST_NEWS,
  FETCH_NEWS_PHOTO,
  UPLOAD_NEWS_PHOTO,
  DELETE_NEWS_PHOTO
} from "@/store/actions.type";
import snackbar from "@/common/snackbar.js";

export default {
  mixins: [snackbar],
  data() {
    return {
      loading: false,
      errored: false,
      search: "",
      headers: [
        { text: "ID новости", value: "idnews" },
        { text: "Ссылка", value: "link" },
        { text: "Действия", value: "actions" }
      ],

      editedIndex: -1,
      editedItem: {
        id: 0,
        idnews: "",
        link: ""
      },
      defaultItem: {
        id: 0,
        idnews: "",
        link: ""
      },

      selectedValue: null,
      //snackbar
      snackbar: false,
      color: "success",
      text: ""
    };
  },
  mounted() {
    this.fetchNews();
  },
  methods: {
    fetchNews() {
      this.$store.dispatch(FETCH_LIST_NEWS);
      this.$store.dispatch(FETCH_NEWS_PHOTO);
      //this.$store.dispatch(FETCH_NEWS_PHOTO);
    },
    async uploadFile(file) {
      let formData = new FormData();
      formData.append("upload", file.raw, file.raw.name);
      try {
        await this.$store
          .dispatch(UPLOAD_NEWS_PHOTO, {
            id: this.selectedValue,
            file: formData
          })
          .then(() => {
            this.runSnackbar("success", this.successInsertMessage);
          });
      } catch (err) {
        this.runSnackbar("error", this.errorInsertMessage);
      }
    },
    async deleteItem(item) {
      const index = this.photos.indexOf(item);
      const id = item.id;
      try {
        (await confirm("Действительно хотите удалить элемент с ID: " + id)) &&
          this.$store.dispatch(DELETE_NEWS_PHOTO, { id }).then(() => {
            this.photos.splice(index, 1);
            this.runSnackbar("success", this.successDeleteMessage);
          });
      } catch {
        this.runSnackbar("error", this.errorDeleteMessage);
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    }
  },
  computed: {
    ...mapGetters([
      "photos",
      "listNews",
      "successInsertMessage",
      "successDeleteMessage",
      "errorInsertMessage",
      "errorDeleteMessage"
    ])
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  }
};
</script>
