(function(){this.Replicant={}}).call(this),function(){Replicant.extendObject=function(t,e){var n,i;for(n in e)i=e[n],t[n]=i;return t}}.call(this),function(){var t,e;Replicant.registerElement=function(t,n){var i,r,o,a,u,c;return null==n&&(n={}),t=t.toLowerCase(),a=Replicant.extendObject({},n),r=null!=(c=a.defaultCSS)?c:"%t { display: block }",delete a.defaultCSS,e(r,t),o=Object.getPrototypeOf(document.createElement("div")),o.__super__=o,u=Object.create(o,a),i=document.registerElement(t,{prototype:u}),Object.defineProperty(u,"constructor",{value:i}),i},e=function(e,n){var i;return i=t(n),i.textContent=e.replace(/%t/g,n)},t=function(t){var e;return e=document.createElement("style"),e.setAttribute("type","text/css"),e.setAttribute("data-tag-name",t.toLowerCase()),document.head.insertBefore(e,document.head.firstChild),e}}.call(this),function(){Replicant.instrumentMethod=function(t,e,n){var i;return i=t[e],t[e]=function(){var t;return t=i.apply(this,arguments),n(),t}}}.call(this),function(){Replicant.triggerEvent=function(t,e,n){var i;return null==n&&(n={}),i=t.ownerDocument.createEvent("Events"),i.initEvent(e,!0,!0),Replicant.extendObject(i,n),t.dispatchEvent(i)}}.call(this),function(){var t,e,n=function(t,e){return function(){return t.apply(e,arguments)}};t=Replicant.instrumentMethod,e=Replicant.triggerEvent,Replicant.FrameController=function(){function i(t){this.element=t,this.afterPopState=n(this.afterPopState,this),this.afterReplaceState=n(this.afterReplaceState,this),this.afterPushState=n(this.afterPushState,this),this.iframeElementLoaded=n(this.iframeElementLoaded,this)}var r;return i.prototype.elementAttached=function(){return this.attachIframeElement()},i.prototype.getIframeElement=function(){var t;return null!=this.iframeElement?this.iframeElement:this.iframeElement=(t=document.createElement("iframe"),t.addEventListener("load",this.iframeElementLoaded,!0),t.src="about:blank",t)},i.prototype.isLoading=function(){return!this.loaded},i.prototype.initialize=function(){return this.initialized?void 0:(this.triggerEvent("replicant-initialize"),this.initialized=!0)},i.prototype.completeLoad=function(){return this.triggerEvent("replicant-load")},i.prototype.completeNavigationWithAction=function(t){return this.triggerEvent("replicant-navigate",{action:t})},i.prototype.attachIframeElement=function(){return this.element.insertBefore(this.getIframeElement(),this.element.firstChild)},i.prototype.iframeElementLoaded=function(){return r(function(t){return function(){return t.instrumentHistoryMethods(),t.registerEventListeners(),t.initialize()?void 0:(t.completeNavigationWithAction("load"),t.completeLoad())}}(this))},i.prototype.instrumentHistoryMethods=function(){var e;return e=this.element.window.history.constructor.prototype,t(e,"pushState",this.afterPushState),t(e,"replaceState",this.afterReplaceState)},i.prototype.registerEventListeners=function(t){var e;return e=this.element.window.window,e.addEventListener("popstate",this.afterPopState,!0)},i.prototype.afterPushState=function(){return this.completeNavigationWithAction("push")},i.prototype.afterReplaceState=function(){return this.completeNavigationWithAction("replace")},i.prototype.afterPopState=function(){return this.completeNavigationWithAction("pop")},i.prototype.triggerEvent=function(t,n){return e(this.element,t,n)},r=function(t){return setTimeout(t,1)},i}()}.call(this),function(){Replicant.Session=function(){function t(t){this.element=t,this.navigating=!1}var e,n,i,r;return t.prototype.evaluate=function(t){return n(function(e){return function(){return e.element.evaluate(t)}}(this))},t.prototype.goToLocation=function(t){return this.navigate(function(e){return function(){return e.element.location=t}}(this))},t.prototype.goBack=function(){return this.navigate(function(t){return function(){return t.element.goBack()}}(this))},t.prototype.goForward=function(){return this.navigate(function(t){return function(){return t.element.goForward()}}(this))},t.prototype.clickSelector=function(t){return this.navigate(function(n){return function(){return e(n.querySelector(t))}}(this))},t.prototype.wait=function(){return new Promise(function(t,e){return n(t)})},t.prototype.waitForEvent=function(t,e){return null!=e?i(this.element.window,t,e):r(this.element.window,t)},t.prototype.waitForNavigation=function(){return this.navigate(function(){return!0})},t.prototype.navigate=function(t){return this.promiseNavigation(function(e){return function(r){return i(e.element,"replicant-navigate",function(t){return r({action:t.action,location:e.element.location})}),n(t)}}(this))},t.prototype.promiseNavigation=function(t){return this.navigating?Promise.reject(new Error("Already navigating")):(this.navigating=!0,new Promise(t).then(function(t){return function(e){return t.navigating=!1,e}}(this))["catch"](function(t){return function(e){throw t.navigating=!1,e}}(this)))},t.prototype.querySelector=function(t){var e;return function(){var n;if(null!=(e=null!=(n=this.element.document)?n.querySelector(t):void 0))return e;throw new Error("No element matching selector `"+t+"'")}.call(this)},e=function(t){return Replicant.triggerEvent(t,"click")},i=function(t,e,n){var i;return t.addEventListener(e,i=function(r){return t.removeEventListener(e,i),n(r)})},r=function(t,e){return new Promise(function(n,r){return i(t,e,n)})},n=function(t){return setTimeout(t,1)},t}()}.call(this),function(){Replicant.Location=function(){function t(t){var e;e=document.createElement("a"),e.href=null!=t?t.toString():void 0,this.href=e.href,this.protocol=e.protocol,this.host=e.host,this.hostname=e.hostname,this.port=e.port,this.pathname=e.pathname,this.search=e.search,this.hash=e.hash,this.username=e.username,this.password=e.password}return t.prototype.valueOf=function(){return this.href},t.prototype.toString=function(){return this.href},t}()}.call(this),function(){Replicant.registerElement("replicant-frame",{defaultCSS:"%t {\n  position: relative;\n  display: block;\n  width: 320px;\n  height: 240px;\n  border: 1px solid windowframe;\n}\n\n%t > iframe {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  border: none;\n}",createdCallback:{value:function(){return this.controller=new Replicant.FrameController(this)}},attachedCallback:{value:function(){return this.controller.elementAttached()}},iframeElement:{get:function(){return this.controller.getIframeElement()}},window:{get:function(){var t;return null!=(t=this.iframeElement)?t.contentWindow:void 0}},document:{get:function(){var t;return null!=(t=this.window)?t.document:void 0}},location:{get:function(){var t;return new Replicant.Location(null!=(t=this.window)?t.location:void 0)},set:function(t){return this.iframeElement.src=t.toString()}},title:{get:function(){var t;return null!=(t=this.document)?t.title:void 0}},evaluate:{value:function(t){var e;return null!=(e=this.window)?e.eval(t):void 0}},goBack:{value:function(){var t;return null!=(t=this.window)?t.history.back():void 0}},goForward:{value:function(){var t;return null!=(t=this.window)?t.history.forward():void 0}},createSession:{value:function(){return new Replicant.Session(this)}}})}.call(this);