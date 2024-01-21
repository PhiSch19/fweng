<template>
    <NavbarComponent/>
    <div v-if="!authorized" ><UnauthComponent /></div>
    <div v-else>
      <h1>Profile</h1>
      <!--
      <div>
        <div class="flex">
          <div>
            <img :src="profile_picture.img"  
                :alt="profile_picture.alt"
                class="profilePictureBig" 
            />
            <div>role: {{ userData.role }}</div>
 
            <button v-if="isAdmin" class="focus:outline-none text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-900">deactivate</button>
          
            <button class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">delete</button>
           
          
          </div>

          <div>
          <form class="flex-row">
            <label>firstName: </label>
            <input v-model="userData.firstName">
            <button type="submit">update</button>
          </form>
          <form class="flex-row">
            <label>lastName: </label>
            <input v-model="userData.lastName">
            <button type="submit">update</button>
          </form>
          <form class="flex-row">
            <label class="text-left">email: </label>
            <input v-model="userData.email">
            <button type="submit">update</button>
          </form>
          <form class="flex-row">
            <label>userName: </label>
            <input v-model="userData.userName">
            <button type="submit">update</button>
          </form>
        </div>


      </div>
      -->
    
      <UserPatchComponent />

    </div>

    
  </template>
  
  <script setup>
  import {ref, computed, provide} from "vue";
  import { useRoute } from 'vue-router'
  import { useUserStore } from "@/store/userStore";
  import { sufficientRole } from "@/composables/roles";
  // this .env stuff is not working. I have no Idea why. sucks...
  
  const route = useRoute();
  const userData = useUserStore();
  const authorized = computed(() =>{if (sufficientRole("ROLE_ADMIN", userData.role) || userData.userId === route.params.userId){return true;} return false; })
 
  const showUserModel = ref(false);
  provide("showUserComponent", showUserModel);
   
</script>
  
<script>
  import UnauthComponent from "@/components/error/UnauthComponent.vue";
  import NavbarComponent from "@/components/navbar/NavbarComponent.vue";
  import UserPatchComponent from "@/components/UserDetails/UserPatchComponent.vue";
  
  
  export default {
    name: 'ProfilePage',
    components: {
      NavbarComponent,
      UnauthComponent,
      UserPatchComponent
  
    }
  }
</script>
  