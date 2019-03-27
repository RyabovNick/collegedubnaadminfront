<template>
  <v-app>
    <v-container fluid grid-list-xl>
      <p>В разделе добавить/удалить фото галлереи на главной</p>
      <p>Размер: ...</p>
      <p>
        Порядок показа фото зависит от цифры (Номер). Чем меньше,
        тем раньше будет показана фотография.
      </p>
      <v-layout wrap align-center>
        <v-flex xs12 sm6 md5 lg5>
          <v-text-field
            type="number"
            label="Введите число для порядкового номера фото"
            v-model="number"
          ></v-text-field>
        </v-flex>
        <v-flex v-if="number !== null && number !== ''">
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
        <v-toolbar-title>Удаление фотографий на главной странице</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        <v-dialog v-model="dialog" max-width="800px">
          <v-card>
            <v-card-title>
              <span class="headline">Изменить</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      type="number"
                      label="Введите число для порядкового номера фото"
                      v-model="editedItem.number"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="close">Отмена</v-btn>
              <v-btn color="blue darken-1" flat @click.native="save(editedItem)">Сохранить</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table :headers="headers" :items="gallery" :search="search" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.id }}</td>
          <td class="text-xs-left">{{ props.item.link }}</td>
          <td class="text-xs-left">{{ props.item.number }}</td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
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
  FETCH_GALLERY,
  UPLOAD_GALLERY,
  DELETE_GALLERY,
  UPDATE_GALLERY
} from "@/store/actions.type";
import snackbar from "@/common/snackbar.js";

export default {
  data() {
    return {
      loading: false,
      errored: false,
      search: "",
      dialog: false,
      headers: [
        { text: "ID", value: "id" },
        { text: "Ссылка", value: "link" },
        { text: "Номер", value: "number" },
        { text: "Действия", value: "actions" }
      ],

      editedIndex: -1,
      editedItem: {
        id: 0,
        link: "",
        number: 0
      },
      defaultItem: {
        id: 0,
        link: "",
        number: 0
      },
      //snackbar
      snackbar: false,
      color: "success",
      text: "",
      // photo range
      number: null
    };
  },
  mounted() {
    this.fetchNews();
  },
  methods: {
    fetchNews() {
      this.$store.dispatch(FETCH_GALLERY);
    },
    async uploadFile(file) {
      let formData = new FormData();
      formData.append("number", this.number);
      formData.append("upload", file.raw, file.raw.name);
      try {
        await this.$store
          .dispatch(UPLOAD_GALLERY, {
            file: formData
          })
          .then(() => {
            this.color = "success";
            this.text = "Данные успешно изменены";
            this.snackbar = true;
          });
      } catch (err) {
        this.color = "error";
        this.text = "Приносим извинения, произошла ошибка";
        this.snackbar = true;
      }
    },
    async deleteItem(item) {
      const index = this.gallery.indexOf(item);
      const id = item.id;
      try {
        (await confirm("Действительно хотите удалить элемент с ID: " + id)) &&
          this.$store.dispatch(DELETE_GALLERY, { id }).then(() => {
            this.gallery.splice(index, 1);
            this.color = "success";
            this.text = "Данные успешно изменены";
            this.snackbar = true;
          });
      } catch {
        this.color = "error";
        this.text = "Произошла ошибка при изменении данных";
        this.snackbar = true;
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    editItem(item) {
      this.editedIndex = this.gallery.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    async save(item) {
      try {
        await this.$store.dispatch(UPDATE_GALLERY, {
          id: this.editedItem.id,
          number: this.editedItem.number
        });
        Object.assign(this.gallery[this.editedIndex], this.editedItem);
        this.editedIndex = -1;
        this.color = "success";
        this.text = "Данные успешно изменены";
        this.snackbar = true;
      } catch {
        this.color = "error";
        this.text = "Произошла ошибка при изменении данных";
        this.snackbar = true;
      }

      this.close();
    }
  },
  computed: {
    ...mapGetters(["gallery"])
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  }
};
</script>

