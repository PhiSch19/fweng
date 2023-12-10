<template>
  <NavbarComponent/>
  <h1>HomePage {{ apiUrl }}</h1>
  <div>
    <div>username: {{ userData.username }}</div>
    <div>role: {{ userData.role }}</div>
  </div>
  <div>
    <h2>Why Choose Cinemagic?</h2>
    <ul>
      <li>Extensive Movie Selection</li>
      <li>Seamless Booking</li>
      <li>Personalized Experience</li>
      <li>Exclusive Offers</li>
      <li>User-Friendly Interface</li>
    </ul>
  </div>

  <div>
    <h2>What Sets Us Apart?</h2>
    <p>At Cinemagic, we believe in creating more than just a movie-watching experience; we strive to craft unforgettable
      moments.</p>
  </div>

  <div>
    <h2>Explore Our Features</h2>
    <ul>
      <li>Easy Booking</li>
      <li>Advanced Filters</li>
      <li>Reviews & Ratings</li>
      <li>Special Events</li>
      <li>Gift Cards</li>
    </ul>
  </div>
</template>

<script setup>
import { useUserStore } from "@/store/userStore";
// this .env stuff is not working. I have no Idea why. sucks...
import {ref} from "vue";
const apiUrl = ref(process.env.VUE_APP_API);

const userData = useUserStore();
/*
username = ref(useUserStore.username);
role = ref(useUserStore.role);
*/

</script>

<script>
import NavbarComponent from "../components/navbar/NavbarComponent.vue";

export default {
  name: 'HomePage',
  components: {
    NavbarComponent

  }
}
</script>
