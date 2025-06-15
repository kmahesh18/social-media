<template>
  <div class="auth-container">
    <div class="auth-wrapper">
      <div class="animated-logo">
        <h1 class="app-title">
          <span class="logo-text">Social</span>
          <span class="logo-accent">App</span>
        </h1>
        <div class="logo-shape"></div>
      </div>

      <Card class="auth-card">
        <template #title>
          <div class="card-title">Welcome Back!</div>
        </template>
        <template #content>
          <form @submit.prevent="handleLogin" class="auth-form">
            <div class="field">
              <label for="email">Email</label>
              <span class="p-input-icon-left w-full">
                <i class="pi pi-envelope"></i>
                <InputText
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="w-full"
                  placeholder="Enter your email"
                  required
                  :class="{ 'p-invalid': errors.email }"
                />
              </span>
              <small v-if="errors.email" class="p-error">{{
                errors.email
              }}</small>
            </div>
            <div class="field">
              <label for="password">Password</label>
              <span class="p-input-icon-left w-full">
                <i class="pi pi-lock"></i>
                <Password
                  id="password"
                  v-model="form.password"
                  class="w-full"
                  placeholder="Enter your password"
                  toggleMask
                  :feedback="false"
                  required
                  :class="{ 'p-invalid': errors.password }"
                />
              </span>
              <small v-if="errors.password" class="p-error">{{
                errors.password
              }}</small>
            </div>
            <Button
              type="submit"
              label="Login"
              :loading="loading"
              class="submit-button"
            />
          </form>
          <div class="auth-link">
            <p>
              Don't have an account?
              <router-link to="/signup">Create an account</router-link>
            </p>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errors: {
        email: "",
        password: "",
      },
      loading: false,
    };
  },
  methods: {
    ...mapActions(["login"]),
    validate() {
      let isValid = true;
      this.errors = { email: "", password: "" };

      if (!this.form.email) {
        this.errors.email = "Email is required";
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
        this.errors.email = "Email is invalid";
        isValid = false;
      }

      if (!this.form.password) {
        this.errors.password = "Password is required";
        isValid = false;
      }

      return isValid;
    },
    async handleLogin() {
      if (!this.validate()) return;

      this.loading = true;
      const result = await this.login(this.form);
      this.loading = false;

      if (result.success) {
        this.$router.push("/timeline");
      } else {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: result.error,
          life: 3000,
        });
      }
    },
  },
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
  padding: 1rem;
}

.auth-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 450px;
}

.animated-logo {
  position: relative;
  margin-bottom: 2rem;
  animation: float 6s ease-in-out infinite;
  perspective: 1000px;
}

.logo-shape {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotateY(0deg);
  width: 80px;
  height: 80px;
  background: linear-gradient(
    135deg,
    var(--accent-color-dark) 0%,
    #4d9fff 100%
  );
  border-radius: 20px;
  z-index: -1;
  animation: rotate3D 8s linear infinite;
  opacity: 0.7;
  box-shadow: 0 0 20px rgba(77, 159, 255, 0.5);
}

.app-title {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  letter-spacing: -1px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.logo-text {
  font-weight: 300;
}

.logo-accent {
  font-weight: 700;
  background: linear-gradient(135deg, #4d9fff 0%, #a3d0ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.auth-card {
  width: 100%;
  border-radius: var(--card-radius);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: visible;
  animation: fadeIn 0.8s ease-out;
}

.card-title {
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.5rem;
}

.auth-form {
  margin-top: 1rem;
}

.field {
  margin-bottom: 1.5rem;
}

.field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.w-full {
  width: 100%;
}

.submit-button {
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.75rem;
  font-weight: 600;
  font-size: 1.05rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.auth-link {
  text-align: center;
  margin-top: 1.5rem;
}

.auth-link a {
  color: var(--accent-color-light);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s;
}

.auth-link a:hover {
  text-decoration: underline;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes rotate3D {
  0% {
    transform: translate(-50%, -50%) rotateY(0deg) rotateX(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotateY(360deg) rotateX(360deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive styles */
@media (max-width: 768px) {
  .app-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .app-title {
    font-size: 2rem;
  }

  .card-title {
    font-size: 1.5rem;
  }

  .auth-wrapper {
    max-width: 100%;
  }
}
</style>
