<template>
  <v-app>
    <h1>Сведения о доступе к электронной информационно-образовательной среде</h1>
    <v-expansion-panel>
      <v-expansion-panel-content>
        <template v-slot:header>
          <div>Помощь</div>
        </template>
        <v-card>
          <v-card-text>На странице можно добавить информацию в раздел "Материально-техническое обеспечение" в подраздел "Сведения о доступе к электронной информационно-образовательной среде, информационным системам и информационно-телекоммуникационным сетям и электронным ресурсам, к которым обеспечивается доступ обучающихся".</v-card-text>
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
                    <v-textarea v-model="editedItem.name" label="Название"></v-textarea>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="editedItem.quantity" label="Количество"></v-text-field>
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
      <v-data-table :headers="headers" :items="purposeEios" class="elevation-1" hide-actions>
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.id }}</td>
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.quantity }}</td>
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
  FETCH_PURPOSEEIOS,
  NEW_PURPOSEEIOS,
  DELETE_PURPOSEEIOS,
  UPDATE_PURPOSEEIOS
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
        { text: "Название", value: "name" },
        {
          text: "Количество",
          value: "area"
        },
        { text: "Действия", value: "actions" }
      ],
      editedIndex: -1,
      editedItem: {
        id: 0,
        name: "",
        quantity: ""
      },
      defaultItem: {
        id: 0,
        name: "",
        quantity: ""
      }
    };
  },
  mounted() {
    this.fetchPurposeEios();
  },
  methods: {
    fetchPurposeEios() {
      this.$store.dispatch(FETCH_PURPOSEEIOS);
    },

    editItem(item) {
      this.editedIndex = this.purposeEios.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      const index = this.purposeEios.indexOf(item);
      const id = item.id;
      try {
        (await confirm("Действительно хотите удалить элемент с ID: " + id)) &&
          this.$store.dispatch(DELETE_PURPOSEEIOS, { id }).then(() => {
            this.purposeEios.splice(index, 1);
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
          await this.$store.dispatch(UPDATE_PURPOSEEIOS, this.editedItem);
          Object.assign(this.purposeEios[this.editedIndex], this.editedItem);
          this.editedIndex = -1;
          this.runSnackbar("success", this.successUpdateMessage);
        } catch {
          this.runSnackbar("error", this.errorUpdateMessage);
        }
      } else {
        try {
          await this.$store
            .dispatch(NEW_PURPOSEEIOS, this.editedItem)
            .then(response => {
              this.editedItem.id = response.data.insertId;
            });
          this.purposeEios.push(this.editedItem);
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
      "purposeEios",
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

