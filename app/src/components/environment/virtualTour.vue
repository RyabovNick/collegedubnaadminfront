<template>
    <v-app>
        <carousel-3d :autoplay="true" 
            :autoplay-timeout="5000" 
            :width="550"
            :height="365">
            <slide v-for="(slide, i) in items" :index="i" :key="i">
                <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
                    <img :data-index="index" :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }" :src="slide.src">
                </template>
            </slide>
        </carousel-3d>
        <h1>Новостная лента</h1>
    </v-app>
</template>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";

export default {
  components: {
    Carousel3d,
    Slide
  },
  data() {
    return {
      items: [
        {
          src: "../assets/environment/virtual_tour/1.jpg" //require("./assets/environment/virtual_tour/1.jpg")
        },
        {
          src: "./2.jpg"
        },
        {
          src: "/environment/virtual_tour/3.jpg"
        },
        {
          src: "src/assets/environment/virtual_tour/4.jpg"
        },
        {
          src: "/virtual_tour/5.jpg"
        },
        {
          src: "./assets/environment/virtual_tour/6.jpg"
        }
      ]
    };
  }
};
</script>