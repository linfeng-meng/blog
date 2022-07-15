import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const routes = [
    // {
    //     path: "/",
    //     redirect: {
    //         name: "home",
    //     },
    // },
    {
        path: "/",
        redirect: "/home",
        component: () =>
            import(/* webpackChunkName: "index" */ "@/components/layout/Index.vue"),
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@/views/Home/Index.vue'),
            },
            // {
            //     path: "articles",
            //     name: "articles",
            //     component: () =>
            //         import(/* webpackChunkName: "index" */ "@/views/Articles/Index.vue"),
            // },
            {
                path: "articles/Details",
                name: "articlesDetails",
                component: () =>
                    import(/* webpackChunkName: "index" */ "@/views/Articles/Details.vue"),
            },
            {
                path: "archives",
                name: "archives",
                component: () =>
                    import(/* webpackChunkName: "index" */ "@/views/Archives/Index.vue"),
            },
            {
                path: "categories",
                name: "categories",
                component: () =>
                    import(/* webpackChunkName: "index" */ "@/views/Categories/Index.vue"),
            },
            {
                path: "categories/details",
                name: "categoriesDetails",
                component: () =>
                    import(/* webpackChunkName: "index" */ "@/views/Categories/Details.vue"),
            },
            {
                path: "tags",
                name: "tags",
                component: () =>
                    import(/* webpackChunkName: "index" */ "@/views/Tags/Index.vue"),
            },
            {
                path: "tags/details",
                name: "tagsDetails",
                component: () =>
                    import(/* webpackChunkName: "index" */ "@/views/Tags/Details.vue"),
            },
            {
                path: "about",
                name: "about",
                component: () =>
                    import(/* webpackChunkName: "index" */ "@/views/About/Index.vue"),
            },
        ]
    },

];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});
export default router;