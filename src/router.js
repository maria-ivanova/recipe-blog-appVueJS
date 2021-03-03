import VueRouter from 'vue-router';
import { auth } from './services/firebase.js';
import Home from './components/core/Home.vue';
import ListPage from './components/shared/ListPage.vue';
import Details from './components/recipes/Details.vue';
import Search from './components/core/Search.vue';
import NotFound from './components/core/NotFound.vue';

const Login = () => import('./components/user/Login.vue');
const Register = () => import('./components/user/Register.vue');
const User  = () => import('./components/user/User.vue');
const Profile = () => import( './components/user/Profile.vue');
const Edit = () => import('./components/recipes/Edit.vue');
const Create = () => import('./components/recipes/Create.vue');
const MyRecipes = () => import('./components/user-recipes/MyRecipes.vue');
const Favorites = () => import('./components/user-recipes/Favorites.vue');

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
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                requiresAuth: false
            },
            beforeEnter: (to, from, next) => {
                if(auth.currentUser) {
                    next({name: 'profile'})
                }else {
                    next();
                }
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                requiresAuth: false
            },
            beforeEnter: (to, from, next) => {
                if(auth.currentUser) {
                    next({name: 'profile'})
                }else {
                    next();
                }
            }
        },
        {
            path: '/user/:name',
            component: User,
            children: [
                { 
                    path: 'profile',
                    name: 'profile',
                    component: Profile,
                    meta: {
                        requiresAuth: true
                    },
                }
            ]
        },
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
            path: '/user/:name',
            component: User,
            children: [
                { 
                    path: 'myRecipes',
                    name: 'myRecipes',
                    component: MyRecipes,
                    meta: {
                        requiresAuth: true
                    },
                }
            ]
        },
        {
            path: '/user/:name',
            component: User,
            children: [
                { 
                    path: 'favorites',
                    name: 'favorites',
                    component: Favorites,
                    meta: {
                        requiresAuth: true
                    },
                }
            ]
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
        }else {
            next('/login');
        }
    }else {
        next();
    }
})

export default router;