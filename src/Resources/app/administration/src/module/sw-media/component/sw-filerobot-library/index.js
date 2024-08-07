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

        frCNAME: {
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
        filerobotScript.setAttribute('src', 'https://cdn.scaleflex.com/plugins/filerobot-widget/v3/latest/filerobot-widget.min.js');
        filerobotScript.setAttribute('async', 'true');
        document.head.appendChild(filerobotScript);

        let frScriptDelete = document.createElement('script');
        frScriptDelete.innerHTML = 'delete Filerobot';
        document.head.appendChild(frScriptDelete);
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

        async createdComponent() {
            const frConfig = await this.systemConfigApiService.getValues('ScaleflexFilerobot.config');
            let frActivation = frConfig['ScaleflexFilerobot.config.frActivation'];
            let frSEC = frConfig['ScaleflexFilerobot.config.frSEC'];
            let frToken = frConfig['ScaleflexFilerobot.config.frToken'];

            if (frActivation === true && frToken !== '' && frSEC !== '') {
                this.mediaService.addListener(this.uploadTag, this.handleMediaServiceUploadEvent);

                let swMediaSidebarElement = document.getElementsByClassName("sw-media-sidebar no-headline");
                swMediaSidebarElement[0].style.display = 'none';

                let swMediaFooterElement = document.getElementsByClassName("sw-modal__footer");
                swMediaFooterElement[0].style.display = 'none';

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

        beforeDestroyComponent() {
            this.mediaService.removeByTag(this.uploadTag);
            this.mediaService.removeListener(this.uploadTag, this.handleMediaServiceUploadEvent);
        },

        getMediaEntityForUpload(frFolderId) {
            let mediaItem = this.mediaRepository.create();
            mediaItem.mediaFolderId = frFolderId;
            return mediaItem;
        },

        async onUrlUpload({url, fileExtension, frFolderId}) {
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

            const targetEntity = this.getMediaEntityForUpload(frFolderId);
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
            let frCNAME = frConfig['ScaleflexFilerobot.config.frCNAME'];
            let frUploadDirectory = frConfig['ScaleflexFilerobot.config.frUploadDirectory'];
            let frAdminAccessKeyID = frConfig['ScaleflexFilerobot.config.frAdminAccessKeyID'];
            let frAdminSecretAccessKey = frConfig['ScaleflexFilerobot.config.frAdminSecretAccessKey'];
            let frFolderId = frConfig['ScaleflexFilerobot.config.frFolderId'];

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
                    // console.dir(files);
                    let currentUrl = window.location.href;
                    let domainUrl = currentUrl.split("admin#")[0];
                    let oauthURL = domainUrl + 'api/oauth/token';
                    await fetch(oauthURL, {
                        method: 'POST',
                        timeout: 30,
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                        },
                        body: JSON.stringify({
                            "client_id": frAdminAccessKeyID,
                            "client_secret": frAdminSecretAccessKey,
                            "grant_type": "client_credentials"
                        })
                    })
                        .then((response) => response.json())
                        .then(async (data) => {
                            let adminAuthToken = null;
                            if (data.access_token !== undefined && data.access_token !== '') {
                                adminAuthToken = data.access_token;
                            }

                            if (adminAuthToken !== null) {
                                let frFooterButton = document.getElementsByClassName("SfxButton-root");
                                for (let i = 0; i < frFooterButton.length; i++) {
                                    frFooterButton[i].setAttribute('disabled', 'true');
                                }

                                let textProcessing = this.$tc('frWidgetLocale.button.processing');
                                let frExportButton = document.getElementsByClassName('filerobot-Explorer-TopBar-DownloadWithExportButton-downloadButton');
                                let textExport;
                                for (let i = 0; i < frExportButton.length; i++) {
                                    textExport = frExportButton[i].innerHTML;
                                    frExportButton[i].setAttribute('disabled', 'true');
                                    frExportButton[i].innerHTML = textProcessing;
                                }
                                let mediaArray = [];
                                for (const selected of files) {
                                    /**
                                     * Check media by uuid
                                     * @type {string}
                                     */
                                    let checkURL = domainUrl + 'api/scaleflex/filerobot/check-filerobot-uuid-exist';
                                    await fetch(checkURL, {
                                        method: 'POST',
                                        timeout: 30,
                                        headers: {
                                            'Content-Type': 'application/json; charset=utf-8',
                                            'Authorization': 'Bearer ' + adminAuthToken
                                        },
                                        body: JSON.stringify({
                                            "filerobot_uuid": selected.file.uuid
                                        })
                                    })
                                        .then((response) => response.json())
                                        .then(async (data) => {
                                            let media = null;
                                            if (data !== false) {
                                                let media_id = data[0].id;
                                                let media = await this.mediaRepository.get(media_id, Context.api);
                                                this.selection.push(media);
                                            } else {
                                                /**
                                                 * Upload to shopware with FR url
                                                 */
                                                let url = new URL(selected.link);
                                                let fileExtension = selected.file.extension;
                                                let media_id = await this.onUrlUpload({url, fileExtension, frFolderId});

                                                /**
                                                 * Waiting while shopware doing upload
                                                 */
                                                let checkUpload = false;
                                                while (!checkUpload) {
                                                    await this.sleep(1000);
                                                    media = await this.mediaRepository.get(media_id, Context.api);
                                                    if (media.uploadedAt !== null) {
                                                        //override image url in selection

                                                        checkUpload = true;
                                                        let mediaURL = media.url;
                                                        let mediaPath = mediaURL.replace(domainUrl, '');
                                                        let filerobotURL = selected.file.url.cdn;
                                                        let newFilerobotUrl = new URL(filerobotURL);
                                                        if (newFilerobotUrl.searchParams.has('vh')) {
                                                            newFilerobotUrl.searchParams.delete('vh');
                                                        }

                                                        if (frCNAME !== '' && frCNAME !== null) {
                                                            newFilerobotUrl.host = frCNAME;
                                                            newFilerobotUrl.hostname = frCNAME;
                                                        }

                                                        mediaArray.push(
                                                            {
                                                                "media_id": media_id,
                                                                "filerobot_url": filerobotURL,
                                                                "filerobot_uuid": selected.file.uuid,
                                                                "media_path": '/' + mediaPath
                                                            }
                                                        )

                                                        if (this.selection.length === 0) {
                                                            this.selection.push(media);
                                                        }
                                                        this.selection[this.selection.length - 1].url = selected.file.url.cdn;
                                                        this.selectedItems = this.selection;
                                                    }
                                                }
                                            }
                                        })
                                        .catch((error) => {
                                            this.createNotificationError({
                                                title: this.$tc('global.default.error'),
                                                message: this.$tc('frErrors.addMedia')
                                            });
                                            console.error('Error:', error);
                                            for (let i = 0; i < frFooterButton.length; i++) {
                                                frFooterButton[i].removeAttribute('disabled');
                                            }

                                            for (let i = 0; i < frExportButton.length; i++) {
                                                frExportButton[i].removeAttribute('disabled');
                                                frExportButton[i].innerHTML = textExport;
                                            }
                                        });
                                }
                                // wait selection override url and close modal
                                let modalElement = document.querySelector('.sw-modal.sw-media-modal-v2.sw-modal--full');
                                modalElement.querySelector('.sw-button.sw-button--primary').click();
                                this.$emit('media-selection-change', this.selectedItems);

                                await this.sleep(1000);
                                if (mediaArray.length) {
                                    for (let i = 0; i < mediaArray.length; i++) {
                                        let deleteURL = domainUrl + 'api/scaleflex/filerobot/clean-up-media';
                                        fetch(deleteURL, {
                                            method: 'POST',
                                            timeout: 30,
                                            headers: {
                                                'Content-Type': 'application/json; charset=utf-8',
                                                'Authorization': 'Bearer ' + adminAuthToken
                                            },
                                            body: JSON.stringify(mediaArray[i])
                                        })
                                            .then((response) => response.json())
                                            .then((data) => {
                                                if (!data) {
                                                    this.createNotificationError({
                                                        title: this.$tc('global.default.error'),
                                                        message: this.$tc('frErrors.cleanMediaFail')
                                                    });

                                                    for (let i = 0; i < frFooterButton.length; i++) {
                                                        frFooterButton[i].removeAttribute('disabled');
                                                    }
                                                    for (let i = 0; i < frExportButton.length; i++) {
                                                        frExportButton[i].removeAttribute('disabled');
                                                        frExportButton[i].innerHTML = textExport;
                                                    }
                                                }
                                            })
                                            .catch((error) => {
                                                this.createNotificationError({
                                                    title: this.$tc('global.default.error'),
                                                    message: this.$tc('frErrors.cleanMediaFail')
                                                });
                                                console.error('Error:', error);
                                                for (let i = 0; i < frFooterButton.length; i++) {
                                                    frFooterButton[i].removeAttribute('disabled');
                                                }
                                                for (let i = 0; i < frExportButton.length; i++) {
                                                    frExportButton[i].removeAttribute('disabled');
                                                    frExportButton[i].innerHTML = textExport;
                                                }
                                            });
                                    }
                                }
                            } else {
                                this.createNotificationError({
                                    title: this.$tc('global.default.error'),
                                    message: this.$tc('frErrors.adminAuthToken')
                                });
                            }
                        })
                        .catch((error) => {
                            this.createNotificationError({
                                title: this.$tc('global.default.error'),
                                message: this.$tc('frErrors.adminAuthToken')
                            });
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
        }
    },
});