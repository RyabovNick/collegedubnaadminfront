<template>
  <v-app>
    <v-container fluid grid-list-xl>
      <p>В разделе можно загрузить и удалить локальные нормативные акты</p>
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
          .then(() => {
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
