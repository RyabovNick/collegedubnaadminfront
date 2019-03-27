<template>
  <v-app>
    <v-container fluid grid-list-xl>
      <p>В разделе можно добавить файлы</p>
      <p>
        Необходимо создать путь (или указать ранее созданный), а затем
        выбрать его и выбрать необходимые для загрузки файлы
      </p>
      <v-layout wrap align-center>
        <v-flex xs12 sm6 md5 lg5>
          <v-select :items="paths" item-value="id" v-model="pathId" label="Выберите путь файла">
            <template slot="selection" slot-scope="data">{{ data.item.path }}</template>
            <template slot="item" slot-scope="data">{{data.item.path }}</template>
          </v-select>
        </v-flex>
        <v-flex v-if="pathId !== null">
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
        <v-toolbar-title>Просмотр ранее загруженных файлов</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-toolbar>
      <v-data-table :headers="headersFiles" :items="files" :search="search" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.path }}</td>
          <td class="text-xs-left">{{ props.item.path_to_add }}</td>
          <td class="justify-center layout px-0">
            <v-icon small @click="deleteFile(props.item)">delete</v-icon>
          </td>
        </template>
      </v-data-table>
    </section>

    <section v-if="errored">
      <p>Приносим извинения, произошла ошибка. Пожалуйста, повторите позднее</p>
    </section>
    <section v-else>
      <div v-if="loading">Загрузка...</div>
      <v-toolbar flat color="white">
        <v-toolbar-title>Добавление новых путей</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        <v-dialog v-model="dialog" max-width="800px">
          <v-btn slot="activator" color="primary" dark class="mb-2">Добавить</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">Изменить</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field label="Введите путь" v-model="editedItem.path"></v-text-field>
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
      <v-data-table :headers="headersPaths" :items="paths" :search="search" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.id }}</td>
          <td class="text-xs-left">{{ props.item.path }}</td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)">delete</v-icon>
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
  FETCH_PATHS,
  FETCH_FILES,
  NEW_PATHS,
  DELETE_PATHS,
  UPDATE_PATHS,
  UPLOAD_FILES,
  DELETE_FILE
} from "@/store/actions.type";

export default {
  data() {
    return {
      loading: false,
      errored: false,
      search: "",
      dialog: false,
      headersPaths: [
        { text: "Id", value: "id" },
        { text: "Путь", value: "path" },
        { text: "Действия", value: "actions" }
      ],
      headersFiles: [
        { text: "Название файла", value: "name" },
        { text: "Путь", value: "path" },
        { text: "Путь для использования на сайте", value: "path_to_add" },
        { text: "Действия", value: "actions" }
      ],

      editedIndex: -1,
      editedItem: {
        id: 0,
        path: ""
      },
      defaultItem: {
        id: 0,
        path: ""
      },
      //snackbar
      snackbar: false,
      color: "success",
      text: "",
      // selected path
      pathId: null
    };
  },
  mounted() {
    this.fetchPaths();
  },
  methods: {
    fetchPaths() {
      this.$store.dispatch(FETCH_PATHS);
      this.$store.dispatch(FETCH_FILES);
    },
    async uploadFile(file) {
      let formData = new FormData();
      formData.append("upload", file.raw, file.raw.name);
      try {
        await this.$store
          .dispatch(UPLOAD_FILES, {
            path: this.pathId,
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
      const index = this.paths.indexOf(item);
      const id = item.id;
      try {
        (await confirm("Действительно хотите удалить элемент с ID: " + id)) &&
          this.$store.dispatch(DELETE_PATHS, { id }).then(() => {
            this.paths.splice(index, 1);
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
    async deleteFile(item) {
      const index = this.files.indexOf(item);
      const id = item.id;
      try {
        (await confirm("Действительно хотите удалить элемент с ID: " + id)) &&
          this.$store.dispatch(DELETE_FILE, { id }).then(() => {
            this.files.splice(index, 1);
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
      this.editedIndex = this.paths.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    async save(item) {
      if (this.editedIndex > -1) {
        try {
          await this.$store.dispatch(UPDATE_PATHS, {
            id: this.editedItem.id,
            path: this.editedItem.path
          });
          Object.assign(this.paths[this.editedIndex], this.editedItem);
          this.editedIndex = -1;
          this.color = "success";
          this.text = "Данные успешно изменены";
          this.snackbar = true;
        } catch {
          this.color = "error";
          this.text = "Произошла ошибка при изменении данных";
          this.snackbar = true;
        }
      } else {
        const path = item.path;
        this.$store.dispatch(NEW_PATHS, { path }).then(response => {
          this.editedItem.id = response.data.insertId;
        });
        this.paths.push(this.editedItem);
      }

      this.close();
    }
  },
  computed: {
    ...mapGetters(["paths", "files"])
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  }
};
</script>

