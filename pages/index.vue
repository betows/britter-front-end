<template>
    <div class="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <!-- Sidebar -->
      <Sidebar />
  
      <!-- Main Content -->
      <main class="w-full lg:w-3/5 px-6 py-4 bg-gray-50 dark:bg-gray-900">
        <SiteHeader />
        <!-- Tweet Creation Form -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-b-lg shadow-md mb-6">
          <form @submit.prevent="postTweet">
            <textarea v-model="tweetContent" placeholder="What's happening?" class="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none" rows="3"></textarea>
            <div class="text-right mt-2">
              <button type="submit" class="bg-green-500 dark:bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">
                Post
              </button>
            </div>
          </form>
        </div>
        
        <!-- Tweet Feed -->
        <div v-for="tweet in tweets" :key="tweet._id" class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-4">
          <div class="flex items-start space-x-4">
            <img :src="tweet.user.avatar || '/default-avatar.png'" alt="Avatar" class="w-12 h-12 rounded-full cursor-pointer">
            <div class="flex-1">
              <div class="flex justify-between">
                <div>
                  <h4 class="font-semibold text-gray-800 dark:text-white">
                    <NuxtLink :to="`/profile/${tweet.user._id}`">{{ tweet.user.name }}</NuxtLink>
                  </h4>
                  <p class="text-gray-500 dark:text-gray-400 text-sm">@{{ tweet.user.username }}</p>
                </div>
                <div class="flex items-center space-x-4">
                  <button @click="retweet(tweet._id)" class="text-green-600 hover:text-green-500 flex items-center space-x-1">
                    <RefreshIcon class="w-5 h-5"/> <span>Repost</span>
                  </button>
                  <button @click="likeTweet(tweet._id)" class="text-red-600 hover:text-red-500 flex items-center space-x-1">
                    <HeartIcon class="w-5 h-5"/> <span>Like ({{ tweet.likes.length }})</span>
                  </button>
                </div>
              </div>
              <p class="mt-2 text-gray-700 dark:text-gray-200">{{ tweet.content }}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>  
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useApi } from '@/composables/useApi';
  import Sidebar from '@/components/Sidebar.vue';
  import SiteHeader from '~/components/SiteHeader.vue';
  import { HomeIcon, SearchIcon, BellIcon, UserIcon, LogoutIcon, SunIcon, MoonIcon , HeartIcon, RefreshIcon} from '@heroicons/vue/solid';  
  const router = useRouter();
  const { api } = useApi();
  const tweetContent = ref('');
  const tweets = ref([]);
  
  // Fetch tweets
  onMounted(async () => {
    await fetchTweets();
  });
  
  const fetchTweets = async () => {
    try {
      const { data } = await api.get('/tweet/feed');
      tweets.value = data;
      localStorage.setItem('user', JSON.stringify(tweets.value[0].user._id));
    } catch (error) {
      console.error(error);
    }
  };

  let userId = tweets.value.map(tweet => tweet.user._id);
  
  
  // Post a new tweet
  const postTweet = async () => {
    if (!tweetContent.value) return alert('Tweet cannot be empty');
    try {
      await api.post('/tweet/create', { content: tweetContent.value });
      tweetContent.value = '';
      await fetchTweets();
    } catch (error) {
      console.error(error);
    }
  };
  
  // Like a tweet
  const likeTweet = async (tweetId) => {
    try {
      await api.post(`/tweet/like/${tweetId}`);
      await fetchTweets();
    } catch (error) {
      console.error(error);
    }
  };
  
  // Retweet
  const retweet = async (tweetId) => {
    try {
      await api.post(`/tweet/retweet/${tweetId}`);
      await fetchTweets();
    } catch (error) {
      console.error(error);
    }
  };
  
  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  // Theme toggle logic
const toggleTheme = () => {
  const html = document.documentElement;
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
};

// Set the initial theme from localStorage
const setInitialTheme = () => {
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.classList.toggle('dark', theme === 'dark');
};

onMounted(() => {
  setInitialTheme();
});
  </script>
  
  <style scoped>
  /* Add some additional styling here */
  </style>
  