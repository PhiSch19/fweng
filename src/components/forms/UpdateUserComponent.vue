<template>
    <div class="layover" v-on:click="dropSelf()">
    <h1>{{ display }}</h1></div>
    <div class="modal">
        <form  @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h5 class="align-top mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Profile</h5>
            <div class="relative w-full flex items-center justify-center">
              <div class="w-1/3 relative mx-2">
                <TextInputComponent :name="firstNameRules.name" :value="firstName" :placeholder="firstNameRules.placeholder"
                   :requiredLength="firstNameRules.requiredLength" 
                   :isEmail="firstNameRules.isEmail" :isPassword="firstNameRules.isPassword"/>
              </div>
              <div class="w-1/3 relative mx-2">
                <TextInputComponent :name="lastNameRules.name" :value="lastName" :placeholder="lastNameRules.placeholder"
                   :requiredLength="lastNameRules.requiredLength" 
                   :isEmail="lastNameRules.isEmail" :isPassword="lastNameRules.isPassword"/>
              </div>
            </div>
            <GenderComponent class="relative mb-6 flex items-center justify-center"/>
           
            <div class="relative mb-6 flex items-center justify-center">
              <div class="w-1/3 relative mx-2">
                <TextInputComponent :name="emailRules.name" :value="email" :placehoder="emailRules.placehoder" :requiredLength="emailRules.requiredLength"
                  :isEmail="emailRules.isEmail" :isPassword="emailRules.isPassword" />
              </div>
              <div class="w-1/3 relative mx-2">
                <TextInputComponent :name="userNameRules.name" :value="userName" :placehoder="userNameRules.placehoder" :requiredLength="userNameRules.requiredLength"
                  :isEmail="userNameRules.isEmail" :isPassword="userNameRules.isPassword" />
              </div>
  
            </div>
            <div class="relative mb-6">
              <CountrySelectComponent />
            </div>
  
            <div class="relative mb-6 flex items-center justify-center">
              <div class="w-1/3 relative mx-2">
                <TextInputComponent :name="passwordRules.name" :value="password" :placeholder="passwordRules.placehoder" 
                                    :requiredLength="passwordRules.requiredLength" :isEmail="passwordRules.isEmail"
                                    :isPassword="passwordRules.isPassword" />
              </div>
              <div class="w-1/3 relative mx-2">
                <TextInputComponent :name="passwordRepeatRules.name" :value="passwordRepeat" :placeholder="passwordRepeatRules.placehoder" 
                                    :requiredLength="passwordRepeatRules.requiredLength" :isEmail="passwordRepeatRules.isEmail"
                                    :isPassword="passwordRepeatRules.isPassword" />
              </div>
            </div>
           
            <div class="flex items-center justify-center">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
              type="submit"
              @click="handleUpate()">
                  update
              </button>
            </div>
        </form>
    </div>
  </template>
  
  
  
  
  <script setup>
  import {inject, provide, ref} from "vue";
  import { useUserStore } from "@/store/userStore";
  //import { object, string, number, date, InferType } from 'yup';
  const apiRegisterUrl = process.env.VUE_APP_API_REGISTER;
  const apiAuthenticateUrl = process.env.VUE_APP_API_AUTH;
  
  const showComp = inject("showUserComponent");
  const errorHandler = inject("errors");
  const userData = useUserStore();

  const gender = ref(userData.gender);
  provide("gender", gender)
  const country = ref(userData.country);
  
  
  const firstName = ref(userData.firstName);
  const firstNameRules = ref({requiredLength: 1,
                          name: "firstName",
                          isPassword: false,
                          isEmail: false,
                          });
  provide(firstNameRules.value.name, firstName);
  
  const lastName = ref(userData.lastName);
  const lastNameRules = ref({requiredLength: 1,
                          name: "lastName",
                          isPassword: false,
                          isEmail: false,
                          });
  provide(lastNameRules.value.name, lastName);
  const email = ref(userData.email);
  const emailRules = ref({requiredLength: 5,
                          name: "email",
                          isPassword: false,
                          isEmail: true
                        });
  provide(emailRules.value.name, email);
  
  const userName = ref(userData.username);
  const userNameRules = ref({requiredLength: 3,
                             name: "userName",
                             isPassword: false,
                             isEmail: false
                          });
  provide(userNameRules.value.name, userName);
  
  const password = ref("");
  const passwordRules = ref({
                            requiredLength: 12,
                            name: "password",
                            isPassword: true,
                            isEmail: false
                          });
  provide(passwordRules.value.name, password);
  
  const passwordRepeat = ref("");
  const passwordRepeatRules = ref({
                            requiredLength: 12,
                            name: "passwordRepead",
                            isPassword: true,
                            isEmail: false
                          });
  provide(passwordRepeatRules.value.name, passwordRepeat)
  
  provide("country", country);
  
  
  const  dropSelf = async () => {
          showComp.value = false;
      }
  
  
  const handleUpate = async () => {
    console.log("driven values");


  
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
      method: "PATCH",
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
    userData.setToken(json_response);

  }
  </script>
  
  <script>
  import GenderComponent from "./registration/GenderComponent.vue";
  import CountrySelectComponent from "./registration/CountrySelectComponent.vue";
  import TextInputComponent from "./TextInputComponent.vue";
  export default {
    name: "UpdateUserComponent",
    components: {
        GenderComponent,
        CountrySelectComponent,
        TextInputComponent
      }
  }
  </script>
  
  <style scoped>
  .layover {
      position: absolute;
      top: 0%;
      left: 0%;
      height: 100%;
      width: 100%;
      background-color: grey;
      opacity: 0.75;
  }
  .modal {
    position: absolute;
    top: 10%;
    left: 10%;
    height: 30rem;
    width: 80%;
    opacity: 1
    /*border: black solid 2px;
    border-radius: 5px;
    background-color: white;
    */
  }
  
  </style>