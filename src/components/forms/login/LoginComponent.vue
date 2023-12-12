<template>
  <!--<div class="modal">  -->
  <form @submit.prevent="submitForm" class="modal">
    <h1>Login</h1>

    <div class="grid grid-cols-2">
      <label for="email" type="email">Email: </label>
      <input id="email" type="text"
             :value="email"
             @input="event => email = event.target.value"
      />

      <label for="password">Password: </label>
      <input id="password" type="password"
             :value="password"
             @input="event => password = event.target.value"
      />

      <button class="col-span-2 pl-1 pr-1" type="submit" @click="handleLoginBtnClick()">login</button>
    </div>
  </form>
  <!--</div> -->
</template>

<script setup>
import {inject, ref} from "vue";
import { useUserStore } from "@/store/userStore";
const apiAuthenticateUrl = "http://localhost:8081/user/token";

const userData = useUserStore();

const showComp = inject("showLoginComponent");
const errorHandler = inject("errors");

const email = ref("");
const password = ref("");

async function handleLoginBtnClick() {
  const body = {username: email.value, password: password.value};
  try {
    const token_response = await login(body);
    showComp.value = false;
  } catch (e) {
    await errorHandler(e);
  }
}


const login = async (body) => {
  console.log(body)
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
}



</script>

<script>
export default {
  name: "LoginComponent"
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