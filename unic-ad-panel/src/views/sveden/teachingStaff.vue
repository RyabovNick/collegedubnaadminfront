<template>
  <v-app>
    <h1>Руководство. Педагогический состав</h1>
    <section v-if="errored">
      <p>Приносим извинения, произошла ошибка. Пожалуйста, повторите позднее</p>
    </section>
    <section v-else>
      <div v-if="loading">Загрузка...</div>
      <v-toolbar flat color="white">
        <v-toolbar-title>CRUD teachingStaff</v-toolbar-title>
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
                    <v-text-field v-model="editedItem.fio" label="ФИО"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="editedItem.post" label="Должность"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="editedItem.teachingDescipline" label="Дисциплины"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="editedItem.teachingLevel" label="Уровень образования"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="editedItem.teachingQual" label="Квалификация"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.degree" label="Ученая степень"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.academStat" label="Звание"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="editedItem.employeeQualification"
                      label="Направление подготовки"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="editedItem.profDevelopment"
                      label="Повышение квалификации"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.genExperience" label="Общий стаж работы"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="editedItem.specExperience"
                      label="Стаж работы по специальности"
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
      <v-data-table :headers="headers" :items="teachingStaff" :search="search" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.id }}</td>
          <td class="text-xs-left">{{ props.item.fio }}</td>
          <td class="text-xs-left">{{ props.item.post }}</td>
          <td class="text-xs-left">{{ props.item.teachingDescipline }}</td>
          <td class="text-xs-left">{{ props.item.teachingLevel }}</td>
          <td class="text-xs-left">{{ props.item.teachingQual }}</td>
          <td class="text-xs-left">{{ props.item.degree }}</td>
          <td class="text-xs-left">{{ props.item.academStat }}</td>
          <td class="text-xs-left">{{ props.item.employeeQualification }}</td>
          <td class="text-xs-left">{{ props.item.profDevelopment }}</td>
          <td class="text-xs-left">{{ props.item.genExperience }}</td>
          <td class="text-xs-left">{{ props.item.specExperience }}</td>
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
  FETCH_TEACHINGSTAFF,
  NEW_TEACHINGSTAFF,
  DELETE_TEACHINGSTAFF,
  UPDATE_TEACHINGSTAFF
} from "@/store/actions.type";

export default {
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
        { text: "ФИО", value: "fio" },
        { text: "Должность", value: "post" },
        { text: "Дисциплина", value: "teachingDescipline" },
        { text: "Уровень образования", value: "teachingLevel" },
        { text: "Квалификация", value: "teachingQual" },
        { text: "Ученая степень", value: "degree" },
        { text: "Звание", value: "academStat" },
        { text: "Направление подготовки", value: "employeeQualification" },
        { text: "Повышение квалификации", value: "profDevelopment" },
        { text: "Общий стаж работы", value: "genExperience" },
        { text: "Стаж работы по специальности", value: "specExperience" },
        { text: "Действия", value: "actions" }
      ],
      editedIndex: -1,
      editedItem: {
        id: 0,
        fio: "",
        post: "",
        teachingDescipline: "",
        teachingLevel: "",
        teachingQual: "",
        degree: "",
        academStat: "",
        employeeQualification: "",
        profDevelopment: "",
        genExperience: "",
        specExperience: ""
      },
      defaultItem: {
        id: 0,
        fio: "",
        post: "",
        teachingDescipline: "",
        teachingLevel: "",
        teachingQual: "",
        degree: "",
        academStat: "",
        employeeQualification: "",
        profDevelopment: "",
        genExperience: "",
        specExperience: ""
      }
    };
  },
  mounted() {
    this.fetchTeachingStaff();
  },
  methods: {
    fetchTeachingStaff() {
      this.$store.dispatch(FETCH_TEACHINGSTAFF);
    },

    editItem(item) {
      this.editedIndex = this.teachingStaff.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      const index = this.teachingStaff.indexOf(item);
      const id = item.id;
      try {
        (await confirm("Действительно хотите удалить элемент с ID: " + id)) &&
          this.$store.dispatch(DELETE_TEACHINGSTAFF, { id }).then(() => {
            this.teachingStaff.splice(index, 1);
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
          await this.$store.dispatch(UPDATE_TEACHINGSTAFF, item);
          Object.assign(this.teachingStaff[this.editedIndex], item);
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
          await this.$store.dispatch(NEW_TEACHINGSTAFF, item).then(responce => {
            this.editedItem.id = responce.data.insertId;
          });
          this.teachingStaff.push(this.editedItem);
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
    ...mapGetters(["teachingStaff"]),

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

