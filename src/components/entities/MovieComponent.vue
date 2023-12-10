<template>

  <div class="flex w-full items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" :src="this.image" alt="">
      <div class="flex flex-col justify-between p-4 leading-normal align-top">
          <h5 class="align-top mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{this.name}}</h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">minutes: {{this.duration}}</p>
      </div>
  </div>

</template>

<script setup>


</script>
  
  <script>
  export default {
    name: "MovieComponent",
    props: {
      name: String,
      image: String,
      duration: Number
    }
  }
  </script>