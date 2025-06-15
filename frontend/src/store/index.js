import { createStore } from 'vuex';
import api from '../services/api';

export default createStore({
  state: {
    user: null,
    posts: [],
    isAuthenticated: false,
    allPosts: [],
    users: [],
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.isAuthenticated = !!user;
    },
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    SET_ALL_POSTS(state, posts) {
      state.allPosts = posts;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    ADD_POST(state, post) {
      state.posts.unshift(post);
      state.allPosts.unshift(post);
    },
    UPDATE_POST(state, updatedPost) {
      // Update in posts array
      const postIndex = state.posts.findIndex(p => p._id === updatedPost._id);
      if (postIndex !== -1) {
        state.posts.splice(postIndex, 1, updatedPost);
      }
      
      // Update in allPosts array
      const allPostIndex = state.allPosts.findIndex(p => p._id === updatedPost._id);
      if (allPostIndex !== -1) {
        state.allPosts.splice(allPostIndex, 1, updatedPost);
      }
    },
    LOGOUT(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.posts = [];
      state.allPosts = [];
      state.users = [];
    },
    UPDATE_USER_FOLLOWING(state, { userId, isFollowing }) {
      if (!state.user.following) {
        state.user.following = [];
      }
      
      if (isFollowing) {
        if (!state.user.following.includes(userId)) {
          state.user.following.push(userId);
        }
      } else {
        state.user.following = state.user.following.filter(id => id !== userId);
      }
    }
  },
  actions: {
    async initializeAuth({ commit }) {
      // Check if token exists and validate it
      const token = localStorage.getItem('access_token');
      if (!token) return;
      
      try {
        // Validate the token by getting user profile
        const userProfileResponse = await api.get('/users/profile');
        commit('SET_USER', userProfileResponse.data);
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        // Token is invalid or expired, clear it
        localStorage.removeItem('access_token');
      }
    },

    async login({ commit }, credentials) {
      try {
        const response = await api.post('/auth/login', credentials);
        const { access_token, user } = response.data;
        
        // Set token
        localStorage.setItem('access_token', access_token);
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        
        // Get complete user profile
        const userProfileResponse = await api.get('/users/profile');
        commit('SET_USER', { ...user, ...userProfileResponse.data });
        
        return { success: true };
      } catch (error) {
        localStorage.removeItem('access_token');
        return { success: false, error: error.response?.data?.message || 'Login failed' };
      }
    },
    async signup({ commit }, userData) {
      try {
        const response = await api.post('/auth/signup', userData);
        const { access_token, user } = response.data;
        localStorage.setItem('access_token', access_token);
        commit('SET_USER', user);
        return { success: true };
      } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Signup failed' };
      }
    },
    async createPost({ commit }, postData) {
      try {
        const response = await api.post('/posts', postData);
        commit('ADD_POST', response.data);
        return { success: true };
      } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Failed to create post' };
      }
    },
    async fetchTimeline({ commit }) {
      try {
        const response = await api.get('/posts/timeline');
        commit('SET_POSTS', response.data);
      } catch (error) {
        console.error('Failed to fetch timeline:', error);
      }
    },
    async fetchAllPosts({ commit }) {
      try {
        const response = await api.get('/posts/all');
        commit('SET_ALL_POSTS', response.data);
      } catch (error) {
        console.error('Failed to fetch all posts:', error);
      }
    },
    async fetchUsers({ commit }) {
      try {
        const response = await api.get('/users');
        commit('SET_USERS', response.data);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch users:', error);
        return [];
      }
    },
    async likePost({ commit }, postId) {
      try {
        const response = await api.post(`/posts/${postId}/like`);
        commit('UPDATE_POST', response.data);
      } catch (error) {
        console.error('Failed to like post:', error);
        throw error;
      }
    },
    async unlikePost({ commit }, postId) {
      try {
        const response = await api.delete(`/posts/${postId}/like`);
        commit('UPDATE_POST', response.data);
      } catch (error) {
        console.error('Failed to unlike post:', error);
        throw error;
      }
    },
    async addComment({ commit }, { postId, text }) {
      try {
        const response = await api.post(`/posts/${postId}/comments`, { text });
        commit('UPDATE_POST', response.data);
      } catch (error) {
        console.error('Failed to add comment:', error);
        throw error;
      }
    },
    async followUser({ commit }, userId) {
      try {
        await api.post(`/follow/${userId}`);
        commit('UPDATE_USER_FOLLOWING', { userId, isFollowing: true });
      } catch (error) {
        console.error('Failed to follow user:', error);
        throw error;
      }
    },
    async unfollowUser({ commit }, userId) {
      try {
        await api.delete(`/follow/${userId}`);
        commit('UPDATE_USER_FOLLOWING', { userId, isFollowing: false });
      } catch (error) {
        console.error('Failed to unfollow user:', error);
        throw error;
      }
    },
    logout({ commit }) {
      localStorage.removeItem('access_token');
      api.defaults.headers.common['Authorization'] = '';
      commit('LOGOUT');
    },
  },
});
