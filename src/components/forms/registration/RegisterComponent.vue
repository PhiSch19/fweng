<template>
  <div class="layover" v-on:click="dropSelf()">
  <h1>{{ display }}</h1></div>
  <div class="modal">
      <form  @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h5 class="align-top mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Register</h5>
          <div class="relative w-full flex items-center justify-center">
            <div class="w-1/3 relative mx-2">
              <TextInputComponent :name="firstNameRules.name" :value="firstName" :placeholder="firstNameRules.name"
                 :requiredLength="firstNameRules.requiredLength" 
                 :isEmail="firstNameRules.isEmail" :isPassword="firstNameRules.isPassword"/>
            </div>
            <div class="w-1/3 relative mx-2">
              <TextInputComponent :name="lastNameRules.name" :value="lastName" :placeholder="lastNameRules.name"
                 :requiredLength="lastNameRules.requiredLength" 
                 :isEmail="lastNameRules.isEmail" :isPassword="lastNameRules.isPassword"/>
            </div>
          </div>
          <GenderComponent class="relative mb-6 flex items-center justify-center"/>
         
          <div class="relative mb-6 flex items-center justify-center">
            <div class="w-1/3 relative mx-2">
              <TextInputComponent :name="emailRules.name" :value="email" :placehoder="emailRules.name" :requiredLength="emailRules.requiredLength"
                :isEmail="emailRules.isEmail" :isPassword="emailRules.isPassword" />
            </div>
            <div class="w-1/3 relative mx-2">
              <TextInputComponent :name="userNameRules.name" :value="userName" :placehoder="userNameRules.name" :requiredLength="userNameRules.requiredLength"
                :isEmail="userNameRules.isEmail" :isPassword="userNameRules.isPassword" />
            </div>

          </div>
          <div class="relative mb-6">
            <CountrySelectComponent />
          </div>

          <div class="relative mb-6 flex items-center justify-center">
            <div class="w-1/3 relative mx-2">
              <TextInputComponent :name="passwordRules.name" :value="password" :placeholder="passwordRules.name" 
                                  :requiredLength="passwordRules.requiredLength" :isEmail="passwordRules.isEmail"
                                  :isPassword="passwordRules.isPassword" />
            </div>
            <div class="w-1/3 relative mx-2">
              <TextInputComponent :name="passwordRepeatRules.name" :value="passwordRepeat" :placeholder="passwordRepeatRules.name" 
                                  :requiredLength="passwordRepeatRules.requiredLength" :isEmail="passwordRepeatRules.isEmail"
                                  :isPassword="passwordRepeatRules.isPassword" />
            </div>
          </div>
        <div class="relative mb-6 flex items-center justify-center">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="profilePicture">
            Profile Picture
          </label>
          <input class="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                 id="profilePicture" type="file"
                 @change="onProfilePictureSelected"
          />
        </div>
         
          <div class="flex items-center justify-center">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="submit"
            @click="handleRegister()">
                Register
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
const apiUserUrl = process.env.VUE_APP_API_USER;

const showComp = inject("showRegisterComponent")
const errorHandler = inject("errors");
const userData = useUserStore()
const gender = ref(null);
const country = ref(null);

provide("gender", gender)
const genderRules = ref({requiredLength: 2,
                          name: "gender",
                          isPassword: false,
                          isEmail: false
  
  })
  provide(genderRules.value.name, gender)



const firstName = ref(null);
const firstNameRules = ref({requiredLength: 1,
                        name: "firstName",
                        isPassword: false,
                        isEmail: false,
                        });
provide(firstNameRules.value.name, firstName);

const lastName = ref("");
const lastNameRules = ref({requiredLength: 1,
                        name: "lastName",
                        isPassword: false,
                        isEmail: false,
                        });
provide(lastNameRules.value.name, lastName);
const email = ref("");
const emailRules = ref({requiredLength: 5,
                        name: "email",
                        isPassword: false,
                        isEmail: true
                      });
provide(emailRules.value.name, email);

const userName = ref("");
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

const countryRules = ref({requiredLength: 2,
                            name: "country",
                            isPassword: false,
                            isEmail: false
  })

  provide(countryRules.value.name, country);

const profilePicture = ref("");

const onProfilePictureSelected = (e) => {
  profilePicture.value = e.target.files[0]
}


const  dropSelf = async () => {
        refreshForm();
        showComp.value = false;
    }


const handleRegister = async () => {  
  try {
    // check register form input on client side
    const body = {
      username: validated(userName.value, userNameRules.value, false),
      password: validated(password.value, passwordRules.value, false),
      details: {
        firstname: validated(firstName.value, firstNameRules.value, false),
        lastname: validated(lastName.value, lastNameRules.value, false),
        email: validated(email.value, emailRules.value, false),
        salutation: validated(gender.value, genderRules.value, false),
        country: validated(country.value, countryRules.value, false),
      },
    }
    if(password.value!==passwordRepeat.value){
      throw new Error("password does not equal password repeat");
    }


    // register new user
    const registered = await register(body);
    // if user was registered successfully use that to login user
    const tokenResponse = await login(body);
    refreshForm();
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
  if (response.status !== 200) {
    throw new Error("Could not register this user. Please try again");
  }
  const jsonResponse = await response.json();
  uploadProfilePicture(jsonResponse.id);

  return true;  

}

const uploadProfilePicture = async (id) => {

  const body = new FormData();
  body.append('file', profilePicture.value);

  const url = apiUserUrl + "/" + id + "/profile-picture"

  const response = await fetch(url, {
    method: "POST",
    headers: {},
    body: body
  });
  if (response.status !== 200) {
    throw new Error("Could not upload profile picture.");
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
  
}

const refreshForm = () => {
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  userName.value = "";
  password.value = "";
  passwordRepeat.value = "";
}

const validated = (val, requirement, ignoreNull) => {
    if(ignoreNull){
      if (isEmpty(val)){return null;}
    }
    
    if (val?.length < requirement.requiredLength){throw new Error(`${requirement.name} is to short. min ${requirement.requiredLength} characters.`);}
    if(requirement.isPassword){
        if (!isStrongPassword(val)){
          throw new Error(`${requirement.name} does not meet password requirements`);
        }

    }
    if(requirement.isEmail){
      if(!emailMet(val)){
        throw new Error(`${requirement.name} is not a valid email address`);
      }

    }
    return val;
}
const isStrongPassword = (val) => {

// Check if the password includes at least one uppercase letter
if (!/[A-Z]/.test(val)) {
  return false;
}

// Check if the password includes at least one lowercase letter
if (!/[a-z]/.test(val)) {
  return false;
}

// Check if the password includes at least one number
if (!/\d/.test(val)) {
  return false;
}

// Check if the password includes at least one symbol
if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(val)) {
  return false;
}

// If all conditions are met, the password is strong
return true;
}
const emailMet = (val)=> {
        return String(val)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

}
  const isEmpty = (value) => {
  return (value == null || (typeof value === "string" && value.trim().length === 0));
}

</script>

<script>
import GenderComponent from "./GenderComponent.vue";
import CountrySelectComponent from "./CountrySelectComponent.vue";
import TextInputComponent from "../TextInputComponent.vue";
export default {
  name: "RegisterComponent",
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