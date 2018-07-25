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
        <card></card>
    </v-app>
</template>

<script>
import { Carousel3d, Slide } from 'vue-carousel-3d';
import Card from "./Card.vue"

export default {
    components: {
    Card,
    Carousel3d,
    Slide
  },
  data() {
    return {
      items: [
        {
          src: "http://college.uni-dubna.ru/image/carousel/1.jpg"
        },
        {
          src: "http://college.uni-dubna.ru/image/carousel/2.jpg"
        },
        {
          src: "http://college.uni-dubna.ru/image/carousel/3.jpg"
        },
        {
          src: "http://college.uni-dubna.ru/image/carousel/4.jpg"
        },
        {
          src: "http://college.uni-dubna.ru/image/carousel/5.jpg"
        },
        {
          src: "http://college.uni-dubna.ru/image/carousel/6.jpg"
        },
        {
          src: "http://college.uni-dubna.ru/image/carousel/7.jpg"
        },
        {
          src: "http://college.uni-dubna.ru/image/carousel/8.jpg"
        }
      ]
    };
  }
}
</script>

