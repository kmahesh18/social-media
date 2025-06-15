<template>
  <nav class="navigation" :class="{ 'dark-mode': darkMode }">
    <div class="nav-container">
      <h1 class="logo">
        <span class="logo-text">Social</span>
        <span class="logo-accent">App</span>
      </h1>
      
      <div class="mobile-menu-button" @click="mobileMenuOpen = !mobileMenuOpen">
        <i class="pi" :class="mobileMenuOpen ? 'pi-times' : 'pi-bars'"></i>
      </div>
      
      <div class="nav-links" :class="{ 'active': mobileMenuOpen }">
        <router-link to="/timeline" class="nav-link" @click="closeMobileMenu">
          <i class="pi pi-home"></i>
          <span>Timeline</span>
        </router-link>
        <router-link to="/explore" class="nav-link" @click="closeMobileMenu">
          <i class="pi pi-compass"></i>
          <span>Explore</span>
        </router-link>
        <router-link to="/users" class="nav-link" @click="closeMobileMenu">
          <i class="pi pi-users"></i>
          <span>Users</span>
        </router-link>
      </div>
      
      <div class="nav-actions">
        <Button 
          icon="pi pi-moon" 
          v-if="!darkMode" 
          class="p-button-rounded p-button-text theme-toggle" 
          @click="$emit('toggle-theme')" 
        />
        <Button 
          icon="pi pi-sun" 
          v-else 
          class="p-button-rounded p-button-text theme-toggle" 
          @click="$emit('toggle-theme')" 
        />
        <Button 
          icon="pi pi-sign-out" 
          label="Logout" 
          class="p-button-text logout-btn" 
          @click="handleLogout" 
        />
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Navigation",
  props: {
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mobileMenuOpen: false
    };
  },
  methods: {
    ...mapActions(["logout"]),
    handleLogout() {
      this.logout();
      this.$router.push("/login");
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false;
    }
  },
};
</script>

<style scoped>
.navigation {
  background-color: var(--bg-color-light);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 0.8rem 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.navigation.dark-mode {
  background-color: var(--bg-color-dark);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
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
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-color-light);
  margin: 0;
  letter-spacing: -0.5px;
  transition: color 0.3s;
  animation: logoEntrance 1s ease-out;
}

.dark-mode .logo {
  color: var(--text-color-dark);
}

.logo-text {
  font-weight: 400;
}

.logo-accent {
  font-weight: 700;
  color: var(--accent-color-light);
}

.dark-mode .logo-accent {
  color: var(--accent-color-dark);
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  text-decoration: none;
  color: var(--text-color-light);
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dark-mode .nav-link {
  color: var(--text-color-dark);
}

.nav-link:hover {
  background-color: var(--hover-color-light);
  transform: translateY(-2px);
}

.dark-mode .nav-link:hover {
  background-color: var(--hover-color-dark);
}

.nav-link.router-link-active {
  color: var(--accent-color-light);
  font-weight: 600;
}

.dark-mode .nav-link.router-link-active {
  color: var(--accent-color-dark);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.theme-toggle, .logout-btn {
  transition: transform 0.3s;
}

.theme-toggle:hover, .logout-btn:hover {
  transform: scale(1.05);
}

.mobile-menu-button {
  display: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-color-light);
  transition: color 0.3s;
}

.dark-mode .mobile-menu-button {
  color: var(--text-color-dark);
}

@keyframes logoEntrance {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 1.5rem;
  }
  
  .mobile-menu-button {
    display: block;
    order: 3;
  }
  
  .nav-links {
    position: fixed;
    top: 62px;
    left: 0;
    width: 100%;
    background-color: var(--bg-color-light);
    flex-direction: column;
    gap: 0;
    height: 0;
    overflow: hidden;
    transition: height 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .dark-mode .nav-links {
    background-color: var(--bg-color-dark);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  .nav-links.active {
    height: auto;
    padding: 1rem 0;
  }
  
  .nav-link {
    width: 100%;
    padding: 1rem 2rem;
    border-radius: 0;
  }
  
  .nav-actions {
    order: 2;
  }
  
  .logout-btn .p-button-label {
    display: none;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0 1rem;
  }
  
  .logo {
    font-size: 1.5rem;
  }
}
</style>
