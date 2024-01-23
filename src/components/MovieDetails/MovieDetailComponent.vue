<template>
    <!-- <div>
      <h2>Movie Details</h2>
      <div>
        <label>ID:</label> {{ movie.id }}
      </div>
      <div>
        <label>Name:</label>
        <input v-model="editedMovie.name" :disabled="!isAdmin" />
      </div>
      <div>
        <label>Duration (Minutes):</label>
        <input type="number" v-model="editedMovie.durationMinutes" :disabled="!isAdmin" />
      </div>
      <div>
        <label>Cover ID:</label>
        <input v-model="editedMovie.coverId" :disabled="!isAdmin"/>
      </div>
      <div>
        <label>Last Updated On:</label> {{ movie.lastUpdatedOn }}
      </div>
      <div>
        <label>Created On:</label> {{ movie.createdOn }}
      </div>
  
      <button @click="saveMovie" :disabled="!isAdmin">Save</button>
    </div> -->
    Hello World!
  </template>
  
  <script setup>
// import {computed, onMounted, ref} from "vue";
// import { useRoute } from 'vue-router';
// import {useErrorStore} from "@/store/errorStore";
// import { sufficientRole } from "@/composables/roles";

// const route = useRoute();
// const isAdmin = computed(() => {return sufficientRole("ROLE_ADMIN", userData.role)});
// const errorStore = useErrorStore();
// const movieApi = process.env.VUE_APP_API_MOVIES;

// const movie = ref({
//     name: null,
//     durationMinutes: null,
//     coverId: null,
//     lastUpdatedOn: null,
//     createdOn: null,
// });


// data fetch
// onMounted(async () => {
//     // await getMovieInfo(route.params.id);
//  })

// profile picture link

// const getMovie = async (id) => {
//     const response = await fetch(movieApi/id);
//     if ( response.status !== 200 ){
//         throw new Error("Could not fetch Rooms.");
//     }
//     //todo
//     const base = await response.json();
//     base.forEach((element) => {
//       element.img = `${movieApi}/${element.id}/cover`;
//     });

//     //movies.value = await response.json();
//     movies.value = base;
//     loading.value = false;

//  }

  </script>
  