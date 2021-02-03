<template>
  <div>
    <button @click="setOpen()" class="btn_mobile_menu">
      <font-awesome-icon icon="bars" />
    </button>

    <div class="mobile_menu" :class="{open: isOpen}">
      <button @click="setOpen()" class="close_mobile_menu">
        <font-awesome-icon icon="times" />
      </button>

      <nav>
        <ul>
          <li><a href="">Начало</a></li>
         <!-- <li *ngFor="let category of allCategories">
            <a [routerLink]="[ROUTES.RECIPES, category]">{{ category }}</a>
          </li>

          <li *ngIf="!loggedUser"><a [routerLink]="[ROUTES.LOGIN]">Вход</a></li>
          <li *ngIf="!loggedUser">
            <a [routerLink]="[ROUTES.REGISTER]">Регистрация</a>
          </li>

          <li *ngIf="loggedUser">
            <a [routerLink]="[ROUTES.CREATE]">Създай рецепта</a>
          </li>
          <li *ngIf="loggedUser">
            <a [routerLink]="[ROUTES.MY_RECIPES]">Моите рецепти</a>
          </li>
          <li *ngIf="loggedUser">
            <a [routerLink]="[ROUTES.FAVORITES_RECIPES]">Любими рецепти</a>
          </li>
          <li *ngIf="loggedUser">
            <a [routerLink]="[ROUTES.PROFILE]">Профил</a>
          </li>
          <li *ngIf="loggedUser"><span (click)="logout()">Изход</span></li>-->
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "MobileMenu",
  data: function () {
    return {
      isOpen: false,
    };
  },
  methods: {
    setOpen() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn_mobile_menu {
  display: none;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 26px;
  border: none;
  background-color: #66a55f;
  color: #fff;
  text-align: center;
  cursor: pointer;
}

.close_mobile_menu {
  display: inline-block;
  position: absolute;
  top: 0;
  left: -40px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 26px;
  border: none;
  background-color: #66a55f;
  color: #fff;
  text-align: center;
  cursor: pointer;
}

.mobile_menu {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100%;
  background-color: #333;
  font-size: 14px;
  color: #fff;
  z-index: 1001;
  transform: translateX(300px);
  -webkit-transition: all 0.5s ease-out;
  -moz-transition: all 0.5s ease-out;
  -o-transition: all 0.5s ease-out;
  transition: all 0.5s ease-out;
}

.mobile_menu.open {
  transform: translateX(0);
}

.mobile_menu ul {
  display: inline-block;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.mobile_menu li {
  position: relative;
  display: inline-block;
  float: left;
  width: 100%;
  padding: 0 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-weight: 700;
  color: #333;
  text-transform: uppercase;
}

.mobile_menu a,
.mobile_menu span {
  display: inline-block;
  padding: 12px 20px;
  color: #fff;
  text-transform: none;
}

.mobile_menu span {
  cursor: pointer;
}

@media (max-width: 1024px) {
  .btn_mobile_menu,
  .mobile_menu {
    display: inline-block;
  }
}

@media (max-width: 700px) {
  .btn_mobile_menu {
    position: absolute;
    top: 37px;
    right: 2%;
  }
}

@media (max-width: 400px) {
  .btn_mobile_menu {
    position: static;
    margin-top: 20px;
  }
}
</style>
