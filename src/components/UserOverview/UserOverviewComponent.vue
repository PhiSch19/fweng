<template>

    <input v-model="filter"
    @input="filered()"
    placeholder="filter"
    
    />
    <table>
        <thead>
            <tr><th>UserName</th><th>FirstName</th><th>LastName</th><th>Link</th></tr>
        </thead>
        <tr v-for="user, index in users" :key="index">
        <td>{{ user.username }}</td>
        <td>{{ user.firstname }}</td>
        <td>{{ user.lastname }}</td>
        <td>
            <router-link  :to="'/profile/' + user.id">
                <button>details</button>
            </router-link>
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
/*
const displayedUsers = computed(() => {
        return users.value.filter((item) => {
            console.log(item)
            return customFilter(item);
        })
})
*/

onMounted(async () => {

    const _users = await userService.getUsers();
    console.log(_users)
    users.value = _users.map(item => {
        return item.details;
    })

    /*

    for(let i=0; _users.length < i; i++) {
        const details = _users[i]["details"];
        const token_list = [details.username, details.firstname, details.lastname,
                            details.country, details.role, details.salutation
                            ].filter((e) => {
                                if (e){
                                    return e.toLowerCase();
                                }
                            })
        details["token_list"] = token_list;
        users.value.push(details);
        
    }
    console.log(users.value)
    */
})



const filered = async () => {
    const filter_container = [];
    const _users = await userService.getUsers();
    for(let i=0; i < _users.length; i++){
        if (JSON.stringify(_users[i]).toLowerCase().includes(filter.value.toLowerCase())){
            filter_container.push(_users[i]["details"])
        }
    }
    users.value = filter_container;





}













 





</script>
<script>

export default {
    name: "UserOverviewComponent",
}

</script>