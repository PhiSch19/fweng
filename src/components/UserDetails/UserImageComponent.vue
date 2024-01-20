<template>
     <img :src="profilePicture.img"  
                :alt="profilePicture.alt"
                class="w-30 h-30 rounded-full mx-8" 
            />
</template>


<script setup>
import { computed, defineModel } from 'vue';
import { UserService } from '@/services/UserService';


const userService = new UserService(null, null);


const profilePictureId = defineModel();

const profilePicture = computed(() => {
    return userService.getProfileImage(profilePictureId.value)
})








</script>



<script>

export default {
    name: "UserImageComponent"
}
</script>