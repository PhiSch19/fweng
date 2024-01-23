<template>
    <NavbarComponent/>
    <MoviePostForm v-if="postModalDisplay" :display="postModalDisplay" />

    <h1>Movies</h1>
  <button @click="setPostModalDisplay()" v-if="crudEnabled" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4">add Movie</button>

  <div v-if="loading" class="loading">Loading...</div>
    <div v-for="(movie, index) in movies" title="userData.role" v-bind:key="index"
      class="w-full"
    >
      <router-link  :to="'/movie/' + movie.id">
        <MovieComponent :name="movie.name" :image="movie.img" :duration="movie.durationMinutes" class="m-2"/>
      </router-link>
      
    </div>
    
  </template>
  
<script setup>
import {ref, provide, computed, onMounted} from "vue";
import { useUserStore } from "@/store/userStore";
const userData = useUserStore();
const movieApi = process.env.VUE_APP_API_MOVIES;
const movies = ref([]);
provide("movies", movies)
const loading = ref(true);
const postModalDisplay = ref(false);
provide("displayPostMovieModal", postModalDisplay)
const crudEnabled = computed(() =>getMovieCrudPermittion(userData.role));


 onMounted(async () => {
    await getMovies();
 })

 const getMovies = async () => {
    const response = await fetch(movieApi);
    if ( response.status !== 200 ){
        throw new Error("Could not fetch Movies.");
    }
    const base = await response.json();
    base.forEach((element) => {
      element.img = `${movieApi}/${element.id}/cover`;
    });

    movies.value = base;
    loading.value = false;

 }

 
 const getMovieCrudPermittion = (role) => {
  if(  role && ["ROLE_STAFF", "ROLE_ADMIN"].includes(role) ){
    return true;
  }
  return false;
 }

 const setPostModalDisplay = () => {
  !postModalDisplay.value ? postModalDisplay.value = true: postModalDisplay.value = false
 }
 




</script>
  
<script>
  import NavbarComponent from "../components/navbar/NavbarComponent.vue";
  import MovieComponent from "../components/entities/MovieComponent.vue";
  import MoviePostForm from "../components/forms/movies/MoviePostForm.vue";
  
  export default {
    name: "MoviesPage",
    components: {
      NavbarComponent,
      MovieComponent,
      MoviePostForm
    }
  }
</script>
  