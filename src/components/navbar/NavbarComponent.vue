<script setup>
    /* component state management. Frontend only reacts to state variables marked via ref */
    import {ref, provide} from "vue";
    
    // state
    const registerShowState = ref(false);
    const loginShowState = ref(false);
    const errorMessage = ref("");
    const currentError = ref(false)
    //error Handler
    const errorHandler = async(e) => {

        errorMessage.value = e;
        currentError.value = true;
        setTimeout(() => {currentError.value = false;
                          errorMessage.value = "";
                  }, 3000);

    }
    provide("errors",  errorHandler);
    

    // event handlers
    const registerBtnClickHandler = () => {
        console.log("Event: plusBtn was clicked")
        if(registerShowState.value){
            registerShowState.value = false;
        } else {
            loginShowState.value = false;
            registerShowState.value = true;
        }
    }

    const loginBtnClickHandler = () => {
        console.log("Event: plusBtn was clicked")
        if(loginShowState.value){
            loginShowState.value = false;
        } else{
            loginShowState.value = true;
            registerShowState.value = false;
        }
    }

    


</script>

<template>
    <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/help">Help</router-link> |
        <router-link to="/imprint">Imprint</router-link> |
        <button @click="registerBtnClickHandler()">register</button> |
        <button @click="loginBtnClickHandler()">login</button>
    </nav>
    <RegisterComponent v-if="registerShowState" class="modal"/>
    <LoginComponent v-if="loginShowState" class="modal" />
    <ErrorModal v-if="currentError" :errorMessage="errorMessage" />
</template>

<script>
import RegisterComponent from "../registration/RegisterComponent.vue";
import LoginComponent from "../login/LoginComponent.vue"
import ErrorModal from "../error/ErrorModal.vue";
export default {
    name: "NavbarComponent",
    components: {
        RegisterComponent,
        LoginComponent,
        ErrorModal

    }
}
</script>