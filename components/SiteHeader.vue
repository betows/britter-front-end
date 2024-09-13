<template>
  <div class="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
    <div v-if="user" class="flex items-center space-x-4">
      <!-- User Avatar -->
      <img :src="'/default-avatar.png'" alt="Avatar" class="w-10 h-10 rounded-full">
      <h1 class="text-xl font-bold text-gray-800 dark:text-white">{{ user.name }}</h1>
    </div>

    <!-- Search Bar -->
    <div class="w-1/3">
      <input
        v-model="searchQuery"
        @keyup.enter="search"
        placeholder="Search for users or tweets..."
        class="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
      />
    </div>

    <!-- Notification Icon -->
    <div class="relative">
      <BellIcon class="w-6 h-6 text-gray-800 dark:text-white cursor-pointer" @click="goToNotifications"/>
      <span v-if="notifications.length" class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
        {{ notifications.length }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { BellIcon } from '@heroicons/vue/solid';
import { useApi } from '@/composables/useApi';

const searchQuery = ref('');
const notifications = ref([]);
const user = ref({});  // Fetch the logged-in user details

const { api } = useApi();
const router = useRouter();

// Fetch user data from localStorage
onMounted(() => {
  // Retrieve the user object from localStorage
  const storedUser = localStorage.getItem('user');
  
  if (storedUser) {
    // Parse the user object to get the ID
    const parsedUser = JSON.parse(storedUser);
    user.value = parsedUser;

    // Fetch the user profile using the correct ID
    const getUser = async () => {
      try {
        const { data } = await api.get(`/profile/${parsedUser}`);  // Ensure you're using the correct ID field
        user.value = data.user;
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }
});

// Search function
const search = async () => {
  if (searchQuery.value) {
    try {
      const { data } = await api.get(`/search?q=${searchQuery.value}`);
      console.log('Search results:', data);
    } catch (error) {
      console.error(error);
    }
  }
};

// Fetch notifications
onMounted(async () => {
  try {
    const { data } = await api.get('/notifications');  
    notifications.value = data;
  } catch (error) {
    console.error(error);
  }
});

const goToNotifications = () => {
  router.push('/notifications');
};
</script>
