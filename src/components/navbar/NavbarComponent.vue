<script setup>
/* component state management. Frontend only reacts to state variables marked via ref */
import {provide, ref} from "vue";

// state
const registerShowState = ref(false);
const loginShowState = ref(false);
const errorMessage = ref("");
const currentError = ref(false)
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


</script>

<template>
  <div class="grid grid-cols-2 gap-4 pt-2 pb-2">
    <nav class="pt-3.5">
      <router-link to="/">Home</router-link>
      |
      <RouterLink to="/rooms">Rooms</RouterLink>
      |
      <RouterLink to="/movies">Movies</RouterLink>
      |
      <router-link to="/about">About</router-link>
      |
      <router-link to="/help">Help</router-link>
      |
      <router-link to="/imprint">Imprint</router-link>
    </nav>
    <div class="pt-2">
      <button class="btn-blue" @click="registerBtnClickHandler()">register</button>
      &nbsp;
      <button @click="loginBtnClickHandler()">login</button>
    </div>
  </div>

  <RegisterComponent v-if="registerShowState" class="modal"/>
  <LoginComponent v-if="loginShowState" class="modal"/>
  <ErrorModal v-if="currentError" :errorMessage="errorMessage"/>
</template>

<script>
import RegisterComponent from "../registration/RegisterComponent.vue";
import LoginComponent from "../login/LoginComponent.vue"
import ErrorModal from "../error/ErrorModal.vue";

export default {
  name: "NavbarComponent",
  components: {
    RegisterComponent,
    LoginComponent,
    ErrorModal

  }
}
</script>