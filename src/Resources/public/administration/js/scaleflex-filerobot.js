!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/bundles/scaleflexfilerobot/",r(r.s="LegY")}({LegY:function(e,t,r){"use strict";r.r(t);function n(e,t,r,n,o,i,a){try{var l=e[i](a),c=l.value}catch(e){return void r(e)}l.done?t(c):Promise.resolve(c).then(n,o)}function o(e){return function(){var t=this,r=arguments;return new Promise((function(o,i){var a=e.apply(t,r);function l(e){n(a,o,i,l,c,"next",e)}function c(e){n(a,o,i,l,c,"throw",e)}l(void 0)}))}}Shopware.Component.register("sw-filerobot-library",{template:'<div class="sw-filerobot-library" style="overflow: scroll">\n    <div id="filerobot-widget"></div>\n</div>\n',inject:["systemConfigApiService"],data:function(){return{frToken:"",frActivation:!1,frSEC:"",frUploadDirectory:"",frSass:""}},mounted:function(){var e=document.createElement("script");e.setAttribute("src","https://cdn.scaleflex.it/plugins/filerobot-widget/1.0.105/filerobot-widget.min.js"),document.head.appendChild(e);var t=document.createElement("link");t.setAttribute("src","https://cdn.scaleflex.it/plugins/filerobot-widget/1.0.105/filerobot-widget.min.css"),t.setAttribute("type","text/css"),t.setAttribute("rel","stylesheet"),document.head.appendChild(t)},computed:{},watch:{},created:function(){this.createdComponent()},methods:{validToken:function(){var e=this;return o(regeneratorRuntime.mark((function t(){var r,n,o,i,a,l,c,s;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.systemConfigApiService.getValues("ScaleflexFilerobot.config");case 2:if(r=t.sent,n=r["ScaleflexFilerobot.config.frActivation"],o=r["ScaleflexFilerobot.config.frSEC"],i=r["ScaleflexFilerobot.config.frToken"],a=r["ScaleflexFilerobot.config.frUploadDirectory"],!0!==n){t.next=33;break}if(""===i&&""===o){t.next=29;break}return l="",c="https://api.filerobot.com/"+i+"/key/"+o,t.next=13,fetch(c,{method:"GET",timeout:30,headers:{"Content-Type":"application/json; charset=utf-8"}});case 13:if(void 0!==(s=(s=t.sent).json()).status&&"error"!==s.status&&(l=s.key),""===l){t.next=21;break}return console.log("Filerobot has faild to get key."),t.abrupt("return",!1);case 21:return e.frToken=i,e.frSass=l,e.frUploadDirectory=a,e.frActivation=n,e.frSEC=o,t.abrupt("return",!0);case 27:t.next=31;break;case 29:return console.log("Filerobot token or Security template identifier is empty"),t.abrupt("return",!1);case 31:t.next=35;break;case 33:return console.log("Filerobot is not active"),t.abrupt("return",!1);case 35:case"end":return t.stop()}}),t)})))()},createdComponent:function(){var e=this;return o(regeneratorRuntime.mark((function t(){var r,n,o,i;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.validToken();case 2:if(!t.sent){t.next=15;break}document.getElementsByClassName("sw-media-sidebar no-headline")[0].style.display="none",r||(r=window.Filerobot),n=null,n=r.Core({securityTemplateID:e.frSEC,container:e.frToken}),o=r.Explorer,i=r.XHRUpload,r.ImageEditor,r.Webcam,n.use(o,{config:{rootFolderPath:e.frUploadDirectory},target:"#filerobot-widget",inline:!0,width:1e4,height:1e3,locale:{strings:{export:"Insert from FMAW into page"}}}).use(i).on("export",(function(e,t,r,n){console.dir(e);var o=[];e.forEach((function(e,t){o.push(e.file.uuid)})),o.length})).on("complete",(function(e){var t=e.failed,r=(e.uploadID,e.successful);if(t&&console.dir(t),r){console.dir(r);var n=[];r.forEach((function(e,t){n.push(e.uuid)}))}})),t.next=16;break;case 15:console.log("Filerobot is unauthorized.");case 16:case"end":return t.stop()}}),t)})))()}}});Shopware.Component.override("sw-media-modal-v2",{template:'{% block sw_media_modal_v2_tab_items %}\n    {% parent %}\n    <sw-tabs-item\n            :name="tabFilerobotDAM"\n            :active-tab="active"\n    >\n        Filerobot DAM\n    </sw-tabs-item>\n{% endblock %}\n\n{% block sw_media_modal_v2_tab_content_library %}\n    {% parent %}\n    <template v-if="active === tabFilerobotDAM">\n        <sw-filerobot-library ref="filerobotLibrary"/>\n    </template>\n{% endblock %}\n',inject:["systemConfigApiService"],props:{defaultTab:{type:String,required:!1,validValues:["upload","library","filerobot"],validator:function(e){return["upload","library","filerobot"].includes(e)}}},computed:{tabFilerobotDAM:function(){return"filerobot"}}})}});