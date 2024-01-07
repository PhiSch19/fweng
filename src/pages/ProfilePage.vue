<template>
    <NavbarComponent/>
    <div v-if="!authorized" ><UnauthComponent /></div>
    <div v-else>
      <h1>Profile <button @click="userBtnClickHandler()">update</button></h1>
      <div>
        <div>firstName: {{ userData.firstName }}</div>
        <div>lastName: {{ userData.lastName }}</div>
        <div>username: {{ userData.username }}</div>
        <div>email: {{ userData.email }}</div>
        <div>gender: {{ userData.gender }}</div>
        <div>role: {{ userData.role }}</div>
        <div>country: {{ userData.country }}</div>
      </div>
      <UpdateUserComponent v-if="showUserModel" class="modal" />
    </div>
  </template>
  
  <script setup>
  import {ref, computed, provide} from "vue";
  import { useUserStore } from "@/store/userStore";
  import { sufficientRole } from "@/composables/roles";
  // this .env stuff is not working. I have no Idea why. sucks...
  
  
  const userData = useUserStore();
  const authorized = computed(() => {return sufficientRole("ROLE_USER", userData.role)});


  const showUserModel = ref(false);
  provide("showUserComponent", showUserModel);
  const userBtnClickHandler = () => {
  console.log("clicked")
  if (showUserModel.value) {
    showUserModel.value = false;
  } else {
    showUserModel.value = true;
  }
}



  /*
  username = ref(useUserStore.username);
  role = ref(useUserStore.role);
  */
  
  </script>
  
  <script>
  import UnauthComponent from "@/components/error/UnauthComponent.vue";
  import NavbarComponent from "../components/navbar/NavbarComponent.vue";
  import UpdateUserComponent from "../components/forms/UpdateUserComponent.vue";
  
  
  export default {
    name: 'ProfilePage',
    components: {
      NavbarComponent,
      UpdateUserComponent,
      UnauthComponent,
  
    }
  }
  </script>
  