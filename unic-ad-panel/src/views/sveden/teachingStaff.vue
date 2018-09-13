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
                          <v-text-field v-model="editedItem.teachingDescipline" label="Дисциплины"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.teachingLevel" label="Уровень образования"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.teachingQual" label="Квалификация"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.degree" label="Ученая степень"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.academStat" label="Звание"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.employeeQualification" label="Направление подготовки"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.profDevelopment" label="Повышение квалификации"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.genExperience" label="Общий стаж работы"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.specExperience" label="Стаж работы по специальности"></v-text-field>
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
                :items="teachingStaff"
                class="elevation-1"
                hide-actions
            >
                <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.id }}</td>
                <td class="text-xs-left">{{ props.item.fio }}</td>
                <td class="text-xs-left">{{ props.item.position }}</td>
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
      headers: [
        { text: "Id", value: "id" },
        { text: "ФИО", value: "fio" },
        { text: "Должность", value: "position" },
        { text: "Дисциплина", value: "teachingDescipline" },
        { text: "Уровень образования", value: "teachingLevel" },
        { text: "Квалификация", value: "teachingQual" },
        { text: "Ученая степень", value: "degree" },
        { text: "Звание", value: "academStat" },
        { text: "Направление подготовки", value: "employeeQualification" },
        { text: "Повышение квалификации", value: "profDevelopment" },
        { text: "Общий стаж работы", value: "genExperience" },
        { text: "Стаж работы по специальности", value: "specExperience" }
      ],
      editedIndex: -1,
      editedItem: {
        id: 0,
        fio: "",
        position: "",
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
        position: "",
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

    deleteItem(item) {
      const index = this.teachingStaff.indexOf(item);
      const id = item.id;
      confirm("Действительно хотите удалить элемент с ID: " + id) &&
        this.$store.dispatch(DELETE_TEACHINGSTAFF, { id }).then(() => {
          this.teachingStaff.splice(index, 1);
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
      const teachingDescipline = item.teachingDescipline;
      const teachingLevel = item.teachingLevel;
      const teachingQual = item.teachingQual;
      const degree = item.degree;
      const academStat = item.academStat;
      const employeeQualification = item.employeeQualification;
      const profDevelopment = item.profDevelopment;
      const genExperience = item.genExperience;
      const specExperience = item.specExperience;
      if (this.editedIndex > -1) {
        this.$store.dispatch(UPDATE_TEACHINGSTAFF, {
          id,
          fio,
          position,
          teachingDescipline,
          teachingLevel,
          teachingQual,
          degree,
          academStat,
          employeeQualification,
          profDevelopment,
          genExperience,
          specExperience
        });
        Object.assign(this.teachingStaff[this.editedIndex], item);
        this.editedIndex = -1;
      } else {
        this.$store
          .dispatch(NEW_TEACHINGSTAFF, {
            fio,
            position,
            teachingDescipline,
            teachingLevel,
            teachingQual,
            degree,
            academStat,
            employeeQualification,
            profDevelopment,
            genExperience,
            specExperience
          })
          .then(responce => {
            this.editedItem.id = responce.data.insertId;
          });
        this.teachingStaff.push(this.editedItem);
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

