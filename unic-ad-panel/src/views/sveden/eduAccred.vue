<style>
table.v-table thead th {
  white-space: initial;
}
</style>

<template>
  <v-app>
    <h1>Срок действия аккредитации</h1>
    <p>
      На этой странице можно добавить образовательные программы и указать
      в каких годах действует. Удалить года можно в разделе образование
    </p>
    <section v-if="errored">
      <p>Приносим извинения, произошла ошибка. Пожалуйста, повторите позднее</p>
    </section>
    <section v-else>
      <div v-if="loading">Загрузка...</div>
      <v-toolbar flat color="white">
        <v-toolbar-title>CRUD EDUACCRED</v-toolbar-title>
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
                    <v-text-field v-model="editedItem.eduCode" label="Код программы"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="editedItem.eduName" label="Название программы"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field v-model="editedItem.eduLevel" label="Уровень образования"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field v-model="editedItem.eduForm" label="Форма обучения"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="editedItem.learningTerm"
                      label="Информация о нормативных сроках обучения"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="editedItem.language"
                      label="Языки, на которых осуществляется обучение"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="editedItem.dateEnd"
                      label="Срок действия государственной аккредитации"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6 sm4 md2>
                    <v-checkbox
                      v-for="i in 5"
                      :key="i"
                      v-model="editedItem.years"
                      :label="String(yearNow - i + 1)"
                      :value="yearNow - i + 1"
                    ></v-checkbox>
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
      <v-data-table :headers="headers" :items="eduAccred" class="elevation-2" expand>
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.id }}</td>
          <td class="text-xs-left">{{ props.item.eduCode }}</td>
          <td class="text-xs-left">{{ props.item.eduName }}</td>
          <td class="text-xs-left">{{ props.item.eduLevel }}</td>
          <td class="text-xs-left">{{ props.item.eduForm }}</td>
          <td class="text-xs-left">{{ props.item.learningTerm }}</td>
          <td class="text-xs-left">{{ props.item.language }}</td>
          <td class="text-xs-left">{{ props.item.dateEnd }}</td>
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
  FETCH_EDUACCRED,
  NEW_EDUACCRED,
  DELETE_EDUACCRED,
  UPDATE_EDUACCRED
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
      selected: [],
      yearNow: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 4),
      color: "success",
      text: "",
      headers: [
        { text: "Id", value: "id" },
        { text: "Код программы", value: "eduCode" },
        { text: "Название программы", value: "eduName" },
        { text: "Уровень образования", value: "eduLevel" },
        { text: "Форма обучения", value: "eduForm" },
        {
          text: "Информация о нормативных сроках обучения",
          value: "learningTerm"
        },
        {
          text: "Языки, на которых осуществляется обучение",
          value: "language"
        },
        {
          text: "Срок действия государственной аккредитации",
          value: "dateEnd"
        },
        { text: "Действия", value: "actions" }
      ],
      editedIndex: -1,
      editedItem: {
        id: 0,
        eduCode: "",
        eduName: "",
        eduLevel: "",
        eduForm: "",
        learningTerm: "",
        language: "",
        dateEnd: "",
        years: []
      },
      defaultItem: {
        id: 0,
        eduCode: "",
        eduName: "",
        eduLevel: "",
        eduForm: "",
        learningTerm: "",
        language: "",
        dateEnd: "",
        years: []
      }
    };
  },
  mounted() {
    this.fetchEduAccred();
  },
  methods: {
    fetchEduAccred() {
      this.$store.dispatch(FETCH_EDUACCRED);
    },

    editItem(item) {
      this.editedIndex = this.eduAccred.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      const index = this.eduAccred.indexOf(item);
      const id = item.id;
      try {
        (await confirm("Действительно хотите удалить элемент с ID: " + id)) &&
          this.$store.dispatch(DELETE_EDUACCRED, { id }).then(() => {
            this.eduAccred.splice(index, 1);

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
            .dispatch(UPDATE_EDUACCRED, {
              id: this.editedItem.id,
              eduCode: this.editedItem.eduCode,
              eduName: this.editedItem.eduName,
              eduLevel: this.editedItem.eduLevel,
              eduForm: this.editedItem.eduForm,
              learningTerm: this.editedItem.learningTerm,
              language: this.editedItem.language,
              dateEnd: this.editedItem.dateEnd
            })
            .then(() => {
              Object.assign(this.eduAccred[this.editedIndex], {
                id: this.editedItem.id,
                eduCode: this.editedItem.eduCode,
                eduName: this.editedItem.eduName,
                eduLevel: this.editedItem.eduLevel,
                eduForm: this.editedItem.eduForm,
                learningTerm: this.editedItem.learningTerm,
                language: this.editedItem.language,
                dateEnd: this.editedItem.dateEnd
              });
              this.editedIndex = -1;
              this.runSnackbar("success", this.successUpdateMessage);
            });
        } catch {
          this.runSnackbar("error", this.errorUpdateMessage);
        }
      } else {
        try {
          await this.$store.dispatch(NEW_EDUACCRED, item).then(response => {
            this.editedItem.id = response.data.insertId;
            this.eduAccred.push(this.editedItem);
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
      "eduAccred",
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

