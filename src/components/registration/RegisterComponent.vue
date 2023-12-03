<template>
  <div class="modal">
    <h1>Register</h1>
    <div class="grid grid-cols-2 gap-2">
      <label class="text-right pr-3" for="firstName">First Name: </label>
      <input id="firstName" type="text"
             :value="firstName"
             @input="event => firstName = event.target.value"
      />

      <label class="text-right pr-3" for="lastName">Last Name: </label>
      <input id="lastName" type="text"
             :value="lastName"
             @input="event => lastName = event.target.value"
      />

      <label class="text-right pr-3" for="email" type="email">Email: </label>
      <input id="email" type="email"
             :value="email"
             @input="event => email = event.target.value"
      />

      <label class="text-right pr-3" for="dob">Birthdate: </label>
      <input id="dob" type="date"
             :value="dob"
             @input="event => dob = event.target.value"
      />

      <label class="text-right pr-3" for="password">Password: </label>
      <input id="password" type="password"
             :value="password"
             @input="event => password = event.target.value"
      />

      <button class="col-span-2" type="submit" @click="handleRegister()">register</button>
    </div>
  </div>
</template>

<script setup>
import {inject, ref} from "vue";
import { useUserStore } from "@/store/userStore";
//const apiUrl = process.env.VUE_APP_REGISTER_API_URL;
const apiRegisterUrl = "http://localhost:8081/user/register"
const apiAuthenticateUrl = "http://localhost:8081/user/token"
const showComp = inject("showRegisterComponent")
const errorHandler = inject("errors");
const userData = useUserStore()

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const dob = ref("")
const password = ref("");

const handleRegister = async () => {
  const body = {
    //firstName: firstName.value,
    //lastName: lastName.value,
    username: email.value,
    //dob: dob.value,
    password: password.value
  }
  try {
    // register new user
    const registered = await register(body);
    // if user was registered successfully use that to login user
    const tokenResponse = await login(body)
    showComp.value = false;

  } catch (e) {
    errorHandler(e);
  }


}

const register = async (body) => {
  const response = await fetch(apiRegisterUrl, {
    method: "POST",
    headers: {"content-type": "application/json",},
    body: JSON.stringify(body)
  })
  if (response.status !== 201) {
    throw new Error("Could not register this user. Please try again");
  }
  return true;  

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
  localStorage.setItem("access_token", json_response.token);
  const parsed_token = JSON.parse(atob(json_response.token.split('.')[1]));
  console.log(parsed_token);
  userData.setUserName(parsed_token.username);
  userData.setRole(parsed_token.role);
  userData.setUserId(parsed_token.sub);
}
</script>

<script>
export default {
  name: "RegisterComponent"
}
</script>

<style scoped>
.modal {
  position: absolute;
  top: 25%;
  left: 10%;
  height: 30rem;
  width: 80%;
  border: black solid 2px;
  border-radius: 5px;
  background-color: white;

}

</style>