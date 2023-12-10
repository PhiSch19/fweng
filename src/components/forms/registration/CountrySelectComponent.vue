"https://restcountries.com/v3.1/all?fields=name,flag"
<template>
    <select name="country" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        v-model="country"
    
    
    >
        <option v-for="(country, index) in countries" v-bind:key="index"
            :value="country.name.common"
        >{{ country.flag }} {{ country.name.common }}</option>
    </select>

</template>


<script setup>
import {ref, onMounted, inject} from "vue";
const countries = ref([]);
const country = ref(inject("country"));
const priority_countries = ["Austria", "Germany", "Switzerland"]


onMounted(async () => {
    await loadCountries();
})

const loadCountries = async () => {

    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flag");
    if ( response.status == 200 ){
        const rawCountries = await response.json();
        sortCountries(rawCountries);
        countries.value = rawCountries;
    }
}

const sortCountries = (obj) => {
    obj.sort((item1, item2) => {
            
            const name1 = item1.name.common;
            const name2 = item2.name.common;
            // handle priorities
            if (priority_countries.includes(name1) && priority_countries.includes(name2)){
                 // all the rest is alphabetically
                if (name1 < name2){
                    return -1;
                }
                if (name1> name2) {
                    return 1;
                }
                return 0;
            }
            if ( priority_countries.includes(name1) ){
                return -1;
            }
            if (priority_countries.includes(name2)){
                return 1;
            }

            // all the rest is alphabetically
            if (name1 < name2){
                return -1;
            }
            if (name1> name2) {
                return 1;
            }
            return 0;
        })






}

</script>
<script>

export default {
    name: "CountrySelectComponent"
}

</script>