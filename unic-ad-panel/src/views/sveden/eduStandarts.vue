<template>
  <v-app>
    <v-container fluid grid-list-xl>
      <p>В разделе можно загрузить и удалить образовательные стандарты</p>
      <v-layout wrap align-center>
        <v-flex>
          <v-textarea
            v-model="eduStandartsName"
            name="input-7-1"
            label="Название образовательного стандарта"
            hint="Введите текст"
            rows="2"
          ></v-textarea>
        </v-flex>
        <v-flex v-if="eduStandartsName">
          <el-upload class="upload-demo" drag action :on-change="uploadFile" :auto-upload="false">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              Перетащите или
              <em>нажмите для загрузки</em>
            </div>
          </el-upload>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid grid-list-xl>
      <v-layout wrap align-center>
        <v-flex xs12 sm6 md6 d-flex>
          <v-select
            :items="eduStandarts"
            item-value="id"
            v-model="selectedValue"
            label="Выбор образовательного стандарта"
          >
            <template slot="selection" slot-scope="data">{{data.item.id}}: {{ data.item.name}}</template>
            <template slot="item" slot-scope="data">{{data.item.id}}: {{ data.item.name}}</template>
          </v-select>
        </v-flex>
        <v-flex v-if="selectedValue" xs12 sm6 md3>
          <v-btn color="error" @click="deleteEduStandarts()">Удалить стандарт</v-btn>
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
  FETCH_EDUSTANDARTS,
  DELETE_EDUSTANDARTS,
  UPLOAD_EDUSTANDARTS
} from "@/store/actions.type";

export default {
  data() {
    return {
      selectedValue: null,
      eduStandartsName: "",
      //snackbar
      snackbar: false,
      color: "success",
      text: ""
    };
  },
  mounted() {
    this.fetchEdustandarts();
  },
  methods: {
    fetchEdustandarts() {
      this.$store.dispatch(FETCH_EDUSTANDARTS);
    },
    async uploadFile(file) {
      let formData = new FormData();
      formData.append("name", this.eduStandartsName);
      formData.append("upload", file.raw, file.raw.name);
      try {
        await this.$store.dispatch(UPLOAD_EDUSTANDARTS, {
          file: formData
        });
        this.color = "success";
        this.text = "Данные успешно загружены";
        this.snackbar = true;
        this.eduStandartsName = "";
      } catch {
        this.color = "error";
        this.text = "Приносим извинения, произошла ошибка";
        this.snackbar = true;
      }
    },
    async deleteEduStandarts() {
      const id = this.selectedValue;
      try {
        (await confirm(
          `Вы действительно хотите удалить стандарт с id: ${id}?`
        )) &&
          this.$store.dispatch(DELETE_EDUSTANDARTS, { id }).then(() => {
            this.color = "success";
            this.text = "Данные успешно изменены";
            this.snackbar = true;
            this.eduStandartsName = "";
            this.selectedValue = null;
          });
      } catch {
        this.color = "error";
        this.text = "Произошла ошибка при изменении данных";
        this.snackbar = true;
      }
    }
  },
  computed: {
    ...mapGetters(["eduStandarts"])
  }
};
</script>
