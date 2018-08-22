<template>
    <v-app>
        <h1>Основные сведения</h1>
        <section v-if="errored">
            <p>Приносим извинения, произошла ошибка. Пожалуйста, повторите позднее</p>
        </section>
        <section v-else>
            <div v-if="loading">Загрузка...</div>
            <v-toolbar flat color="white">
              <v-toolbar-title>CRUD news</v-toolbar-title>
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
                        <v-form action="http://localhost:3000/api/admin/upload_news"
                            enctype="multipart/form-data"
                            v-model="valid" method="post">
                            <v-text-field name="title" v-model="editedItem.title" label="Заголовок"></v-text-field>
                            <v-text-field name="content" v-model="editedItem.content" label="Новость"></v-text-field>
                            <v-text-field name="date_now" v-model="editedItem.date_now" label="Дата новости"></v-text-field>
                            <input type="file" name="upload">
                            <v-btn
                            type="submit">
                            submit
                            </v-btn>
                        </v-form>
                      <!--  
                      <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.title" label="Заголовок"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.content" label="Новость"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.date_now" label="Дата новости"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <input type="file" name="upload" multiple="multiple">
                        </v-flex>
                      </v-layout>
                      -->
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
                :items="news"
                class="elevation-1"
                hide-actions
            >
                <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.id }}</td>
                <td class="text-xs-left">{{ props.item.title }}</td>
                <td class="text-xs-left">{{ props.item.content }}</td>
                <td class="text-xs-left">{{ props.item.date_now }}</td>
                <td class="text-xs-left">{{ props.item.logo }}</td>
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
  FETCH_NEWS,
  NEW_NEWS,
  DELETE_NEWS,
  UPDATE_NEWS
} from "@/store/actions.type";

export default {
  data() {
    return {
      valid: true,
      loading: false,
      errored: false,
      //added
      dialog: false,
      headers: [
        { text: "Id", value: "id" },
        { text: "Заголовок", value: "title" },
        { text: "Новость", value: "content" },
        { text: "Дата", value: "date_now" },
        { text: "Лого", value: "logo" }
      ],
      editedIndex: -1,
      editedItem: {
        id: 0,
        title: "",
        description: "",
        content: "",
        date_now: "",
        logo: ""
      },
      defaultItem: {
        id: 0,
        title: "",
        description: "",
        content: "",
        date_now: "",
        logo: ""
      }
    };
  },
  mounted() {
    this.fetchNews();
  },
  methods: {
    fetchNews() {
      this.$store.dispatch(FETCH_NEWS);
    },

    editItem(item) {
      this.editedIndex = this.news.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.news.indexOf(item);
      const id = item.id;
      confirm("Действительно хотите удалить элемент с ID: " + id) &&
        this.$store.dispatch(DELETE_NEWS, { id }).then(() => {
          this.news.splice(index, 1);
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
      const name = item.name;
      const tag = item.tag;
      const value = item.value;
      if (this.editedIndex > -1) {
        this.$store.dispatch(UPDATE_NEWS, { id, name, tag, value });
        Object.assign(this.news[this.editedIndex], item);
        this.editedIndex = -1;
      } else {
        this.$store.dispatch(NEW_NEWS, { name, tag, value }).then(responce => {
          this.editedItem.id = responce.data.insertId;
        });
        this.news.push(this.editedItem);
      }
      this.close();
    }
  },
  computed: {
    ...mapGetters(["news"]),

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

