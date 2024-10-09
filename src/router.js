import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';

const routes = [
    {
        path: '/:category?',
        name: 'Home',
        component: Home,
        props: (route) => ({
            category: route.params.category || '',
            searchQueryProp: route.query.search || '',
            tagsProp: route.query.tags ? route.query.tags.split(',') : [],
        }),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;