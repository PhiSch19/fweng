<template>
    <select name="country" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        v-model="locale"
    
    
    >
        <option v-for="(country, index) in countryData.countries" v-bind:key="index"
            :value="country.cca2"
        >{{ country.flag }} {{ country.name.common }}</option>
    </select>

</template>


<script setup>
import { onMounted, defineModel } from "vue";
import { useCountryStore } from "@/store/countryStore";

const countryData = new useCountryStore();
const locale = defineModel();

onMounted(async () => {
    await countryData.getCountries();
})


</script>
<script>

export default {
    name: "CountrySelectComponent"
}

</script>