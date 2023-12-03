import {defineStore} from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        userId: "",
        username: "guest",
        role: "Visitor",
    }),
    
    actions: {
        setUserName(newName) {
            this.username = newName;
        },
        setUserId(newUserId) {
            this.userId = newUserId;
        },
        setRole(newRole) {
            this.role = newRole
        }
    }
})