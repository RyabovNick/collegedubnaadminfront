<style>
  .layout {
    max-width: 44.438em;
    margin: auto;
  }
</style>


<template>
  <v-layout justify-center column>
    <v-flex xs6 sm4
      v-for="tnews in news"
      :key="tnews.id">
      <v-card>
        <v-card-media
          :src="`http://college.uni-dubna.ru/files/${tnews.logo}`"
          height="25em"
        ></v-card-media>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ tnews.title }}</h3>
            <div>{{ tnews.dateNow }}</div>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import axios from 'axios';

  export default {
    data () {
      return {
        news: [],
        loading: true,
        errored: false,
        card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.'
      }
    },
    mounted() {
    axios
      .get("/api/getNews")
      .then(response => (this.news = response.data))
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
    }
  }
</script>