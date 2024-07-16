import template from './sw-filerobot-index.html.twig';

const { Component } = Shopware;

Component.register('sw-filerobot-index', {
    template,

    inject: ['systemConfigApiService', 'repositoryFactory', 'mediaService'],

    props: {
        selection: {
            type: Array,
            required: true,
        },
    },

    data() {
        return {
            isLoading: false,
            term: this.$route.query ? this.$route.query.term : '',
        };
    },

    mounted() {
        let filerobotScript = document.createElement('script');
        filerobotScript.setAttribute('src', 'https://cdn.scaleflex.com/plugins/filerobot-widget/v3/latest/filerobot-widget.min.js');
        filerobotScript.setAttribute('async', 'true');
        document.head.appendChild(filerobotScript);

        let frScriptDelete = document.createElement('script');
        frScriptDelete.innerHTML = 'delete Filerobot';
        document.head.appendChild(frScriptDelete);
    },

    metaInfo() {
        return {
            title: this.$createTitle(),
        };
    },

    created() {
        this.createdComponent();
    },

    methods: {
        async createdComponent() {
            const frConfig = await this.systemConfigApiService.getValues('ScaleflexFilerobot.config');
            let frActivation = frConfig['ScaleflexFilerobot.config.frActivation'];
            let frSEC = frConfig['ScaleflexFilerobot.config.frSEC'];
            let frToken = frConfig['ScaleflexFilerobot.config.frToken'];

            if (frActivation === true && frToken !== '' && frSEC !== '') {
                this.mediaService.addListener(this.uploadTag, this.handleMediaServiceUploadEvent);

                //wait library loaded
                await this.waitFilerobotLibrary();
                let Filerobot = window.Filerobot;

                let filerobot = null;

                filerobot = Filerobot.Core({
                    securityTemplateID: frSEC,
                    container: frToken
                });
                this.renderWidget(filerobot, frConfig);
            } else {
                this.createNotificationError({
                    title: this.$tc('global.default.error'),
                    message: this.$tc('frErrors.unauthorized')
                });
            }
        },

        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

        waitFilerobotLibrary() {
            return new Promise(function (resolve, reject) {
                let check = false;
                while (!check) {
                    if (window.Filerobot !== undefined) {
                        check = true;
                        resolve(true);
                    }
                }
            });
        },

        renderWidget(filerobot, frConfig) {
            let frUploadDirectory = frConfig['ScaleflexFilerobot.config.frUploadDirectory'];

            // Plugins
            let Explorer = Filerobot.Explorer;
            let XHRUpload = Filerobot.XHRUpload;

            // Optional plugins:
            let ImageEditor = Filerobot.ImageEditor;
            // let Webcam = Filerobot.Webcam;

            filerobot
                .use(Explorer, {
                    config: {
                        rootFolderPath: frUploadDirectory
                    },
                    target: '#filerobot-widget',
                    inline: true,
                    width: "100%",
                    height: 1000,
                    disableExportButton: false,
                    hideExportButtonIcon: true,
                    preventExportDefaultBehavior: true,
                    dismissUrlPathQueryUpdate: true,
                    disableDownloadButton: false,
                    hideDownloadButtonIcon: true,
                    preventDownloadDefaultBehavior: true,
                    locale: {
                        strings: {
                            mutualizedExportButtonLabel: this.$tc('frWidgetLocale.button.export'),
                            mutualizedDownloadButton: this.$tc('frWidgetLocale.button.export')
                        }
                    },
                })
                .use(XHRUpload)
                .use(ImageEditor)
                .on('export', async (files, popupExportSuccessMsgFn, downloadFilesPackagedFn, downloadFileFn) => {

                })
                .on('complete', ({failed, uploadID, successful}) => {

                });
        }
    },
});
