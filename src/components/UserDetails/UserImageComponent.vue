<template>
    <div >
     <img :src="profilePicture.img"  
                :alt="profilePicture.alt"
                class="profilePictureBig" 
     />
     <form 
        @submit.prevent="submitForm"
        class="profilePictureBig">
        <button
            @click="toggleModal()"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4"
        >update image</button>
     </form>
     
     <UpdateProfilePictureComponent v-if="displayModal===true"
     v-model:display="displayModal"
     v-model:imageId ="profilePictureId"
     />


    </div>
</template>


<script setup>
import { computed, defineModel, ref} from 'vue';
import { UserService } from '@/services/UserService';


const displayModal = ref(false);
const userService = new UserService(null, null);
const profilePictureId = defineModel();

const profilePicture = computed(() => {
    return userService.getProfileImage(profilePictureId.value)
})

const toggleModal = () => {
    displayModal.value = !displayModal.value;


}








</script>



<script>
import UpdateProfilePictureComponent from '../UpdateProfilePictureComponent.vue';

export default {
    name: "UserImageComponent",
    components: {UpdateProfilePictureComponent}
    
}
</script>