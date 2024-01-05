import {defineStore} from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        userId: "",
        firstName: "",
        lastName: "",
        username: "guest",
        email: "",
        country: "",
        role: "Visitor",
        profilePictureId: null
    }),
    
    actions: {
        // setters
        setUserName(newName) {this.username = newName;},
        setUserId(newUserId) {this.userId = newUserId;},
        setRole(newRole) {this.role = newRole;},
        setFirstName(newFirstName){this.firstName = newFirstName;},
        setLastName(newLastName){this.lastName = newLastName;},
        setCountry(newCountry){this.country = newCountry;},
        setGender(newGender){this.gender = newGender;},
        setEmail(newEmail){this.email = newEmail;},
        setProfilePictureId(id) {this.profilePictureId = id;},

        setToken(obj) {
            // manages to retrieve issued token
            localStorage.setItem("access_token", "Bearer " + obj.token);
            const parsed_token = JSON.parse(atob(obj.token.split('.')[1]));
            this.setUserName(parsed_token.username);
            this.setRole(parsed_token.role);
            this.setUserId(parsed_token.sub);
        },
        // getters
        getToken(){
            return localStorage.getItem("access_token")
        },
        isAdmin(){
            if ( this.role ==="ROLE_ADMIN" ){return true;}
            return false;
        },
        isStaff(){
            if ( ["ROLE_ADMIN", "ROLE_STAFF"].includes(this.role) ){return true;}
            return false;

        },
        logout() {
            // manages logout
            this.role = "Visitor";
            this.username = "guest";
            this.userId = ""
            this.firstName = "";
            this.lastName = "";
            this.email = "";
            this.gender = "";
            this.country = "";
            localStorage.setItem("access_token", null);
        },
    }
})