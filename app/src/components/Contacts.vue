<style scoped>
/*@import url('../css/pages.css');*/

.contacts >>> p {
  text-align: center;
}
</style>


<template>
    <v-container v-html="page.content" class="contacts">
    </v-container>
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
      .get("/api/getPage/4")
      .then(response => (this.page = response.data))
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>


