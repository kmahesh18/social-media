<template>
  <div id="app" :class="{ 'dark-mode': darkMode }">
    <Navigation v-if="isAuthenticated" @toggle-theme="toggleTheme" :darkMode="darkMode" />
    <div class="content">
      <router-view />
    </div>
    <Toast position="bottom-right" />
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
  data() {
    return {
      darkMode: true, // Default to dark mode
    };
  },
  computed: {
    ...mapState(["isAuthenticated"]),
  },
  methods: {
    toggleTheme() {
      this.darkMode = !this.darkMode;
      localStorage.setItem('darkMode', this.darkMode ? 'true' : 'false');
    }
  },
  created() {
    // Check if dark mode preference is stored
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode !== null) {
      this.darkMode = storedDarkMode === 'true';
    }
  }
};
</script>

<style>
:root {
  /* Light Theme Variables */
  --bg-color-light: #ffffff;
  --text-color-light: #121212;
  --card-bg-light: #f8f9fa;
  --card-border-light: #eaeaea;
  --primary-color-light: #333333;
  --accent-color-light: #0066cc;
  --hover-color-light: #e8e8e8;
  --input-bg-light: #ffffff;
  
  /* Dark Theme Variables */
  --bg-color-dark: #121212;
  --text-color-dark: #f8f9fa;
  --card-bg-dark: #1e1e1e;
  --card-border-dark: #333333;
  --primary-color-dark: #f8f9fa;
  --accent-color-dark: #4d9fff;
  --hover-color-dark: #2d2d2d;
  --input-bg-dark: #2d2d2d;
  
  /* Common Variables */
  --shadow-light: 0 4px 20px rgba(0, 0, 0, 0.08);
  --shadow-dark: 0 4px 20px rgba(0, 0, 0, 0.3);
  --transition-speed: 0.3s;
  --card-radius: 16px;
}

#app {
  font-family: 'Inter', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  transition: background-color var(--transition-speed), color var(--transition-speed);
  background-color: var(--bg-color-light);
  color: var(--text-color-light);
}

#app.dark-mode {
  background-color: var(--bg-color-dark);
  color: var(--text-color-dark);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.content {
  padding-top: 80px;
  transition: padding var(--transition-speed);
}

/* Card styling overrides for both themes */
#app .p-card {
  border-radius: var(--card-radius);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  transform: translateZ(0);
  box-shadow: var(--shadow-light);
  background-color: var(--card-bg-light);
  border: 1px solid var(--card-border-light);
}

#app .p-card:hover {
  transform: translateY(-5px) scale(1.01);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

#app.dark-mode .p-card {
  background-color: var(--card-bg-dark);
  border: 1px solid var(--card-border-dark);
  box-shadow: var(--shadow-dark);
}

/* Button styling overrides */
#app .p-button {
  border-radius: 50px;
  transition: transform 0.3s, box-shadow 0.3s;
}

#app .p-button:active:not(:disabled) {
  transform: scale(0.96);
}

/* Input styling */
#app .p-inputtext, #app .p-password, #app .p-textarea {
  border-radius: 8px;
  transition: all 0.3s;
}

#app.dark-mode .p-inputtext, 
#app.dark-mode .p-password-input, 
#app.dark-mode .p-inputtextarea {
  background-color: var(--input-bg-dark);
  color: var(--text-color-dark);
  border-color: var(--card-border-dark);
}

/* Animation for page transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Toast styling */
#app .p-toast {
  opacity: 0.95;
}

#app .p-toast .p-toast-message {
  border-radius: var(--card-radius);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .content {
    padding-top: 70px;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media (max-width: 480px) {
  #app .p-card {
    border-radius: 12px;
  }
  
  .content {
    padding-top: 60px;
  }
}

/* Add Inter font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
</style>
