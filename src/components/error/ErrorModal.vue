<template>
    <div class="errorModal">
        {{ errorMessage }}
    </div>
</template>

<script>
export default {
    name: "ErrorModal",
    props: {
        errorMessage: String,
    }
}
</script>
<style scoped >
    .errorModal {background-color: red;
                height: 20rem;
                width: 30%;                
    }

</style>