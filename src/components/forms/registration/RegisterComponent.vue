<template>
  <div class="layover" v-on:click="dropSelf()">
  <h1>{{ display }}</h1></div>
  <div class="modal">
      <form  @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h5 class="align-top mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Register</h5>
          <div class="relative w-full flex items-center justify-center">
            <div class="w-1/3 relative mx-2">
              
              <TextInputComponent 
                v-model:value="firstName"
                :name="firstNameRules.name"
                :isRequired="firstNameRules.isRequired"
                :requiredLength="firstNameRules.requiredLength"
                :setSatisfied="firstNameRules.setSatisfied"
                />
              
            </div>
            <div class="w-1/3 relative mx-2">
              <TextInputComponent 
                v-model:value="lastName"
                v-model:satisfied="lastNameSatisfied"
                :name="lastNameRules.name"
                :isRequired="lastNameRules.isRequired"
                :requiredLength="lastNameRules.requiredLength"
                :setSatisfied="lastNameRules.setSatisfied"
                />
            </div>
          </div>
          <GenderComponent class="relative mb-6 flex items-center justify-center"/>
         
          <div class="relative mb-6 flex items-center justify-center">
            <div class="w-1/3 relative mx-2">
              <EmailInputComponent
              v-model:value="email"
              :name="emailRules.name"
              :isRequired="emailRules.isRequired"
              :setSatisfied="emailRules.setSatisfied"
              />
            </div>
            <div class="w-1/3 relative mx-2">
              
              <TextInputComponent
              v-model:value="userName"
              :name="userNameRules.name"
              :isRequired="userNameRules.isRequired"
              :requiredLength="userNameRules.requiredLength"
              :setSatisfied="userNameRules.setSatisfied"
              />
            </div>

          </div>
          <div class="relative mb-6">
            <CountrySelectComponent />
          </div>

          <div class="relative mb-6 flex items-center justify-center">
            <div class="w-1/3 relative mx-2">
              
              <PasswordInputComponent
              v-model:value="password"
              :name="passwordRules.name"
              :isRequired="passwordRules.isRequired"
              :requiredLength="passwordRules.requiredLength"
              :setSatisfied="passwordRules.setSatisfied" />
            </div>
            <div class="w-1/3 relative mx-2">
              
              <PasswordInputComponent
              v-model:value="passwordRepeat"
              :name="passwordRepeatRules.name"
              :isRequired="passwordRepeatRules.isRequired"
              :requiredLength="passwordRepeatRules.requiredLength"
              :setSatisfied="passwordRepeatRules.setSatisfied" />
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
            <button 
              v-if="formProperlyFilled"
            
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
              type="submit"
              @click="handleRegister()">
                  Register
              </button>
            
            <button 
              v-else
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
              type="submit"
              disabled>
                  Register
              </button>
            
          </div>
      </form>
  </div>
</template>

<script setup>
import {inject, provide, ref} from "vue";
import { useUserStore } from "@/store/userStore";
import {UserService} from "@/services/UserService";
//import { object, string, number, date, InferType } from 'yup';
const apiRegisterUrl = process.env.VUE_APP_API_REGISTER;
const apiAuthenticateUrl = process.env.VUE_APP_API_AUTH;
const apiUserUrl = process.env.VUE_APP_API_USER;

const showComp = inject("showRegisterComponent")
const errorHandler = inject("errors");
const userData = useUserStore();
const userService = new UserService(userData);
const gender = ref(null);
const country = ref(null);

const formProperlyFilled = ref(false)

const formValidate = () => {
  // checks if the form is filled correctly
  if (!userNameSatisfied.value || !firstNameSatisfied.value || !lastNameSatisfied.value ||
       !passwordSatisfied.value || !passwordRepeatSatisfied.value){
        formProperlyFilled.value = false;
        // just some visibility. for some reason the password validation is not working as well as expected
        if(!userNameSatisfied.value){console.log(`userName not satisfied with ${userName.value}`)}
        if(!firstNameSatisfied.value){console.log(`firstName not satisfied with ${firstName.value}`)}
        if(!lastNameSatisfied.value){console.log(`lastName not satisfied with ${lastName.value}`)}
        if(!userNameSatisfied.value){console.log(`userName not satisfied with ${userName.value}`)}
        if(!passwordSatisfied.value){console.log(`password not satisfied with ${password.value}`)}
        if(!passwordRepeatSatisfied.value){console.log(`passwordRepeat not satisfied with ${passwordRepeat.value}`)}
        

  }
  else if(password.value != passwordRepeat.value){ formProperlyFilled.value = false;}
  else{
  formProperlyFilled.value = true;
  }
  console.log(`formProperlyFilled: ${formProperlyFilled.value}`)
}


