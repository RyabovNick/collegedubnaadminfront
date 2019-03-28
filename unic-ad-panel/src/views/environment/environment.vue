<template>
  <v-app>
    <h1>Доступная среда</h1>
    <p class="text-xs-left">
      <b>Добавляемые файлы могут делиться на несколько типов:</b>
    </p>
    <ol>
      <li class="text-xs-left">
        Ссылка на сайте колледжа (Внутренние ссылки): необходимо выбрать 1 тип
        указать ссылку в таком виде /speciality - будет вести на раздел о
        профессиях или /environment/virtual_test ведёт на подраздел виртуальные
        тесты в разделе доступная среда
      </li>
      <li class="text-xs-left">
        Ссылка на внешний ресурс (Внешняя ссылка): необходимо выбрать 2 тип и
        указать полную ссылку - http://мой-ориентир.рф/ (например)
      </li>
      <li class="text-xs-left">Изображения?? Пока не используется</li>
      <li class="text-xs-left">
        Для добавления ссылки на файл необходимо выбрать 4 тип: Локальные файлы и
        указать ссылку также, как в 1 типе, только с добавлением названия файла и расширения
        /environment/availability/responsible.pdf - например.
      </li>
    </ol>
    <section v-if="errored">
      <p>Приносим извинения, произошла ошибка. Пожалуйста, повторите позднее</p>
    </section>
    <section v-else>
      <div v-if="loading">Загрузка...</div>
      <v-toolbar flat color="white">
        <v-toolbar-title>CRUD ENVIRONMENT</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
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
                    <v-select
                      :items="kcpTypes"
                      item-value="id"
                      v-model="editedItem.type"
                      label="Выберите тип"
                    >
                      <template
                        slot="selection"
                        slot-scope="data"
                      >{{ data.item.type_ru}} - {{ data.item.type }}</template>
                      <template
                        slot="item"
                        slot-scope="data"
                      >{{ data.item.type_ru}} - {{data.item.type }}</template>
                    </v-select>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="editedItem.link" label="Ссылка"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="editedItem.link_name"
                      label="Название ссылки (будет отображать на кнопке перехода)"
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
      <v-data-table
        :headers="headers"
        :items="listEnvironmentPages"
        :search="search"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.id }}</td>
          <td class="text-xs-left">{{ props.item.page_id }}</td>
          <td class="text-xs-left">{{ props.item.type }}</td>
          <td class="text-xs-left">{{ props.item.link }}</td>
          <td class="text-xs-left">{{ props.item.link_name }}</td>
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
  FETCH_KCP_TYPES,
  FETCH_LIST_ENVIRONMENTS_PAGES,
  FETCH_ENVIRONMENT,
  NEW_ENVIRONMENT,
  DELETE_ENVIRONMENT,
  UPDATE_ENVIRONMENT
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
      snackbar: false,
      color: "success",
      text: "",
      search: "",
      headers: [
        { text: "Id", value: "id" },
        { text: "Id страницы", value: "page_id" },
        { text: "Тип", value: "type" },
        { text: "Ссылка", value: "link" },
        { text: "Название ссылки", value: "link_name" },
        { text: "Действия", value: "actions" }
      ],
      editedIndex: -1,
      editedItem: {
        id: 0,
        link: "",
        page_id: 0,
        type: 1,
        link_name: ""
      },
      defaultItem: {
        id: 0,
        link: "",
        page_id: 0,
        type: 1,
        link_name: ""
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
      this.$store.dispatch(FETCH_KCP_TYPES);
    },

    editItem(item) {
      this.editedIndex = this.listEnvironmentPages.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      const index = this.listEnvironmentPages.indexOf(item);
      const id = item.id;
      try {
        (await confirm("Действительно хотите удалить элемент с ID: " + id)) &&
          this.$store.dispatch(DELETE_ENVIRONMENT, { id }).then(() => {
            this.listEnvironmentPages.splice(index, 1);
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
      if (this.editedIndex > -1) {
        try {
          await this.$store
            .dispatch(UPDATE_ENVIRONMENT, {
              id: this.editedItem.id,
              page_id: this.editedItem.page_id,
              type: this.editedItem.type,
              link: this.editedItem.link,
              name: this.editedItem.link_name
            })
            .then(() => {
              Object.assign(this.listEnvironmentPages[this.editedIndex], item);
              this.editedIndex = -1;
              this.runSnackbar("success", this.successUpdateMessage);
            });
        } catch {
          this.runSnackbar("error", this.errorUpdateMessage);
        }
      } else {
        try {
          await this.$store
            .dispatch(NEW_ENVIRONMENT, {
              page_id: this.editedItem.page_id,
              type: this.editedItem.type,
              link: this.editedItem.link,
              name: this.editedItem.link_name
            })
            .then(response => {
              this.editedItem.id = response.data.insertId;
              this.listEnvironmentPages.push(this.editedItem);
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
      "kcpTypes",
      "kcpPages",
      "environment",
      "listEnvironmentPages",
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

