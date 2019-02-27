<style>
</style>

<template>
  <v-app>
    <v-container fluid grid-list-xl>
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
          <v-select :items="tuples" label="Standard" v-model="selectedTuple"></v-select>
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
        "opMain",
        "educationPlan",
        "educationAnnotation",
        "educationShedule",
        "methodology"
      ],
      selectedTuple: ""
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
      console.log("file: ", file.raw.name);
      let formData = new FormData();
      formData.append("upload", file.raw, file.raw.name);
      try {
        console.log("this.selectedTuple: ", this.selectedTuple);
        await this.$store.dispatch(UPLOAD_EDUCATION, {
          id: this.selectedValue,
          tuple: this.selectedTuple,
          file: formData
        });
      } catch (err) {
        console.log("err: ", err);
      }
    }
  },
  computed: {
    ...mapGetters(["education"])
  }
};
</script>
