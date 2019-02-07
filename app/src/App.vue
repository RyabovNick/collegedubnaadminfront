<template>
  <div id="app">
    <Toolbar/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Toolbar from "./components/Toolbar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "college",
  components: {
    Toolbar,
    Footer
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
h1 {
  text-align: center;
  padding-bottom: 1rem;
  padding-top: 1rem;
}

h4 {
  font-size: 1.6em;
  padding-top: 0.5em;
}

h5 {
  font-size: 1.4em;
  padding-top: 0.4em;
  padding-bottom: 0.4em;
}

p {
  margin-bottom: 0;
  line-height: 1.5;
}

mark {
  background-color: #fcf8e3;
}
</style>
