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
  margin-bottom: 0;
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.v-note-wrapper {
  z-index: 2;
}
</style>

<template>
  <v-app>
    <v-container fluid grid-list-xl>
      <v-layout wrap align-center>
        <v-flex xs12 sm6 md5 d-flex>
          <v-select
            :items="listNews"
            item-value="id"
            v-model="selectedValue"
            label="Выбор страницы"
            @change="fetchNews()"
          >
            <template
              slot="selection"
              slot-scope="data"
            >{{ data.item.title}} - {{ data.item.date_now | date}}</template>
            <template
              slot="item"
              slot-scope="data"
            >{{ data.item.title}} - {{data.item.date_now | date}}</template>
          </v-select>
        </v-flex>
        <v-flex xs12 sm6 md1 lg1>
          <v-text-field type="number" v-model="rank" label="Ранк" min="0" max="10"></v-text-field>
        </v-flex>
        <v-flex v-if="selectedValue" xs12 sm6 md3>
          <v-btn color="error" @click="deleteNews()">Удалить новость</v-btn>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <v-btn color="info" @click="saveNews()">{{ action }}</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-textarea
            v-model="title"
            name="input-7-1"
            label="Заголовок новости"
            hint="Введите текст"
            rows="2"
          ></v-textarea>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm3 md3 lg3>
          <v-menu
            v-model="datePicker"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field slot="activator" v-model="date" label="Выбор даты" prepend-icon="event"></v-text-field>
            <v-date-picker v-model="date" @input="datePicker = false"></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs12 sm3 md3 lg3>
          <v-menu
            ref="menu"
            v-model="timePicker"
            :close-on-content-click="false"
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
              label="Выбор времени"
              prepend-icon="access_time"
              readonly
            ></v-text-field>
            <v-time-picker
              v-if="timePicker"
              v-model="time"
              full-width
              @click:minute="$refs.menu.save(time)"
              format="24hr"
            ></v-time-picker>
          </v-menu>
        </v-flex>
        <v-flex xs12 sm6 md6 lg6>
          <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
            :on-change="loadImage"
            :auto-upload="false"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </v-flex>
        <v-flex xs12>
          <mavon-editor
            class="md-helper"
            style="max-height: 800px"
            v-model="newsText"
            language="ru"
            :toolbars="toolbars"
          />
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
import axios from "axios";
import VueMarkdown from "vue-markdown";
import { mapGetters } from "vuex";
import {
  FETCH_LIST_NEWS,
  FETCH_NEWS,
  UPDATE_NEWS,
  DELETE_NEWS,
  UPLOAD_NEWS
} from "@/store/actions.type";

export default {
  components: {
    VueMarkdown
  },
  data() {
    return {
      selectedValue: null,
      snackbar: false,
      color: "success",
      title: "",
      rank: 7,
      text: "",
      newsText: "",
      action: "Добавить новость",
      //datePicker
      datePicker: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      timePicker: false,
      time: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(11, 5),
      //image
      imageUrl: "",
      file: "",

      //mavon-editor toolbars
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
        trash: true,
        save: true,
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
    this.fetchListNews();
  },
  methods: {
    /**
     * its checked if file size and format allowed
     * and save file.raw to local data
     */
    loadImage(file) {
      const isJPG =
        file.raw.type === "image/jpeg" || file.raw.type === "image/png";
      const isLt2M = file.raw.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.color = "error";
        this.text = "Картинка должна быть в формате jpg или png";
        this.snackbar = true;
      }
      if (!isLt2M) {
        this.color = "error";
        this.text = "Размер картинки должен быть не более 2 мб";
        this.snackbar = true;
      }

      if (isJPG && isLt2M) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.file = file.raw;
      }
    },
    fetchListNews() {
      this.$store.dispatch(FETCH_LIST_NEWS);
    },
    async fetchNews() {
      this.action = "Изменить новость";
      await this.$store.dispatch(FETCH_NEWS, this.selectedValue);
      this.title = await this.$store.getters.news[0].title;
      this.newsText = this.$store.getters.news[0].content;
      this.imageUrl = `http://localhost:3001/files/${
        this.$store.getters.news[0].logo
      }`;
      let prepareDate = new Date(this.$store.getters.news[0].date_now);
      prepareDate.setHours(prepareDate.getHours() + 3);
      prepareDate = new Date(prepareDate).toISOString();
      this.date = prepareDate.substr(0, 10);
      this.time = prepareDate.substr(11, 5);
      this.rank = this.$store.getters.news[0].rank;
    },
    async saveNews() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("content", this.newsText);
      formData.append("date_now", `${this.date} ${this.time}`);
      formData.append("upload", this.file, this.file.name);
      formData.append("rank", this.rank);

      //add news
      if (this.selectedValue === null) {
        try {
          await this.$store.dispatch(UPLOAD_NEWS, { file: formData });
          this.color = "success";
          this.text = "Данные успешно изменены";
          this.snackbar = true;

          // empty form
          this.title = "";
          this.newsText = "";
          this.imageUrl = "";
        } catch {
          this.color = "error";
          this.text = "Приносим извинения, произошла ошибка";
          this.snackbar = true;
        }
      }
      //update news (need to add backend)
      else {
        if (this.selectedValue === null) {
          this.color = "error";
          this.text = "Необходимо выбрать новость";
          this.snackbar = true;
        } else {
          try {
            console.log(1);
            const id = this.selectedValue;
            await this.$store.dispatch(UPDATE_NEWS, {
              id,
              title: this.title,
              content: this.newsText,
              date_now: `${this.date} ${this.time}`,
              rank: this.rank
            });
            this.color = "success";
            this.text = "Данные успешно изменены";
            this.snackbar = true;
          } catch (err) {
            console.log("err: ", err);
            this.color = "error";
            this.text = "Произошла ошибка при изменении данных";
            this.snackbar = true;
          }
        }
      }
    },
    async deleteNews() {
      const id = this.selectedValue;
      try {
        (await confirm(
          `Вы действительно хотите удалить новость ${
            this.$store.getters.news[0].title
          } ?`
        )) &&
          this.$store.dispatch(DELETE_NEWS, { id }).then(() => {
            this.color = "success";
            this.text = "Данные успешно изменены";
            this.snackbar = true;
            this.newsText = "";
          });
      } catch {
        this.color = "error";
        this.text = "Произошла ошибка при изменении данных";
        this.snackbar = true;
      }
    }
  },
  computed: {
    ...mapGetters(["listNews", "news"])
  }
};
</script>
