<template>
    gender: {{ gender }}
    <div class="relative mb-6" >
        
        <label class="mx-4" v-for="(g, index) in standard" v-bind:key="index">
            <input
                class="mr-1 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                type="radio"
                name="gender"
                :value="g"
                v-model="gender"
            />
            {{ g }}
        </label>

        <label class="mx-4">
            <input
                class="mr-1 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                type="radio"
                name="gender"
                :value="alternative"
                v-model="gender"
            />
            <input type="text" :value="alternative" @input="e=>makeUpGender(e)" maxlength="30" />
        </label>
    </div>
</template>

<script setup>
import {ref, inject} from "vue";
//console.log('genderModel');
//console.log(genderModel)
const standard = ref(["male", "female"]);
const gender = ref(inject("gender"));
const alternative = ref("other");

const makeUpGender = (e) => {
    alternative.value = e.target.value;
    gender.value = alternative.value;
}
</script>




<script>
    export default {
        name: "GenderComponent"
    }

</script>