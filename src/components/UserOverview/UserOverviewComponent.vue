<template>

    <input v-model="filter"
    @input="rehydrate()"
    placeholder="Search"
    class="fullPageTable mb-2 mt-2"
    />
    <table class="fullPageTable">
        <thead>
            <tr><th>Active</th><th>Role</th><th>UserName</th><th>Email</th><th>Gender</th>
                <th>FirstName</th><th>LastName</th><th>Link</th><th>Actions</th>
            
            </tr>
        </thead>
        <tr v-for="user, index in users" :key="index">
        <td><span v-if="user.active===true" class="greenDot"
            alt="user is active"
            ></span>
            <span v-else class="orangeDot"
                alt="user in deactivated"
            ></span></td>
        <td>{{ user.role }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.salutation }}</td>
        <td>{{ user.firstname }}</td>
        <td>{{ user.lastname }}</td>
        
        <td>
            <router-link  :to="'/profile/' + user.id">
                <button>details</button>
            </router-link>
        </td>
        <td>
            <button v-if="user.active === true" @click="toggleActive(user.id)"
                >deactivate</button>
            <button  v-else @click="toggleActive(user.id)"
            >activate</button>
            
        </td>
        <td>
            <button class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            @click="deleteUser(user.id)"
            >
                delete
            </button> 
        </td>
        
        
        </tr>

    </table>

</template>

<script setup>

import { ref, onMounted, } from 'vue';
import {useErrorStore} from "@/store/errorStore";
import { useUserStore } from "@/store/userStore";
import { UserService } from "@/services/UserService";



const userData = useUserStore();
const errorStore = useErrorStore();
const userService = new UserService(userData, errorStore);
const filter = ref("");
const users = ref([]);


onMounted(async () => {

    const _users = await userService.getUsers();
    console.log(_users)
    users.value = _users.map(item => {
        return item.details;
    })

})


const rehydrate = async () => {
    const filter_container = [];
    const _users = await userService.getUsers();
    for(let i=0; i < _users.length; i++){
        if (JSON.stringify(_users[i]).toLowerCase().includes(filter.value.toLowerCase())){
            filter_container.push(_users[i]["details"])
        }
    }
    users.value = filter_container;
}

const toggleActive = async (userId) => {
    // adjust user state and rehydrate table
    try{
        await userService.toggleActive(userId);
        await rehydrate();
    } catch (e) {
        errorStore.error = e;
    }
}

const deleteUser = async(userId) => {
        // adjust user state and rehydrate table
        try{
        await userService.deleteUser(userId);
        await rehydrate();
    } catch (e) {
        errorStore.error = e;
    }
}














 





</script>
<script>

export default {
    name: "UserOverviewComponent",
}

</script>