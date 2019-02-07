<style scoped>
/*@import url('../css/pages.css');*/
</style>


<template>
  <v-container v-html="page.content"></v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      page: [],
      loading: true,
      errored: false
    };
  },
  mounted() {
    axios
      .get("/api/pages/1")
      .then(response => (this.page = response.data[0]))
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>


