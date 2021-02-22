import VueRouter from 'vue-router';
import { auth } from './services/firebase.js';
import Home from './components/core/Home.vue';
import Login from './components/user/Login.vue';
import Register from './components/user/Register.vue';
import Profile from './components/user/Profile.vue';
import ListPage from './components/shared/ListPage.vue';
import Details from './components/recipes/Details.vue';
import Edit from './components/recipes/Edit.vue';
import Create from './components/recipes/Create.vue';
import MyRecipes from './components/user-recipes/MyRecipes.vue';
import Favorites from './components/user-recipes/Favorites.vue';
import Search from './components/core/Search.vue';
import NotFound from './components/core/NotFound.vue';

/*const HOME = '/';
const LOGIN = '/login';
const REGISTER = '/register';
const PROFILE = '/profile';
const CREATE = '/create';
const EDIT = '/edit';
const DETAILS = '/details';
const RECIPES = '/recipes';
const MY_RECIPES = '/myRecipes';
const FAVORITES_RECIPES = '/myFavorites';
const SEARCH = '/search';
const NOT_FOUND = '/notFound';
const ERROR = '/error';*/

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
                    next('/profile')
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
                    next('/profile')
                }else {
                    next();
                }
            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile,
            meta: {
                requiresAuth: true
            }
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
            path: '/myRecipes',
            name: 'myRecipes',
            component: MyRecipes,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/favorites',
            name: 'favorites',
            component: Favorites,
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
        }else {
            next('/login');
        }
    }else {
        next();
    }
})

export default router;