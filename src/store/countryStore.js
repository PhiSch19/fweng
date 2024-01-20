import {defineStore} from 'pinia';

export const useCountryStore = defineStore('countries', {
    state: () => ({
        countries: null,
        priorities: ["Austria", "Germany", "Switzerland"]
    }),
    actions: {
        // setters

        async getCountries() {
            // checks if countries are already fetched from api
            if ( this.countries !== null ) {
                // yes -> return countries
                return this.countries;
            }
            // fetch countries
            await this.setCountries();
            return this.countries;
        },

        async setCountries() {

            const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flag,cca2");
            if ( response.status == 200 ){
                const rawCountries = await response.json();
                this.sortCountries(rawCountries);
                this.countries = rawCountries;
                }
        },

        sortCountries (obj){
            obj.sort((item1, item2) => {
                        
                const name1 = item1.name.common;
                const name2 = item2.name.common;
                // handle priorities
                if (this.priorities.includes(name1) && this.priorities.includes(name2)){
                     // all the rest is alphabetically
                    if (name1 < name2){
                        return -1;
                    }
                    if (name1> name2) {
                        return 1;
                    }
                    return 0;
                }
                if ( this.priorities.includes(name1) ){
                    return -1;
                }
                if (this.priorities.includes(name2)){
                    return 1;
                }
    
                // all the rest is alphabetically
                if (name1 < name2){
                    return -1;
                }
                if (name1> name2) {
                    return 1;
                }
                return 0;
            })

        }




    }
})