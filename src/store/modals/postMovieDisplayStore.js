import {defineStore} from 'pinia';

export const formDisplayPostMovie = defineStore('usePostMovieDisplayStore', {
    state: () => ({
        display: false,
    }),
    
    actions: {
        setDisplay(newState) {
            this.display = newState;
        }
    }
})