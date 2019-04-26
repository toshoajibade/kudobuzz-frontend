<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from "@/pages/Home";
export default {
  name: "app",
  components: {
    Home
  }
};
</script>

<style lang="scss">
* {
  padding: 0px;
  margin: 0px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
