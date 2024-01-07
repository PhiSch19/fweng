<template>
    <input type="email" 
        v-model="value"
        :placeholder="props.name"
        @input="event => setValue(event)"
    />
    
    <div v-if="isRequired && requirementsMet" class="text-xs text-green-600 mt-1 text-left mx-2">{{name}} is ok</div>
    <div v-else-if="isRequired && !requirementsMet"  class="text-xs text-red-600 mt-1 text-left mx-2">{{ name }} field is required</div>
</template>

<script setup>
    import {computed, defineProps, defineModel} from "vue";
    import { emailValidator} from "@/composables/validators";
    
    const value = defineModel("value");
    const props = defineProps({
                name: String, 
                isRequired: Boolean,
                setSatisfied: Function || null
            })
        
            
    const requirementsMet = computed(() => {return emailValidator(value.value)})

    function setValue(e){
        value.value =  e.target.value;
        requirementsMet.value = emailValidator(value.value);
        if (props.isRequired && props.setSatisfied){
            props.setSatisfied(requirementsMet.value);
        }
    }

</script>

<script>
export default {
    name: "EmailInputComponent",

}

</script>