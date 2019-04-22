<template>
  <v-app>
    <h1>Наличие общежития, количество жилых помещений в общежитии для иногородних обучающихся</h1>
    <v-expansion-panel>
      <v-expansion-panel-content>
        <template v-slot:header>
          <div>Помощь</div>
        </template>
        <v-card>
          <v-card-text>
            На странице можно добавить информацию в раздел "Стипендии и иные виды материальной поддержки" в подраздел "Наличие общежития, количество жилых помещений в общежитии для иногородних обучающихся".
            <br>Атрибут тег используется для бота "паук" министерства, чтобы в автоматическом режиме искать на сайте необходимую информацию. Он должен соответствовать требованиям, указанных в документе от министерства.
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <section v-if="errored">
      <p>Приносим извинения, произошла ошибка. Пожалуйста, повторите позднее</p>
    </section>
    <section v-else>
      <div v-if="loading">Загрузка...</div>
      <v-toolbar flat color="white">
        <v-toolbar-title>CRUD hostelInfo</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="800px">
          <v-btn slot="activator" color="primary" dark class="mb-2">Добавить</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="editedItem.name" label="Название"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="editedItem.tag" label="Тег"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="editedItem.value" label="Значение"></v-text-field>
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
      <v-data-table :headers="headers" :items="hostelInfo" class="elevation-1" hide-actions>
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.id }}</td>
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.tag }}</td>
          <td class="text-xs-left">{{ props.item.value }}</td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)">delete</v-icon>
          </td>
        </template>
      </v-data-table>
      <v-snackbar v-model="snackbar" :color="color" :timeout="50 * 100">
        {{ text }}
        <v-btn dark flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </section>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import {
  FETCH_HOSTELINFO,
  NEW_HOSTELINFO,
  DELETE_HOSTELINFO,
  UPDATE_HOSTELINFO
} from "@/store/actions.type";
import snackbar from "@/common/snackbar.js";

export default {
  mixins: [snackbar],
  data() {
    return {
      loading: false,
      errored: false,
      //added
      dialog: false,
      // snackbar
      snackbar: false,
      color: "success",
      text: "",
      headers: [
        { text: "Id", value: "id" },
        { text: "Название", value: "name" },
        { text: "Тег", value: "tag" },
        { text: "Значение", value: "value" },
        { text: "Действия", value: "actions" }
      ],
      editedIndex: -1,
      editedItem: {
        id: 0,
        name: "",
        tag: "",
        value: ""
      },
      defaultItem: {
        id: 0,
        name: "",
        tag: "",
        value: ""
      }
    };
  },
  mounted() {
    this.fetchHostelInfo();
  },
  methods: {
    fetchHostelInfo() {
      this.$store.dispatch(FETCH_HOSTELINFO);
    },

    editItem(item) {
      this.editedIndex = this.hostelInfo.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      const index = this.hostelInfo.indexOf(item);
      const id = item.id;
      try {
        confirm("Действительно хотите удалить элемент с ID: " + id) &&
          this.$store.dispatch(DELETE_HOSTELINFO, { id }).then(() => {
            this.hostelInfo.splice(index, 1);
            this.runSnackbar("success", this.successDeleteMessage);
          });
      } catch {
        this.runSnackbar("error", this.errorDeleteMessage);
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    async save(item) {
      const id = item.id;
      const name = item.name;
      const tag = item.tag;
      const value = item.value;
      if (this.editedIndex > -1) {
        try {
          await this.$store.dispatch(UPDATE_HOSTELINFO, {
            id,
            name,
            tag,
            value
          });
          Object.assign(this.hostelInfo[this.editedIndex], item);
          this.editedIndex = -1;
          this.runSnackbar("success", this.successUpdateMessage);
        } catch {
          this.runSnackbar("error", this.errorUpdateMessage);
        }
      } else {
        try {
          await this.$store
            .dispatch(NEW_HOSTELINFO, { name, tag, value })
            .then(response => {
              this.editedItem.id = response.data.insertId;
              this.hostelInfo.push(this.editedItem);
              this.runSnackbar("success", this.successInsertMessage);
            });
        } catch {
          this.runSnackbar("error", this.errorInsertMessage);
        }
      }
      this.close();
    }
  },
  computed: {
    ...mapGetters([
      "hostelInfo",
      "successInsertMessage",
      "successUpdateMessage",
      "successDeleteMessage",
      "errorInsertMessage",
      "errorUpdateMessage",
      "errorDeleteMessage"
    ]),

    formTitle() {
      return this.editedIndex === -1 ? "Новый элемент" : "Изменить элемент";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  }
};
</script>

