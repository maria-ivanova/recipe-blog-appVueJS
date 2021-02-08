import VueRouter from 'vue-router';
import Home from './components/core/Home.vue';
import Login from './components/user/Login.vue';
import Register from './components/user/Register.vue';
import Profile from './components/user/Profile.vue';

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/', 
            component: Home
        },
        {
            path: '/login', 
            component: Login
        },
        {
            path: '/register', 
            component: Register
        },
        {
            path: '/profile', 
            component: Profile
        }
    ]
})

export default router;