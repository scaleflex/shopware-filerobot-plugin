import template from './sw-filerobot-library.html.twig';

const { Component } = Shopware;

Component.register('sw-filerobot-library', {
    template,
    inject: ['systemConfigApiService'],
    data() {
        return {
            frToken: '',
            frActivation: false,
            frSEC: '',
            frUploadDirectory: '',
            frSass: ''
        }
    },

    mounted() {
        let filerobotScript = document.createElement('script');
        filerobotScript.setAttribute('src', 'https://cdn.scaleflex.it/plugins/filerobot-widget/1.0.105/filerobot-widget.min.js');
        document.head.appendChild(filerobotScript);

        let filerobotStyle = document.createElement('link');
        filerobotStyle.setAttribute('src', 'https://cdn.scaleflex.it/plugins/filerobot-widget/1.0.105/filerobot-widget.min.css');
        filerobotStyle.setAttribute('type', 'text/css');
        filerobotStyle.setAttribute('rel', 'stylesheet');
        document.head.appendChild(filerobotStyle);
    },

    computed: {

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
                    .on('export', (files, popupExportSucessMsgFn, downloadFilesPackagedFn, downloadFileFn) => {
                        console.dir(files);
                        var to_insert = [];

                        files.forEach((selected, key) => {
                            to_insert.push(selected.file.uuid);
                        });

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

            }  else {
                console.log('Filerobot is unauthorized.');
            }
        }
    },
});
