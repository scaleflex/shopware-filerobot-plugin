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

            if (frActivation === true) {
                if (frToken !== '' || frSEC !== '') {
                    let sass = '';
                    let apiGetSass = 'https://api.filerobot.com/' + frToken + '/key/' + frSEC;
                    let responseSass = await fetch(apiGetSass, {
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
            } else {
                console.log('Filerobot is not active');
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

                filerobot = Filerobot.Core({
                    securityTemplateID: this.frSEC,
                    container: this.frToken,
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
                        height: 1000,
                        locale: {
                            strings: {
                                export: 'Insert from FMAW into page'
                            }
                        },
                    })
                    .use(XHRUpload)
                    .on('export', async (files, popupExportSuccessMsgFn, downloadFilesPackagedFn, downloadFileFn) => {
                        console.dir(files);
                        for (const selected of files) {
                            const key = files.indexOf(selected);
                            /**
                             * Todo: need api to check media isset by uuid of FR
                             */
                                //upload to shopware with FR url
                            let url = new URL(selected.link);
                            let fileExtension = selected.file.extension;
                            let media_id = await this.onUrlUpload({url, fileExtension});

                            /**
                             * Todo: Api delete file and update media field `filerobot_url`, `is_filerobot`, filerobot_uuid
                             */
                                //waiting while shopware doing upload
                            let checkUpload = false;
                            let media = null;
                            while (!checkUpload) {
                                await this.sleep(500);
                                media = await this.mediaRepository.get(media_id, Context.api);
                                if (media.uploadedAt !== null) {
                                    checkUpload = true;
                                }
                            }
                            this.selectedItems = this.selection;
                        }
                        this.$emit('media-selection-change', this.selectedItems);

                        await this.sleep(500);
                        let modalElement = document.querySelector('.sw-modal.sw-media-modal-v2.sw-modal--full');
                        modalElement.querySelector('.sw-button.sw-button--primary').click();

                        //step 1: check media isset and create media from filerobot url if not isset
                        // Resources/app/administration/src/app/component/media/sw-media-upload-v2/index.js line 337 example

                        //step 2: write api delete local file just added and update media field `filerobot_url`, `is_filerobot`, filerobot_uuid

                        //step 3: get media by id
                        // let media = await this.mediaRepository.get('70e352200b5c45098dc65a5b47094a2a', Context.api);

                        //step 4: add media to this.selectedItems

                        //step 5: add media to product media
                        // -> need to try this function -> this.$emit('media-selection-change', this.selectedItems);
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
            } else {
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
            mediaItem.mediaFolderId = null;
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
