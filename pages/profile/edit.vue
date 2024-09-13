<template>
    <div class="container mx-auto py-8">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-4">Edit Profile</h1>
        <form @submit.prevent="updateProfile">
          <div class="mb-4">
            <label class="block text-gray-700">Profile Picture</label>
            <input type="file" @change="onFileChange" class="mt-2"/>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Bio</label>
            <textarea v-model="bio" class="w-full p-3 border rounded-md mt-2"></textarea>
          </div>
          <div class="text-right">
            <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useApi } from '@/composables/useApi';
  import { useRouter } from 'vue-router';
  
  const { api } = useApi();
  const router = useRouter();
  const bio = ref('');
  const avatar = ref(null);
  
  // Function to handle file input for the avatar
  const onFileChange = (event) => {
    avatar.value = event.target.files[0];
  };
  
  // Function to update profile
  const updateProfile = async () => {
    const formData = new FormData();
    formData.append('bio', bio.value);
    if (avatar.value) {
      formData.append('avatar', avatar.value);
    }
  
    try {
      await api.put('/profile/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      router.push('/profile');
    } catch (error) {
      console.error(error);
    }
  };
  </script>
  