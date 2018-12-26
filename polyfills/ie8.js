/////////////////////// for in ///////////////////////////////////////
/**
 * 判断数组元素是否可以继续遍历  防止遍历出自己扩展的属性 e.g. "1,2,3,indexOf"
 * @param {Array} arr 
 * @param {number} i 
 */
function isCanForInArr(arr, i) {
    if (typeof arr.push === "function") {
        i = +i;
        if (+i !== i) { return false; }
    }
    return true;
}

////////////////////////  ployfills ///////////////////////////////////
// 实现 ECMA-262, Edition 5, 15.4.4.19
// 参考: http://es5.github.com/#x15.4.4.19
; (function (window, $, undefined) {
    // helpers
    var isIE = !!window.ActiveXObject || "ActiveXObject" in window;
    var UA = navigator.userAgent.toLocaleLowerCase();
    var testIE = UA.match(/msie ([\d\.]+)/);
    var isIE8 = false;
    testIE && (isIE8 = +testIE[1] === 8);
    // HTMLElement
    if (typeof HTMLElement !== "function") {
        window.HTMLElement = window.HTMLElement || Element;
    }
    // String#trim
    if (!String.prototype.trim) {
        String.prototype.trim = function () {
            return String(this).replace(/^\s+/, '').replace(/\s+$/, '');
        };
    }
    // Element@classList
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
    // Array#fill
    if (!Array.prototype.fill) {

    }
    // Array#indexOf
    if (!Array.prototype.indexOf) {

    }
    // Array#map
    if (!Array.prototype.map) {

    }
    // Array#forEach
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (fun /*, thisp */) {
            if (this === void 0 || this === null) { throw TypeError(); }

            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== "function") { throw TypeError(); }

            var thisp = arguments[1], i;
            for (i = 0; i < len; i++) {
                if (i in t) {
                    fun.call(thisp, t[i], i, t);
                }
            }
        };
    }
    ////////////////////////////////////////////////////////////////
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
}(window, jQuery));

//////////////////////////  helpers   /////////////////////////////////////
; (function (global) {
    var $isNaN = global.isNaN; // window.isNaN
    var abs = Math.abs,
        floor = Math.floor,
        max = Math.max,
        min = Math.min;

    function ToInteger(n) {
        n = Number(n);
        if ($isNaN(n)) return 0;
        if (n === 0 || n === Infinity || n === -Infinity) return n;
        return ((n < 0) ? -1 : 1) * floor(abs(n));
    }
    function ToLength(v) {
        var len = ToInteger(v);
        if (len <= 0) return 0;
        if (len === Infinity) return 0x20000000000000 - 1; // 2^53-1
        return min(len, 0x20000000000000 - 1); // 2^53-1
    }

    // like Array#some
    Array$some = function (that, fun /*, thisp */) {
        if (that === void 0 || that === null) { throw TypeError(); }

        var t = Object(that);
        var len = t.length >>> 0;
        if (typeof fun !== "function") { throw TypeError(); }

        var thisp = arguments[2], i;
        for (i = 0; i < len; i++) {
            if (i in t && fun.call(thisp, t[i], i, t)) {
                return true;
            }
        }
        return false;
    };
    // liek Array#fill
    Array$fill = function (that, value/*, start, end*/) {
        if (value === void 0) return that;

        var start = arguments[2],
            end = arguments[3];

        var o = that;
        var lenVal = o.length;
        var len = ToLength(lenVal);
        len = max(len, 0);
        var relativeStart = ToInteger(start);
        var k;
        if (relativeStart < 0)
            k = max((len + relativeStart), 0);
        else
            k = min(relativeStart, len);
        var relativeEnd;
        if (end === undefined)
            relativeEnd = len;
        else
            relativeEnd = ToInteger(end);
        var final;
        if (relativeEnd < 0)
            final = max((len + relativeEnd), 0);
        else
            final = min(relativeEnd, len);
        while (k < final) {
            var pk = String(k);
            o[pk] = value;
            k += 1;
        }
        return o;
    }
}(window));
