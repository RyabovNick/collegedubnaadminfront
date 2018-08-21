<template>
    <v-app>
        <h1>Основные сведения</h1>
        <section v-if="errored">
            <p>Приносим извинения, произошла ошибка. Пожалуйста, повторите позднее</p>
        </section>
        <section v-else>
            <div v-if="loading">Загрузка...</div>
            <v-toolbar flat color="white">
              <v-toolbar-title>CRUD common</v-toolbar-title>
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
                          <v-text-field v-model="editedItem.name" label="Название"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.tag" label="Тег"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.value" label="Значение"></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="close">Отмена</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="save(editedItem.name, editedItem.tag, editedItem.value)">
                      Сохранить</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="common"
                class="elevation-1"
                hide-actions
            >
                <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.tag }}</td>
                <td class="text-xs-left">{{ props.item.value }}</td>
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
                    @click="deleteItem(props.item.id)"
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
import { FETCH_COMMON, NEW_COMMON, DELETE_COMMON } from "@/store/actions.type";

export default {
  data() {
    return {
      loading: false,
      errored: false,
      //added
      dialog: false,
      headers: [
        { text: "Название", value: "name" },
        { text: "Тег", value: "tag" },
        { text: "Значение", value: "value" },
        { text: "Действия", value: "actions" }
      ],
      editedIndex: -1,
      editedItem: {
        name: "",
        tag: "",
        value: ""
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    };
  },
  mounted() {
    this.fetchCommon();
  },
  methods: {
    fetchCommon() {
      this.$store.dispatch(FETCH_COMMON);
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(id) {
      console.log(id);
      confirm("Are you sure you want to delete this item?") &&
        this.$store.dispatch(DELETE_COMMON, { id });
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save(name, tag, value) {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.$store.dispatch(NEW_COMMON, { name, tag, value });
      }
      this.close();
    }
  },
  computed: {
    ...mapGetters(["common"]),

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

