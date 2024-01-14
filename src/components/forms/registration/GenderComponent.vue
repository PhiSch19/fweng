<template>
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Salutation
                        </label>
    <div class="relative mb-6" >
        
        
        <label class="mx-4" for="male">
            <input
            id="male"
            class="mr-1 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
            type="radio"
            value="male"
            v-model="gender" />
            Male
        </label>
        

        <label class="mx-4" for="female">
            <input
            class="mr-1 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
            id="female"
            type="radio"
            value="female"
            v-model="gender" />
            Female
        </label>
        

        <label class="mx-4" for="other">
            <input
                class="mr-1 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                type="radio"
                name="gender"
                :value="custom"
                v-model="gender"
            />
            <input type="text" :value="custom" @input="e=>makeUpGender(e)" maxlength="30"
                   class="ml-1 w-12"
            
            />
        </label>


    </div>
</template>

<script setup>
import {ref, defineModel} from "vue";

const gender = defineModel();
const custom = ref("other");

const makeUpGender = (e) => {
    custom.value = e.target.value;
    gender.value = custom.value;
}


</script>

<script>
    export default {
        name: "GenderComponent"
    }
</script>