provide("gender", gender)
const genderRules = ref({requiredLength: 2,
                          name: "gender",
                          isPassword: false,
                          isEmail: false
  
  })
  provide(genderRules.value.name, gender)



const firstName = ref("");
const firstNameSatisfied = ref(false);
const firstNameRules = ref({requiredLength: 3,
                        name: "firstName",
                        isRequired: true,
                        setSatisfied : (v) => {firstNameSatisfied.value = v; formValidate()}
                        })



const lastName = ref("");
const lastNameSatisfied = ref(false);
const lastNameRules = ref({requiredLength: 2,
                        name: "lastName",
                        isRequired: true,
                        setSatisfied: (v) => {lastNameSatisfied.value = v; formValidate()}
                        });


const email = ref("");
const emailSatisfied = ref(false);
const emailRules = ref({
                        name: "email",
                        isRequired: true,
                        setSatisfied: (v) => {emailSatisfied.value = v; formValidate()}
                      });


const userName = ref("");
const userNameSatisfied = ref(false)
const userNameRules = ref({requiredLength: 3,
                           name: "userName",
                           isRequired: true,
                           setSatisfied: (v) => {userNameSatisfied.value = v; formValidate()}
                        });


const password = ref("");
const passwordSatisfied = ref(false);
const passwordRules = ref({
                          requiredLength: 12,
                          name: "password",
                          isRequired: true,
                          setSatisfied: (v) => {passwordSatisfied.value = v; formValidate()}
                        });

const passwordRepeat = ref("");
const passwordRepeatSatisfied = ref(false)
const passwordRepeatRules = ref({
                          requiredLength: 12,
                          name: "passwordRepeat",
                          isRequired: true,
                          setSatisfied: (v) => {passwordRepeatSatisfied.value = v; formValidate()}
                        });


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
      username: userName.value,
      password: password.value,
      details: {
        firstname: firstName.value,
        lastname: lastName.value,
        email: email.value,
        salutation: gender.value,
        country: country.value,
      },
    }
    console.log(body)



    // register new user
    const registered = await register(body);
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
  await login(body);
  uploadProfilePicture(jsonResponse.id);

  return true;  

}

const uploadProfilePicture = async (id) => {

  const body = new FormData();
  body.append('file', profilePicture.value);

  const url = apiUserUrl + "/" + id + "/profile-picture"

  const response = await fetch(url, {
    method: "POST",
    headers: {"Authorization": userData.getToken(),},
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
  await userService.fillStoreFromApi();
}

const refreshForm = () => {
  firstName.value = "";
  firstNameSatisfied.value = false;
  lastName.value = "";
  lastNameSatisfied.value = false;
  email.value = "";
  emailSatisfied.value = false;
  userName.value = "";
  userNameSatisfied.value = false;
  password.value = "";
  passwordSatisfied.value = false;
  passwordRepeat.value = "";
  passwordRepeatSatisfied.value = false;
}

/*
watch(
  () => {
          if (!userNameSatisfied.value || !firstNameSatisfied.value || !lastNameSatisfied.value ||
              !passwordSatisfied.value || !passwordRepeatSatisfied.value){
                formProperlyFilled.value = false;
                console.log(`formProperlyFilled: ${formProperlyFilled.value}`)
                return;
          }
          else if (password.value != passwordRepeat.value){ 
            formProperlyFilled.value = false; 
            console.log(`formProperlyFilled: ${formProperlyFilled.value}`)
            return;
          } else{
          formProperlyFilled.value = true;
          console.log(`formProperlyFilled: ${formProperlyFilled.value}`)
          return;
          }    
        }
)
*/


</script>

<script>
import GenderComponent from "./GenderComponent.vue";
import CountrySelectComponent from "./CountrySelectComponent.vue";
import TextInputComponent from "@/components/atoms/TextInputComponent.vue";
import EmailInputComponent from "@/components/atoms/EmailInputComponent.vue";
import PasswordInputComponent from "@/components/atoms/PasswordInputComponent.vue";
export default {
  name: "RegisterComponent",
  components: {
      GenderComponent,
      CountrySelectComponent,
      TextInputComponent,
      EmailInputComponent,
      PasswordInputComponent
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