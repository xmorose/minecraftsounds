import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';

function parseSoundsFromQuery(query) {
    const sounds = [];
    let i = 0;

    while (query[`s${i}`]) {
        sounds.push({
            soundFileName: query[`s${i}`].replace(/\./g, '/'),
            pitch: parseFloat(query[`p${i}`] || '1.0'),
            volume: parseFloat(query[`v${i}`] || '1.0')
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
            searchQuery: route.query.search || '',
            tags: route.query.tags ? route.query.tags.split(',') : [],
            initialSounds: parseSoundsFromQuery(route.query)
        }),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;