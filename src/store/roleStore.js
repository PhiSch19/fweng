import {defineStore} from 'pinia';

export const useRoleStore = defineStore('roles', {
    state: () => ({
        roles: ["ROLE_USER", "ROLE_STAFF", "ROLE_ADMIN"]
    }),
    actions: {
        // setters
        async getRoles() {
            // checks if countries are already fetched from api
            if ( this.countries !== null ) {
                // yes -> return countries
                return this.countries;
            }
            // fetch countries
            await this.setCountries();
            return this.countries;
        },
    }
})