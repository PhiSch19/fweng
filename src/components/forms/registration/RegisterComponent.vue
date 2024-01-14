<template>
    <div class="layover" v-on:click="dropSelf()">
        
    </div>
    <div>
        <form  @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 modal">
                <h1>{{ title }}</h1>
                <div class="flex flex-wrap -mx-3 m-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            First Name
                        </label>
                        <input 
                            :class="firstNameStyle"
                            v-model="form.firstName.$value"
                            >
                        <p  v-if="form.firstName.$error" class="text-red-500 text-xs italic">{{ form.firstName.$error.message }}</p>

 
                    </div>
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Last Name
                        </label>
                        <input
                            :class="lastNameStyle"
                            v-model="form.lastName.$value"
                            >
                        <p  v-if="form.lastName.$error" class="text-red-500 text-xs italic">{{ form.lastName.$error.message }}</p>
                         
                    </div>
                    
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            email
                        </label>
                        <input
                            :class="emailStyle"
                            v-model="form.email.$value"
                            >
                        <p  v-if="form.email.$error" class="text-red-500 text-xs italic">{{ form.email.$error.message }}</p>

 
                    </div>
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            user Name
                        </label>
                        <input 
                            :class="userNameStyle"
                            v-model="form.userName.$value"
                            >
                        <p  v-if="form.userName.$error" class="text-red-500 text-xs italic">{{ form.userName.$error.message }}</p>
                                    
                    </div>

                    <div class="w-full px-3 mb-6 md:mb-0">
                        <GenderComponent v-model="form.gender.$value" />

                    </div>

                    <div class="w-full px-3 mb-6 md:mb-0">

                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Country
                        </label>
                        <CountrySelectComponent 
                    v-model="form.country.$value"/>
                    </div>

                    <div class="w-full px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4" for="grid-first-name">
                            Profile Picture
                        </label>
                        <input :class="inputStyleUnchecked"
                            id="profilePicture" type="file"
                            @change="onProfilePictureSelected"
                    />

                    </div>


                    <div class="w-full md:w-1/2 px-3 mb-6 mt-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Password
                        </label>
                        <input 
                            :class="passwordStyle"
                            v-model="form.password.$value"
                            type="password"
                            >
                        <p  v-if="form.password.$error" class="text-red-500 text-xs italic">{{ form.password.$error.message }}</p>
                      
                    </div>

                    <div class="w-full md:w-1/2 px-3 mb-6 mt-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Confirm Password
                        </label>
                        <input
                            :class="password2Style"
                            v-model="form.password2.$value"
                            type="password"
                            >
                        <p  v-if="form.password2.$error" class="text-red-500 text-xs italic">{{ form.password2.$error.message }}</p>
 
                    </div>
            
                    <button type="submit" @click="register()">submit</button>
                </div>
            </form>
    </div>

    


</template>

<script setup>
import {inject, ref, computed} from "vue";
import { passwordValidator } from "@/composables/validators";
//import { defineForm, field } from "vue-yup-form";
import * as yup from "yup";
import { defineForm, field, isValidForm } from "vue-yup-form";
import { useUserStore } from "@/store/userStore";
import {UserService} from "@/services/UserService";

//const apiRegisterUrl = process.env.VUE_APP_API_REGISTER;
//const apiAuthenticateUrl = process.env.VUE_APP_API_AUTH;
//const apiUserUrl = process.env.VUE_APP_API_USER;
const userData = useUserStore();
const userService = new UserService(userData);

const profilePicture = ref("");

const generateForm = () => {
    /*as we need cross validation we first define the fields*/

    const passwordLabel = "password";
    const firstName = field("", yup.string().required());
    const lastName = field("", yup.string().required());
    const email = field("", yup.string().email().required());
    const userName = field("", yup.string().required());
    const gender =  field(null, yup.string().nullable());
    const country = field(null, yup.string().nullable());
    const password = field("", yup.string().required().test({
        test(value, ctx){
            const valid = passwordValidator(value, 12);
            if(!valid){
                return ctx.createError({message: "Password requirements not met"})
            }
            return true;
        }
    }));
    const password2= field("", () => 
        yup.string()
        .required()
        .oneOf([password.$value], ({passwordLabel}) => `Must match password`)
    );


    return defineForm({
        firstName,
        lastName,
        email,
        userName,
        gender,
        country,
        password,
        password2
    })

}

const inputStyleError = "inputError focus:outline-none focus:bg-white"
const inputStyleOk = "inputOK focus:outline-none focus:bg-white"
const inputStyleUnchecked = ref("inputUnchecked focus:outline-none focus:bg-white");
const firstNameStyle= computed(() => {if(form.firstName.$error){ return inputStyleError;} return inputStyleOk;});
const lastNameStyle = computed(() => {if(form.lastName.$error){ return inputStyleError;} return inputStyleOk;});
const emailStyle = computed(() => {if(form.email.$error){ return inputStyleError;} return inputStyleOk;});
const userNameStyle = computed(() => {if(form.userName.$error){return inputStyleError;} return inputStyleOk;});
const passwordStyle = computed(() => {if(form.password.$error){ return inputStyleError;} return inputStyleOk;});
const password2Style = computed(() => {if(form.password2.$error){ return inputStyleError;} return inputStyleOk;});


const form = generateForm();
const showComp = inject("showRegisterComponent");
const title =ref("Register");


form.firstName.$error; // ValidationError: this is a required field
form.firstName.$value;
form.lastName.$error; // ValidationError: this is a required field
form.userName.$error; // ValidationError: this is a required field
form.email.$error;
form.gender.$error;
form.country.$error;
form.password.$error;
form.password2.$error;


const onProfilePictureSelected = (e) => {
  profilePicture.value = e.target.files[0]
}



const  dropSelf = async () => {
        //refreshForm();
        showComp.value = false;
    }


const register = async () => {
    
    try{ 
        if(!isValidForm(form)){
            throw new Error(form.$error.message)
        }
        const body = {
                    username: form.userName.$value,
                    password: form.password.$value,
                    details: {
                        firstname: form.firstName.$value,
                        lastname: form.lastName.$value,
                        email: form.email.$value,
                        salutation: form.gender.$value,
                        country: form.country.$value,
                    },
        };
        await userService.register(body, profilePicture.value);
        showComp.value = false;
    }catch(e){
        alert(e)
    }
}

</script>

<script>
import GenderComponent from "./GenderComponent.vue";
import CountrySelectComponent from "./CountrySelectComponent.vue";

export default {
    name: "RegisterComponent",
    components: {
      GenderComponent,
      CountrySelectComponent,
     }
}
</script>

