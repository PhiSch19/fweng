/*Error State Manager*/
import {defineStore} from 'pinia';

export const useErrorStore = defineStore('error', {
    state: () => ({
        error: null
    }),
    actions: {
        // setters
        async setError(errorMessage) {
            this.error = errorMessage;
        },
    }
})