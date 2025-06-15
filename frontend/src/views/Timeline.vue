<template>
  <div class="timeline-container">
    <div class="page-header">
      <h1>Your Timeline</h1>
    </div>

    <Card class="create-post-card">
      <template #title>
        <div class="create-post-title">
          <i class="pi pi-pencil"></i> Create a Post
        </div>
      </template>
      <template #content>
        <form @submit.prevent="handleCreatePost" class="create-post-form">
          <div class="field">
            <label for="title">Title</label>
            <InputText
              id="title"
              v-model="newPost.title"
              required
              placeholder="Enter a title for your post"
            />
          </div>
          <div class="field">
            <label for="description">What's on your mind?</label>
            <Textarea
              id="description"
              v-model="newPost.description"
              rows="3"
              required
              placeholder="Share your thoughts..."
              class="description-input"
            />
          </div>
          <div class="form-actions">
            <Button
              type="submit"
              label="Post"
              icon="pi pi-send"
              :loading="posting"
            />
          </div>
        </form>
      </template>
    </Card>

    <transition-group
      name="post-list"
      tag="div"
      class="posts-container"
    >
      <PostCard v-for="post in posts" :key="post._id" :post="post" />

      <div
        v-if="posts.length === 0"
        class="no-posts"
        key="no-posts"
      >
        <div class="no-content-illustration">
          <i class="pi pi-inbox"></i>
        </div>
        <h3>No posts to show yet</h3>
        <p>Follow some users to see their posts in your timeline!</p>
        <router-link to="/users">
          <Button
            label="Find Users to Follow"
            icon="pi pi-users"
            class="p-button-outlined"
          />
        </router-link>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PostCard from "../components/PostCard.vue";

export default {
  name: "Timeline",
  components: {
    PostCard,
  },
  data() {
    return {
      newPost: {
        title: "",
        description: "",
      },
      posting: false,
    };
  },
  computed: {
    ...mapState(["posts", "user"]),
  },
  async created() {
    await this.fetchTimeline();
  },
  methods: {
    ...mapActions(["createPost", "fetchTimeline", "logout"]),
    async handleCreatePost() {
      this.posting = true;
      const result = await this.createPost(this.newPost);
      this.posting = false;

      if (result.success) {
        this.newPost = { title: "", description: "" };
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: "Post created successfully!",
          life: 3000,
        });
      } else {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: result.error,
          life: 3000,
        });
      }
    },
    handleLogout() {
      this.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.timeline-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1.5rem;
}

.page-header {
  margin-bottom: 2rem;
  position: relative;
}

.page-header h1 {
  font-weight: 700;
  font-size: 2rem;
  position: relative;
}

.page-header h1::after {
  content: "";
  display: block;
  width: 50px;
  height: 4px;
  background: var(--accent-color-light);
  margin-top: 0.5rem;
  border-radius: 2px;
  transition: background 0.3s;
}

:deep(.dark-mode) .page-header h1::after {
  background: var(--accent-color-dark);
}

.create-post-card {
  margin-bottom: 2rem;
  transition: transform 0.3s;
}

.create-post-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
}

.field {
  margin-bottom: 1.2rem;
}

.field label {
  display: block;
  margin-bottom: 0.6rem;
  font-weight: 500;
}

.description-input {
  width: 100%;
  transition: height 0.3s;
}

.description-input:focus {
  height: 120px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.posts-container {
  position: relative;
}

.no-posts {
  text-align: center;
  padding: 3rem 1rem;
  color: #777;
  border-radius: var(--card-radius);
  background-color: var(--card-bg-light);
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  transition: background-color 0.3s;
}

:deep(.dark-mode) .no-posts {
  background-color: var(--card-bg-dark);
  color: #aaa;
}

.no-content-illustration {
  font-size: 4rem;
  opacity: 0.5;
  margin-bottom: 1rem;
}

.no-posts h3 {
  font-weight: 600;
  font-size: 1.5rem;
  margin: 0;
}

.no-posts p {
  margin-bottom: 1rem;
}

/* Animation for post list */
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.5s ease;
}

.post-list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Ensure posts animate in with a staggered delay */
.posts-container > *:nth-child(1) {
  transition-delay: 0.1s;
}
.posts-container > *:nth-child(2) {
  transition-delay: 0.2s;
}
.posts-container > *:nth-child(3) {
  transition-delay: 0.3s;
}
.posts-container > *:nth-child(4) {
  transition-delay: 0.4s;
}
.posts-container > *:nth-child(5) {
  transition-delay: 0.5s;
}

/* Responsive styles */
@media (max-width: 768px) {
  .timeline-container {
    padding: 1rem;
  }

  .page-header h1 {
    font-size: 1.75rem;
  }
}

@media (max-width: 480px) {
  .timeline-container {
    padding: 1rem 0.75rem;
  }

  .page-header {
    margin-bottom: 1.5rem;
  }

  .page-header h1 {
    font-size: 1.5rem;
  }

  .create-post-title {
    font-size: 1.1rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-actions .p-button {
    width: 100%;
    margin-top: 0.5rem;
  }
}
</style>
