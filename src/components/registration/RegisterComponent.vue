<template>
    <div class="modal">
        <h1>Register</h1>
        <div>
            <label for="firstName">First Name: </label>
            <input id="firstName" type="text"
                :value="firstName"
                @input="event => firstName = event.target.value"
                />
          <br>
            <label for="lastName">Last Name: </label>
            <input id="lastName" type="text"
                :value="lastName"
                @input="event => lastName = event.target.value"
            />
          <br>
          <label for="email" type="email">Email: </label>
            <input id="email" type="text"
                :value="email"
                @input="event => email = event.target.value"
            />
          <br>
            <label for="dob">Age: </label>
            <input id="dob" type="date" 
                :value="dob"
                @input="event => dob = event.target.value"
            />
          <br>
            <label for="password">Password: </label>
            <input id="password" type="password" 
            :value="password"
            @input="event => password = event.target.value"
            />
          <br>
            <button type="submit" @click="handleRegister()">register</button>
        </div>
    </div>
</template>

<script setup>
    import {ref, inject} from "vue";
    const errorHandler = inject("errors");

    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const dob = ref("")
    const password = ref("");

    const handleRegister = async () => {
        const body = {firstName: firstName.value,
                      lastName: lastName.value,
                      email: email.value,
                      dob: dob.value,
                      password: password.value
                    }
        try{
            const token = await register(body);
        }catch(e){
            errorHandler(e);
        }



    }

    const register = async (body) => {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {"content-type": "application/json",},
            body: JSON.stringify(body)
        })
        if (response.status !== 200){
            throw new Error("Could not register this user. Please try again");
            }

        return await response.json();



    }
</script>

<script>
export default {
    name: "RegisterComponent"
}
</script>

<style scoped>
    .modal {
    position: absolute;
    top: 25%;
    left: 10%;
    height: 30rem;
    width: 80%;
    border: black solid 2px;
    border-radius: 5px;
      background-color: white;

    }
    
</style>