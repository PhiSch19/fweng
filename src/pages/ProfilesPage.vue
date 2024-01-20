<template>
  <NavbarComponent/>
  <div v-if="!authorized"><UnauthComponent /></div>
  <div v-else>
    <h1>Manage User Profiles</h1>
    <UserOverviewComponent />

  </div>
  
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "@/store/userStore";
import { sufficientRole } from "@/composables/roles";

const userData = useUserStore();

// check if
const authorized = computed(() => {return sufficientRole("ROLE_ADMIN", userData.role)});

</script>

<script>
import UnauthComponent from "@/components/error/UnauthComponent.vue";
import NavbarComponent from "@/components/navbar/NavbarComponent.vue";
import UserOverviewComponent from "@/components/UserOverview/UserOverviewComponent.vue";

export default {
  name: "MoviesPage",
  components: {
    UnauthComponent,
    NavbarComponent,
    UserOverviewComponent,
  }
}
</script>
