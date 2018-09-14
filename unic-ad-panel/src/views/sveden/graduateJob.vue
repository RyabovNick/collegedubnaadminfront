<template>
    <v-app>
        <h1>Трудойстройство выпускников</h1>
        <section v-if="errored">
            <p>Приносим извинения, произошла ошибка. Пожалуйста, повторите позднее</p>
        </section>
        <section v-else>
            <div v-if="loading">Загрузка...</div>
            <v-toolbar flat color="white">
              <v-toolbar-title>CRUD graduateJob</v-toolbar-title>
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
                          <v-text-field v-model="editedItem.code" label="Код"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.year" label="Год"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.name" label="Специальность"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.count_graduate" label="Выпускников"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.count_work_graduate" label="Трудоустроенных"></v-text-field>
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
                :items="graduateJob"
                class="elevation-1"
                hide-actions
            >
                <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.id }}</td>
                <td class="text-xs-left">{{ props.item.code }}</td>
                <td class="text-xs-left">{{ props.item.year }}</td>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.count_graduate }}</td>
                <td class="text-xs-left">{{ props.item.count_work_graduate }}</td>
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
  FETCH_GRANTSGJ,
  NEW_GRANTSGJ,
  DELETE_GRANTSGJ,
  UPDATE_GRANTSGJ
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
        { text: "Код", value: "code" },
        { text: "Год", value: "year" },
        { text: "Специальность", value: "name" },
        { text: "Выпускников", value: "count_graduate" },
        { text: "Трудоустроенных", value: "count_work_graduate" },
        { text: "Действия", value: "actions" }
      ],
      editedIndex: -1,
      editedItem: {
        id: 0,
        code: "",
        year: "",
        name: "",
        count_graduate: "",
        count_work_graduate: ""
      },
      defaultItem: {
        id: 0,
        code: "",
        year: "",
        name: "",
        count_graduate: "",
        count_work_graduate: ""
      }
    };
  },
  mounted() {
    this.fetchGraduateJob();
  },
  methods: {
    fetchGraduateJob() {
      this.$store.dispatch(FETCH_GRANTSGJ);
    },

    editItem(item) {
      this.editedIndex = this.graduateJob.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.graduateJob.indexOf(item);
      const id = item.id;
      confirm("Действительно хотите удалить элемент с ID: " + id) &&
        this.$store.dispatch(DELETE_GRANTSGJ, { id }).then(() => {
          this.graduateJob.splice(index, 1);
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
      const code = item.code;
      const year = item.year;
      const name = item.name;
      const count_graduate = item.count_graduate;
      const count_work_graduate = item.count_work_graduate;

      if (this.editedIndex > -1) {
        this.$store.dispatch(UPDATE_GRANTSGJ, {
          id,
          code,
          year,
          name,
          count_graduate,
          count_work_graduate
        });
        Object.assign(this.graduateJob[this.editedIndex], item);
        this.editedIndex = -1;
      } else {
        console.log("save");
        this.$store
          .dispatch(NEW_GRANTSGJ, {
            code,
            year,
            name,
            count_graduate,
            count_work_graduate
          })
          .then(responce => {
            this.editedItem.id = responce.data.insertId;
          });
        this.graduateJob.push(this.editedItem);
      }
      this.close();
    }
  },
  computed: {
    ...mapGetters(["graduateJob"]),

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

