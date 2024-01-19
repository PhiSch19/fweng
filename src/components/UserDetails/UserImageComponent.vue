<template>
     <img :src="profile_picture.img"  
                :alt="profile_picture.alt"
                class="w-30 h-30 rounded-full mx-8" 
            />
            <div>role: {{ userData.role }}</div>


</template>


<script>

export default {
    name: "UserImageComponent"
}
</script>