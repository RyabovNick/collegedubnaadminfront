<template>
  <v-app>
    <h1>Локальные нормативные акты</h1>
    <v-expansion-panel>
      <v-expansion-panel-content>
        <template v-slot:header>
          <div>Помощь</div>
        </template>
        <v-card>
          <v-card-text>
            На странице можно добавить информацию в раздел "Стипендии и иные виды материальной поддержки" в подраздел "Локальные нормативные акты".
            <br>Для добавления необходимо ввести название, которое будет отображаться на странице. И перетащить или выбрать файл, загрузка начнётся автоматически. По завершению будет уведомление о результате выполнения.
            <br>Для удаления в выпадающем списке необходимо выбрать нужный акт и нажать на кнопку "Удалить"
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-container fluid grid-list-xl>
      <v-layout wrap align-center>
        <v-flex>
          <v-textarea
            v-model="grantsDocsName"
            name="input-7-1"
            label="Название локального нормативного акта"
            hint="Введите текст"
            rows="2"
          ></v-textarea>
        </v-flex>
        <v-flex v-if="grantsDocsName">
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
            :items="grantsDocs"
            item-value="id"
            v-model="selectedValue"
            label="Выбор локального нормативного акта"
          >
            <template slot="selection" slot-scope="data">{{data.item.id}}: {{ data.item.name}}</template>
            <template slot="item" slot-scope="data">{{data.item.id}}: {{ data.item.name}}</template>
          </v-select>
        </v-flex>
        <v-flex v-if="selectedValue" xs12 sm6 md3>
          <v-btn color="error" @click="deleteGrantsDocs()">Удалить локальный нормативный акт</v-btn>
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
  FETCH_GRANTSDOCS,
  DELETE_GRANTSDOCS,
  UPLOAD_GRANTSDOCS
} from "@/store/actions.type";
import snackbar from "@/common/snackbar.js";

export default {
  mixins: [snackbar],
  data() {
    return {
      selectedValue: null,
      grantsDocsName: "",
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
      this.$store.dispatch(FETCH_GRANTSDOCS);
    },
    async uploadFile(file) {
      let formData = new FormData();
      formData.append("name", this.grantsDocsName);
      formData.append("upload", file.raw, file.raw.name);
      try {
        await this.$store
          .dispatch(UPLOAD_GRANTSDOCS, {
            file: formData
          })
          .then(response => {
            this.grantsDocs.push({
              id: response.data.insertId,
              link: "",
              name: this.grantsDocsName
            });
            this.runSnackbar("success", this.successUpdateMessage);
            this.grantsDocsName = "";
          });
      } catch {
        this.runSnackbar("error", this.errorUpdateMessage);
      }
    },
    async deleteGrantsDocs() {
      const id = this.selectedValue;
      try {
        (await confirm(
          `Вы действительно хотите удалить стандарт с id: ${id}?`
        )) &&
          this.$store.dispatch(DELETE_GRANTSDOCS, { id }).then(() => {
            const index = this.grantsDocs.findIndex(item => item.id === id);
            this.grantsDocs.splice(index, 1);
            this.runSnackbar("success", this.successDeleteMessage);
            this.grantsDocsName = "";
            this.selectedValue = null;
          });
      } catch {
        this.runSnackbar("error", this.errorDeleteMessage);
      }
    }
  },
  computed: {
    ...mapGetters([
      "grantsDocs",
      "successUpdateMessage",
      "successDeleteMessage",
      "errorUpdateMessage",
      "errorDeleteMessage"
    ])
  }
};
</script>
