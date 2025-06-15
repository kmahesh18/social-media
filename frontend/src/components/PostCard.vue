<template>
  <Card class="post-card">
    <template #title>{{ post.title }}</template>
    <template #subtitle>by {{ post.authorUsername }}</template>
    <template #content>
      <p>{{ post.description }}</p>
      <div class="post-actions">
        <div class="likes">
          <Button
            :icon="isLiked ? 'pi pi-heart-fill' : 'pi pi-heart'"
            :class="{ liked: isLiked }"
            severity="secondary"
            text
            @click="toggleLike"
          />
          <span>{{ post.likes ? post.likes.length : 0 }}</span>
        </div>
      </div>

      <div class="comments-section">
        <h4>Comments ({{ post.comments ? post.comments.length : 0 }})</h4>
        <div v-if="showComments" class="comments-list">
          <div
            v-for="(comment, index) in post.comments"
            :key="index"
            class="comment"
          >
            <strong>{{ comment.authorUsername }}:</strong> {{ comment.text }}
            <div class="comment-date">{{ formatDate(comment.createdAt) }}</div>
          </div>
          <div
            v-if="post.comments && post.comments.length === 0"
            class="no-comments"
          >
            No comments yet.
          </div>
        </div>
        <Button
          :label="showComments ? 'Hide Comments' : 'Show Comments'"
          text
          @click="toggleComments"
          v-if="post.comments && post.comments.length > 0"
        />

        <div class="add-comment">
          <InputText
            v-model="newComment"
            placeholder="Write a comment..."
            class="comment-input"
          />
          <Button icon="pi pi-send" @click="addComment" />
        </div>
      </div>

      <small class="post-date">{{ formatDate(post.createdAt) }}</small>
    </template>
  </Card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PostCard",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      newComment: "",
      showComments: false,
    };
  },
  computed: {
    ...mapState(["user"]),
    isLiked() {
      return (
        this.post.likes && this.user && this.post.likes.includes(this.user.id)
      );
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    },
    async toggleLike() {
      try {
        if (this.isLiked) {
          await this.$store.dispatch("unlikePost", this.post._id);
        } else {
          await this.$store.dispatch("likePost", this.post._id);
        }
      } catch (error) {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Failed to update like",
          life: 3000,
        });
      }
    },
    toggleComments() {
      this.showComments = !this.showComments;
    },
    async addComment() {
      if (!this.newComment.trim()) return;

      try {
        await this.$store.dispatch("addComment", {
          postId: this.post._id,
          text: this.newComment,
        });
        this.newComment = "";
        this.showComments = true; // Show comments after adding
      } catch (error) {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Failed to add comment",
          life: 3000,
        });
      }
    },
  },
};
</script>

<style scoped>
.post-card {
  width: 100%;
  margin-bottom: 1rem;
}

.post-date {
  color: #666;
  font-style: italic;
  display: block;
  margin-top: 1rem;
}

.post-actions {
  display: flex;
  margin: 1rem 0;
}

.likes {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.liked {
  color: #e53935 !important;
}

.comments-section {
  margin-top: 1rem;
}

.comments-list {
  margin: 1rem 0;
  max-height: 200px;
  overflow-y: auto;
}

.comment {
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}

.comment:last-child {
  border-bottom: none;
}

.comment-date {
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.25rem;
}

.add-comment {
  display: flex;
  margin-top: 1rem;
  gap: 0.5rem;
}

.comment-input {
  flex: 1;
}

.no-comments {
  color: #666;
  font-style: italic;
  padding: 0.5rem 0;
}
</style>
