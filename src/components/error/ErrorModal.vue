<template>
  <div class="errorModal">{{ errorMessage }}</div>
</template>

<script>
export default {
  name: "ErrorModal",
  props: {
    errorMessage: String,
  }
}
</script>
<style scoped>
.errorModal {
  position: fixed;
  top: 10%;
  left: 70%;
  background-color: red;
  height: 20rem;
  width: 30%;
  border-radius: 5px;
  text-align: center;
}

</style>