import {createRouter, createWebHistory} from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ImprintPage from '../pages/ImprintPage.vue'
import HelpPage from '../pages/HelpPage.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage
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
