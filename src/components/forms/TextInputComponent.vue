<template>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                      v-if="isPassword"
                       type="password" autocomplete="off" :placeholder="name" 
                      :value="value"
                      @input="event => setValue(event)"
              />
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                      v-else
                       type="text" :placeholder="name" 
                      :value="value"
                      @input="event => setValue(event)"
              />
              <div v-if="requirementsMet" class="text-xs text-green-600 mt-1 text-left mx-2">{{name}} is ok</div>
              <div v-else  class="text-xs text-red-600 mt-1 text-left mx-2">{{ name }} field is required</div>
</template>


<script setup>
import {ref, defineProps, inject} from "vue";
const props = defineProps({
            name: String, 
            value: String,
            placeholder: String,
            requiredLength: Number,
            isPassword: Boolean,
            isEmail: Boolean
        })

const name = ref(props.name);
const value = inject(props.name);
const requirementsMet = ref(false);
const setValue = (e) => {
    value.value = e.target.value;

    requirementsMet.value = lengthMet() && emailMet() && isStrongPassword();
    
}

const lengthMet = () => {
    if ( props.requiredLength ){
        if ( props.requiredLength > value.value.length ){
            return false;
        }
    }
    return true;
}

const emailMet = ()=> {
    if(props.isEmail){
        return String(value.value)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }
    return true;
}

const isStrongPassword = () => {

  if(!props.isPassword){
    return true;
  }

  // Check if the password is at least 12 characters long
  if (value.value.length < 12) {
    return false;
  }

  // Check if the password includes at least one uppercase letter
  if (!/[A-Z]/.test(value.value)) {
    return false;
  }

  // Check if the password includes at least one lowercase letter
  if (!/[a-z]/.test(value.value)) {
    return false;
  }

  // Check if the password includes at least one number
  if (!/\d/.test(value.value)) {
    return false;
  }

  // Check if the password includes at least one symbol
  if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(value.value)) {
    return false;
  }

  // If all conditions are met, the password is strong
  return true;
}





</script>


<script>
export default {
    name: "TextInputComponent"
}
</script>