import {defineStore} from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        userId: "",
        username: "guest",
        role: "Visitor",

    }),
    
    actions: {
        // setters
        setUserName(newName) {
            this.username = newName;
        },
        setUserId(newUserId) {
            this.userId = newUserId;
        },
        setRole(newRole) {
            this.role = newRole;
        },
        setToken(obj) {
            // manages to retrieve issued token
            localStorage.setItem("access_token", "Bearer " + obj.token);
            const parsed_token = JSON.parse(atob(obj.token.split('.')[1]));
            //console.log(parsed_token);
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
            localStorage.setItem("access_token", null);
        },
    }
})