// 实现 ECMA-262, Edition 5, 15.4.4.19
// 参考: http://es5.github.com/#x15.4.4.19
; (function (window, $, undefined) {
    // helpers
    var isIE = !!window.ActiveXObject || "ActiveXObject" in window;
    var UA = navigator.userAgent.toLocaleLowerCase();
    var testIE = UA.match(/msie ([\d\.]+)/);
    var isIE8 = false;
    testIE && (isIE8 = +testIE[1] === 8);
    // String#trim
    if (!String.prototype.trim) {
        String.prototype.trim = function () {
            return String(this).replace(/^\s+/, '').replace(/\s+$/, '');
        };
    }
    // Element@classList
    if (!document.body.classList) {
        /**
         * https://github.com/eligrey/classList.js/blob/master/LICENSE.md
         */
        if ("document" in self) {

            // Full polyfill for browsers with no classList support
            // Including IE < Edge missing SVGElement.classList
            if (
                !("classList" in document.createElement("_"))
                || document.createElementNS
                && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))
            ) {

                (function (view) {

                    "use strict";

                    if (!('Element' in view)) return;

                    var
                        classListProp = "classList"
                        , protoProp = "prototype"
                        , elemCtrProto = view.Element[protoProp]
                        , objCtr = Object
                        , strTrim = String[protoProp].trim || function () {
                            return this.replace(/^\s+|\s+$/g, "");
                        }
                        , arrIndexOf = Array[protoProp].indexOf || function (item) {
                            var
                                i = 0
                                , len = this.length
                                ;
                            for (; i < len; i++) {
                                if (i in this && this[i] === item) {
                                    return i;
                                }
                            }
                            return -1;
                        }
                        // Vendors: please allow content code to instantiate DOMExceptions
                        , DOMEx = function (type, message) {
                            this.name = type;
                            this.code = DOMException[type];
                            this.message = message;
                        }
                        , checkTokenAndGetIndex = function (classList, token) {
                            if (token === "") {
                                throw new DOMEx(
                                    "SYNTAX_ERR"
                                    , "The token must not be empty."
                                );
                            }
                            if (/\s/.test(token)) {
                                throw new DOMEx(
                                    "INVALID_CHARACTER_ERR"
                                    , "The token must not contain space characters."
                                );
                            }
                            return arrIndexOf.call(classList, token);
                        }
                        , ClassList = function (elem) {
                            var
                                trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
                                , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
                                , i = 0
                                , len = classes.length
                                ;
                            for (; i < len; i++) {
                                this.push(classes[i]);
                            }
                            this._updateClassName = function () {
                                elem.setAttribute("class", this.toString());
                            };
                        }
                        , classListProto = ClassList[protoProp] = []
                        , classListGetter = function () {
                            return new ClassList(this);
                        }
                        ;
                    // Most DOMException implementations don't allow calling DOMException's toString()
                    // on non-DOMExceptions. Error's toString() is sufficient here.
                    DOMEx[protoProp] = Error[protoProp];
                    classListProto.item = function (i) {
                        return this[i] || null;
                    };
                    classListProto.contains = function (token) {
                        return ~checkTokenAndGetIndex(this, token + "");
                    };
                    classListProto.add = function () {
                        var
                            tokens = arguments
                            , i = 0
                            , l = tokens.length
                            , token
                            , updated = false
                            ;
                        do {
                            token = tokens[i] + "";
                            if (!~checkTokenAndGetIndex(this, token)) {
                                this.push(token);
                                updated = true;
                            }
                        }
                        while (++i < l);

                        if (updated) {
                            this._updateClassName();
                        }
                    };
                    classListProto.remove = function () {
                        var
                            tokens = arguments
                            , i = 0
                            , l = tokens.length
                            , token
                            , updated = false
                            , index
                            ;
                        do {
                            token = tokens[i] + "";
                            index = checkTokenAndGetIndex(this, token);
                            while (~index) {
                                this.splice(index, 1);
                                updated = true;
                                index = checkTokenAndGetIndex(this, token);
                            }
                        }
                        while (++i < l);

                        if (updated) {
                            this._updateClassName();
                        }
                    };
                    classListProto.toggle = function (token, force) {
                        var
                            result = this.contains(token)
                            , method = result ?
                                force !== true && "remove"
                                :
                                force !== false && "add"
                            ;

                        if (method) {
                            this[method](token);
                        }

                        if (force === true || force === false) {
                            return force;
                        } else {
                            return !result;
                        }
                    };
                    classListProto.replace = function (token, replacement_token) {
                        var index = checkTokenAndGetIndex(token + "");
                        if (~index) {
                            this.splice(index, 1, replacement_token);
                            this._updateClassName();
                        }
                    }
                    classListProto.toString = function () {
                        return this.join(" ");
                    };

                    if (objCtr.defineProperty) {
                        var classListPropDesc = {
                            get: classListGetter
                            , enumerable: true
                            , configurable: true
                        };
                        try {
                            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                        } catch (ex) { // IE 8 doesn't support enumerable:true
                            // adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
                            // modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
                            if (ex.number === undefined || ex.number === -0x7FF5EC54) {
                                classListPropDesc.enumerable = false;
                                objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                            }
                        }
                    } else if (objCtr[protoProp].__defineGetter__) {
                        elemCtrProto.__defineGetter__(classListProp, classListGetter);
                    }

                }(self));

            }

            // There is full or partial native classList support, so just check if we need
            // to normalize the add/remove and toggle APIs.

            (function () {
                "use strict";

                var testElement = document.createElement("_");

                testElement.classList.add("c1", "c2");

                // Polyfill for IE 10/11 and Firefox <26, where classList.add and
                // classList.remove exist but support only one argument at a time.
                if (!testElement.classList.contains("c2")) {
                    var createMethod = function (method) {
                        var original = DOMTokenList.prototype[method];

                        DOMTokenList.prototype[method] = function (token) {
                            var i, len = arguments.length;

                            for (i = 0; i < len; i++) {
                                token = arguments[i];
                                original.call(this, token);
                            }
                        };
                    };
                    createMethod('add');
                    createMethod('remove');
                }

                testElement.classList.toggle("c3", false);

                // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
                // support the second argument.
                if (testElement.classList.contains("c3")) {
                    var _toggle = DOMTokenList.prototype.toggle;

                    DOMTokenList.prototype.toggle = function (token, force) {
                        if (1 in arguments && !this.contains(token) === !force) {
                            return force;
                        } else {
                            return _toggle.call(this, token);
                        }
                    };

                }

                // replace() polyfill
                if (!("replace" in document.createElement("_").classList)) {
                    DOMTokenList.prototype.replace = function (token, replacement_token) {
                        var
                            tokens = this.toString().split(" ")
                            , index = tokens.indexOf(token + "")
                            ;
                        if (~index) {
                            tokens = tokens.slice(index);
                            this.remove.apply(this, tokens);
                            this.add(replacement_token);
                            this.add.apply(this, tokens.slice(1));
                        }
                    }
                }

                testElement = null;
            }());

        }
    }
    // Function#bind
    if (!Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
            if (typeof this !== 'function') {
                // closest thing possible to the ECMAScript 5
                // internal IsCallable function
                throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
            }

            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function () { },
                fBound = function () {
                    // this instanceof fNOP === true时,说明返回的fBound被当做new的构造函数调用
                    return fToBind.apply(this instanceof fNOP
                        ? this
                        : oThis,
                        // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
                        aArgs.concat(Array.prototype.slice.call(arguments)));
                };

            // 维护原型关系
            if (this.prototype) {
                // Function.prototype doesn't have a prototype property
                fNOP.prototype = this.prototype;
            }
            // 下行的代码使fBound.prototype是fNOP的实例,因此
            // 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
            fBound.prototype = new fNOP();

            return fBound;
        };
    }
    // Array#indexOf
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement /*, fromIndex */) {
            if (this === void 0 || this === null) { throw TypeError(); }

            var t = Object(this);
            var len = t.length >>> 0;
            if (len === 0) { return -1; }

            var n = 0;
            if (arguments.length > 0) {
                n = Number(arguments[1]);
                if (isNaN(n)) {
                    n = 0;
                } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
                }
            }

            if (n >= len) { return -1; }

            var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);

            for (; k < len; k++) {
                if (k in t && t[k] === searchElement) {
                    return k;
                }
            }
            return -1;
        };
    }
    // Array#map
    if (!Array.prototype.map) {
        Array.prototype.map = function (callback, thisArg) {

            var T, A, k;

            if (this == null) {
                throw new TypeError(" this is null or not defined");
            }

            // 1. 将O赋值为调用map方法的数组.
            var O = Object(this);

            // 2.将len赋值为数组O的长度.
            var len = O.length >>> 0;

            // 3.如果callback不是函数,则抛出TypeError异常.
            if (Object.prototype.toString.call(callback) != "[object Function]") {
                throw new TypeError(callback + " is not a function");
            }

            // 4. 如果参数thisArg有值,则将T赋值为thisArg;否则T为undefined.
            if (thisArg) {
                T = thisArg;
            }

            // 5. 创建新数组A,长度为原数组O长度len
            A = new Array(len);

            // 6. 将k赋值为0
            k = 0;

            // 7. 当 k < len 时,执行循环.
            while (k < len) {

                var kValue, mappedValue;

                //遍历O,k为原数组索引
                if (k in O) {

                    //kValue为索引k对应的值.
                    kValue = O[k];

                    // 执行callback,this指向T,参数有三个.分别是kValue:值,k:索引,O:原数组.
                    mappedValue = callback.call(T, kValue, k, O);

                    // 返回值添加到新数组A中.
                    A[k] = mappedValue;
                }
                // k自增1
                k++;
            }

            // 8. 返回新数组A
            return A;
        };
    }
    // Array#forEach
    if (!Array.prototype.forEach) {

        Array.prototype.forEach = function (callback, thisArg) {

            var T, k;

            if (this == null) {
                throw new TypeError(' this is null or not defined');
            }

            // 1. Let O be the result of calling toObject() passing the
            // |this| value as the argument.
            var O = Object(this);

            // 2. Let lenValue be the result of calling the Get() internal
            // method of O with the argument "length".
            // 3. Let len be toUint32(lenValue).
            var len = O.length >>> 0;

            // 4. If isCallable(callback) is false, throw a TypeError exception. 
            // See: http://es5.github.com/#x9.11
            if (typeof callback !== "function") {
                throw new TypeError(callback + ' is not a function');
            }

            // 5. If thisArg was supplied, let T be thisArg; else let
            // T be undefined.
            if (arguments.length > 1) {
                T = thisArg;
            }

            // 6. Let k be 0
            k = 0;

            // 7. Repeat, while k < len
            while (k < len) {

                var kValue;

                // a. Let Pk be ToString(k).
                //    This is implicit for LHS operands of the in operator
                // b. Let kPresent be the result of calling the HasProperty
                //    internal method of O with argument Pk.
                //    This step can be combined with c
                // c. If kPresent is true, then
                if (k in O) {

                    // i. Let kValue be the result of calling the Get internal
                    // method of O with argument Pk.
                    kValue = O[k];

                    // ii. Call the Call internal method of callback with T as
                    // the this value and argument list containing kValue, k, and O.
                    callback.call(T, kValue, k, O);
                }
                // d. Increase k by 1.
                k++;
            }
            // 8. return undefined
        };
    }
    // Object.keys
    if (!Object.keys) {
        Object.keys = (function () {
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
                dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                ],
                dontEnumsLength = dontEnums.length;

            return function (obj) {
                if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');

                var result = [];

                for (var prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) result.push(prop);
                }

                if (hasDontEnumBug) {
                    for (var i = 0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
                    }
                }
                return result;
            }
        })()
    };
    // Object.assign
    if (typeof Object.assign != 'function') {
        // for IE 8
        if (isIE8) {
            Object.assign = $.extend;
            return;
        }
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
            value: function assign(target, varArgs) { // .length of function is 2
                'use strict';
                if (target == null) { // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var to = Object(target);

                for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments[index];

                    if (nextSource != null) { // Skip over if undefined or null
                        for (var nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }
                return to;
            },
            writable: true,
            configurable: true
        });
    }
}(window, jQuery));
