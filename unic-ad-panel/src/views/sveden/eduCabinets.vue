<template>
  <v-app>
    <h1>Привязать кабинет к программе</h1>
    <v-expansion-panel>
      <v-expansion-panel-content>
        <template v-slot:header>
          <div>Помощь</div>
        </template>
        <v-card>
          <v-card-text>
            На странице можно добавить информацию в раздел "Материально-техническое обеспечение" в подраздел "Наличие оборудованных учебных кабинетов, объектов для проведения практических занятий".
            <br>Для добавления в этот подраздел используется 2 страницы в админке: "Добавление новых кабинето" и "Привязать кабинет к программе".
            <br>На данной страницы необходимо привязать добавленный кабинет к необходимой образовательной программе.
            <br>Для добавления новых программ используется раздел "Срок действия аккредитации".
            <br>Для добавления новых кабинетов используется раздел "Материально-техническое обеспечение (Кабинеты)".
            <br>При нажатии на кнопку "Добавить" или "Изменить" будет удобная форма, с выбором из существующих программ и кабинетов.
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
      <v-data-table :headers="headers" :items="eduCabinets" class="elevation-1">
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
          await this.$store.dispatch(UPDATE_EDUCABINETS, this.editedItem);
          Object.assign(this.eduCabinets[this.editedIndex], this.editedItem);
          this.editedIndex = -1;
          this.runSnackbar("success", this.successUpdateMessage);
        } catch {
          this.runSnackbar("error", this.errorUpdateMessage);
        }
      } else {
        try {
          await this.$store
            .dispatch(NEW_EDUCABINETS, this.editedItem)
            .then(response => {
              this.editedItem.id = response.data.insertId;
            });
          this.eduCabinets.push(this.editedItem);
          this.runSnackbar("success", this.successInsertMessage);
        } catch {
          this.runSnackbar("error", this.errorInsertMessage);
        }
      }
      this.close();
    }
  },
  computed: {
    ...mapGetters([
      "eduCabinets",
      "eduAccred",
      "cabinets",
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

