!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/bundles/scaleflexfilerobot/",r(r.s="LegY")}({"8MXQ":function(e,t){function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function a(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=c(e);if(t){var o=c(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return l(this,r)}}function l(e,t){if(t&&("object"===r(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var s=Shopware.Classes.ApiService,u=Shopware.Application,f=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&i(e,t)}(u,e);var t,r,l,c=a(u);function u(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"filerobot-api-test";return n(this,u),c.call(this,e,t,r)}return t=u,(r=[{key:"check",value:function(e){var t=this.getBasicHeaders({});return this.httpClient.post("_action/".concat(this.getApiBasePath(),"/verify"),e,{headers:t}).then((function(e){return s.handleResponse(e)}))}}])&&o(t.prototype,r),l&&o(t,l),Object.defineProperty(t,"prototype",{writable:!1}),u}(s);u.addServiceProvider("filerobotApiTest",(function(e){var t=u.getContainer("init");return new f(t.httpClient,e.loginService)}))},LegY:function(e,t,r){"use strict";r.r(t);function n(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return o(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,i=function(){};return{s:i,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,l=!0,c=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return l=e.done,e},e:function(e){c=!0,a=e},f:function(){try{l||null==r.return||r.return()}finally{if(c)throw a}}}}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){l(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t,r,n,o,i,a){try{var l=e[i](a),c=l.value}catch(e){return void r(e)}l.done?t(c):Promise.resolve(c).then(n,o)}function s(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var i=e.apply(t,r);function a(e){c(i,n,o,a,l,"next",e)}function l(e){c(i,n,o,a,l,"throw",e)}a(void 0)}))}}var u=Shopware,f=u.Component,d=u.Mixin,p=u.Context,b=Shopware.Utils.fileReader;f.register("sw-filerobot-library",{template:'<div class="sw-filerobot-library" style="overflow: scroll">\r\n    <div id="filerobot-widget"></div>\r\n</div>\r\n',inject:["systemConfigApiService","repositoryFactory","mediaService"],model:{prop:"selection",event:"media-selection-change"},mixins:[d.getByName("notification"),d.getByName("media-grid-listener")],props:{frActivation:{type:Boolean,required:!1,default:!1},frToken:{type:String,required:!1,default:null},frSEC:{type:String,required:!1,default:null},frUploadDirectory:{type:String,required:!1,default:null},frSass:{type:String,required:!1,default:null},frFolderId:{type:String,required:!1,default:null},selection:{type:Array,required:!0},uploadTag:{type:String,required:!0},disabled:{type:Boolean,required:!1,default:!1},frAdminAccessKeyID:{type:String,required:!1,default:null},frAdminSecretAccessKey:{type:String,required:!1,default:null},adminAuthToken:{type:String,required:!1,default:null}},data:function(){return{selectedItems:this.selection}},mounted:function(){var e=document.createElement("script");e.setAttribute("src","https://cdn.scaleflex.it/plugins/filerobot-widget/latest/filerobot-widget.min.js"),e.setAttribute("async","true"),document.head.appendChild(e);var t=document.createElement("script");t.innerHTML="delete Filerobot",document.head.appendChild(t)},computed:{mediaRepository:function(){return this.repositoryFactory.create("media")},isUrlUpload:function(){return"url-upload"===this.inputType}},watch:{selection:function(){this.selectedItems=this.selection,null===this.listSelectionStartItem||this.selectedItems.includes(this.listSelectionStartItem)||(this.listSelectionStartItem=this.selectedItems[0]||null)},selectedItems:function(){this.$emit("media-selection-change",this.selectedItems)}},created:function(){this.createdComponent()},beforeDestroy:function(){this.beforeDestroyComponent()},methods:{useFileUpload:function(){this.inputType="file-upload"},validToken:function(){var e=this;return s(regeneratorRuntime.mark((function t(){var r,n,o,i,a,l,c,s,u,f;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.systemConfigApiService.getValues("ScaleflexFilerobot.config");case 2:if(r=t.sent,n=r["ScaleflexFilerobot.config.frActivation"],o=r["ScaleflexFilerobot.config.frSEC"],i=r["ScaleflexFilerobot.config.frToken"],a=r["ScaleflexFilerobot.config.frUploadDirectory"],l=r["ScaleflexFilerobot.config.frAdminAccessKeyID"],c=r["ScaleflexFilerobot.config.frAdminSecretAccessKey"],s=r["ScaleflexFilerobot.config.frFolderId"],!0!==n){t.next=27;break}if(""===i&&""===o){t.next=23;break}return u="",f="https://api.filerobot.com/"+i+"/key/"+o,t.next=16,fetch(f,{method:"GET",timeout:30,headers:{"Content-Type":"application/json; charset=utf-8"}}).then((function(e){return e.json()})).then((function(t){void 0!==t.status&&"error"!==t.status&&(u=t.key),""===u?e.createNotificationError({title:e.$tc("global.default.error"),message:e.$tc("frErrors.failedToGetKey")}):(e.frToken=i,e.frSass=u,e.frUploadDirectory=a,e.frActivation=n,e.frSEC=o,e.frAdminAccessKeyID=l,e.frAdminSecretAccessKey=c,e.frFolderId=s)})).catch((function(e){console.error("Error:",e)}));case 16:if(""===u){t.next=20;break}return t.abrupt("return",!0);case 20:return t.abrupt("return",!1);case 21:t.next=25;break;case 23:return e.createNotificationError({title:e.$tc("global.default.error"),message:e.$tc("frErrors.tokenOrSEC")}),t.abrupt("return",!1);case 25:t.next=29;break;case 27:return e.createNotificationError({title:e.$tc("global.default.error"),message:e.$tc("frErrors.notActive")}),t.abrupt("return",!1);case 29:case"end":return t.stop()}}),t)})))()},createdComponent:function(){var e=this;return s(regeneratorRuntime.mark((function t(){var r,n,o,i;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.validToken();case 2:if(!t.sent){t.next=19;break}return e.mediaService.addListener(e.uploadTag,e.handleMediaServiceUploadEvent),document.getElementsByClassName("sw-media-sidebar no-headline")[0].style.display="none",document.getElementsByClassName("sw-modal__footer")[0].style.display="none",t.next=10,e.waitFilerobotLibrary();case 10:r=window.Filerobot,null,o=r.locales,i="EN",""!==e.$tc("frWidgetLocale.locale")&&(i=e.$tc("frWidgetLocale.locale")),n=r.Core({securityTemplateID:e.frSEC,container:e.frToken,locale:o[i],language:i.toLowerCase()}),e.renderWidget(n),t.next=20;break;case 19:e.createNotificationError({title:e.$tc("global.default.error"),message:e.$tc("frErrors.unauthorized")});case 20:case"end":return t.stop()}}),t)})))()},sleep:function(e){return new Promise((function(t){return setTimeout(t,e)}))},beforeDestroyComponent:function(){this.mediaService.removeByTag(this.uploadTag),this.mediaService.removeListener(this.uploadTag,this.handleMediaServiceUploadEvent)},getMediaEntityForUpload:function(){var e=this.mediaRepository.create();return e.mediaFolderId=this.frFolderId,e},onUrlUpload:function(e){var t=this;return s(regeneratorRuntime.mark((function r(){var n,o,i,l;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:n=e.url,o=e.fileExtension,r.prev=1,i=b.getNameAndExtensionFromUrl(n),r.next=9;break;case 5:return r.prev=5,r.t0=r.catch(1),t.createNotificationError({title:t.$tc("global.default.error"),message:t.$tc("global.sw-media-upload-v2.notification.invalidUrl.message")}),r.abrupt("return");case 9:return o&&(i.extension=o),l=t.getMediaEntityForUpload(),r.next=13,t.mediaRepository.save(l,p.api);case 13:return r.next=15,t.mediaService.addUpload(t.uploadTag,a({src:n,filerobot:!0,targetId:l.id},i));case 15:return t.useFileUpload(),r.abrupt("return",l.id);case 17:case"end":return r.stop()}}),r,null,[[1,5]])})))()},handleMediaServiceUploadEvent:function(e){"media-upload-fail"===e.action&&this.onRemoveMediaItem()},onRemoveMediaItem:function(){this.disabled||(this.preview=null,this.$emit("media-upload-remove-image"))},waitFilerobotLibrary:function(){return new Promise((function(e,t){for(var r=!1;!r;)void 0!==window.Filerobot&&(r=!0,e(!0))}))},renderWidget:function(e){var t=this,r=(window.location.href,Filerobot.Explorer),o=Filerobot.XHRUpload,i=Filerobot.ImageEditor;e.use(r,{config:{rootFolderPath:this.frUploadDirectory},target:"#filerobot-widget",inline:!0,width:1e4,height:1e3,disableExportButton:!0,hideExportButtonIcon:!0,preventExportDefaultBehavior:!0,resetAfterClose:!0,dismissUrlPathQueryUpdate:!0,hideSearch:!0,locale:{strings:{mutualizedExportButtonLabel:this.$tc("frWidgetLocale.button.export"),mutualizedDownloadButton:this.$tc("frWidgetLocale.button.export")}}}).use(o).use(i).on("export",function(){var e=s(regeneratorRuntime.mark((function e(r,o,i,a){var l,c,u;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l=window.location.href,c=l.split("admin#")[0],u=c+"api/oauth/token",e.next=5,fetch(u,{method:"POST",timeout:30,headers:{"Content-Type":"application/json; charset=utf-8"},body:JSON.stringify({client_id:t.frAdminAccessKeyID,client_secret:t.frAdminSecretAccessKey,grant_type:"client_credentials"})}).then((function(e){return e.json()})).then(function(){var e=s(regeneratorRuntime.mark((function e(o){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0!==o.access_token&&""!==o.access_token&&(t.adminAuthToken=o.access_token),null===t.adminAuthToken){e.next=5;break}return e.delegateYield(regeneratorRuntime.mark((function e(){var o,i,a,l,u,f,d,b,m,g,h;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(o=document.getElementsByClassName("SfxButton-root"),i=0;i<o.length;i++)o[i].setAttribute("disabled","true");for(a=t.$tc("frWidgetLocale.button.processing"),l=document.getElementsByClassName("filerobot-Explorer-TopBar-DownloadWithExportButton-downloadButton"),f=0;f<l.length;f++)u=l[f].innerHTML,l[f].setAttribute("disabled","true"),l[f].innerHTML=a;d=[],b=n(r),e.prev=7,g=regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=m.value,n=c+"api/scaleflex/filerobot/check-filerobot-uuid-exist",e.next=4,fetch(n,{method:"POST",timeout:30,headers:{"Content-Type":"application/json; charset=utf-8",Authorization:"Bearer "+t.adminAuthToken},body:JSON.stringify({filerobot_uuid:r.file.uuid})}).then((function(e){return e.json()})).then(function(){var e=s(regeneratorRuntime.mark((function e(n){var o,i,a,l,s,u,f,b,m,g,h;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o=null,!1===n){e.next=9;break}return i=n[0].toLowerCase(),e.next=5,t.mediaRepository.get(i,p.api);case 5:a=e.sent,t.selection.push(a),e.next=24;break;case 9:return l=new URL(r.link),s=r.file.extension,e.next=13,t.onUrlUpload({url:l,fileExtension:s});case 13:u=e.sent,f=!1;case 15:if(f){e.next=24;break}return e.next=18,t.sleep(1e3);case 18:return e.next=20,t.mediaRepository.get(u,p.api);case 20:null!==(o=e.sent).uploadedAt&&(t.selection[t.selection.length-1].url=r.file.url.cdn,t.selectedItems=t.selection,f=!0,b=o.url,m=b.replace(c,""),g=r.file.url.cdn,(h=new URL(g)).searchParams.has("vh")&&h.searchParams.delete("vh"),g=h.href,d.push({media_id:u,filerobot_url:g,filerobot_uuid:r.file.uuid,media_path:"/"+m})),e.next=15;break;case 24:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){t.createNotificationError({title:t.$tc("global.default.error"),message:t.$tc("frErrors.addMedia")}),console.error("Error:",e);for(var r=0;r<o.length;r++)o[r].removeAttribute("disabled");for(var n=0;n<l.length;n++)l[n].removeAttribute("disabled"),l[n].innerHTML=u}));case 4:case"end":return e.stop()}}),e)})),b.s();case 10:if((m=b.n()).done){e.next=14;break}return e.delegateYield(g(),"t0",12);case 12:e.next=10;break;case 14:e.next=19;break;case 16:e.prev=16,e.t1=e.catch(7),b.e(e.t1);case 19:return e.prev=19,b.f(),e.finish(19);case 22:if(document.querySelector(".sw-modal.sw-media-modal-v2.sw-modal--full").querySelector(".sw-button.sw-button--primary").click(),t.$emit("media-selection-change",t.selectedItems),d.length)for(h=0;h<d.length;h++)fetch(c+"api/scaleflex/filerobot/clean-up-media",{method:"POST",timeout:30,headers:{"Content-Type":"application/json; charset=utf-8",Authorization:"Bearer "+t.adminAuthToken},body:JSON.stringify(d[h])}).then((function(e){return e.json()})).then((function(e){if(!e){t.createNotificationError({title:t.$tc("global.default.error"),message:t.$tc("frErrors.cleanMediaFail")});for(var r=0;r<o.length;r++)o[r].removeAttribute("disabled");for(var n=0;n<l.length;n++)l[n].removeAttribute("disabled"),l[n].innerHTML=u}})).catch((function(e){t.createNotificationError({title:t.$tc("global.default.error"),message:t.$tc("frErrors.cleanMediaFail")}),console.error("Error:",e);for(var r=0;r<o.length;r++)o[r].removeAttribute("disabled");for(var n=0;n<l.length;n++)l[n].removeAttribute("disabled"),l[n].innerHTML=u}));case 26:case"end":return e.stop()}}),e,null,[[7,16,19,22]])}))(),"t0",3);case 3:e.next=6;break;case 5:t.createNotificationError({title:t.$tc("global.default.error"),message:t.$tc("frErrors.adminAuthToken")});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){t.createNotificationError({title:t.$tc("global.default.error"),message:t.$tc("frErrors.adminAuthToken")}),console.error("Error:",e)}));case 5:case"end":return e.stop()}}),e)})));return function(t,r,n,o){return e.apply(this,arguments)}}()).on("complete",(function(e){var t=e.failed,r=(e.uploadID,e.successful);t&&console.dir(t),r&&r.forEach((function(e,t){}))}))}}});Shopware.Component.override("sw-media-modal-v2",{template:'{% block sw_media_modal_v2_tab_items %}\r\n    {% parent %}\r\n    <sw-tabs-item\r\n            :name="tabFilerobotDAM"\r\n            :active-tab="active"\r\n    >\r\n        Filerobot DAM\r\n    </sw-tabs-item>\r\n{% endblock %}\r\n\r\n{% block sw_media_modal_v2_tab_content_library %}\r\n    {% parent %}\r\n    <template v-if="active === tabFilerobotDAM">\r\n        {% block sw_filerobot_modal_media_library %}\r\n            <sw-upload-listener\r\n                    :upload-tag="uploadTag"\r\n                    @media-upload-add="onUploadsAdded"\r\n                    @media-upload-finish="onUploadFinished"\r\n                    @media-upload-fail="onUploadFailed"\r\n            />\r\n\r\n            <sw-filerobot-library\r\n                    ref="filerobotLibrary"\r\n                    :selection="selection"\r\n                    :upload-tag="uploadTag"\r\n                    @media-selection-change="selection = $event"/>\r\n        {% endblock %}\r\n    </template>\r\n{% endblock %}\r\n',inject:["systemConfigApiService"],props:{defaultTab:{type:String,required:!1,validValues:["upload","library","filerobot"],validator:function(e){return["upload","library","filerobot"].includes(e)}}},computed:{tabFilerobotDAM:function(){return"filerobot"}}});function m(e,t,r,n,o,i,a){try{var l=e[i](a),c=l.value}catch(e){return void r(e)}l.done?t(c):Promise.resolve(c).then(n,o)}function g(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var i=e.apply(t,r);function a(e){m(i,n,o,a,l,"next",e)}function l(e){m(i,n,o,a,l,"throw",e)}a(void 0)}))}}Shopware.Component.register("sw-filerobot-index",{template:'\n{% block sw_filerobot_index %}\n    <sw-page class="sw-filerobot-index">\n        {% block sw_filerobot_index_page_content %}\n            <template slot="content">\n                <div class="sw-filerobot-library" style="overflow: scroll">\n                    <div id="filerobot-widget"></div>\n                </div>\n            </template>\n        {% endblock %}\n    </sw-page>\n{% endblock %}\n',inject:["systemConfigApiService","repositoryFactory","mediaService"],props:{frActivation:{type:Boolean,required:!1,default:!1},frToken:{type:String,required:!1,default:null},frSEC:{type:String,required:!1,default:null},frUploadDirectory:{type:String,required:!1,default:null},frSass:{type:String,required:!1,default:null},selection:{type:Array,required:!0},frAdminAccessKeyID:{type:String,required:!1,default:null},frAdminSecretAccessKey:{type:String,required:!1,default:null},adminAuthToken:{type:String,required:!1,default:null}},data:function(){return{isLoading:!1,term:this.$route.query?this.$route.query.term:""}},mounted:function(){var e=document.createElement("script");e.setAttribute("src","https://cdn.scaleflex.it/plugins/filerobot-widget/latest/filerobot-widget.min.js"),e.setAttribute("async","true"),document.head.appendChild(e);var t=document.createElement("script");t.innerHTML="delete Filerobot",document.head.appendChild(t)},metaInfo:function(){return{title:this.$createTitle()}},created:function(){this.createdComponent()},methods:{validToken:function(){var e=this;return g(regeneratorRuntime.mark((function t(){var r,n,o,i,a,l,c,s,u,f;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.systemConfigApiService.getValues("ScaleflexFilerobot.config");case 2:if(r=t.sent,n=r["ScaleflexFilerobot.config.frActivation"],o=r["ScaleflexFilerobot.config.frSEC"],i=r["ScaleflexFilerobot.config.frToken"],a=r["ScaleflexFilerobot.config.frUploadDirectory"],l=r["ScaleflexFilerobot.config.frAdminAccessKeyID"],c=r["ScaleflexFilerobot.config.frAdminSecretAccessKey"],s=r["ScaleflexFilerobot.config.frFolderId"],!0!==n){t.next=28;break}if(""===i&&""===o){t.next=23;break}return u="",f="https://api.filerobot.com/"+i+"/key/"+o,t.next=16,fetch(f,{method:"GET",timeout:30,headers:{"Content-Type":"application/json; charset=utf-8"}}).then((function(e){return e.json()})).then((function(t){void 0!==t.status&&"error"!==t.status&&(u=t.key),""===u?(e.createNotificationError({title:e.$tc("global.default.error"),message:e.$tc("frErrors.failedToGetKey")}),console.log(e.$tc("frErrors.failedToGetKey"))):(e.frToken=i,e.frSass=u,e.frUploadDirectory=a,e.frActivation=n,e.frSEC=o,e.frAdminAccessKeyID=l,e.frAdminSecretAccessKey=c,e.frFolderId=s)})).catch((function(e){console.error("Error:",e)}));case 16:if(""===u){t.next=20;break}return t.abrupt("return",!0);case 20:return t.abrupt("return",!1);case 21:t.next=26;break;case 23:return e.createNotificationError({title:e.$tc("global.default.error"),message:e.$tc("frErrors.tokenOrSEC")}),console.log(e.$tc("frErrors.tokenOrSEC")),t.abrupt("return",!1);case 26:t.next=31;break;case 28:return e.createNotificationError({title:e.$tc("global.default.error"),message:e.$tc("frErrors.notActive")}),console.log(e.$tc("frErrors.notActive")),t.abrupt("return",!1);case 31:case"end":return t.stop()}}),t)})))()},createdComponent:function(){var e=this;return g(regeneratorRuntime.mark((function t(){var r,n,o,i,a,l,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.validToken();case 2:if(!t.sent){t.next=20;break}return e.mediaService.addListener(e.uploadTag,e.handleMediaServiceUploadEvent),window.location.href,t.next=7,e.waitFilerobotLibrary();case 7:r=window.Filerobot,n=null,o=r.locales,i="EN",""!==e.$tc("frWidgetLocale.locale")&&(i=e.$tc("frWidgetLocale.locale")),o[i].strings.download=e.$tc("frWidgetLocale.button.export"),n=r.Core({securityTemplateID:e.frSEC,container:e.frToken,locale:o[i],language:i.toLowerCase()}),a=r.Explorer,l=r.XHRUpload,c=r.ImageEditor,n.use(a,{config:{rootFolderPath:e.frUploadDirectory},target:"#filerobot-widget",inline:!0,width:1e4,height:1e3,disableExportButton:!0,disableTopBarMainButton:!0,hideExportButtonIcon:!0,preventExportDefaultBehavior:!0,dismissUrlPathQueryUpdate:!0,hideSearch:!0}).use(c).use(l).on("export",function(){var e=g(regeneratorRuntime.mark((function e(t,r,n,o){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));return function(t,r,n,o){return e.apply(this,arguments)}}()).on("complete",(function(e){e.failed,e.uploadID,e.successful})),t.next=22;break;case 20:e.createNotificationError({title:e.$tc("global.default.error"),message:e.$tc("frErrors.unauthorized")}),console.log(e.$tc("frErrors.unauthorized"));case 22:case"end":return t.stop()}}),t)})))()},sleep:function(e){return new Promise((function(t){return setTimeout(t,e)}))},waitFilerobotLibrary:function(){return new Promise((function(e,t){for(var r=!1;!r;)void 0!==window.Filerobot&&(r=!0,e(!0))}))}}}),Shopware.Module.register("sw-filerobot",{name:"filerobot",title:"sw-filerobot.general.mainMenuItemGeneral",description:"sw-filerobot.general.descriptionTextModule",favicon:"icon-module-content.png",color:"#ff68b4",icon:"regular-image",routes:{index:{components:{default:"sw-filerobot-index"},path:"index"}},navigation:[{id:"sw-filerobot",label:"sw-filerobot.general.mainMenuItemGeneral",color:"#ff3d58",path:"sw.filerobot.index",icon:"regular-image",parent:"sw-content",position:30}]});r("8MXQ");var h=Shopware,y=h.Component,v=h.Mixin;y.register("filerobot-api-test-button",{template:'<div>\r\n    <sw-button-process\r\n        :isLoading="isLoading"\r\n        :processSuccess="isSaveSuccessful"\r\n        @process-finish="saveFinish"\r\n        @click="check"\r\n    >{{ $tc(\'filerobot-api-test-button.button\') }}</sw-button-process>\r\n</div>\r\n',props:["label"],inject:["filerobotApiTest"],mixins:[v.getByName("notification")],data:function(){return{isLoading:!1,isSaveSuccessful:!1}},computed:{pluginConfig:function(){for(var e=this.$parent;void 0===e.actualConfigData;)e=e.$parent;return e.actualConfigData.null}},methods:{saveFinish:function(){this.isSaveSuccessful=!1},check:function(){var e=this;this.isLoading=!0,this.filerobotApiTest.check(this.pluginConfig).then((function(t){t.success?(e.isSaveSuccessful=!0,e.createNotificationSuccess({title:e.$tc("filerobot-api-test-button.title"),message:e.$tc("filerobot-api-test-button.success")})):e.createNotificationError({title:e.$tc("filerobot-api-test-button.title"),message:e.$tc("filerobot-api-test-button.errors."+t.message)}),e.isLoading=!1}))}}});var w=r("wg37"),S=r("r1Bh");Shopware.Locale.extend("de-DE",w),Shopware.Locale.extend("en-GB",S)},r1Bh:function(e){e.exports=JSON.parse('{"filerobot-api-test-button":{"title":"Filerobot test connection","success":"Connection was successfully tested.","errors":{"failToVerifyFilerobotToken":"Connection could not be established. Please check again Filerobot Token and Security Template Identifier.","failToVerifyAdminAuthToken":"Connection could not be established. Please check again Admin access key ID and Admin secret access key."},"button":"Test connection"},"frWidgetLocale":{"locale":"EN","button":{"export":"Export","processing":"Processing"}},"frErrors":{"unauthorized":"Filerobot is unauthorized.","failedToGetKey":"Filerobot has failed to get key.","tokenOrSEC":"Filerobot token or Security template identifier is empty. Please check again your plugin configuration.","notActive":"Filerobot is not active. Please check again your plugin configuration.","cleanMediaFail":"Clean up media had failed.","adminAuthToken":"Can\'t get admin auth token. Please check again your plugin configuration.","addMedia":"Insert media has been failed."}}')},wg37:function(e){e.exports=JSON.parse('{"filerobot-api-test-button":{"title":"Testverbindung von/zu Filerobot","success":"Verbindung wurde erfolgreich getestet.","errors":{"failToVerifyFilerobotToken":"Die Verbindung konnte nicht hergestellt werden. Bitte überprüfen Sie Filerobot Token und Security Template Identifier.","failToVerifyAdminAuthToken":"Verbindung konnte nicht hergestellt werden. Bitte überprüfen Sie Admin-Zugriffsschlüssel-ID und geheimen Admin-Zugriffsschlüssel."},"button":"Verbindung wird getestet"},"frWidgetLocale":{"locale":"DE","button":{"export":"Exportieren","processing":"Wird bearbeitet"}},"frErrors":{"unauthorized":"Filerobot ist nicht autorisiert.","failedToGetKey":"Filerobot konnte keinen Schlüssel abrufen.","tokenOrSEC":"Filerobot-Token oder Security Tamplate ist leer. Bitte überprüfen Sie erneut die Einstellung des Plugins.","notActive":"Filerobot ist nicht aktiv. Bitte überprüfen Sie erneut die Einstellung des Plugins.","cleanMediaFail":"Die Bereinigung der Medien is fehlgeschlagen.","adminAuthToken":"Admin-Authentifizierungstoken kann nicht abgerufen werden. Bitte überprüfen Sie erneut die Einstellung des Plugina.","addMedia":"Das Einlegen des Mediums ist fehlgeschlagen."}}')}});