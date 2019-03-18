<template>
  <v-app>
    <h1>Добавление новых кабинетов</h1>
    <section v-if="errored">
      <p>Приносим извинения, произошла ошибка. Пожалуйста, повторите позднее</p>
    </section>
    <section v-else>
      <div v-if="loading">Загрузка...</div>
      <v-toolbar flat color="white">
        <v-toolbar-title>Кабинеты</v-toolbar-title>
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
                      :items="eduAccred"
                      item-value="id"
                      v-model="editedItem.edu_id"
                      label="Выбор образовательной программы"
                    >
                      <template
                        slot="selection"
                        slot-scope="data"
                      >{{data.item.id}} - {{ data.item.eduCode}} - {{ data.item.eduName }}</template>
                      <template
                        slot="item"
                        slot-scope="data"
                      >{{data.item.id}} - {{ data.item.eduCode}} - {{ data.item.eduName }}</template>
                    </v-select>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-select
                      :items="cabinets"
                      item-value="id"
                      v-model="editedItem.cabinet_id"
                      label="Выбор кабинета"
                    >
                      <template
                        slot="selection"
                        slot-scope="data"
                      >{{data.item.id}} - {{ data.item.name}}</template>
                      <template slot="item" slot-scope="data">{{data.item.id}} - {{ data.item.name}}</template>
                    </v-select>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="editedItem.name" label="Название"></v-text-field>
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
      <v-data-table :headers="headers" :items="eduCabinets" class="elevation-1" hide-actions>
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.id }}</td>
          <td class="text-xs-left">{{ props.item.edu_id }}</td>
          <td class="text-xs-left">{{ props.item.cabinet_id }}</td>
          <td class="text-xs-left">{{ props.item.name }}</td>
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
  FETCH_EDUCABINETS,
  NEW_EDUCABINETS,
  DELETE_EDUCABINETS,
  UPDATE_EDUCABINETS,
  // for dialog (list)
  FETCH_CABINETS,
  FETCH_EDUACCRED
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
        { text: "Id программы", value: "edu_id" },
        {
          text: "ID кабинета",
          value: "cabinet_id"
        },
        {
          text: "Название",
          value: "name"
        },
        { text: "Действия", value: "actions" }
      ],
      editedIndex: -1,
      editedItem: {
        id: 0,
        edu_id: "",
        cabinet_id: "",
        name: ""
      },
      defaultItem: {
        id: 0,
        edu_id: "",
        cabinet_id: "",
        name: ""
      }
    };
  },
  mounted() {
    this.fetchEduCabinets();
  },
  methods: {
    fetchEduCabinets() {
      this.$store.dispatch(FETCH_EDUCABINETS);
      this.$store.dispatch(FETCH_CABINETS);
      this.$store.dispatch(FETCH_EDUACCRED);
    },

    editItem(item) {
      this.editedIndex = this.eduCabinets.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      const index = this.eduCabinets.indexOf(item);
      const id = item.id;
      try {
        (await confirm("Действительно хотите удалить элемент с ID: " + id)) &&
          this.$store.dispatch(DELETE_EDUCABINETS, { id }).then(() => {
            this.eduCabinets.splice(index, 1);
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
          await this.$store.dispatch(UPDATE_EDUCABINETS, this.editedItem);
          Object.assign(this.eduCabinets[this.editedIndex], this.editedItem);
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
            .dispatch(NEW_EDUCABINETS, this.editedItem)
            .then(responce => {
              this.editedItem.id = responce.data.insertId;
            });
          this.eduCabinets.push(this.editedItem);
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
    ...mapGetters(["eduCabinets", "eduAccred", "cabinets"]),

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

