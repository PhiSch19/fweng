<template>
  <NavbarComponent/>
  <h1>Imprint Page</h1>
  <section>
    <h2>Information According to § 5 TMG:</h2>
    <p>Cinemagic Cinema Booking Service</p>
    <p>Address: 123 Movie Avenue, Cityville, Country</p>
    <p>Email: info@cinemagic.com</p>
    <p>Phone: +1 234-567-8901</p>
  </section>

  <section>
    <h2>Legal Jurisdiction:</h2>
    <p>Cityville, Country</p>
  </section>

  <section>
    <h2>Represented by:</h2>
    <p>CEO: [Name]</p>
    <p>Managing Director: [Name]</p>
  </section>

  <section>
    <h2>Disclaimer:</h2>
    <p>Content on this website has been created with the utmost care. However, we cannot guarantee the accuracy,
      completeness, or timeliness of the information provided.</p>
    <p>As a service provider, we are responsible for our own content on these pages according to general laws. We are
      not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate
      illegal activity.</p>
    <p>For any queries or concerns, please contact us via the provided contact information.</p>
  </section>
</template>

<script>
import NavbarComponent from "../components/navbar/NavbarComponent.vue";

export default {
  name: 'ImprintPage',
  components: {
    NavbarComponent

  }
}
</script>
  