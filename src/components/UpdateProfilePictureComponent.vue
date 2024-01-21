<template>
    <div class="layover" v-on:click="dropSelf()">
        
    </div>
    <div>
        <form  @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 modal">
                <h1>Update Profile Picture</h1>
                <div class="flex flex-wrap -mx-3 m-6">
                 
                    <div class="w-full px-3 mb-6 md:mb-0">
                        <input :class="inputStyleUnchecked"
                            id="profilePicture" type="file"
                        />

                    </div>
                    <button type="submit" @click="updateProfilePicture()">submit</button>
                </div>
            </form>
    </div>

    


</template>

<script setup>
import { defineModel } from 'vue';

const show = defineModel()
//import { useUserStore } from "@/store/userStore";
//import {UserService} from "@/services/UserService";

//const apiRegisterUrl = process.env.VUE_APP_API_REGISTER;
//const apiAuthenticateUrl = process.env.VUE_APP_API_AUTH;
//const apiUserUrl = process.env.VUE_APP_API_USER;
//const userData = useUserStore();
//const userService = new UserService(userData);


const dropSelf = async() => {
    //console.log(`show.value: ${show.value}`)
    show.value = false;
}

/*
const  dropSelf = async () => {
        //refreshForm();
        showComp.value = false;
    }
*/

</script>

<script>

export default {
    name: "UpdateProfilePictureComponent",

}
</script>

