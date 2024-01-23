<template>
  <NavbarComponent/>
  <h1>Home</h1>
  <section>
    <h2>Experience the Magic of Cinema with Cinemagic</h2>
    <p>Explore the latest movies, book tickets hassle-free, and make every cinema visit a memorable experience.</p>
  </section>

  <section>
    <h2>Why Choose Cinemagic?</h2>
    <ul>
      <li>Extensive Movie Selection</li>
      <li>Seamless Booking Process</li>
      <li>Personalized Recommendations</li>
      <li>Exclusive Offers and Rewards</li>
    </ul>
  </section>

  <section>
    <h2>Explore Our Features</h2>
    <ul>
      <li>Easy Booking</li>
      <li>Advanced Filters for Movie Selection</li>
      <li>Customer Reviews and Ratings</li>
      <li>Special Events and Screenings</li>
      <li>Gift Cards for Every Occasion</li>
    </ul>
  </section>
</template>

<script setup>
</script>
<style>
body {
  margin: 0;
  padding: 0;
  background-image: url('https://live.staticflickr.com/4428/36401449295_e25881d153_b.jpg');
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  font-family: Arial, sans-serif;
  color: #ffffff; /* Set text color to white for better visibility on the background */
}
html {
  height: 100%;
}
</style>
<script>
import NavbarComponent from "../components/navbar/NavbarComponent.vue";

export default {
  name: 'HomePage',
  components: {
    NavbarComponent

  }
}
</script>
