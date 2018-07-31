<template>
<v-app>
    <router-link :to="{ name: 'hiddenpage' }">HiddenPage</router-link>
    <v-form>
        <v-text-field
            v-model="email"
            label="email"
            required
        ></v-text-field>
        <v-text-field
            v-model="password"
            label="password"
            required
        ></v-text-field>
        <v-btn
            @click="submit"
        >
            submit
        </v-btn>
    </v-form>
    <router-view/>
</v-app>
</template>


<script>
import axios from "axios";

export default {
  data: () => ({
    email: "",
    password: ""
  }),
  methods: {
    submit() {
      console.log(this.email);
      console.log(this.password);
      axios
        .post("http://localhost:3000/api/user/login", {
          user: {
            email: this.email,
            password: this.password
          }
        })
        .then(function(response) {
          window.localStorage.setItem(
            "college.uni-dubna.ru_token",
            response.data.user.token
          );
          console.log(response);
          this.$router.push({ name: "hiddenpage" });
        })
        .catch(function(error) {
          console.log(error.response);
        });
    }
  }
};
</script>
