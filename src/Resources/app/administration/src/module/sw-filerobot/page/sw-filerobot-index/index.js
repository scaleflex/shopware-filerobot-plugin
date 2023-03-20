import template from './sw-filerobot-index.html.twig';

const { Component } = Shopware;

Component.register('sw-filerobot-index', {
    template,

    inject: ['systemConfigApiService', 'repositoryFactory', 'mediaService'],

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

        frAdminAccessKeyID: {
            type: String,
            required: false,
            default: null,
        },

        frAdminSecretAccessKey: {
            type: String,
            required: false,
            default: null,
        },

        adminAuthToken: {
            type: String,
            required: false,
            default: null,
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
        filerobotScript.setAttribute('src', 'https://scaleflex.cloudimg.io/v7/plugins/filerobot-widget/1.8.0/filerobot-widget.min.js?vh=62d509&func=proxy');
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
        async validToken() {
            const frConfig = await this.systemConfigApiService.getValues('ScaleflexFilerobot.config');
            let frActivation = frConfig['ScaleflexFilerobot.config.frActivation'];
            let frSEC = frConfig['ScaleflexFilerobot.config.frSEC'];
            let frToken = frConfig['ScaleflexFilerobot.config.frToken'];
            let frUploadDirectory = frConfig['ScaleflexFilerobot.config.frUploadDirectory'];
            let frAdminAccessKeyID = frConfig['ScaleflexFilerobot.config.frAdminAccessKeyID'];
            let frAdminSecretAccessKey = frConfig['ScaleflexFilerobot.config.frAdminSecretAccessKey'];
            let frFolderId = frConfig['ScaleflexFilerobot.config.frFolderId'];

            if (frActivation === true) {
                if (frToken !== '' || frSEC !== '') {
                    let sass = '';
                    let apiGetSass = 'https://api.filerobot.com/' + frToken + '/key/' + frSEC;

                    await fetch(apiGetSass, {
                        method: 'GET',
                        timeout: 30,
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                        }
                    }).then((response) => response.json())
                        .then((data) => {
                            if (data.status !== undefined && data.status !== 'error') {
                                sass = data.key;
                            }

                            if (sass === '') {
                                this.createNotificationError({
                                    title: this.$tc('global.default.error'),
                                    message: this.$tc('frErrors.failedToGetKey')
                                });
                                console.log(this.$tc('frErrors.failedToGetKey'));
                            } else {
                                this.frToken = frToken;
                                this.frSass = sass;
                                this.frUploadDirectory = frUploadDirectory;
                                this.frActivation = frActivation;
                                this.frSEC = frSEC;
                                this.frAdminAccessKeyID = frAdminAccessKeyID;
                                this.frAdminSecretAccessKey = frAdminSecretAccessKey;
                                this.frFolderId = frFolderId;
                            }
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });

                    if (sass !== '') {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    this.createNotificationError({
                        title: this.$tc('global.default.error'),
                        message: this.$tc('frErrors.tokenOrSEC')
                    });
                    console.log(this.$tc('frErrors.tokenOrSEC'));
                    return false;
                }
            } else {
                this.createNotificationError({
                    title: this.$tc('global.default.error'),
                    message: this.$tc('frErrors.notActive')
                });
                console.log(this.$tc('frErrors.notActive'));
                return false;
            }
        },

        async createdComponent() {
            if (await this.validToken()) {
                this.mediaService.addListener(this.uploadTag, this.handleMediaServiceUploadEvent);
                let current_url = window.location.href;

                //wait library loaded
                await this.waitFilerobotLibrary();
                let Filerobot = window.Filerobot;

                let filerobot = null;

                // Locale
                const locales = Filerobot.locales;
                let defaultLocale = 'EN';
                if (this.$tc('frWidgetLocale.locale') !== '') {
                    defaultLocale = this.$tc('frWidgetLocale.locale');
                }
                locales[defaultLocale].strings.download = this.$tc('frWidgetLocale.button.export');

                filerobot = Filerobot.Core({
                    securityTemplateID: this.frSEC,
                    container: this.frToken,
                    locale: locales[defaultLocale],
                    language: defaultLocale.toLowerCase()
                });

                // Plugins
                var Explorer = Filerobot.Explorer;
                var XHRUpload = Filerobot.XHRUpload;

                // Optional plugins:
                var ImageEditor = Filerobot.ImageEditor;
                // var Webcam = Filerobot.Webcam;

                filerobot
                    .use(Explorer, {
                        config: {
                            rootFolderPath: this.frUploadDirectory
                        },
                        target: '#filerobot-widget',
                        inline: true,
                        width: 10000,
                        height: 1000,
                        disableExportButton: true,
                        disableTopBarMainButton: true,
                        hideExportButtonIcon: true,
                        preventExportDefaultBehavior: true,
                        dismissUrlPathQueryUpdate: true,
                        hideSearch: true,
                    })
                    .use(ImageEditor)
                    .use(XHRUpload)
                    .on('export', async (files, popupExportSuccessMsgFn, downloadFilesPackagedFn, downloadFileFn) => {

                    })
                    .on('complete', ({failed, uploadID, successful}) => {

                    });
            } else {
                this.createNotificationError({
                    title: this.$tc('global.default.error'),
                    message: this.$tc('frErrors.unauthorized')
                });
                console.log(this.$tc('frErrors.unauthorized'));
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
        }
    },
});
