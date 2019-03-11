<template>
  <v-app>
    <v-container fluid grid-list-xl>
      <p>В разделе можно загрузить файлы для конкретной специальности и года</p>
      <v-layout wrap align-center>
        <v-flex xs12 sm12 d-flex>
          <v-select
            :items="education"
            item-value="eduopId"
            v-model="selectedValue"
            label="Выберите специальность"
            @change="fetchEducation()"
          >
            <template
              slot="selection"
              slot-scope="data"
            >{{ data.item.eduCode}} - {{ data.item.year}} - {{ data.item.eduName}}</template>
            <template
              slot="item"
              slot-scope="data"
            >{{ data.item.eduCode}} - {{ data.item.year}} - {{ data.item.eduName}}</template>
          </v-select>
        </v-flex>
        <v-flex xs12 sm6 d-flex>
          <v-select :items="tuples" label="Выберите тип документа" v-model="selectedTuple"></v-select>
        </v-flex>
        <v-flex v-if="selectedTuple !== '' && selectedValue !== null">
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
    <v-snackbar v-model="snackbar" :color="color" :timeout="50 * 100">
      {{ text }}
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_EDUCATION, UPLOAD_EDUCATION } from "@/store/actions.type";

export default {
  data() {
    return {
      selectedValue: null,
      tuples: [
        { value: "opMain", text: "Описание образовательной программы" },
        { value: "educationPlan", text: "Учебный план" },
        { value: "educationAnnotation", text: "Аннотации" },
        { value: "educationShedule", text: "Календарный учебный график" },
        { value: "methodology", text: "Методические документы" }
      ],
      selectedTuple: "",
      //snackbar
      snackbar: false,
      color: "success",
      text: ""
    };
  },
  mounted() {
    this.fetchEducation();
  },
  methods: {
    fetchEducation() {
      this.$store.dispatch(FETCH_EDUCATION);
    },
    async uploadFile(file) {
      let formData = new FormData();
      formData.append("upload", file.raw, file.raw.name);
      try {
        await this.$store.dispatch(UPLOAD_EDUCATION, {
          id: this.selectedValue,
          tuple: this.selectedTuple,
          file: formData
        });
        this.color = "success";
        this.text = "Данные успешно изменены";
        this.snackbar = true;
      } catch {
        this.color = "error";
        this.text = "Приносим извинения, произошла ошибка";
        this.snackbar = true;
      }
    }
  },
  computed: {
    ...mapGetters(["education"])
  }
};
</script>
