<template>
    <NavbarComponent/>
    <div v-if="!authorized" ><UnauthComponent /></div>
    <div v-else>
      <h1>Profile <button @click="userBtnClickHandler()">update</button></h1>
      
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
          <!--TABLE APPROACH-->
          <!--
          <table>
            <tr>
              <td class="block uppercase tracking-wide text-gray-700 text-l mt-2 font-bold ">firstName</td><td>{{ userData.firstName }}</td><td><button type="submit">update</button></td>
            </tr>

            <tr>
              <td>lastName</td><td>{{ userData.lastName }}</td><td><button type="submit">update</button></td>
            </tr>
            <tr>
              <td>email</td><td>{{ userData.email }}</td><td><button type="submit">update</button></td>
            </tr>
            <tr>
              <td>userName</td><td>{{ userData.username}}</td><td><button type="submit">update</button></td>
            </tr>
            <tr>
              <td>salutation</td><td>{{ userData.gender }}</td><td><button type="submit">update</button></td>
            </tr>
            <tr>
            <td>country</td><td>{{ userData.country }}</td><td><button type="submit">update</button></td>
            </tr>
            <tr v-if="isAdmin">
              <td>role</td><td>{{ userData.role }}</td><td><button type="submit">update</button></td>
            
            </tr>


          </table>
          -->

          <!--FORM APPROACH-->
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
      
      <UpdateUserComponent v-if="showUserModel" class="modal" />
    </div>
    </div>
    <UserPatchComponent />
  </template>
  
  <script setup>
  import {ref, computed, provide} from "vue";
  import { useUserStore } from "@/store/userStore";
  import { sufficientRole } from "@/composables/roles";
  import { UserService } from "@/services/UserService";
  // this .env stuff is not working. I have no Idea why. sucks...
  
  
  const userData = useUserStore();
  const userService = new UserService(userData);
  const authorized = computed(() => {return sufficientRole("ROLE_USER", userData.role)});
  const isAdmin = computed(() => {return sufficientRole("ROLE_ADMIN", userData.role)});
  const profile_picture = computed(() => {return userService.getImageLink();});



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
  import UserPatchComponent from "@/components/UserDetails/UserPatchComponent.vue";
  
  
  export default {
    name: 'ProfilePage',
    components: {
      NavbarComponent,
      UpdateUserComponent,
      UnauthComponent,
      UserPatchComponent
  
    }
  }
  </script>
  