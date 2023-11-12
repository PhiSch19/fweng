<template>
    <div class="modal">
        <h1>Register</h1>
        <form>
            <label for="firstName">First Name: </label>
            <input id="firstName" type="text"/>
            <label for="lastName">Last Name: </label>
            <input id="lastName" type="text"/>
            <label for="email" type="email">Email: </label>
            <input id="email" type="text" />
            <label for="dob">Age: </label>
            <input id="dob" type="date" />
            <label for="password">Password: </label>
            <input id="password" type="password" />
            <button type="submit">register</button>
        </form>
    </div>
</template>

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
    }
    
</style>