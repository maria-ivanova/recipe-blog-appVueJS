import VueRouter from 'vue-router';
import Home from './components/core/Home.vue';
import Login from './components/user/Login.vue';
import Register from './components/user/Register.vue';
import Profile from './components/user/Profile.vue';
import ListPage from './components/shared/ListPage.vue';
import Details from './components/recipes/Details.vue';

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
            component: Home
        },
        {
            path: '/login', 
            name: 'login',
            component: Login
        },
        {
            path: '/register', 
            name: 'register',
            component: Register
        },
        {
            path: '/profile', 
            name: 'profile',
            component: Profile
        },
        {
            path: '/recipes', 
            name: 'recipes',
            component: ListPage
        },
        {
            path: '/recipes/:category', 
            name: 'recipesCategory',
            component: ListPage
        },
        {
            path: '/details/:id', 
            name: 'details',
            component: Details
        }
    ]
})

export default router;