import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import Details from "../views/details.vue";
import Lgoin from "../views/login.vue";
import Search from "../views/search.vue";
import Classify from "../views/classify.vue";
import MoreSuggest from "../views/moreSuggest.vue";
import LoginPhone from "../views/loginPhone.vue";
import Register from "../views/register.vue";
import Codelogin from "../views/codelogin.vue";
import Buyvip from "../views/buyvip.vue";
import Album from "../views/album.vue";
import User from "../views/myStuff.vue";
import AlbumPage from "../views/albumPage.vue";
import Mypage from "../views/myPage.vue";
import ClassifyPage from "../views/classifyPage.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  { path: "/albumPage", name: "albumPage", component: AlbumPage },
  { path: "/mypage", name: "mypage", component: Mypage },
  {
    path: "/classifyPage",
    name: "classifyPage",
    component: ClassifyPage,
  },
  {
    path: "/details",
    name: "details",
    component: Details,
  },
  {
    path: "/login",
    name: "login",
    component: Lgoin,
  },
  {
    path: "/search",
    name: "search",
    component: Search,
  },
  {
    path: "/classify",
    name: "classify",
    component: Classify,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/moreSuggest",
    name: "moreSuggest",
    component: MoreSuggest,
  },
  {
    path: "/loginPhone",
    name: "loginPhone",
    component: LoginPhone,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/codelogin",
    name: "codelogin",
    component: Codelogin,
  },
  {
    path: "/buyvip",
    name: "buyvip",
    component: Buyvip,
  },
  {
    path: "/album",
    name: "album",
    component: Album,
  },
  {
    path: "/user",
    name: "user",
    component: User,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
