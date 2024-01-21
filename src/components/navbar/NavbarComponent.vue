<template>
  <div class="grid grid-cols-2 gap-4 pt-2 pb-2">
    <nav class="pt-3.5 flex" >

      <router-link :to="userProfileLink" v-if="userRights">
        <img :src="profile_picture.img"  
              :alt="profile_picture.alt"
              class="w-10 h-10 rounded-full mx-8" 

        
        />
      </router-link>

      <router-link to="/">Home</router-link>
      
      <RouterLink to="/rooms" v-if="adminRights" class="mx-4"> Rooms</RouterLink>
      
      <RouterLink to="/movies" class="mx-4"> Movies</RouterLink>
      
      <router-link to="/about" class="mx-4"> About</router-link>
      
      <router-link to="/help" class="mx-4"> Help</router-link>
      
      <router-link to="/imprint" class="mx-4"> Imprint</router-link>
      <router-link to="/profiles" v-if="adminRights" class="mx-4">Profiles</router-link>
    </nav>
    <div class="pt-2">
      <button class="btn-blue" v-if="!userRights" @click="registerBtnClickHandler()">register</button>
      &nbsp;

      <button @click="logout()" v-if="userRights" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">logout</button>
      <button @click="loginBtnClickHandler()" v-else >login</button>
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
import { sufficientRole } from "@/composables/roles";
import {UserService} from "@/services/UserService";

const userData = useUserStore();
const userService = new UserService(userData);
const userProfileLink = computed(() => {if(userData.userId.length > 3) return `/profile/${userData.userId}`; return "/"});

// role rights
const adminRights = computed(() => {const res = sufficientRole("ROLE_ADMIN", userData.role); return res;});
const userRights = computed(() => {const res = sufficientRole("ROLE_USER", userData.role); return res;});
const profile_picture = computed(() => {return userService.getImageLink();});

// state
const registerShowState = ref(false);
const loginShowState = ref(false);
const showUserModel = ref(false);
const errorMessage = ref("");
const currentError = ref(false)
//const isLoggedIn = computed(() => {if(userData.userId === ""){return false;} return true;})

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


const logout = () => {
  userData.logout();
  router.push({path: "/"})
}

</script>

<script>
//import RegisterComponent from "../forms/registration/RegisterComponent.vue";
import RegisterComponent from "../forms/registration/RegisterComponent.vue";
import LoginComponent from "../forms/login/LoginComponent.vue"
import UpdateUserComponent from "../forms/UpdateUserComponent.vue"
import ErrorModal from "../error/ErrorModal.vue";
import router from "@/router";

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