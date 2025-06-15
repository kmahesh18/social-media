<template>
  <div class="explore-container">
    <div class="header">
      <h1>Explore All Posts</h1>
    </div>

    <div class="posts-container">
      <PostCard v-for="post in allPosts" :key="post._id" :post="post" />
      <div v-if="allPosts.length === 0" class="no-posts">
        <p>No posts available yet.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PostCard from "../components/PostCard.vue";

export default {
  name: "Explore",
  components: {
    PostCard,
  },
  computed: {
    ...mapState(["allPosts"]),
  },
  created() {
    this.fetchAllPosts();
  },
  methods: {
    ...mapActions(["fetchAllPosts"]),
  },
};
</script>

<style scoped>
.explore-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  margin-bottom: 2rem;
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
