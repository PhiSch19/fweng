<template>
    <div class="flex">
        <UserImageComponent v-model="user.profilePictureId" />
        <form  @submit.prevent="submitForm">
            <table>
                <tr>
                    <th>First Name: </th><td><input v-model="user.firstName"></td>
                </tr>
                <tr>
                    <th>Last Name: </th><td><input v-model="user.lastName"></td>
                </tr>
                <tr>
                    <th>User Name: </th><td><input v-model="user.userName"></td>
                </tr>
                <tr>
                    <th>Email: </th><td><input v-model="user.email"></td>
                </tr>
                <tr>
                    <th>Country :</th><td><CountrySelectComponent v-model="user.country"/></td>
                </tr>
                <tr v-if="isAdmin">
                    <th>User Role: </th><td><RoleSelectComponent v-model="user.role"/></td>
                </tr>
                
                <tr v-if="isThatUser">
                    <th>Password: </th><td><input placeholder="change password"></td>
                </tr>
                
            </table>
            <button type="submit" @click="updateUser()">Update</button>
            <button type="submit">Delete</button>
            <button v-if="isAdmin" type="submit">Deactivate</button>
        </form>
    </div>
    
    



</template>

<script setup>

import {computed, onMounted, ref} from "vue";
import { useRoute } from 'vue-router'
import {useErrorStore} from "@/store/errorStore";
import { useUserStore } from "@/store/userStore";
import { UserService } from "@/services/UserService";
import { sufficientRole } from "@/composables/roles";

const route = useRoute();
const isAdmin = computed(() => {return sufficientRole("ROLE_ADMIN", userData.role)});
const isThatUser = computed(() => {if(route.params.userId ===userData.userId)return true; return false;})
const errorStore = useErrorStore();
const userData = useUserStore();
//const countryData = useCountryStore();
const userService = new UserService(userData, errorStore);

const user = ref({
    lastName: null,
    firstName: null,
    userName: null,
    email: null,
    role: null,
    country: null,
    password: null,
    gender: null,
    profilePictureId: null
});


// data fetch
onMounted(async () => {
    await getUserInfo(route.params.userId);

 })

// profile picture link

const getUserInfo = async (id) => {
    try{
        const userInfo = await userService.getById(id);
        console.log(userInfo);
        user.value.firstName = userInfo.firstname;
        user.value.lastName = userInfo.lastname;
        user.value.userName = userInfo.username;
        user.value.country = userInfo.country;
        user.value.email = userInfo.email;
        user.value.role = userInfo.role;
        user.value.profilePictureId = userInfo.profilePictureId;

    }catch (e) {
        console.log(e)
    }
    



}

const updateUser = async () => {
    await userService.patchUser(route.params.userId, user.value);
    await getUserInfo(route.params.userId);


}














</script>


<script>
import CountrySelectComponent from "../forms/registration/CountrySelectComponent.vue";
import RoleSelectComponent from "../forms/RoleSelectComponent.vue";
import UserImageComponent from "./UserImageComponent.vue";
export default {
    name: "UserPatchComponent",
    components: {CountrySelectComponent,
                 RoleSelectComponent,
                 UserImageComponent,

                }

}
</script>