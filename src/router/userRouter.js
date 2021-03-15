import { auth } from '../services/firebase.js';

const User = () => import('../components/user/User.vue');
const Login = () => import('../components/user/Login.vue');
const Register = () => import('../components/user/Register.vue');
const Profile = () => import('../components/user/Profile.vue');
const MyRecipes = () => import('../components/user-recipes/MyRecipes.vue');
const Favorites = () => import('../components/user-recipes/Favorites.vue');

const userRoutes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            requiresAuth: false
        },
        beforeEnter: (to, from, next) => {
            if (auth.currentUser) {
                next({ name: 'profile' })
            } else {
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
            if (auth.currentUser) {
                next({ name: 'profile' })
            } else {
                next();
            }
        }
    },
    {
        path: '/user/:name',
        component: User,
        redirect: { name: 'profile' },
        children: [
            {
                path: 'profile',
                name: 'profile',
                component: Profile,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: 'myRecipes',
                name: 'myRecipes',
                component: MyRecipes,
                meta: {
                    requiresAuth: true
                },
            },
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
]

export default userRoutes;