<template>
  <div class="home">
    <Tutorial/>
  </div>
</template>

<script>
// @ is an alias to /src
import Tutorial from "@/components/Tutorial.vue";

export default {
  name: "Home",
  components: {
    Tutorial
  }
};
</script>
