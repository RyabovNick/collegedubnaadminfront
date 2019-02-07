<style scoped>
/*@import url('../css/pages.css');*/
.speciality-helper {
  margin-bottom: 2em;
  margin-top: 2em;
  padding-left: 2em;
  padding-right: 2em;
}
</style>


<template>
  <v-container class="speciality-helper" v-html="page.content"></v-container>
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
      .get("/api/pages/2")
      .then(response => (this.page = response.data[0]))
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>


