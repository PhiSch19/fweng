import {createRouter, createWebHistory} from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ImprintPage from '../pages/ImprintPage.vue'
import HelpPage from '../pages/HelpPage.vue'
import MoviesPage from '../pages/MoviesPage.vue'
import MoviePage from '../pages/MoviePage.vue'
import ProfilePage from '../pages/ProfilePage.vue'
import ProfilesPage from "@/pages/ProfilesPage.vue"

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: "/profile/:id",
        name: "profile",
        component: ProfilePage
    },
    {   
        path: "/movies",
        name: "movies",
        component: MoviesPage

    },
    {   
        path: "/movie/:id",
        name: "movie",
        component: MoviePage

    },
    {
        path: '/help',
        name: 'help',
        component: HelpPage
    },
    {
        path: '/imprint',
        name: 'imprint',
        component: ImprintPage
    },
    {

        path: "/profiles",
        name: "profiles",
        component: ProfilesPage
    },

    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../pages/AboutPage.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
