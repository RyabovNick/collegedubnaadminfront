<template>
  <v-app>
    <h1>Информация о численности обучающихся по реализуемым образовательным программам</h1>
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
        <v-toolbar-title>CRUD EDUCHISLEN</v-toolbar-title>
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
      <v-data-table :headers="headers" :items="eduChislen" class="elevation-1" hide-actions>
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
  FETCH_EDUCHISLEN,
  NEW_EDUCHISLEN,
  DELETE_EDUCHISLEN,
  UPDATE_EDUCHISLEN
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
      this.$store.dispatch(FETCH_EDUCHISLEN);
    },

    editItem(item) {
      this.editedIndex = this.eduChislen.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      const index = this.eduChislen.indexOf(item);
      const id = item.id;
      try {
        (await confirm("Действительно хотите удалить элемент с ID: " + id)) &&
          this.$store.dispatch(DELETE_EDUCHISLEN, { id }).then(() => {
            this.eduChislen.splice(index, 1);
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
      if (this.editedItem.id !== null) {
        try {
          await this.$store.dispatch(UPDATE_EDUCHISLEN, {
            id: this.editedItem.id,
            numberBFpriem: this.editedItem.numberBFpriem,
            numberBRpriem: this.editedItem.numberBRpriem,
            numberBMpriem: this.editedItem.numberBMpriem,
            numberPpriem: this.editedItem.numberPpriem
          });
          Object.assign(this.eduChislen[this.editedIndex], {
            id: this.editedItem.id,
            numberBFpriem: this.editedItem.numberBFpriem,
            numberBRpriem: this.editedItem.numberBRpriem,
            numberBMpriem: this.editedItem.numberBMpriem,
            numberPpriem: this.editedItem.numberPpriem
          });
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
            .dispatch(NEW_EDUCHISLEN, {
              id_eduCode: this.editedItem.id_eduCode,
              numberBFpriem: this.editedItem.numberBFpriem,
              numberBRpriem: this.editedItem.numberBRpriem,
              numberBMpriem: this.editedItem.numberBMpriem,
              numberPpriem: this.editedItem.numberPpriem
            })
            .then(responce => {
              this.editedItem.id = responce.data.insertId;
            });
          Object.assign(this.eduChislen[this.editedIndex], {
            numberBFpriem: this.editedItem.numberBFpriem,
            numberBRpriem: this.editedItem.numberBRpriem,
            numberBMpriem: this.editedItem.numberBMpriem,
            numberPpriem: this.editedItem.numberPpriem
          });
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
    ...mapGetters(["eduChislen"]),

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

