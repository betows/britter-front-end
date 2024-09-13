<template>
    <div class="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <!-- Sidebar -->
      <Sidebar />
  
      <!-- Main Content -->
      <main class="w-full lg:w-3/5 px-6 py-4">
        <Header />
  
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div class="flex items-center space-x-4">
            <!-- User Avatar and Bio -->
            <img :src="user.avatar || '/default-avatar.png'" alt="Avatar" class="w-24 h-24 rounded-full">
            <div>
              <h1 class="text-2xl font-bold">{{ user.name }}</h1>
              <p class="text-gray-500 dark:text-gray-300">{{ user.bio }}</p>
            </div>
          </div>
        </div>
  
        <!-- Tabs for tweets -->
        <div class="mt-6">
          <div class="border-b border-gray-200 dark:border-gray-600">
            <ul class="flex">
              <li class="mr-6">
                <button @click="activeTab = 'posted'" class="pb-2 text-lg font-semibold text-gray-800 dark:text-white border-b-2" :class="{'border-green-500': activeTab === 'posted'}">
                  Posted Tweets
                </button>
              </li>
              <li class="mr-6">
                <button @click="activeTab = 'liked'" class="pb-2 text-lg font-semibold text-gray-800 dark:text-white border-b-2" :class="{'border-green-500': activeTab === 'liked'}">
                  Liked Tweets
                </button>
              </li>
              <li class="mr-6">
                <button @click="activeTab = 'reposted'" class="pb-2 text-lg font-semibold text-gray-800 dark:text-white border-b-2" :class="{'border-green-500': activeTab === 'reposted'}">
                  Reposted Tweets
                </button>
              </li>
            </ul>
          </div>
  
          <!-- Tweets List -->
          <div v-if="activeTab === 'posted'" class="mt-4">
            <div v-for="tweet in postedTweets" :key="tweet._id" class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
              <p>{{ tweet.content }}</p>
            </div>
          </div>
          <div v-if="activeTab === 'liked'" class="mt-4">
            <div v-for="tweet in likedTweets" :key="tweet._id" class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
              <p>{{ tweet.content }}</p>
            </div>
          </div>
          <div v-if="activeTab === 'reposted'" class="mt-4">
            <div v-for="tweet in repostedTweets" :key="tweet._id" class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
              <p>{{ tweet.content }}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import Sidebar from '@/components/Sidebar.vue';
  import SiteHeader from '@/components/SiteHeader.vue';
  import { useApi } from '@/composables/useApi';
  
  const { api } = useApi();
  const user = ref({});
  const postedTweets = ref([]);
  const likedTweets = ref([]);
  const repostedTweets = ref([]);
  const activeTab = ref('posted');
  const route = useRoute(); // Get the user ID from the route
  
  // Fetch user profile and tweets on mount
  onMounted(async () => {
    try {
      const { data } = await api.get(`/profile/${route.params.id}`); // Fetch using the correct ID from the route params
      user.value = data.user;
      postedTweets.value = data.tweets;  // Assuming backend provides posted tweets
      likedTweets.value = data.likedTweets;  // Assuming backend provides liked tweets
      repostedTweets.value = data.repostedTweets;  // Assuming backend provides reposted tweets
    } catch (error) {
      console.error(error);
    }
  });
  </script>
  