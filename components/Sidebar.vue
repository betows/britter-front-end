<template>
    <aside class="w-1/5 bg-white dark:bg-gray-800 p-6 hidden lg:block">
      <div class="mb-10">
        <h1 class="text-3xl font-bold text-green-500 dark:text-green-300">Britter</h1>
      </div>
      <nav>
        <ul class="space-y-6">
          <li><NuxtLink to="/" class="text-xl font-semibold text-gray-800 dark:text-white flex items-center space-x-2"><HomeIcon class="w-5 h-5"/> Home</NuxtLink></li>
          <li><NuxtLink to="/explore" class="text-xl font-semibold text-gray-800 dark:text-white flex items-center space-x-2"><SearchIcon class="w-5 h-5"/> Explore</NuxtLink></li>
          <li><NuxtLink to="/notifications" class="text-xl font-semibold text-gray-800 dark:text-white flex items-center space-x-2"><BellIcon class="w-5 h-5"/> Notifications</NuxtLink></li>
          <!-- Dynamic link to user's profile -->
          <li><NuxtLink to="/profile" class="text-xl font-semibold text-gray-800 dark:text-white flex items-center space-x-2"><UserIcon class="w-5 h-5"/> Profile</NuxtLink></li>
          <li><button @click="logout" class="text-xl font-semibold text-red-500 dark:text-red-400 flex items-center space-x-2"><LogoutIcon class="w-5 h-5"/> Logout</button></li>
        </ul>
      </nav>
    </aside>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { HomeIcon, SearchIcon, BellIcon, UserIcon, LogoutIcon } from '@heroicons/vue/solid';
  import { useRouter } from 'vue-router';
  
  // Get the user's ID from the local token or API
  
  const router = useRouter();
  
  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };
  </script>
  