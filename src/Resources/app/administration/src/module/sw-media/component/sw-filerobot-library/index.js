import template from './sw-filerobot-library.html.twig';

const {Component, Mixin, Context} = Shopware;
const {fileReader} = Shopware.Utils;
const INPUT_TYPE_FILE_UPLOAD = 'file-upload';
const INPUT_TYPE_URL_UPLOAD = 'url-upload';

Component.register('sw-filerobot-library', {
    template,
    inject: ['systemConfigApiService', 'repositoryFactory', 'mediaService'],

    model: {
        prop: 'selection',
        event: 'media-selection-change',
    },

    mixins: [
        Mixin.getByName('notification'),
        Mixin.getByName('media-grid-listener')
    ],

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

        frFolderId: {
            type: String,
            required: false,
            default: null,
        },

        selection: {
            type: Array,
            required: true,
        },

        uploadTag: {
            type: String,
            required: true,
        },

        disabled: {
            type: Boolean,
            required: false,
            default: false,
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
            selectedItems: this.selection,
        }
    },

    mounted() {
        let filerobotScript = document.createElement('script');
        filerobotScript.setAttribute('src', 'https://cdn.scaleflex.it/plugins/filerobot-widget/1.0.106/filerobot-widget.min.js');
        document.head.appendChild(filerobotScript);
    },

    computed: {
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        isUrlUpload() {
            return this.inputType === INPUT_TYPE_URL_UPLOAD;
        },
    },

    watch: {
        selection() {
            this.selectedItems = this.selection;
            if (this.listSelectionStartItem !== null && !this.selectedItems.includes(this.listSelectionStartItem)) {
                this.listSelectionStartItem = this.selectedItems[0] || null;
            }
        },

        selectedItems() {
            this.$emit('media-selection-change', this.selectedItems);
        },
    },

    created() {
        this.createdComponent();
    },

    beforeDestroy() {
        this.beforeDestroyComponent();
    },

    methods: {
        useFileUpload() {
            this.inputType = INPUT_TYPE_FILE_UPLOAD;
        },

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
                                    message: "Filerobot has faild to get key."
                                });
                                console.log('Filerobot has faild to get key.');
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
                        message: "Filerobot token or Security template identifier is empty. Please check again your plugin configuration."
                    });
                    console.log('Filerobot token or Security template identifier is empty. Please check again your plugin configuration.');
                    return false;
                }
            } else {
                this.createNotificationError({
                    title: this.$tc('global.default.error'),
                    message: "Filerobot is not active. Please check again your plugin configuration."
                });
                console.log('Filerobot is not active. Please check again your plugin configuration.');
                return false;
            }
        },

        async createdComponent() {
            if (await this.validToken()) {
                this.mediaService.addListener(this.uploadTag, this.handleMediaServiceUploadEvent);

                let current_url = window.location.href;

                let swMediaSidebarElement = document.getElementsByClassName("sw-media-sidebar no-headline");
                swMediaSidebarElement[0].style.display = 'none';

                let swMediaFooterElement = document.getElementsByClassName("sw-modal__footer");
                swMediaFooterElement[0].style.display = 'none';

                if (!Filerobot) {
                    var Filerobot = window.Filerobot;
                }

                let filerobot = null;

                // Locale
                const locales = Filerobot.locales;
                let defaultLocale = 'EN';
                if (this.$tc('widget-locale.locale') !== '') {
                    defaultLocale = this.$tc('widget-locale.locale');
                }

                filerobot = Filerobot.Core({
                    securityTemplateID: this.frSEC,
                    container: this.frToken,
                    locale: locales[defaultLocale]
                });

                // Plugins
                var Explorer = Filerobot.Explorer;
                var XHRUpload = Filerobot.XHRUpload;

                // Optional plugins:
                var ImageEditor = Filerobot.ImageEditor;
                var Webcam = Filerobot.Webcam;

                filerobot
                    .use(Explorer, {
                        config: {
                            rootFolderPath: this.frUploadDirectory
                        },
                        target: '#filerobot-widget',
                        inline: true,
                        width: 10000,
                        height: 1000
                    })
                    .use(XHRUpload)
                    .use(ImageEditor)
                    .on('export', async (files, popupExportSuccessMsgFn, downloadFilesPackagedFn, downloadFileFn) => {
                        // console.dir(files);
                        let oauthURL = window.location.origin + '/api/oauth/token';
                        fetch(oauthURL, {
                            method: 'POST',
                            timeout: 30,
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8',
                            },
                            body: JSON.stringify({
                                "client_id": this.frAdminAccessKeyID,
                                "client_secret": this.frAdminSecretAccessKey,
                                "grant_type": "client_credentials"
                            })
                        }).then((response) => response.json())
                            .then(async (data) => {
                                if (data.access_token !== undefined && data.access_token !== '') {
                                    this.adminAuthToken = data.access_token;
                                }

                                let frFooterButton = document.getElementsByClassName("SfxButton-root");
                                for (let i = 0; i < frFooterButton.length; i++) {
                                    frFooterButton[i].setAttribute('disabled', 'true');
                                }

                                if (this.adminAuthToken !== null) {
                                    for (const selected of files) {
                                        /**
                                         * Check media by uuid
                                         * @type {string}
                                         */
                                        let checkURL = window.location.origin + '/api/scaleflex/filerobot/check-filerobot-uuid-exist';
                                        await fetch(checkURL, {
                                            method: 'POST',
                                            timeout: 30,
                                            headers: {
                                                'Content-Type': 'application/json; charset=utf-8',
                                                'Authorization': 'Bearer ' + this.adminAuthToken
                                            },
                                            body: JSON.stringify({
                                                "filerobot_uuid": selected.file.uuid
                                            })
                                        }).then((response) => response.json())
                                            .then(async (data) => {
                                                let media = null;
                                                if (data !== false) {
                                                    let media_id = data[0].toLowerCase();
                                                    let media = await this.mediaRepository.get(media_id, Context.api);
                                                    this.selection.push(media);
                                                } else {
                                                    /**
                                                     * Upload to shopware with FR url
                                                     */
                                                    let url = new URL(selected.link);
                                                    let fileExtension = selected.file.extension;
                                                    let media_id = await this.onUrlUpload({url, fileExtension});

                                                    /**
                                                     * Waiting while shopware doing upload
                                                     */
                                                    let checkUpload = false;
                                                    while (!checkUpload) {
                                                        await this.sleep(500);
                                                        media = await this.mediaRepository.get(media_id, Context.api);
                                                        if (media.uploadedAt !== null) {
                                                            let mediaURL = media.url;
                                                            let mediaPath = mediaURL.replace(window.location.origin, '');
                                                            let deleteURL = window.location.origin + '/api/scaleflex/filerobot/clean-up-media';
                                                            let filerobotURL = selected.file.url.cdn;
                                                            filerobotURL = filerobotURL.split('?')[0];
                                                            fetch(deleteURL, {
                                                                method: 'POST',
                                                                timeout: 30,
                                                                headers: {
                                                                    'Content-Type': 'application/json; charset=utf-8',
                                                                    'Authorization': 'Bearer ' + this.adminAuthToken
                                                                },
                                                                body: JSON.stringify({
                                                                    "media_id": media_id,
                                                                    "filerobot_url": filerobotURL,
                                                                    "filerobot_uuid": selected.file.uuid,
                                                                    "media_path": mediaPath
                                                                })
                                                            }).then((response) => response.json())
                                                                .then((data) => {
                                                                    if (!data) {
                                                                        this.createNotificationError({
                                                                            title: this.$tc('global.default.error'),
                                                                            message: "Clean up media had failed."
                                                                        });
                                                                        console.log('Clean up media had failed.');

                                                                        for (let i = 0; i < frFooterButton.length; i++) {
                                                                            frFooterButton[i].removeAttribute('disabled');
                                                                        }
                                                                    }
                                                                })
                                                                .catch((error) => {
                                                                    console.error('Error:', error);
                                                                    for (let i = 0; i < frFooterButton.length; i++) {
                                                                        frFooterButton[i].removeAttribute('disabled');
                                                                    }
                                                                });
                                                            checkUpload = true;
                                                        }
                                                    }
                                                }
                                            })
                                            .catch((error) => {
                                                console.error('Error:', error);
                                                for (let i = 0; i < frFooterButton.length; i++) {
                                                    frFooterButton[i].removeAttribute('disabled');
                                                }
                                            });
                                        this.selectedItems = this.selection;
                                    }
                                    this.$emit('media-selection-change', this.selectedItems);

                                    await this.sleep(500);
                                    let modalElement = document.querySelector('.sw-modal.sw-media-modal-v2.sw-modal--full');
                                    modalElement.querySelector('.sw-button.sw-button--primary').click();
                                } else {
                                    this.createNotificationError({
                                        title: this.$tc('global.default.error'),
                                        message: "Can't get admin auth token. Please check again your plugin configuration."
                                    });
                                    console.log("Can't get admin auth token. Please check again your plugin configuration.");
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                    })
                    .on('complete', ({failed, uploadID, successful}) => {
                        if (failed) {
                            console.dir(failed);
                        }

                        if (successful) {
                            // console.dir(successful);
                            successful.forEach((item, key) => {
                                // do something
                            });
                        }
                    });

                setTimeout(function () {
                    window.history.pushState(null, document.title, current_url);
                }, 1000);
            } else {
                this.createNotificationError({
                    title: this.$tc('global.default.error'),
                    message: "Filerobot is unauthorized."
                });
                console.log('Filerobot is unauthorized.');
            }
        },

        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

        beforeDestroyComponent() {
            this.mediaService.removeByTag(this.uploadTag);
            this.mediaService.removeListener(this.uploadTag, this.handleMediaServiceUploadEvent);
        },

        getMediaEntityForUpload() {
            let mediaItem = this.mediaRepository.create();
            mediaItem.mediaFolderId = this.frFolderId;
            return mediaItem;
        },

        async onUrlUpload({url, fileExtension}) {
            let fileInfo;
            try {
                fileInfo = fileReader.getNameAndExtensionFromUrl(url);
            } catch {
                this.createNotificationError({
                    title: this.$tc('global.default.error'),
                    message: this.$tc('global.sw-media-upload-v2.notification.invalidUrl.message'),
                });

                return;
            }

            if (fileExtension) {
                fileInfo.extension = fileExtension;
            }

            const targetEntity = this.getMediaEntityForUpload();
            await this.mediaRepository.save(targetEntity, Context.api);
            await this.mediaService.addUpload(this.uploadTag, {
                src: url,
                filerobot: true,
                targetId: targetEntity.id, ...fileInfo
            });
            this.useFileUpload();

            return targetEntity.id;
        },

        handleMediaServiceUploadEvent({action}) {
            if (action === 'media-upload-fail') {
                this.onRemoveMediaItem();
            }
        },

        onRemoveMediaItem() {
            if (this.disabled) {
                return;
            }

            this.preview = null;
            this.$emit('media-upload-remove-image');
        },
    },
});
