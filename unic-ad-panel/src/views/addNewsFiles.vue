<template>
  <v-app>
    <v-container fluid grid-list-xl>
      <p>В разделе можно загрузить файлы для новости</p>
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
  UPLOAD_NEWS_PHOTO
} from "@/store/actions.type";

export default {
  data() {
    return {
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
      //this.$store.dispatch(FETCH_NEWS_PHOTO);
    },
    async uploadFile(file) {
      let formData = new FormData();
      formData.append("upload", file.raw, file.raw.name);
      console.log("file.raw: ", file.raw);
      console.log("formData: ", formData);
      try {
        await this.$store.dispatch(UPLOAD_NEWS_PHOTO, {
          id: this.selectedValue,
          file: formData
        });
        this.color = "success";
        this.text = "Данные успешно изменены";
        this.snackbar = true;
      } catch (err) {
        console.log("err: ", err);
        this.color = "error";
        this.text = "Приносим извинения, произошла ошибка";
        this.snackbar = true;
      }
    }
  },
  computed: {
    ...mapGetters(["photos", "listNews"])
  }
};
</script>
