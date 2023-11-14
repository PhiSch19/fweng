<template>
  <NavbarComponent />
  <h1>HomePage</h1>
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
    <p>At Cinemagic, we believe in creating more than just a movie-watching experience; we strive to craft unforgettable moments.</p>
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

<script>
import NavbarComponent from "../components/navbar/NavbarComponent.vue";
export default {
  name: 'HomePage',
  components: {
    NavbarComponent

  }
}
</script>
