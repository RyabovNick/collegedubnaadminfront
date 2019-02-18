<template>
  <v-app class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Введите логин и пароль</h1>
          <p class="text-xs-center">Нужен доступ? Обратитесь к администратору</p>
          <v-alert v-if="errors" :value="true" type="error">{{errors}}</v-alert>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="email" label="Login" required></v-text-field>
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

            <v-btn @click="onSubmit(email, password)">Авторизоваться</v-btn>
          </v-form>
        </div>
      </div>
    </div>
  </v-app>
</template>
<script>
import { mapState } from "vuex";
import { LOGIN } from "@/store/actions.type";

export default {
  name: "RwvLogin",
  data() {
    return {
      email: null,
      password: null,
      show: false,
      valid: true
    };
  },
  methods: {
    onSubmit(email, password) {
      this.$store
        .dispatch(LOGIN, { email, password })
        .then(() => this.$router.push({ name: "Home" }));
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  }
};
</script>
