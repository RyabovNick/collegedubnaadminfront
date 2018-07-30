<template>
    <v-app>
        <h1>Структура и органы управления образовательной организации</h1>
        <section v-if="errored">
            <p>Приносим извинения, произошла ошибка. Пожалуйста, повторите позднее</p>
        </section>

        <section v-else>
            <div v-if="loading">Загрузка...</div>

            <v-data-table
            :headers="headers"
            :items="heads"
            hide-actions
            class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td itemprop="fio" class="text-xs-left">{{ props.item.fio }}</td>
                <td itemprop="post" class="text-xs-right">{{ props.item.position }}</td>
                <td itemprop="telephone" class="text-xs-right">{{ props.item.telephone }}</td>
                <td itemprop="email" class="text-xs-right">
                    <a :href="`mailto:${props.item.email}`">
                        {{ props.item.email }}
                    </a>
                </td>
            </template>
        </v-data-table>
        </section>
    </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      headers: [
        {
          text: "ФИО",
          align: "left",
          sortable: false,
          value: "fio"
        },
        { text: "Должность", sortable: false, value: "post" },
        { text: "Телефон", sortable: false, value: "telephone" },
        { text: "Почта", sortable: false, value: "email" }
      ],
      heads: [],
      loading: true,
      errored: false
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/heads")
      .then(response => (this.heads = response.data))
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>

