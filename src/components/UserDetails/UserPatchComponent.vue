<template>
    <h1>Hello World</h1>

    <form>
        <table>
            <tr>
                <th>First Name: </th><td><input v-model="user.firstName"></td>
            </tr>
            <tr>
                <th>Last Name: </th><td><input v-model="user.lastName"></td>
            </tr>
            <tr>
                <th>User Name: </th><td><input v-model="user.username"></td>
            </tr>
            <tr>
                <th>Email: </th><td><input v-model="user.email"></td>
            </tr>
            <tr>
                <th>Country :</th><td><input v-model="user.country"></td>
            </tr>
            <tr v-if="isAdmin">
                <th>User Role: </th><td><input v-model="user.role"></td>
            </tr>
            <tr v-if="isThatUser">
                <th>Password: </th><td><input placeholder="change password"></td>
            </tr>
        </table>
        <button type="submit">Update</button>
    </form>



</template>

<script setup>

import {computed, onMounted, ref} from "vue";
import { useRoute } from 'vue-router'
import { useUserStore } from "@/store/userStore";
import { UserService } from "@/services/UserService";
import { sufficientRole } from "@/composables/roles";

const route = useRoute();
const isAdmin = computed(() => {return sufficientRole("ROLE_ADMIN", userData.role)});
const isThatUser = computed(() => {if(route.params.userId ===userData.userId)return true; return false;})
const userData = useUserStore();
const userService = new UserService(userData);

const user = ref({
    lastName: null,
    firstName: null,
    userName: null,
    email: null,
    role: null,
    country: null,
    password: null,
    gender: null,
    profileImage: {img: null,
                   alt: "Profile image of a user"
    },
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
        user.value.country = userInfo.country;
        user.value.email = userInfo.email;
        user.value.role = userInfo.role;
        user.value.profilePictureId = userInfo.profilePictureId;
        const pimg = userService.getProfileImage(userInfo.profilePictureId);
        user.value.profileImage = pimg;

    }catch (e) {
        console.log(e)
    }
    



}








</script>


<script>

export default {
    name: "UserPatchComponent",

}
</script>