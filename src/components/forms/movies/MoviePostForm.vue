<template>

    <div class="modal">
        <form  @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h5 class="align-top mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">Add Movie</h5>
            <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Title</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="name" type="text" placeholder="title" 
                    :value="name"
                    @input="event => name = event.target.value"
            />
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="duration">
                    Duration in Minutes
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                id="durationMinutes" type="number" step="1" placeholder="duration"
                :value="duration"
                @input="event => duration = event.target.value"
                />
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="coverImage">
                    Cover Image
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                    id="coverImage" type="file"
                    @change="onFileSelected"
                />
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
                    Movie Description
                </label>
                <textarea class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    :value="description"    
                    @input="event => description = event.target.value"
                >
                </textarea>
            </div>
        
            <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="submit"
            @click="submitMovie()">
                Add Movie
            </button>
        
            </div>
        </form>
    </div>
</template>

<script setup>
    import {inject, ref} from "vue";
    import { useUserStore } from "@/store/userStore";
    const userData = useUserStore();
    // injecting wether or not this component should be displayed
    const display = inject("displayPostMovieModal");
    const movies = inject("movies");
    const apiUrl = process.env.VUE_APP_API_MOVIES;
    const name = ref("");
    const duration = ref(null);
    const description = ref("");
    const image = ref("");

    const  dropSelf = async () => {
        display.value = false;
    }

    const onFileSelected = (e) => {
        image.value = e.target.files[0]
    }

    const submitMovie = async () => {
        if ( image.value === "" || duration.value === 0 || description.value === "" || image.value === "" ) {
            return null;
        }
        
        const fd = new FormData();
        fd.append('file', image.value);

        const headers = {"content-type": "application/json",
                         "authorization": userData.getToken()
                        }

        const body = {name: name.value, durationMinutes: duration.value};
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
            })
        if (response.status > 201){
            return null;
        }
        const json_response = await response.json();
        const movieId = json_response.id;
        // this is the image upload part
        const headers2 =  { "Authorization": userData.getToken(),
                            //"Content-Type": 'multipart/form-data',
                        }
        
        // this is just not working
        const mresponse = await fetch(apiUrl + "/" + movieId + "/cover", {
            method: "POST",
            headers: headers2,
            body: fd
            })
        if ( mresponse.status > 201 ) {
            return null;
        }
        const movie = await mresponse.json()
        movie.img = `${apiUrl}/${movie.id}/cover`;
        // at this stage everything worked great. I just want to add the newly created movie to the array of movies
        // best option is to rerender movies component
        movies.value.push(movie);
        dropSelf();
    }

</script>
<script>

export default {
    name: "MoviePostForm",
    props: {
            display: Boolean
           }
}
</script>


<style scoped>
.layover {
    position: absolute;
    top: 0%;
    left: 0%;
    height: 100%;
    width: 100%;
    background-color: grey;
    opacity: 0.75;
}
.modal {
  position: absolute;
  top: 10%;
  left: 10%;
  height: 30rem;
  width: 80%;
  opacity: 1
  /*border: black solid 2px;
  border-radius: 5px;
  background-color: white;
  */
}

</style>