var Sys = (function (ua) {
	var s = {};
	s.IE = ua.match(/msie ([\d.]+)/) ? true : false;
	s.Firefox = ua.match(/firefox\/([\d.]+)/) ? true : false;
	s.Chrome = ua.match(/chrome\/([\d.]+)/) ? true : false;
	s.IE6 = (s.IE && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 6)) ? true : false;
	s.IE7 = (s.IE && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 7)) ? true : false;
	s.IE8 = (s.IE && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 8)) ? true : false;
	return s;
})(navigator.userAgent.toLowerCase());
var dom = function (id) {
	return document.getElementById(id);
};

var Css = function (e, o) {
	for (var i in o)
		e.style[i] = o[i];
};

var Extend = function (destination, source) {
	for (var property in source) {
		destination[property] = source[property];
	}
};

var Bind = function (object, fun) {
	var args = Array.prototype.slice.call(arguments).slice(2);
	return function () {
		return fun.apply(object, args);
	}
};

var BindAsEventListener = function (object, fun) {
	var args = Array.prototype.slice.call(arguments).slice(2);
	return function (event) {
		return fun.apply(object, [event || window.event].concat(args));
	}
};

var CurrentStyle = function (element) {
	return element.currentStyle || document.defaultView.getComputedStyle(element, null);
};

function addListener(element, e, fn) {
	element.addEventListener ? element.addEventListener(e, fn, false) : element.attachEvent("on" + e, fn);
};

function removeListener(element, e, fn) {
	element.removeEventListener ? element.removeEventListener(e, fn, false) : element.detachEvent("on" + e, fn)
};

var Class = function (properties) {
	var _class = function () {
		return (arguments[0] !== null && this.initialize && typeof(this.initialize) == 'function') ? this.initialize.apply(this, arguments) : this;
	};
	_class.prototype = properties;
	return _class;
};

var Resize = new Class({
	initialize: function (obj) {
		this.obj = obj;
		this.resizeelm = null;
		this.fun = null; //记录触发什么事件的索引
		this.original = []; //记录开始状态的数组
		this.width = null;
		this.height = null;
		this.fR = BindAsEventListener(this, this.resize);
		this.fS = Bind(this, this.stop);
	},
	set: function (elm, direction) {
		if (!elm) return;
		this.resizeelm = elm;
		addListener(this.resizeelm, 'mousedown', BindAsEventListener(this, this.start, this[direction]));
		return this;
	},
	start: function (e, fun) {
		this.fun = fun;
		this.original = [parseInt(CurrentStyle(this.obj).width), parseInt(CurrentStyle(this.obj).height), parseInt(CurrentStyle(this.obj).left), parseInt(CurrentStyle(this.obj).top)];
		this.width = (this.original[2] || 0) + this.original[0];
		this.height = (this.original[3] || 0) + this.original[1];
		addListener(document, "mousemove", this.fR);
		addListener(document, 'mouseup', this.fS);
	},
	resize: function (e) {
		this.fun(e);
		Sys.IE ? (this.resizeelm.onlosecapture = function () {
			this.fS()
		}) : (this.resizeelm.onblur = function () {
			this.fS()
		})
	},
	stop: function () {
		removeListener(document, "mousemove", this.fR);
		removeListener(document, "mousemove", this.fS);
		window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
	},
	up: function (e) {
		this.height > e.clientY ? Css(this.obj, {
			top: e.clientY + "px",
			height: this.height - e.clientY + "px"
		}) : this.turnDown(e);
	},
	down: function (e) {
		e.clientY > this.original[3] ? Css(this.obj, {
			top: this.original[3]  + 'px',
			height: e.clientY - this.original[3] + 'px'
		}) : this.turnUp(e);
		if(parseInt($('#canvasBox').css('top'))<=79){
			$('#canvasBox').css('margin-top','103px');
			$('#canvasBox').css('top','-24px');
			$('#canvasBox').css('height',(canvasBoxHeight+288)+'px');
			$('#dataList').css('top','0');
			$('#dataList').css('height','0');
		}else{
			$('#canvasBox').css('margin-top','0');
		}
		var imgBoxHeight = $('#canvasBox').height();
		if($('#canvasBox').height()<=60 && $('#canvasBox').height() >=48){
			$('.imgBox').css('height',imgBoxHeight+'px')
		}
		var dataListHeight = $('#dataList').height();
		if($('#canvasBox').height() < canvasBoxHeight ){
			$('#dataList').css('height',dataListHeight - 103 +'px');
		}
		if($('#dataList').height() <  240 || $('#canvasBox').height() > canvasBoxHeight ){
			$('#dataList').css('height',(dataListHeight - 103) +'px');
		}
		if($('#dataList').height() <= 86){
			$('.cover').css('height',dataListHeight - 103 + 'px')
		}
		if(imgBoxHeight<=24 || dataListHeight >= (dataListMaxHeight + 79)){
			$('#canvasBox').css('height','49px');
			$('#dataList').css('height',dataListMaxHeight - 24 + 'px');
			$('#canvasBox').css('margin-top','0');
			$('#canvasBox').css('top',(dataListMaxHeight+79)+'px');
		}
	},
	turnDown: function (e) {
		Css(this.obj, {top: this.height + 'px', height: e.clientY - this.height + 'px'});
	},
	turnUp: function (e) {
		Css(this.obj, {top: e.clientY + 'px', height: this.original[3] - e.clientY + 'px'});
	},
});
window.onload = function () {
	new Resize(dom('canvasBox')).set(dom('rUp'), 'up').set(dom('rDown'), 'down');
	new Resize(dom('dataList')).set(dom('rUp'), 'down');
}