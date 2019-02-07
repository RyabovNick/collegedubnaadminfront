<template>
  <v-app>
    <carousel-3d :autoplay="true" :autoplay-timeout="5000" :width="550" :height="365">
      <slide v-for="(slide, i) in elements" :index="i" :key="i">
        <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
          <img
            :data-index="index"
            :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }"
            :src="slide.src"
          >
        </template>
      </slide>
    </carousel-3d>
  </v-app>
</template>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";

export default {
  components: {
    Carousel3d,
    Slide
  },
  props: {
    elements: Array
  },
  data() {
    return {
      items: []
    };
  },
  mounted() {
    console.log("elements_mounted: ", this.elements);
  },
  beforeDestroy() {
    console.log("elements_destroy: ", this.elements);
  }
};
</script>

