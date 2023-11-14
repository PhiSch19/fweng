<template>
  <NavbarComponent/>
  <h1>AboutPage</h1>
  <section>
    <h2>Our Story</h2>
    <p>Cinemagic was founded with a passion for bringing the magic of cinema to audiences worldwide. Our journey
      began...</p>
    <p>...with a vision to revolutionize the way people experience movies. Since our inception in [year], we have been
      dedicated to providing a seamless and enjoyable movie booking experience.</p>
  </section>

  <section>
    <h2>Our Mission</h2>
    <p>At Cinemagic, our mission is to...</p>
    <p>...create a platform that not only simplifies the movie booking process but also enhances the overall cinematic
      experience for our users. We aim to offer a diverse range of movies while ensuring convenience and quality
      service.</p>
  </section>

  <section>
    <h2>Meet the Team</h2>
    <p>Our dedicated team of professionals...</p>
    <p>...comes from diverse backgrounds, united by their love for film and technology. From developers crafting
      intuitive platforms to customer service experts ensuring your satisfaction, our team is committed to delivering
      excellence.</p>
  </section>

  <section>
    <h2>Our Values</h2>
    <p>At Cinemagic, we value...</p>
    <ul>
      <li>Customer Satisfaction: Putting our users' needs first</li>
      <li>Innovation: Constantly evolving to offer the best experience</li>
      <li>Diversity and Inclusivity: Embracing different perspectives</li>
      <li>Integrity: Upholding honesty and transparency</li>
    </ul>
  </section>
</template>


<script>
import NavbarComponent from "../components/navbar/NavbarComponent.vue";

export default {
  name: "AboutPage",
  components: {
    NavbarComponent
  }
}
</script>
