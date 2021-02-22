## Spatulas Recipe Blog
Culinary blog web application. Selection of recipes published by users and grouped by categories.
Provides the ability to register, log in and log out of user profiles.

Тhis user profile can be used for testing:
user: test@test.com
password: 123456

1. git clone
2. npm install
3. npm run serve

## Technology stack
- Vue CLI
- Vuelidate
- Vuex
- Axios
- Firebase
- Fontawesome


## Application Structure
The application have:
- public part (accessible without authentication)
- private part (available for registered users)

### Public part
The public part is visible without authentication.
- home page
- login page
- register page
- list page of all recipes by category
- details recipe page
- search page

### Private Part
Registered users have personal area in the web application accessible after successful login.
- profile page
- create recipe page
- edit recipe page
- details recipe page
- my recipes
- favorites recipes

## Functionalities
### Authentication and authorization
Firebase is used for authentication and authorization. This functionality includes:
- login of an existing user
- new user registration
- profile - each logged in user can change their password

### Recipes Functionalities
These features are only available to logged in users:
- create recipe - any registered user can publish a recipe. Recipes are stored in Firebase Realtime database.
- edit recipe - only the creator of the recipe can edited it.
- delete recipe - only the creator of the recipe can delete it.
- аdd favorite recipe - only a logged in user who has not created the recipe can add the recipe to favorites.
The creator of the recipe cannot add it to favorites.

### My recipes
Recipes created by the current user.

### My favorites
Add recipes in favorites.

### Search 
Search recipes by title, ingredients, recipe description, category

## Routing
| Route	| Description | Page |
|-------|-------------|------|
|/      |Home         |http://localhost:8080/|
|/login|Login page|http://localhost:8080/login|
|/register|Register page|http://localhost:8080/register|
|/user/:username/profile|Profile page|http://localhost:8080/user/:user1/profile|
|/create|Create a new recipe|http://localhost:8080/create|
|/edit/:id|Edit recipe|http://localhost:8080/edit/-MERIK5gpVS9e_lk7CvH|
|/details/:id|Details recipe page|http://localhost:8080/details/-MERIK5gpVS9e_lk7CvH|
|/recipes/:categoryName|Recipes page by category|http://localhost:8080/recipes/Салати|
|/user/:username/myRecipes|Recipes published by the user|http://localhost:8080/user/:user1/myRecipes|
|/user/:username/favorites|User's favorite recipes|http://localhost:8080/user/:user1/favorites|
|/search|Search page|http://localhost:8080/search|

