import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const Tree = () =>
  import(/* webpackChunkName: "Error" */ "../views/tree/index.vue");
const TreeTable = () =>
  import(/* webpackChunkName: "Error" */ "../views/treetable/index.vue");

var router = new Router({
  routes: [
    {
      path: '/',
      redirect:'/tree'
    },
    { path: "/tree", name: "tree", component: Tree },
    { path: "/treetable", name: "treetable", component: TreeTable }
  ]
});
export default router;
