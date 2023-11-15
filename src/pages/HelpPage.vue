<template>
  <NavbarComponent/>
  <div class="faq-container">
    <h1 class="text-2xl font-bold mb-4">Frequently Asked Questions</h1>
    <div v-for="(item, index) in faqItems" :key="index" class="mb-4">
      <h2>{{ item.question }}</h2>
      <p>{{ item.answer }}</p>
    </div>
  </div>

</template>

<script>
import NavbarComponent from "../components/navbar/NavbarComponent.vue";

export default {
  name: 'HelpPage',
  components: {
    NavbarComponent

  },
  data() {
    return {
      faqItems: [
        {
          question: 'How do I book tickets?',
          answer: 'Visit us locally at the store.',
        },
        {
          question: 'Can I cancel or change my booking?',
          answer: 'You can phone us.',
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'Cash only.',
        },
        {
          question: 'Do you show movies in OV?',
          answer: 'Yes, only OV movies are shown in the cinema.',
        }
      ],
    };
  },
}
</script>
  