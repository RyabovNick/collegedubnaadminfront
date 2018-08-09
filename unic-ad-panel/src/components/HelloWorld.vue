<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="name"
      :rules="nameRules"
      :counter="10"
      label="Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
            v-model="password"
            :append-icon="show ? 'visibility_off' : 'visibility'"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="Enter your password"
            counter
            @click:append="show = !show"
          ></v-text-field>

    <v-btn
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required"
      //v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    show: false
  }),

  methods: {
    submit() {
      var token = window.localStorage.getItem("college.uni-dubna.ru_token");
      console.log(token);
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios
          .post(
            "http://localhost:3000/api/admin/common",
            {
              name: this.email,
              tag: this.password,
              value: this.name
            },
            { headers: { Authorization: "Token " + token } }
          )
          .then(function(response) {
            window.localStorage.setItem(
              "college.uni-dubna.ru_token",
              response.data.user.token
            );
            console.log("response " + response);
            //this.$router.push({ name: "hiddenpage" });
          })
          .catch(function(error) {
            console.log(error.response);
          });
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
