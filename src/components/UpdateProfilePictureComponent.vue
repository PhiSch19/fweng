<template>
    <div class="layover" v-on:click="dropSelf()">
        
    </div>
    <div>
        <form  @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 modal">
                <h1>Update Profile Picture</h1>
                <div class="flex flex-wrap -mx-3 m-6">
                 
                    <div class="w-full px-3 mb-6 md:mb-0">
                        <input :class="inputStyleUnchecked"
                            id="profilePicture" type="file"
                            @change="e=> onImageSelected(e)"
                        />

                    </div>
                    <button type="submit" @click="updateProfilePicture(ressourceId, image)">submit</button>
                </div>
            </form>
    </div>


</template>

<script setup>
import { ref, defineModel } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from "@/store/userStore";
import {UserService} from "@/services/UserService";
const route = useRoute();


const ressourceId = ref(route.params.id);
const show = defineModel("display");
const imageId = defineModel("imageId");
const image = ref(null);


const userData = useUserStore();
const userService = new UserService(userData);

const onImageSelected = (e) => {
  image.value = e.target.files[0]
}

const updateProfilePicture = async (userId, img) => {
    if (img !== null && img !== ""){
        await userService.updateProfilePicture(userId, img);
        const data = await userService.getById(userId);
        imageId.value = data.profilePictureId;
    }
    await dropSelf();
    
}


const dropSelf = async() => {
    show.value = false;
}


</script>

<script>

export default {
    name: "UpdateProfilePictureComponent",

}
</script>

