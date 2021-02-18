import VueRouter from 'vue-router';
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
        },
        {
            path: '/edit/:id', 
            name: 'edit',
            component: Edit
        },
        {
            path: '/create', 
            name: 'create',
            component: Create
        },
        {
            path: '/myRecipes', 
            name: 'myRecipes',
            component: MyRecipes
        },
        {
            path: '/favorites', 
            name: 'favorites',
            component: Favorites
        },
        {
            path: '/search', 
            name: 'search',
            component: Search
        },
        {
            path: '*',
            name: 'notFound',
            component: NotFound
          }
    ]
})

export default router;