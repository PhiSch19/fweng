<template>
  <div class="grid grid-cols-2 gap-4 pt-2 pb-2">
    <nav class="pt-3.5 flex" >
      <img v-if="isLoggedIn" src="../../assets/default_cover.jpg"  class="w-10 h-10 rounded-full mx-8" 
      @click="userBtnClickHandler()"
      
      />

      <router-link to="/">Home</router-link>
      
      <RouterLink to="/rooms" v-if="userData.isAdmin()" class="mx-4"> Rooms</RouterLink>
      
      <RouterLink to="/movies" class="mx-4"> Movies</RouterLink>
      
      <router-link to="/about" class="mx-4"> About</router-link>
      
      <router-link to="/help" class="mx-4"> Help</router-link>
      
      <router-link to="/imprint" class="mx-4"> Imprint</router-link>
    </nav>
    <div class="pt-2">
      <button class="btn-blue" @click="registerBtnClickHandler()">register</button>
      &nbsp;

      <button @click="userData.logout()" v-if="isLoggedIn">logout</button>
      <button @click="loginBtnClickHandler()" v-else>login</button>
    </div>
  </div>

  
  <RegisterComponent v-if="registerShowState" class="modal"/>
  <LoginComponent v-if="loginShowState" class="modal"/>
  <UpdateUserComponent v-if="showUserModel" class="modal" />
  <ErrorModal v-if="currentError" :errorMessage="errorMessage"/>
</template>



<script setup>
/* component state management. Frontend only reacts to state variables marked via ref */
import {provide, ref, computed} from "vue";
import { useUserStore } from "@/store/userStore";
const userData = useUserStore();

// state
const registerShowState = ref(false);
const loginShowState = ref(false);
const showUserModel = ref(false);
const errorMessage = ref("");
const currentError = ref(false)
const isLoggedIn = computed(() => {if(userData.userId === ""){return false;} return true;})

//error Handler
const errorHandler = async (e) => {
  errorMessage.value = e;
  currentError.value = true;
  setTimeout(() => {
    currentError.value = false;
    errorMessage.value = "";
  }, 3000);
}
provide("errors", errorHandler);
provide("showRegisterComponent", registerShowState);
provide("showLoginComponent", loginShowState);
provide("showUserComponent", showUserModel);

// event handlers
const registerBtnClickHandler = () => {
  console.log("Event: plusBtn was clicked")
  if (registerShowState.value) {
    registerShowState.value = false;
  } else {
    loginShowState.value = false;
    registerShowState.value = true;
  }
}

const loginBtnClickHandler = () => {
  console.log("Event: plusBtn was clicked")
  if (loginShowState.value) {
    loginShowState.value = false;
  } else {
    loginShowState.value = true;
    registerShowState.value = false;
  }
}


const userBtnClickHandler = () => {
  console.log("clicked")
  if (showUserModel.value) {
    showUserModel.value = false;
  } else {
    showUserModel.value = true;
  }
}

</script>



<script>
import RegisterComponent from "../forms/registration/RegisterComponent.vue";
import LoginComponent from "../forms/login/LoginComponent.vue"
import UpdateUserComponent from "../forms/UpdateUserComponent.vue"
import ErrorModal from "../error/ErrorModal.vue";

export default {
  name: "NavbarComponent",
  components: {
    RegisterComponent,
    LoginComponent,
    UpdateUserComponent,
    ErrorModal
  }
}
</script>