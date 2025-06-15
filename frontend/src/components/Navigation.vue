<template>
  <div class="navigation">
    <div class="nav-container">
      <h1 class="logo">SocialApp</h1>
      <div class="nav-links">
        <router-link to="/timeline" class="nav-link">Timeline</router-link>
        <router-link to="/explore" class="nav-link">Explore</router-link>
        <router-link to="/users" class="nav-link">Users</router-link>
      </div>
      <Button
        label="Logout"
        @click="handleLogout"
        severity="secondary"
        size="small"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Navigation",
  methods: {
    ...mapActions(["logout"]),
    handleLogout() {
      this.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.navigation {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.nav-link:hover {
  color: #42b883;
}

.router-link-active {
  color: #42b883;
  font-weight: bold;
}
</style>
