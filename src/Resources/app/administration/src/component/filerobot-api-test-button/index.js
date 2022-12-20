const { Component, Mixin } = Shopware;
import template from './filerobot-api-test-button.html.twig';

Component.register('filerobot-api-test-button', {
    template,

    props: ['label'],
    inject: ['filerobotApiTest'],

    mixins: [
        Mixin.getByName('notification')
    ],

    data() {
        return {
            isLoading: false,
            isSaveSuccessful: false,
        };
    },

    computed: {
        pluginConfig() {
            let $parent = this.$parent;

            while ($parent.actualConfigData === undefined) {
                $parent = $parent.$parent;
            }

            return $parent.actualConfigData.null;
        }
    },

    methods: {
        saveFinish() {
            this.isSaveSuccessful = false;
        },

        check() {
            this.isLoading = true;
            this.filerobotApiTest.check(this.pluginConfig).then((res) => {
                if (res.success) {
                    this.isSaveSuccessful = true;
                    this.createNotificationSuccess({
                        title: this.$tc('filerobot-api-test-button.title'),
                        message: this.$tc('filerobot-api-test-button.success')
                    });
                } else {
                    this.createNotificationError({
                        title: this.$tc('filerobot-api-test-button.title'),
                        message: this.$tc('filerobot-api-test-button.error')
                    });
                }

                this.isLoading = false;
            });
        }
    }
})
