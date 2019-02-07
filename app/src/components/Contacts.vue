<style scoped>
/*@import url('../css/pages.css');*/
.contacts-helper {
  margin-top: 2em;
  margin-bottom: 2em;
}
.contacts-helper >>> p {
  text-align: center;
}
</style>


<template>
  <v-container v-html="page.content" class="contacts-helper"></v-container>
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
      .get("/api/pages/4")
      .then(response => (this.page = response.data[0]))
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>


