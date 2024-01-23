<template>
    <input type="text" 
        v-model="value"
        :placeholder="props.name"
        @input="event => setValue(event)"
    />
    
    <div v-if="isRequired && requirementsMet" class="text-xs text-green-600 mt-1 text-left mx-2">{{name}} is ok</div>
    <div v-else-if="isRequired && !requirementsMet"  class="text-xs text-red-600 mt-1 text-left mx-2">{{ name }} field is required</div>
</template>

<script setup>
    import {computed, defineProps, defineModel} from "vue";
    import { lengthValidator } from "@/composables/validators";

    const value = defineModel("value");
    
    const props = defineProps({
                name: String, 
                isRequired: Boolean,
                requiredLength: Number,
                setSatisfied: Function || null
            })
    
    const requirementsMet = computed(() => {return lengthValidator(value.value, props.requiredLength)})

    function setValue(e){
        value.value =  e.target.value;
        requirementsMet.value = lengthValidator(value.value, props.requiredLength);
        if (props.isRequired){
            props.setSatisfied(requirementsMet.value)
            
        }
    }

</script>

<script>
export default {
    name: "TextInputComponent",
}

</script>