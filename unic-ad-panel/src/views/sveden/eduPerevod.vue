<template>
  <v-app>
    <h1>Информация о результатах перевода, восстановления и отчисления</h1>
    <p>
      Строки с пустыми значениями не отображаются на основной странице.
      Если в какой-то строке есть null, то значит значение не заполнено
      (так и будет видно на основной странице)
    </p>
    <section v-if="errored">
      <p>Приносим извинения, произошла ошибка. Пожалуйста, повторите позднее</p>
    </section>
    <section v-else>
      <div v-if="loading">Загрузка...</div>
      <v-toolbar flat color="white">
        <v-toolbar-title>CRUD EDUPEREVOD</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="800px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="editedItem.numberOutPerevod"
                      label="Численность обучающихся, переведенных в другие образовательные организации"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="editedItem.numberToPerevod"
                      label="Численность обучающихся, переведенных из других образовательных организаций"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="editedItem.numberResPerevod"
                      label="Численность восстановленных обучающихся"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="editedItem.numberExpPerevod"
                      label="Численность отчисленных обучающихся"
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
      <v-data-table :headers="headers" :items="eduPerevod" class="elevation-1" hide-actions>
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.eduCode }}</td>
          <td class="text-xs-left">{{ props.item.eduName }}</td>
          <td class="text-xs-left">{{ props.item.numberOutPerevod }}</td>
          <td class="text-xs-left">{{ props.item.numberToPerevod }}</td>
          <td class="text-xs-left">{{ props.item.numberResPerevod }}</td>
          <td class="text-xs-left">{{ props.item.numberExpPerevod }}</td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon v-if="props.item.id !== null" small @click="deleteItem(props.item)">delete</v-icon>
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
  FETCH_EDUPEREVOD,
  NEW_EDUPEREVOD,
  DELETE_EDUPEREVOD,
  UPDATE_EDUPEREVOD
} from "@/store/actions.type";
import snackbar from "@/common/snackbar.js";

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
        { text: "Код программы", value: "id_eduCode" },
        { text: "Название программы", value: "eduName" },
        {
          text:
            "Численность обучающихся, переведенных в другие образовательные организации",
          value: "numberBFpriem"
        },
        {
          text:
            "Численность обучающихся, переведенных из других образовательных организаций",
          value: "numberBRpriem"
        },
        {
          text: "Численность восстановленных обучающихся",
          value: "numberBMpriem"
        },
        {
          text: "Численность отчисленных обучающихся",
          value: "numberPpriem"
        },
        { text: "Действия", value: "actions" }
      ],
      editedIndex: -1,
      editedItem: {
        id: 0,
        id_eduCode: "",
        numberOutPerevod: "",
        numberToPerevod: "",
        numberResPerevod: "",
        numberExpPerevod: ""
      },
      defaultItem: {
        id: 0,
        id_eduCode: "",
        numberOutPerevod: "",
        numberToPerevod: "",
        numberResPerevod: "",
        numberExpPerevod: ""
      }
    };
  },
  mounted() {
    this.fetchStruct();
  },
  methods: {
    fetchStruct() {
      this.$store.dispatch(FETCH_EDUPEREVOD);
    },

    editItem(item) {
      this.editedIndex = this.eduPerevod.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      const index = this.eduPerevod.indexOf(item);
      const id = item.id;
      try {
        (await confirm("Действительно хотите удалить элемент с ID: " + id)) &&
          this.$store.dispatch(DELETE_EDUPEREVOD, { id }).then(() => {
            this.eduPerevod.splice(index, 1);
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
      if (this.editedItem.id !== null) {
        try {
          await this.$store.dispatch(UPDATE_EDUPEREVOD, {
            id: this.editedItem.id,
            numberOutPerevod: this.editedItem.numberOutPerevod,
            numberToPerevod: this.editedItem.numberToPerevod,
            numberResPerevod: this.editedItem.numberResPerevod,
            numberExpPerevod: this.editedItem.numberExpPerevod
          });
          Object.assign(this.eduPerevod[this.editedIndex], {
            id: this.editedItem.id,
            numberOutPerevod: this.editedItem.numberOutPerevod,
            numberToPerevod: this.editedItem.numberToPerevod,
            numberResPerevod: this.editedItem.numberResPerevod,
            numberExpPerevod: this.editedItem.numberExpPerevod
          });
          this.editedIndex = -1;
          this.runSnackbar("success", this.successUpdateMessage);
        } catch {
          this.runSnackbar("error", this.errorUpdateMessage);
        }
      } else {
        try {
          await this.$store
            .dispatch(NEW_EDUPEREVOD, {
              id_eduCode: this.editedItem.id_eduCode,
              numberOutPerevod: this.editedItem.numberOutPerevod,
              numberToPerevod: this.editedItem.numberToPerevod,
              numberResPerevod: this.editedItem.numberResPerevod,
              numberExpPerevod: this.editedItem.numberExpPerevod
            })
            .then(response => {
              this.editedItem.id = response.data.insertId;
            });
          Object.assign(this.eduPerevod[this.editedIndex], {
            numberOutPerevod: this.editedItem.numberOutPerevod,
            numberToPerevod: this.editedItem.numberToPerevod,
            numberResPerevod: this.editedItem.numberResPerevod,
            numberExpPerevod: this.editedItem.numberExpPerevod
          });
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
      "eduPerevod",
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

