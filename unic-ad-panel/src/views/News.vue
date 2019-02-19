<template>
  <v-app>
    <h1>Новости</h1>
    <section v-if="errored">
      <p>Приносим извинения, произошла ошибка. Пожалуйста, повторите позднее</p>
    </section>
    <section v-else>
      <div v-if="loading">Загрузка...</div>
      <v-toolbar flat color="white">
        <v-toolbar-title>CRUD news</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="800px">
          <v-btn
            slot="activator"
            color="primary"
            dark
            class="mb-2"
            @click="isEdited = false"
          >Добавить</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-form
                  enctype="multipart/form-data"
                  action="http://localhost:3000/api/admin/upload_news"
                  v-model="valid"
                  method="post"
                  @submit.prevent="uploadData()"
                >
                  <v-text-field name="title" v-model="editedItem.title" label="Заголовок"></v-text-field>
                  <v-textarea name="content" v-model="editedItem.content" label="Новость"></v-textarea>
                  <v-menu
                    ref="menu1"
                    :close-on-content-click="false"
                    v-model="menu1"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="dateFormatted"
                      label="Дата"
                      hint="DD.MM.YYYY формат"
                      persistent-hint
                      prepend-icon="event"
                      @blur="date = parseDate(dateFormatted)"
                    ></v-text-field>
                    <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                  </v-menu>
                  <v-menu
                    ref="menu"
                    :close-on-content-click="false"
                    v-model="menu2"
                    :nudge-right="40"
                    :return-value.sync="time"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="time"
                      label="Picker in menu"
                      prepend-icon="access_time"
                      readonly
                    ></v-text-field>
                    <v-time-picker
                      v-if="menu2"
                      v-model="time"
                      format="24hr"
                      @change="$refs.menu.save(time)"
                    ></v-time-picker>
                  </v-menu>
                  <input
                    v-if="!isEdited"
                    type="file"
                    name="upload"
                    @change="saveFileInfo($event.target.files[0])"
                  >
                  <v-btn v-if="!isEdited" type="submit">submit</v-btn>
                  <v-progress-circular :value="progress" color="blue-grey"></v-progress-circular>
                </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                v-if="isEdited"
                color="blue darken-1"
                flat
                @click.native="save(editedItem)"
              >Сохранить</v-btn>
              <v-btn color="blue darken-1" flat @click.native="close">Отмена</v-btn>
            </v-card-actions>
            <div v-html="editedItem.content"></div>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="news"
        :pagination.sync="pagination"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <tr @click="props.expanded = !props.expanded">
            <td class="text-xs-left">{{ props.item.id }}</td>
            <td class="text-xs-left">{{ props.item.title }}</td>
            <td class="text-xs-left">{{ props.item.content }}</td>
            <td class="text-xs-left">{{ props.item.date_now | date}}</td>
            <td class="text-xs-left">{{ props.item.logo }}</td>
            <td class="justify-center layout px-0">
              <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
              <v-icon small @click="deleteItem(props.item)">delete</v-icon>
            </td>
          </tr>
        </template>
        <template slot="expand" slot-scope="props">
          <v-form
            enctype="multipart/form-data"
            v-model="valid"
            method="post"
            @submit.prevent="uploadDocs(props.item.id)"
          >
            Загрузить документы:
            <input
              type="file"
              name="upload"
              multiple="multiple"
              @change="saveDocsInfo($event.target.files)"
            >
            <v-btn type="submit">submit</v-btn>
            <v-progress-circular :value="progressDocs" color="blue-grey"></v-progress-circular>
          </v-form>
          <v-form
            enctype="multipart/form-data"
            v-model="valid"
            method="post"
            @submit.prevent="uploadPhotos(props.item.id)"
          >
            Загрузить фотографии:
            <input
              type="file"
              name="upload"
              multiple="multiple"
              @change="savePhotosInfo($event.target.files)"
            >
            <v-btn type="submit">submit</v-btn>
            <v-progress-circular :value="progressDocs" color="blue-grey"></v-progress-circular>
          </v-form>
        </template>
      </v-data-table>
    </section>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import {
  FETCH_NEWS,
  NEW_NEWS,
  DELETE_NEWS,
  UPDATE_NEWS
} from "@/store/actions.type";

import { upload } from "@/common/file-upload.service.js";
import axios from "axios";
import { default as format } from "date-fns/format";

