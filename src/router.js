import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';

function parseSoundsFromQuery(query) {
    const sounds = [];
    let i = 0;

    while (query[`s${i}`]) {
        sounds.push({
            id: query[`s${i}`],
            p: parseFloat(query[`p${i}`] || '1.0'),
            v: parseFloat(query[`v${i}`] || '1.0')
        });
        i++;
    }

    return sounds;
}

const routes = [
    {
        path: '/:category?',
        name: 'Home',
        component: Home,
        props: (route) => ({
            category: route.params.category || '',
            searchQueryProp: route.query.search || '',
            tagsProp: route.query.tags ? route.query.tags.split(',') : [],
            soundsProp: parseSoundsFromQuery(route.query)
        }),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;