import instance from "@/config/axios_config";

export class MovieService {

    constructor(userStore, errorStore) {
        this.$userStore = userStore;
        this.$errorStore = errorStore;
        this.$backend = instance;
    }

 async getMovie (id){
     const response = await this.$backend.get("/movie/" + id, {
             headers: {
                 "content-type": "application/json",
             },
         }
     );
     if (response.status !== 200) {
         throw new Error("Could not fetch Movies.");
     }
     return response.data;
}

    async deleteMovie (id){
        const response = await this.$backend.delete("/movie/" + id, {
            headers: {"Authorization": this.$userStore.getToken(),},
            }
        );
        if (response.status !== 200) {
            throw new Error("Could not fetch Movies.");
        }
        return response.data;
    }

    async patchMovie (movie){

        const id = movie.id;
        movie.id = null;
        const response = await this.$backend.patch("/movie/" + id, movie,{
                headers: {"Authorization": this.$userStore.getToken(),},
            }
        );
        if (response.status !== 200) {
            throw new Error("Could not fetch Movies.");
        }
        movie.id = id;
        return response.data;
    }


    async updateCoverPicture(id, image) {
        const file = new FormData();
        file.append('file', image);

        const response = await this.$backend.post("/movie/" + id + "/cover", file, {
            headers: {"Authorization": this.$userStore.getToken(),},
        })
        if (response.status !== 200) {
            throw new Error("Could not upload profile picture.");
        }

    }

}