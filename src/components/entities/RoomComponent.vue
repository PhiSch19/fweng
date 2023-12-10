<template>

    <div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div class="flex flex-col justify-between p-4 leading-normal align-top">
            <h5 class="align-top mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{this.name}}</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">capacity: {{this.capacity}}</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">cleaning Time: {{this.cleaningMinutes}} minutes</p>
        </div>
    </div>
  
  </template>
  
  <script setup>
  
  
  </script>
    
    <script>
    export default {
      name: "RoomComponent",
      props: {
        name: String,
        capacity: Number,
        cleaningMinutes: Number
      }
    }
    </script>