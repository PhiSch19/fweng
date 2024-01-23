<template>
  <NavbarComponent/>
  <div :key="userId">
    <div v-if="!authorized">
      <UnauthComponent/>
    </div>
    <div v-else>
      <h1>Profile</h1>

      <UserPatchComponent/>

    </div>
  </div>


</template>

<script setup>
import {computed, provide, ref} from "vue";
import {useRoute} from 'vue-router'
import {useUserStore} from "@/store/userStore";
import {sufficientRole} from "@/composables/roles";

const route = useRoute();
const userId = computed(() => {
  return route.params.id
});
const userData = useUserStore();
const authorized = computed(() => {
  return sufficientRole("ROLE_ADMIN", userData.role) || userData.userId === userId.value;
})

const showUserModel = ref(false);
provide("showUserComponent", showUserModel);

</script>

<script>
import UnauthComponent from "@/components/error/UnauthComponent.vue";
import NavbarComponent from "@/components/navbar/NavbarComponent.vue";
import UserPatchComponent from "@/components/UserDetails/UserPatchComponent.vue";


export default {
  name: 'ProfilePage',
  components: {
    NavbarComponent,
    UnauthComponent,
    UserPatchComponent

  }
}
</script>
  