<template>
  <div class="signup-container">
    <div class="signup-wrapper">
      <h1 class="app-title">SocialApp</h1>
      <Card class="signup-card">
        <template #title>
          <div class="card-title">Create Your Account</div>
        </template>
        <template #content>
          <form @submit.prevent="handleSignup" class="signup-form">
            <div class="field">
              <label for="username">Username</label>
              <span class="p-input-icon-left w-full">
                <i class="pi pi-user" />
                <InputText
                  id="username"
                  v-model="form.username"
                  class="w-full"
                  placeholder="Choose a username"
                  required
                />
              </span>
            </div>
            <div class="field">
              <label for="email">Email</label>
              <span class="p-input-icon-left w-full">
                <i class="pi pi-envelope" />
                <InputText
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="w-full"
                  placeholder="Enter your email"
                  required
                />
              </span>
            </div>
            <div class="field">
              <label for="password">Password</label>
              <span class="p-input-icon-left w-full">
                <i class="pi pi-lock" />
                <Password
                  id="password"
                  v-model="form.password"
                  class="w-full"
                  placeholder="Create a password"
                  toggleMask
                  required
                />
              </span>
            </div>
            <Button
              type="submit"
              label="Sign Up"
              :loading="loading"
              class="submit-button"
            />
          </form>
          <div class="login-link">
            <p>
              Already have an account?
              <router-link to="/login">Login</router-link>
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
  name: "Signup",
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
      },
      loading: false,
    };
  },
  methods: {
    ...mapActions(["signup"]),
    async handleSignup() {
      this.loading = true;
      const result = await this.signup(this.form);
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
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #6fa8dc 0%, #2986cc 100%);
}

.signup-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 450px;
  padding: 1rem;
}

.app-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.signup-card {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  text-align: center;
}

.signup-form {
  margin-top: 1rem;
}

.field {
  margin-bottom: 1.5rem;
}

.field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2c3e50;
}

.w-full {
  width: 100%;
}

.submit-button {
  width: 100%;
  margin-top: 1rem;
  padding: 0.75rem;
  font-weight: bold;
}

.login-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #555;
}

.login-link a {
  color: #2986cc;
  font-weight: 600;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
