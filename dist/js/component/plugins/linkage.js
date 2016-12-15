'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

;+function (root, doc, base) {

    /**
     *  
     */
    var Linkage = function (_base) {
        _inherits(Linkage, _base);

        function Linkage() {
            _classCallCheck(this, Linkage);

            return _possibleConstructorReturn(this, (Linkage.__proto__ || Object.getPrototypeOf(Linkage)).call(this));
        }

        // 遍历


        _createClass(Linkage, [{
            key: 'each',
            value: function each(callback) {
                var _this2 = this;

                this.eles.forEach(function (ele) {
                    callback && callback.call(_this2, ele);
                });
            }

            // 多级联动

        }, {
            key: 'isComponent',
            value: function isComponent(ele) {
                return ele.dataType ? true : false;
            }

            // refre

        }, {
            key: 'refresh',
            value: function refresh() {
                this.eles = [].from(this.getDoms(doc, this.options.ele));
                this.init();

                return this;
            }
        }]);

        return Linkage;
    }(base);

    /**
     * 
     */


    var LinkageCity = function (_Linkage) {
        _inherits(LinkageCity, _Linkage);

        function LinkageCity(options) {
            _classCallCheck(this, LinkageCity);

            var _this3 = _possibleConstructorReturn(this, (LinkageCity.__proto__ || Object.getPrototypeOf(LinkageCity)).call(this));

            _this3.options = {
                ele: '.linkage-city',
                show: true,
                title: false
            };

            _this3.extend(_this3.options, options);
            _this3.eles = [].from(_this3.getDoms(doc, _this3.options.ele));

            _this3.init();
            return _this3;
        }

        // 创建视图


        _createClass(LinkageCity, [{
            key: 'creatrView',
            value: function creatrView(ele) {
                if (this.isComponent(ele)) {} else {}
            }

            // 设置类型创建属性, 私有属性绑定到 dom 节点上, 可公用属性绑定到实例属性上

        }, {
            key: 'setType',
            value: function setType(ele) {
                var _type = ele.dataType;
                if (_type) {
                    if (/^\w+$/g.test(_type[0])) {
                        console.info(1);
                    }
                }
            }

            // 初始化

        }, {
            key: 'init',
            value: function init() {
                var _this4 = this;

                this.each(function (ele) {
                    if (ele.flag) {
                        return;
                    }

                    _this4.getType(ele);
                    _this4.setType(ele);
                    _this4.creatrView(ele);

                    ele.flag = true;
                });
            }
        }]);

        return LinkageCity;
    }(Linkage);

    /**
     * 年月日, 时分秒
     */


    var LinkageDate = function (_Linkage2) {
        _inherits(LinkageDate, _Linkage2);

        function LinkageDate() {
            _classCallCheck(this, LinkageDate);

            var _this5 = _possibleConstructorReturn(this, (LinkageDate.__proto__ || Object.getPrototypeOf(LinkageDate)).call(this));

            _this5.options = {
                ele: '.linkage-date',
                show: true,
                title: false
            };

            _this5.extend(_this5.options, options);
            _this5.eles = [].from(_this5.getDoms(doc, _this5.options.ele));

            _this5.init();
            return _this5;
        }

        // 闰年


        _createClass(LinkageDate, [{
            key: 'isLape',
            value: function isLape(year) {
                var _y = parseInt(year);
                return _y % 400 == 0 || _y % 4 == 0 && _y % 100 != 0 ? true : false;
            }

            // 获取月份状态

        }, {
            key: 'getMonthState',
            value: function getMonthState() {}

            // 创建视图

        }, {
            key: 'creatrView',
            value: function creatrView(ele) {}

            // 设置类型创建属性, 私有属性绑定到 dom 节点上, 可公用属性绑定到实例属性上

        }, {
            key: 'setType',
            value: function setType(ele) {}
        }, {
            key: 'init',
            value: function init() {
                var _this6 = this;

                this.each(function (ele) {
                    if (ele.flag) {
                        return;
                    }

                    _this6.getType(ele);
                    _this6.setType(ele);
                    _this6.creatrView(ele);

                    ele.flag = true;
                });
            }
        }]);

        return LinkageDate;
    }(Linkage);

    /**
     * 单个下拉框
     */


    var LinkageInit = function (_Linkage3) {
        _inherits(LinkageInit, _Linkage3);

        function LinkageInit(options) {
            _classCallCheck(this, LinkageInit);

            var _this7 = _possibleConstructorReturn(this, (LinkageInit.__proto__ || Object.getPrototypeOf(LinkageInit)).call(this));

            _this7.options = {
                ele: '.linkage',
                show: true,
                title: false
            };

            _this7.extend(_this7.options, options);
            _this7.eles = [].from(_this7.getDoms(doc, _this7.options.ele));

            _this7.init();

            return _this7;
        }

        _createClass(LinkageInit, [{
            key: 'init',
            value: function init() {
                this.each(function (ele) {
                    if (ele.flag) {
                        return;
                    } /*
                      this.getType(ele);
                      this.setType(ele);
                      this.creatrView(ele);*/

                    ele.flag = true;
                });
            }
        }]);

        return LinkageInit;
    }(Linkage);

    if (typeof define == 'function' && define.amd) {
        define(['linkage'], Linkage);
    } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) == 'object' && module.exports) {
        module.exports = Linkage;
    } else if (typeof root != 'undefined') {
        // Browser globals (root is window)
        root.linkage = {
            linkageInit: function linkageInit(options) {
                return new LinkageInit(options);
            },
            linkageDate: function linkageDate(options) {
                return new LinkageDate(options);
            },
            linkageCity: function linkageCity(options) {
                return new LinkageCity(options);
            }
        };
    }
}(window, document, Base || function Base() {
    _classCallCheck(this, Base);
});

var kk = linkage.linkageInit({
    ele: '.linkage'
}),
    i = 0;

var o = kk.eles[0];

function re(str) {
    var _s = '',
        _str = '',
        i = 1;
    str.replace(/(\w{1})/g, function (s, m, n) {
        if (_s == s) {
            i++;
        } else {
            if (_str == '') {
                _str = s;
            } else {
                _str += i;
                _str += s;
                i = 1;
            }

            _s = s;
        }

        if (n == str.length - 1) {
            _str += i;
        }
    });

    return _str.length < str.length ? _str : str;
}