<template>
    <NavbarComponent/>
    <h1>Rooms</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-for="(room, index) in rooms" title="userData.role" v-bind:key="index">
        {{ room.id }}
        {{ room.name }}
        {{ userData.role }}
        
    
    </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
 import { useUserStore } from "@/store/userStore";
 const userData = useUserStore();
 const roomsApi = "http://localhost:8081/room";
 const rooms = ref([]);
 const loading = ref(true);

 onMounted(async () => {
    await getRooms();
 })

 const getRooms = async () => {
    const response = await fetch(roomsApi);
    if ( response.status !== 200 ){
        throw new Error("Could not fetch Rooms.");
    }
    rooms.value = await response.json();
    loading.value = false;

 }




</script>
  
<script>
  import NavbarComponent from "../components/navbar/NavbarComponent.vue";
  
  export default {
    name: "RoomsPage",
    components: {
      NavbarComponent
    }
  }
  </script>
  