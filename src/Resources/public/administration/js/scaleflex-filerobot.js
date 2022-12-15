!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/bundles/scaleflexfilerobot/",r(r.s="LegY")}({LegY:function(e,t,r){"use strict";r.r(t);function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return l(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return l(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,c=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return a=e.done,e},e:function(e){c=!0,i=e},f:function(){try{a||null==r.return||r.return()}finally{if(c)throw i}}}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function c(e,t,r,n,o,i,a){try{var l=e[i](a),c=l.value}catch(e){return void r(e)}l.done?t(c):Promise.resolve(c).then(n,o)}function u(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var i=e.apply(t,r);function a(e){c(i,n,o,a,l,"next",e)}function l(e){c(i,n,o,a,l,"throw",e)}a(void 0)}))}}var s=Shopware,d=s.Component,f=s.Mixin,p=s.Context,m=Shopware.Utils.fileReader;d.register("sw-filerobot-library",{template:'<div class="sw-filerobot-library" style="overflow: scroll">\n    <div id="filerobot-widget"></div>\n</div>\n',inject:["systemConfigApiService","repositoryFactory","mediaService"],model:{prop:"selection",event:"media-selection-change"},mixins:[f.getByName("notification"),f.getByName("media-grid-listener")],props:{frActivation:{type:Boolean,required:!1,default:!1},frToken:{type:String,required:!1,default:null},frSEC:{type:String,required:!1,default:null},frUploadDirectory:{type:String,required:!1,default:null},frSass:{type:String,required:!1,default:null},frFolderId:{type:String,required:!1,default:null},selection:{type:Array,required:!0},uploadTag:{type:String,required:!0},disabled:{type:Boolean,required:!1,default:!1},frAdminAccessKeyID:{type:String,required:!1,default:null},frAdminSecretAccessKey:{type:String,required:!1,default:null},adminAuthToken:{type:String,required:!1,default:null}},data:function(){return{selectedItems:this.selection}},mounted:function(){var e=document.createElement("script");e.setAttribute("src","https://cdn.scaleflex.it/plugins/filerobot-widget/1.0.105/filerobot-widget.min.js"),document.head.appendChild(e)},computed:{mediaRepository:function(){return this.repositoryFactory.create("media")},isUrlUpload:function(){return"url-upload"===this.inputType}},watch:{selection:function(){this.selectedItems=this.selection,null===this.listSelectionStartItem||this.selectedItems.includes(this.listSelectionStartItem)||(this.listSelectionStartItem=this.selectedItems[0]||null)},selectedItems:function(){this.$emit("media-selection-change",this.selectedItems)}},created:function(){this.createdComponent()},beforeDestroy:function(){this.beforeDestroyComponent()},methods:{useFileUpload:function(){this.inputType="file-upload"},validToken:function(){var e=this;return u(regeneratorRuntime.mark((function t(){var r,n,o,i,a,l,c,u,s,d;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.systemConfigApiService.getValues("ScaleflexFilerobot.config");case 2:if(r=t.sent,n=r["ScaleflexFilerobot.config.frActivation"],o=r["ScaleflexFilerobot.config.frSEC"],i=r["ScaleflexFilerobot.config.frToken"],a=r["ScaleflexFilerobot.config.frUploadDirectory"],l=r["ScaleflexFilerobot.config.frAdminAccessKeyID"],c=r["ScaleflexFilerobot.config.frAdminSecretAccessKey"],u=r["ScaleflexFilerobot.config.frFolderId"],!0!==n){t.next=28;break}if(""===i&&""===o){t.next=23;break}return s="",d="https://api.filerobot.com/"+i+"/key/"+o,t.next=16,fetch(d,{method:"GET",timeout:30,headers:{"Content-Type":"application/json; charset=utf-8"}}).then((function(e){return e.json()})).then((function(t){void 0!==t.status&&"error"!==t.status&&(s=t.key),""===s?(e.createNotificationError({title:e.$tc("global.default.error"),message:"Filerobot has faild to get key."}),console.log("Filerobot has faild to get key.")):(e.frToken=i,e.frSass=s,e.frUploadDirectory=a,e.frActivation=n,e.frSEC=o,e.frAdminAccessKeyID=l,e.frAdminSecretAccessKey=c,e.frFolderId=u)})).catch((function(e){console.error("Error:",e)}));case 16:if(""===s){t.next=20;break}return t.abrupt("return",!0);case 20:return t.abrupt("return",!1);case 21:t.next=26;break;case 23:return e.createNotificationError({title:e.$tc("global.default.error"),message:"Filerobot token or Security template identifier is empty. Please check again your plugin configuration."}),console.log("Filerobot token or Security template identifier is empty. Please check again your plugin configuration."),t.abrupt("return",!1);case 26:t.next=31;break;case 28:return e.createNotificationError({title:e.$tc("global.default.error"),message:"Filerobot is not active. Please check again your plugin configuration."}),console.log("Filerobot is not active. Please check again your plugin configuration."),t.abrupt("return",!1);case 31:case"end":return t.stop()}}),t)})))()},createdComponent:function(){var e=this;return u(regeneratorRuntime.mark((function t(){var r,n,o,i,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.validToken();case 2:if(!t.sent){t.next=20;break}e.mediaService.addListener(e.uploadTag,e.handleMediaServiceUploadEvent),r=window.location.href,document.getElementsByClassName("sw-media-sidebar no-headline")[0].style.display="none",document.getElementsByClassName("sw-modal__footer")[0].style.display="none",n||(n=window.Filerobot),o=null,o=n.Core({securityTemplateID:e.frSEC,container:e.frToken}),i=n.Explorer,l=n.XHRUpload,n.ImageEditor,n.Webcam,o.use(i,{config:{rootFolderPath:e.frUploadDirectory},target:"#filerobot-widget",inline:!0,width:1e4,height:1e3,locale:{strings:{export:"Insert from FMAW into page"}}}).use(l).on("export",function(){var t=u(regeneratorRuntime.mark((function t(r,n,o,i){var l,c,s,d;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(l=window.location.origin+"/api/oauth/token",fetch(l,{method:"POST",timeout:30,headers:{"Content-Type":"application/json; charset=utf-8"},body:JSON.stringify({client_id:e.frAdminAccessKeyID,client_secret:e.frAdminSecretAccessKey,grant_type:"client_credentials"})}).then((function(e){return e.json()})).then((function(t){void 0!==t.access_token&&""!==t.access_token&&(e.adminAuthToken=t.access_token)})).catch((function(e){console.error("Error:",e)})),null===e.adminAuthToken){t.next=26;break}c=a(r),t.prev=4,d=regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=s.value,n=window.location.origin+"/api/scaleflex/filerobot/check-filerobot-uuid-exist",t.next=4,fetch(n,{method:"POST",timeout:30,headers:{"Content-Type":"application/json; charset=utf-8",Authorization:"Bearer "+e.adminAuthToken},body:JSON.stringify({filerobot_uuid:r.file.uuid})}).then((function(e){return e.json()})).then(function(){var t=u(regeneratorRuntime.mark((function t(n){var o,i,a,l,c,u,s,d,f,m,g;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(o=null,!1===n){t.next=9;break}return i=n[0].toLowerCase(),t.next=5,e.mediaRepository.get(i,p.api);case 5:a=t.sent,e.selection.push(a),t.next=24;break;case 9:return l=new URL(r.link),c=r.file.extension,t.next=13,e.onUrlUpload({url:l,fileExtension:c});case 13:u=t.sent,s=!1;case 15:if(s){t.next=24;break}return t.next=18,e.sleep(500);case 18:return t.next=20,e.mediaRepository.get(u,p.api);case 20:null!==(o=t.sent).uploadedAt&&(d=o.url,f=d.replace(window.location.origin,""),m=window.location.origin+"/api/scaleflex/filerobot/clean-up-media",g=(g=r.file.url.cdn).split("?")[0],fetch(m,{method:"POST",timeout:30,headers:{"Content-Type":"application/json; charset=utf-8",Authorization:"Bearer "+e.adminAuthToken},body:JSON.stringify({media_id:u,filerobot_url:g,filerobot_uuid:r.file.uuid,media_path:f})}).then((function(e){return e.json()})).then((function(t){t||(e.createNotificationError({title:e.$tc("global.default.error"),message:"Clean up media had failed."}),console.log("Clean up media had failed."))})).catch((function(e){console.error("Error:",e)})),s=!0),t.next=15;break;case 24:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(e){console.error("Error:",e)}));case 4:e.selectedItems=e.selection;case 5:case"end":return t.stop()}}),t)})),c.s();case 7:if((s=c.n()).done){t.next=11;break}return t.delegateYield(d(),"t0",9);case 9:t.next=7;break;case 11:t.next=16;break;case 13:t.prev=13,t.t1=t.catch(4),c.e(t.t1);case 16:return t.prev=16,c.f(),t.finish(16);case 19:return e.$emit("media-selection-change",e.selectedItems),t.next=22,e.sleep(500);case 22:document.querySelector(".sw-modal.sw-media-modal-v2.sw-modal--full").querySelector(".sw-button.sw-button--primary").click(),t.next=28;break;case 26:e.createNotificationError({title:e.$tc("global.default.error"),message:"Can't get admin auth token. Please check again your plugin configuration."}),console.log("Can't get admin auth token. Please check again your plugin configuration.");case 28:case"end":return t.stop()}}),t,null,[[4,13,16,19]])})));return function(e,r,n,o){return t.apply(this,arguments)}}()).on("complete",(function(e){var t=e.failed,r=(e.uploadID,e.successful);t&&console.dir(t),r&&r.forEach((function(e,t){}))})),setTimeout((function(){window.history.pushState(null,document.title,r)}),1e3),t.next=22;break;case 20:e.createNotificationError({title:e.$tc("global.default.error"),message:"Filerobot is unauthorized."}),console.log("Filerobot is unauthorized.");case 22:case"end":return t.stop()}}),t)})))()},sleep:function(e){return new Promise((function(t){return setTimeout(t,e)}))},beforeDestroyComponent:function(){this.mediaService.removeByTag(this.uploadTag),this.mediaService.removeListener(this.uploadTag,this.handleMediaServiceUploadEvent)},getMediaEntityForUpload:function(){var e=this.mediaRepository.create();return e.mediaFolderId=this.frFolderId,e},onUrlUpload:function(e){var t=this;return u(regeneratorRuntime.mark((function r(){var n,i,a,l;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:n=e.url,i=e.fileExtension,r.prev=1,a=m.getNameAndExtensionFromUrl(n),r.next=9;break;case 5:return r.prev=5,r.t0=r.catch(1),t.createNotificationError({title:t.$tc("global.default.error"),message:t.$tc("global.sw-media-upload-v2.notification.invalidUrl.message")}),r.abrupt("return");case 9:return i&&(a.extension=i),l=t.getMediaEntityForUpload(),r.next=13,t.mediaRepository.save(l,p.api);case 13:return r.next=15,t.mediaService.addUpload(t.uploadTag,o({src:n,filerobot:!0,targetId:l.id},a));case 15:return t.useFileUpload(),r.abrupt("return",l.id);case 17:case"end":return r.stop()}}),r,null,[[1,5]])})))()},handleMediaServiceUploadEvent:function(e){"media-upload-fail"===e.action&&this.onRemoveMediaItem()},onRemoveMediaItem:function(){this.disabled||(this.preview=null,this.$emit("media-upload-remove-image"))}}});Shopware.Component.override("sw-media-modal-v2",{template:'{% block sw_media_modal_v2_tab_items %}\n    {% parent %}\n    <sw-tabs-item\n            :name="tabFilerobotDAM"\n            :active-tab="active"\n    >\n        Filerobot DAM\n    </sw-tabs-item>\n{% endblock %}\n\n{% block sw_media_modal_v2_tab_content_library %}\n    {% parent %}\n    <template v-if="active === tabFilerobotDAM">\n        {% block sw_filerobot_modal_media_library %}\n            <sw-upload-listener\n                    :upload-tag="uploadTag"\n                    @media-upload-add="onUploadsAdded"\n                    @media-upload-finish="onUploadFinished"\n                    @media-upload-fail="onUploadFailed"\n            />\n\n            <sw-filerobot-library\n                    ref="filerobotLibrary"\n                    :selection="selection"\n                    :upload-tag="uploadTag"\n                    @media-selection-change="selection = $event"/>\n        {% endblock %}\n    </template>\n{% endblock %}\n',inject:["systemConfigApiService"],props:{defaultTab:{type:String,required:!1,validValues:["upload","library","filerobot"],validator:function(e){return["upload","library","filerobot"].includes(e)}}},computed:{tabFilerobotDAM:function(){return"filerobot"}}});function g(e,t,r,n,o,i,a){try{var l=e[i](a),c=l.value}catch(e){return void r(e)}l.done?t(c):Promise.resolve(c).then(n,o)}function b(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var i=e.apply(t,r);function a(e){g(i,n,o,a,l,"next",e)}function l(e){g(i,n,o,a,l,"throw",e)}a(void 0)}))}}Shopware.Component.register("sw-filerobot-index",{template:'\n{% block sw_filerobot_index %}\n    <sw-page class="sw-filerobot-index">\n        {% block sw_filerobot_index_page_content %}\n            <template slot="content">\n                <div class="sw-filerobot-library" style="overflow: scroll">\n                    <div id="filerobot-widget"></div>\n                </div>\n            </template>\n        {% endblock %}\n    </sw-page>\n{% endblock %}\n',inject:["systemConfigApiService","repositoryFactory","mediaService"],props:{frActivation:{type:Boolean,required:!1,default:!1},frToken:{type:String,required:!1,default:null},frSEC:{type:String,required:!1,default:null},frUploadDirectory:{type:String,required:!1,default:null},frSass:{type:String,required:!1,default:null},selection:{type:Array,required:!0},frAdminAccessKeyID:{type:String,required:!1,default:null},frAdminSecretAccessKey:{type:String,required:!1,default:null},adminAuthToken:{type:String,required:!1,default:null}},data:function(){return{isLoading:!1,term:this.$route.query?this.$route.query.term:""}},mounted:function(){var e=document.createElement("script");e.setAttribute("src","https://cdn.scaleflex.it/plugins/filerobot-widget/1.0.105/filerobot-widget.min.js"),document.head.appendChild(e)},metaInfo:function(){return{title:this.$createTitle()}},created:function(){this.createdComponent()},methods:{validToken:function(){var e=this;return b(regeneratorRuntime.mark((function t(){var r,n,o,i,a,l,c,u,s,d;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.systemConfigApiService.getValues("ScaleflexFilerobot.config");case 2:if(r=t.sent,n=r["ScaleflexFilerobot.config.frActivation"],o=r["ScaleflexFilerobot.config.frSEC"],i=r["ScaleflexFilerobot.config.frToken"],a=r["ScaleflexFilerobot.config.frUploadDirectory"],l=r["ScaleflexFilerobot.config.frAdminAccessKeyID"],c=r["ScaleflexFilerobot.config.frAdminSecretAccessKey"],u=r["ScaleflexFilerobot.config.frFolderId"],!0!==n){t.next=28;break}if(""===i&&""===o){t.next=23;break}return s="",d="https://api.filerobot.com/"+i+"/key/"+o,t.next=16,fetch(d,{method:"GET",timeout:30,headers:{"Content-Type":"application/json; charset=utf-8"}}).then((function(e){return e.json()})).then((function(t){void 0!==t.status&&"error"!==t.status&&(s=t.key),""===s?(e.createNotificationError({title:e.$tc("global.default.error"),message:"Filerobot has faild to get key."}),console.log("Filerobot has faild to get key.")):(e.frToken=i,e.frSass=s,e.frUploadDirectory=a,e.frActivation=n,e.frSEC=o,e.frAdminAccessKeyID=l,e.frAdminSecretAccessKey=c,e.frFolderId=u)})).catch((function(e){console.error("Error:",e)}));case 16:if(""===s){t.next=20;break}return t.abrupt("return",!0);case 20:return t.abrupt("return",!1);case 21:t.next=26;break;case 23:return e.createNotificationError({title:e.$tc("global.default.error"),message:"Filerobot token or Security template identifier is empty. Please check again your plugin configuration."}),console.log("Filerobot token or Security template identifier is empty. Please check again your plugin configuration."),t.abrupt("return",!1);case 26:t.next=31;break;case 28:return e.createNotificationError({title:e.$tc("global.default.error"),message:"Filerobot is not active. Please check again your plugin configuration."}),console.log("Filerobot is not active"),t.abrupt("return",!1);case 31:case"end":return t.stop()}}),t)})))()},createdComponent:function(){var e=this;return b(regeneratorRuntime.mark((function t(){var r,n,o,i,a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.validToken();case 2:if(!t.sent){t.next=16;break}e.mediaService.addListener(e.uploadTag,e.handleMediaServiceUploadEvent),r=window.location.href,n||(n=window.Filerobot),o=null,o=n.Core({securityTemplateID:e.frSEC,container:e.frToken}),i=n.Explorer,a=n.XHRUpload,n.ImageEditor,n.Webcam,o.use(i,{config:{rootFolderPath:e.frUploadDirectory},target:"#filerobot-widget",inline:!0,width:1e4,height:1e3,disableExportButton:!0,locale:{strings:{export:"Insert from FMAW into page"}}}).use(a).on("export",function(){var e=b(regeneratorRuntime.mark((function e(t,r,n,o){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));return function(t,r,n,o){return e.apply(this,arguments)}}()).on("complete",(function(e){e.failed,e.uploadID,e.successful})),setTimeout((function(){window.history.pushState(null,document.title,r)}),1e3),t.next=18;break;case 16:e.createNotificationError({title:e.$tc("global.default.error"),message:"Filerobot is unauthorized."}),console.log("Filerobot is unauthorized.");case 18:case"end":return t.stop()}}),t)})))()}}}),Shopware.Module.register("sw-filerobot",{name:"filerobot",title:"sw-filerobot.general.mainMenuItemGeneral",description:"sw-filerobot.general.descriptionTextModule",favicon:"icon-module-content.png",color:"#ff68b4",icon:"regular-image",routes:{index:{components:{default:"sw-filerobot-index"},path:"index"}},navigation:[{id:"sw-filerobot",label:"sw-filerobot.general.mainMenuItemGeneral",color:"#ff3d58",path:"sw.filerobot.index",icon:"regular-image",parent:"sw-content",position:30}]})}});