<template>
  <Card class="post-card">
    <template #title>
      <div class="post-header">
        {{ post.title }}
      </div>
    </template>
    <template #subtitle>
      <div class="post-author">
        <i class="pi pi-user author-icon"></i> {{ post.authorUsername }}
      </div>
    </template>
    <template #content>
      <p class="post-description">{{ post.description }}</p>
      
      <div class="post-actions">
        <Button
          :class="{ 'liked': isLiked }"
          :icon="isLiked ? 'pi pi-heart-fill' : 'pi pi-heart'"
          class="like-button p-button-rounded p-button-text"
          @click="toggleLike"
        />
        <span class="like-count" :class="{ 'liked-count': isLiked }">
          {{ post.likes ? post.likes.length : 0 }}
        </span>
        
        <Button
          icon="pi pi-comment"
          class="p-button-rounded p-button-text comment-button"
          @click="toggleComments"
          badge-severity="info"
          :badge="post.comments ? post.comments.length.toString() : '0'"
        />
      </div>

      <transition name="slide">
        <div v-if="showComments" class="comments-section">
          <div class="comments-container">
            <div v-if="post.comments && post.comments.length > 0" class="comments-list">
              <div
                v-for="(comment, index) in post.comments"
                :key="index"
                class="comment"
                :style="{ animationDelay: index * 0.1 + 's' }"
              >
                <div class="comment-author">{{ comment.authorUsername }}</div>
                <div class="comment-text">{{ comment.text }}</div>
                <div class="comment-date">{{ formatDate(comment.createdAt) }}</div>
              </div>
            </div>
            <div v-else class="no-comments">
              <i class="pi pi-comments"></i>
              <p>No comments yet. Be the first to comment!</p>
            </div>
          </div>

          <div class="add-comment">
            <InputText
              v-model="newComment"
              placeholder="Write a comment..."
              class="comment-input"
              @keyup.enter="addComment"
            />
            <Button 
              icon="pi pi-send" 
              class="p-button-rounded send-comment-button" 
              @click="addComment"
              :disabled="!newComment.trim()"
            />
          </div>
        </div>
      </transition>

      <div class="post-meta">
        <small class="post-date">
          <i class="pi pi-calendar"></i> {{ formatDate(post.createdAt) }}
        </small>
      </div>
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
  margin-bottom: 2rem;
  transform-style: preserve-3d;
  transition: all 0.4s;
}

.post-header {
  font-size: 1.4rem;
  font-weight: 600;
}

.post-author {
  display: flex;
  align-items: center;
  color: #666;
  font-size: 0.9rem;
}

.author-icon {
  margin-right: 5px;
}

.post-description {
  margin: 1rem 0;
  line-height: 1.6;
}

.post-actions {
  display: flex;
  align-items: center;
  margin: 1rem 0;
  gap: 0.5rem;
}

.like-button, .comment-button {
  transition: transform 0.3s, color 0.3s;
}

.like-button:hover, .comment-button:hover {
  transform: scale(1.15);
}

.like-button.liked {
  color: #e53935;
}

.like-count {
  font-weight: 600;
  transition: color 0.3s;
}

.liked-count {
  color: #e53935;
}

.comments-section {
  margin-top: 1rem;
  border-top: 1px solid var(--card-border-light);
  padding-top: 1rem;
}

:deep(.dark-mode) .comments-section {
  border-top: 1px solid var(--card-border-dark);
}

.comments-container {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;
  padding-right: 5px;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comment {
  padding: 0.8rem;
  border-radius: 8px;
  background-color: var(--hover-color-light);
  animation: commentFadeIn 0.5s ease forwards;
  opacity: 0;
  transform: translateY(10px);
}

:deep(.dark-mode) .comment {
  background-color: var(--hover-color-dark);
}

.comment-author {
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.comment-text {
  line-height: 1.4;
}

.comment-date {
  font-size: 0.8rem;
  color: #888;
  margin-top: 0.5rem;
}

.add-comment {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.comment-input {
  flex: 1;
}

.send-comment-button {
  transition: transform 0.3s;
}

.send-comment-button:hover:not(:disabled) {
  transform: scale(1.1) rotate(15deg);
}

.no-comments {
  text-align: center;
  color: #888;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.no-comments i {
  font-size: 2rem;
  opacity: 0.6;
}

.post-meta {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

.post-date {
  color: #888;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

/* Animations */
@keyframes commentFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-20px);
}

/* Responsive styles */
@media (max-width: 768px) {
  .post-header {
    font-size: 1.2rem;
  }
  
  .post-description {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .post-actions {
    margin: 0.75rem 0;
  }
  
  .comments-container {
    max-height: 250px;
  }
  
  .comment {
    padding: 0.6rem;
  }
}
</style>
