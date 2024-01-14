
import instance from "@/config/axios_config";
export class UserService {

    $userStore;

    constructor(userStore) {
        this.$userStore = userStore;
        this.$backend = instance;
    }

    async fillStoreFromApi() {
        const userStore = this.$userStore;
        if(!userStore.userId) {
            return;
        }
        /*
        const response = await fetch(apiUserUrl + "/" + userStore.userId + "/details", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": userStore.getToken(),
            },
        })
        */

        const response = await this.$backend.get("/user/" + userStore.userId + "/details", {
              headers: {
                    "content-type": "application/json",
                    "Authorization": userStore.getToken(),
                    },
                }
            );
            console.log(response);


        if (response.status !== 200) {
            throw new Error("Could not register this user. Please try again");
        }
        const jsonResponse = response.data;
        userStore.setFirstName(jsonResponse.firstname);
        userStore.setLastName(jsonResponse.lastname);
        userStore.setGender(jsonResponse.salutation);
        userStore.setEmail(jsonResponse.email);
        userStore.setCountry(jsonResponse.country);
        userStore.setProfilePictureId(jsonResponse.profilePictureId);
    }


    async register(user, image){

        /*
        const response = await fetch(apiRegisterUrl, {
              method: "POST",
              headers: {"content-type": "application/json",},
              body: JSON.stringify(user)
            })
        */
        const response = await this.$backend.post("/user/register", user, {
            headers: {"content-type": "application/json",},
            //body: JSON.stringify(user)
        })
        
        
        
            if (response.status !== 200) {
              throw new Error("Could not register this user. Please try again");
        }
        const jsonResponse = response.data;
        await this.authenticate(user);
        if(image){await this.updateProfilePicture(jsonResponse.id, image);}
        await this.fillStoreFromApi(jsonResponse.id);
        return true;  


    }

    async authenticate(auth){
        /*
        const response = await fetch(apiAuthenticateUrl, {
            method: "POST",
            headers: {"content-type": "application/json",},
            body: JSON.stringify(auth)
          })
        */
        const response = await this.$backend.post("/user/token", auth, {
            headers: {"content-type": "application/json",},
        })

        if (response.status !== 200) {
            throw new Error("Could not authenticate.");
        }
          const json_response = response.data;
          this.$userStore.setToken(json_response);
          await this.fillStoreFromApi();

    }

    async updateProfilePicture(userId, image){
        const file = new FormData();
        file.append('file', image);
        /*
        const url = "/user/" + userId + "/profile-picture"
        const response = await fetch(url, {
        method: "POST",
        headers: {"Authorization": this.$userStore.getToken(),},
        body: body
        });
        */
        const response = await this.$backend.post("/user/" + userId + "/profile-picture", file, {
            headers: {"Authorization": this.$userStore.getToken(),},
        })
        if (response.status !== 200) {
            throw new Error("Could not upload profile picture.");
        }
        console.log(response.data)

    }

    getImageLink(){

        const backend_url = "http://localhost:8081"
        const profile = {}
        
        if(this.$userStore.profilePictureId){
            profile.img = `${backend_url}/file/${this.$userStore.profilePictureId}/download`
            profile.alt = `profile picture of user ${this.$userStore.username}`
        }else{
            profile.img = require("@/assets/default_cover.jpg");
            profile.alt = `placeholder profile image as user ${this.$userStore.username} did not provide one.`
        }
        return profile

            }
}
