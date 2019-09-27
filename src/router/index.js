import Vue from "vue";
import Router from "vue-router";
import PageFront from "@/components/PageFront";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "PageFront",
      component: PageFront
    }
  ]
});
