import Vue from 'vue';
import VueRouter from 'vue-router';
import userRoutes from './userRouter.js';
import { auth } from '../services/firebase.js';
import Home from '../components/core/Home.vue';
import ListPage from '../components/shared/ListPage.vue';
import Details from '../components/recipes/Details.vue';
import Search from '../components/core/Search.vue';
import NotFound from '../components/core/NotFound.vue';

const Edit = () => import('../components/recipes/Edit.vue');
const Create = () => import('../components/recipes/Create.vue');

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                requiresAuth: false
            }
        },
        ...userRoutes,
        {
            path: '/recipes',
            name: 'recipes',
            component: ListPage,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/recipes/:category',
            name: 'recipesCategory',
            component: ListPage,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/details/:id',
            name: 'details',
            component: Details,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/edit/:id',
            name: 'edit',
            component: Edit,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/create',
            name: 'create',
            component: Create,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/search',
            name: 'search',
            component: Search,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '*',
            name: 'notFound',
            component: NotFound,
            meta: {
                requiresAuth: false
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    const { requiresAuth } = to.meta;
    const isLogged = !!auth.currentUser;

    if (requiresAuth) {
        if (isLogged) {
            next();
        } else {
            next('/login');
        }
    } else {
        next();
    }
})

export default router;