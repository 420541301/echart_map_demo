import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import baidumap from "@/components/baidu-map.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/echartmap",
    name: "echartmap",
    component: Home
  },
  {
    path: "/baidumap",
    name: "baidumap",
    component: baidumap
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
