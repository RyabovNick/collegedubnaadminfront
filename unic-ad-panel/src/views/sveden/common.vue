<template>
  <v-app>
    <h1>Основные сведения</h1>
    <section v-if="errored">
      <p>Приносим извинения, произошла ошибка. Пожалуйста, повторите позднее</p>
    </section>
    <section v-else>
      <div v-if="loading">Загрузка...</div>
      <v-toolbar flat color="white">
        <v-toolbar-title>CRUD common</v-toolbar-title>
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
      <v-data-table :headers="headers" :items="common" class="elevation-1" hide-actions>
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
    </section>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import {
  FETCH_COMMON,
  NEW_COMMON,
  DELETE_COMMON,
  UPDATE_COMMON
} from "@/store/actions.type";

export default {
  data() {
    return {
      loading: false,
      errored: false,
      //added
      dialog: false,
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
    this.fetchCommon();
  },
  methods: {
    fetchCommon() {
      this.$store.dispatch(FETCH_COMMON);
    },

    editItem(item) {
      this.editedIndex = this.common.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.common.indexOf(item);
      const id = item.id;
      confirm("Действительно хотите удалить элемент с ID: " + id) &&
        this.$store.dispatch(DELETE_COMMON, { id }).then(() => {
          this.common.splice(index, 1);
        });
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save(item) {
      const id = item.id;
      const name = item.name;
      const tag = item.tag;
      const value = item.value;
      if (this.editedIndex > -1) {
        this.$store.dispatch(UPDATE_COMMON, { id, name, tag, value });
        Object.assign(this.common[this.editedIndex], item);
        this.editedIndex = -1;
      } else {
        this.$store
          .dispatch(NEW_COMMON, { name, tag, value })
          .then(response => {
            this.editedItem.id = response.data.insertId;
          });
        this.common.push(this.editedItem);
      }
      this.close();
    }
  },
  computed: {
    ...mapGetters(["common"]),

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

