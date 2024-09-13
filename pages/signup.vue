<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 class="text-2xl font-bold mb-6 text-center">Create an Account</h1>
        <form @submit.prevent="signUp">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
            <input v-model="form.name" type="text" id="name" class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input v-model="form.email" type="email" id="email" class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input v-model="form.password" type="password" id="password" class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
          <div class="mb-6">
            <button type="submit" class="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
              Create Account
            </button>
          </div>
          <p class="text-center text-gray-500">Already have an account? <nuxt-link to="/login" class="text-blue-500 hover:underline">Log in</nuxt-link></p>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useApi } from '@/composables/useApi';  // Create this composable to handle API requests
  
  const form = ref({ name: '', email: '', password: '' });
  const router = useRouter();
  const { api } = useApi();  // Custom API composable for backend interaction
  
  const signUp = async () => {
    try {
      const { data } = await api.post('/auth/register', form.value);
      localStorage.setItem('token', data.token);  // Save the JWT token
      router.push('/');  // Redirect to the index page after signup
    } catch (error) {
      console.error(error);
      alert('Error creating account. Please try again.');
    }
  };
  </script>
  
  <style scoped>
  /* Additional styles for making the page look beautiful */
  </style>
  