export default {
  data() {
    return {
      //datetimePicker
      date: null,
      dateFormatted:
        new Date().getDate() +
        "." +
        (new Date().getMonth() + 1) +
        "." +
        new Date().getFullYear(),
      menu1: false,
      time:
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds(),
      menu2: false,
      //fileUpload
      eventFiles: "",

      valid: true,
      loading: false,
      errored: false,
      //added
      pagination: {
        sortBy: "date_now",
        descending: true
      },
      dialog: false,
      isEdited: false,
      headers: [
        { text: "Id", value: "id" },
        { text: "Заголовок", value: "title" },
        { text: "Новость", value: "content" },
        { text: "Дата", value: "date_now" },
        { text: "Лого", value: "logo" },
        { text: "Действия", value: "actions" }
      ],
      editedIndex: -1,
      editedItem: {
        id: 0,
        title: "",
        description: "",
        content: "",
        date_now: "",
        logo: ""
      },
      defaultItem: {
        id: 0,
        title: "",
        description: "",
        content: "",
        date_now: "",
        logo: ""
      },
      //progress
      progress: 0,
      //docs, photos
      eventDocs: [],
      progressDocs: 0,
      eventPhotos: [],
      progressPhotos: 0
    };
  },
  mounted() {
    this.fetchNews();
  },
  methods: {
    fetchNews() {
      this.$store.dispatch(FETCH_NEWS);
    },

    editItem(item) {
      this.isEdited = true;
      this.editedIndex = this.news.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.news.indexOf(item);
      const id = item.id;
      confirm("Действительно хотите удалить элемент с ID: " + id) &&
        this.$store.dispatch(DELETE_NEWS, { id }).then(() => {
          this.news.splice(index, 1);
        });
    },

    save(item) {
      const id = item.id;
      const title = item.title;
      const content = item.content;
      const date_now = this.prepareDateEdit(item.date_now);

      this.$store.dispatch(UPDATE_NEWS, { id, title, content, date_now });
      Object.assign(this.news[this.editedIndex], item);
      this.editedIndex = -1;

      this.close();
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    saveFileInfo(files) {
      this.eventFiles = files;
    },

    uploadData() {
      this.progress = 30;
      var formData = new FormData();
      this.prepareDate();
      formData.append("title", this.editedItem.title);
      formData.append("content", this.editedItem.content);
      formData.append("date_now", this.editedItem.date_now);
      formData.append("upload", this.eventFiles, this.eventFiles.name);

      let config = {
        header: {
          "Content-Type": "multipart/form-data"
        }
      };
      axios
        .post("http://localhost:3000/api/admin/upload_news", formData, config)
        .then(responce => {
          this.progress = 50;
          this.editedItem.id = responce.data.insertId;
          console.log(responce);
          console.log(this.editedItem);
        })
        .finally(
          () => (
            (this.progress = 100),
            this.news.unshift(this.editedItem),
            this.close()
          )
        );
    },

    /**
     * dateTimePicker
     */
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}.${month}.${year}`;
    },

    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split(".");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },

    /**
     * date format for database
     */
    prepareDate() {
      const [day, month, year] = this.dateFormatted.split(".");
      this.editedItem.date_now = `${year}-${month.padStart(
        2,
        "0"
      )}-${day.padStart(2, "0")} ${this.time}`;
      console.log(this.editedItem);
    },

    prepareDateEdit(item) {
      return format(item, "YYYY-MM-DD HH:mm");
    },

    /**
     * uploadDocs
     */
    uploadDocs(id) {
      var formData = new FormData();
      console.log(this.eventDocs);

      formData.append("idnews", id);

      for (var k in this.eventDocs) {
        formData.append("upload", this.eventDocs[k], this.eventDocs[k].name);
      }

      let config = {
        header: {
          "Content-Type": "multipart/form-data"
        }
      };
      axios
        .post(
          "http://localhost:3000/api/admin/upload_news/newsdocs",
          formData,
          config
        )
        .finally(() => (this.progressDocs = 100));
    },

    saveDocsInfo(docs) {
      this.eventDocs = docs;
    },

    /**
     * uploadPhotos
     */
    uploadPhotos(id) {
      var formData = new FormData();
      console.log(this.eventPhotos);

      formData.append("idnews", id);

      for (var k in this.eventPhotos) {
        formData.append(
          "upload",
          this.eventPhotos[k],
          this.eventPhotos[k].name
        );
      }

      let config = {
        header: {
          "Content-Type": "multipart/form-data"
        }
      };
      axios
        .post(
          "http://localhost:3000/api/admin/upload_news/photo",
          formData,
          config
        )
        .finally(() => (this.progressDocs = 100));
    },

    savePhotosInfo(photos) {
      this.eventPhotos = photos;
    }
  },
  computed: {
    ...mapGetters(["news"]),

    formTitle() {
      return this.editedIndex === -1 ? "Новый элемент" : "Изменить элемент";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    //datetimePicker
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    }
  }
};
</script>

