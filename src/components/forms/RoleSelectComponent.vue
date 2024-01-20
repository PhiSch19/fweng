<template>
    <select name="role" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        v-model="role"
    >
        <option v-for="(role, index) in roleData.roles" v-bind:key="index"
            :value="role"
        >{{ role }}</option>
    </select>

</template>


<script setup>
import { defineModel } from "vue";
import { useRoleStore } from "@/store/roleStore";


const roleData = new useRoleStore();
const role = defineModel();

</script>
<script>

export default {
    name: "RoleSelectComponent"
}

</script>