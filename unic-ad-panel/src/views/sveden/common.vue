<template>
    <v-app>
        <h1>Основные сведения</h1>
        <section v-if="errored">
            <p>Приносим извинения, произошла ошибка. Пожалуйста, повторите позднее</p>
        </section>
        <section v-else>
            <div v-if="loading">Загрузка...</div>
            <v-data-table
                :items="common"
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
import { mapGetters } from "vuex";
import { FETCH_COMMON } from "@/store/actions.type";

export default {
  data() {
    return {
      loading: false,
      errored: false
    };
  },
  methods: {
    fetchCommon() {
      this.$store.dispatch(FETCH_COMMON, "common");
    }
  },
  computed: {
    ...mapGetters(["common"])
  }
};
</script>

