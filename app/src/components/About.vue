<style scoped>
.scoped-helper >>> p {
  font-size: 16px;
}
/*@import url('../css/pages.css');*/
</style>

<template>
  <v-container class="scoped-helper" v-html="page.content"></v-container>
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
      .get("/api/pages/3")
      .then(response => {
        this.page = response.data[0];
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>


