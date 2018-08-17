<template>
  <div id="app">
    <div id="nav">
      <toolbar></toolbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Toolbar from "@/components/Toolbar";

export default {
  name: "App",
  components: {
    Toolbar
  }
};
</script>



<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
</style>
