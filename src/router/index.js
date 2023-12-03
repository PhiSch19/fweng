import {createRouter, createWebHistory} from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ImprintPage from '../pages/ImprintPage.vue'
import HelpPage from '../pages/HelpPage.vue'
import MoviesPage from '../pages/MoviesPage.vue'
import RoomsPage from '../pages/RoomsPage.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {   
        path: "/movies",
        name: "movies",
        component: MoviesPage

    },
    {   
        path: "/rooms",
        name: "rooms",
        component: RoomsPage

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
