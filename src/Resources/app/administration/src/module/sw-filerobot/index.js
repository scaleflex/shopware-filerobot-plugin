import './page/sw-filerobot-index';

Shopware.Module.register('sw-filerobot', {
    name: 'filerobot',
    title: 'sw-filerobot.general.mainMenuItemGeneral',
    description: 'sw-filerobot.general.descriptionTextModule',
    favicon: 'icon-module-content.png',
    color: '#ff68b4',
    icon: 'regular-image',

    routes: {
        index: {
            components: {
                default: 'sw-filerobot-index',
            },
            path: 'index'
        },
    },

    navigation: [{
        id: 'sw-filerobot',
        label: 'sw-filerobot.general.mainMenuItemGeneral',
        color: '#ff3d58',
        path: 'sw.filerobot.index',
        icon: 'regular-image',
        parent: 'sw-content',
        position: 30,
    }]
});