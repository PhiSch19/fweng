<template>
    <div class="flex">
        <UserImageComponent v-model.image="user.profilePictureId"
        :isActive="user.active"
        
        />
        <form  @submit.prevent="submitForm"
        >
            <div class="flex md:flex md:flex-grow flex-row justify-start space-x-1 mb-2">
                <button type="submit" @click="deleteUser()" >Delete</button>
                <button v-if="isAdmin && user.active===true" type="submit"
                    @click="toggleActive(user.id)"

                >
                    Deactivate
                </button>
                <button v-else-if="isAdmin" type="submit"
                    @click="toggleActive(user.id)"
                >
                    Activate
                </button>
            </div>
            <table>
                <tr>
                    <th>Status: </th><td><p v-if="user.active"><span class="greenDot"></span> active</p>
                        <p v-else><span class="orangeDot"></span> deactivated</p>
                    
                    </td>
                </tr>


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
                    <th>Gender: </th><td><input v-model="user.gender"></td>
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
            <div class="flex md:flex md:flex-grow flex-row justify-start space-x-1 mb-2">
                <button type="submit" @click="updateUser()">Update</button>
            </div>
            
            
        </form>
    </div>
    
    



</template>

<script setup>

import {computed, onMounted, ref} from "vue";
import { useRoute } from 'vue-router';
import {useErrorStore} from "@/store/errorStore";
import { useUserStore } from "@/store/userStore";
import { UserService } from "@/services/UserService";
import { sufficientRole } from "@/composables/roles";

const route = useRoute();
const isAdmin = computed(() => {return sufficientRole("ROLE_ADMIN", userData.role)});
const isThatUser = computed(() => {if(route.params.id===userData.userId)return true; return false;})
const errorStore = useErrorStore();
const userData = useUserStore();

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
    profilePictureId: null,
    active: null
});


// data fetch
onMounted(async () => {
    await getUserInfo(route.params.id);

 })

// profile picture link

const getUserInfo = async (id) => {
    try{
        const userInfo = await userService.getById(id);
        user.value.firstName = userInfo.firstname;
        user.value.lastName = userInfo.lastname;
        user.value.userName = userInfo.username;
        user.value.country = userInfo.country;
        user.value.email = userInfo.email;
        user.value.role = userInfo.role;
        user.value.gender = userInfo.salutation;
        user.value.profilePictureId = userInfo.profilePictureId;
        user.value.active = userInfo.active;

    }catch (e) {
        console.log(e)
    }
    



}

const updateUser = async () => {
    await userService.patchUser(route.params.id, user.value);
    await getUserInfo(route.params.id)

}

const deleteUser = async () => {
    await userService.deleteUser(route.params.id);
    if (userData.userId === route.params.id){
        userData.logout();
        router.push({path: "/"})
    } else {
        router.push({path: "/profiles"})
    }
}

const toggleActive = async () => {
    await userService.toggleActive(route.params.id);
    if (userData.userId === route.params.id){
        userData.logout();
        router.push({path: "/"})
    }
    else {
        await getUserInfo(route.params.id)
    }
}














</script>


<script>
import CountrySelectComponent from "../forms/registration/CountrySelectComponent.vue";
import RoleSelectComponent from "../forms/RoleSelectComponent.vue";
import UserImageComponent from "./UserImageComponent.vue";
import router from "@/router";
export default {
    name: "UserPatchComponent",
    components: {CountrySelectComponent,
                 RoleSelectComponent,
                 UserImageComponent,

                }

}
</script>