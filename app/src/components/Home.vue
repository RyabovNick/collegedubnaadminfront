<template>
  <v-app>
    <carousel v-bind:elements="items"></carousel>
    <h1>Новостная лента</h1>
    <card></card>
  </v-app>
</template>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";
import Carousel from "./helpers/Carousel";
import Card from "./Card.vue";
import axios from "axios";

export default {
  components: {
    Card,
    Carousel3d,
    Carousel,
    Slide
  },
  data() {
    return {
      items: []
    };
  },
  mounted() {
    axios
      .get("/api/homeimgs")
      .then(response => {
        response.data.forEach(element => {
          this.items.push({ src: element.link });
        });
        console.log("this.items: ", this.items);
        //this.items = response.data;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>

