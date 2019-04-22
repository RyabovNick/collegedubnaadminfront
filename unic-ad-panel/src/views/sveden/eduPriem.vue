<template>
  <v-app>
    <h1>Информация о результатах приема</h1>
    <v-expansion-panel>
      <v-expansion-panel-content>
        <template v-slot:header>
          <div>Помощь</div>
        </template>
        <v-card>
          <v-card-text>
            На странице можно добавить информацию в раздел "Образование" подраздел "Информация о результатах приема".
            <br>На странице нельзя добавить новые значения - они берутся в соответствии с заполненной информацией в "Срок действия аккредитации". Строки с пустыми значениями не отображаются на странице сайта. Если в какой-то строке есть null - значит это значение не заполнено и именно в таком виде будет отображаться на сайте.
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
        <v-toolbar-title>CRUD EDUPRIEM</v-toolbar-title>
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
                      v-model="editedItem.numberBFpriem"
                      label="Численность обучающихся за счёт бюджетных ассигнований федерального бюджета"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="editedItem.numberBRpriem"
                      label="Численность обучающихся за счёт бюджетов субъектов Российской Федерации"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="editedItem.numberBMpriem"
                      label="Численность обучающихся за счёт местных бюджетов"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="editedItem.numberPpriem"
                      label="Численность обучающихся за счёт средств физических и (или) юридических лиц"
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
      <v-data-table :headers="headers" :items="eduPriem" class="elevation-1" hide-actions>
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.eduCode }}</td>
          <td class="text-xs-left">{{ props.item.eduName }}</td>
          <td class="text-xs-left">{{ props.item.numberBFpriem }}</td>
          <td class="text-xs-left">{{ props.item.numberBRpriem }}</td>
          <td class="text-xs-left">{{ props.item.numberBMpriem }}</td>
          <td class="text-xs-left">{{ props.item.numberPpriem }}</td>
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
  FETCH_EDUPRIEM,
  NEW_EDUPRIEM,
  DELETE_EDUPRIEM,
  UPDATE_EDUPRIEM
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
        { text: "Код программы", value: "id_eduCode" },
        { text: "Название программы", value: "eduName" },
        {
          text:
            "Численность обучающихся за счёт бюджетных ассигнований федерального бюджета",
          value: "numberBFpriem"
        },
        {
          text:
            "Численность обучающихся за счёт бюджетов субъектов Российской Федерации",
          value: "numberBRpriem"
        },
        {
          text: "Численность обучающихся за счёт местных бюджетов",
          value: "numberBMpriem"
        },
        {
          text:
            "Численность обучающихся за счёт средств физических и (или) юридических лиц",
          value: "numberPpriem"
        },
        { text: "Действия", value: "actions" }
      ],
      editedIndex: -1,
      editedItem: {
        id: 0,
        id_eduCode: "",
        numberBFpriem: "",
        numberBRpriem: "",
        numberBMpriem: "",
        numberPpriem: ""
      },
      defaultItem: {
        id: 0,
        id_eduCode: "",
        numberBFpriem: "",
        numberBRpriem: "",
        numberBMpriem: "",
        numberPpriem: ""
      }
    };
  },
  mounted() {
    this.fetchStruct();
  },
  methods: {
    fetchStruct() {
      this.$store.dispatch(FETCH_EDUPRIEM);
    },

    editItem(item) {
      this.editedIndex = this.eduPriem.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      const index = this.eduPriem.indexOf(item);
      const id = item.id;
      try {
        (await confirm("Действительно хотите удалить элемент с ID: " + id)) &&
          this.$store.dispatch(DELETE_EDUPRIEM, { id }).then(() => {
            this.eduPriem.splice(index, 1);
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
          await this.$store.dispatch(UPDATE_EDUPRIEM, {
            id: this.editedItem.id,
            numberBFpriem: this.editedItem.numberBFpriem,
            numberBRpriem: this.editedItem.numberBRpriem,
            numberBMpriem: this.editedItem.numberBMpriem,
            numberPpriem: this.editedItem.numberPpriem
          });
          Object.assign(this.eduPriem[this.editedIndex], {
            id: this.editedItem.id,
            numberBFpriem: this.editedItem.numberBFpriem,
            numberBRpriem: this.editedItem.numberBRpriem,
            numberBMpriem: this.editedItem.numberBMpriem,
            numberPpriem: this.editedItem.numberPpriem
          });
          this.editedIndex = -1;
          this.runSnackbar("success", this.successUpdateMessage);
        } catch {
          this.runSnackbar("error", this.errorUpdateMessage);
        }
      } else {
        try {
          await this.$store
            .dispatch(NEW_EDUPRIEM, {
              id_eduCode: this.editedItem.id_eduCode,
              numberBFpriem: this.editedItem.numberBFpriem,
              numberBRpriem: this.editedItem.numberBRpriem,
              numberBMpriem: this.editedItem.numberBMpriem,
              numberPpriem: this.editedItem.numberPpriem
            })
            .then(response => {
              this.editedItem.id = response.data.insertId;
            });
          Object.assign(this.eduPriem[this.editedIndex], {
            numberBFpriem: this.editedItem.numberBFpriem,
            numberBRpriem: this.editedItem.numberBRpriem,
            numberBMpriem: this.editedItem.numberBMpriem,
            numberPpriem: this.editedItem.numberPpriem
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
      "eduPriem",
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

