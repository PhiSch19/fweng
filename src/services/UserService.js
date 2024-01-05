const apiUserUrl = process.env.VUE_APP_API_USER;

export class UserService {

    userStore;

    constructor(userStore) {
        this.userStore = userStore;
    }

    async fillStoreFromApi() {
        let userStore = this.userStore;
        if(!userStore.userId) {
            return;
        }
        const response = await fetch(apiUserUrl + "/" + userStore.userId + "/details", {
            method: "GET",
            headers: {"content-type": "application/json",},
        })
        if (response.status !== 200) {
            throw new Error("Could not register this user. Please try again");
        }
        const jsonResponse = await response.json();
        userStore.setFirstName(jsonResponse.firstname);
        userStore.setLastName(jsonResponse.lastname);
        userStore.setGender(jsonResponse.salutation);
        userStore.setEmail(jsonResponse.email);
        userStore.setCountry(jsonResponse.country);
        userStore.setProfilePictureId(jsonResponse.profilePictureId);
    }





}
