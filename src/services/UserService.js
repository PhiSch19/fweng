import instance from "@/config/axios_config";
import { passwordValidator } from "@/composables/validators";
export class UserService {

    constructor(userStore, errorStore) {
        this.$userStore = userStore;
        this.$backend = instance;
        this.$errorStore = errorStore;
    }

    async fillStoreFromApi() {
        const userStore = this.$userStore;
        if (!userStore.userId) {
            return;
        }

        const response = await this.$backend.get("/user/" + userStore.userId + "/details", {
                headers: {
                    "content-type": "application/json",
                    "Authorization": userStore.getToken(),
                },
            }
        );

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

    async register(user, image) {

        const response = await this.$backend.post("/user/register", user, {
            headers: {"content-type": "application/json",},

        })


        if (response.status !== 200) {
            throw new Error("Could not register this user. Please try again");
        }
        const jsonResponse = response.data;
        await this.authenticate(user);
        if (image) {
            await this.updateProfilePicture(jsonResponse.id, image);
        }
        await this.fillStoreFromApi(jsonResponse.id);
        return true;


    }

    async authenticate(auth) {
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

    async updateProfilePicture(userId, image) {
        const file = new FormData();
        file.append('file', image);

        const response = await this.$backend.post("/user/" + userId + "/profile-picture", file, {
            headers: {"Authorization": this.$userStore.getToken(),},
        })
        if (response.status !== 200) {
            throw new Error("Could not upload profile picture.");
        }

    }

    getImageLink() {

        const backend_url = "http://localhost:8081"
        const profile = {}

        if (this.$userStore.profilePictureId) {
            profile.img = `${backend_url}/file/${this.$userStore.profilePictureId}/download`
            profile.alt = `profile picture of user ${this.$userStore.username}`
        } else {
            profile.img = require("@/assets/default_cover.jpg");
            profile.alt = `placeholder profile image as user ${this.$userStore.username} did not provide one.`
        }
        return profile

    }

    async getById(userId) {
        const response = await this.$backend.get(`/user/${userId}/details`, {
            headers: {"Authorization": this.$userStore.getToken(),},
        })

        if (response.status === 200) {
            return response.data
        } else if (response.status === 401 || response.status === 403) {
            throw new Error("You are not authorized to see other users.");

        } else {
            throw new Error("Something went wrong");
        }


    }

    getProfileImage(profilePictureId) {

        const backend_url = "http://localhost:8081"
        const profile = {}

        if (profilePictureId) {
            profile.img = `${backend_url}/file/${profilePictureId}/download`
            profile.alt = `a profile image`
        } else {
            profile.img = require("@/assets/default_cover.jpg");
            profile.alt = `placeholder profile image as the user did not provide an image`
        }
        return profile
    }

    async patchUser(userId, userObject) {
        const patchBody = {};
        // need to map the userBojet to the required keys for the patch body
        userObject.lastName ? patchBody.lastname = userObject.lastName : null;
        userObject.firstName ? patchBody.firstname = userObject.firstName : null;
        userObject.userName ? patchBody.username = userObject.userName : null;
        userObject.gender ? patchBody.salutation = userObject.gender : null;
        userObject.country ? patchBody.country = userObject.country : null;
        userObject.role ? patchBody.role = userObject.role : null;
        userObject.password ? patchBody.password = userObject.password : null;

        if (userObject.password && userObject.password.length !== 12 ){
            await this.updatePassword(userId, userObject.password);

        }

        try {
            const response = await this.$backend.patch("/user/" + userId + "/details", patchBody, {
                headers: {"Authorization": this.$userStore.getToken(),},
            })
            if (response.status !== 200) {
                throw new Error("Could not upload profile picture.");
            }
            if (patchBody.role) {
                await this.updateRole(userId, patchBody.role);
            }


        } catch (e) {
            this.$errorStore.setError(e)

        }
    }

    async updateRole(userId, role) {
        try {
            const response = await this.$backend.post("/user/" + userId + "/role", role, {
                headers: {
                    "Authorization": this.$userStore.getToken(),
                    "Content-Type": "text/plain"

                },
            })
            if (response.status !== 200 && response.status !== 201) {
                throw new Error(`Role could not be changed. status ${response.status}`);
            }
        } catch (e) {
            this.$errorStore.setError(e)

        }
    }


    async updatePassword(userId, password) {
        
        if(!passwordValidator(password)){
            this.$errorStore.setError("invalid password");
        }
        
        try {
            const response = await this.$backend.put("/user/" + userId + "/password", password, {
                headers: {
                    "Authorization": this.$userStore.getToken(),
                    "Content-Type": "text/plain"

                },
            })
            if (response.status !== 200 && response.status !== 201) {
                throw new Error(`Password could not be changed. status ${response.status}`);
            }
        } catch (e) {
            this.$errorStore.setError(e)

        }
    }

    async toggleActive(userId) {
        try {
            const response = await this.$backend.post("/user/" + userId + "/activeState", null, {
                headers: {"Authorization": this.$userStore.getToken(),},
            })
            if (response.status !== 200 && response.status !== 201) {
                throw new Error(`Could not change active status. Status Code ${response.status}`);
            }
        } catch (e) {
            this.$errorStore.setError(e)
        }

    }

    async getUsers() {
        try {
            const response = await this.$backend.get("/user", {
                headers: {"Authorization": this.$userStore.getToken(),},
            })
            if (response.status !== 200) {
                throw new Error("Could not upload profile picture.");
            }

            return response.data;

        } catch (e) {
            this.$errorStore.setError(e)
            return null;

        }


    }

    async deleteUser(userId) {
        try {
            const response = await this.$backend.delete("/user/" + userId, {
                headers: {"Authorization": this.$userStore.getToken(),},
            })
            if (response.status > 299) {
                throw new Error(`Could not delete user. Status Code ${response.status}`);
            }
        } catch (e) {
            this.$errorStore.setError(e)
        }


    }


}
