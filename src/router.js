import VueRouter from 'vue-router';
import Home from './components/core/Home.vue';
import Login from './components/user/Login.vue';

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
        }
    ]
})

export default router;