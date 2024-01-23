<template>
    <NavbarComponent/>
    <div :key="movieId">
        <h1>Movie</h1>
        <MovieDetailComponent v-model = "movieId"/>
    </div>

    
  </template>
  
  <script setup>
  import {ref, computed, provide} from "vue";
  import { useRoute } from 'vue-router'

  const route = useRoute();
  const movieId = computed (() => {return route.params.id});

  const showMovieDetailModel = ref(false);
  provide("showMovieDetailComponent", showMovieDetailModel);
   
</script>
  
<script>
  import NavbarComponent from "@/components/navbar/NavbarComponent.vue";
  import MovieDetailComponent from "@/components/MovieDetails/MovieDetailComponent.vue";
  
  
  export default {
    name: 'MoviePage',
    components: {
      NavbarComponent,
      MovieDetailComponent,
    }
  }
</script>
  