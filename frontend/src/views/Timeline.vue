<template>
  <div class="timeline-container">
    <div class="header">
      <h1>Your Timeline</h1>
    </div>

    <Card class="create-post-card">
      <template #title>Create a Post</template>
      <template #content>
        <form @submit.prevent="handleCreatePost">
          <div class="field">
            <label for="title">Title</label>
            <InputText id="title" v-model="newPost.title" required />
          </div>
          <div class="field">
            <label for="description">Description</label>
            <Textarea
              id="description"
              v-model="newPost.description"
              rows="3"
              required
            />
          </div>
          <Button type="submit" label="Post" :loading="posting" />
        </form>
      </template>
    </Card>

    <div class="posts-container">
      <PostCard v-for="post in posts" :key="post._id" :post="post" />
      <div v-if="posts.length === 0" class="no-posts">
        <p>No posts to show. Follow some users to see their posts!</p>
      </div>
    </div>
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
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.create-post-card {
  margin-bottom: 2rem;
}

.field {
  margin-bottom: 1rem;
}

.field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.posts-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.no-posts {
  text-align: center;
  padding: 2rem;
  color: #666;
}
</style>
