<template>
  <NavbarComponent/>
  <button @click="setPostModalDisplay()" v-if="crudEnabled">addRoom</button>
  <MoviePostForm v-if="postModalDisplay" :display="postModalDisplay" />

  <h1>Rooms</h1>
  <div v-if="loading" class="loading">Loading...</div>
  <div v-for="room in movies"  v-bind:key="room.id">
    <RoomComponent :name="room.name" :capacity="room.capacity" :cleaningMinutes="room.cleaningMinutes" />   
  </div>
  
</template>

<script setup>
import {ref, provide, computed, onMounted} from "vue";
import { useUserStore } from "@/store/userStore";
const userData = useUserStore();
const roomApi = process.env.VUE_APP_API_ROOMS;
const rooms = ref([]);
provide("rooms", rooms)
const loading = ref(true);
const postModalDisplay = ref(false);
provide("displayPostRoom", postModalDisplay);
const crudEnabled = computed(() =>getRoomCrudPermittion(userData.role));


onMounted(async () => {
  await getRooms();
})

const getRooms = async () => {

  const headers = {"authorization": userData.getToken()}

  const response = await fetch(roomApi, {headers: headers});
  if ( response.status !== 200 ){
      throw new Error("Could not fetch Rooms.");
  }
  const room_array = await response.json();

  //movies.value = await response.json();
  rooms.value = room_array;
  loading.value = false;

}

const getRoomCrudPermittion = (role) => {
if(  role && role === "ROLE_ADMIN" ){
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
import RoomComponent from "../components/entities/RoomComponent.vue";
//import MoviePostForm from "../components/forms/movies/MoviePostForm.vue";

export default {
  name: "MoviesPage",
  components: {
    NavbarComponent,
    RoomComponent,
    //MoviePostForm
  }
}
</script>
