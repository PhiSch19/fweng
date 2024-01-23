<template>
  <!--<div class="modal">  -->
  <form @submit.prevent="submitForm" class="modal">
    <h1>Login</h1>
    <div class="grid grid-cols-2">
    <label for="userName">UserName: </label>
      <TextInputComponent 
        v-model:value="userName"
        v-model:satisfied="userNameSatisfied"
        id="userName"
        name="user name"
        :isRequired="false"
        :requiredLength="0"
      />
      <label for="password">Password: </label>
      <PasswordInputComponent 
          v-model:value="password"
          v-model:satisfied="passwordSatisfied"
          id="password"
          name="password"
          :isRequired="false"
          :requiredLength="0"
      />

      <button class="col-span-2 pl-1 pr-1" type="submit" @click="handleLoginBtnClick()">login</button>
    </div>
  </form>
  <!--</div> -->
</template>

<script setup>
import {inject, ref} from "vue";
import { useUserStore } from "@/store/userStore";
import {UserService} from "@/services/UserService";
const apiAuthenticateUrl = "http://localhost:8081/user/token";

const userData = useUserStore();
const userService = new UserService(userData);

const showComp = inject("showLoginComponent");
const errorHandler = inject("errors");

const userName = ref("");
const userNameSatisfied = ref(true);
const password = ref("");
const passwordSatisfied = ref(true);

async function handleLoginBtnClick() {
  const body = {username: userName.value, password: password.value};
  try {
    const token_response = await login(body);
    showComp.value = false;
  } catch (e) {
    await errorHandler(e);
  }
}


const login = async (body) => {
  const response = await fetch(apiAuthenticateUrl, {
    method: "POST",
    headers: {"content-type": "application/json",},
    body: JSON.stringify(body)
  })
  if (response.status !== 200) {
    throw new Error("Could not authenticate.");
  }
  const json_response = await response.json();
  userData.setToken(json_response);
  await userService.fillStoreFromApi();
}



</script>

<script>
import TextInputComponent from "@/components/atoms/TextInputComponent.vue";
import PasswordInputComponent from "@/components/atoms/PasswordInputComponent.vue";
export default {
  name: "LoginComponent",
  components: {TextInputComponent,
              PasswordInputComponent,
  }
}

</script>
<style scoped>
.modal {
  position: absolute;
  top: 25%;
  left: 40%;
  background-color: white;
  height: 10rem;
  width: 20%;
  border: black solid 2px;
  border-radius: 5px;
}

</style>