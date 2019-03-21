<template>
  <v-app>
    <h1>Структура и органы управления образовательной организацией</h1>
    <section v-if="errored">
      <p>Приносим извинения, произошла ошибка. Пожалуйста, повторите позднее</p>
    </section>
    <section v-else>
      <div v-if="loading">Загрузка...</div>
      <v-toolbar flat color="white">
        <v-toolbar-title>CRUD ENVIRONMENT</v-toolbar-title>
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
                    <v-select
                      :items="kcpPages"
                      item-value="id"
                      v-model="editedItem.page_id"
                      label="Выберите страницу"
                    >
                      <template
                        slot="selection"
                        slot-scope="data"
                      >{{ data.item.name_ru}} - {{ data.item.name }}</template>
                      <template
                        slot="item"
                        slot-scope="data"
                      >{{ data.item.name_ru}} - {{data.item.name }}</template>
                    </v-select>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field type="number" v-model="editedItem.type" label="Тип"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="editedItem.link" label="Ссылка"></v-text-field>
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
      <v-data-table
        :headers="headers"
        :items="listEnvironmentPages"
        class="elevation-1"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.id }}</td>
          <td class="text-xs-left">{{ props.item.page_id }}</td>
          <td class="text-xs-left">{{ props.item.type }}</td>
          <td class="text-xs-left">{{ props.item.link }}</td>
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
  FETCH_KCP_PAGES,
  FETCH_LIST_ENVIRONMENTS_PAGES,
  FETCH_ENVIRONMENT,
  NEW_ENVIRONMENT,
  DELETE_ENVIRONMENT,
  UPDATE_ENVIRONMENT
} from "@/store/actions.type";

export default {
  data() {
    return {
      loading: false,
      errored: false,
      //added
      dialog: false,
      snackbar: false,
      color: "success",
      text: "",
      headers: [
        { text: "Id", value: "id" },
        { text: "Id страницы", value: "page_id" },
        { text: "Тип", value: "type" },
        { text: "Ссылка", value: "link" },
        { text: "Действия", value: "actions" }
      ],
      editedIndex: -1,
      editedItem: {
        id: 0,
        page_id: 0,
        type: 1,
        link: ""
      },
      defaultItem: {
        id: 0,
        page_id: 0,
        type: 1,
        link: ""
      }
    };
  },
  mounted() {
    this.fetchEnvironment();
  },
  methods: {
    fetchEnvironment() {
      this.$store.dispatch(FETCH_LIST_ENVIRONMENTS_PAGES);
      this.$store.dispatch(FETCH_KCP_PAGES);
    },

    editItem(item) {
      this.editedIndex = this.environment.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      const index = this.environment.indexOf(item);
      const id = item.id;
      try {
        (await confirm("Действительно хотите удалить элемент с ID: " + id)) &&
          this.$store.dispatch(DELETE_ENVIRONMENT, { id }).then(() => {
            this.environment.splice(index, 1);
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

    async save(item) {
      if (this.editedIndex > -1) {
        try {
          await this.$store.dispatch(UPDATE_ENVIRONMENT, item);
          Object.assign(this.environment[this.editedIndex], item);
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
        try {
          await this.$store
            .dispatch(NEW_ENVIRONMENT, {
              page_id: this.editedItem.page_id,
              type: this.editedItem.type,
              link: this.editedItem.link
            })
            .then(responce => {
              this.editedItem.id = responce.data.insertId;
            });
          this.environment.push(this.editedItem);
          this.color = "success";
          this.text = "Данные успешно изменены";
          this.snackbar = true;
        } catch {
          this.color = "error";
          this.text = "Произошла ошибка при изменении данных";
          this.snackbar = true;
        }
      }
      this.close();
    }
  },
  computed: {
    ...mapGetters(["kcpPages", "environment", "listEnvironmentPages"]),

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

