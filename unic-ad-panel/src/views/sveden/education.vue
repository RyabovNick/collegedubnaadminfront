<style>
</style>

<template>
  <v-app>{{ education }}</v-app>
</template>

<script>
import { FETCH_EDUCATION, UPLOAD_EDUCATION, mapGetters } from "vuex";

export default {
  mounted() {
    this.fetchEducation();
  },
  methods: {
    fetchEducation() {
      this.$store.dispatch(FETCH_EDUCATION);
    }
  },
  computed: {
    ...mapGetters(["education"])
  }
};
</script>
