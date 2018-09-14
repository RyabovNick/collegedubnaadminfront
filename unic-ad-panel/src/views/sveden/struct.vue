<template>
    <v-app>
        <h1>Структура и органы управления образовательной организацией</h1>
        <section v-if="errored">
            <p>Приносим извинения, произошла ошибка. Пожалуйста, повторите позднее</p>
        </section>
        <section v-else>
            <div v-if="loading">Загрузка...</div>
            <v-toolbar flat color="white">
              <v-toolbar-title>CRUD STRUCT</v-toolbar-title>
              <v-divider
                class="mx-2"
                inset
                vertical
              ></v-divider>
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
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.fio" label="ФИО"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.position" label="Должность"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.addressStr" label="Адрес"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.site" label="Сайт"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.email" label="Почта"></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="close">Отмена</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="save(editedItem)">
                      Сохранить</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="struct"
                class="elevation-1"
                hide-actions
            >
                <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.id }}</td>
                <td class="text-xs-left">{{ props.item.fio }}</td>
                <td class="text-xs-left">{{ props.item.position }}</td>
                <td class="text-xs-left">{{ props.item.addressStr }}</td>
                <td class="text-xs-left">{{ props.item.site }}</td>
                <td class="text-xs-left">{{ props.item.email }}</td>
                <td class="justify-center layout px-0">
                  <v-icon
                    small
                    class="mr-2"
                    @click="editItem(props.item)"
                  >
                    edit
                  </v-icon>
                  <v-icon
                    small
                    @click="deleteItem(props.item)"
                  >
                    delete
                  </v-icon>
                </td>
                </template>
            </v-data-table>
        </section>
    </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import {
  FETCH_STRUCT,
  NEW_STRUCT,
  DELETE_STRUCT,
  UPDATE_STRUCT
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
        { text: "ФИО", value: "fio" },
        { text: "Должность", value: "position" },
        { text: "Адрес", value: "addressStr" },
        { text: "Сайт", value: "site" },
        { text: "Почта", value: "email" },
        { text: "Действия", value: "actions" }
      ],
      editedIndex: -1,
      editedItem: {
        id: 0,
        fio: "",
        position: "",
        addressStr: "",
        site: "",
        email: ""
      },
      defaultItem: {
        id: 0,
        fio: "",
        position: "",
        addressStr: "",
        site: "",
        email: ""
      }
    };
  },
  mounted() {
    this.fetchStruct();
  },
  methods: {
    fetchStruct() {
      this.$store.dispatch(FETCH_STRUCT);
    },

    editItem(item) {
      this.editedIndex = this.struct.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.struct.indexOf(item);
      const id = item.id;
      confirm("Действительно хотите удалить элемент с ID: " + id) &&
        this.$store.dispatch(DELETE_STRUCT, { id }).then(() => {
          this.struct.splice(index, 1);
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
      const fio = item.fio;
      const position = item.position;
      const addressStr = item.addressStr;
      const site = item.site;
      const email = item.email;

      if (this.editedIndex > -1) {
        this.$store.dispatch(UPDATE_STRUCT, {
          id,
          fio,
          position,
          addressStr,
          site,
          email
        });
        Object.assign(this.struct[this.editedIndex], item);
        this.editedIndex = -1;
      } else {
        this.$store
          .dispatch(NEW_STRUCT, { fio, position, addressStr, site, email })
          .then(responce => {
            this.editedItem.id = responce.data.insertId;
          });
        this.struct.push(this.editedItem);
      }
      this.close();
    }
  },
  computed: {
    ...mapGetters(["struct"]),

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

