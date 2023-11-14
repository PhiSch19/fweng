<template>
    <div class="modal">
        <h1>Login</h1>
            <label for="email" type="email">Email: </label>
            <input id="email" type="text" 
                :value="email"
                @input="event => email = event.target.value"
            />
      <br>
            
            <label for="password">Password: </label>
            <input id="password" type="password"
                :value="password"
                @input="event => password = event.target.value"
            />
      <br>
            <button type="submit" @click="handleLoginBtnClick()">login</button>
    </div>
</template>

<script setup>
    import {ref, inject} from "vue";

    const errorHandler = inject("errors");

    const email = ref("");
    const password = ref("");
    async function handleLoginBtnClick(){
        //alert(`email: ${email.value}, password: ${password.value}`);
        const body = {username: email, password: password};
        try {
            const token_response = await issueToken(body);
        }catch(e){
            await errorHandler(e);
            
        }
        
    }

    async function issueToken(body){
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {"content-type": "application/json",},
            body: JSON.stringify(body)
        })
        if ( response.status !== 200 ){
            throw new Error("invalid credentials");
        }
        const json_response = await response.json();
        return json_response;
        
    }


</script>

<script>
export default {
    name: "LoginComponent"
}

</script>
<style scoped>
    .modal {
    position: absolute;
    top: 25%;
    left: 40%;
    background-color: white;
    height: 10rem;
    width: 20%;
    border: black solid 2px;
    border-radius: 5px;
    }

</style>