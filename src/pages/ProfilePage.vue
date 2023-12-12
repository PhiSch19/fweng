<template>
    <NavbarComponent/>
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
   
  </template>
  
  <script setup>
  import { useUserStore } from "@/store/userStore";
  // this .env stuff is not working. I have no Idea why. sucks...
  import {ref, provide} from "vue";
  
  const userData = useUserStore();
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
  import NavbarComponent from "../components/navbar/NavbarComponent.vue";
  import UpdateUserComponent from "../components/forms/UpdateUserComponent.vue"
  
  export default {
    name: 'ProfilePage',
    components: {
      NavbarComponent,
      UpdateUserComponent,
  
    }
  }
  </script>
  