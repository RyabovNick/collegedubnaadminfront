<template>
  <v-app>
    <h1>Образовательные стандарты</h1>
    <v-expansion-panel>
      <v-expansion-panel-content>
        <template v-slot:header>
          <div>Помощь</div>
        </template>
        <v-card>
          <v-card-text>
            На странице можно добавить информацию в раздел "Образовательные стандарты".
            <br>Для добавления стандарта необходимо ввести название, которое будет отображаться на странице. И перетащить или выбрать файл, загрузка начнётся автоматически. По завершению будет уведомление о результате выполнения.
            <br>Для удаления в выпадающем списке необходимо выбрать нужный образовательный стандарт и нажать на кнопку "Удалить стандарт"
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-container fluid grid-list-xl>
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
import snackbar from "@/common/snackbar.js";

export default {
  mixins: [snackbar],
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
        await this.$store
          .dispatch(UPLOAD_EDUSTANDARTS, {
            file: formData
          })
          .then(response => {
            this.eduStandarts.push({
              id: response.data.insertId,
              link: "",
              name: this.eduStandartsName
            });
            this.runSnackbar("success", this.successUpdateMessage);
            this.eduStandartsName = "";
          });
      } catch {
        this.runSnackbar("error", this.errorUpdateMessage);
      }
    },
    async deleteEduStandarts() {
      const id = this.selectedValue;
      try {
        (await confirm(
          `Вы действительно хотите удалить стандарт с id: ${id}?`
        )) &&
          this.$store.dispatch(DELETE_EDUSTANDARTS, { id }).then(() => {
            const index = this.eduStandarts.findIndex(item => item.id === id);
            this.eduStandarts.splice(index, 1);
            this.runSnackbar("success", this.successDeleteMessage);
            this.eduStandartsName = "";
            this.selectedValue = null;
          });
      } catch {
        this.runSnackbar("error", this.errorDeleteMessage);
      }
    }
  },
  computed: {
    ...mapGetters([
      "eduStandarts",
      "successUpdateMessage",
      "successDeleteMessage",
      "errorUpdateMessage",
      "errorDeleteMessage"
    ])
  }
};
</script>
