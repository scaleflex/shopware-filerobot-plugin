import template from './sw-media-modal-v2.html.twig';

Shopware.Component.override('sw-media-modal-v2', {
    template,
    inject: ['systemConfigApiService'],
    props: {
        defaultTab: {
            type: String,
            required: false,
            validValues: ['upload', 'library', 'filerobot'],
            validator(value) {
                return ['upload', 'library', 'filerobot'].includes(value);
            },
        }
    },
    computed: {
        tabFilerobotDAM() {
            return 'filerobot';
        }
    }
});