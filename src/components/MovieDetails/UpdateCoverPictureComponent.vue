<template>
    <div class="layover" v-on:click="dropSelf()">
        
    </div>
    <div>
        <form  @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 modal">
                <h1>Update Movie Cover</h1>
                <div class="flex flex-wrap -mx-3 m-6">
                 
                    <div class="w-full px-3 mb-6 md:mb-0">
                        <input :class="inputStyleUnchecked"
                            id="coverPicture" type="file"
                            @change="e=> onImageSelected(e)"
                        />

                    </div>
                    <button type="submit" @click="updateCoverPicture(image)" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4">submit</button>
                </div>
            </form>
    </div>


</template>

<script setup>
import { ref, defineModel } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from "@/store/userStore";
import {MovieService} from "@/services/MovieService";
import {useErrorStore} from "@/store/errorStore";
const route = useRoute();


const movieId = ref(route.params.id);
const show = defineModel("display");
const imageId = defineModel("imageId");
const image = ref(null);


const userData = useUserStore();
const movieService = new MovieService(userData, useErrorStore());

const onImageSelected = (e) => {
  image.value = e.target.files[0]
}

const updateCoverPicture = async (img) => {
    if (img !== null && img !== ""){
        await movieService.updateCoverPicture(movieId.value, img);
        imageId.value = "http://localhost:8081/movie/" + movieId.value + "/cover?x=" + new Date();
    }
    await dropSelf();
    
}


const dropSelf = async() => {
    show.value = false;
}


</script>

<script>

export default {
    name: "UpdateCoverPictureComponent",

}
</script>

