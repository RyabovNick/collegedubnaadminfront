<template>
    <v-app>
        <h1>Основные сведения</h1>
        <section v-if="errored">
            <p>Приносим извинения, произошла ошибка. Пожалуйста, повторите позднее</p>
        </section>
        <section v-else>
            <div v-if="loading">Загрузка...</div>
            <v-data-table
                :items="sveden"
                class="elevation-1"
                hide-actions
                hide-headers
            >
                <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right" :itemprop="`${props.item.tag}`">
                    {{ props.item.value }}</td>
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
      sveden: [],
      loading: true,
      errored: false
    };
  },
  mounted() {
    axios
      .get("/api/getCommon")
      .then(response => (this.sveden = response.data))
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>
