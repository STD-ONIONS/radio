!function(e,o){class n extends HTMLElement{constructor(){super();let e=`<style>@charset "UTF-8";@font-face{font-family:"Radio App";src:url("../fonts/radioapp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}[class*=" icon-"]:before,[class^=icon-]:before{font-family:"Radio App"!important;speak:none;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-add-photo:before{content:"\\e900"}.icon-close:before{content:"\\e901"}.icon-deezer:before{content:"\\e902"}.icon-github:before{content:"\\e903"}.icon-hack:before{content:"\\e904"}.icon-pause:before{content:"\\e905"}.icon-play:before{content:"\\e906"}.icon-radio:before{content:"\\e907"}.icon-settings:before{content:"\\e908"}.icon-volume:before{content:"\\e909"}@font-face{font-family:Bender;font-style:normal;font-weight:400;font-display:swap;src:local('Bender'),local('Bender'),url("../fonts/bender.woff2") format("woff2")}@font-face{font-family:Bender;font-style:italic;font-weight:400;font-display:swap;src:local('Bender Italic'),local('Bender-Italic'),url("../fonts/bender-italic.woff2") format("woff2")}@font-face{font-family:'JetBrains Mono Light';font-style:normal;font-weight:400;font-display:swap;src:local('JetBrains Mono Light'),local('JetBrains Mono Light'),url("../fonts/jetbrains.woff2") format("woff2")}:host{display:block;font-family:Bender;font-weight:400;user-select:none}img{display:block;max-width:100%}.radiostation{padding:5px}.radio-item-box{display:flex;flex-direction:row;font-family:Bender;font-size:16px}.radio-item-icon{position:relative;min-height:48px;min-width:48px;max-height:48px;max-width:48px;height:48px;width:48px;border-radius:50%;overflow:hidden}.radio-item-icon .icons{align-items:center;background-color:rgba(0,0,0,0);color:#fff;display:flex;justify-content:center;line-height:1;position:absolute;bottom:0;left:0;top:0;right:0;transition:background-color .3s ease}.radio-item-icon .icons::before{transform:scale(0);transition:transform .3s ease}.radio-item-icon .icons:hover{background-color:rgba(0,0,0,.35)}.radio-item-icon .icons:hover::before{transform:scale(1)}.radio-item-wrap{flex:1;padding:15px;overflow:hidden}.radio-item-wrap span{display:block;font-family:Bender;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.radio-item-handler{display:flex}.radio-item-handler .icon-handler{display:flex;flex-direction:column;justify-content:center;line-height:1;text-align:center}.radio-item-handler .icon-handler span{display:block}</style><slot></slot><div class="radiostation"><div class="radio-item-box"><div class="radio-item-icon"><span class="icons icon-play"></span><span><img src="favicon.png" alt="Логотип радиостанции"/></span></div><div class="radio-item-wrap"><span class="station-name">Название радиостанции Название радиостанции</span></div><div class="radio-item-handler"><span class="icon-handler"><span class="top">▲</span><span class="center">●</span><span class="bottom">▼</span></span></div></div></div>`;this.attachShadow({mode:"open"}).innerHTML=e}render(){}disconected(){}static get observedAttributes(){return[]}attributeChangedCallback(e,o,n){this.render()}handleError(){console.log("ERROR")}connectedCallback(){if(!this.rendered){this.render();this.rendered=true}}disconnectedCallback(){if(this.rendered){this.rendered=false;this.disconected()}}}e.customElements.define("radio-station",n)}(window,document);