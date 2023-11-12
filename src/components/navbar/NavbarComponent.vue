<script setup>
    /* component state management. Frontend only reacts to state variables marked via ref */
    import {ref, provide} from "vue";
    
    // state
    const registerShowState = ref(false);
    const loginShowState = ref(false);
    const errorMessage = ref("");
    provide ("errorMessage", errorMessage);

    // event handlers
    const registerBtnClickHandler = () => {
        console.log("Event: plusBtn was clicked")
        if(registerShowState.value){
            registerShowState.value = false;
        } else registerShowState.value = true;
    }

    const loginBtnClickHandler = () => {
        console.log("Event: plusBtn was clicked")
        if(loginShowState.value){
            loginShowState.value = false;
        } else loginShowState.value = true;
    }


</script>

<template>
    <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <button @click="registerBtnClickHandler()">register</button>
        <button @click="loginBtnClickHandler()">login</button>
    </nav>
    <RegisterComponent v-if="registerShowState" class="modal"/>
    <LoginComponent v-if="loginShowState" class="modal" />
    <ErrorModal errorMessage={{errorMessage}} />
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