import './module/sw-media/component/sw-filerobot-library/';
import './module/sw-media/component/sw-media-modal-v2/';
import './module/sw-media/component/sw-media-modal-v2/';
import './module/sw-filerobot';

import './service/frApiTestService';
import './component/filerobot-api-test-button';

import localeDE from './snippet/de_DE.json';
import localeEN from './snippet/en_GB.json';
Shopware.Locale.extend('de-DE', localeDE);
Shopware.Locale.extend('en-GB', localeEN);
