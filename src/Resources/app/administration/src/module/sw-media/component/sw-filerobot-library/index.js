import template from './sw-filerobot-library.html.twig';

const { Component, Context } = Shopware;

Component.register('sw-filerobot-library', {
    template,
    inject: ['systemConfigApiService', 'repositoryFactory'],

    model: {
        prop: 'selection',
        event: 'media-selection-change',
    },

    props: {
        frActivation: {
            type: Boolean,
            required: false,
            default: false,
        },

        frToken: {
            type: String,
            required: false,
            default: null,
        },

        frSEC: {
            type: String,
            required: false,
            default: null,
        },

        frUploadDirectory: {
            type: String,
            required: false,
            default: null,
        },

        frSass: {
            type: String,
            required: false,
            default: null,
        },

        selection: {
            type: Array,
            required: true,
        },

    },
    data() {
        return {
            selectedItems: this.selection,
        }
    },

    mounted() {
        let filerobotScript = document.createElement('script');
        filerobotScript.setAttribute('src', 'https://cdn.scaleflex.it/plugins/filerobot-widget/1.0.105/filerobot-widget.min.js');
        document.head.appendChild(filerobotScript);
    },

    computed: {
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },
    },

    watch: {

    },

    created() {
        this.createdComponent();
    },

    methods: {
        async validToken()
        {
            const frConfig = await this.systemConfigApiService.getValues('ScaleflexFilerobot.config');
            let frActivation = frConfig['ScaleflexFilerobot.config.frActivation'];
            let frSEC = frConfig['ScaleflexFilerobot.config.frSEC'];
            let frToken = frConfig['ScaleflexFilerobot.config.frToken'];
            let frUploadDirectory = frConfig['ScaleflexFilerobot.config.frUploadDirectory'];

            if (frActivation === true) {
                if (frToken !== '' || frSEC !== '') {
                    let sass = '';
                    let apiGetSass = 'https://api.filerobot.com/' + frToken + '/key/' + frSEC;
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
                        console.log('Filerobot has faild to get key.');
                        return false;
                    } else {
                        this.frToken = frToken;
                        this.frSass = sass;
                        this.frUploadDirectory = frUploadDirectory;
                        this.frActivation = frActivation;
                        this.frSEC = frSEC;
                        return true;
                    }
                } else {
                    console.log('Filerobot token or Security template identifier is empty');
                    return false;
                }
            }  else {
                console.log('Filerobot is not active');
                return false;
            }
        },

        async createdComponent() {
            if (await this.validToken()) {
                let current_url = window.location.href;
                let swMediaSidebarElement = document.getElementsByClassName("sw-media-sidebar no-headline");
                swMediaSidebarElement[0].style.display = 'none';
                if (!Filerobot) {
                    var Filerobot = window.Filerobot;
                }

                let filerobot = null;

                filerobot = Filerobot.Core({
                    securityTemplateID : this.frSEC,
                    container          : this.frToken,
                });

                // Plugins
                var Explorer  = Filerobot.Explorer;
                var XHRUpload = Filerobot.XHRUpload;

                // Optional plugins:
                var ImageEditor = Filerobot.ImageEditor;
                var Webcam      = Filerobot.Webcam;

                filerobot
                    .use(Explorer, {
                        config: {
                            rootFolderPath: this.frUploadDirectory
                        },
                        target : '#filerobot-widget',
                        inline : true,
                        width  : 10000,
                        height : 1000,
                        locale: {
                            strings: {
                                export: 'Insert from FMAW into page'
                            }
                        },
                    })
                    .use(XHRUpload)
                    .on('export', async (files, popupExportSucessMsgFn, downloadFilesPackagedFn, downloadFileFn) => {
                        console.dir(files);
                        var to_insert = [];

                        files.forEach((selected, key) => {
                            to_insert.push(selected.file.uuid);
                        });

                        //step 1: create media form filerobot
                        // Resources/app/administration/src/app/component/media/sw-media-upload-v2/index.js line 382 example

                        //step 2: get media insert
                        // let media = await this.mediaRepository.get('70e352200b5c45098dc65a5b47094a2a', Context.api);

                        //step 3: add media to this.selectedItems

                        //step 4: add media to product media
                        // -> need to try this function -> this.$emit('media-selection-change', this.selectedItems);

                        if (to_insert.length === 0) {
                            return;
                        }
                    })
                    .on('complete', ({failed, uploadID, successful}) => {
                        if (failed) {
                            console.dir(failed);
                        }

                        if (successful) {
                            console.dir(successful);

                            var to_insert = [];

                            successful.forEach((item, key) => {
                                to_insert.push(item.uuid);
                            });
                        }
                    });

                setTimeout(function () {
                    window.history.pushState(null, document.title, current_url);
                }, 1000);

                console.log('Filerobot is ready');
            }  else {
                console.log('Filerobot is unauthorized.');
            }
        }
    },
});
