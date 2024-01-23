<template>
  <div class="flex">
    <div class="p-5">
  <label>Cover</label>
  <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" :src = "cover.img" :alt="cover.alt"/>
  <button @click="onToggleUpdateComponent" v-if="isStaff" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4"> Update Cover </button>
  <UpdateCoverPictureComponent v-model:display="showUpdateComponent" v-model:image-id="cover.img" v-if="showUpdateComponent"/>
  </div>
    <div class="p-5">
      <h2>Movie Details</h2>
      <div>
        <label>Name:</label>
        <input v-model="movie.name" :disabled="!isStaff" />
      </div>
      <div>
        <label>Duration (Minutes):</label>
        <input type="number" v-model="movie.durationMinutes" :disabled="!isStaff" />
      </div>
      <div>
        <label>Last Updated On:</label> {{ movie.lastUpdatedOn }}
      </div>
      <div>
        <label>Created On:</label> {{ movie.createdOn }}
      </div>
  
      <button @click="onSaveMovie" v-if="isStaff" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4">Save</button>
      <button @click="onDeleteMovie" v-if="isStaff" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4">Delete</button>

    </div>
  </div>
  </template>
  
  <script setup>



import {computed, onMounted, ref, defineModel} from "vue";
import { sufficientRole } from "@/composables/roles";
import {useUserStore} from "@/store/userStore";
import {MovieService} from "@/services/MovieService";
import {useErrorStore} from "@/store/errorStore";
import router from "@/router";
import UpdateCoverPictureComponent from "@/components/MovieDetails/UpdateCoverPictureComponent.vue";

const userData = useUserStore();
const isStaff = computed(() => {return sufficientRole("ROLE_STAFF", userData.role)});
// const errorStore = useErrorStore();
  const movieId = defineModel();
const movieService = new MovieService(userData, useErrorStore());
const showUpdateComponent = ref(false);

  const movie = ref({
    name: null,
    durationMinutes: null,
    coverId: null,
    lastUpdatedOn: null,
    createdOn: null,
});

  const cover = computed(() => {
    if(movie?.value?.coverId) {
      return {
        img: 'http://localhost:8081/movie/' + movieId.value + "/cover",
        alt: 'Image for the movie ' + movie.value.name + " provided"
      }
    } else {
      return {
        img: require("@/assets/default_cover.jpg"),
        alt: 'No image provided for this movie'
      }
    }
  })

// data fetch
onMounted(async () => {
    movie.value = await movieService.getMovie(movieId.value);
 })


async function onDeleteMovie() {
  await movieService.deleteMovie(movieId.value);
  router.push({path: "/movies"})
}

async function onSaveMovie() {
    await movieService.patchMovie(movie.value);
    movie.value = await movieService.getMovie(movieId.value);
}

function onToggleUpdateComponent() {
  showUpdateComponent.value = !showUpdateComponent.value;
}

// profile picture link


  </script>
  