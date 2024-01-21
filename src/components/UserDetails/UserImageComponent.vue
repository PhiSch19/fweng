<template>
     <img :src="profilePicture.img"  
                :alt="profilePicture.alt"
                class="profilePictureBig" 
            />
</template>


<script setup>
import { computed, defineModel} from 'vue';
import { UserService } from '@/services/UserService';


const userService = new UserService(null, null);


const profilePictureId = defineModel();

const profilePicture = computed(() => {
    return userService.getProfileImage(profilePictureId.value)
})








</script>



<script>

export default {
    name: "UserImageComponent",
    
}
</script>