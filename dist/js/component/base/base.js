'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cuke = {

    // 检测是否含有属性
    addProto: function addProto(obj, prop) {
        if (prop in obj) {
            obj.prototype[prop] = obj[prop];
            return false;
        }
        return !obj.prototype[prop];
    },

    data: [
    // Array
    {
        obj: Array,
        key: ['forEach', 'from', 'indexOf'],
        val: [
        // forEach
        function (callback) {
            var i = 0,
                len = this.length;

            while (i++ < len) {
                callback.apply(this, [this[i - 1], [i - 1], this]);
            };
        },

        // from
        function (obj) {
            return [].slice.call(obj);
        },

        // indexOf
        function (item) {
            var i = 0,
                len = this.length;

            while (i++ < len) {
                if (this[i - 1] === item) {
                    return i - 1;
                    break;
                }
            }

            return -1;
        }]
    },

    // element
    {
        obj: HTMLElement,
        key: ['insertAdjacentElement', 'insertAdjacentText'],
        val: [
        // insertAdjacentElement
        function (where, node) {
            switch (where) {
                case "beforebegin":
                    this.parentNode.insertBefore(node, this);
                    break;
                case "afterbegin":
                    this.insertBefore(node, this.firstChild);
                    break;
                case "beforeend":
                    console.info(this);
                    this.appendChild(node);
                    break;
                case "afterend":
                    if (this.nextSibling) this.parentNode.insertBefore(node, this.nextSibling);else this.parentNode.appendChild(node);
                    break;
            }
        },

        // insertAdjacentText
        function (where, txt) {
            var parsedText = document.createTextNode(txt);
            this.insertAdjacentElement1(where, parsedText);
        }]
    }],

    init: function init() {
        for (var i = 0, item; item = this.data[i++];) {
            for (var j = 0, len = item.key.length; j < len; j++) {

                var key = item.key[j],
                    val = item.val[j];

                if (this.addProto(item.obj, key)) {
                    console.info(item.obj[key]);
                    item.obj.prototype[key] = item.obj[key] || val;
                }
            }
        }
    }
};

Cuke.init();

Cuke = null;

