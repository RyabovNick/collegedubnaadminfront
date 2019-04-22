<template>
  <v-app>
    <h1>Вакантные места</h1>
    <v-expansion-panel>
      <v-expansion-panel-content>
        <template v-slot:header>
          <div>Помощь</div>
        </template>
        <v-card>
          <v-card-text>
            На странице можно добавить информацию в раздел "Вакантные места для приема (перевода)".
            <br>Справа находятся кнопки редактирования или удаления информации.
            <br>Поиск в таблице осуществляется по совпадению во всех столбцах.
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
        <v-toolbar-title>CRUD vacant</v-toolbar-title>
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
                    <v-text-field v-model="editedItem.code" label="Код"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="editedItem.name" label="Название"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="editedItem.level" label="Уровень образования"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.course" label="Курс"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.form" label="Форма обучения"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.numberBFVacant" label="Федеральный бюджет"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="editedItem.numberBRVacant"
                      label="Бюджет субъектов Российской Федерации"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.numberBMVacant" label="Местные бюджеты"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.numberPVacant" label="По договорам"></v-text-field>
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
      <v-data-table :headers="headers" :items="vacant" :search="search" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.id }}</td>
          <td class="text-xs-left">{{ props.item.code }}</td>
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.level }}</td>
          <td class="text-xs-left">{{ props.item.course }}</td>
          <td class="text-xs-left">{{ props.item.form }}</td>
          <td class="text-xs-left">{{ props.item.numberBFVacant }}</td>
          <td class="text-xs-left">{{ props.item.numberBRVacant }}</td>
          <td class="text-xs-left">{{ props.item.numberBMVacant }}</td>
          <td class="text-xs-left">{{ props.item.numberPVacant }}</td>
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
  FETCH_VACANT,
  NEW_VACANT,
  DELETE_VACANT,
  UPDATE_VACANT
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
      search: "",
      snackbar: false,
      color: "success",
      text: "",
      headers: [
        { text: "Id", value: "id" },
        { text: "Код программы", value: "code" },
        { text: "Наименование", value: "name" },
        { text: "Уровень образования", value: "level" },
        { text: "Курс", value: "course" },
        { text: "Форма обучения", value: "form" },
        {
          text: "Федеральный бюджет",
          value: "numberBFVacant"
        },
        {
          text: "Бюджет субъектов Российской Федерации",
          value: "numberBRVacant"
        },
        { text: "Местные бюджеты", value: "numberBMVacant" },
        {
          text: "По договорам",
          value: "numberPVacant"
        },
        { text: "Действия", value: "actions" }
      ],
      editedIndex: -1,
      editedItem: {
        id: 0,
        code: "",
        name: "",
        level: "",
        course: "",
        form: "",
        numberBFVacant: "",
        numberBRVacant: "",
        numberBMVacant: "",
        numberPVacant: ""
      },
      defaultItem: {
        id: 0,
        code: "",
        name: "",
        level: "",
        course: "",
        form: "",
        numberBFVacant: "",
        numberBRVacant: "",
        numberBMVacant: "",
        numberPVacant: ""
      }
    };
  },
  mounted() {
    this.fetchVacant();
  },
  methods: {
    fetchVacant() {
      this.$store.dispatch(FETCH_VACANT);
    },

    editItem(item) {
      this.editedIndex = this.vacant.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      const index = this.vacant.indexOf(item);
      const id = item.id;
      try {
        (await confirm("Действительно хотите удалить элемент с ID: " + id)) &&
          this.$store.dispatch(DELETE_VACANT, { id }).then(() => {
            this.vacant.splice(index, 1);
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
          await this.$store.dispatch(UPDATE_VACANT, item);
          Object.assign(this.vacant[this.editedIndex], item);
          this.editedIndex = -1;
          this.runSnackbar("success", this.successUpdateMessage);
        } catch {
          this.runSnackbar("error", this.errorUpdateMessage);
        }
      } else {
        try {
          await this.$store.dispatch(NEW_VACANT, item).then(response => {
            this.editedItem.id = response.data.insertId;
          });
          this.vacant.push(this.editedItem);
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
      "vacant",
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

