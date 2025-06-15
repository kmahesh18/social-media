<template>
  <div class="users-container">
    <h1>Users</h1>
    <div class="users-list">
      <Card v-for="user in users" :key="user._id" class="user-card">
        <template #title>{{ user.username }}</template>
        <template #content>
          <Button
            v-if="!isFollowing(user._id)"
            @click="followUser(user._id)"
            label="Follow"
            size="small"
          />
          <Button
            v-else
            @click="unfollowUser(user._id)"
            label="Unfollow"
            severity="secondary"
            size="small"
          />
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Users",
  data() {
    return {
      users: [],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    ...mapActions(["followUser", "unfollowUser"]),
    async fetchUsers() {
      try {
        const response = await this.$store.dispatch("fetchUsers");
        // Filter out the current user
        this.users = response.filter((u) => u._id !== this.user.id);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Failed to load users",
          life: 3000,
        });
      }
    },
    isFollowing(userId) {
      return (
        this.user && this.user.following && this.user.following.includes(userId)
      );
    },
    async followUser(userId) {
      try {
        await this.$store.dispatch("followUser", userId);
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: "User followed successfully",
          life: 3000,
        });
      } catch (error) {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Failed to follow user",
          life: 3000,
        });
      }
    },
    async unfollowUser(userId) {
      try {
        await this.$store.dispatch("unfollowUser", userId);
        this.$toast.add({
          severity: "info",
          summary: "Success",
          detail: "User unfollowed successfully",
          life: 3000,
        });
      } catch (error) {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Failed to unfollow user",
          life: 3000,
        });
      }
    },
  },
};
</script>

<style scoped>
.users-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.users-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.user-card {
  width: 100%;
}
</style>