var Base = function () {
    function Base() {
        _classCallCheck(this, Base);
    }

    /***** 1.string *****/

    // 清除全部空格


    _createClass(Base, [{
        key: 'trim',
        value: function trim(str) {
            return str.replace(/\s/g, '');
        }

        // 清除尾部空格

    }, {
        key: 'trimRight',
        value: function trimRight(str) {
            return str.replace(/\s*$/g, '');
        }

        // 清除首部空格

    }, {
        key: 'trimleft',
        value: function trimleft(str) {
            return str.replace(/^\s*/g, '');
        }

        // 清除两端空格

    }, {
        key: 'trimOuter',
        value: function trimOuter(str) {
            return str.replace(/(?:^\s*)|(?:\s*$)/g, '');
        }

        // 清除内部空格

    }, {
        key: 'trimInner',
        value: function trimInner(str) {
            return str.match(/^\s*/g)[0] + str.replace(/\s/g, '') + str.match(/\s*$/g)[0];
        }

        /***** 2.doms *****/

        // 获取节点

    }, {
        key: 'getDoms',
        value: function getDoms(obj, str, flag) {
            var _obj, _str, _flag;

            if ((typeof obj === 'undefined' ? 'undefined' : _typeof2(obj)) == 'object') {
                _obj = obj;
                _str = str;
                _flag = flag;
            } else {
                _obj = document;
                _str = obj;
                _flag = str;
            }

            return _flag ? _obj.querySelector(_str) : _obj.querySelectorAll(_str);
        }
    }, {
        key: 'firstChild',
        value: function firstChild(obj) {
            return obj.firstElementChild || obj.firstChild;
        }
    }, {
        key: 'lastChild',
        value: function lastChild(obj) {
            return obj.lastElementChild || obj.lastChild;
        }
    }, {
        key: 'next',
        value: function next(obj) {
            return obj.nextElementSibling || obj.nextSibling;
        }
    }, {
        key: 'prev',
        value: function prev(obj) {
            return obj.previousElementSibling || obj.previousSibling;
        }

        // 返回父元素
        /**
         * [parents description]
         * @Author   cuke
         * @DateTime 2016-12-08
         * @param    {object}   obj  [当前的 dom 元素]
         * @param    {string}   str  [查找父元素的 class|tag]
         * @param    {boolean}  flag [返回查找的最近父节点, 可选]
         * @return   {array|null|object}
         */

    }, {
        key: 'parents',
        value: function parents(obj, str, flag) {
            if (!obj instanceof Object || obj instanceof Array) {
                return null;
            }
            var arr = [],
                dom = obj.parentNode;
            if (str) {
                var type = str.charAt(0),
                    _str = str.substr(1),
                    re = new RegExp('(?:^|\\s+)' + _str + '(?:\\s+|$)');

                while (dom.tagName.toLowerCase() != 'body') {
                    if (type == '.') {
                        if (re.test(dom.className)) {
                            arr.push(dom);
                        }
                    } else {
                        if (dom.tagName.toLowerCase() == str) {
                            arr.push(dom);
                        }
                    }
                    dom = dom.parentNode;
                    if (flag == true && arr.lengthandle) {
                        return arr[0];
                    }
                }

                return arr.length ? arr : null;
            }

            return null;
        }

        /***** events *****/
        // 添加绑定事件

    }, {
        key: 'addEvent',
        value: function addEvent(obj, target, type, handle, one) {
            var _arguments = arguments;


            if (typeof type == 'string') {
                var _fn = function _fn(e) {
                    var _this = e.target;
                    var re = new RegExp('(?:^|\\s+)' + target.substr(1) + '(?:\\s+|$)');
                    while (_this != obj) {
                        if (target.charAt(0) == '.') {
                            if (re.test(_this.className)) {
                                handle.apply(_this, _arguments);
                                break;
                            }
                        } else {
                            if (_this.tagName.toLowerCase() == target) {
                                handle.apply(_this, _arguments);
                                break;
                            }
                        }
                        _this = _this.parentNode;
                    }

                    if (one == true) {
                        obj.removeEventListener(type, _fn);
                    }
                };

                if (!one) {
                    this.handler(obj, type, _fn);
                }

                obj.addEventListener(type, _fn, false);
            } else {
                var _type = target,
                    _fn = type,
                    _one = one || handle;
                if (_one) {
                    var _handle = function _handle(e) {
                        _fn.apply(obj, _arguments);
                        obj.removeEventListener(_type, _handle);
                    };

                    obj.addEventListener(_type, _handle, false);

                    return this;
                } else {
                    this.handler(obj, _type, _fn);
                    obj.addEventListener(_type, _fn, false);
                }
            }

            return _fn;
        }

        // 便于移除事件的中间件

    }, {
        key: 'handler',
        value: function handler(obj, type, handle) {
            obj.handler = obj.handler || {};

            type in obj.handler ? obj.handler[type].push(handle) : obj.handler[type] = [handle];
        }

        // 移除绑定事件

    }, {
        key: 'removeEvent',
        value: function removeEvent(obj, type, handleName) {
            var _handler = obj.handler,
                _type = type ? _handler[type] : '';

            if (handleName) {
                var index = _type.indexOf(handleName);

                if (index > -1) {
                    obj.removeEventListener(type, _type[index]);
                    _type.splice(index, 1);
                }
            } else if (type) {
                _type.forEach(function (fn) {
                    obj.removeEventListener(type, fn);
                });
                _handler[type] = [];
            } else {
                for (var prop in _handler) {
                    _handler[prop].forEach(function (fn) {
                        obj.removeEventListener(prop, fn);
                    });
                    _handler[prop] = [];
                }
            }

            return this;
        }
    }, {
        key: 'one',
        value: function one(obj, target, type, handle) {
            this.addEvent(obj, target, type, handle, true);
            return this;
        }

        // 阻止冒泡

    }, {
        key: 'stopPro',
        value: function stopPro(e) {
            e.stopPropagation();
            return this;
        }

        // 阻止默认事件

    }, {
        key: 'stopPre',
        value: function stopPre(e) {
            e.preventDefault();
            return this;
        }
    }, {
        key: 'stopAll',
        value: function stopAll(e) {
            e.stopPropagation();
            e.preventDefault();
            return this;
        }

        /***** className *****/

    }, {
        key: 'hasClass',
        value: function hasClass(obj, str) {
            if (obj.classList) {
                Base.prototype.hasClass = function (obj, str) {
                    return obj.classList.contains(str);
                };
            } else {
                Base.prototype.hasClass = function (obj, str) {
                    return new RegExp('(?:^|\\s+)' + str + '(?:\\s+|$)').test(obj.className);
                };
            }
            return this.hasClass(obj, str);
        }
    }, {
        key: 'addClass',
        value: function addClass(obj, str) {
            var _this2 = this;

            if (obj.classList) {
                Base.prototype.addClass = function (obj, str) {
                    if (!_this2.hasClass(obj, str)) {
                        obj.classList.add(str);
                    }
                    return _this2;
                };
            } else {
                Base.prototype.addClass = function (obj, str) {
                    if (!_this2.hasClass(obj, str)) {
                        obj.className = obj.className == '' ? obj.className = str : obj.className + ' ' + str;
                    }
                    return _this2;
                };
            }
            return this.addClass(obj, str);
        }
    }, {
        key: 'removeClass',
        value: function removeClass(obj, str) {
            var _this3 = this;

            if (obj.classList) {
                Base.prototype.removeClass = function (obj, str) {
                    if (_this3.hasClass(obj, str)) {
                        obj.classList.remove(str);
                    }
                    return _this3;
                };
            } else {
                Base.prototype.removeClass = function (obj, str) {
                    if (_this3.hasClass(obj, str)) {
                        // 给强迫症开发者去除首部空格
                        obj.className = obj.className.replace(new RegExp('(?:^|\\s)' + s + '(?=\\s|$)'), '').replace(/^\s*|\s*$/g, '');
                        return _this3;
                    }
                };
            }
            return this.removeClass(obj, str);
        }

        /***** 3.func *****/

    }, {
        key: 'extend',
        value: function extend() {
            var _obj = arguments[0],
                args = [].slice.call(arguments, 1);

            args.forEach(function (v) {
                for (var prop in v) {
                    _obj[prop] = v[prop];
                }
            });

            return this || _obj;
        }
    }, {
        key: 'ready',
        value: function ready(callback) {
            var _this4 = this;

            var _fn = function _fn() {
                callback();
                _this4.removeEvent(document, 'DOMContentLoaded', _fn);
            };

            this.addEvent(document, 'DOMContentLoaded', _fn);

            return this;
        }
    }, {
        key: 'ajax',
        value: function ajax(options) {
            var _option = {
                method: 'get',
                dataType: 'json',
                async: true
            },
                xhr = new XMLHttpRequest();

            this.extend && this.extend(_option, options || {});

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        _option.success && _option.success(xhr.responseText);
                    } else {
                        _option.error && _option.error(xhr.statusText, xhr.status);
                    }
                }
            };

            xhr.open(_option.method, _option.url, _option.async);
            xhr.send();
        }

        /***** 4.pos *****/

    }, {
        key: 'offset',
        value: function offset(obj) {

            var top = 0,
                left = 0;

            while (obj.offsetParent) {
                top += obj.offsetTop;
                left += obj.offsetLeft;
                obj = obj.offsetParent;
            }

            return {
                top: top,
                left: left
            };
        }

        // 上右下左分别返回 0, 1, 2, 3

    }, {
        key: 'getDirection',
        value: function getDirection(e, obj) {
            var e = e || window.event,
                w = o.offsetWidth,
                h = o.offsetHeight,
                x = e.pageX - obj.offsetLeft - w / 2 * (w > h ? h / w : 1),
                y = e.pageY - obj.offsetTop - h / 2 * (h > w ? w / h : 1),
                d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;

            return d;
        }
    }, {
        key: 'isEmptyObj',


        /* 同上
        getDirection(e, o){
            var e = e||window.event,
                x = e.pageX||e.offsetX+8,
                y = e.pageY||e.offsetY+8,
                arr = [Math.abs(y-o.offsetTop), Math.abs(x-o.offsetLeft-o.offsetWidth), Math.abs(y-o.offsetTop-o.offsetHeight), Math.abs(x-o.offsetLeft)],
                iMin = Math.min.apply(null, arr);
            return arr.indexOf(iMin);
        }
        */

        /***** 5.检测 *****/
        // 空对象检测  // 理论上可以检测空数组(只要数组里面有数据) 唯一例外 [, ,]
        value: function isEmptyObj(obj) {
            if (obj instanceof Array) {
                return !obj.length; // 如果[,] 是空数组, 去掉本行
            }

            if (Object.keys) {
                return !Object.keys(obj).length;
            } else {
                for (var attr in obj) {
                    if (attr) return false;
                }
                return true;
            }
        }

        // 数据类型检测

    }, {
        key: 'typeof',
        value: function _typeof(obj) {
            if (obj === null) {
                return 'Null';
            }

            if (obj === undefined) {
                return 'Undefined';
            }

            return Object.prototype.toString.call(obj).slice(8, -1);
        }

        /***** 6.文本 *****/

    }, {
        key: 'text',
        value: function text(obj, str, flag) {
            var _this5 = this;

            if (obj.innerText) {
                Base.prototype.text = function (obj, str, flag) {
                    if (str === true) {
                        return obj.innerText.replace(/\s/gm, '');
                    } else if (str == '' || str) {
                        obj.innerText = str;
                        return _this5;
                    } else {
                        return obj.innerText;
                    }
                };
            } else {
                Base.prototype.text = function (obj, str, flag) {
                    if (str === true) {
                        return obj.textContent.replace(/\s/gm, '');
                    } else if (str == '' || str) {
                        obj.textContent = str;
                        return _this5;
                    } else {
                        return obj.textContent;
                    }
                };
            }
            // 优化 dom 只判定一次
            return this.text(obj, str, flag);
        }
    }]);

    return Base;
}();