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
 const apiUrl = process.env.VUE_APP_API_USER;
  
  const showComp = inject("showUserComponent");
  const errorHandler = inject("errors");
  const userData = useUserStore();

  const gender = ref(userData.gender);
  const genderRules = ref({requiredLength: 2,
                          name: "gender",
                          isPassword: false,
                          isEmail: false
  
  })
  provide(genderRules.value.name, gender)
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
  
  const countryRules = ref({requiredLength: 2,
                            name: "country",
                            isPassword: false,
                            isEmail: false
  })

  provide(countryRules.value.name, country);
  
  
  const  dropSelf = async () => {
          showComp.value = false;
      }
  
  
const validated = (val, requirement, ignoreNull) => {
    if(ignoreNull){
      if (isEmpty(val)){return null;}
    }
    
    if (val.length < requirement.requiredLength){throw new Error(`${requirement.name} is to short. min ${requirement.requiredLength} characters.`);}
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


  const handleUpate = async () => {
    console.log("driven values");
    const body = {
      firstName: validated(firstName.value, firstNameRules.value, true),
      lastName: validated(lastName.value, lastNameRules.value, true),
      username: validated(userName.value, userNameRules.value, true),
      email: validated(email.value, emailRules.value, true),
      gender: validated(gender.value, genderRules.value, true),
      password: validated(password.value, passwordRules.value, true),
      country: validated(country.value, countryRules.value, true)
    }
    console.log(body)
    try {
      // register new user
      const updated = await update(userData.userId, body);
      console.log(updated);
      showComp.value = false;
  
    } catch (e) {
      errorHandler(e);
    }  
  }
  
  const update = async (userId, body) => {
    const response = await fetch(apiUrl + "/" + userId, {
      method: "PUT",
      headers: {"content-type": "application/json",
                "authorization": userData.getToken(),
    },
      body: JSON.stringify(body)
    })
    if (response.status > 202) {
      throw new Error("Could not register update this user. Please try again");

    }
    const json_response = await response.json();
    patchUser(body);
    return json_response;
  }

  const patchUser = (patch) => {
    if (patch.userName){userData.setUserName(patch.UserName);}
    if (patch.firstName){ userData.setFirstName(patch.firstName);}
    if (patch.lastName){userData.setLastName(patch.lastName);}
    if(patch.email){userData.setEmail(patch.email);}
    if(patch.gender) {userData.setGender(patch.gender);}
    if(patch.country){userData.setCountry(patch.country);}

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