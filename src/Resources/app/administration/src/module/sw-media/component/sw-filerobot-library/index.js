import template from './sw-filerobot-library.html.twig';

const { Component } = Shopware;

Component.register('sw-filerobot-library', {
    template,

    props: {
        token: {
            type: String,
            required: true,
        },

        frSec: {
            type: String,
            required: true,
        },

        folderPath: {
            type: String,
            required: true,
            default: null,
        },
    },

    data() {
        return {
            isLoading: false,
            pageItem: 1,
            pageFolder: 1,
            itemLoaderDone: false,
            items: [],
            presentation: 'medium-preview',
            sorting: { sortBy: 'fileName', sortDirection: 'asc' },
            folderSorting: { sortBy: 'name', sortDirection: 'asc' },
        };
    },

    computed: {

    },

    watch: {

    },

    created() {
        if (this.validToken()) {
            this.createdComponent();
        }
    },

    methods: {
        createdComponent() {

        },
        async validToken()
        {
            let sass = '';
            let apiGetSass = 'https://api.filerobot.com/' + this.token + '/key/' + this.frSec;
            let responseSass = await fetch(apiGetSass,{
                method: 'GET',
                timeout: 30,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                }
            });
            responseSass = responseSass.json();

            if (responseSass.status !== undefined && responseSass.status !== 'error') {
                sass = responseSass.key;
            }

            if (sass !== '') {
                return false;
            }

            let endpoint = 'https://api.filerobot.com/' + this.token + '/v4/files?folder=/&limit=1&';
            let response = await fetch(endpoint,{
                method: 'GET',
                timeout: 30,
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'x-filerobot-key': sass
                }
            });
            response = response.json();

            if (response.status === 'success') {
                return true;
            } else {
                return false;
            }
        }
    },
});
