// Generated by CoffeeScript 1.10.0

/*
jQuery Growl
Copyright 2015 Kevin Sylvestre
1.3.2
 */
(function(){"use strict";var t,s,i,n=function(t,s){return function(){return t.apply(s,arguments)}};t=jQuery,s=function(){function t(){}return t.transitions={webkitTransition:"webkitTransitionEnd",mozTransition:"mozTransitionEnd",oTransition:"oTransitionEnd",transition:"transitionend"},t.transition=function(t){var s,i,n,e;s=t[0],i=this.transitions;for(e in i)if(n=i[e],null!=s.style[e])return n},t}(),i=function(){function i(s){null==s&&(s={}),this.container=n(this.container,this),this.content=n(this.content,this),this.html=n(this.html,this),this.$growl=n(this.$growl,this),this.$growls=n(this.$growls,this),this.animate=n(this.animate,this),this.remove=n(this.remove,this),this.dismiss=n(this.dismiss,this),this.present=n(this.present,this),this.waitAndDismiss=n(this.waitAndDismiss,this),this.cycle=n(this.cycle,this),this.close=n(this.close,this),this.click=n(this.click,this),this.mouseLeave=n(this.mouseLeave,this),this.mouseEnter=n(this.mouseEnter,this),this.unbind=n(this.unbind,this),this.bind=n(this.bind,this),this.render=n(this.render,this),this.settings=t.extend({},i.settings,s),this.$growls().attr("class",this.settings.location),this.render()}return i.settings={namespace:"growl",duration:3200,close:"&#215;",location:"default",style:"default",size:"medium",delayOnHover:!0},i.growl=function(t){return null==t&&(t={}),this.initialize(),new i(t)},i.initialize=function(){return t("body:not(:has(#growls))").append('<div id="growls" />')},i.prototype.render=function(){var t;t=this.$growl(),this.$growls().append(t),this.settings.fixed?this.present():this.cycle()},i.prototype.bind=function(t){return null==t&&(t=this.$growl()),t.on("click",this.click),this.settings.delayOnHover&&(t.on("mouseenter",this.mouseEnter),t.on("mouseleave",this.mouseLeave)),t.on("contextmenu",this.close).find("."+this.settings.namespace+"-close").on("click",this.close)},i.prototype.unbind=function(t){return null==t&&(t=this.$growl()),t.off("click",this.click),this.settings.delayOnHover&&(t.off("mouseenter",this.mouseEnter),t.off("mouseleave",this.mouseLeave)),t.off("contextmenu",this.close).find("."+this.settings.namespace+"-close").off("click",this.close)},i.prototype.mouseEnter=function(t){var s;return s=this.$growl(),s.stop(!0,!0)},i.prototype.mouseLeave=function(t){return this.waitAndDismiss()},i.prototype.click=function(t){return null!=this.settings.url?(t.preventDefault(),t.stopPropagation(),window.open(this.settings.url)):void 0},i.prototype.close=function(t){var s;return t.preventDefault(),t.stopPropagation(),s=this.$growl(),s.stop().queue(this.dismiss).queue(this.remove)},i.prototype.cycle=function(){var t;return t=this.$growl(),t.queue(this.present).queue(this.waitAndDismiss())},i.prototype.waitAndDismiss=function(){var t;return t=this.$growl(),t.delay(this.settings.duration).queue(this.dismiss).queue(this.remove)},i.prototype.present=function(t){var s;return s=this.$growl(),this.bind(s),this.animate(s,this.settings.namespace+"-incoming","out",t)},i.prototype.dismiss=function(t){var s;return s=this.$growl(),this.unbind(s),this.animate(s,this.settings.namespace+"-outgoing","in",t)},i.prototype.remove=function(t){return this.$growl().remove(),"function"==typeof t?t():void 0},i.prototype.animate=function(t,i,n,e){var o;null==n&&(n="in"),o=s.transition(t),t["in"===n?"removeClass":"addClass"](i),t.offset().position,t["in"===n?"addClass":"removeClass"](i),null!=e&&(null!=o?t.one(o,e):e())},i.prototype.$growls=function(){return null!=this.$_growls?this.$_growls:this.$_growls=t("#growls")},i.prototype.$growl=function(){return null!=this.$_growl?this.$_growl:this.$_growl=t(this.html())},i.prototype.html=function(){return this.container(this.content())},i.prototype.content=function(){return"<div class='"+this.settings.namespace+"-close'>"+this.settings.close+"</div>\n<div class='"+this.settings.namespace+"-title'>"+this.settings.title+"</div>\n<div class='"+this.settings.namespace+"-message'>"+this.settings.message+"</div>"},i.prototype.container=function(t){return"<div class='"+this.settings.namespace+" "+this.settings.namespace+"-"+this.settings.style+" "+this.settings.namespace+"-"+this.settings.size+"'>\n  "+t+"\n</div>"},i}(),this.Growl=i,t.growl=function(t){return null==t&&(t={}),i.growl(t)},t.growl.error=function(s){var i;return null==s&&(s={}),i={title:"",style:"error"},t.growl(t.extend(i,s))},t.growl.success=function(s){var i;return null==s&&(s={}),i={title:"",style:"success"},t.growl(t.extend(i,s))},t.growl.notice=function(s){var i;return null==s&&(s={}),i={title:"",style:"notice"},t.growl(t.extend(i,s))},t.growl.warning=function(s){var i;return null==s&&(s={}),i={title:"",style:"warning"},t.growl(t.extend(i,s))}}).call(this);