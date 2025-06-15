<template>
  <div id="app">
    <Navigation v-if="isAuthenticated" />
    <div class="content">
      <router-view />
    </div>
    <Toast />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Navigation from "./components/Navigation.vue";

export default {
  name: "App",
  components: {
    Navigation,
  },
  computed: {
    ...mapState(["isAuthenticated"]),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.content {
  padding-top: 20px;
}
</style>
