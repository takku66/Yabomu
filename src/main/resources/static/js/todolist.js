/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/es5-ext/global.js":
/*!****************************************!*\
  !*** ./node_modules/es5-ext/global.js ***!
  \****************************************/
/***/ ((module) => {

var naiveFallback = function () {
	if (typeof self === "object" && self) return self;
	if (typeof window === "object" && window) return window;
	throw new Error("Unable to resolve global `this`");
};

module.exports = (function () {
	if (this) return this;

	// Unexpected strict mode (may happen if e.g. bundled into ESM module)

	// Fallback to standard globalThis if available
	if (typeof globalThis === "object" && globalThis) return globalThis;

	// Thanks @mathiasbynens -> https://mathiasbynens.be/notes/globalthis
	// In all ES5+ engines global object inherits from Object.prototype
	// (if you approached one that doesn't please report)
	try {
		Object.defineProperty(Object.prototype, "__global__", {
			get: function () { return this; },
			configurable: true
		});
	} catch (error) {
		// Unfortunate case of updates to Object.prototype being restricted
		// via preventExtensions, seal or freeze
		return naiveFallback();
	}
	try {
		// Safari case (window.__global__ works, but __global__ does not)
		if (!__global__) return naiveFallback();
		return __global__;
	} finally {
		delete Object.prototype.__global__;
	}
})();


/***/ }),

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ "./node_modules/json3/lib/json3.js":
/*!*****************************************!*\
  !*** ./node_modules/json3/lib/json3.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;/*! JSON v3.3.2 | https://bestiejs.github.io/json3 | Copyright 2012-2015, Kit Cambridge, Benjamin Tan | http://kit.mit-license.org */
;(function () {
  // Detect the `define` function exposed by asynchronous module loaders. The
  // strict `define` check is necessary for compatibility with `r.js`.
  var isLoader =  true && __webpack_require__.amdO;

  // A set of types used to distinguish objects from primitives.
  var objectTypes = {
    "function": true,
    "object": true
  };

  // Detect the `exports` object exposed by CommonJS implementations.
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  // Use the `global` object exposed by Node (including Browserify via
  // `insert-module-globals`), Narwhal, and Ringo as the default context,
  // and the `window` object in browsers. Rhino exports a `global` function
  // instead.
  var root = objectTypes[typeof window] && window || this,
      freeGlobal = freeExports && objectTypes["object"] && module && !module.nodeType && typeof __webpack_require__.g == "object" && __webpack_require__.g;

  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
    root = freeGlobal;
  }

  // Public: Initializes JSON 3 using the given `context` object, attaching the
  // `stringify` and `parse` functions to the specified `exports` object.
  function runInContext(context, exports) {
    context || (context = root.Object());
    exports || (exports = root.Object());

    // Native constructor aliases.
    var Number = context.Number || root.Number,
        String = context.String || root.String,
        Object = context.Object || root.Object,
        Date = context.Date || root.Date,
        SyntaxError = context.SyntaxError || root.SyntaxError,
        TypeError = context.TypeError || root.TypeError,
        Math = context.Math || root.Math,
        nativeJSON = context.JSON || root.JSON;

    // Delegate to the native `stringify` and `parse` implementations.
    if (typeof nativeJSON == "object" && nativeJSON) {
      exports.stringify = nativeJSON.stringify;
      exports.parse = nativeJSON.parse;
    }

    // Convenience aliases.
    var objectProto = Object.prototype,
        getClass = objectProto.toString,
        isProperty = objectProto.hasOwnProperty,
        undefined;

    // Internal: Contains `try...catch` logic used by other functions.
    // This prevents other functions from being deoptimized.
    function attempt(func, errorFunc) {
      try {
        func();
      } catch (exception) {
        if (errorFunc) {
          errorFunc();
        }
      }
    }

    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
    var isExtended = new Date(-3509827334573292);
    attempt(function () {
      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
      // results for certain dates in Opera >= 10.53.
      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
    });

    // Internal: Determines whether the native `JSON.stringify` and `parse`
    // implementations are spec-compliant. Based on work by Ken Snyder.
    function has(name) {
      if (has[name] != null) {
        // Return cached feature test result.
        return has[name];
      }
      var isSupported;
      if (name == "bug-string-char-index") {
        // IE <= 7 doesn't support accessing string characters using square
        // bracket notation. IE 8 only supports this for primitives.
        isSupported = "a"[0] != "a";
      } else if (name == "json") {
        // Indicates whether both `JSON.stringify` and `JSON.parse` are
        // supported.
        isSupported = has("json-stringify") && has("date-serialization") && has("json-parse");
      } else if (name == "date-serialization") {
        // Indicates whether `Date`s can be serialized accurately by `JSON.stringify`.
        isSupported = has("json-stringify") && isExtended;
        if (isSupported) {
          var stringify = exports.stringify;
          attempt(function () {
            isSupported =
              // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
              // serialize extended years.
              stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
              // The milliseconds are optional in ES 5, but required in 5.1.
              stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
              // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
              // four-digit years instead of six-digit years. Credits: @Yaffle.
              stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
              // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
              // values less than 1000. Credits: @Yaffle.
              stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
          });
        }
      } else {
        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
        // Test `JSON.stringify`.
        if (name == "json-stringify") {
          var stringify = exports.stringify, stringifySupported = typeof stringify == "function";
          if (stringifySupported) {
            // A test function object with a custom `toJSON` method.
            (value = function () {
              return 1;
            }).toJSON = value;
            attempt(function () {
              stringifySupported =
                // Firefox 3.1b1 and b2 serialize string, number, and boolean
                // primitives as object literals.
                stringify(0) === "0" &&
                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                // literals.
                stringify(new Number()) === "0" &&
                stringify(new String()) == '""' &&
                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                // does not define a canonical JSON representation (this applies to
                // objects with `toJSON` properties as well, *unless* they are nested
                // within an object or array).
                stringify(getClass) === undefined &&
                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                // FF 3.1b3 pass this test.
                stringify(undefined) === undefined &&
                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                // respectively, if the value is omitted entirely.
                stringify() === undefined &&
                // FF 3.1b1, 2 throw an error if the given value is not a number,
                // string, array, object, Boolean, or `null` literal. This applies to
                // objects with custom `toJSON` methods as well, unless they are nested
                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                // methods entirely.
                stringify(value) === "1" &&
                stringify([value]) == "[1]" &&
                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                // `"[null]"`.
                stringify([undefined]) == "[null]" &&
                // YUI 3.0.0b1 fails to serialize `null` literals.
                stringify(null) == "null" &&
                // FF 3.1b1, 2 halts serialization if an array contains a function:
                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                // elides non-JSON values from objects and arrays, unless they
                // define custom `toJSON` methods.
                stringify([undefined, getClass, null]) == "[null,null,null]" &&
                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                // where character escape codes are expected (e.g., `\b` => `\u0008`).
                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                stringify(null, value) === "1" &&
                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]";
            }, function () {
              stringifySupported = false;
            });
          }
          isSupported = stringifySupported;
        }
        // Test `JSON.parse`.
        if (name == "json-parse") {
          var parse = exports.parse, parseSupported;
          if (typeof parse == "function") {
            attempt(function () {
              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
              // Conforming implementations should also coerce the initial argument to
              // a string prior to parsing.
              if (parse("0") === 0 && !parse(false)) {
                // Simple parsing test.
                value = parse(serialized);
                parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                if (parseSupported) {
                  attempt(function () {
                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                    parseSupported = !parse('"\t"');
                  });
                  if (parseSupported) {
                    attempt(function () {
                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                      // certain octal literals.
                      parseSupported = parse("01") !== 1;
                    });
                  }
                  if (parseSupported) {
                    attempt(function () {
                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                      // points. These environments, along with FF 3.1b1 and 2,
                      // also allow trailing commas in JSON objects and arrays.
                      parseSupported = parse("1.") !== 1;
                    });
                  }
                }
              }
            }, function () {
              parseSupported = false;
            });
          }
          isSupported = parseSupported;
        }
      }
      return has[name] = !!isSupported;
    }
    has["bug-string-char-index"] = has["date-serialization"] = has["json"] = has["json-stringify"] = has["json-parse"] = null;

    if (!has("json")) {
      // Common `[[Class]]` name aliases.
      var functionClass = "[object Function]",
          dateClass = "[object Date]",
          numberClass = "[object Number]",
          stringClass = "[object String]",
          arrayClass = "[object Array]",
          booleanClass = "[object Boolean]";

      // Detect incomplete support for accessing string characters by index.
      var charIndexBuggy = has("bug-string-char-index");

      // Internal: Normalizes the `for...in` iteration algorithm across
      // environments. Each enumerated key is yielded to a `callback` function.
      var forOwn = function (object, callback) {
        var size = 0, Properties, dontEnums, property;

        // Tests for bugs in the current environment's `for...in` algorithm. The
        // `valueOf` property inherits the non-enumerable flag from
        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
        (Properties = function () {
          this.valueOf = 0;
        }).prototype.valueOf = 0;

        // Iterate over a new instance of the `Properties` class.
        dontEnums = new Properties();
        for (property in dontEnums) {
          // Ignore all properties inherited from `Object.prototype`.
          if (isProperty.call(dontEnums, property)) {
            size++;
          }
        }
        Properties = dontEnums = null;

        // Normalize the iteration algorithm.
        if (!size) {
          // A list of non-enumerable properties inherited from `Object.prototype`.
          dontEnums = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
          // properties.
          forOwn = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, length;
            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
            for (property in object) {
              // Gecko <= 1.0 enumerates the `prototype` property of functions under
              // certain conditions; IE does not.
              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                callback(property);
              }
            }
            // Manually invoke the callback for each non-enumerable property.
            for (length = dontEnums.length; property = dontEnums[--length];) {
              if (hasProperty.call(object, property)) {
                callback(property);
              }
            }
          };
        } else {
          // No bugs detected; use the standard `for...in` algorithm.
          forOwn = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
            for (property in object) {
              if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                callback(property);
              }
            }
            // Manually invoke the callback for the `constructor` property due to
            // cross-environment inconsistencies.
            if (isConstructor || isProperty.call(object, (property = "constructor"))) {
              callback(property);
            }
          };
        }
        return forOwn(object, callback);
      };

      // Public: Serializes a JavaScript `value` as a JSON string. The optional
      // `filter` argument may specify either a function that alters how object and
      // array members are serialized, or an array of strings and numbers that
      // indicates which properties should be serialized. The optional `width`
      // argument may be either a string or number that specifies the indentation
      // level of the output.
      if (!has("json-stringify") && !has("date-serialization")) {
        // Internal: A map of control characters and their escaped equivalents.
        var Escapes = {
          92: "\\\\",
          34: '\\"',
          8: "\\b",
          12: "\\f",
          10: "\\n",
          13: "\\r",
          9: "\\t"
        };

        // Internal: Converts `value` into a zero-padded string such that its
        // length is at least equal to `width`. The `width` must be <= 6.
        var leadingZeroes = "000000";
        var toPaddedString = function (width, value) {
          // The `|| 0` expression is necessary to work around a bug in
          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
          return (leadingZeroes + (value || 0)).slice(-width);
        };

        // Internal: Serializes a date object.
        var serializeDate = function (value) {
          var getData, year, month, date, time, hours, minutes, seconds, milliseconds;
          // Define additional utility methods if the `Date` methods are buggy.
          if (!isExtended) {
            var floor = Math.floor;
            // A mapping between the months of the year and the number of days between
            // January 1st and the first of the respective month.
            var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
            // Internal: Calculates the number of days between the Unix epoch and the
            // first day of the given month.
            var getDay = function (year, month) {
              return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
            };
            getData = function (value) {
              // Manually compute the year, month, date, hours, minutes,
              // seconds, and milliseconds if the `getUTC*` methods are
              // buggy. Adapted from @Yaffle's `date-shim` project.
              date = floor(value / 864e5);
              for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
              for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
              date = 1 + date - getDay(year, month);
              // The `time` value specifies the time within the day (see ES
              // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
              // to compute `A modulo B`, as the `%` operator does not
              // correspond to the `modulo` operation for negative numbers.
              time = (value % 864e5 + 864e5) % 864e5;
              // The hours, minutes, seconds, and milliseconds are obtained by
              // decomposing the time within the day. See section 15.9.1.10.
              hours = floor(time / 36e5) % 24;
              minutes = floor(time / 6e4) % 60;
              seconds = floor(time / 1e3) % 60;
              milliseconds = time % 1e3;
            };
          } else {
            getData = function (value) {
              year = value.getUTCFullYear();
              month = value.getUTCMonth();
              date = value.getUTCDate();
              hours = value.getUTCHours();
              minutes = value.getUTCMinutes();
              seconds = value.getUTCSeconds();
              milliseconds = value.getUTCMilliseconds();
            };
          }
          serializeDate = function (value) {
            if (value > -1 / 0 && value < 1 / 0) {
              // Dates are serialized according to the `Date#toJSON` method
              // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
              // for the ISO 8601 date time string format.
              getData(value);
              // Serialize extended years correctly.
              value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
              "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
              // Months, dates, hours, minutes, and seconds should have two
              // digits; milliseconds should have three.
              "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
              // Milliseconds are optional in ES 5.0, but required in 5.1.
              "." + toPaddedString(3, milliseconds) + "Z";
              year = month = date = hours = minutes = seconds = milliseconds = null;
            } else {
              value = null;
            }
            return value;
          };
          return serializeDate(value);
        };

        // For environments with `JSON.stringify` but buggy date serialization,
        // we override the native `Date#toJSON` implementation with a
        // spec-compliant one.
        if (has("json-stringify") && !has("date-serialization")) {
          // Internal: the `Date#toJSON` implementation used to override the native one.
          function dateToJSON (key) {
            return serializeDate(this);
          }

          // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
          var nativeStringify = exports.stringify;
          exports.stringify = function (source, filter, width) {
            var nativeToJSON = Date.prototype.toJSON;
            Date.prototype.toJSON = dateToJSON;
            var result = nativeStringify(source, filter, width);
            Date.prototype.toJSON = nativeToJSON;
            return result;
          }
        } else {
          // Internal: Double-quotes a string `value`, replacing all ASCII control
          // characters (characters with code unit values between 0 and 31) with
          // their escaped equivalents. This is an implementation of the
          // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
          var unicodePrefix = "\\u00";
          var escapeChar = function (character) {
            var charCode = character.charCodeAt(0), escaped = Escapes[charCode];
            if (escaped) {
              return escaped;
            }
            return unicodePrefix + toPaddedString(2, charCode.toString(16));
          };
          var reEscape = /[\x00-\x1f\x22\x5c]/g;
          var quote = function (value) {
            reEscape.lastIndex = 0;
            return '"' +
              (
                reEscape.test(value)
                  ? value.replace(reEscape, escapeChar)
                  : value
              ) +
              '"';
          };

          // Internal: Recursively serializes an object. Implements the
          // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
          var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
            var value, type, className, results, element, index, length, prefix, result;
            attempt(function () {
              // Necessary for host object support.
              value = object[property];
            });
            if (typeof value == "object" && value) {
              if (value.getUTCFullYear && getClass.call(value) == dateClass && value.toJSON === Date.prototype.toJSON) {
                value = serializeDate(value);
              } else if (typeof value.toJSON == "function") {
                value = value.toJSON(property);
              }
            }
            if (callback) {
              // If a replacement function was provided, call it to obtain the value
              // for serialization.
              value = callback.call(object, property, value);
            }
            // Exit early if value is `undefined` or `null`.
            if (value == undefined) {
              return value === undefined ? value : "null";
            }
            type = typeof value;
            // Only call `getClass` if the value is an object.
            if (type == "object") {
              className = getClass.call(value);
            }
            switch (className || type) {
              case "boolean":
              case booleanClass:
                // Booleans are represented literally.
                return "" + value;
              case "number":
              case numberClass:
                // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
                // `"null"`.
                return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
              case "string":
              case stringClass:
                // Strings are double-quoted and escaped.
                return quote("" + value);
            }
            // Recursively serialize objects and arrays.
            if (typeof value == "object") {
              // Check for cyclic structures. This is a linear search; performance
              // is inversely proportional to the number of unique nested objects.
              for (length = stack.length; length--;) {
                if (stack[length] === value) {
                  // Cyclic structures cannot be serialized by `JSON.stringify`.
                  throw TypeError();
                }
              }
              // Add the object to the stack of traversed objects.
              stack.push(value);
              results = [];
              // Save the current indentation level and indent one additional level.
              prefix = indentation;
              indentation += whitespace;
              if (className == arrayClass) {
                // Recursively serialize array elements.
                for (index = 0, length = value.length; index < length; index++) {
                  element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                  results.push(element === undefined ? "null" : element);
                }
                result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
              } else {
                // Recursively serialize object members. Members are selected from
                // either a user-specified list of property names, or the object
                // itself.
                forOwn(properties || value, function (property) {
                  var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                  if (element !== undefined) {
                    // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                    // is not the empty string, let `member` {quote(property) + ":"}
                    // be the concatenation of `member` and the `space` character."
                    // The "`space` character" refers to the literal space
                    // character, not the `space` {width} argument provided to
                    // `JSON.stringify`.
                    results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                  }
                });
                result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
              }
              // Remove the object from the traversed object stack.
              stack.pop();
              return result;
            }
          };

          // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
          exports.stringify = function (source, filter, width) {
            var whitespace, callback, properties, className;
            if (objectTypes[typeof filter] && filter) {
              className = getClass.call(filter);
              if (className == functionClass) {
                callback = filter;
              } else if (className == arrayClass) {
                // Convert the property names array into a makeshift set.
                properties = {};
                for (var index = 0, length = filter.length, value; index < length;) {
                  value = filter[index++];
                  className = getClass.call(value);
                  if (className == "[object String]" || className == "[object Number]") {
                    properties[value] = 1;
                  }
                }
              }
            }
            if (width) {
              className = getClass.call(width);
              if (className == numberClass) {
                // Convert the `width` to an integer and create a string containing
                // `width` number of space characters.
                if ((width -= width % 1) > 0) {
                  if (width > 10) {
                    width = 10;
                  }
                  for (whitespace = ""; whitespace.length < width;) {
                    whitespace += " ";
                  }
                }
              } else if (className == stringClass) {
                whitespace = width.length <= 10 ? width : width.slice(0, 10);
              }
            }
            // Opera <= 7.54u2 discards the values associated with empty string keys
            // (`""`) only if they are used directly within an object member list
            // (e.g., `!("" in { "": 1})`).
            return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
          };
        }
      }

      // Public: Parses a JSON source string.
      if (!has("json-parse")) {
        var fromCharCode = String.fromCharCode;

        // Internal: A map of escaped control characters and their unescaped
        // equivalents.
        var Unescapes = {
          92: "\\",
          34: '"',
          47: "/",
          98: "\b",
          116: "\t",
          110: "\n",
          102: "\f",
          114: "\r"
        };

        // Internal: Stores the parser state.
        var Index, Source;

        // Internal: Resets the parser state and throws a `SyntaxError`.
        var abort = function () {
          Index = Source = null;
          throw SyntaxError();
        };

        // Internal: Returns the next token, or `"$"` if the parser has reached
        // the end of the source string. A token may be a string, number, `null`
        // literal, or Boolean literal.
        var lex = function () {
          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
          while (Index < length) {
            charCode = source.charCodeAt(Index);
            switch (charCode) {
              case 9: case 10: case 13: case 32:
                // Skip whitespace tokens, including tabs, carriage returns, line
                // feeds, and space characters.
                Index++;
                break;
              case 123: case 125: case 91: case 93: case 58: case 44:
                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                // the current position.
                value = charIndexBuggy ? source.charAt(Index) : source[Index];
                Index++;
                return value;
              case 34:
                // `"` delimits a JSON string; advance to the next character and
                // begin parsing the string. String tokens are prefixed with the
                // sentinel `@` character to distinguish them from punctuators and
                // end-of-string tokens.
                for (value = "@", Index++; Index < length;) {
                  charCode = source.charCodeAt(Index);
                  if (charCode < 32) {
                    // Unescaped ASCII control characters (those with a code unit
                    // less than the space character) are not permitted.
                    abort();
                  } else if (charCode == 92) {
                    // A reverse solidus (`\`) marks the beginning of an escaped
                    // control character (including `"`, `\`, and `/`) or Unicode
                    // escape sequence.
                    charCode = source.charCodeAt(++Index);
                    switch (charCode) {
                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
                        // Revive escaped control characters.
                        value += Unescapes[charCode];
                        Index++;
                        break;
                      case 117:
                        // `\u` marks the beginning of a Unicode escape sequence.
                        // Advance to the first character and validate the
                        // four-digit code point.
                        begin = ++Index;
                        for (position = Index + 4; Index < position; Index++) {
                          charCode = source.charCodeAt(Index);
                          // A valid sequence comprises four hexdigits (case-
                          // insensitive) that form a single hexadecimal value.
                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                            // Invalid Unicode escape sequence.
                            abort();
                          }
                        }
                        // Revive the escaped character.
                        value += fromCharCode("0x" + source.slice(begin, Index));
                        break;
                      default:
                        // Invalid escape sequence.
                        abort();
                    }
                  } else {
                    if (charCode == 34) {
                      // An unescaped double-quote character marks the end of the
                      // string.
                      break;
                    }
                    charCode = source.charCodeAt(Index);
                    begin = Index;
                    // Optimize for the common case where a string is valid.
                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
                      charCode = source.charCodeAt(++Index);
                    }
                    // Append the string as-is.
                    value += source.slice(begin, Index);
                  }
                }
                if (source.charCodeAt(Index) == 34) {
                  // Advance to the next character and return the revived string.
                  Index++;
                  return value;
                }
                // Unterminated string.
                abort();
              default:
                // Parse numbers and literals.
                begin = Index;
                // Advance past the negative sign, if one is specified.
                if (charCode == 45) {
                  isSigned = true;
                  charCode = source.charCodeAt(++Index);
                }
                // Parse an integer or floating-point value.
                if (charCode >= 48 && charCode <= 57) {
                  // Leading zeroes are interpreted as octal literals.
                  if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                    // Illegal octal literal.
                    abort();
                  }
                  isSigned = false;
                  // Parse the integer component.
                  for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
                  // Floats cannot contain a leading decimal point; however, this
                  // case is already accounted for by the parser.
                  if (source.charCodeAt(Index) == 46) {
                    position = ++Index;
                    // Parse the decimal component.
                    for (; position < length; position++) {
                      charCode = source.charCodeAt(position);
                      if (charCode < 48 || charCode > 57) {
                        break;
                      }
                    }
                    if (position == Index) {
                      // Illegal trailing decimal.
                      abort();
                    }
                    Index = position;
                  }
                  // Parse exponents. The `e` denoting the exponent is
                  // case-insensitive.
                  charCode = source.charCodeAt(Index);
                  if (charCode == 101 || charCode == 69) {
                    charCode = source.charCodeAt(++Index);
                    // Skip past the sign following the exponent, if one is
                    // specified.
                    if (charCode == 43 || charCode == 45) {
                      Index++;
                    }
                    // Parse the exponential component.
                    for (position = Index; position < length; position++) {
                      charCode = source.charCodeAt(position);
                      if (charCode < 48 || charCode > 57) {
                        break;
                      }
                    }
                    if (position == Index) {
                      // Illegal empty exponent.
                      abort();
                    }
                    Index = position;
                  }
                  // Coerce the parsed value to a JavaScript number.
                  return +source.slice(begin, Index);
                }
                // A negative sign may only precede numbers.
                if (isSigned) {
                  abort();
                }
                // `true`, `false`, and `null` literals.
                var temp = source.slice(Index, Index + 4);
                if (temp == "true") {
                  Index += 4;
                  return true;
                } else if (temp == "fals" && source.charCodeAt(Index + 4 ) == 101) {
                  Index += 5;
                  return false;
                } else if (temp == "null") {
                  Index += 4;
                  return null;
                }
                // Unrecognized token.
                abort();
            }
          }
          // Return the sentinel `$` character if the parser has reached the end
          // of the source string.
          return "$";
        };

        // Internal: Parses a JSON `value` token.
        var get = function (value) {
          var results, hasMembers;
          if (value == "$") {
            // Unexpected end of input.
            abort();
          }
          if (typeof value == "string") {
            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
              // Remove the sentinel `@` character.
              return value.slice(1);
            }
            // Parse object and array literals.
            if (value == "[") {
              // Parses a JSON array, returning a new JavaScript array.
              results = [];
              for (;;) {
                value = lex();
                // A closing square bracket marks the end of the array literal.
                if (value == "]") {
                  break;
                }
                // If the array literal contains elements, the current token
                // should be a comma separating the previous element from the
                // next.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "]") {
                      // Unexpected trailing `,` in array literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each array element.
                    abort();
                  }
                } else {
                  hasMembers = true;
                }
                // Elisions and leading commas are not permitted.
                if (value == ",") {
                  abort();
                }
                results.push(get(value));
              }
              return results;
            } else if (value == "{") {
              // Parses a JSON object, returning a new JavaScript object.
              results = {};
              for (;;) {
                value = lex();
                // A closing curly brace marks the end of the object literal.
                if (value == "}") {
                  break;
                }
                // If the object literal contains members, the current token
                // should be a comma separator.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "}") {
                      // Unexpected trailing `,` in object literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each object member.
                    abort();
                  }
                } else {
                  hasMembers = true;
                }
                // Leading commas are not permitted, object property names must be
                // double-quoted strings, and a `:` must separate each property
                // name and value.
                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                  abort();
                }
                results[value.slice(1)] = get(lex());
              }
              return results;
            }
            // Unexpected token encountered.
            abort();
          }
          return value;
        };

        // Internal: Updates a traversed object member.
        var update = function (source, property, callback) {
          var element = walk(source, property, callback);
          if (element === undefined) {
            delete source[property];
          } else {
            source[property] = element;
          }
        };

        // Internal: Recursively traverses a parsed JSON object, invoking the
        // `callback` function for each value. This is an implementation of the
        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
        var walk = function (source, property, callback) {
          var value = source[property], length;
          if (typeof value == "object" && value) {
            // `forOwn` can't be used to traverse an array in Opera <= 8.54
            // because its `Object#hasOwnProperty` implementation returns `false`
            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
            if (getClass.call(value) == arrayClass) {
              for (length = value.length; length--;) {
                update(getClass, forOwn, value, length, callback);
              }
            } else {
              forOwn(value, function (property) {
                update(value, property, callback);
              });
            }
          }
          return callback.call(source, property, value);
        };

        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
        exports.parse = function (source, callback) {
          var result, value;
          Index = 0;
          Source = "" + source;
          result = get(lex());
          // If a JSON string contains multiple tokens, it is invalid.
          if (lex() != "$") {
            abort();
          }
          // Reset the parser state.
          Index = Source = null;
          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
        };
      }
    }

    exports.runInContext = runInContext;
    return exports;
  }

  if (freeExports && !isLoader) {
    // Export for CommonJS environments.
    runInContext(root, freeExports);
  } else {
    // Export for web browsers and JavaScript engines.
    var nativeJSON = root.JSON,
        previousJSON = root.JSON3,
        isRestored = false;

    var JSON3 = runInContext(root, (root.JSON3 = {
      // Public: Restores the original value of the global `JSON` object and
      // returns a reference to the `JSON3` object.
      "noConflict": function () {
        if (!isRestored) {
          isRestored = true;
          root.JSON = nativeJSON;
          root.JSON3 = previousJSON;
          nativeJSON = previousJSON = null;
        }
        return JSON3;
      }
    }));

    root.JSON = {
      "parse": JSON3.parse,
      "stringify": JSON3.stringify
    };
  }

  // Export for asynchronous module loaders.
  if (isLoader) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return JSON3;
    }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}).call(this);


/***/ }),

/***/ "./node_modules/net/index.js":
/*!***********************************!*\
  !*** ./node_modules/net/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/*
Copyright 2013 Sleepless Software Inc. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE. 
*/

// yes, I know this seems stupid, but I have my reasons.

var net = __webpack_require__(/*! net */ "./node_modules/net/index.js")
for(k in net)
	__webpack_require__.g[k] = net[k]



/***/ }),

/***/ "./node_modules/querystringify/index.js":
/*!**********************************************!*\
  !*** ./node_modules/querystringify/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


var has = Object.prototype.hasOwnProperty
  , undef;

/**
 * Decode a URI encoded string.
 *
 * @param {String} input The URI encoded string.
 * @returns {String|Null} The decoded string.
 * @api private
 */
function decode(input) {
  try {
    return decodeURIComponent(input.replace(/\+/g, ' '));
  } catch (e) {
    return null;
  }
}

/**
 * Attempts to encode a given input.
 *
 * @param {String} input The string that needs to be encoded.
 * @returns {String|Null} The encoded string.
 * @api private
 */
function encode(input) {
  try {
    return encodeURIComponent(input);
  } catch (e) {
    return null;
  }
}

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function querystring(query) {
  var parser = /([^=?#&]+)=?([^&]*)/g
    , result = {}
    , part;

  while (part = parser.exec(query)) {
    var key = decode(part[1])
      , value = decode(part[2]);

    //
    // Prevent overriding of existing properties. This ensures that build-in
    // methods like `toString` or __proto__ are not overriden by malicious
    // querystrings.
    //
    // In the case if failed decoding, we want to omit the key/value pairs
    // from the result.
    //
    if (key === null || value === null || key in result) continue;
    result[key] = value;
  }

  return result;
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function querystringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = []
    , value
    , key;

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?';

  for (key in obj) {
    if (has.call(obj, key)) {
      value = obj[key];

      //
      // Edge cases where we actually want to encode the value to an empty
      // string instead of the stringified value.
      //
      if (!value && (value === null || value === undef || isNaN(value))) {
        value = '';
      }

      key = encode(key);
      value = encode(value);

      //
      // If we failed to encode the strings, we should bail out as we don't
      // want to add invalid strings to the query.
      //
      if (key === null || value === null) continue;
      pairs.push(key +'='+ value);
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

//
// Expose the module.
//
exports.stringify = querystringify;
exports.parse = querystring;


/***/ }),

/***/ "./node_modules/requires-port/index.js":
/*!*********************************************!*\
  !*** ./node_modules/requires-port/index.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";


/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */
module.exports = function required(port, protocol) {
  protocol = protocol.split(':')[0];
  port = +port;

  if (!port) return false;

  switch (protocol) {
    case 'http':
    case 'ws':
    return port !== 80;

    case 'https':
    case 'wss':
    return port !== 443;

    case 'ftp':
    return port !== 21;

    case 'gopher':
    return port !== 70;

    case 'file':
    return false;
  }

  return port !== 0;
};


/***/ }),

/***/ "./node_modules/sockjs-client/lib/entry.js":
/*!*************************************************!*\
  !*** ./node_modules/sockjs-client/lib/entry.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var transportList = __webpack_require__(/*! ./transport-list */ "./node_modules/sockjs-client/lib/transport-list.js");

module.exports = __webpack_require__(/*! ./main */ "./node_modules/sockjs-client/lib/main.js")(transportList);

// TODO can't get rid of this until all servers do
if ('_sockjs_onload' in __webpack_require__.g) {
  setTimeout(__webpack_require__.g._sockjs_onload, 1);
}


/***/ }),

/***/ "./node_modules/sockjs-client/lib/event/close.js":
/*!*******************************************************!*\
  !*** ./node_modules/sockjs-client/lib/event/close.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , Event = __webpack_require__(/*! ./event */ "./node_modules/sockjs-client/lib/event/event.js")
  ;

function CloseEvent() {
  Event.call(this);
  this.initEvent('close', false, false);
  this.wasClean = false;
  this.code = 0;
  this.reason = '';
}

inherits(CloseEvent, Event);

module.exports = CloseEvent;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/event/emitter.js":
/*!*********************************************************!*\
  !*** ./node_modules/sockjs-client/lib/event/emitter.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , EventTarget = __webpack_require__(/*! ./eventtarget */ "./node_modules/sockjs-client/lib/event/eventtarget.js")
  ;

function EventEmitter() {
  EventTarget.call(this);
}

inherits(EventEmitter, EventTarget);

EventEmitter.prototype.removeAllListeners = function(type) {
  if (type) {
    delete this._listeners[type];
  } else {
    this._listeners = {};
  }
};

EventEmitter.prototype.once = function(type, listener) {
  var self = this
    , fired = false;

  function g() {
    self.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  this.on(type, g);
};

EventEmitter.prototype.emit = function() {
  var type = arguments[0];
  var listeners = this._listeners[type];
  if (!listeners) {
    return;
  }
  // equivalent of Array.prototype.slice.call(arguments, 1);
  var l = arguments.length;
  var args = new Array(l - 1);
  for (var ai = 1; ai < l; ai++) {
    args[ai - 1] = arguments[ai];
  }
  for (var i = 0; i < listeners.length; i++) {
    listeners[i].apply(this, args);
  }
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener = EventTarget.prototype.addEventListener;
EventEmitter.prototype.removeListener = EventTarget.prototype.removeEventListener;

module.exports.EventEmitter = EventEmitter;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/event/event.js":
/*!*******************************************************!*\
  !*** ./node_modules/sockjs-client/lib/event/event.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";


function Event(eventType) {
  this.type = eventType;
}

Event.prototype.initEvent = function(eventType, canBubble, cancelable) {
  this.type = eventType;
  this.bubbles = canBubble;
  this.cancelable = cancelable;
  this.timeStamp = +new Date();
  return this;
};

Event.prototype.stopPropagation = function() {};
Event.prototype.preventDefault = function() {};

Event.CAPTURING_PHASE = 1;
Event.AT_TARGET = 2;
Event.BUBBLING_PHASE = 3;

module.exports = Event;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/event/eventtarget.js":
/*!*************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/event/eventtarget.js ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";


/* Simplified implementation of DOM2 EventTarget.
 *   http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
 */

function EventTarget() {
  this._listeners = {};
}

EventTarget.prototype.addEventListener = function(eventType, listener) {
  if (!(eventType in this._listeners)) {
    this._listeners[eventType] = [];
  }
  var arr = this._listeners[eventType];
  // #4
  if (arr.indexOf(listener) === -1) {
    // Make a copy so as not to interfere with a current dispatchEvent.
    arr = arr.concat([listener]);
  }
  this._listeners[eventType] = arr;
};

EventTarget.prototype.removeEventListener = function(eventType, listener) {
  var arr = this._listeners[eventType];
  if (!arr) {
    return;
  }
  var idx = arr.indexOf(listener);
  if (idx !== -1) {
    if (arr.length > 1) {
      // Make a copy so as not to interfere with a current dispatchEvent.
      this._listeners[eventType] = arr.slice(0, idx).concat(arr.slice(idx + 1));
    } else {
      delete this._listeners[eventType];
    }
    return;
  }
};

EventTarget.prototype.dispatchEvent = function() {
  var event = arguments[0];
  var t = event.type;
  // equivalent of Array.prototype.slice.call(arguments, 0);
  var args = arguments.length === 1 ? [event] : Array.apply(null, arguments);
  // TODO: This doesn't match the real behavior; per spec, onfoo get
  // their place in line from the /first/ time they're set from
  // non-null. Although WebKit bumps it to the end every time it's
  // set.
  if (this['on' + t]) {
    this['on' + t].apply(this, args);
  }
  if (t in this._listeners) {
    // Grab a reference to the listeners list. removeEventListener may alter the list.
    var listeners = this._listeners[t];
    for (var i = 0; i < listeners.length; i++) {
      listeners[i].apply(this, args);
    }
  }
};

module.exports = EventTarget;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/event/trans-message.js":
/*!***************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/event/trans-message.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , Event = __webpack_require__(/*! ./event */ "./node_modules/sockjs-client/lib/event/event.js")
  ;

function TransportMessageEvent(data) {
  Event.call(this);
  this.initEvent('message', false, false);
  this.data = data;
}

inherits(TransportMessageEvent, Event);

module.exports = TransportMessageEvent;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/facade.js":
/*!**************************************************!*\
  !*** ./node_modules/sockjs-client/lib/facade.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var JSON3 = __webpack_require__(/*! json3 */ "./node_modules/json3/lib/json3.js")
  , iframeUtils = __webpack_require__(/*! ./utils/iframe */ "./node_modules/sockjs-client/lib/utils/iframe.js")
  ;

function FacadeJS(transport) {
  this._transport = transport;
  transport.on('message', this._transportMessage.bind(this));
  transport.on('close', this._transportClose.bind(this));
}

FacadeJS.prototype._transportClose = function(code, reason) {
  iframeUtils.postMessage('c', JSON3.stringify([code, reason]));
};
FacadeJS.prototype._transportMessage = function(frame) {
  iframeUtils.postMessage('t', frame);
};
FacadeJS.prototype._send = function(data) {
  this._transport.send(data);
};
FacadeJS.prototype._close = function() {
  this._transport.close();
  this._transport.removeAllListeners();
};

module.exports = FacadeJS;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/iframe-bootstrap.js":
/*!************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/iframe-bootstrap.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var urlUtils = __webpack_require__(/*! ./utils/url */ "./node_modules/sockjs-client/lib/utils/url.js")
  , eventUtils = __webpack_require__(/*! ./utils/event */ "./node_modules/sockjs-client/lib/utils/event.js")
  , JSON3 = __webpack_require__(/*! json3 */ "./node_modules/json3/lib/json3.js")
  , FacadeJS = __webpack_require__(/*! ./facade */ "./node_modules/sockjs-client/lib/facade.js")
  , InfoIframeReceiver = __webpack_require__(/*! ./info-iframe-receiver */ "./node_modules/sockjs-client/lib/info-iframe-receiver.js")
  , iframeUtils = __webpack_require__(/*! ./utils/iframe */ "./node_modules/sockjs-client/lib/utils/iframe.js")
  , loc = __webpack_require__(/*! ./location */ "./node_modules/sockjs-client/lib/location.js")
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(/*! debug */ "./node_modules/sockjs-client/node_modules/debug/src/browser.js")('sockjs-client:iframe-bootstrap');
}

module.exports = function(SockJS, availableTransports) {
  var transportMap = {};
  availableTransports.forEach(function(at) {
    if (at.facadeTransport) {
      transportMap[at.facadeTransport.transportName] = at.facadeTransport;
    }
  });

  // hard-coded for the info iframe
  // TODO see if we can make this more dynamic
  transportMap[InfoIframeReceiver.transportName] = InfoIframeReceiver;
  var parentOrigin;

  /* eslint-disable camelcase */
  SockJS.bootstrap_iframe = function() {
    /* eslint-enable camelcase */
    var facade;
    iframeUtils.currentWindowId = loc.hash.slice(1);
    var onMessage = function(e) {
      if (e.source !== parent) {
        return;
      }
      if (typeof parentOrigin === 'undefined') {
        parentOrigin = e.origin;
      }
      if (e.origin !== parentOrigin) {
        return;
      }

      var iframeMessage;
      try {
        iframeMessage = JSON3.parse(e.data);
      } catch (ignored) {
        debug('bad json', e.data);
        return;
      }

      if (iframeMessage.windowId !== iframeUtils.currentWindowId) {
        return;
      }
      switch (iframeMessage.type) {
      case 's':
        var p;
        try {
          p = JSON3.parse(iframeMessage.data);
        } catch (ignored) {
          debug('bad json', iframeMessage.data);
          break;
        }
        var version = p[0];
        var transport = p[1];
        var transUrl = p[2];
        var baseUrl = p[3];
        debug(version, transport, transUrl, baseUrl);
        // change this to semver logic
        if (version !== SockJS.version) {
          throw new Error('Incompatible SockJS! Main site uses:' +
                    ' "' + version + '", the iframe:' +
                    ' "' + SockJS.version + '".');
        }

        if (!urlUtils.isOriginEqual(transUrl, loc.href) ||
            !urlUtils.isOriginEqual(baseUrl, loc.href)) {
          throw new Error('Can\'t connect to different domain from within an ' +
                    'iframe. (' + loc.href + ', ' + transUrl + ', ' + baseUrl + ')');
        }
        facade = new FacadeJS(new transportMap[transport](transUrl, baseUrl));
        break;
      case 'm':
        facade._send(iframeMessage.data);
        break;
      case 'c':
        if (facade) {
          facade._close();
        }
        facade = null;
        break;
      }
    };

    eventUtils.attachEvent('message', onMessage);

    // Start
    iframeUtils.postMessage('s');
  };
};


/***/ }),

/***/ "./node_modules/sockjs-client/lib/info-ajax.js":
/*!*****************************************************!*\
  !*** ./node_modules/sockjs-client/lib/info-ajax.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var EventEmitter = (__webpack_require__(/*! events */ "./node_modules/sockjs-client/lib/event/emitter.js").EventEmitter)
  , inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , JSON3 = __webpack_require__(/*! json3 */ "./node_modules/json3/lib/json3.js")
  , objectUtils = __webpack_require__(/*! ./utils/object */ "./node_modules/sockjs-client/lib/utils/object.js")
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(/*! debug */ "./node_modules/sockjs-client/node_modules/debug/src/browser.js")('sockjs-client:info-ajax');
}

function InfoAjax(url, AjaxObject) {
  EventEmitter.call(this);

  var self = this;
  var t0 = +new Date();
  this.xo = new AjaxObject('GET', url);

  this.xo.once('finish', function(status, text) {
    var info, rtt;
    if (status === 200) {
      rtt = (+new Date()) - t0;
      if (text) {
        try {
          info = JSON3.parse(text);
        } catch (e) {
          debug('bad json', text);
        }
      }

      if (!objectUtils.isObject(info)) {
        info = {};
      }
    }
    self.emit('finish', info, rtt);
    self.removeAllListeners();
  });
}

inherits(InfoAjax, EventEmitter);

InfoAjax.prototype.close = function() {
  this.removeAllListeners();
  this.xo.close();
};

module.exports = InfoAjax;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/info-iframe-receiver.js":
/*!****************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/info-iframe-receiver.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , EventEmitter = (__webpack_require__(/*! events */ "./node_modules/sockjs-client/lib/event/emitter.js").EventEmitter)
  , JSON3 = __webpack_require__(/*! json3 */ "./node_modules/json3/lib/json3.js")
  , XHRLocalObject = __webpack_require__(/*! ./transport/sender/xhr-local */ "./node_modules/sockjs-client/lib/transport/sender/xhr-local.js")
  , InfoAjax = __webpack_require__(/*! ./info-ajax */ "./node_modules/sockjs-client/lib/info-ajax.js")
  ;

function InfoReceiverIframe(transUrl) {
  var self = this;
  EventEmitter.call(this);

  this.ir = new InfoAjax(transUrl, XHRLocalObject);
  this.ir.once('finish', function(info, rtt) {
    self.ir = null;
    self.emit('message', JSON3.stringify([info, rtt]));
  });
}

inherits(InfoReceiverIframe, EventEmitter);

InfoReceiverIframe.transportName = 'iframe-info-receiver';

InfoReceiverIframe.prototype.close = function() {
  if (this.ir) {
    this.ir.close();
    this.ir = null;
  }
  this.removeAllListeners();
};

module.exports = InfoReceiverIframe;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/info-iframe.js":
/*!*******************************************************!*\
  !*** ./node_modules/sockjs-client/lib/info-iframe.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var EventEmitter = (__webpack_require__(/*! events */ "./node_modules/sockjs-client/lib/event/emitter.js").EventEmitter)
  , inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , JSON3 = __webpack_require__(/*! json3 */ "./node_modules/json3/lib/json3.js")
  , utils = __webpack_require__(/*! ./utils/event */ "./node_modules/sockjs-client/lib/utils/event.js")
  , IframeTransport = __webpack_require__(/*! ./transport/iframe */ "./node_modules/sockjs-client/lib/transport/iframe.js")
  , InfoReceiverIframe = __webpack_require__(/*! ./info-iframe-receiver */ "./node_modules/sockjs-client/lib/info-iframe-receiver.js")
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(/*! debug */ "./node_modules/sockjs-client/node_modules/debug/src/browser.js")('sockjs-client:info-iframe');
}

function InfoIframe(baseUrl, url) {
  var self = this;
  EventEmitter.call(this);

  var go = function() {
    var ifr = self.ifr = new IframeTransport(InfoReceiverIframe.transportName, url, baseUrl);

    ifr.once('message', function(msg) {
      if (msg) {
        var d;
        try {
          d = JSON3.parse(msg);
        } catch (e) {
          debug('bad json', msg);
          self.emit('finish');
          self.close();
          return;
        }

        var info = d[0], rtt = d[1];
        self.emit('finish', info, rtt);
      }
      self.close();
    });

    ifr.once('close', function() {
      self.emit('finish');
      self.close();
    });
  };

  // TODO this seems the same as the 'needBody' from transports
  if (!__webpack_require__.g.document.body) {
    utils.attachEvent('load', go);
  } else {
    go();
  }
}

inherits(InfoIframe, EventEmitter);

InfoIframe.enabled = function() {
  return IframeTransport.enabled();
};

InfoIframe.prototype.close = function() {
  if (this.ifr) {
    this.ifr.close();
  }
  this.removeAllListeners();
  this.ifr = null;
};

module.exports = InfoIframe;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/info-receiver.js":
/*!*********************************************************!*\
  !*** ./node_modules/sockjs-client/lib/info-receiver.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var EventEmitter = (__webpack_require__(/*! events */ "./node_modules/sockjs-client/lib/event/emitter.js").EventEmitter)
  , inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , urlUtils = __webpack_require__(/*! ./utils/url */ "./node_modules/sockjs-client/lib/utils/url.js")
  , XDR = __webpack_require__(/*! ./transport/sender/xdr */ "./node_modules/sockjs-client/lib/transport/sender/xdr.js")
  , XHRCors = __webpack_require__(/*! ./transport/sender/xhr-cors */ "./node_modules/sockjs-client/lib/transport/sender/xhr-cors.js")
  , XHRLocal = __webpack_require__(/*! ./transport/sender/xhr-local */ "./node_modules/sockjs-client/lib/transport/sender/xhr-local.js")
  , XHRFake = __webpack_require__(/*! ./transport/sender/xhr-fake */ "./node_modules/sockjs-client/lib/transport/sender/xhr-fake.js")
  , InfoIframe = __webpack_require__(/*! ./info-iframe */ "./node_modules/sockjs-client/lib/info-iframe.js")
  , InfoAjax = __webpack_require__(/*! ./info-ajax */ "./node_modules/sockjs-client/lib/info-ajax.js")
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(/*! debug */ "./node_modules/sockjs-client/node_modules/debug/src/browser.js")('sockjs-client:info-receiver');
}

function InfoReceiver(baseUrl, urlInfo) {
  debug(baseUrl);
  var self = this;
  EventEmitter.call(this);

  setTimeout(function() {
    self.doXhr(baseUrl, urlInfo);
  }, 0);
}

inherits(InfoReceiver, EventEmitter);

// TODO this is currently ignoring the list of available transports and the whitelist

InfoReceiver._getReceiver = function(baseUrl, url, urlInfo) {
  // determine method of CORS support (if needed)
  if (urlInfo.sameOrigin) {
    return new InfoAjax(url, XHRLocal);
  }
  if (XHRCors.enabled) {
    return new InfoAjax(url, XHRCors);
  }
  if (XDR.enabled && urlInfo.sameScheme) {
    return new InfoAjax(url, XDR);
  }
  if (InfoIframe.enabled()) {
    return new InfoIframe(baseUrl, url);
  }
  return new InfoAjax(url, XHRFake);
};

InfoReceiver.prototype.doXhr = function(baseUrl, urlInfo) {
  var self = this
    , url = urlUtils.addPath(baseUrl, '/info')
    ;
  debug('doXhr', url);

  this.xo = InfoReceiver._getReceiver(baseUrl, url, urlInfo);

  this.timeoutRef = setTimeout(function() {
    debug('timeout');
    self._cleanup(false);
    self.emit('finish');
  }, InfoReceiver.timeout);

  this.xo.once('finish', function(info, rtt) {
    debug('finish', info, rtt);
    self._cleanup(true);
    self.emit('finish', info, rtt);
  });
};

InfoReceiver.prototype._cleanup = function(wasClean) {
  debug('_cleanup');
  clearTimeout(this.timeoutRef);
  this.timeoutRef = null;
  if (!wasClean && this.xo) {
    this.xo.close();
  }
  this.xo = null;
};

InfoReceiver.prototype.close = function() {
  debug('close');
  this.removeAllListeners();
  this._cleanup(false);
};

InfoReceiver.timeout = 8000;

module.exports = InfoReceiver;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/location.js":
/*!****************************************************!*\
  !*** ./node_modules/sockjs-client/lib/location.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__.g.location || {
  origin: 'http://localhost:80'
, protocol: 'http:'
, host: 'localhost'
, port: 80
, href: 'http://localhost/'
, hash: ''
};


/***/ }),

/***/ "./node_modules/sockjs-client/lib/main.js":
/*!************************************************!*\
  !*** ./node_modules/sockjs-client/lib/main.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


__webpack_require__(/*! ./shims */ "./node_modules/sockjs-client/lib/shims.js");

var URL = __webpack_require__(/*! url-parse */ "./node_modules/url-parse/index.js")
  , inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , JSON3 = __webpack_require__(/*! json3 */ "./node_modules/json3/lib/json3.js")
  , random = __webpack_require__(/*! ./utils/random */ "./node_modules/sockjs-client/lib/utils/random.js")
  , escape = __webpack_require__(/*! ./utils/escape */ "./node_modules/sockjs-client/lib/utils/escape.js")
  , urlUtils = __webpack_require__(/*! ./utils/url */ "./node_modules/sockjs-client/lib/utils/url.js")
  , eventUtils = __webpack_require__(/*! ./utils/event */ "./node_modules/sockjs-client/lib/utils/event.js")
  , transport = __webpack_require__(/*! ./utils/transport */ "./node_modules/sockjs-client/lib/utils/transport.js")
  , objectUtils = __webpack_require__(/*! ./utils/object */ "./node_modules/sockjs-client/lib/utils/object.js")
  , browser = __webpack_require__(/*! ./utils/browser */ "./node_modules/sockjs-client/lib/utils/browser.js")
  , log = __webpack_require__(/*! ./utils/log */ "./node_modules/sockjs-client/lib/utils/log.js")
  , Event = __webpack_require__(/*! ./event/event */ "./node_modules/sockjs-client/lib/event/event.js")
  , EventTarget = __webpack_require__(/*! ./event/eventtarget */ "./node_modules/sockjs-client/lib/event/eventtarget.js")
  , loc = __webpack_require__(/*! ./location */ "./node_modules/sockjs-client/lib/location.js")
  , CloseEvent = __webpack_require__(/*! ./event/close */ "./node_modules/sockjs-client/lib/event/close.js")
  , TransportMessageEvent = __webpack_require__(/*! ./event/trans-message */ "./node_modules/sockjs-client/lib/event/trans-message.js")
  , InfoReceiver = __webpack_require__(/*! ./info-receiver */ "./node_modules/sockjs-client/lib/info-receiver.js")
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(/*! debug */ "./node_modules/sockjs-client/node_modules/debug/src/browser.js")('sockjs-client:main');
}

var transports;

// follow constructor steps defined at http://dev.w3.org/html5/websockets/#the-websocket-interface
function SockJS(url, protocols, options) {
  if (!(this instanceof SockJS)) {
    return new SockJS(url, protocols, options);
  }
  if (arguments.length < 1) {
    throw new TypeError("Failed to construct 'SockJS: 1 argument required, but only 0 present");
  }
  EventTarget.call(this);

  this.readyState = SockJS.CONNECTING;
  this.extensions = '';
  this.protocol = '';

  // non-standard extension
  options = options || {};
  if (options.protocols_whitelist) {
    log.warn("'protocols_whitelist' is DEPRECATED. Use 'transports' instead.");
  }
  this._transportsWhitelist = options.transports;
  this._transportOptions = options.transportOptions || {};
  this._timeout = options.timeout || 0;

  var sessionId = options.sessionId || 8;
  if (typeof sessionId === 'function') {
    this._generateSessionId = sessionId;
  } else if (typeof sessionId === 'number') {
    this._generateSessionId = function() {
      return random.string(sessionId);
    };
  } else {
    throw new TypeError('If sessionId is used in the options, it needs to be a number or a function.');
  }

  this._server = options.server || random.numberString(1000);

  // Step 1 of WS spec - parse and validate the url. Issue #8
  var parsedUrl = new URL(url);
  if (!parsedUrl.host || !parsedUrl.protocol) {
    throw new SyntaxError("The URL '" + url + "' is invalid");
  } else if (parsedUrl.hash) {
    throw new SyntaxError('The URL must not contain a fragment');
  } else if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    throw new SyntaxError("The URL's scheme must be either 'http:' or 'https:'. '" + parsedUrl.protocol + "' is not allowed.");
  }

  var secure = parsedUrl.protocol === 'https:';
  // Step 2 - don't allow secure origin with an insecure protocol
  if (loc.protocol === 'https:' && !secure) {
    // exception is 127.0.0.0/8 and ::1 urls
    if (!urlUtils.isLoopbackAddr(parsedUrl.hostname)) {
      throw new Error('SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS');
    }
  }

  // Step 3 - check port access - no need here
  // Step 4 - parse protocols argument
  if (!protocols) {
    protocols = [];
  } else if (!Array.isArray(protocols)) {
    protocols = [protocols];
  }

  // Step 5 - check protocols argument
  var sortedProtocols = protocols.sort();
  sortedProtocols.forEach(function(proto, i) {
    if (!proto) {
      throw new SyntaxError("The protocols entry '" + proto + "' is invalid.");
    }
    if (i < (sortedProtocols.length - 1) && proto === sortedProtocols[i + 1]) {
      throw new SyntaxError("The protocols entry '" + proto + "' is duplicated.");
    }
  });

  // Step 6 - convert origin
  var o = urlUtils.getOrigin(loc.href);
  this._origin = o ? o.toLowerCase() : null;

  // remove the trailing slash
  parsedUrl.set('pathname', parsedUrl.pathname.replace(/\/+$/, ''));

  // store the sanitized url
  this.url = parsedUrl.href;
  debug('using url', this.url);

  // Step 7 - start connection in background
  // obtain server info
  // http://sockjs.github.io/sockjs-protocol/sockjs-protocol-0.3.3.html#section-26
  this._urlInfo = {
    nullOrigin: !browser.hasDomain()
  , sameOrigin: urlUtils.isOriginEqual(this.url, loc.href)
  , sameScheme: urlUtils.isSchemeEqual(this.url, loc.href)
  };

  this._ir = new InfoReceiver(this.url, this._urlInfo);
  this._ir.once('finish', this._receiveInfo.bind(this));
}

inherits(SockJS, EventTarget);

function userSetCode(code) {
  return code === 1000 || (code >= 3000 && code <= 4999);
}

SockJS.prototype.close = function(code, reason) {
  // Step 1
  if (code && !userSetCode(code)) {
    throw new Error('InvalidAccessError: Invalid code');
  }
  // Step 2.4 states the max is 123 bytes, but we are just checking length
  if (reason && reason.length > 123) {
    throw new SyntaxError('reason argument has an invalid length');
  }

  // Step 3.1
  if (this.readyState === SockJS.CLOSING || this.readyState === SockJS.CLOSED) {
    return;
  }

  // TODO look at docs to determine how to set this
  var wasClean = true;
  this._close(code || 1000, reason || 'Normal closure', wasClean);
};

SockJS.prototype.send = function(data) {
  // #13 - convert anything non-string to string
  // TODO this currently turns objects into [object Object]
  if (typeof data !== 'string') {
    data = '' + data;
  }
  if (this.readyState === SockJS.CONNECTING) {
    throw new Error('InvalidStateError: The connection has not been established yet');
  }
  if (this.readyState !== SockJS.OPEN) {
    return;
  }
  this._transport.send(escape.quote(data));
};

SockJS.version = __webpack_require__(/*! ./version */ "./node_modules/sockjs-client/lib/version.js");

SockJS.CONNECTING = 0;
SockJS.OPEN = 1;
SockJS.CLOSING = 2;
SockJS.CLOSED = 3;

SockJS.prototype._receiveInfo = function(info, rtt) {
  debug('_receiveInfo', rtt);
  this._ir = null;
  if (!info) {
    this._close(1002, 'Cannot connect to server');
    return;
  }

  // establish a round-trip timeout (RTO) based on the
  // round-trip time (RTT)
  this._rto = this.countRTO(rtt);
  // allow server to override url used for the actual transport
  this._transUrl = info.base_url ? info.base_url : this.url;
  info = objectUtils.extend(info, this._urlInfo);
  debug('info', info);
  // determine list of desired and supported transports
  var enabledTransports = transports.filterToEnabled(this._transportsWhitelist, info);
  this._transports = enabledTransports.main;
  debug(this._transports.length + ' enabled transports');

  this._connect();
};

SockJS.prototype._connect = function() {
  for (var Transport = this._transports.shift(); Transport; Transport = this._transports.shift()) {
    debug('attempt', Transport.transportName);
    if (Transport.needBody) {
      if (!__webpack_require__.g.document.body ||
          (typeof __webpack_require__.g.document.readyState !== 'undefined' &&
            __webpack_require__.g.document.readyState !== 'complete' &&
            __webpack_require__.g.document.readyState !== 'interactive')) {
        debug('waiting for body');
        this._transports.unshift(Transport);
        eventUtils.attachEvent('load', this._connect.bind(this));
        return;
      }
    }

    // calculate timeout based on RTO and round trips. Default to 5s
    var timeoutMs = Math.max(this._timeout, (this._rto * Transport.roundTrips) || 5000);
    this._transportTimeoutId = setTimeout(this._transportTimeout.bind(this), timeoutMs);
    debug('using timeout', timeoutMs);

    var transportUrl = urlUtils.addPath(this._transUrl, '/' + this._server + '/' + this._generateSessionId());
    var options = this._transportOptions[Transport.transportName];
    debug('transport url', transportUrl);
    var transportObj = new Transport(transportUrl, this._transUrl, options);
    transportObj.on('message', this._transportMessage.bind(this));
    transportObj.once('close', this._transportClose.bind(this));
    transportObj.transportName = Transport.transportName;
    this._transport = transportObj;

    return;
  }
  this._close(2000, 'All transports failed', false);
};

SockJS.prototype._transportTimeout = function() {
  debug('_transportTimeout');
  if (this.readyState === SockJS.CONNECTING) {
    if (this._transport) {
      this._transport.close();
    }

    this._transportClose(2007, 'Transport timed out');
  }
};

SockJS.prototype._transportMessage = function(msg) {
  debug('_transportMessage', msg);
  var self = this
    , type = msg.slice(0, 1)
    , content = msg.slice(1)
    , payload
    ;

  // first check for messages that don't need a payload
  switch (type) {
    case 'o':
      this._open();
      return;
    case 'h':
      this.dispatchEvent(new Event('heartbeat'));
      debug('heartbeat', this.transport);
      return;
  }

  if (content) {
    try {
      payload = JSON3.parse(content);
    } catch (e) {
      debug('bad json', content);
    }
  }

  if (typeof payload === 'undefined') {
    debug('empty payload', content);
    return;
  }

  switch (type) {
    case 'a':
      if (Array.isArray(payload)) {
        payload.forEach(function(p) {
          debug('message', self.transport, p);
          self.dispatchEvent(new TransportMessageEvent(p));
        });
      }
      break;
    case 'm':
      debug('message', this.transport, payload);
      this.dispatchEvent(new TransportMessageEvent(payload));
      break;
    case 'c':
      if (Array.isArray(payload) && payload.length === 2) {
        this._close(payload[0], payload[1], true);
      }
      break;
  }
};

SockJS.prototype._transportClose = function(code, reason) {
  debug('_transportClose', this.transport, code, reason);
  if (this._transport) {
    this._transport.removeAllListeners();
    this._transport = null;
    this.transport = null;
  }

  if (!userSetCode(code) && code !== 2000 && this.readyState === SockJS.CONNECTING) {
    this._connect();
    return;
  }

  this._close(code, reason);
};

SockJS.prototype._open = function() {
  debug('_open', this._transport && this._transport.transportName, this.readyState);
  if (this.readyState === SockJS.CONNECTING) {
    if (this._transportTimeoutId) {
      clearTimeout(this._transportTimeoutId);
      this._transportTimeoutId = null;
    }
    this.readyState = SockJS.OPEN;
    this.transport = this._transport.transportName;
    this.dispatchEvent(new Event('open'));
    debug('connected', this.transport);
  } else {
    // The server might have been restarted, and lost track of our
    // connection.
    this._close(1006, 'Server lost session');
  }
};

SockJS.prototype._close = function(code, reason, wasClean) {
  debug('_close', this.transport, code, reason, wasClean, this.readyState);
  var forceFail = false;

  if (this._ir) {
    forceFail = true;
    this._ir.close();
    this._ir = null;
  }
  if (this._transport) {
    this._transport.close();
    this._transport = null;
    this.transport = null;
  }

  if (this.readyState === SockJS.CLOSED) {
    throw new Error('InvalidStateError: SockJS has already been closed');
  }

  this.readyState = SockJS.CLOSING;
  setTimeout(function() {
    this.readyState = SockJS.CLOSED;

    if (forceFail) {
      this.dispatchEvent(new Event('error'));
    }

    var e = new CloseEvent('close');
    e.wasClean = wasClean || false;
    e.code = code || 1000;
    e.reason = reason;

    this.dispatchEvent(e);
    this.onmessage = this.onclose = this.onerror = null;
    debug('disconnected');
  }.bind(this), 0);
};

// See: http://www.erg.abdn.ac.uk/~gerrit/dccp/notes/ccid2/rto_estimator/
// and RFC 2988.
SockJS.prototype.countRTO = function(rtt) {
  // In a local environment, when using IE8/9 and the `jsonp-polling`
  // transport the time needed to establish a connection (the time that pass
  // from the opening of the transport to the call of `_dispatchOpen`) is
  // around 200msec (the lower bound used in the article above) and this
  // causes spurious timeouts. For this reason we calculate a value slightly
  // larger than that used in the article.
  if (rtt > 100) {
    return 4 * rtt; // rto > 400msec
  }
  return 300 + rtt; // 300msec < rto <= 400msec
};

module.exports = function(availableTransports) {
  transports = transport(availableTransports);
  __webpack_require__(/*! ./iframe-bootstrap */ "./node_modules/sockjs-client/lib/iframe-bootstrap.js")(SockJS, availableTransports);
  return SockJS;
};


/***/ }),

/***/ "./node_modules/sockjs-client/lib/shims.js":
/*!*************************************************!*\
  !*** ./node_modules/sockjs-client/lib/shims.js ***!
  \*************************************************/
/***/ (() => {

"use strict";
/* eslint-disable */
/* jscs: disable */


// pulled specific shims from https://github.com/es-shims/es5-shim

var ArrayPrototype = Array.prototype;
var ObjectPrototype = Object.prototype;
var FunctionPrototype = Function.prototype;
var StringPrototype = String.prototype;
var array_slice = ArrayPrototype.slice;

var _toString = ObjectPrototype.toString;
var isFunction = function (val) {
    return ObjectPrototype.toString.call(val) === '[object Function]';
};
var isArray = function isArray(obj) {
    return _toString.call(obj) === '[object Array]';
};
var isString = function isString(obj) {
    return _toString.call(obj) === '[object String]';
};

var supportsDescriptors = Object.defineProperty && (function () {
    try {
        Object.defineProperty({}, 'x', {});
        return true;
    } catch (e) { /* this is ES3 */
        return false;
    }
}());

// Define configurable, writable and non-enumerable props
// if they don't exist.
var defineProperty;
if (supportsDescriptors) {
    defineProperty = function (object, name, method, forceAssign) {
        if (!forceAssign && (name in object)) { return; }
        Object.defineProperty(object, name, {
            configurable: true,
            enumerable: false,
            writable: true,
            value: method
        });
    };
} else {
    defineProperty = function (object, name, method, forceAssign) {
        if (!forceAssign && (name in object)) { return; }
        object[name] = method;
    };
}
var defineProperties = function (object, map, forceAssign) {
    for (var name in map) {
        if (ObjectPrototype.hasOwnProperty.call(map, name)) {
          defineProperty(object, name, map[name], forceAssign);
        }
    }
};

var toObject = function (o) {
    if (o == null) { // this matches both null and undefined
        throw new TypeError("can't convert " + o + ' to object');
    }
    return Object(o);
};

//
// Util
// ======
//

// ES5 9.4
// http://es5.github.com/#x9.4
// http://jsperf.com/to-integer

function toInteger(num) {
    var n = +num;
    if (n !== n) { // isNaN
        n = 0;
    } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
    }
    return n;
}

function ToUint32(x) {
    return x >>> 0;
}

//
// Function
// ========
//

// ES-5 15.3.4.5
// http://es5.github.com/#x15.3.4.5

function Empty() {}

defineProperties(FunctionPrototype, {
    bind: function bind(that) { // .length is 1
        // 1. Let Target be the this value.
        var target = this;
        // 2. If IsCallable(Target) is false, throw a TypeError exception.
        if (!isFunction(target)) {
            throw new TypeError('Function.prototype.bind called on incompatible ' + target);
        }
        // 3. Let A be a new (possibly empty) internal list of all of the
        //   argument values provided after thisArg (arg1, arg2 etc), in order.
        // XXX slicedArgs will stand in for "A" if used
        var args = array_slice.call(arguments, 1); // for normal call
        // 4. Let F be a new native ECMAScript object.
        // 11. Set the [[Prototype]] internal property of F to the standard
        //   built-in Function prototype object as specified in 15.3.3.1.
        // 12. Set the [[Call]] internal property of F as described in
        //   15.3.4.5.1.
        // 13. Set the [[Construct]] internal property of F as described in
        //   15.3.4.5.2.
        // 14. Set the [[HasInstance]] internal property of F as described in
        //   15.3.4.5.3.
        var binder = function () {

            if (this instanceof bound) {
                // 15.3.4.5.2 [[Construct]]
                // When the [[Construct]] internal method of a function object,
                // F that was created using the bind function is called with a
                // list of arguments ExtraArgs, the following steps are taken:
                // 1. Let target be the value of F's [[TargetFunction]]
                //   internal property.
                // 2. If target has no [[Construct]] internal method, a
                //   TypeError exception is thrown.
                // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the
                //   list boundArgs in the same order followed by the same
                //   values as the list ExtraArgs in the same order.
                // 5. Return the result of calling the [[Construct]] internal
                //   method of target providing args as the arguments.

                var result = target.apply(
                    this,
                    args.concat(array_slice.call(arguments))
                );
                if (Object(result) === result) {
                    return result;
                }
                return this;

            } else {
                // 15.3.4.5.1 [[Call]]
                // When the [[Call]] internal method of a function object, F,
                // which was created using the bind function is called with a
                // this value and a list of arguments ExtraArgs, the following
                // steps are taken:
                // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 2. Let boundThis be the value of F's [[BoundThis]] internal
                //   property.
                // 3. Let target be the value of F's [[TargetFunction]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the
                //   list boundArgs in the same order followed by the same
                //   values as the list ExtraArgs in the same order.
                // 5. Return the result of calling the [[Call]] internal method
                //   of target providing boundThis as the this value and
                //   providing args as the arguments.

                // equiv: target.call(this, ...boundArgs, ...args)
                return target.apply(
                    that,
                    args.concat(array_slice.call(arguments))
                );

            }

        };

        // 15. If the [[Class]] internal property of Target is "Function", then
        //     a. Let L be the length property of Target minus the length of A.
        //     b. Set the length own property of F to either 0 or L, whichever is
        //       larger.
        // 16. Else set the length own property of F to 0.

        var boundLength = Math.max(0, target.length - args.length);

        // 17. Set the attributes of the length own property of F to the values
        //   specified in 15.3.5.1.
        var boundArgs = [];
        for (var i = 0; i < boundLength; i++) {
            boundArgs.push('$' + i);
        }

        // XXX Build a dynamic function with desired amount of arguments is the only
        // way to set the length property of a function.
        // In environments where Content Security Policies enabled (Chrome extensions,
        // for ex.) all use of eval or Function costructor throws an exception.
        // However in all of these environments Function.prototype.bind exists
        // and so this code will never be executed.
        var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

        if (target.prototype) {
            Empty.prototype = target.prototype;
            bound.prototype = new Empty();
            // Clean up dangling references.
            Empty.prototype = null;
        }

        // TODO
        // 18. Set the [[Extensible]] internal property of F to true.

        // TODO
        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
        // 20. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
        //   false.
        // 21. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
        //   and false.

        // TODO
        // NOTE Function objects created using Function.prototype.bind do not
        // have a prototype property or the [[Code]], [[FormalParameters]], and
        // [[Scope]] internal properties.
        // XXX can't delete prototype in pure-js.

        // 22. Return F.
        return bound;
    }
});

//
// Array
// =====
//

// ES5 15.4.3.2
// http://es5.github.com/#x15.4.3.2
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
defineProperties(Array, { isArray: isArray });


var boxedString = Object('a');
var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

var properlyBoxesContext = function properlyBoxed(method) {
    // Check node 0.6.21 bug where third parameter is not boxed
    var properlyBoxesNonStrict = true;
    var properlyBoxesStrict = true;
    if (method) {
        method.call('foo', function (_, __, context) {
            if (typeof context !== 'object') { properlyBoxesNonStrict = false; }
        });

        method.call([1], function () {
            'use strict';
            properlyBoxesStrict = typeof this === 'string';
        }, 'x');
    }
    return !!method && properlyBoxesNonStrict && properlyBoxesStrict;
};

defineProperties(ArrayPrototype, {
    forEach: function forEach(fun /*, thisp*/) {
        var object = toObject(this),
            self = splitString && isString(this) ? this.split('') : object,
            thisp = arguments[1],
            i = -1,
            length = self.length >>> 0;

        // If no callback function or if callback is not a callable function
        if (!isFunction(fun)) {
            throw new TypeError(); // TODO message
        }

        while (++i < length) {
            if (i in self) {
                // Invoke the callback function with call, passing arguments:
                // context, property value, property key, thisArg object
                // context
                fun.call(thisp, self[i], i, object);
            }
        }
    }
}, !properlyBoxesContext(ArrayPrototype.forEach));

// ES5 15.4.4.14
// http://es5.github.com/#x15.4.4.14
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
var hasFirefox2IndexOfBug = Array.prototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
defineProperties(ArrayPrototype, {
    indexOf: function indexOf(sought /*, fromIndex */ ) {
        var self = splitString && isString(this) ? this.split('') : toObject(this),
            length = self.length >>> 0;

        if (!length) {
            return -1;
        }

        var i = 0;
        if (arguments.length > 1) {
            i = toInteger(arguments[1]);
        }

        // handle negative indices
        i = i >= 0 ? i : Math.max(0, length + i);
        for (; i < length; i++) {
            if (i in self && self[i] === sought) {
                return i;
            }
        }
        return -1;
    }
}, hasFirefox2IndexOfBug);

//
// String
// ======
//

// ES5 15.5.4.14
// http://es5.github.com/#x15.5.4.14

// [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
// Many browsers do not split properly with regular expressions or they
// do not perform the split correctly under obscure conditions.
// See http://blog.stevenlevithan.com/archives/cross-browser-split
// I've tested in many browsers and this seems to cover the deviant ones:
//    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
//    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
//    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
//       [undefined, "t", undefined, "e", ...]
//    ''.split(/.?/) should be [], not [""]
//    '.'.split(/()()/) should be ["."], not ["", "", "."]

var string_split = StringPrototype.split;
if (
    'ab'.split(/(?:ab)*/).length !== 2 ||
    '.'.split(/(.?)(.?)/).length !== 4 ||
    'tesst'.split(/(s)*/)[1] === 't' ||
    'test'.split(/(?:)/, -1).length !== 4 ||
    ''.split(/.?/).length ||
    '.'.split(/()()/).length > 1
) {
    (function () {
        var compliantExecNpcg = /()??/.exec('')[1] === void 0; // NPCG: nonparticipating capturing group

        StringPrototype.split = function (separator, limit) {
            var string = this;
            if (separator === void 0 && limit === 0) {
                return [];
            }

            // If `separator` is not a regex, use native split
            if (_toString.call(separator) !== '[object RegExp]') {
                return string_split.call(this, separator, limit);
            }

            var output = [],
                flags = (separator.ignoreCase ? 'i' : '') +
                        (separator.multiline  ? 'm' : '') +
                        (separator.extended   ? 'x' : '') + // Proposed for ES6
                        (separator.sticky     ? 'y' : ''), // Firefox 3+
                lastLastIndex = 0,
                // Make `global` and avoid `lastIndex` issues by working with a copy
                separator2, match, lastIndex, lastLength;
            separator = new RegExp(separator.source, flags + 'g');
            string += ''; // Type-convert
            if (!compliantExecNpcg) {
                // Doesn't need flags gy, but they don't hurt
                separator2 = new RegExp('^' + separator.source + '$(?!\\s)', flags);
            }
            /* Values for `limit`, per the spec:
             * If undefined: 4294967295 // Math.pow(2, 32) - 1
             * If 0, Infinity, or NaN: 0
             * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
             * If negative number: 4294967296 - Math.floor(Math.abs(limit))
             * If other: Type-convert, then use the above rules
             */
            limit = limit === void 0 ?
                -1 >>> 0 : // Math.pow(2, 32) - 1
                ToUint32(limit);
            while (match = separator.exec(string)) {
                // `separator.lastIndex` is not reliable cross-browser
                lastIndex = match.index + match[0].length;
                if (lastIndex > lastLastIndex) {
                    output.push(string.slice(lastLastIndex, match.index));
                    // Fix browsers whose `exec` methods don't consistently return `undefined` for
                    // nonparticipating capturing groups
                    if (!compliantExecNpcg && match.length > 1) {
                        match[0].replace(separator2, function () {
                            for (var i = 1; i < arguments.length - 2; i++) {
                                if (arguments[i] === void 0) {
                                    match[i] = void 0;
                                }
                            }
                        });
                    }
                    if (match.length > 1 && match.index < string.length) {
                        ArrayPrototype.push.apply(output, match.slice(1));
                    }
                    lastLength = match[0].length;
                    lastLastIndex = lastIndex;
                    if (output.length >= limit) {
                        break;
                    }
                }
                if (separator.lastIndex === match.index) {
                    separator.lastIndex++; // Avoid an infinite loop
                }
            }
            if (lastLastIndex === string.length) {
                if (lastLength || !separator.test('')) {
                    output.push('');
                }
            } else {
                output.push(string.slice(lastLastIndex));
            }
            return output.length > limit ? output.slice(0, limit) : output;
        };
    }());

// [bugfix, chrome]
// If separator is undefined, then the result array contains just one String,
// which is the this value (converted to a String). If limit is not undefined,
// then the output array is truncated so that it contains no more than limit
// elements.
// "0".split(undefined, 0) -> []
} else if ('0'.split(void 0, 0).length) {
    StringPrototype.split = function split(separator, limit) {
        if (separator === void 0 && limit === 0) { return []; }
        return string_split.call(this, separator, limit);
    };
}

// ECMA-262, 3rd B.2.3
// Not an ECMAScript standard, although ECMAScript 3rd Edition has a
// non-normative section suggesting uniform semantics and it should be
// normalized across all browsers
// [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
var string_substr = StringPrototype.substr;
var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
defineProperties(StringPrototype, {
    substr: function substr(start, length) {
        return string_substr.call(
            this,
            start < 0 ? ((start = this.length + start) < 0 ? 0 : start) : start,
            length
        );
    }
}, hasNegativeSubstrBug);


/***/ }),

/***/ "./node_modules/sockjs-client/lib/transport-list.js":
/*!**********************************************************!*\
  !*** ./node_modules/sockjs-client/lib/transport-list.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = [
  // streaming transports
  __webpack_require__(/*! ./transport/websocket */ "./node_modules/sockjs-client/lib/transport/websocket.js")
, __webpack_require__(/*! ./transport/xhr-streaming */ "./node_modules/sockjs-client/lib/transport/xhr-streaming.js")
, __webpack_require__(/*! ./transport/xdr-streaming */ "./node_modules/sockjs-client/lib/transport/xdr-streaming.js")
, __webpack_require__(/*! ./transport/eventsource */ "./node_modules/sockjs-client/lib/transport/eventsource.js")
, __webpack_require__(/*! ./transport/lib/iframe-wrap */ "./node_modules/sockjs-client/lib/transport/lib/iframe-wrap.js")(__webpack_require__(/*! ./transport/eventsource */ "./node_modules/sockjs-client/lib/transport/eventsource.js"))

  // polling transports
, __webpack_require__(/*! ./transport/htmlfile */ "./node_modules/sockjs-client/lib/transport/htmlfile.js")
, __webpack_require__(/*! ./transport/lib/iframe-wrap */ "./node_modules/sockjs-client/lib/transport/lib/iframe-wrap.js")(__webpack_require__(/*! ./transport/htmlfile */ "./node_modules/sockjs-client/lib/transport/htmlfile.js"))
, __webpack_require__(/*! ./transport/xhr-polling */ "./node_modules/sockjs-client/lib/transport/xhr-polling.js")
, __webpack_require__(/*! ./transport/xdr-polling */ "./node_modules/sockjs-client/lib/transport/xdr-polling.js")
, __webpack_require__(/*! ./transport/lib/iframe-wrap */ "./node_modules/sockjs-client/lib/transport/lib/iframe-wrap.js")(__webpack_require__(/*! ./transport/xhr-polling */ "./node_modules/sockjs-client/lib/transport/xhr-polling.js"))
, __webpack_require__(/*! ./transport/jsonp-polling */ "./node_modules/sockjs-client/lib/transport/jsonp-polling.js")
];


/***/ }),

/***/ "./node_modules/sockjs-client/lib/transport/browser/abstract-xhr.js":
/*!**************************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/transport/browser/abstract-xhr.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var EventEmitter = (__webpack_require__(/*! events */ "./node_modules/sockjs-client/lib/event/emitter.js").EventEmitter)
  , inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , utils = __webpack_require__(/*! ../../utils/event */ "./node_modules/sockjs-client/lib/utils/event.js")
  , urlUtils = __webpack_require__(/*! ../../utils/url */ "./node_modules/sockjs-client/lib/utils/url.js")
  , XHR = __webpack_require__.g.XMLHttpRequest
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(/*! debug */ "./node_modules/sockjs-client/node_modules/debug/src/browser.js")('sockjs-client:browser:xhr');
}

function AbstractXHRObject(method, url, payload, opts) {
  debug(method, url);
  var self = this;
  EventEmitter.call(this);

  setTimeout(function () {
    self._start(method, url, payload, opts);
  }, 0);
}

inherits(AbstractXHRObject, EventEmitter);

AbstractXHRObject.prototype._start = function(method, url, payload, opts) {
  var self = this;

  try {
    this.xhr = new XHR();
  } catch (x) {
    // intentionally empty
  }

  if (!this.xhr) {
    debug('no xhr');
    this.emit('finish', 0, 'no xhr support');
    this._cleanup();
    return;
  }

  // several browsers cache POSTs
  url = urlUtils.addQuery(url, 't=' + (+new Date()));

  // Explorer tends to keep connection open, even after the
  // tab gets closed: http://bugs.jquery.com/ticket/5280
  this.unloadRef = utils.unloadAdd(function() {
    debug('unload cleanup');
    self._cleanup(true);
  });
  try {
    this.xhr.open(method, url, true);
    if (this.timeout && 'timeout' in this.xhr) {
      this.xhr.timeout = this.timeout;
      this.xhr.ontimeout = function() {
        debug('xhr timeout');
        self.emit('finish', 0, '');
        self._cleanup(false);
      };
    }
  } catch (e) {
    debug('exception', e);
    // IE raises an exception on wrong port.
    this.emit('finish', 0, '');
    this._cleanup(false);
    return;
  }

  if ((!opts || !opts.noCredentials) && AbstractXHRObject.supportsCORS) {
    debug('withCredentials');
    // Mozilla docs says https://developer.mozilla.org/en/XMLHttpRequest :
    // "This never affects same-site requests."

    this.xhr.withCredentials = true;
  }
  if (opts && opts.headers) {
    for (var key in opts.headers) {
      this.xhr.setRequestHeader(key, opts.headers[key]);
    }
  }

  this.xhr.onreadystatechange = function() {
    if (self.xhr) {
      var x = self.xhr;
      var text, status;
      debug('readyState', x.readyState);
      switch (x.readyState) {
      case 3:
        // IE doesn't like peeking into responseText or status
        // on Microsoft.XMLHTTP and readystate=3
        try {
          status = x.status;
          text = x.responseText;
        } catch (e) {
          // intentionally empty
        }
        debug('status', status);
        // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
        if (status === 1223) {
          status = 204;
        }

        // IE does return readystate == 3 for 404 answers.
        if (status === 200 && text && text.length > 0) {
          debug('chunk');
          self.emit('chunk', status, text);
        }
        break;
      case 4:
        status = x.status;
        debug('status', status);
        // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
        if (status === 1223) {
          status = 204;
        }
        // IE returns this for a bad port
        // http://msdn.microsoft.com/en-us/library/windows/desktop/aa383770(v=vs.85).aspx
        if (status === 12005 || status === 12029) {
          status = 0;
        }

        debug('finish', status, x.responseText);
        self.emit('finish', status, x.responseText);
        self._cleanup(false);
        break;
      }
    }
  };

  try {
    self.xhr.send(payload);
  } catch (e) {
    self.emit('finish', 0, '');
    self._cleanup(false);
  }
};

AbstractXHRObject.prototype._cleanup = function(abort) {
  debug('cleanup');
  if (!this.xhr) {
    return;
  }
  this.removeAllListeners();
  utils.unloadDel(this.unloadRef);

  // IE needs this field to be a function
  this.xhr.onreadystatechange = function() {};
  if (this.xhr.ontimeout) {
    this.xhr.ontimeout = null;
  }

  if (abort) {
    try {
      this.xhr.abort();
    } catch (x) {
      // intentionally empty
    }
  }
  this.unloadRef = this.xhr = null;
};

AbstractXHRObject.prototype.close = function() {
  debug('close');
  this._cleanup(true);
};

AbstractXHRObject.enabled = !!XHR;
// override XMLHttpRequest for IE6/7
// obfuscate to avoid firewalls
var axo = ['Active'].concat('Object').join('X');
if (!AbstractXHRObject.enabled && (axo in __webpack_require__.g)) {
  debug('overriding xmlhttprequest');
  XHR = function() {
    try {
      return new __webpack_require__.g[axo]('Microsoft.XMLHTTP');
    } catch (e) {
      return null;
    }
  };
  AbstractXHRObject.enabled = !!new XHR();
}

var cors = false;
try {
  cors = 'withCredentials' in new XHR();
} catch (ignored) {
  // intentionally empty
}

AbstractXHRObject.supportsCORS = cors;

module.exports = AbstractXHRObject;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/transport/browser/eventsource.js":
/*!*************************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/transport/browser/eventsource.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.g.EventSource;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/transport/browser/websocket.js":
/*!***********************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/transport/browser/websocket.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Driver = __webpack_require__.g.WebSocket || __webpack_require__.g.MozWebSocket;
if (Driver) {
	module.exports = function WebSocketBrowserDriver(url) {
		return new Driver(url);
	};
} else {
	module.exports = undefined;
}


/***/ }),

/***/ "./node_modules/sockjs-client/lib/transport/eventsource.js":
/*!*****************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/transport/eventsource.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , AjaxBasedTransport = __webpack_require__(/*! ./lib/ajax-based */ "./node_modules/sockjs-client/lib/transport/lib/ajax-based.js")
  , EventSourceReceiver = __webpack_require__(/*! ./receiver/eventsource */ "./node_modules/sockjs-client/lib/transport/receiver/eventsource.js")
  , XHRCorsObject = __webpack_require__(/*! ./sender/xhr-cors */ "./node_modules/sockjs-client/lib/transport/sender/xhr-cors.js")
  , EventSourceDriver = __webpack_require__(/*! eventsource */ "./node_modules/sockjs-client/lib/transport/browser/eventsource.js")
  ;

function EventSourceTransport(transUrl) {
  if (!EventSourceTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }

  AjaxBasedTransport.call(this, transUrl, '/eventsource', EventSourceReceiver, XHRCorsObject);
}

inherits(EventSourceTransport, AjaxBasedTransport);

EventSourceTransport.enabled = function() {
  return !!EventSourceDriver;
};

EventSourceTransport.transportName = 'eventsource';
EventSourceTransport.roundTrips = 2;

module.exports = EventSourceTransport;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/transport/htmlfile.js":
/*!**************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/transport/htmlfile.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , HtmlfileReceiver = __webpack_require__(/*! ./receiver/htmlfile */ "./node_modules/sockjs-client/lib/transport/receiver/htmlfile.js")
  , XHRLocalObject = __webpack_require__(/*! ./sender/xhr-local */ "./node_modules/sockjs-client/lib/transport/sender/xhr-local.js")
  , AjaxBasedTransport = __webpack_require__(/*! ./lib/ajax-based */ "./node_modules/sockjs-client/lib/transport/lib/ajax-based.js")
  ;

function HtmlFileTransport(transUrl) {
  if (!HtmlfileReceiver.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/htmlfile', HtmlfileReceiver, XHRLocalObject);
}

inherits(HtmlFileTransport, AjaxBasedTransport);

HtmlFileTransport.enabled = function(info) {
  return HtmlfileReceiver.enabled && info.sameOrigin;
};

HtmlFileTransport.transportName = 'htmlfile';
HtmlFileTransport.roundTrips = 2;

module.exports = HtmlFileTransport;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/transport/iframe.js":
/*!************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/transport/iframe.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// Few cool transports do work only for same-origin. In order to make
// them work cross-domain we shall use iframe, served from the
// remote domain. New browsers have capabilities to communicate with
// cross domain iframe using postMessage(). In IE it was implemented
// from IE 8+, but of course, IE got some details wrong:
//    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
//    http://stevesouders.com/misc/test-postmessage.php

var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , JSON3 = __webpack_require__(/*! json3 */ "./node_modules/json3/lib/json3.js")
  , EventEmitter = (__webpack_require__(/*! events */ "./node_modules/sockjs-client/lib/event/emitter.js").EventEmitter)
  , version = __webpack_require__(/*! ../version */ "./node_modules/sockjs-client/lib/version.js")
  , urlUtils = __webpack_require__(/*! ../utils/url */ "./node_modules/sockjs-client/lib/utils/url.js")
  , iframeUtils = __webpack_require__(/*! ../utils/iframe */ "./node_modules/sockjs-client/lib/utils/iframe.js")
  , eventUtils = __webpack_require__(/*! ../utils/event */ "./node_modules/sockjs-client/lib/utils/event.js")
  , random = __webpack_require__(/*! ../utils/random */ "./node_modules/sockjs-client/lib/utils/random.js")
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(/*! debug */ "./node_modules/sockjs-client/node_modules/debug/src/browser.js")('sockjs-client:transport:iframe');
}

function IframeTransport(transport, transUrl, baseUrl) {
  if (!IframeTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }
  EventEmitter.call(this);

  var self = this;
  this.origin = urlUtils.getOrigin(baseUrl);
  this.baseUrl = baseUrl;
  this.transUrl = transUrl;
  this.transport = transport;
  this.windowId = random.string(8);

  var iframeUrl = urlUtils.addPath(baseUrl, '/iframe.html') + '#' + this.windowId;
  debug(transport, transUrl, iframeUrl);

  this.iframeObj = iframeUtils.createIframe(iframeUrl, function(r) {
    debug('err callback');
    self.emit('close', 1006, 'Unable to load an iframe (' + r + ')');
    self.close();
  });

  this.onmessageCallback = this._message.bind(this);
  eventUtils.attachEvent('message', this.onmessageCallback);
}

inherits(IframeTransport, EventEmitter);

IframeTransport.prototype.close = function() {
  debug('close');
  this.removeAllListeners();
  if (this.iframeObj) {
    eventUtils.detachEvent('message', this.onmessageCallback);
    try {
      // When the iframe is not loaded, IE raises an exception
      // on 'contentWindow'.
      this.postMessage('c');
    } catch (x) {
      // intentionally empty
    }
    this.iframeObj.cleanup();
    this.iframeObj = null;
    this.onmessageCallback = this.iframeObj = null;
  }
};

IframeTransport.prototype._message = function(e) {
  debug('message', e.data);
  if (!urlUtils.isOriginEqual(e.origin, this.origin)) {
    debug('not same origin', e.origin, this.origin);
    return;
  }

  var iframeMessage;
  try {
    iframeMessage = JSON3.parse(e.data);
  } catch (ignored) {
    debug('bad json', e.data);
    return;
  }

  if (iframeMessage.windowId !== this.windowId) {
    debug('mismatched window id', iframeMessage.windowId, this.windowId);
    return;
  }

  switch (iframeMessage.type) {
  case 's':
    this.iframeObj.loaded();
    // window global dependency
    this.postMessage('s', JSON3.stringify([
      version
    , this.transport
    , this.transUrl
    , this.baseUrl
    ]));
    break;
  case 't':
    this.emit('message', iframeMessage.data);
    break;
  case 'c':
    var cdata;
    try {
      cdata = JSON3.parse(iframeMessage.data);
    } catch (ignored) {
      debug('bad json', iframeMessage.data);
      return;
    }
    this.emit('close', cdata[0], cdata[1]);
    this.close();
    break;
  }
};

IframeTransport.prototype.postMessage = function(type, data) {
  debug('postMessage', type, data);
  this.iframeObj.post(JSON3.stringify({
    windowId: this.windowId
  , type: type
  , data: data || ''
  }), this.origin);
};

IframeTransport.prototype.send = function(message) {
  debug('send', message);
  this.postMessage('m', message);
};

IframeTransport.enabled = function() {
  return iframeUtils.iframeEnabled;
};

IframeTransport.transportName = 'iframe';
IframeTransport.roundTrips = 2;

module.exports = IframeTransport;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/transport/jsonp-polling.js":
/*!*******************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/transport/jsonp-polling.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// The simplest and most robust transport, using the well-know cross
// domain hack - JSONP. This transport is quite inefficient - one
// message could use up to one http request. But at least it works almost
// everywhere.
// Known limitations:
//   o you will get a spinning cursor
//   o for Konqueror a dumb timer is needed to detect errors

var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , SenderReceiver = __webpack_require__(/*! ./lib/sender-receiver */ "./node_modules/sockjs-client/lib/transport/lib/sender-receiver.js")
  , JsonpReceiver = __webpack_require__(/*! ./receiver/jsonp */ "./node_modules/sockjs-client/lib/transport/receiver/jsonp.js")
  , jsonpSender = __webpack_require__(/*! ./sender/jsonp */ "./node_modules/sockjs-client/lib/transport/sender/jsonp.js")
  ;

function JsonPTransport(transUrl) {
  if (!JsonPTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }
  SenderReceiver.call(this, transUrl, '/jsonp', jsonpSender, JsonpReceiver);
}

inherits(JsonPTransport, SenderReceiver);

JsonPTransport.enabled = function() {
  return !!__webpack_require__.g.document;
};

JsonPTransport.transportName = 'jsonp-polling';
JsonPTransport.roundTrips = 1;
JsonPTransport.needBody = true;

module.exports = JsonPTransport;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/transport/lib/ajax-based.js":
/*!********************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/transport/lib/ajax-based.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , urlUtils = __webpack_require__(/*! ../../utils/url */ "./node_modules/sockjs-client/lib/utils/url.js")
  , SenderReceiver = __webpack_require__(/*! ./sender-receiver */ "./node_modules/sockjs-client/lib/transport/lib/sender-receiver.js")
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(/*! debug */ "./node_modules/sockjs-client/node_modules/debug/src/browser.js")('sockjs-client:ajax-based');
}

function createAjaxSender(AjaxObject) {
  return function(url, payload, callback) {
    debug('create ajax sender', url, payload);
    var opt = {};
    if (typeof payload === 'string') {
      opt.headers = {'Content-type': 'text/plain'};
    }
    var ajaxUrl = urlUtils.addPath(url, '/xhr_send');
    var xo = new AjaxObject('POST', ajaxUrl, payload, opt);
    xo.once('finish', function(status) {
      debug('finish', status);
      xo = null;

      if (status !== 200 && status !== 204) {
        return callback(new Error('http status ' + status));
      }
      callback();
    });
    return function() {
      debug('abort');
      xo.close();
      xo = null;

      var err = new Error('Aborted');
      err.code = 1000;
      callback(err);
    };
  };
}

function AjaxBasedTransport(transUrl, urlSuffix, Receiver, AjaxObject) {
  SenderReceiver.call(this, transUrl, urlSuffix, createAjaxSender(AjaxObject), Receiver, AjaxObject);
}

inherits(AjaxBasedTransport, SenderReceiver);

module.exports = AjaxBasedTransport;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/transport/lib/buffered-sender.js":
/*!*************************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/transport/lib/buffered-sender.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , EventEmitter = (__webpack_require__(/*! events */ "./node_modules/sockjs-client/lib/event/emitter.js").EventEmitter)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(/*! debug */ "./node_modules/sockjs-client/node_modules/debug/src/browser.js")('sockjs-client:buffered-sender');
}

function BufferedSender(url, sender) {
  debug(url);
  EventEmitter.call(this);
  this.sendBuffer = [];
  this.sender = sender;
  this.url = url;
}

inherits(BufferedSender, EventEmitter);

BufferedSender.prototype.send = function(message) {
  debug('send', message);
  this.sendBuffer.push(message);
  if (!this.sendStop) {
    this.sendSchedule();
  }
};

// For polling transports in a situation when in the message callback,
// new message is being send. If the sending connection was started
// before receiving one, it is possible to saturate the network and
// timeout due to the lack of receiving socket. To avoid that we delay
// sending messages by some small time, in order to let receiving
// connection be started beforehand. This is only a halfmeasure and
// does not fix the big problem, but it does make the tests go more
// stable on slow networks.
BufferedSender.prototype.sendScheduleWait = function() {
  debug('sendScheduleWait');
  var self = this;
  var tref;
  this.sendStop = function() {
    debug('sendStop');
    self.sendStop = null;
    clearTimeout(tref);
  };
  tref = setTimeout(function() {
    debug('timeout');
    self.sendStop = null;
    self.sendSchedule();
  }, 25);
};

BufferedSender.prototype.sendSchedule = function() {
  debug('sendSchedule', this.sendBuffer.length);
  var self = this;
  if (this.sendBuffer.length > 0) {
    var payload = '[' + this.sendBuffer.join(',') + ']';
    this.sendStop = this.sender(this.url, payload, function(err) {
      self.sendStop = null;
      if (err) {
        debug('error', err);
        self.emit('close', err.code || 1006, 'Sending error: ' + err);
        self.close();
      } else {
        self.sendScheduleWait();
      }
    });
    this.sendBuffer = [];
  }
};

BufferedSender.prototype._cleanup = function() {
  debug('_cleanup');
  this.removeAllListeners();
};

BufferedSender.prototype.close = function() {
  debug('close');
  this._cleanup();
  if (this.sendStop) {
    this.sendStop();
    this.sendStop = null;
  }
};

module.exports = BufferedSender;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/transport/lib/iframe-wrap.js":
/*!*********************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/transport/lib/iframe-wrap.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , IframeTransport = __webpack_require__(/*! ../iframe */ "./node_modules/sockjs-client/lib/transport/iframe.js")
  , objectUtils = __webpack_require__(/*! ../../utils/object */ "./node_modules/sockjs-client/lib/utils/object.js")
  ;

module.exports = function(transport) {

  function IframeWrapTransport(transUrl, baseUrl) {
    IframeTransport.call(this, transport.transportName, transUrl, baseUrl);
  }

  inherits(IframeWrapTransport, IframeTransport);

  IframeWrapTransport.enabled = function(url, info) {
    if (!__webpack_require__.g.document) {
      return false;
    }

    var iframeInfo = objectUtils.extend({}, info);
    iframeInfo.sameOrigin = true;
    return transport.enabled(iframeInfo) && IframeTransport.enabled();
  };

  IframeWrapTransport.transportName = 'iframe-' + transport.transportName;
  IframeWrapTransport.needBody = true;
  IframeWrapTransport.roundTrips = IframeTransport.roundTrips + transport.roundTrips - 1; // html, javascript (2) + transport - no CORS (1)

  IframeWrapTransport.facadeTransport = transport;

  return IframeWrapTransport;
};


/***/ }),

/***/ "./node_modules/sockjs-client/lib/transport/lib/polling.js":
/*!*****************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/transport/lib/polling.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , EventEmitter = (__webpack_require__(/*! events */ "./node_modules/sockjs-client/lib/event/emitter.js").EventEmitter)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(/*! debug */ "./node_modules/sockjs-client/node_modules/debug/src/browser.js")('sockjs-client:polling');
}

function Polling(Receiver, receiveUrl, AjaxObject) {
  debug(receiveUrl);
  EventEmitter.call(this);
  this.Receiver = Receiver;
  this.receiveUrl = receiveUrl;
  this.AjaxObject = AjaxObject;
  this._scheduleReceiver();
}

inherits(Polling, EventEmitter);

Polling.prototype._scheduleReceiver = function() {
  debug('_scheduleReceiver');
  var self = this;
  var poll = this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);

  poll.on('message', function(msg) {
    debug('message', msg);
    self.emit('message', msg);
  });

  poll.once('close', function(code, reason) {
    debug('close', code, reason, self.pollIsClosing);
    self.poll = poll = null;

    if (!self.pollIsClosing) {
      if (reason === 'network') {
        self._scheduleReceiver();
      } else {
        self.emit('close', code || 1006, reason);
        self.removeAllListeners();
      }
    }
  });
};

Polling.prototype.abort = function() {
  debug('abort');
  this.removeAllListeners();
  this.pollIsClosing = true;
  if (this.poll) {
    this.poll.abort();
  }
};

module.exports = Polling;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/transport/lib/sender-receiver.js":
/*!*************************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/transport/lib/sender-receiver.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , urlUtils = __webpack_require__(/*! ../../utils/url */ "./node_modules/sockjs-client/lib/utils/url.js")
  , BufferedSender = __webpack_require__(/*! ./buffered-sender */ "./node_modules/sockjs-client/lib/transport/lib/buffered-sender.js")
  , Polling = __webpack_require__(/*! ./polling */ "./node_modules/sockjs-client/lib/transport/lib/polling.js")
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(/*! debug */ "./node_modules/sockjs-client/node_modules/debug/src/browser.js")('sockjs-client:sender-receiver');
}

function SenderReceiver(transUrl, urlSuffix, senderFunc, Receiver, AjaxObject) {
  var pollUrl = urlUtils.addPath(transUrl, urlSuffix);
  debug(pollUrl);
  var self = this;
  BufferedSender.call(this, transUrl, senderFunc);

  this.poll = new Polling(Receiver, pollUrl, AjaxObject);
  this.poll.on('message', function(msg) {
    debug('poll message', msg);
    self.emit('message', msg);
  });
  this.poll.once('close', function(code, reason) {
    debug('poll close', code, reason);
    self.poll = null;
    self.emit('close', code, reason);
    self.close();
  });
}

inherits(SenderReceiver, BufferedSender);

SenderReceiver.prototype.close = function() {
  BufferedSender.prototype.close.call(this);
  debug('close');
  this.removeAllListeners();
  if (this.poll) {
    this.poll.abort();
    this.poll = null;
  }
};

module.exports = SenderReceiver;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/transport/receiver/eventsource.js":
/*!**************************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/transport/receiver/eventsource.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , EventEmitter = (__webpack_require__(/*! events */ "./node_modules/sockjs-client/lib/event/emitter.js").EventEmitter)
  , EventSourceDriver = __webpack_require__(/*! eventsource */ "./node_modules/sockjs-client/lib/transport/browser/eventsource.js")
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(/*! debug */ "./node_modules/sockjs-client/node_modules/debug/src/browser.js")('sockjs-client:receiver:eventsource');
}

function EventSourceReceiver(url) {
  debug(url);
  EventEmitter.call(this);

  var self = this;
  var es = this.es = new EventSourceDriver(url);
  es.onmessage = function(e) {
    debug('message', e.data);
    self.emit('message', decodeURI(e.data));
  };
  es.onerror = function(e) {
    debug('error', es.readyState, e);
    // ES on reconnection has readyState = 0 or 1.
    // on network error it's CLOSED = 2
    var reason = (es.readyState !== 2 ? 'network' : 'permanent');
    self._cleanup();
    self._close(reason);
  };
}

inherits(EventSourceReceiver, EventEmitter);

EventSourceReceiver.prototype.abort = function() {
  debug('abort');
  this._cleanup();
  this._close('user');
};

EventSourceReceiver.prototype._cleanup = function() {
  debug('cleanup');
  var es = this.es;
  if (es) {
    es.onmessage = es.onerror = null;
    es.close();
    this.es = null;
  }
};

EventSourceReceiver.prototype._close = function(reason) {
  debug('close', reason);
  var self = this;
  // Safari and chrome < 15 crash if we close window before
  // waiting for ES cleanup. See:
  // https://code.google.com/p/chromium/issues/detail?id=89155
  setTimeout(function() {
    self.emit('close', null, reason);
    self.removeAllListeners();
  }, 200);
};

module.exports = EventSourceReceiver;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/transport/receiver/htmlfile.js":
/*!***********************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/transport/receiver/htmlfile.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , iframeUtils = __webpack_require__(/*! ../../utils/iframe */ "./node_modules/sockjs-client/lib/utils/iframe.js")
  , urlUtils = __webpack_require__(/*! ../../utils/url */ "./node_modules/sockjs-client/lib/utils/url.js")
  , EventEmitter = (__webpack_require__(/*! events */ "./node_modules/sockjs-client/lib/event/emitter.js").EventEmitter)
  , random = __webpack_require__(/*! ../../utils/random */ "./node_modules/sockjs-client/lib/utils/random.js")
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(/*! debug */ "./node_modules/sockjs-client/node_modules/debug/src/browser.js")('sockjs-client:receiver:htmlfile');
}

function HtmlfileReceiver(url) {
  debug(url);
  EventEmitter.call(this);
  var self = this;
  iframeUtils.polluteGlobalNamespace();

  this.id = 'a' + random.string(6);
  url = urlUtils.addQuery(url, 'c=' + decodeURIComponent(iframeUtils.WPrefix + '.' + this.id));

  debug('using htmlfile', HtmlfileReceiver.htmlfileEnabled);
  var constructFunc = HtmlfileReceiver.htmlfileEnabled ?
      iframeUtils.createHtmlfile : iframeUtils.createIframe;

  __webpack_require__.g[iframeUtils.WPrefix][this.id] = {
    start: function() {
      debug('start');
      self.iframeObj.loaded();
    }
  , message: function(data) {
      debug('message', data);
      self.emit('message', data);
    }
  , stop: function() {
      debug('stop');
      self._cleanup();
      self._close('network');
    }
  };
  this.iframeObj = constructFunc(url, function() {
    debug('callback');
    self._cleanup();
    self._close('permanent');
  });
}

inherits(HtmlfileReceiver, EventEmitter);

HtmlfileReceiver.prototype.abort = function() {
  debug('abort');
  this._cleanup();
  this._close('user');
};

HtmlfileReceiver.prototype._cleanup = function() {
  debug('_cleanup');
  if (this.iframeObj) {
    this.iframeObj.cleanup();
    this.iframeObj = null;
  }
  delete __webpack_require__.g[iframeUtils.WPrefix][this.id];
};

HtmlfileReceiver.prototype._close = function(reason) {
  debug('_close', reason);
  this.emit('close', null, reason);
  this.removeAllListeners();
};

HtmlfileReceiver.htmlfileEnabled = false;

// obfuscate to avoid firewalls
var axo = ['Active'].concat('Object').join('X');
if (axo in __webpack_require__.g) {
  try {
    HtmlfileReceiver.htmlfileEnabled = !!new __webpack_require__.g[axo]('htmlfile');
  } catch (x) {
    // intentionally empty
  }
}

HtmlfileReceiver.enabled = HtmlfileReceiver.htmlfileEnabled || iframeUtils.iframeEnabled;

module.exports = HtmlfileReceiver;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/transport/receiver/jsonp.js":
/*!********************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/transport/receiver/jsonp.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../../utils/iframe */ "./node_modules/sockjs-client/lib/utils/iframe.js")
  , random = __webpack_require__(/*! ../../utils/random */ "./node_modules/sockjs-client/lib/utils/random.js")
  , browser = __webpack_require__(/*! ../../utils/browser */ "./node_modules/sockjs-client/lib/utils/browser.js")
  , urlUtils = __webpack_require__(/*! ../../utils/url */ "./node_modules/sockjs-client/lib/utils/url.js")
  , inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , EventEmitter = (__webpack_require__(/*! events */ "./node_modules/sockjs-client/lib/event/emitter.js").EventEmitter)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(/*! debug */ "./node_modules/sockjs-client/node_modules/debug/src/browser.js")('sockjs-client:receiver:jsonp');
}

function JsonpReceiver(url) {
  debug(url);
  var self = this;
  EventEmitter.call(this);

  utils.polluteGlobalNamespace();

  this.id = 'a' + random.string(6);
  var urlWithId = urlUtils.addQuery(url, 'c=' + encodeURIComponent(utils.WPrefix + '.' + this.id));

  __webpack_require__.g[utils.WPrefix][this.id] = this._callback.bind(this);
  this._createScript(urlWithId);

  // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.
  this.timeoutId = setTimeout(function() {
    debug('timeout');
    self._abort(new Error('JSONP script loaded abnormally (timeout)'));
  }, JsonpReceiver.timeout);
}

inherits(JsonpReceiver, EventEmitter);

JsonpReceiver.prototype.abort = function() {
  debug('abort');
  if (__webpack_require__.g[utils.WPrefix][this.id]) {
    var err = new Error('JSONP user aborted read');
    err.code = 1000;
    this._abort(err);
  }
};

JsonpReceiver.timeout = 35000;
JsonpReceiver.scriptErrorTimeout = 1000;

JsonpReceiver.prototype._callback = function(data) {
  debug('_callback', data);
  this._cleanup();

  if (this.aborting) {
    return;
  }

  if (data) {
    debug('message', data);
    this.emit('message', data);
  }
  this.emit('close', null, 'network');
  this.removeAllListeners();
};

JsonpReceiver.prototype._abort = function(err) {
  debug('_abort', err);
  this._cleanup();
  this.aborting = true;
  this.emit('close', err.code, err.message);
  this.removeAllListeners();
};

JsonpReceiver.prototype._cleanup = function() {
  debug('_cleanup');
  clearTimeout(this.timeoutId);
  if (this.script2) {
    this.script2.parentNode.removeChild(this.script2);
    this.script2 = null;
  }
  if (this.script) {
    var script = this.script;
    // Unfortunately, you can't really abort script loading of
    // the script.
    script.parentNode.removeChild(script);
    script.onreadystatechange = script.onerror =
        script.onload = script.onclick = null;
    this.script = null;
  }
  delete __webpack_require__.g[utils.WPrefix][this.id];
};

JsonpReceiver.prototype._scriptError = function() {
  debug('_scriptError');
  var self = this;
  if (this.errorTimer) {
    return;
  }

  this.errorTimer = setTimeout(function() {
    if (!self.loadedOkay) {
      self._abort(new Error('JSONP script loaded abnormally (onerror)'));
    }
  }, JsonpReceiver.scriptErrorTimeout);
};

JsonpReceiver.prototype._createScript = function(url) {
  debug('_createScript', url);
  var self = this;
  var script = this.script = __webpack_require__.g.document.createElement('script');
  var script2;  // Opera synchronous load trick.

  script.id = 'a' + random.string(8);
  script.src = url;
  script.type = 'text/javascript';
  script.charset = 'UTF-8';
  script.onerror = this._scriptError.bind(this);
  script.onload = function() {
    debug('onload');
    self._abort(new Error('JSONP script loaded abnormally (onload)'));
  };

  // IE9 fires 'error' event after onreadystatechange or before, in random order.
  // Use loadedOkay to determine if actually errored
  script.onreadystatechange = function() {
    debug('onreadystatechange', script.readyState);
    if (/loaded|closed/.test(script.readyState)) {
      if (script && script.htmlFor && script.onclick) {
        self.loadedOkay = true;
        try {
          // In IE, actually execute the script.
          script.onclick();
        } catch (x) {
          // intentionally empty
        }
      }
      if (script) {
        self._abort(new Error('JSONP script loaded abnormally (onreadystatechange)'));
      }
    }
  };
  // IE: event/htmlFor/onclick trick.
  // One can't rely on proper order for onreadystatechange. In order to
  // make sure, set a 'htmlFor' and 'event' properties, so that
  // script code will be installed as 'onclick' handler for the
  // script object. Later, onreadystatechange, manually execute this
  // code. FF and Chrome doesn't work with 'event' and 'htmlFor'
  // set. For reference see:
  //   http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
  // Also, read on that about script ordering:
  //   http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
  if (typeof script.async === 'undefined' && __webpack_require__.g.document.attachEvent) {
    // According to mozilla docs, in recent browsers script.async defaults
    // to 'true', so we may use it to detect a good browser:
    // https://developer.mozilla.org/en/HTML/Element/script
    if (!browser.isOpera()) {
      // Naively assume we're in IE
      try {
        script.htmlFor = script.id;
        script.event = 'onclick';
      } catch (x) {
        // intentionally empty
      }
      script.async = true;
    } else {
      // Opera, second sync script hack
      script2 = this.script2 = __webpack_require__.g.document.createElement('script');
      script2.text = "try{var a = document.getElementById('" + script.id + "'); if(a)a.onerror();}catch(x){};";
      script.async = script2.async = false;
    }
  }
  if (typeof script.async !== 'undefined') {
    script.async = true;
  }

  var head = __webpack_require__.g.document.getElementsByTagName('head')[0];
  head.insertBefore(script, head.firstChild);
  if (script2) {
    head.insertBefore(script2, head.firstChild);
  }
};

module.exports = JsonpReceiver;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/transport/receiver/xhr.js":
/*!******************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/transport/receiver/xhr.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , EventEmitter = (__webpack_require__(/*! events */ "./node_modules/sockjs-client/lib/event/emitter.js").EventEmitter)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(/*! debug */ "./node_modules/sockjs-client/node_modules/debug/src/browser.js")('sockjs-client:receiver:xhr');
}

function XhrReceiver(url, AjaxObject) {
  debug(url);
  EventEmitter.call(this);
  var self = this;

  this.bufferPosition = 0;

  this.xo = new AjaxObject('POST', url, null);
  this.xo.on('chunk', this._chunkHandler.bind(this));
  this.xo.once('finish', function(status, text) {
    debug('finish', status, text);
    self._chunkHandler(status, text);
    self.xo = null;
    var reason = status === 200 ? 'network' : 'permanent';
    debug('close', reason);
    self.emit('close', null, reason);
    self._cleanup();
  });
}

inherits(XhrReceiver, EventEmitter);

XhrReceiver.prototype._chunkHandler = function(status, text) {
  debug('_chunkHandler', status);
  if (status !== 200 || !text) {
    return;
  }

  for (var idx = -1; ; this.bufferPosition += idx + 1) {
    var buf = text.slice(this.bufferPosition);
    idx = buf.indexOf('\n');
    if (idx === -1) {
      break;
    }
    var msg = buf.slice(0, idx);
    if (msg) {
      debug('message', msg);
      this.emit('message', msg);
    }
  }
};

XhrReceiver.prototype._cleanup = function() {
  debug('_cleanup');
  this.removeAllListeners();
};

XhrReceiver.prototype.abort = function() {
  debug('abort');
  if (this.xo) {
    this.xo.close();
    debug('close');
    this.emit('close', null, 'user');
    this.xo = null;
  }
  this._cleanup();
};

module.exports = XhrReceiver;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/transport/sender/jsonp.js":
/*!******************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/transport/sender/jsonp.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var random = __webpack_require__(/*! ../../utils/random */ "./node_modules/sockjs-client/lib/utils/random.js")
  , urlUtils = __webpack_require__(/*! ../../utils/url */ "./node_modules/sockjs-client/lib/utils/url.js")
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(/*! debug */ "./node_modules/sockjs-client/node_modules/debug/src/browser.js")('sockjs-client:sender:jsonp');
}

var form, area;

function createIframe(id) {
  debug('createIframe', id);
  try {
    // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
    return __webpack_require__.g.document.createElement('<iframe name="' + id + '">');
  } catch (x) {
    var iframe = __webpack_require__.g.document.createElement('iframe');
    iframe.name = id;
    return iframe;
  }
}

function createForm() {
  debug('createForm');
  form = __webpack_require__.g.document.createElement('form');
  form.style.display = 'none';
  form.style.position = 'absolute';
  form.method = 'POST';
  form.enctype = 'application/x-www-form-urlencoded';
  form.acceptCharset = 'UTF-8';

  area = __webpack_require__.g.document.createElement('textarea');
  area.name = 'd';
  form.appendChild(area);

  __webpack_require__.g.document.body.appendChild(form);
}

module.exports = function(url, payload, callback) {
  debug(url, payload);
  if (!form) {
    createForm();
  }
  var id = 'a' + random.string(8);
  form.target = id;
  form.action = urlUtils.addQuery(urlUtils.addPath(url, '/jsonp_send'), 'i=' + id);

  var iframe = createIframe(id);
  iframe.id = id;
  iframe.style.display = 'none';
  form.appendChild(iframe);

  try {
    area.value = payload;
  } catch (e) {
    // seriously broken browsers get here
  }
  form.submit();

  var completed = function(err) {
    debug('completed', id, err);
    if (!iframe.onerror) {
      return;
    }
    iframe.onreadystatechange = iframe.onerror = iframe.onload = null;
    // Opera mini doesn't like if we GC iframe
    // immediately, thus this timeout.
    setTimeout(function() {
      debug('cleaning up', id);
      iframe.parentNode.removeChild(iframe);
      iframe = null;
    }, 500);
    area.value = '';
    // It is not possible to detect if the iframe succeeded or
    // failed to submit our form.
    callback(err);
  };
  iframe.onerror = function() {
    debug('onerror', id);
    completed();
  };
  iframe.onload = function() {
    debug('onload', id);
    completed();
  };
  iframe.onreadystatechange = function(e) {
    debug('onreadystatechange', id, iframe.readyState, e);
    if (iframe.readyState === 'complete') {
      completed();
    }
  };
  return function() {
    debug('aborted', id);
    completed(new Error('Aborted'));
  };
};


/***/ }),

/***/ "./node_modules/sockjs-client/lib/transport/sender/xdr.js":
/*!****************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/transport/sender/xdr.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var EventEmitter = (__webpack_require__(/*! events */ "./node_modules/sockjs-client/lib/event/emitter.js").EventEmitter)
  , inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , eventUtils = __webpack_require__(/*! ../../utils/event */ "./node_modules/sockjs-client/lib/utils/event.js")
  , browser = __webpack_require__(/*! ../../utils/browser */ "./node_modules/sockjs-client/lib/utils/browser.js")
  , urlUtils = __webpack_require__(/*! ../../utils/url */ "./node_modules/sockjs-client/lib/utils/url.js")
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(/*! debug */ "./node_modules/sockjs-client/node_modules/debug/src/browser.js")('sockjs-client:sender:xdr');
}

// References:
//   http://ajaxian.com/archives/100-line-ajax-wrapper
//   http://msdn.microsoft.com/en-us/library/cc288060(v=VS.85).aspx

function XDRObject(method, url, payload) {
  debug(method, url);
  var self = this;
  EventEmitter.call(this);

  setTimeout(function() {
    self._start(method, url, payload);
  }, 0);
}

inherits(XDRObject, EventEmitter);

XDRObject.prototype._start = function(method, url, payload) {
  debug('_start');
  var self = this;
  var xdr = new __webpack_require__.g.XDomainRequest();
  // IE caches even POSTs
  url = urlUtils.addQuery(url, 't=' + (+new Date()));

  xdr.onerror = function() {
    debug('onerror');
    self._error();
  };
  xdr.ontimeout = function() {
    debug('ontimeout');
    self._error();
  };
  xdr.onprogress = function() {
    debug('progress', xdr.responseText);
    self.emit('chunk', 200, xdr.responseText);
  };
  xdr.onload = function() {
    debug('load');
    self.emit('finish', 200, xdr.responseText);
    self._cleanup(false);
  };
  this.xdr = xdr;
  this.unloadRef = eventUtils.unloadAdd(function() {
    self._cleanup(true);
  });
  try {
    // Fails with AccessDenied if port number is bogus
    this.xdr.open(method, url);
    if (this.timeout) {
      this.xdr.timeout = this.timeout;
    }
    this.xdr.send(payload);
  } catch (x) {
    this._error();
  }
};

XDRObject.prototype._error = function() {
  this.emit('finish', 0, '');
  this._cleanup(false);
};

XDRObject.prototype._cleanup = function(abort) {
  debug('cleanup', abort);
  if (!this.xdr) {
    return;
  }
  this.removeAllListeners();
  eventUtils.unloadDel(this.unloadRef);

  this.xdr.ontimeout = this.xdr.onerror = this.xdr.onprogress = this.xdr.onload = null;
  if (abort) {
    try {
      this.xdr.abort();
    } catch (x) {
      // intentionally empty
    }
  }
  this.unloadRef = this.xdr = null;
};

XDRObject.prototype.close = function() {
  debug('close');
  this._cleanup(true);
};

// IE 8/9 if the request target uses the same scheme - #79
XDRObject.enabled = !!(__webpack_require__.g.XDomainRequest && browser.hasDomain());

module.exports = XDRObject;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/transport/sender/xhr-cors.js":
/*!*********************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/transport/sender/xhr-cors.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , XhrDriver = __webpack_require__(/*! ../driver/xhr */ "./node_modules/sockjs-client/lib/transport/browser/abstract-xhr.js")
  ;

function XHRCorsObject(method, url, payload, opts) {
  XhrDriver.call(this, method, url, payload, opts);
}

inherits(XHRCorsObject, XhrDriver);

XHRCorsObject.enabled = XhrDriver.enabled && XhrDriver.supportsCORS;

module.exports = XHRCorsObject;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/transport/sender/xhr-fake.js":
/*!*********************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/transport/sender/xhr-fake.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var EventEmitter = (__webpack_require__(/*! events */ "./node_modules/sockjs-client/lib/event/emitter.js").EventEmitter)
  , inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  ;

function XHRFake(/* method, url, payload, opts */) {
  var self = this;
  EventEmitter.call(this);

  this.to = setTimeout(function() {
    self.emit('finish', 200, '{}');
  }, XHRFake.timeout);
}

inherits(XHRFake, EventEmitter);

XHRFake.prototype.close = function() {
  clearTimeout(this.to);
};

XHRFake.timeout = 2000;

module.exports = XHRFake;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/transport/sender/xhr-local.js":
/*!**********************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/transport/sender/xhr-local.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , XhrDriver = __webpack_require__(/*! ../driver/xhr */ "./node_modules/sockjs-client/lib/transport/browser/abstract-xhr.js")
  ;

function XHRLocalObject(method, url, payload /*, opts */) {
  XhrDriver.call(this, method, url, payload, {
    noCredentials: true
  });
}

inherits(XHRLocalObject, XhrDriver);

XHRLocalObject.enabled = XhrDriver.enabled;

module.exports = XHRLocalObject;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/transport/websocket.js":
/*!***************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/transport/websocket.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils/event */ "./node_modules/sockjs-client/lib/utils/event.js")
  , urlUtils = __webpack_require__(/*! ../utils/url */ "./node_modules/sockjs-client/lib/utils/url.js")
  , inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , EventEmitter = (__webpack_require__(/*! events */ "./node_modules/sockjs-client/lib/event/emitter.js").EventEmitter)
  , WebsocketDriver = __webpack_require__(/*! ./driver/websocket */ "./node_modules/sockjs-client/lib/transport/browser/websocket.js")
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(/*! debug */ "./node_modules/sockjs-client/node_modules/debug/src/browser.js")('sockjs-client:websocket');
}

function WebSocketTransport(transUrl, ignore, options) {
  if (!WebSocketTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }

  EventEmitter.call(this);
  debug('constructor', transUrl);

  var self = this;
  var url = urlUtils.addPath(transUrl, '/websocket');
  if (url.slice(0, 5) === 'https') {
    url = 'wss' + url.slice(5);
  } else {
    url = 'ws' + url.slice(4);
  }
  this.url = url;

  this.ws = new WebsocketDriver(this.url, [], options);
  this.ws.onmessage = function(e) {
    debug('message event', e.data);
    self.emit('message', e.data);
  };
  // Firefox has an interesting bug. If a websocket connection is
  // created after onunload, it stays alive even when user
  // navigates away from the page. In such situation let's lie -
  // let's not open the ws connection at all. See:
  // https://github.com/sockjs/sockjs-client/issues/28
  // https://bugzilla.mozilla.org/show_bug.cgi?id=696085
  this.unloadRef = utils.unloadAdd(function() {
    debug('unload');
    self.ws.close();
  });
  this.ws.onclose = function(e) {
    debug('close event', e.code, e.reason);
    self.emit('close', e.code, e.reason);
    self._cleanup();
  };
  this.ws.onerror = function(e) {
    debug('error event', e);
    self.emit('close', 1006, 'WebSocket connection broken');
    self._cleanup();
  };
}

inherits(WebSocketTransport, EventEmitter);

WebSocketTransport.prototype.send = function(data) {
  var msg = '[' + data + ']';
  debug('send', msg);
  this.ws.send(msg);
};

WebSocketTransport.prototype.close = function() {
  debug('close');
  var ws = this.ws;
  this._cleanup();
  if (ws) {
    ws.close();
  }
};

WebSocketTransport.prototype._cleanup = function() {
  debug('_cleanup');
  var ws = this.ws;
  if (ws) {
    ws.onmessage = ws.onclose = ws.onerror = null;
  }
  utils.unloadDel(this.unloadRef);
  this.unloadRef = this.ws = null;
  this.removeAllListeners();
};

WebSocketTransport.enabled = function() {
  debug('enabled');
  return !!WebsocketDriver;
};
WebSocketTransport.transportName = 'websocket';

// In theory, ws should require 1 round trip. But in chrome, this is
// not very stable over SSL. Most likely a ws connection requires a
// separate SSL connection, in which case 2 round trips are an
// absolute minumum.
WebSocketTransport.roundTrips = 2;

module.exports = WebSocketTransport;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/transport/xdr-polling.js":
/*!*****************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/transport/xdr-polling.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , AjaxBasedTransport = __webpack_require__(/*! ./lib/ajax-based */ "./node_modules/sockjs-client/lib/transport/lib/ajax-based.js")
  , XdrStreamingTransport = __webpack_require__(/*! ./xdr-streaming */ "./node_modules/sockjs-client/lib/transport/xdr-streaming.js")
  , XhrReceiver = __webpack_require__(/*! ./receiver/xhr */ "./node_modules/sockjs-client/lib/transport/receiver/xhr.js")
  , XDRObject = __webpack_require__(/*! ./sender/xdr */ "./node_modules/sockjs-client/lib/transport/sender/xdr.js")
  ;

function XdrPollingTransport(transUrl) {
  if (!XDRObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XDRObject);
}

inherits(XdrPollingTransport, AjaxBasedTransport);

XdrPollingTransport.enabled = XdrStreamingTransport.enabled;
XdrPollingTransport.transportName = 'xdr-polling';
XdrPollingTransport.roundTrips = 2; // preflight, ajax

module.exports = XdrPollingTransport;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/transport/xdr-streaming.js":
/*!*******************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/transport/xdr-streaming.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , AjaxBasedTransport = __webpack_require__(/*! ./lib/ajax-based */ "./node_modules/sockjs-client/lib/transport/lib/ajax-based.js")
  , XhrReceiver = __webpack_require__(/*! ./receiver/xhr */ "./node_modules/sockjs-client/lib/transport/receiver/xhr.js")
  , XDRObject = __webpack_require__(/*! ./sender/xdr */ "./node_modules/sockjs-client/lib/transport/sender/xdr.js")
  ;

// According to:
//   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
//   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/

function XdrStreamingTransport(transUrl) {
  if (!XDRObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XDRObject);
}

inherits(XdrStreamingTransport, AjaxBasedTransport);

XdrStreamingTransport.enabled = function(info) {
  if (info.cookie_needed || info.nullOrigin) {
    return false;
  }
  return XDRObject.enabled && info.sameScheme;
};

XdrStreamingTransport.transportName = 'xdr-streaming';
XdrStreamingTransport.roundTrips = 2; // preflight, ajax

module.exports = XdrStreamingTransport;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/transport/xhr-polling.js":
/*!*****************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/transport/xhr-polling.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , AjaxBasedTransport = __webpack_require__(/*! ./lib/ajax-based */ "./node_modules/sockjs-client/lib/transport/lib/ajax-based.js")
  , XhrReceiver = __webpack_require__(/*! ./receiver/xhr */ "./node_modules/sockjs-client/lib/transport/receiver/xhr.js")
  , XHRCorsObject = __webpack_require__(/*! ./sender/xhr-cors */ "./node_modules/sockjs-client/lib/transport/sender/xhr-cors.js")
  , XHRLocalObject = __webpack_require__(/*! ./sender/xhr-local */ "./node_modules/sockjs-client/lib/transport/sender/xhr-local.js")
  ;

function XhrPollingTransport(transUrl) {
  if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XHRCorsObject);
}

inherits(XhrPollingTransport, AjaxBasedTransport);

XhrPollingTransport.enabled = function(info) {
  if (info.nullOrigin) {
    return false;
  }

  if (XHRLocalObject.enabled && info.sameOrigin) {
    return true;
  }
  return XHRCorsObject.enabled;
};

XhrPollingTransport.transportName = 'xhr-polling';
XhrPollingTransport.roundTrips = 2; // preflight, ajax

module.exports = XhrPollingTransport;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/transport/xhr-streaming.js":
/*!*******************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/transport/xhr-streaming.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
  , AjaxBasedTransport = __webpack_require__(/*! ./lib/ajax-based */ "./node_modules/sockjs-client/lib/transport/lib/ajax-based.js")
  , XhrReceiver = __webpack_require__(/*! ./receiver/xhr */ "./node_modules/sockjs-client/lib/transport/receiver/xhr.js")
  , XHRCorsObject = __webpack_require__(/*! ./sender/xhr-cors */ "./node_modules/sockjs-client/lib/transport/sender/xhr-cors.js")
  , XHRLocalObject = __webpack_require__(/*! ./sender/xhr-local */ "./node_modules/sockjs-client/lib/transport/sender/xhr-local.js")
  , browser = __webpack_require__(/*! ../utils/browser */ "./node_modules/sockjs-client/lib/utils/browser.js")
  ;

function XhrStreamingTransport(transUrl) {
  if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XHRCorsObject);
}

inherits(XhrStreamingTransport, AjaxBasedTransport);

XhrStreamingTransport.enabled = function(info) {
  if (info.nullOrigin) {
    return false;
  }
  // Opera doesn't support xhr-streaming #60
  // But it might be able to #92
  if (browser.isOpera()) {
    return false;
  }

  return XHRCorsObject.enabled;
};

XhrStreamingTransport.transportName = 'xhr-streaming';
XhrStreamingTransport.roundTrips = 2; // preflight, ajax

// Safari gets confused when a streaming ajax request is started
// before onload. This causes the load indicator to spin indefinetely.
// Only require body when used in a browser
XhrStreamingTransport.needBody = !!__webpack_require__.g.document;

module.exports = XhrStreamingTransport;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/utils/browser-crypto.js":
/*!****************************************************************!*\
  !*** ./node_modules/sockjs-client/lib/utils/browser-crypto.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (__webpack_require__.g.crypto && __webpack_require__.g.crypto.getRandomValues) {
  module.exports.randomBytes = function(length) {
    var bytes = new Uint8Array(length);
    __webpack_require__.g.crypto.getRandomValues(bytes);
    return bytes;
  };
} else {
  module.exports.randomBytes = function(length) {
    var bytes = new Array(length);
    for (var i = 0; i < length; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
    return bytes;
  };
}


/***/ }),

/***/ "./node_modules/sockjs-client/lib/utils/browser.js":
/*!*********************************************************!*\
  !*** ./node_modules/sockjs-client/lib/utils/browser.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = {
  isOpera: function() {
    return __webpack_require__.g.navigator &&
      /opera/i.test(__webpack_require__.g.navigator.userAgent);
  }

, isKonqueror: function() {
    return __webpack_require__.g.navigator &&
      /konqueror/i.test(__webpack_require__.g.navigator.userAgent);
  }

  // #187 wrap document.domain in try/catch because of WP8 from file:///
, hasDomain: function () {
    // non-browser client always has a domain
    if (!__webpack_require__.g.document) {
      return true;
    }

    try {
      return !!__webpack_require__.g.document.domain;
    } catch (e) {
      return false;
    }
  }
};


/***/ }),

/***/ "./node_modules/sockjs-client/lib/utils/escape.js":
/*!********************************************************!*\
  !*** ./node_modules/sockjs-client/lib/utils/escape.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var JSON3 = __webpack_require__(/*! json3 */ "./node_modules/json3/lib/json3.js");

// Some extra characters that Chrome gets wrong, and substitutes with
// something else on the wire.
// eslint-disable-next-line no-control-regex, no-misleading-character-class
var extraEscapable = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g
  , extraLookup;

// This may be quite slow, so let's delay until user actually uses bad
// characters.
var unrollLookup = function(escapable) {
  var i;
  var unrolled = {};
  var c = [];
  for (i = 0; i < 65536; i++) {
    c.push( String.fromCharCode(i) );
  }
  escapable.lastIndex = 0;
  c.join('').replace(escapable, function(a) {
    unrolled[ a ] = '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    return '';
  });
  escapable.lastIndex = 0;
  return unrolled;
};

// Quote string, also taking care of unicode characters that browsers
// often break. Especially, take care of unicode surrogates:
// http://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates
module.exports = {
  quote: function(string) {
    var quoted = JSON3.stringify(string);

    // In most cases this should be very fast and good enough.
    extraEscapable.lastIndex = 0;
    if (!extraEscapable.test(quoted)) {
      return quoted;
    }

    if (!extraLookup) {
      extraLookup = unrollLookup(extraEscapable);
    }

    return quoted.replace(extraEscapable, function(a) {
      return extraLookup[a];
    });
  }
};


/***/ }),

/***/ "./node_modules/sockjs-client/lib/utils/event.js":
/*!*******************************************************!*\
  !*** ./node_modules/sockjs-client/lib/utils/event.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var random = __webpack_require__(/*! ./random */ "./node_modules/sockjs-client/lib/utils/random.js");

var onUnload = {}
  , afterUnload = false
    // detect google chrome packaged apps because they don't allow the 'unload' event
  , isChromePackagedApp = __webpack_require__.g.chrome && __webpack_require__.g.chrome.app && __webpack_require__.g.chrome.app.runtime
  ;

module.exports = {
  attachEvent: function(event, listener) {
    if (typeof __webpack_require__.g.addEventListener !== 'undefined') {
      __webpack_require__.g.addEventListener(event, listener, false);
    } else if (__webpack_require__.g.document && __webpack_require__.g.attachEvent) {
      // IE quirks.
      // According to: http://stevesouders.com/misc/test-postmessage.php
      // the message gets delivered only to 'document', not 'window'.
      __webpack_require__.g.document.attachEvent('on' + event, listener);
      // I get 'window' for ie8.
      __webpack_require__.g.attachEvent('on' + event, listener);
    }
  }

, detachEvent: function(event, listener) {
    if (typeof __webpack_require__.g.addEventListener !== 'undefined') {
      __webpack_require__.g.removeEventListener(event, listener, false);
    } else if (__webpack_require__.g.document && __webpack_require__.g.detachEvent) {
      __webpack_require__.g.document.detachEvent('on' + event, listener);
      __webpack_require__.g.detachEvent('on' + event, listener);
    }
  }

, unloadAdd: function(listener) {
    if (isChromePackagedApp) {
      return null;
    }

    var ref = random.string(8);
    onUnload[ref] = listener;
    if (afterUnload) {
      setTimeout(this.triggerUnloadCallbacks, 0);
    }
    return ref;
  }

, unloadDel: function(ref) {
    if (ref in onUnload) {
      delete onUnload[ref];
    }
  }

, triggerUnloadCallbacks: function() {
    for (var ref in onUnload) {
      onUnload[ref]();
      delete onUnload[ref];
    }
  }
};

var unloadTriggered = function() {
  if (afterUnload) {
    return;
  }
  afterUnload = true;
  module.exports.triggerUnloadCallbacks();
};

// 'unload' alone is not reliable in opera within an iframe, but we
// can't use `beforeunload` as IE fires it on javascript: links.
if (!isChromePackagedApp) {
  module.exports.attachEvent('unload', unloadTriggered);
}


/***/ }),

/***/ "./node_modules/sockjs-client/lib/utils/iframe.js":
/*!********************************************************!*\
  !*** ./node_modules/sockjs-client/lib/utils/iframe.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var eventUtils = __webpack_require__(/*! ./event */ "./node_modules/sockjs-client/lib/utils/event.js")
  , JSON3 = __webpack_require__(/*! json3 */ "./node_modules/json3/lib/json3.js")
  , browser = __webpack_require__(/*! ./browser */ "./node_modules/sockjs-client/lib/utils/browser.js")
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(/*! debug */ "./node_modules/sockjs-client/node_modules/debug/src/browser.js")('sockjs-client:utils:iframe');
}

module.exports = {
  WPrefix: '_jp'
, currentWindowId: null

, polluteGlobalNamespace: function() {
    if (!(module.exports.WPrefix in __webpack_require__.g)) {
      __webpack_require__.g[module.exports.WPrefix] = {};
    }
  }

, postMessage: function(type, data) {
    if (__webpack_require__.g.parent !== __webpack_require__.g) {
      __webpack_require__.g.parent.postMessage(JSON3.stringify({
        windowId: module.exports.currentWindowId
      , type: type
      , data: data || ''
      }), '*');
    } else {
      debug('Cannot postMessage, no parent window.', type, data);
    }
  }

, createIframe: function(iframeUrl, errorCallback) {
    var iframe = __webpack_require__.g.document.createElement('iframe');
    var tref, unloadRef;
    var unattach = function() {
      debug('unattach');
      clearTimeout(tref);
      // Explorer had problems with that.
      try {
        iframe.onload = null;
      } catch (x) {
        // intentionally empty
      }
      iframe.onerror = null;
    };
    var cleanup = function() {
      debug('cleanup');
      if (iframe) {
        unattach();
        // This timeout makes chrome fire onbeforeunload event
        // within iframe. Without the timeout it goes straight to
        // onunload.
        setTimeout(function() {
          if (iframe) {
            iframe.parentNode.removeChild(iframe);
          }
          iframe = null;
        }, 0);
        eventUtils.unloadDel(unloadRef);
      }
    };
    var onerror = function(err) {
      debug('onerror', err);
      if (iframe) {
        cleanup();
        errorCallback(err);
      }
    };
    var post = function(msg, origin) {
      debug('post', msg, origin);
      setTimeout(function() {
        try {
          // When the iframe is not loaded, IE raises an exception
          // on 'contentWindow'.
          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(msg, origin);
          }
        } catch (x) {
          // intentionally empty
        }
      }, 0);
    };

    iframe.src = iframeUrl;
    iframe.style.display = 'none';
    iframe.style.position = 'absolute';
    iframe.onerror = function() {
      onerror('onerror');
    };
    iframe.onload = function() {
      debug('onload');
      // `onload` is triggered before scripts on the iframe are
      // executed. Give it few seconds to actually load stuff.
      clearTimeout(tref);
      tref = setTimeout(function() {
        onerror('onload timeout');
      }, 2000);
    };
    __webpack_require__.g.document.body.appendChild(iframe);
    tref = setTimeout(function() {
      onerror('timeout');
    }, 15000);
    unloadRef = eventUtils.unloadAdd(cleanup);
    return {
      post: post
    , cleanup: cleanup
    , loaded: unattach
    };
  }

/* eslint no-undef: "off", new-cap: "off" */
, createHtmlfile: function(iframeUrl, errorCallback) {
    var axo = ['Active'].concat('Object').join('X');
    var doc = new __webpack_require__.g[axo]('htmlfile');
    var tref, unloadRef;
    var iframe;
    var unattach = function() {
      clearTimeout(tref);
      iframe.onerror = null;
    };
    var cleanup = function() {
      if (doc) {
        unattach();
        eventUtils.unloadDel(unloadRef);
        iframe.parentNode.removeChild(iframe);
        iframe = doc = null;
        CollectGarbage();
      }
    };
    var onerror = function(r) {
      debug('onerror', r);
      if (doc) {
        cleanup();
        errorCallback(r);
      }
    };
    var post = function(msg, origin) {
      try {
        // When the iframe is not loaded, IE raises an exception
        // on 'contentWindow'.
        setTimeout(function() {
          if (iframe && iframe.contentWindow) {
              iframe.contentWindow.postMessage(msg, origin);
          }
        }, 0);
      } catch (x) {
        // intentionally empty
      }
    };

    doc.open();
    doc.write('<html><s' + 'cript>' +
              'document.domain="' + __webpack_require__.g.document.domain + '";' +
              '</s' + 'cript></html>');
    doc.close();
    doc.parentWindow[module.exports.WPrefix] = __webpack_require__.g[module.exports.WPrefix];
    var c = doc.createElement('div');
    doc.body.appendChild(c);
    iframe = doc.createElement('iframe');
    c.appendChild(iframe);
    iframe.src = iframeUrl;
    iframe.onerror = function() {
      onerror('onerror');
    };
    tref = setTimeout(function() {
      onerror('timeout');
    }, 15000);
    unloadRef = eventUtils.unloadAdd(cleanup);
    return {
      post: post
    , cleanup: cleanup
    , loaded: unattach
    };
  }
};

module.exports.iframeEnabled = false;
if (__webpack_require__.g.document) {
  // postMessage misbehaves in konqueror 4.6.5 - the messages are delivered with
  // huge delay, or not at all.
  module.exports.iframeEnabled = (typeof __webpack_require__.g.postMessage === 'function' ||
    typeof __webpack_require__.g.postMessage === 'object') && (!browser.isKonqueror());
}


/***/ }),

/***/ "./node_modules/sockjs-client/lib/utils/log.js":
/*!*****************************************************!*\
  !*** ./node_modules/sockjs-client/lib/utils/log.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var logObject = {};
['log', 'debug', 'warn'].forEach(function (level) {
  var levelExists;

  try {
    levelExists = __webpack_require__.g.console && __webpack_require__.g.console[level] && __webpack_require__.g.console[level].apply;
  } catch(e) {
    // do nothing
  }

  logObject[level] = levelExists ? function () {
    return __webpack_require__.g.console[level].apply(__webpack_require__.g.console, arguments);
  } : (level === 'log' ? function () {} : logObject.log);
});

module.exports = logObject;


/***/ }),

/***/ "./node_modules/sockjs-client/lib/utils/object.js":
/*!********************************************************!*\
  !*** ./node_modules/sockjs-client/lib/utils/object.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


module.exports = {
  isObject: function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  }

, extend: function(obj) {
    if (!this.isObject(obj)) {
      return obj;
    }
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (Object.prototype.hasOwnProperty.call(source, prop)) {
          obj[prop] = source[prop];
        }
      }
    }
    return obj;
  }
};


/***/ }),

/***/ "./node_modules/sockjs-client/lib/utils/random.js":
/*!********************************************************!*\
  !*** ./node_modules/sockjs-client/lib/utils/random.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var crypto = __webpack_require__(/*! crypto */ "./node_modules/sockjs-client/lib/utils/browser-crypto.js");

// This string has length 32, a power of 2, so the modulus doesn't introduce a
// bias.
var _randomStringChars = 'abcdefghijklmnopqrstuvwxyz012345';
module.exports = {
  string: function(length) {
    var max = _randomStringChars.length;
    var bytes = crypto.randomBytes(length);
    var ret = [];
    for (var i = 0; i < length; i++) {
      ret.push(_randomStringChars.substr(bytes[i] % max, 1));
    }
    return ret.join('');
  }

, number: function(max) {
    return Math.floor(Math.random() * max);
  }

, numberString: function(max) {
    var t = ('' + (max - 1)).length;
    var p = new Array(t + 1).join('0');
    return (p + this.number(max)).slice(-t);
  }
};


/***/ }),

/***/ "./node_modules/sockjs-client/lib/utils/transport.js":
/*!***********************************************************!*\
  !*** ./node_modules/sockjs-client/lib/utils/transport.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var debug = function() {};
if (true) {
  debug = __webpack_require__(/*! debug */ "./node_modules/sockjs-client/node_modules/debug/src/browser.js")('sockjs-client:utils:transport');
}

module.exports = function(availableTransports) {
  return {
    filterToEnabled: function(transportsWhitelist, info) {
      var transports = {
        main: []
      , facade: []
      };
      if (!transportsWhitelist) {
        transportsWhitelist = [];
      } else if (typeof transportsWhitelist === 'string') {
        transportsWhitelist = [transportsWhitelist];
      }

      availableTransports.forEach(function(trans) {
        if (!trans) {
          return;
        }

        if (trans.transportName === 'websocket' && info.websocket === false) {
          debug('disabled from server', 'websocket');
          return;
        }

        if (transportsWhitelist.length &&
            transportsWhitelist.indexOf(trans.transportName) === -1) {
          debug('not in whitelist', trans.transportName);
          return;
        }

        if (trans.enabled(info)) {
          debug('enabled', trans.transportName);
          transports.main.push(trans);
          if (trans.facadeTransport) {
            transports.facade.push(trans.facadeTransport);
          }
        } else {
          debug('disabled', trans.transportName);
        }
      });
      return transports;
    }
  };
};


/***/ }),

/***/ "./node_modules/sockjs-client/lib/utils/url.js":
/*!*****************************************************!*\
  !*** ./node_modules/sockjs-client/lib/utils/url.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var URL = __webpack_require__(/*! url-parse */ "./node_modules/url-parse/index.js");

var debug = function() {};
if (true) {
  debug = __webpack_require__(/*! debug */ "./node_modules/sockjs-client/node_modules/debug/src/browser.js")('sockjs-client:utils:url');
}

module.exports = {
  getOrigin: function(url) {
    if (!url) {
      return null;
    }

    var p = new URL(url);
    if (p.protocol === 'file:') {
      return null;
    }

    var port = p.port;
    if (!port) {
      port = (p.protocol === 'https:') ? '443' : '80';
    }

    return p.protocol + '//' + p.hostname + ':' + port;
  }

, isOriginEqual: function(a, b) {
    var res = this.getOrigin(a) === this.getOrigin(b);
    debug('same', a, b, res);
    return res;
  }

, isSchemeEqual: function(a, b) {
    return (a.split(':')[0] === b.split(':')[0]);
  }

, addPath: function (url, path) {
    var qs = url.split('?');
    return qs[0] + path + (qs[1] ? '?' + qs[1] : '');
  }

, addQuery: function (url, q) {
    return url + (url.indexOf('?') === -1 ? ('?' + q) : ('&' + q));
  }

, isLoopbackAddr: function (addr) {
    return /^127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) || /^\[::1\]$/.test(addr);
  }
};


/***/ }),

/***/ "./node_modules/sockjs-client/lib/version.js":
/*!***************************************************!*\
  !*** ./node_modules/sockjs-client/lib/version.js ***!
  \***************************************************/
/***/ ((module) => {

module.exports = '1.5.2';


/***/ }),

/***/ "./node_modules/sockjs-client/node_modules/debug/src/browser.js":
/*!**********************************************************************!*\
  !*** ./node_modules/sockjs-client/node_modules/debug/src/browser.js ***!
  \**********************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */
// eslint-disable-next-line complexity

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
    return true;
  } // Internet Explorer and Edge do not support colors.


  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  } // Is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

  if (!this.useColors) {
    return;
  }

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into

  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if (match === '%%') {
      return;
    }

    index++;

    if (match === '%c') {
      // We only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });
  args.splice(lastC, 0, c);
}
/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */


function log() {
  var _console;

  // This hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  try {
    if (namespaces) {
      exports.storage.setItem('debug', namespaces);
    } else {
      exports.storage.removeItem('debug');
    }
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  var r;

  try {
    r = exports.storage.getItem('debug');
  } catch (error) {} // Swallow
  // XXX (@Qix-) should we be logging these?
  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */


function localstorage() {
  try {
    // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
    // The Browser also has localStorage in the global context.
    return localStorage;
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}

module.exports = __webpack_require__(/*! ./common */ "./node_modules/sockjs-client/node_modules/debug/src/common.js")(exports);
var formatters = module.exports.formatters;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (error) {
    return '[UnexpectedJSONParseError]: ' + error.message;
  }
};



/***/ }),

/***/ "./node_modules/sockjs-client/node_modules/debug/src/common.js":
/*!*********************************************************************!*\
  !*** ./node_modules/sockjs-client/node_modules/debug/src/common.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */
function setup(env) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = __webpack_require__(/*! ms */ "./node_modules/sockjs-client/node_modules/ms/index.js");
  Object.keys(env).forEach(function (key) {
    createDebug[key] = env[key];
  });
  /**
  * Active `debug` instances.
  */

  createDebug.instances = [];
  /**
  * The currently active debug mode names, and names to skip.
  */

  createDebug.names = [];
  createDebug.skips = [];
  /**
  * Map of special "%n" handling functions, for the debug "format" argument.
  *
  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  */

  createDebug.formatters = {};
  /**
  * Selects a color for a debug namespace
  * @param {String} namespace The namespace string for the for the debug instance to be colored
  * @return {Number|String} An ANSI color code for the given namespace
  * @api private
  */

  function selectColor(namespace) {
    var hash = 0;

    for (var i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }

  createDebug.selectColor = selectColor;
  /**
  * Create a debugger with the given `namespace`.
  *
  * @param {String} namespace
  * @return {Function}
  * @api public
  */

  function createDebug(namespace) {
    var prevTime;

    function debug() {
      // Disabled?
      if (!debug.enabled) {
        return;
      }

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var self = debug; // Set `diff` timestamp

      var curr = Number(new Date());
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);

      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O');
      } // Apply any `formatters` transformations


      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return match;
        }

        index++;
        var formatter = createDebug.formatters[format];

        if (typeof formatter === 'function') {
          var val = args[index];
          match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

          args.splice(index, 1);
          index--;
        }

        return match;
      }); // Apply env-specific formatting (colors, etc.)

      createDebug.formatArgs.call(self, args);
      var logFn = self.log || createDebug.log;
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = createDebug.enabled(namespace);
    debug.useColors = createDebug.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;
    debug.extend = extend; // Debug.formatArgs = formatArgs;
    // debug.rawLog = rawLog;
    // env-specific initialization logic for debug instances

    if (typeof createDebug.init === 'function') {
      createDebug.init(debug);
    }

    createDebug.instances.push(debug);
    return debug;
  }

  function destroy() {
    var index = createDebug.instances.indexOf(this);

    if (index !== -1) {
      createDebug.instances.splice(index, 1);
      return true;
    }

    return false;
  }

  function extend(namespace, delimiter) {
    return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
  }
  /**
  * Enables a debug mode by namespaces. This can include modes
  * separated by a colon and wildcards.
  *
  * @param {String} namespaces
  * @api public
  */


  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.names = [];
    createDebug.skips = [];
    var i;
    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue;
      }

      namespaces = split[i].replace(/\*/g, '.*?');

      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'));
      }
    }

    for (i = 0; i < createDebug.instances.length; i++) {
      var instance = createDebug.instances[i];
      instance.enabled = createDebug.enabled(instance.namespace);
    }
  }
  /**
  * Disable debug output.
  *
  * @api public
  */


  function disable() {
    createDebug.enable('');
  }
  /**
  * Returns true if the given mode name is enabled, false otherwise.
  *
  * @param {String} name
  * @return {Boolean}
  * @api public
  */


  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }

    var i;
    var len;

    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false;
      }
    }

    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true;
      }
    }

    return false;
  }
  /**
  * Coerce `val`.
  *
  * @param {Mixed} val
  * @return {Mixed}
  * @api private
  */


  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }

    return val;
  }

  createDebug.enable(createDebug.load());
  return createDebug;
}

module.exports = setup;



/***/ }),

/***/ "./node_modules/sockjs-client/node_modules/ms/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/sockjs-client/node_modules/ms/index.js ***!
  \*************************************************************/
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ "./node_modules/stompjs/index.js":
/*!***************************************!*\
  !*** ./node_modules/stompjs/index.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Copyright (C) 2013 [Jeff Mesnil](http://jmesnil.net/)
//
//   Stomp Over WebSocket http://www.jmesnil.net/stomp-websocket/doc/ | Apache License V2.0
//
// The library can be used in node.js app to connect to STOMP brokers over TCP 
// or Web sockets.

// Root of the `stompjs module`

var Stomp = __webpack_require__(/*! ./lib/stomp.js */ "./node_modules/stompjs/lib/stomp.js");
var StompNode = __webpack_require__(/*! ./lib/stomp-node.js */ "./node_modules/stompjs/lib/stomp-node.js");

module.exports = Stomp.Stomp;
module.exports.overTCP = StompNode.overTCP;
module.exports.overWS = StompNode.overWS;

/***/ }),

/***/ "./node_modules/stompjs/lib/stomp-node.js":
/*!************************************************!*\
  !*** ./node_modules/stompjs/lib/stomp-node.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.7.1

/*
   Stomp Over WebSocket http://www.jmesnil.net/stomp-websocket/doc/ | Apache License V2.0

   Copyright (C) 2013 [Jeff Mesnil](http://jmesnil.net/)
 */

(function() {
  var Stomp, net, overTCP, overWS, wrapTCP, wrapWS;

  Stomp = __webpack_require__(/*! ./stomp */ "./node_modules/stompjs/lib/stomp.js");

  net = __webpack_require__(/*! net */ "./node_modules/net/index.js");

  Stomp.Stomp.setInterval = function(interval, f) {
    return setInterval(f, interval);
  };

  Stomp.Stomp.clearInterval = function(id) {
    return clearInterval(id);
  };

  wrapTCP = function(port, host) {
    var socket, ws;
    socket = null;
    ws = {
      url: 'tcp:// ' + host + ':' + port,
      send: function(d) {
        return socket.write(d);
      },
      close: function() {
        return socket.end();
      }
    };
    socket = net.connect(port, host, function(e) {
      return ws.onopen();
    });
    socket.on('error', function(e) {
      return typeof ws.onclose === "function" ? ws.onclose(e) : void 0;
    });
    socket.on('close', function(e) {
      return typeof ws.onclose === "function" ? ws.onclose(e) : void 0;
    });
    socket.on('data', function(data) {
      var event;
      event = {
        'data': data.toString()
      };
      return ws.onmessage(event);
    });
    return ws;
  };

  wrapWS = function(url) {
    var WebSocketClient, connection, socket, ws;
    WebSocketClient = (__webpack_require__(/*! websocket */ "./node_modules/websocket/lib/browser.js").client);
    connection = null;
    ws = {
      url: url,
      send: function(d) {
        return connection.sendUTF(d);
      },
      close: function() {
        return connection.close();
      }
    };
    socket = new WebSocketClient();
    socket.on('connect', function(conn) {
      connection = conn;
      ws.onopen();
      connection.on('error', function(error) {
        return typeof ws.onclose === "function" ? ws.onclose(error) : void 0;
      });
      connection.on('close', function() {
        return typeof ws.onclose === "function" ? ws.onclose() : void 0;
      });
      return connection.on('message', function(message) {
        var event;
        if (message.type === 'utf8') {
          event = {
            'data': message.utf8Data
          };
          return ws.onmessage(event);
        }
      });
    });
    socket.connect(url);
    return ws;
  };

  overTCP = function(host, port) {
    var socket;
    socket = wrapTCP(port, host);
    return Stomp.Stomp.over(socket);
  };

  overWS = function(url) {
    var socket;
    socket = wrapWS(url);
    return Stomp.Stomp.over(socket);
  };

  exports.overTCP = overTCP;

  exports.overWS = overWS;

}).call(this);


/***/ }),

/***/ "./node_modules/stompjs/lib/stomp.js":
/*!*******************************************!*\
  !*** ./node_modules/stompjs/lib/stomp.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports) {

// Generated by CoffeeScript 1.7.1

/*
   Stomp Over WebSocket http://www.jmesnil.net/stomp-websocket/doc/ | Apache License V2.0

   Copyright (C) 2010-2013 [Jeff Mesnil](http://jmesnil.net/)
   Copyright (C) 2012 [FuseSource, Inc.](http://fusesource.com)
 */

(function() {
  var Byte, Client, Frame, Stomp,
    __hasProp = {}.hasOwnProperty,
    __slice = [].slice;

  Byte = {
    LF: '\x0A',
    NULL: '\x00'
  };

  Frame = (function() {
    var unmarshallSingle;

    function Frame(command, headers, body) {
      this.command = command;
      this.headers = headers != null ? headers : {};
      this.body = body != null ? body : '';
    }

    Frame.prototype.toString = function() {
      var lines, name, skipContentLength, value, _ref;
      lines = [this.command];
      skipContentLength = this.headers['content-length'] === false ? true : false;
      if (skipContentLength) {
        delete this.headers['content-length'];
      }
      _ref = this.headers;
      for (name in _ref) {
        if (!__hasProp.call(_ref, name)) continue;
        value = _ref[name];
        lines.push("" + name + ":" + value);
      }
      if (this.body && !skipContentLength) {
        lines.push("content-length:" + (Frame.sizeOfUTF8(this.body)));
      }
      lines.push(Byte.LF + this.body);
      return lines.join(Byte.LF);
    };

    Frame.sizeOfUTF8 = function(s) {
      if (s) {
        return encodeURI(s).match(/%..|./g).length;
      } else {
        return 0;
      }
    };

    unmarshallSingle = function(data) {
      var body, chr, command, divider, headerLines, headers, i, idx, len, line, start, trim, _i, _j, _len, _ref, _ref1;
      divider = data.search(RegExp("" + Byte.LF + Byte.LF));
      headerLines = data.substring(0, divider).split(Byte.LF);
      command = headerLines.shift();
      headers = {};
      trim = function(str) {
        return str.replace(/^\s+|\s+$/g, '');
      };
      _ref = headerLines.reverse();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        idx = line.indexOf(':');
        headers[trim(line.substring(0, idx))] = trim(line.substring(idx + 1));
      }
      body = '';
      start = divider + 2;
      if (headers['content-length']) {
        len = parseInt(headers['content-length']);
        body = ('' + data).substring(start, start + len);
      } else {
        chr = null;
        for (i = _j = start, _ref1 = data.length; start <= _ref1 ? _j < _ref1 : _j > _ref1; i = start <= _ref1 ? ++_j : --_j) {
          chr = data.charAt(i);
          if (chr === Byte.NULL) {
            break;
          }
          body += chr;
        }
      }
      return new Frame(command, headers, body);
    };

    Frame.unmarshall = function(datas) {
      var data;
      return (function() {
        var _i, _len, _ref, _results;
        _ref = datas.split(RegExp("" + Byte.NULL + Byte.LF + "*"));
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          data = _ref[_i];
          if ((data != null ? data.length : void 0) > 0) {
            _results.push(unmarshallSingle(data));
          }
        }
        return _results;
      })();
    };

    Frame.marshall = function(command, headers, body) {
      var frame;
      frame = new Frame(command, headers, body);
      return frame.toString() + Byte.NULL;
    };

    return Frame;

  })();

  Client = (function() {
    var now;

    function Client(ws) {
      this.ws = ws;
      this.ws.binaryType = "arraybuffer";
      this.counter = 0;
      this.connected = false;
      this.heartbeat = {
        outgoing: 10000,
        incoming: 10000
      };
      this.maxWebSocketFrameSize = 16 * 1024;
      this.subscriptions = {};
    }

    Client.prototype.debug = function(message) {
      var _ref;
      return typeof window !== "undefined" && window !== null ? (_ref = window.console) != null ? _ref.log(message) : void 0 : void 0;
    };

    now = function() {
      if (Date.now) {
        return Date.now();
      } else {
        return new Date().valueOf;
      }
    };

    Client.prototype._transmit = function(command, headers, body) {
      var out;
      out = Frame.marshall(command, headers, body);
      if (typeof this.debug === "function") {
        this.debug(">>> " + out);
      }
      while (true) {
        if (out.length > this.maxWebSocketFrameSize) {
          this.ws.send(out.substring(0, this.maxWebSocketFrameSize));
          out = out.substring(this.maxWebSocketFrameSize);
          if (typeof this.debug === "function") {
            this.debug("remaining = " + out.length);
          }
        } else {
          return this.ws.send(out);
        }
      }
    };

    Client.prototype._setupHeartbeat = function(headers) {
      var serverIncoming, serverOutgoing, ttl, v, _ref, _ref1;
      if ((_ref = headers.version) !== Stomp.VERSIONS.V1_1 && _ref !== Stomp.VERSIONS.V1_2) {
        return;
      }
      _ref1 = (function() {
        var _i, _len, _ref1, _results;
        _ref1 = headers['heart-beat'].split(",");
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          v = _ref1[_i];
          _results.push(parseInt(v));
        }
        return _results;
      })(), serverOutgoing = _ref1[0], serverIncoming = _ref1[1];
      if (!(this.heartbeat.outgoing === 0 || serverIncoming === 0)) {
        ttl = Math.max(this.heartbeat.outgoing, serverIncoming);
        if (typeof this.debug === "function") {
          this.debug("send PING every " + ttl + "ms");
        }
        this.pinger = Stomp.setInterval(ttl, (function(_this) {
          return function() {
            _this.ws.send(Byte.LF);
            return typeof _this.debug === "function" ? _this.debug(">>> PING") : void 0;
          };
        })(this));
      }
      if (!(this.heartbeat.incoming === 0 || serverOutgoing === 0)) {
        ttl = Math.max(this.heartbeat.incoming, serverOutgoing);
        if (typeof this.debug === "function") {
          this.debug("check PONG every " + ttl + "ms");
        }
        return this.ponger = Stomp.setInterval(ttl, (function(_this) {
          return function() {
            var delta;
            delta = now() - _this.serverActivity;
            if (delta > ttl * 2) {
              if (typeof _this.debug === "function") {
                _this.debug("did not receive server activity for the last " + delta + "ms");
              }
              return _this.ws.close();
            }
          };
        })(this));
      }
    };

    Client.prototype._parseConnect = function() {
      var args, connectCallback, errorCallback, headers;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      headers = {};
      switch (args.length) {
        case 2:
          headers = args[0], connectCallback = args[1];
          break;
        case 3:
          if (args[1] instanceof Function) {
            headers = args[0], connectCallback = args[1], errorCallback = args[2];
          } else {
            headers.login = args[0], headers.passcode = args[1], connectCallback = args[2];
          }
          break;
        case 4:
          headers.login = args[0], headers.passcode = args[1], connectCallback = args[2], errorCallback = args[3];
          break;
        default:
          headers.login = args[0], headers.passcode = args[1], connectCallback = args[2], errorCallback = args[3], headers.host = args[4];
      }
      return [headers, connectCallback, errorCallback];
    };

    Client.prototype.connect = function() {
      var args, errorCallback, headers, out;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      out = this._parseConnect.apply(this, args);
      headers = out[0], this.connectCallback = out[1], errorCallback = out[2];
      if (typeof this.debug === "function") {
        this.debug("Opening Web Socket...");
      }
      this.ws.onmessage = (function(_this) {
        return function(evt) {
          var arr, c, client, data, frame, messageID, onreceive, subscription, _i, _len, _ref, _results;
          data = typeof ArrayBuffer !== 'undefined' && evt.data instanceof ArrayBuffer ? (arr = new Uint8Array(evt.data), typeof _this.debug === "function" ? _this.debug("--- got data length: " + arr.length) : void 0, ((function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = arr.length; _i < _len; _i++) {
              c = arr[_i];
              _results.push(String.fromCharCode(c));
            }
            return _results;
          })()).join('')) : evt.data;
          _this.serverActivity = now();
          if (data === Byte.LF) {
            if (typeof _this.debug === "function") {
              _this.debug("<<< PONG");
            }
            return;
          }
          if (typeof _this.debug === "function") {
            _this.debug("<<< " + data);
          }
          _ref = Frame.unmarshall(data);
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            frame = _ref[_i];
            switch (frame.command) {
              case "CONNECTED":
                if (typeof _this.debug === "function") {
                  _this.debug("connected to server " + frame.headers.server);
                }
                _this.connected = true;
                _this._setupHeartbeat(frame.headers);
                _results.push(typeof _this.connectCallback === "function" ? _this.connectCallback(frame) : void 0);
                break;
              case "MESSAGE":
                subscription = frame.headers.subscription;
                onreceive = _this.subscriptions[subscription] || _this.onreceive;
                if (onreceive) {
                  client = _this;
                  messageID = frame.headers["message-id"];
                  frame.ack = function(headers) {
                    if (headers == null) {
                      headers = {};
                    }
                    return client.ack(messageID, subscription, headers);
                  };
                  frame.nack = function(headers) {
                    if (headers == null) {
                      headers = {};
                    }
                    return client.nack(messageID, subscription, headers);
                  };
                  _results.push(onreceive(frame));
                } else {
                  _results.push(typeof _this.debug === "function" ? _this.debug("Unhandled received MESSAGE: " + frame) : void 0);
                }
                break;
              case "RECEIPT":
                _results.push(typeof _this.onreceipt === "function" ? _this.onreceipt(frame) : void 0);
                break;
              case "ERROR":
                _results.push(typeof errorCallback === "function" ? errorCallback(frame) : void 0);
                break;
              default:
                _results.push(typeof _this.debug === "function" ? _this.debug("Unhandled frame: " + frame) : void 0);
            }
          }
          return _results;
        };
      })(this);
      this.ws.onclose = (function(_this) {
        return function() {
          var msg;
          msg = "Whoops! Lost connection to " + _this.ws.url;
          if (typeof _this.debug === "function") {
            _this.debug(msg);
          }
          _this._cleanUp();
          return typeof errorCallback === "function" ? errorCallback(msg) : void 0;
        };
      })(this);
      return this.ws.onopen = (function(_this) {
        return function() {
          if (typeof _this.debug === "function") {
            _this.debug('Web Socket Opened...');
          }
          headers["accept-version"] = Stomp.VERSIONS.supportedVersions();
          headers["heart-beat"] = [_this.heartbeat.outgoing, _this.heartbeat.incoming].join(',');
          return _this._transmit("CONNECT", headers);
        };
      })(this);
    };

    Client.prototype.disconnect = function(disconnectCallback, headers) {
      if (headers == null) {
        headers = {};
      }
      this._transmit("DISCONNECT", headers);
      this.ws.onclose = null;
      this.ws.close();
      this._cleanUp();
      return typeof disconnectCallback === "function" ? disconnectCallback() : void 0;
    };

    Client.prototype._cleanUp = function() {
      this.connected = false;
      if (this.pinger) {
        Stomp.clearInterval(this.pinger);
      }
      if (this.ponger) {
        return Stomp.clearInterval(this.ponger);
      }
    };

    Client.prototype.send = function(destination, headers, body) {
      if (headers == null) {
        headers = {};
      }
      if (body == null) {
        body = '';
      }
      headers.destination = destination;
      return this._transmit("SEND", headers, body);
    };

    Client.prototype.subscribe = function(destination, callback, headers) {
      var client;
      if (headers == null) {
        headers = {};
      }
      if (!headers.id) {
        headers.id = "sub-" + this.counter++;
      }
      headers.destination = destination;
      this.subscriptions[headers.id] = callback;
      this._transmit("SUBSCRIBE", headers);
      client = this;
      return {
        id: headers.id,
        unsubscribe: function() {
          return client.unsubscribe(headers.id);
        }
      };
    };

    Client.prototype.unsubscribe = function(id) {
      delete this.subscriptions[id];
      return this._transmit("UNSUBSCRIBE", {
        id: id
      });
    };

    Client.prototype.begin = function(transaction) {
      var client, txid;
      txid = transaction || "tx-" + this.counter++;
      this._transmit("BEGIN", {
        transaction: txid
      });
      client = this;
      return {
        id: txid,
        commit: function() {
          return client.commit(txid);
        },
        abort: function() {
          return client.abort(txid);
        }
      };
    };

    Client.prototype.commit = function(transaction) {
      return this._transmit("COMMIT", {
        transaction: transaction
      });
    };

    Client.prototype.abort = function(transaction) {
      return this._transmit("ABORT", {
        transaction: transaction
      });
    };

    Client.prototype.ack = function(messageID, subscription, headers) {
      if (headers == null) {
        headers = {};
      }
      headers["message-id"] = messageID;
      headers.subscription = subscription;
      return this._transmit("ACK", headers);
    };

    Client.prototype.nack = function(messageID, subscription, headers) {
      if (headers == null) {
        headers = {};
      }
      headers["message-id"] = messageID;
      headers.subscription = subscription;
      return this._transmit("NACK", headers);
    };

    return Client;

  })();

  Stomp = {
    VERSIONS: {
      V1_0: '1.0',
      V1_1: '1.1',
      V1_2: '1.2',
      supportedVersions: function() {
        return '1.1,1.0';
      }
    },
    client: function(url, protocols) {
      var klass, ws;
      if (protocols == null) {
        protocols = ['v10.stomp', 'v11.stomp'];
      }
      klass = Stomp.WebSocketClass || WebSocket;
      ws = new klass(url, protocols);
      return new Client(ws);
    },
    over: function(ws) {
      return new Client(ws);
    },
    Frame: Frame
  };

  if ( true && exports !== null) {
    exports.Stomp = Stomp;
  }

  if (typeof window !== "undefined" && window !== null) {
    Stomp.setInterval = function(interval, f) {
      return window.setInterval(f, interval);
    };
    Stomp.clearInterval = function(id) {
      return window.clearInterval(id);
    };
    window.Stomp = Stomp;
  } else if (!exports) {
    self.Stomp = Stomp;
  }

}).call(this);


/***/ }),

/***/ "./src/main/ts/Common.ts":
/*!*******************************!*\
  !*** ./src/main/ts/Common.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findParent": () => (/* binding */ findParent)
/* harmony export */ });
function findParent(elm, tagName) {
    if (tagName === null || tagName === "")
        return null;
    if (elm === null)
        return null;
    let parent = elm;
    for (let i = 0; i < 20; i++) {
        parent = parent.parentNode;
        if (parent.tagName === tagName.toUpperCase()) {
            return parent;
        }
    }
    return null;
}


/***/ }),

/***/ "./src/main/ts/Messenger.ts":
/*!**********************************!*\
  !*** ./src/main/ts/Messenger.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Messenger": () => (/* binding */ Messenger)
/* harmony export */ });
/* harmony import */ var _Common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Common */ "./src/main/ts/Common.ts");

class Messenger {
    constructor() {
        this.idlist = {
            "messageArea": "message-area",
            "messageList": "message-list",
        };
        this.classlist = {
            "message": "message",
            "content": "content",
            "deleteBtnMessage": "delete-btn-message",
            "hide": "hide",
        };
        this._elm = document.getElementById(this.idlist.messageArea);
        this._messageList = document.getElementById(this.idlist.messageList);
        this._templateMsgItem = this.createTemplateMsgItem();
    }
    createTemplateMsgItem() {
        const li = document.createElement("li");
        li.classList.add(this.classlist.message);
        const div = document.createElement("div");
        div.classList.add(this.classlist.content);
        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.classList.add(this.classlist.deleteBtnMessage);
        delBtn.innerText = "×";
        li.appendChild(delBtn);
        li.appendChild(div);
        return li;
    }
    addEventDeleteMessage(delBtn) {
        delBtn.addEventListener("click", function () {
            const li = _Common__WEBPACK_IMPORTED_MODULE_0__.findParent(delBtn, "li");
            li.remove();
        }, false);
    }
    pushMessage(message, expireTime) {
        const msg = this._templateMsgItem.cloneNode(true);
        const delBtn = msg.getElementsByClassName(this.classlist.deleteBtnMessage)[0];
        this.addEventDeleteMessage(delBtn);
        msg.getElementsByClassName(this.classlist.content)[0].innerHTML = message;
        this._messageList.appendChild(msg);
        setTimeout(() => {
            this.hideMessage(msg);
        }, expireTime);
    }
    hideMessage(msgElm) {
        msgElm.classList.add(this.classlist.hide);
    }
}


/***/ }),

/***/ "./src/main/ts/Todolist/EditTodo.ts":
/*!******************************************!*\
  !*** ./src/main/ts/Todolist/EditTodo.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditTodo": () => (/* binding */ EditTodo)
/* harmony export */ });
/* harmony import */ var _Common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Common */ "./src/main/ts/Common.ts");
/* harmony import */ var _TodoView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TodoView */ "./src/main/ts/Todolist/TodoView.ts");


class EditTodo {
    // 初期化処理
    constructor() {
        this._eventIdElm = document.getElementById("hid-edit-event-id");
        this._todoIdElm = document.getElementById("hid-edit-todo-id");
        this._createUserIdElm = document.getElementById("hid-edit-create-user-id");
        this._createUserNameElm = document.getElementById("hid-edit-create-user-name");
        this._createDatetimeElm = document.getElementById("hid-edit-create-datetime");
        this._updateUserIdElm = document.getElementById("hid-edit-update-user-id");
        this._updateUserNameElm = document.getElementById("hid-edit-update-user-name");
        this._updateDatetimeElm = document.getElementById("hid-edit-update-datetime");
        this._areaElm = document.getElementById("edit-todo-area");
        this._titleElm = document.getElementById("txt-edit-todo-title");
        this._contentElm = document.getElementById("txta-edit-todo-content");
        this._checklistArea = document.querySelector("#checklist-area ul.checklist");
        this._addCheckBoxBtn = document.getElementById("btn-add-checklist");
        this._reminderNoticeTimeElm = document.getElementById("slct-edit-reminder-notice-time");
        this._reminderRepeatElm = document.getElementById("slct-edit-reminder-repeat");
        this._startDateElm = document.getElementById("txt-edit-start-date");
        this._startTimeElm = document.getElementById("txt-edit-start-time");
        this._saveTodoBtn = document.getElementById("btn-save-todo");
        this._cancelBtn = document.getElementById("btn-cancel-todo");
        this._checklistTemplate = this.createTemplateCheckItem();
        this._addEventAddCheckList();
        this._addEventSave();
        this._addEventCancel();
    }
    setUpEditCard(elm) {
        this._eventIdElm.value = document.querySelector(".choose-event.select")?.value || "";
        if (!this._eventIdElm.value) {
            throw new Error("イベントIDがありません。");
        }
        if (elm !== undefined) {
            this._copyToEditCard(elm);
        }
        this._addEventDeleteCheckItemBtn();
    }
    copyToEditCard(elm) {
        this._copyToEditCard(elm);
    }
    _copyToEditCard(elm) {
        this._todoIdElm.value = elm.querySelector(".todo-id")?.value || "";
        this._titleElm.value = elm.querySelector(".text.title")?.value || "";
        this._contentElm.value = elm.querySelector(".text.content")?.value || "";
        this._reminderNoticeTimeElm.value = elm.querySelector(".select.reminder-notice-time")?.value || "";
        this._reminderRepeatElm.value = elm.querySelector(".select.reminder-repeat")?.value || "";
        this._startDateElm.value = elm.querySelector(".text.todo-start-date")?.value || "";
        this._startTimeElm.value = elm.querySelector(".text.todo-start-time")?.value || "";
        this._createUserIdElm.value = elm.querySelector(".hid.todo-create-user-id")?.value || "";
        this._createUserNameElm.value = elm.querySelector(".hid.todo-create-user-name")?.value || "";
        this._createDatetimeElm.value = elm.querySelector(".hid.todo-create-datetime")?.value || "";
        this._updateUserIdElm.value = elm.querySelector(".hid.todo-update-user-id")?.value || "";
        this._updateUserNameElm.value = elm.querySelector(".hid.todo-update-user-name")?.value || "";
        this._updateDatetimeElm.value = elm.querySelector(".hid.todo-update-datetime")?.value || "";
        const checklist = elm.querySelectorAll("ul.checklist li");
        for (let checkItem of checklist) {
            this._checklistArea.appendChild(checkItem.cloneNode(true));
        }
    }
    clear() {
        this._eventIdElm.value = "";
        this._todoIdElm.value = "";
        this._titleElm.value = "";
        this._contentElm.value = "";
        while (this._checklistArea.firstChild) {
            this._checklistArea.removeChild(this._checklistArea.firstChild);
        }
        this._createUserIdElm.value = "";
        this._createUserNameElm.value = "";
        this._createDatetimeElm.value = "";
        this._updateUserIdElm.value = "";
        this._updateUserNameElm.value = "";
        this._updateDatetimeElm.value = "";
        this._reminderNoticeTimeElm.value = "";
        this._reminderRepeatElm.value = "";
        this._startDateElm.value = "";
        this._startTimeElm.value = "";
    }
    // 各ボタンのイベントを定義する
    _addEventAddCheckList() {
        // 追加ボタンクリック時は、チェックボックス要素を追加する
        this._addCheckBoxBtn.addEventListener("click", () => {
            const cloneCheckItem = this._checklistTemplate.cloneNode(true);
            this._checklistArea.appendChild(cloneCheckItem);
            const delBtn = cloneCheckItem.querySelector(".delete-btn-checklist");
            if (delBtn === null)
                return;
            this._applyEventDeleteCheckItem(delBtn);
        }, false);
    }
    _addEventSave() {
        // 保存ボタンクリック時は、現在編集中のTODOリストの内容をサーバーに送信して、TODOリストに反映させる
        this._saveTodoBtn.addEventListener("click", () => {
            this.sendTodoJson();
        }, false);
    }
    _addEventCancel() {
        // キャンセルボタンクリック時は、現在編集中の内容を破棄して閉じる
        this._cancelBtn.addEventListener("click", () => {
            _TodoView__WEBPACK_IMPORTED_MODULE_1__.TODO.mediator.closeTodo();
        }, false);
    }
    sendTodoJson() {
        const json = this.createJson();
        const todoId = json.todoId;
        let url = `/todolist/${json.eventId}/new/save`;
        if (todoId) {
            url = `/todolist/${json.eventId}/${json.todoId}/save`;
        }
        // TODO.mediator.saveTodo(url, JSON.stringify(json));
        console.log(json);
        const csrfHeader = document.querySelector('meta[name="_csrf_header"]')?.content || "";
        const token = document.querySelector('meta[name="_csrf"]')?.content || "";
        _TodoView__WEBPACK_IMPORTED_MODULE_1__.TODO.mediator.queuePublisherTodo(json.eventId, json.todoId);
        fetch(url, {
            //			credentials: "same-origin",
            method: "POST",
            headers: {
                "charset": "UTF-8",
                "Content-Type": "application/json",
                [csrfHeader]: token,
            },
            body: JSON.stringify(json)
        }).then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}${res.statusText}`);
            }
            console.log(res);
            return res.json();
        }).then((data) => {
            console.log(data);
            _TodoView__WEBPACK_IMPORTED_MODULE_1__.TODO.mediator.requestPublishTodo();
            _TodoView__WEBPACK_IMPORTED_MODULE_1__.TODO.mediator.pushMessage(`${data.message}`, 10000);
        }).catch((reason) => {
            console.log(reason);
        });
    }
    // チェックアイテム横にある、削除ボタンのイベントを定義する
    _addEventDeleteCheckItemBtn() {
        const checkItemDeleteBtns = this._checklistArea.querySelectorAll(".delete-btn-checklist");
        for (let btn of checkItemDeleteBtns) {
            this._applyEventDeleteCheckItem(btn);
        }
    }
    _applyEventDeleteCheckItem(elm) {
        elm.addEventListener("click", () => {
            let delElm = _Common__WEBPACK_IMPORTED_MODULE_0__.findParent(elm, "li");
            if (delElm === null)
                return;
            delElm.remove();
        }, false);
    }
    // チェックリストのテンプレート要素を作成する
    createTemplateCheckItem() {
        const li = document.createElement("li");
        const hidseq = document.createElement("input");
        hidseq.type = "hidden";
        hidseq.classList.add("checklist");
        hidseq.classList.add("seq");
        const label1 = document.createElement("label");
        const label2 = document.createElement("label");
        const textNode = document.createTextNode("\r\n");
        const span = document.createElement("span");
        span.classList.add("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checklist");
        checkbox.classList.add("checkbox");
        checkbox.classList.add("status");
        const text = document.createElement("input");
        text.type = "text";
        text.classList.add("checklist");
        text.classList.add("text");
        text.placeholder = "◯◯を買う。";
        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.classList.add("delete-btn-checklist");
        delBtn.innerText = "×";
        label1.appendChild(checkbox);
        label2.appendChild(span);
        label2.appendChild(text);
        label2.appendChild(textNode.cloneNode(true));
        label2.appendChild(delBtn);
        li.appendChild(hidseq);
        li.appendChild(label1);
        li.appendChild(textNode.cloneNode(true));
        li.appendChild(label2);
        return li;
    }
    createJson() {
        const json = {
            eventId: this._eventIdElm.value,
            todoId: this._todoIdElm.value,
            title: this._titleElm.value,
            content: this._contentElm.value,
            checkList: this.collectCheckItems(this._areaElm),
            todoStartDate: this._startDateElm.value,
            todoStartTime: this._startTimeElm.value,
            todoEndDateTime: "",
            reminderRepeat: this._reminderRepeatElm.value,
            reminderNoticeTime: this._reminderNoticeTimeElm.value,
            createUserId: this._createUserIdElm.value,
            createUserName: this._createUserNameElm.value,
            createDatetime: this._createDatetimeElm.value,
            updateUserId: this._updateUserIdElm.value,
            updateUserName: this._updateUserNameElm.value,
            updateDatetime: this._updateDatetimeElm.value
        };
        return json;
    }
    // チェックリストの配列を返す。配列内の要素はJson形式
    collectCheckItems(todoArea) {
        if (todoArea === null)
            return new Array();
        const checklist = todoArea.querySelectorAll("ul.checklist li");
        let maxSeq = 0;
        const jsons = new Array();
        const newCheckItems = new Array();
        // 全チェックリストの処理
        for (let checkItem of checklist) {
            const checkItemEventId = todoArea.querySelector(".event-id")?.value || "";
            const checkItemTodoId = todoArea.querySelector(".todo-id")?.value || "";
            const checkItemStatus = checkItem.querySelector(".checklist.checkbox.status")?.value || "";
            const checkItemContent = checkItem.querySelector(".checklist.text")?.value || "";
            const checkItemSeq = checkItem.querySelector(".checklist.seq")?.value || "";
            // 新規で作成されたチェックリストは、後で処理するための配列に入れておく
            if (!checkItemSeq) {
                newCheckItems.push(checkItem);
                continue;
            }
            const numCheckItemSeq = parseInt(checkItemSeq);
            if (maxSeq < numCheckItemSeq) {
                maxSeq = numCheckItemSeq;
            }
            jsons.push({
                eventId: checkItemEventId,
                todoId: checkItemTodoId,
                seq: numCheckItemSeq,
                completed: String(checkItemStatus) === "on" ? "true" : "false",
                content: checkItemContent
            });
        }
        // 新しく生成されたチェックリストの処理
        for (let newCheckItem of newCheckItems) {
            const checkItemEventId = todoArea.querySelector(".event-id")?.value || "";
            const checkItemTodoId = todoArea.querySelector(".todo-id")?.value || "";
            const checkItemSeq = ++maxSeq;
            const checkItemStatus = newCheckItem.querySelector(".checklist.checkbox.status")?.checked || false;
            const checkItemContent = newCheckItem.querySelector(".checklist.text")?.value || "";
            jsons.push({
                eventId: checkItemEventId,
                todoId: checkItemTodoId,
                seq: checkItemSeq,
                completed: String(checkItemStatus) === "on" ? "true" : "false",
                content: checkItemContent
            });
        }
        return jsons;
    }
    isNew() {
        return !(this._todoIdElm.value);
    }
}


/***/ }),

/***/ "./src/main/ts/Todolist/TodoMediator.ts":
/*!**********************************************!*\
  !*** ./src/main/ts/Todolist/TodoMediator.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TodoMediator": () => (/* binding */ TodoMediator)
/* harmony export */ });
class TodoMediator {
    constructor(todoView, editTodo, ybmWebSocket, messenger) {
        this._todoView = todoView;
        this._editTodo = editTodo;
        this._ws = ybmWebSocket;
        this._msgr = messenger;
        this._queuePublishTodo = [];
    }
    connectWebSocket(eventId) {
        // コールバック関数をそのまま渡してしまうと、関数内のthisの参照がundefinedになってしまう
        // アロー関数を使って、静的にthisを決定させる。
        this._ws.connectWebSocket(`/sub/todolist/${eventId}`, (data) => {
            this._todoView.receiveUpdatedTodo(data);
        });
    }
    disconnectWebSocket() {
        this._ws.disconnectWebSocket();
    }
    openTodo(elm) {
        this._editTodo.setUpEditCard(elm);
        this._todoView.openTodo();
    }
    closeTodo() {
        this._editTodo.clear();
        this._todoView.closeTodo();
    }
    isEditing() {
        return this._todoView.isEditing();
    }
    copyEditTodo(elm) {
        this._editTodo.copyToEditCard(elm);
    }
    saveTodo(url, stringifiedJson) {
        this._ws.send(url, stringifiedJson);
    }
    queuePublisherTodo(eventId, todoId) {
        this._queuePublishTodo.push({ eventId, todoId });
    }
    requestPublishTodo() {
        const publishTodo = this._queuePublishTodo.pop();
        if (!publishTodo)
            return;
        if (!publishTodo.eventId || !publishTodo.todoId)
            return;
        this._ws.send(`/pub/todolist/${publishTodo.eventId}/${publishTodo.todoId}/publish`, "");
    }
    pushMessage(message, expireTime) {
        this._msgr.pushMessage(message, expireTime);
    }
}


/***/ }),

/***/ "./src/main/ts/Todolist/TodoView.ts":
/*!******************************************!*\
  !*** ./src/main/ts/Todolist/TodoView.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TODO": () => (/* binding */ TODO),
/* harmony export */   "TodoView": () => (/* binding */ TodoView)
/* harmony export */ });
/* harmony import */ var _Messenger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Messenger */ "./src/main/ts/Messenger.ts");
/* harmony import */ var _YbmWebSocket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../YbmWebSocket */ "./src/main/ts/YbmWebSocket.ts");
/* harmony import */ var _EditTodo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EditTodo */ "./src/main/ts/Todolist/EditTodo.ts");
/* harmony import */ var _Todolist__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Todolist */ "./src/main/ts/Todolist/Todolist.ts");
/* harmony import */ var _TodoMediator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TodoMediator */ "./src/main/ts/Todolist/TodoMediator.ts");





/**
 *DOM要素が読み込み完了だったらOKな処理
 */
window.addEventListener("DOMContentLoaded", function () {
    new TODO();
}, false);
class TODO {
    constructor() {
        const todoView = new TodoView();
        const editTodo = new _EditTodo__WEBPACK_IMPORTED_MODULE_2__.EditTodo();
        // eventIdの文字列部分は、いづれ画面から取得したい
        const webSocket = new _YbmWebSocket__WEBPACK_IMPORTED_MODULE_1__.YbmWebSocket("/ws-stomp");
        const messenger = new _Messenger__WEBPACK_IMPORTED_MODULE_0__.Messenger();
        TODO.mediator = new _TodoMediator__WEBPACK_IMPORTED_MODULE_4__.TodoMediator(todoView, editTodo, webSocket, messenger);
        const eventIdElm = document.getElementById("choose-event");
        if (eventIdElm.value) {
            TODO.mediator.connectWebSocket(eventIdElm.value);
        }
        else {
            throw new Error(`イベントIDが取得できないため、STOMP通信を開始できません。[eventId: ${eventIdElm.value}]`);
        }
    }
}
class TodoView {
    constructor() {
        this._todoArea = document.getElementById("todolist-container");
        this._btnOpenNewTodo = document.getElementById("btn-open-new-todo");
        this._editTodoArea = document.getElementById("edit-todo-area");
        this._filter = document.getElementById("edit-todo-filter");
        this._editing = false;
        this._todolist = new _Todolist__WEBPACK_IMPORTED_MODULE_3__.Todolist(this._todoArea, this.createTodoCardTemplate());
        this.addEventOpenNewTodo();
        this.addEventOpenEditTodo();
        this.addEventChangeEvent();
        this.stopPropagation();
    }
    // ----- TODO画面のTODOカードのテンプレート
    createTodoCardTemplate() {
        const elm = document.createElement("div");
        return elm;
    }
    // ----- 新規TODO作成 周りのイベントを定義
    addEventOpenNewTodo() {
        this._btnOpenNewTodo.addEventListener("click", () => {
            TODO.mediator.openTodo(undefined);
        }, false);
    }
    // ----- TODO更新 周りのイベントを定義
    addEventOpenEditTodo() {
        for (let elm of this._todolist.getTodolist()) {
            elm.addEventListener("click", () => {
                TODO.mediator.openTodo(elm);
            }, false);
        }
    }
    // ----- イベントの変更を検知
    addEventChangeEvent() {
        const selectEventIdElm = document.getElementById("choose-event");
        selectEventIdElm.addEventListener("change", function () {
            TODO.mediator.disconnectWebSocket();
            TODO.mediator.connectWebSocket(this.value);
            // TODO 今のTodolist情報を、そのイベントように洗替する処理
        }, false);
    }
    // ----- TODOのオープン/クローズ
    openTodo() {
        this._filter.classList.add("active");
        this._editTodoArea.classList.add("active");
        this._editing = true;
    }
    closeTodo() {
        this._filter.classList.remove("active");
        this._editTodoArea.classList.remove("active");
        this._editing = false;
    }
    // ----- イベント制御
    stopPropagation() {
        let stopSelectors = [".todo-box .select.reminder-notice-time",
            ".todo-box .select.reminder-repeat",
            ".todo-box .checklist li",
            ".btn-save-todolist",
            ".todo-box .todo-controle"];
        const stopElmArys = stopSelectors.map(selector => {
            return Array.from(document.querySelectorAll(selector));
        });
        const stopElms = stopElmArys.flat();
        for (let elm of stopElms) {
            this.stopClickPropagation(elm);
        }
    }
    // TODO anyはやめたい
    receiveUpdatedTodo(data) {
        console.log("web socket成功");
        console.log(data);
        const todo = JSON.parse(data.body);
        if (this._todolist.contains(todo.todoId)) {
            this._todolist.updateTodoCard(todo);
        }
        else {
            this._todolist.createTodoCard(todo);
        }
    }
    stopClickPropagation(elm) {
        if (!elm) {
            return false;
        }
        elm.addEventListener("click", function (e) {
            e.stopPropagation();
        }, false);
    }
    isEditing() {
        return this._editing;
    }
}


/***/ }),

/***/ "./src/main/ts/Todolist/Todolist.ts":
/*!******************************************!*\
  !*** ./src/main/ts/Todolist/Todolist.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Todolist": () => (/* binding */ Todolist)
/* harmony export */ });
/* harmony import */ var _TodoView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TodoView */ "./src/main/ts/Todolist/TodoView.ts");

class Todolist {
    constructor(todoArea, cardTemplate) {
        this._todoArea = todoArea;
        this._cardTemplate = cardTemplate;
        this._list = document.getElementsByClassName("todo-box");
        this._map = new Map();
        for (let i = 0, ilen = this._list.length; i < ilen; i++) {
            let todoIdElm = this._list[i].getElementsByClassName("todo-id")[0];
            if (todoIdElm) {
                let todoId = todoIdElm.value;
                this._map.set(todoId, this._list[i]);
            }
        }
    }
    contains(todoId) {
        if (!todoId)
            return false;
        return this._map.has(todoId);
    }
    reflectTodo(todoCard, todo) {
        todoCard.getElementsByClassName("event-id")[0].value = todo.eventId;
        todoCard.getElementsByClassName("todo-id")[0].value = todo.todoId;
        todoCard.getElementsByClassName("text title")[0].value = todo.title;
        todoCard.getElementsByClassName("label title")[0].innerText = todo.title;
        todoCard.getElementsByClassName("text content")[0].value = todo.content;
        todoCard.getElementsByClassName("label content")[0].innerText = todo.content;
        todoCard.getElementsByClassName("select reminder-notice-time")[0].value = todo.reminderNoticeTime;
        todoCard.getElementsByClassName("select reminder-repeat")[0].value = todo.reminderRepeat;
        todoCard.getElementsByClassName("text todo-start-date")[0].value = todo.todoStartDate;
        todoCard.getElementsByClassName("text todo-start-time")[0].value = todo.todoStartTime;
        todoCard.getElementsByClassName("hid todo-create-user-id")[0].value = todo.createUserId;
        todoCard.getElementsByClassName("hid todo-create-user-name")[0].value = todo.createUserName;
        todoCard.getElementsByClassName("hid todo-create-datetime")[0].value = todo.createDatetime;
        todoCard.getElementsByClassName("hid todo-update-user-id")[0].value = todo.updateUserId;
        todoCard.getElementsByClassName("hid todo-update-user-name")[0].value = todo.updateUserName;
        todoCard.getElementsByClassName("hid todo-update-datetime")[0].value = todo.updateDatetime;
        const checklistArea = document.querySelector("#checklist-area ul.checklist");
        const checklist = todoCard.querySelectorAll("ul.checklist li");
        for (let checkItem of checklist) {
            checklistArea.appendChild(checkItem.cloneNode(true));
        }
    }
    createTodoCard(todo) {
        // 新規のTODOを、引数のobjの情報を元に作成する
        const newCard = this._cardTemplate.cloneNode(true);
        this.reflectTodo(newCard, todo);
        this._todoArea.appendChild(newCard);
        return newCard;
    }
    updateTodoCard(todo) {
        // 既存のTODOを引数のオブジェクトのtodoIdを元に引っ張り出し、
        // 引数のtodoオブジェクトで上書きする。
        const updateCard = this._map.get(todo.todoId);
        this.reflectTodo(updateCard, todo);
        if (_TodoView__WEBPACK_IMPORTED_MODULE_0__.TODO.mediator.isEditing()) {
            _TodoView__WEBPACK_IMPORTED_MODULE_0__.TODO.mediator.copyEditTodo(updateCard);
        }
        return updateCard;
    }
    getTodolist() {
        return this._list;
    }
}
class TodoCard {
}


/***/ }),

/***/ "./src/main/ts/YbmWebSocket.ts":
/*!*************************************!*\
  !*** ./src/main/ts/YbmWebSocket.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "YbmWebSocket": () => (/* binding */ YbmWebSocket)
/* harmony export */ });
/* harmony import */ var sockjs_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sockjs-client */ "./node_modules/sockjs-client/lib/entry.js");
/* harmony import */ var sockjs_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sockjs_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var stompjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! stompjs */ "./node_modules/stompjs/index.js");
/* harmony import */ var stompjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(stompjs__WEBPACK_IMPORTED_MODULE_1__);


class YbmWebSocket {
    constructor(endpoint) {
        this._socket = new (sockjs_client__WEBPACK_IMPORTED_MODULE_0___default())(endpoint);
        this._stompClient = stompjs__WEBPACK_IMPORTED_MODULE_1__.over(this._socket);
    }
    connectWebSocket(subUrl, callBack) {
        this._stompClient.connect({}, (frame) => {
            console.log("Connected:" + frame);
            this._stompClient.subscribe(subUrl, function (data) {
                //console.log("receive data:" + JSON.parse(data.body).content);
                callBack(data);
            });
        });
    }
    disconnectWebSocket() {
        if (this._stompClient !== null) {
            this._stompClient.disconnect();
        }
    }
    send(url, json) {
        this._stompClient.send(url, {}, json);
    }
}


/***/ }),

/***/ "./node_modules/url-parse/index.js":
/*!*****************************************!*\
  !*** ./node_modules/url-parse/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var required = __webpack_require__(/*! requires-port */ "./node_modules/requires-port/index.js")
  , qs = __webpack_require__(/*! querystringify */ "./node_modules/querystringify/index.js")
  , slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//
  , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i
  , windowsDriveLetter = /^[a-zA-Z]:/
  , whitespace = '[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]'
  , left = new RegExp('^'+ whitespace +'+');

/**
 * Trim a given string.
 *
 * @param {String} str String to trim.
 * @public
 */
function trimLeft(str) {
  return (str ? str : '').toString().replace(left, '');
}

/**
 * These are the parse rules for the URL parser, it informs the parser
 * about:
 *
 * 0. The char it Needs to parse, if it's a string it should be done using
 *    indexOf, RegExp using exec and NaN means set as current value.
 * 1. The property we should set when parsing this value.
 * 2. Indication if it's backwards or forward parsing, when set as number it's
 *    the value of extra chars that should be split off.
 * 3. Inherit from location if non existing in the parser.
 * 4. `toLowerCase` the resulting value.
 */
var rules = [
  ['#', 'hash'],                        // Extract from the back.
  ['?', 'query'],                       // Extract from the back.
  function sanitize(address, url) {     // Sanitize what is left of the address
    return isSpecial(url.protocol) ? address.replace(/\\/g, '/') : address;
  },
  ['/', 'pathname'],                    // Extract from the back.
  ['@', 'auth', 1],                     // Extract from the front.
  [NaN, 'host', undefined, 1, 1],       // Set left over value.
  [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
];

/**
 * These properties should not be copied or inherited from. This is only needed
 * for all non blob URL's as a blob URL does not include a hash, only the
 * origin.
 *
 * @type {Object}
 * @private
 */
var ignore = { hash: 1, query: 1 };

/**
 * The location object differs when your code is loaded through a normal page,
 * Worker or through a worker using a blob. And with the blobble begins the
 * trouble as the location object will contain the URL of the blob, not the
 * location of the page where our code is loaded in. The actual origin is
 * encoded in the `pathname` so we can thankfully generate a good "default"
 * location from it so we can generate proper relative URL's again.
 *
 * @param {Object|String} loc Optional default location object.
 * @returns {Object} lolcation object.
 * @public
 */
function lolcation(loc) {
  var globalVar;

  if (typeof window !== 'undefined') globalVar = window;
  else if (typeof __webpack_require__.g !== 'undefined') globalVar = __webpack_require__.g;
  else if (typeof self !== 'undefined') globalVar = self;
  else globalVar = {};

  var location = globalVar.location || {};
  loc = loc || location;

  var finaldestination = {}
    , type = typeof loc
    , key;

  if ('blob:' === loc.protocol) {
    finaldestination = new Url(unescape(loc.pathname), {});
  } else if ('string' === type) {
    finaldestination = new Url(loc, {});
    for (key in ignore) delete finaldestination[key];
  } else if ('object' === type) {
    for (key in loc) {
      if (key in ignore) continue;
      finaldestination[key] = loc[key];
    }

    if (finaldestination.slashes === undefined) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }

  return finaldestination;
}

/**
 * Check whether a protocol scheme is special.
 *
 * @param {String} The protocol scheme of the URL
 * @return {Boolean} `true` if the protocol scheme is special, else `false`
 * @private
 */
function isSpecial(scheme) {
  return (
    scheme === 'file:' ||
    scheme === 'ftp:' ||
    scheme === 'http:' ||
    scheme === 'https:' ||
    scheme === 'ws:' ||
    scheme === 'wss:'
  );
}

/**
 * @typedef ProtocolExtract
 * @type Object
 * @property {String} protocol Protocol matched in the URL, in lowercase.
 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
 * @property {String} rest Rest of the URL that is not part of the protocol.
 */

/**
 * Extract protocol information from a URL with/without double slash ("//").
 *
 * @param {String} address URL we want to extract from.
 * @param {Object} location
 * @return {ProtocolExtract} Extracted information.
 * @private
 */
function extractProtocol(address, location) {
  address = trimLeft(address);
  location = location || {};

  var match = protocolre.exec(address);
  var protocol = match[1] ? match[1].toLowerCase() : '';
  var forwardSlashes = !!match[2];
  var otherSlashes = !!match[3];
  var slashesCount = 0;
  var rest;

  if (forwardSlashes) {
    if (otherSlashes) {
      rest = match[2] + match[3] + match[4];
      slashesCount = match[2].length + match[3].length;
    } else {
      rest = match[2] + match[4];
      slashesCount = match[2].length;
    }
  } else {
    if (otherSlashes) {
      rest = match[3] + match[4];
      slashesCount = match[3].length;
    } else {
      rest = match[4]
    }
  }

  if (protocol === 'file:') {
    if (slashesCount >= 2) {
      rest = rest.slice(2);
    }
  } else if (isSpecial(protocol)) {
    rest = match[4];
  } else if (protocol) {
    if (forwardSlashes) {
      rest = rest.slice(2);
    }
  } else if (slashesCount >= 2 && isSpecial(location.protocol)) {
    rest = match[4];
  }

  return {
    protocol: protocol,
    slashes: forwardSlashes || isSpecial(protocol),
    slashesCount: slashesCount,
    rest: rest
  };
}

/**
 * Resolve a relative URL pathname against a base URL pathname.
 *
 * @param {String} relative Pathname of the relative URL.
 * @param {String} base Pathname of the base URL.
 * @return {String} Resolved pathname.
 * @private
 */
function resolve(relative, base) {
  if (relative === '') return base;

  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
    , i = path.length
    , last = path[i - 1]
    , unshift = false
    , up = 0;

  while (i--) {
    if (path[i] === '.') {
      path.splice(i, 1);
    } else if (path[i] === '..') {
      path.splice(i, 1);
      up++;
    } else if (up) {
      if (i === 0) unshift = true;
      path.splice(i, 1);
      up--;
    }
  }

  if (unshift) path.unshift('');
  if (last === '.' || last === '..') path.push('');

  return path.join('/');
}

/**
 * The actual URL instance. Instead of returning an object we've opted-in to
 * create an actual constructor as it's much more memory efficient and
 * faster and it pleases my OCD.
 *
 * It is worth noting that we should not use `URL` as class name to prevent
 * clashes with the global URL instance that got introduced in browsers.
 *
 * @constructor
 * @param {String} address URL we want to parse.
 * @param {Object|String} [location] Location defaults for relative paths.
 * @param {Boolean|Function} [parser] Parser for the query string.
 * @private
 */
function Url(address, location, parser) {
  address = trimLeft(address);

  if (!(this instanceof Url)) {
    return new Url(address, location, parser);
  }

  var relative, extracted, parse, instruction, index, key
    , instructions = rules.slice()
    , type = typeof location
    , url = this
    , i = 0;

  //
  // The following if statements allows this module two have compatibility with
  // 2 different API:
  //
  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
  //    where the boolean indicates that the query string should also be parsed.
  //
  // 2. The `URL` interface of the browser which accepts a URL, object as
  //    arguments. The supplied object will be used as default values / fall-back
  //    for relative paths.
  //
  if ('object' !== type && 'string' !== type) {
    parser = location;
    location = null;
  }

  if (parser && 'function' !== typeof parser) parser = qs.parse;

  location = lolcation(location);

  //
  // Extract protocol information before running the instructions.
  //
  extracted = extractProtocol(address || '', location);
  relative = !extracted.protocol && !extracted.slashes;
  url.slashes = extracted.slashes || relative && location.slashes;
  url.protocol = extracted.protocol || location.protocol || '';
  address = extracted.rest;

  //
  // When the authority component is absent the URL starts with a path
  // component.
  //
  if (
    extracted.protocol === 'file:' && (
      extracted.slashesCount !== 2 || windowsDriveLetter.test(address)) ||
    (!extracted.slashes &&
      (extracted.protocol ||
        extracted.slashesCount < 2 ||
        !isSpecial(url.protocol)))
  ) {
    instructions[3] = [/(.*)/, 'pathname'];
  }

  for (; i < instructions.length; i++) {
    instruction = instructions[i];

    if (typeof instruction === 'function') {
      address = instruction(address, url);
      continue;
    }

    parse = instruction[0];
    key = instruction[1];

    if (parse !== parse) {
      url[key] = address;
    } else if ('string' === typeof parse) {
      if (~(index = address.indexOf(parse))) {
        if ('number' === typeof instruction[2]) {
          url[key] = address.slice(0, index);
          address = address.slice(index + instruction[2]);
        } else {
          url[key] = address.slice(index);
          address = address.slice(0, index);
        }
      }
    } else if ((index = parse.exec(address))) {
      url[key] = index[1];
      address = address.slice(0, index.index);
    }

    url[key] = url[key] || (
      relative && instruction[3] ? location[key] || '' : ''
    );

    //
    // Hostname, host and protocol should be lowercased so they can be used to
    // create a proper `origin`.
    //
    if (instruction[4]) url[key] = url[key].toLowerCase();
  }

  //
  // Also parse the supplied query string in to an object. If we're supplied
  // with a custom parser as function use that instead of the default build-in
  // parser.
  //
  if (parser) url.query = parser(url.query);

  //
  // If the URL is relative, resolve the pathname against the base URL.
  //
  if (
      relative
    && location.slashes
    && url.pathname.charAt(0) !== '/'
    && (url.pathname !== '' || location.pathname !== '')
  ) {
    url.pathname = resolve(url.pathname, location.pathname);
  }

  //
  // Default to a / for pathname if none exists. This normalizes the URL
  // to always have a /
  //
  if (url.pathname.charAt(0) !== '/' && isSpecial(url.protocol)) {
    url.pathname = '/' + url.pathname;
  }

  //
  // We should not add port numbers if they are already the default port number
  // for a given protocol. As the host also contains the port number we're going
  // override it with the hostname which contains no port number.
  //
  if (!required(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = '';
  }

  //
  // Parse down the `auth` for the username and password.
  //
  url.username = url.password = '';
  if (url.auth) {
    instruction = url.auth.split(':');
    url.username = instruction[0];
    url.password = instruction[1] || '';
  }

  url.origin = url.protocol !== 'file:' && isSpecial(url.protocol) && url.host
    ? url.protocol +'//'+ url.host
    : 'null';

  //
  // The href is just the compiled result.
  //
  url.href = url.toString();
}

/**
 * This is convenience method for changing properties in the URL instance to
 * insure that they all propagate correctly.
 *
 * @param {String} part          Property we need to adjust.
 * @param {Mixed} value          The newly assigned value.
 * @param {Boolean|Function} fn  When setting the query, it will be the function
 *                               used to parse the query.
 *                               When setting the protocol, double slash will be
 *                               removed from the final url if it is true.
 * @returns {URL} URL instance for chaining.
 * @public
 */
function set(part, value, fn) {
  var url = this;

  switch (part) {
    case 'query':
      if ('string' === typeof value && value.length) {
        value = (fn || qs.parse)(value);
      }

      url[part] = value;
      break;

    case 'port':
      url[part] = value;

      if (!required(value, url.protocol)) {
        url.host = url.hostname;
        url[part] = '';
      } else if (value) {
        url.host = url.hostname +':'+ value;
      }

      break;

    case 'hostname':
      url[part] = value;

      if (url.port) value += ':'+ url.port;
      url.host = value;
      break;

    case 'host':
      url[part] = value;

      if (/:\d+$/.test(value)) {
        value = value.split(':');
        url.port = value.pop();
        url.hostname = value.join(':');
      } else {
        url.hostname = value;
        url.port = '';
      }

      break;

    case 'protocol':
      url.protocol = value.toLowerCase();
      url.slashes = !fn;
      break;

    case 'pathname':
    case 'hash':
      if (value) {
        var char = part === 'pathname' ? '/' : '#';
        url[part] = value.charAt(0) !== char ? char + value : value;
      } else {
        url[part] = value;
      }
      break;

    case 'username':
    case 'password':
      url[part] = encodeURIComponent(value);
      break;

    case 'auth':
      var splits = value.split(':');
      url.username = splits[0];
      url.password = splits.length === 2 ? splits[1] : '';
  }

  for (var i = 0; i < rules.length; i++) {
    var ins = rules[i];

    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
  }

  url.auth = url.password ? url.username +':'+ url.password : url.username;

  url.origin = url.protocol !== 'file:' && isSpecial(url.protocol) && url.host
    ? url.protocol +'//'+ url.host
    : 'null';

  url.href = url.toString();

  return url;
}

/**
 * Transform the properties back in to a valid and full URL string.
 *
 * @param {Function} stringify Optional query stringify function.
 * @returns {String} Compiled version of the URL.
 * @public
 */
function toString(stringify) {
  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

  var query
    , url = this
    , protocol = url.protocol;

  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

  var result =
    protocol +
    ((url.protocol && url.slashes) || isSpecial(url.protocol) ? '//' : '');

  if (url.username) {
    result += url.username;
    if (url.password) result += ':'+ url.password;
    result += '@';
  } else if (url.password) {
    result += ':'+ url.password;
    result += '@';
  }

  result += url.host + url.pathname;

  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

  if (url.hash) result += url.hash;

  return result;
}

Url.prototype = { set: set, toString: toString };

//
// Expose the URL parser and some additional properties that might be useful for
// others or testing.
//
Url.extractProtocol = extractProtocol;
Url.location = lolcation;
Url.trimLeft = trimLeft;
Url.qs = qs;

module.exports = Url;


/***/ }),

/***/ "./node_modules/websocket/lib/browser.js":
/*!***********************************************!*\
  !*** ./node_modules/websocket/lib/browser.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _globalThis;
if (typeof globalThis === 'object') {
	_globalThis = globalThis;
} else {
	try {
		_globalThis = __webpack_require__(/*! es5-ext/global */ "./node_modules/es5-ext/global.js");
	} catch (error) {
	} finally {
		if (!_globalThis && typeof window !== 'undefined') { _globalThis = window; }
		if (!_globalThis) { throw new Error('Could not determine global this'); }
	}
}

var NativeWebSocket = _globalThis.WebSocket || _globalThis.MozWebSocket;
var websocket_version = __webpack_require__(/*! ./version */ "./node_modules/websocket/lib/version.js");


/**
 * Expose a W3C WebSocket class with just one or two arguments.
 */
function W3CWebSocket(uri, protocols) {
	var native_instance;

	if (protocols) {
		native_instance = new NativeWebSocket(uri, protocols);
	}
	else {
		native_instance = new NativeWebSocket(uri);
	}

	/**
	 * 'native_instance' is an instance of nativeWebSocket (the browser's WebSocket
	 * class). Since it is an Object it will be returned as it is when creating an
	 * instance of W3CWebSocket via 'new W3CWebSocket()'.
	 *
	 * ECMAScript 5: http://bclary.com/2004/11/07/#a-13.2.2
	 */
	return native_instance;
}
if (NativeWebSocket) {
	['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'].forEach(function(prop) {
		Object.defineProperty(W3CWebSocket, prop, {
			get: function() { return NativeWebSocket[prop]; }
		});
	});
}

/**
 * Module exports.
 */
module.exports = {
    'w3cwebsocket' : NativeWebSocket ? W3CWebSocket : null,
    'version'      : websocket_version
};


/***/ }),

/***/ "./node_modules/websocket/lib/version.js":
/*!***********************************************!*\
  !*** ./node_modules/websocket/lib/version.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ../package.json */ "./node_modules/websocket/package.json").version;


/***/ }),

/***/ "./node_modules/websocket/package.json":
/*!*********************************************!*\
  !*** ./node_modules/websocket/package.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"websocket","description":"Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.","keywords":["websocket","websockets","socket","networking","comet","push","RFC-6455","realtime","server","client"],"author":"Brian McKelvey <theturtle32@gmail.com> (https://github.com/theturtle32)","contributors":["Iñaki Baz Castillo <ibc@aliax.net> (http://dev.sipdoc.net)"],"version":"1.0.34","repository":{"type":"git","url":"https://github.com/theturtle32/WebSocket-Node.git"},"homepage":"https://github.com/theturtle32/WebSocket-Node","engines":{"node":">=4.0.0"},"dependencies":{"bufferutil":"^4.0.1","debug":"^2.2.0","es5-ext":"^0.10.50","typedarray-to-buffer":"^3.1.5","utf-8-validate":"^5.0.2","yaeti":"^0.0.6"},"devDependencies":{"buffer-equal":"^1.0.0","gulp":"^4.0.2","gulp-jshint":"^2.0.4","jshint-stylish":"^2.2.1","jshint":"^2.0.0","tape":"^4.9.1"},"config":{"verbose":false},"scripts":{"test":"tape test/unit/*.js","gulp":"gulp"},"main":"index","directories":{"lib":"./lib"},"browser":"lib/browser.js","license":"Apache-2.0"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd options */
/******/ 	(() => {
/******/ 		__webpack_require__.amdO = {};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main/ts/Todolist/TodoView.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbWFpbi9yZXNvdXJjZXMvc3RhdGljL2pzL3RvZG9saXN0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsY0FBYztBQUNwQztBQUNBLEdBQUc7QUFDSCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7QUNsQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDMUJBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxpQkFBaUIsS0FBNEIsSUFBSSx3QkFBVTs7QUFFM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsUUFBYSwwQ0FBMEMscUJBQU0sZ0JBQWdCLHFCQUFNOztBQUVqSTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsWUFBWTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRDs7QUFFL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQ7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLDBCQUEwQjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTs7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dUMsV0FBVztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxrREFBa0QsMENBQTBDO0FBQzVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsV0FBVztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLFdBQVc7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLFdBQVc7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLFdBQVc7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUEsTUFBTSxLQUE4QjtBQUNwQyxJQUFJLGFBQWE7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2ZU0sU0FBUyxVQUFVLENBQUMsR0FBZSxFQUFFLE9BQWM7SUFFekQsSUFBRyxPQUFPLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxFQUFFO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDbkQsSUFBRyxHQUFHLEtBQUssSUFBSTtRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQzdCLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUNqQixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFDO1FBQzFCLE1BQU0sR0FBZ0IsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUN4QyxJQUFHLE1BQU0sQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFDO1lBQzNDLE9BQU8sTUFBTSxDQUFDO1NBQ2Q7S0FDRDtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaZ0M7QUFFMUIsTUFBTSxTQUFTO0lBa0JyQjtRQVpRLFdBQU0sR0FBRztZQUNaLGFBQWEsRUFBRSxjQUFjO1lBQzdCLGFBQWEsRUFBRSxjQUFjO1NBQzdCLENBQUM7UUFFRSxjQUFTLEdBQUc7WUFDZixTQUFTLEVBQUUsU0FBUztZQUNwQixTQUFTLEVBQUUsU0FBUztZQUNwQixrQkFBa0IsRUFBRSxvQkFBb0I7WUFDeEMsTUFBTSxFQUFFLE1BQU07U0FDZCxDQUFDO1FBR0wsSUFBSSxDQUFDLElBQUksR0FBZ0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxZQUFZLEdBQWdCLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDdEQsQ0FBQztJQUVPLHFCQUFxQjtRQUM1QixNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLElBQUksR0FBQyxRQUFRLENBQUM7UUFDckIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBRXZCLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQixPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFDTyxxQkFBcUIsQ0FBQyxNQUFtQjtRQUNoRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1lBQ2hDLE1BQU0sRUFBRSxHQUFnQiwrQ0FBZSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN0RCxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDYixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBQ00sV0FBVyxDQUFDLE9BQWUsRUFBRSxVQUFrQjtRQUNyRCxNQUFNLEdBQUcsR0FBZ0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvRCxNQUFNLE1BQU0sR0FBZ0IsR0FBRyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRixJQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckIsR0FBRyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztRQUN6RixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7UUFDdkIsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFDTSxXQUFXLENBQUMsTUFBbUI7UUFDckMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDO0NBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNEaUM7QUFDVTtBQVNyQyxNQUFNLFFBQVE7SUE0QnBCLFFBQVE7SUFDUjtRQUNDLElBQUksQ0FBQyxXQUFXLEdBQXFCLFFBQVEsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsVUFBVSxHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLGdCQUFnQixHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDN0YsSUFBSSxDQUFDLGtCQUFrQixHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDakcsSUFBSSxDQUFDLGtCQUFrQixHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDaEcsSUFBSSxDQUFDLGdCQUFnQixHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDN0YsSUFBSSxDQUFDLGtCQUFrQixHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDakcsSUFBSSxDQUFDLGtCQUFrQixHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFFaEcsSUFBSSxDQUFDLFFBQVEsR0FBZ0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxTQUFTLEdBQXFCLFFBQVEsQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsV0FBVyxHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDdkYsSUFBSSxDQUFDLGNBQWMsR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBbUIsOEJBQThCLENBQUMsQ0FBQztRQUNqSCxJQUFJLENBQUMsZUFBZSxHQUFnQixRQUFRLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLHNCQUFzQixHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDMUcsSUFBSSxDQUFDLGtCQUFrQixHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDakcsSUFBSSxDQUFDLGFBQWEsR0FBcUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3RGLElBQUksQ0FBQyxhQUFhLEdBQXFCLFFBQVEsQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUN0RixJQUFJLENBQUMsWUFBWSxHQUFnQixRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxVQUFVLEdBQWdCLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsa0JBQWtCLEdBQWdCLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQ3RFLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUNELGFBQWEsQ0FBQyxHQUF1QjtRQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFtQixzQkFBc0IsQ0FBQyxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDdkcsSUFBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFDO1lBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUFDO1FBQzlELElBQUcsR0FBRyxLQUFLLFNBQVMsRUFBQztZQUNwQixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUNNLGNBQWMsQ0FBQyxHQUFXO1FBQ2hDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNPLGVBQWUsQ0FBQyxHQUFXO1FBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQW1CLFVBQVUsQ0FBQyxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDckYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBbUIsYUFBYSxDQUFDLEVBQUUsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUN2RixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRSxHQUFHLENBQUMsYUFBYSxDQUFtQixlQUFlLENBQUMsRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDO1FBQzFGLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLEdBQUUsR0FBRyxDQUFDLGFBQWEsQ0FBbUIsOEJBQThCLENBQUMsRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ3BILElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEdBQUUsR0FBRyxDQUFDLGFBQWEsQ0FBbUIseUJBQXlCLENBQUMsRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDO1FBQzNHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFFLEdBQUcsQ0FBQyxhQUFhLENBQW1CLHVCQUF1QixDQUFDLEVBQUUsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNwRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRSxHQUFHLENBQUMsYUFBYSxDQUFtQix1QkFBdUIsQ0FBQyxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDcEcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssR0FBRSxHQUFHLENBQUMsYUFBYSxDQUFtQiwwQkFBMEIsQ0FBQyxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDMUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssR0FBRSxHQUFHLENBQUMsYUFBYSxDQUFtQiw0QkFBNEIsQ0FBQyxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDOUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssR0FBRSxHQUFHLENBQUMsYUFBYSxDQUFtQiwyQkFBMkIsQ0FBQyxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDN0csSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssR0FBRSxHQUFHLENBQUMsYUFBYSxDQUFtQiwwQkFBMEIsQ0FBQyxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDMUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssR0FBRSxHQUFHLENBQUMsYUFBYSxDQUFtQiw0QkFBNEIsQ0FBQyxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDOUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssR0FBRSxHQUFHLENBQUMsYUFBYSxDQUFtQiwyQkFBMkIsQ0FBQyxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDN0csTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDMUQsS0FBSSxJQUFJLFNBQVMsSUFBSSxTQUFTLEVBQUM7WUFDOUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzNEO0lBQ0YsQ0FBQztJQUVELEtBQUs7UUFDSixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRSxFQUFFLENBQUM7UUFDM0IsT0FBTSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBQztZQUNwQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ2hFO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsaUJBQWlCO0lBQ1QscUJBQXFCO1FBQzVCLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDbkQsTUFBTSxjQUFjLEdBQWdCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDaEQsTUFBTSxNQUFNLEdBQUcsY0FBYyxDQUFDLGFBQWEsQ0FBYyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ2xGLElBQUcsTUFBTSxLQUFLLElBQUk7Z0JBQUUsT0FBTztZQUMzQixJQUFJLENBQUMsMEJBQTBCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUNPLGFBQWE7UUFDcEIsdURBQXVEO1FBQ3ZELElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUNoRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckIsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUNPLGVBQWU7UUFDdEIsa0NBQWtDO1FBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUM5Qyw4REFBdUIsRUFBRSxDQUFDO1FBQzNCLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNYLENBQUM7SUFDTSxZQUFZO1FBQ2xCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMvQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNCLElBQUksR0FBRyxHQUFHLGFBQWEsSUFBSSxDQUFDLE9BQU8sV0FBVyxDQUFDO1FBQy9DLElBQUcsTUFBTSxFQUFDO1lBQ1QsR0FBRyxHQUFHLGFBQWEsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxPQUFPLENBQUM7U0FDdEQ7UUFDRCxxREFBcUQ7UUFFckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFrQiwyQkFBMkIsQ0FBQyxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDdkcsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBa0Isb0JBQW9CLENBQUMsRUFBRSxPQUFPLElBQUksRUFBRSxDQUFDO1FBRTNGLHVFQUFnQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVELEtBQUssQ0FBQyxHQUFHLEVBQUM7WUFDWCxnQ0FBZ0M7WUFDOUIsTUFBTSxFQUFFLE1BQU07WUFDZCxPQUFPLEVBQUU7Z0JBQ1IsU0FBUyxFQUFJLE9BQU87Z0JBQ3BCLGNBQWMsRUFBRyxrQkFBa0I7Z0JBQ25DLENBQUMsVUFBVSxDQUFDLEVBQUcsS0FBSzthQUNwQjtZQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztTQUMxQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFDLEVBQUU7WUFDZCxJQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBQztnQkFDVixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQzthQUNsRDtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsT0FBTyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFDLEVBQUU7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLHVFQUFnQyxFQUFFLENBQUM7WUFDbkMsZ0VBQXlCLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFDLEVBQUU7WUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCwrQkFBK0I7SUFDdkIsMkJBQTJCO1FBQ2xDLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBYyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3ZHLEtBQUksSUFBSSxHQUFHLElBQUksbUJBQW1CLEVBQUM7WUFDbEMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3JDO0lBQ0YsQ0FBQztJQUNPLDBCQUEwQixDQUFDLEdBQWdCO1FBQ2xELEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQ2xDLElBQUksTUFBTSxHQUFnQiwrQ0FBZSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNyRCxJQUFHLE1BQU0sS0FBSyxJQUFJO2dCQUFFLE9BQU87WUFDM0IsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2pCLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCx3QkFBd0I7SUFDeEIsdUJBQXVCO1FBQ3RCLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVCLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakQsUUFBUSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7UUFDM0IsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsSUFBSSxHQUFDLE1BQU0sQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQztRQUM1QixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxJQUFJLEdBQUMsUUFBUSxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFDdkIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QixNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQixFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDekMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QixPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFDTSxVQUFVO1FBQ2hCLE1BQU0sSUFBSSxHQUFhO1lBQ3RCLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7WUFDL0IsTUFBTSxFQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSztZQUM5QixLQUFLLEVBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLO1lBQzVCLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7WUFDL0IsU0FBUyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ2hELGFBQWEsRUFBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUs7WUFDdEMsYUFBYSxFQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSztZQUN0QyxlQUFlLEVBQUUsRUFBRTtZQUNuQixjQUFjLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUs7WUFDN0Msa0JBQWtCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUs7WUFDckQsWUFBWSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLO1lBQ3pDLGNBQWMsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSztZQUM3QyxjQUFjLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUs7WUFDN0MsWUFBWSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLO1lBQ3pDLGNBQWMsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSztZQUM3QyxjQUFjLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUs7U0FDN0MsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQUNELDhCQUE4QjtJQUM5QixpQkFBaUIsQ0FBQyxRQUFxQjtRQUN0QyxJQUFHLFFBQVEsS0FBSyxJQUFJO1lBQUUsT0FBTyxJQUFJLEtBQUssRUFBa0IsQ0FBQztRQUN6RCxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQWMsaUJBQWlCLENBQUMsQ0FBQztRQUM1RSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDZixNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBa0IsQ0FBQztRQUMxQyxNQUFNLGFBQWEsR0FBRyxJQUFJLEtBQUssRUFBZSxDQUFDO1FBRS9DLGNBQWM7UUFDZCxLQUFJLElBQUksU0FBUyxJQUFJLFNBQVMsRUFBQztZQUM5QixNQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQW1CLFdBQVcsQ0FBQyxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDNUYsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBbUIsVUFBVSxDQUFDLEVBQUUsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUMxRixNQUFNLGVBQWUsR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFtQiw0QkFBNEIsQ0FBQyxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDN0csTUFBTSxnQkFBZ0IsR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFtQixpQkFBaUIsQ0FBQyxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUM7WUFFbkcsTUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBbUIsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDO1lBQzlGLHFDQUFxQztZQUNyQyxJQUFHLENBQUMsWUFBWSxFQUFDO2dCQUNoQixhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM5QixTQUFTO2FBQ1Q7WUFDRCxNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDL0MsSUFBRyxNQUFNLEdBQUcsZUFBZSxFQUFDO2dCQUMzQixNQUFNLEdBQUcsZUFBZSxDQUFDO2FBQ3pCO1lBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDVixPQUFPLEVBQUUsZ0JBQWdCO2dCQUN6QixNQUFNLEVBQUUsZUFBZTtnQkFDdkIsR0FBRyxFQUFFLGVBQWU7Z0JBQ3BCLFNBQVMsRUFBRSxNQUFNLENBQUMsZUFBZSxDQUFDLEtBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU87Z0JBQzVELE9BQU8sRUFBRSxnQkFBZ0I7YUFDekIsQ0FBQyxDQUFDO1NBQ0g7UUFDRCxxQkFBcUI7UUFDckIsS0FBSSxJQUFJLFlBQVksSUFBSSxhQUFhLEVBQUM7WUFDckMsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFtQixXQUFXLENBQUMsRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDO1lBQzVGLE1BQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQW1CLFVBQVUsQ0FBQyxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDMUYsTUFBTSxZQUFZLEdBQUcsRUFBRSxNQUFNLENBQUM7WUFDOUIsTUFBTSxlQUFlLEdBQUcsWUFBWSxDQUFDLGFBQWEsQ0FBbUIsNEJBQTRCLENBQUMsRUFBRSxPQUFPLElBQUksS0FBSyxDQUFDO1lBQ3JILE1BQU0sZ0JBQWdCLEdBQUcsWUFBWSxDQUFDLGFBQWEsQ0FBbUIsaUJBQWlCLENBQUMsRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3RHLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ1YsT0FBTyxFQUFFLGdCQUFnQjtnQkFDekIsTUFBTSxFQUFFLGVBQWU7Z0JBQ3ZCLEdBQUcsRUFBRSxZQUFZO2dCQUNqQixTQUFTLEVBQUUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPO2dCQUM1RCxPQUFPLEVBQUUsZ0JBQWdCO2FBQ3pCLENBQUMsQ0FBQztTQUNIO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZCxDQUFDO0lBQ00sS0FBSztRQUNYLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztDQUNEOzs7Ozs7Ozs7Ozs7Ozs7O0FDcFNNLE1BQU0sWUFBWTtJQVV4QixZQUFZLFFBQWlCLEVBQUUsUUFBaUIsRUFDN0MsWUFBMEIsRUFBRSxTQUFvQjtRQUNsRCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFTSxnQkFBZ0IsQ0FBQyxPQUFlO1FBQ3RDLG9EQUFvRDtRQUNwRCwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxJQUFTLEVBQUUsRUFBRTtZQUNuRSxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBRUosQ0FBQztJQUNNLG1CQUFtQjtRQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUNNLFFBQVEsQ0FBQyxHQUF3QjtRQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFDTSxTQUFTO1FBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFDTSxTQUFTO1FBQ2YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFDTSxZQUFZLENBQUMsR0FBWTtRQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ00sUUFBUSxDQUFDLEdBQVcsRUFBRSxlQUF1QjtRQUNuRCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVNLGtCQUFrQixDQUFDLE9BQWMsRUFBRSxNQUFjO1FBQ3ZELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBQ00sa0JBQWtCO1FBQ3hCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNqRCxJQUFHLENBQUMsV0FBVztZQUFFLE9BQU87UUFDeEIsSUFBRyxDQUFDLFdBQVcsQ0FBQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTTtZQUFFLE9BQU87UUFDdkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLFdBQVcsQ0FBQyxPQUFPLElBQUksV0FBVyxDQUFDLE1BQU0sVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFDTSxXQUFXLENBQUMsT0FBZSxFQUFFLFVBQWtCO1FBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2RXdDO0FBQ007QUFDVDtBQUVBO0FBQ1E7QUFFOUM7O0dBRUc7QUFDRixNQUFNLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUM7SUFDM0MsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUNaLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUVILE1BQU0sSUFBSTtJQUloQjtRQUNDLE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7UUFDaEMsTUFBTSxRQUFRLEdBQUcsSUFBSSwrQ0FBUSxFQUFFLENBQUM7UUFDaEMsOEJBQThCO1FBQzlCLE1BQU0sU0FBUyxHQUFHLElBQUksdURBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoRCxNQUFNLFNBQVMsR0FBRyxJQUFJLGlEQUFTLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksdURBQVksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUUzRSxNQUFNLFVBQVUsR0FBc0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM5RSxJQUFHLFVBQVUsQ0FBQyxLQUFLLEVBQUM7WUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakQ7YUFBSTtZQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsNkNBQTZDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQ2xGO0lBQ0YsQ0FBQztDQUNEO0FBUU0sTUFBTSxRQUFRO0lBU3BCO1FBQ0MsSUFBSSxDQUFDLFNBQVMsR0FBZ0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxlQUFlLEdBQWdCLFFBQVEsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsYUFBYSxHQUFnQixRQUFRLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLE9BQU8sR0FBZ0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBRXRCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSwrQ0FBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELDhCQUE4QjtJQUN0QixzQkFBc0I7UUFDN0IsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxPQUFPLEdBQUcsQ0FBQztJQUNaLENBQUM7SUFFRCw0QkFBNEI7SUFDcEIsbUJBQW1CO1FBQzFCLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUNuRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsMEJBQTBCO0lBQ2xCLG9CQUFvQjtRQUMzQixLQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUM7WUFDM0MsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdCLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNWO0lBQ0YsQ0FBQztJQUVELG1CQUFtQjtJQUNYLG1CQUFtQjtRQUMxQixNQUFNLGdCQUFnQixHQUFzQixRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3BGLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRTtZQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0MscUNBQXFDO1FBQ3RDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCx1QkFBdUI7SUFDaEIsUUFBUTtRQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUNNLFNBQVM7UUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxlQUFlO0lBQ1AsZUFBZTtRQUV0QixJQUFJLGFBQWEsR0FBRyxDQUFDLHdDQUF3QztZQUN4RCxtQ0FBbUM7WUFDbkMseUJBQXlCO1lBQ3pCLG9CQUFvQjtZQUNwQiwwQkFBMEIsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sV0FBVyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDaEQsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBYyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BDLEtBQUksSUFBSSxHQUFHLElBQUksUUFBUSxFQUFDO1lBQ3ZCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMvQjtJQUNGLENBQUM7SUFDRCxnQkFBZ0I7SUFDaEIsa0JBQWtCLENBQUMsSUFBUztRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsTUFBTSxJQUFJLEdBQWMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsSUFBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUM7WUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEM7YUFBSTtZQUNKLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BDO0lBQ0YsQ0FBQztJQUVPLG9CQUFvQixDQUFDLEdBQWdCO1FBQzVDLElBQUcsQ0FBQyxHQUFHLEVBQUM7WUFDUCxPQUFPLEtBQUssQ0FBQztTQUNiO1FBQ0QsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFTLENBQUM7WUFDdkMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3JCLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNYLENBQUM7SUFDTSxTQUFTO1FBQ2YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3RCLENBQUM7Q0FFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuSmlDO0FBRTNCLE1BQU0sUUFBUTtJQU9wQixZQUFZLFFBQXFCLEVBQUUsWUFBeUI7UUFDM0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUM7UUFFbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFDO1lBQzdDLElBQUksU0FBUyxHQUF1QyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZHLElBQUcsU0FBUyxFQUFDO2dCQUNULElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDeEM7U0FDVjtJQUNGLENBQUM7SUFDTSxRQUFRLENBQUMsTUFBYztRQUM3QixJQUFHLENBQUMsTUFBTTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVNLFdBQVcsQ0FBQyxRQUFxQixFQUFFLElBQWU7UUFDckMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3JFLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNuRSxRQUFRLENBQUMsc0JBQXNCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDMUUsUUFBUSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3JFLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM5RSxRQUFRLENBQUMsc0JBQXNCLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDekUsUUFBUSxDQUFDLHNCQUFzQixDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUNuRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUMxRixRQUFRLENBQUMsc0JBQXNCLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN2RixRQUFRLENBQUMsc0JBQXNCLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN2RixRQUFRLENBQUMsc0JBQXNCLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUN6RixRQUFRLENBQUMsc0JBQXNCLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUM3RixRQUFRLENBQUMsc0JBQXNCLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUM1RixRQUFRLENBQUMsc0JBQXNCLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUN6RixRQUFRLENBQUMsc0JBQXNCLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUM3RixRQUFRLENBQUMsc0JBQXNCLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUUvRyxNQUFNLGFBQWEsR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBbUIsOEJBQThCLENBQUMsQ0FBQztRQUNqSCxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMvRCxLQUFJLElBQUksU0FBUyxJQUFJLFNBQVMsRUFBQztZQUM5QixhQUFhLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNyRDtJQUNGLENBQUM7SUFFTSxjQUFjLENBQUMsSUFBZTtRQUNwQyw0QkFBNEI7UUFDNUIsTUFBTSxPQUFPLEdBQTRCLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlCLE9BQU8sT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFDTSxjQUFjLENBQUMsSUFBZTtRQUNwQyxxQ0FBcUM7UUFDckMsdUJBQXVCO1FBQ3ZCLE1BQU0sVUFBVSxHQUE0QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkMsSUFBRyw4REFBdUIsRUFBRSxFQUFDO1lBQUUsaUVBQTBCLENBQUMsVUFBVSxDQUFDLENBQUM7U0FBRTtRQUN4RSxPQUFPLFVBQVUsQ0FBQztJQUNuQixDQUFDO0lBQ00sV0FBVztRQUNqQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDbkIsQ0FBQztDQUVEO0FBRUQsTUFBTSxRQUFRO0NBRWI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0V1QztBQUNQO0FBRzFCLE1BQU0sWUFBWTtJQUt4QixZQUFZLFFBQWdCO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxzREFBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxZQUFZLEdBQUcseUNBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELGdCQUFnQixDQUFDLE1BQWMsRUFBRSxRQUFrQjtRQUNsRCxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFZLEVBQUUsRUFBRTtZQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsVUFBUyxJQUFXO2dCQUN2RCwrREFBK0Q7Z0JBQy9ELFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFDRCxtQkFBbUI7UUFDbEIsSUFBRyxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksRUFBQztZQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQy9CO0lBQ0YsQ0FBQztJQUNELElBQUksQ0FBQyxHQUFVLEVBQUUsSUFBVztRQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Q0FDRDs7Ozs7Ozs7Ozs7O0FDL0JZOztBQUViLGVBQWUsbUJBQU8sQ0FBQyw0REFBZTtBQUN0QyxTQUFTLG1CQUFPLENBQUMsOERBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxlQUFlOztBQUVmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGVBQWU7QUFDMUIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLHFCQUFNLDhCQUE4QixxQkFBTTtBQUM1RDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EseURBQXlEO0FBQ3pELElBQUk7QUFDSixzQ0FBc0M7QUFDdEM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWSxTQUFTO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsY0FBYyxTQUFTO0FBQ3ZCLGNBQWMsUUFBUTtBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFlBQVksaUJBQWlCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsZUFBZTtBQUMxQixXQUFXLGtCQUFrQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVMseUJBQXlCO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsT0FBTztBQUNsQixXQUFXLGtCQUFrQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0Isa0JBQWtCO0FBQ3BDOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsa0JBQWtCOztBQUVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQzNoQkE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsZ0JBQWdCLG1CQUFPLENBQUMsd0RBQWdCO0FBQ3hDLEdBQUc7QUFDSCxHQUFHO0FBQ0gsdURBQXVEO0FBQ3ZELHNCQUFzQjtBQUN0QjtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLG1CQUFPLENBQUMsMERBQVc7OztBQUczQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsR0FBRztBQUNILEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNyREEsNEdBQW1EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNBbkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3pCQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztVRUpBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbmhlcml0cy9pbmhlcml0c19icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9qc29uMy9saWIvanNvbjMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25ldC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmdpZnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlcXVpcmVzLXBvcnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tqcy1jbGllbnQvbGliL2VudHJ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NranMtY2xpZW50L2xpYi9ldmVudC9jbG9zZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2pzLWNsaWVudC9saWIvZXZlbnQvZW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2pzLWNsaWVudC9saWIvZXZlbnQvZXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tqcy1jbGllbnQvbGliL2V2ZW50L2V2ZW50dGFyZ2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NranMtY2xpZW50L2xpYi9ldmVudC90cmFucy1tZXNzYWdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NranMtY2xpZW50L2xpYi9mYWNhZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tqcy1jbGllbnQvbGliL2lmcmFtZS1ib290c3RyYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tqcy1jbGllbnQvbGliL2luZm8tYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2pzLWNsaWVudC9saWIvaW5mby1pZnJhbWUtcmVjZWl2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tqcy1jbGllbnQvbGliL2luZm8taWZyYW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NranMtY2xpZW50L2xpYi9pbmZvLXJlY2VpdmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NranMtY2xpZW50L2xpYi9sb2NhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2pzLWNsaWVudC9saWIvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2pzLWNsaWVudC9saWIvc2hpbXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tqcy1jbGllbnQvbGliL3RyYW5zcG9ydC1saXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NranMtY2xpZW50L2xpYi90cmFuc3BvcnQvYnJvd3Nlci9hYnN0cmFjdC14aHIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tqcy1jbGllbnQvbGliL3RyYW5zcG9ydC9icm93c2VyL2V2ZW50c291cmNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NranMtY2xpZW50L2xpYi90cmFuc3BvcnQvYnJvd3Nlci93ZWJzb2NrZXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tqcy1jbGllbnQvbGliL3RyYW5zcG9ydC9ldmVudHNvdXJjZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2pzLWNsaWVudC9saWIvdHJhbnNwb3J0L2h0bWxmaWxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NranMtY2xpZW50L2xpYi90cmFuc3BvcnQvaWZyYW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NranMtY2xpZW50L2xpYi90cmFuc3BvcnQvanNvbnAtcG9sbGluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2pzLWNsaWVudC9saWIvdHJhbnNwb3J0L2xpYi9hamF4LWJhc2VkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NranMtY2xpZW50L2xpYi90cmFuc3BvcnQvbGliL2J1ZmZlcmVkLXNlbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2pzLWNsaWVudC9saWIvdHJhbnNwb3J0L2xpYi9pZnJhbWUtd3JhcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2pzLWNsaWVudC9saWIvdHJhbnNwb3J0L2xpYi9wb2xsaW5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NranMtY2xpZW50L2xpYi90cmFuc3BvcnQvbGliL3NlbmRlci1yZWNlaXZlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2pzLWNsaWVudC9saWIvdHJhbnNwb3J0L3JlY2VpdmVyL2V2ZW50c291cmNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NranMtY2xpZW50L2xpYi90cmFuc3BvcnQvcmVjZWl2ZXIvaHRtbGZpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tqcy1jbGllbnQvbGliL3RyYW5zcG9ydC9yZWNlaXZlci9qc29ucC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2pzLWNsaWVudC9saWIvdHJhbnNwb3J0L3JlY2VpdmVyL3hoci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2pzLWNsaWVudC9saWIvdHJhbnNwb3J0L3NlbmRlci9qc29ucC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2pzLWNsaWVudC9saWIvdHJhbnNwb3J0L3NlbmRlci94ZHIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tqcy1jbGllbnQvbGliL3RyYW5zcG9ydC9zZW5kZXIveGhyLWNvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tqcy1jbGllbnQvbGliL3RyYW5zcG9ydC9zZW5kZXIveGhyLWZha2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tqcy1jbGllbnQvbGliL3RyYW5zcG9ydC9zZW5kZXIveGhyLWxvY2FsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NranMtY2xpZW50L2xpYi90cmFuc3BvcnQvd2Vic29ja2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NranMtY2xpZW50L2xpYi90cmFuc3BvcnQveGRyLXBvbGxpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tqcy1jbGllbnQvbGliL3RyYW5zcG9ydC94ZHItc3RyZWFtaW5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NranMtY2xpZW50L2xpYi90cmFuc3BvcnQveGhyLXBvbGxpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tqcy1jbGllbnQvbGliL3RyYW5zcG9ydC94aHItc3RyZWFtaW5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NranMtY2xpZW50L2xpYi91dGlscy9icm93c2VyLWNyeXB0by5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2pzLWNsaWVudC9saWIvdXRpbHMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2pzLWNsaWVudC9saWIvdXRpbHMvZXNjYXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NranMtY2xpZW50L2xpYi91dGlscy9ldmVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2pzLWNsaWVudC9saWIvdXRpbHMvaWZyYW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NranMtY2xpZW50L2xpYi91dGlscy9sb2cuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tqcy1jbGllbnQvbGliL3V0aWxzL29iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2pzLWNsaWVudC9saWIvdXRpbHMvcmFuZG9tLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NranMtY2xpZW50L2xpYi91dGlscy90cmFuc3BvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tqcy1jbGllbnQvbGliL3V0aWxzL3VybC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2pzLWNsaWVudC9saWIvdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2pzLWNsaWVudC9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tqcy1jbGllbnQvbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tqcy1jbGllbnQvbm9kZV9tb2R1bGVzL21zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdG9tcGpzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdG9tcGpzL2xpYi9zdG9tcC1ub2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdG9tcGpzL2xpYi9zdG9tcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi90cy9Db21tb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vdHMvTWVzc2VuZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9tYWluL3RzL1RvZG9saXN0L0VkaXRUb2RvLnRzIiwid2VicGFjazovLy8uL3NyYy9tYWluL3RzL1RvZG9saXN0L1RvZG9NZWRpYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi90cy9Ub2RvbGlzdC9Ub2RvVmlldy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi90cy9Ub2RvbGlzdC9Ub2RvbGlzdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi90cy9ZYm1XZWJTb2NrZXQudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3VybC1wYXJzZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2Vic29ja2V0L2xpYi9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJzb2NrZXQvbGliL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvYW1kIG9wdGlvbnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBuYWl2ZUZhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuXHRpZiAodHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgJiYgc2VsZikgcmV0dXJuIHNlbGY7XG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiICYmIHdpbmRvdykgcmV0dXJuIHdpbmRvdztcblx0dGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIHJlc29sdmUgZ2xvYmFsIGB0aGlzYFwiKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcblx0aWYgKHRoaXMpIHJldHVybiB0aGlzO1xuXG5cdC8vIFVuZXhwZWN0ZWQgc3RyaWN0IG1vZGUgKG1heSBoYXBwZW4gaWYgZS5nLiBidW5kbGVkIGludG8gRVNNIG1vZHVsZSlcblxuXHQvLyBGYWxsYmFjayB0byBzdGFuZGFyZCBnbG9iYWxUaGlzIGlmIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09IFwib2JqZWN0XCIgJiYgZ2xvYmFsVGhpcykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cblx0Ly8gVGhhbmtzIEBtYXRoaWFzYnluZW5zIC0+IGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9nbG9iYWx0aGlzXG5cdC8vIEluIGFsbCBFUzUrIGVuZ2luZXMgZ2xvYmFsIG9iamVjdCBpbmhlcml0cyBmcm9tIE9iamVjdC5wcm90b3R5cGVcblx0Ly8gKGlmIHlvdSBhcHByb2FjaGVkIG9uZSB0aGF0IGRvZXNuJ3QgcGxlYXNlIHJlcG9ydClcblx0dHJ5IHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LnByb3RvdHlwZSwgXCJfX2dsb2JhbF9fXCIsIHtcblx0XHRcdGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSxcblx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZVxuXHRcdH0pO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIFVuZm9ydHVuYXRlIGNhc2Ugb2YgdXBkYXRlcyB0byBPYmplY3QucHJvdG90eXBlIGJlaW5nIHJlc3RyaWN0ZWRcblx0XHQvLyB2aWEgcHJldmVudEV4dGVuc2lvbnMsIHNlYWwgb3IgZnJlZXplXG5cdFx0cmV0dXJuIG5haXZlRmFsbGJhY2soKTtcblx0fVxuXHR0cnkge1xuXHRcdC8vIFNhZmFyaSBjYXNlICh3aW5kb3cuX19nbG9iYWxfXyB3b3JrcywgYnV0IF9fZ2xvYmFsX18gZG9lcyBub3QpXG5cdFx0aWYgKCFfX2dsb2JhbF9fKSByZXR1cm4gbmFpdmVGYWxsYmFjaygpO1xuXHRcdHJldHVybiBfX2dsb2JhbF9fO1xuXHR9IGZpbmFsbHkge1xuXHRcdGRlbGV0ZSBPYmplY3QucHJvdG90eXBlLl9fZ2xvYmFsX187XG5cdH1cbn0pKCk7XG4iLCJpZiAodHlwZW9mIE9iamVjdC5jcmVhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gaW1wbGVtZW50YXRpb24gZnJvbSBzdGFuZGFyZCBub2RlLmpzICd1dGlsJyBtb2R1bGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBpZiAoc3VwZXJDdG9yKSB7XG4gICAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtcbiAgICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgICB2YWx1ZTogY3RvcixcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH07XG59IGVsc2Uge1xuICAvLyBvbGQgc2Nob29sIHNoaW0gZm9yIG9sZCBicm93c2Vyc1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGlmIChzdXBlckN0b3IpIHtcbiAgICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgICB2YXIgVGVtcEN0b3IgPSBmdW5jdGlvbiAoKSB7fVxuICAgICAgVGVtcEN0b3IucHJvdG90eXBlID0gc3VwZXJDdG9yLnByb3RvdHlwZVxuICAgICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKVxuICAgICAgY3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yXG4gICAgfVxuICB9XG59XG4iLCIvKiEgSlNPTiB2My4zLjIgfCBodHRwczovL2Jlc3RpZWpzLmdpdGh1Yi5pby9qc29uMyB8IENvcHlyaWdodCAyMDEyLTIwMTUsIEtpdCBDYW1icmlkZ2UsIEJlbmphbWluIFRhbiB8IGh0dHA6Ly9raXQubWl0LWxpY2Vuc2Uub3JnICovXG47KGZ1bmN0aW9uICgpIHtcbiAgLy8gRGV0ZWN0IHRoZSBgZGVmaW5lYCBmdW5jdGlvbiBleHBvc2VkIGJ5IGFzeW5jaHJvbm91cyBtb2R1bGUgbG9hZGVycy4gVGhlXG4gIC8vIHN0cmljdCBgZGVmaW5lYCBjaGVjayBpcyBuZWNlc3NhcnkgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBgci5qc2AuXG4gIHZhciBpc0xvYWRlciA9IHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kO1xuXG4gIC8vIEEgc2V0IG9mIHR5cGVzIHVzZWQgdG8gZGlzdGluZ3Vpc2ggb2JqZWN0cyBmcm9tIHByaW1pdGl2ZXMuXG4gIHZhciBvYmplY3RUeXBlcyA9IHtcbiAgICBcImZ1bmN0aW9uXCI6IHRydWUsXG4gICAgXCJvYmplY3RcIjogdHJ1ZVxuICB9O1xuXG4gIC8vIERldGVjdCB0aGUgYGV4cG9ydHNgIG9iamVjdCBleHBvc2VkIGJ5IENvbW1vbkpTIGltcGxlbWVudGF0aW9ucy5cbiAgdmFyIGZyZWVFeHBvcnRzID0gb2JqZWN0VHlwZXNbdHlwZW9mIGV4cG9ydHNdICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuICAvLyBVc2UgdGhlIGBnbG9iYWxgIG9iamVjdCBleHBvc2VkIGJ5IE5vZGUgKGluY2x1ZGluZyBCcm93c2VyaWZ5IHZpYVxuICAvLyBgaW5zZXJ0LW1vZHVsZS1nbG9iYWxzYCksIE5hcndoYWwsIGFuZCBSaW5nbyBhcyB0aGUgZGVmYXVsdCBjb250ZXh0LFxuICAvLyBhbmQgdGhlIGB3aW5kb3dgIG9iamVjdCBpbiBicm93c2Vycy4gUmhpbm8gZXhwb3J0cyBhIGBnbG9iYWxgIGZ1bmN0aW9uXG4gIC8vIGluc3RlYWQuXG4gIHZhciByb290ID0gb2JqZWN0VHlwZXNbdHlwZW9mIHdpbmRvd10gJiYgd2luZG93IHx8IHRoaXMsXG4gICAgICBmcmVlR2xvYmFsID0gZnJlZUV4cG9ydHMgJiYgb2JqZWN0VHlwZXNbdHlwZW9mIG1vZHVsZV0gJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgdHlwZW9mIGdsb2JhbCA9PSBcIm9iamVjdFwiICYmIGdsb2JhbDtcblxuICBpZiAoZnJlZUdsb2JhbCAmJiAoZnJlZUdsb2JhbC5nbG9iYWwgPT09IGZyZWVHbG9iYWwgfHwgZnJlZUdsb2JhbC53aW5kb3cgPT09IGZyZWVHbG9iYWwgfHwgZnJlZUdsb2JhbC5zZWxmID09PSBmcmVlR2xvYmFsKSkge1xuICAgIHJvb3QgPSBmcmVlR2xvYmFsO1xuICB9XG5cbiAgLy8gUHVibGljOiBJbml0aWFsaXplcyBKU09OIDMgdXNpbmcgdGhlIGdpdmVuIGBjb250ZXh0YCBvYmplY3QsIGF0dGFjaGluZyB0aGVcbiAgLy8gYHN0cmluZ2lmeWAgYW5kIGBwYXJzZWAgZnVuY3Rpb25zIHRvIHRoZSBzcGVjaWZpZWQgYGV4cG9ydHNgIG9iamVjdC5cbiAgZnVuY3Rpb24gcnVuSW5Db250ZXh0KGNvbnRleHQsIGV4cG9ydHMpIHtcbiAgICBjb250ZXh0IHx8IChjb250ZXh0ID0gcm9vdC5PYmplY3QoKSk7XG4gICAgZXhwb3J0cyB8fCAoZXhwb3J0cyA9IHJvb3QuT2JqZWN0KCkpO1xuXG4gICAgLy8gTmF0aXZlIGNvbnN0cnVjdG9yIGFsaWFzZXMuXG4gICAgdmFyIE51bWJlciA9IGNvbnRleHQuTnVtYmVyIHx8IHJvb3QuTnVtYmVyLFxuICAgICAgICBTdHJpbmcgPSBjb250ZXh0LlN0cmluZyB8fCByb290LlN0cmluZyxcbiAgICAgICAgT2JqZWN0ID0gY29udGV4dC5PYmplY3QgfHwgcm9vdC5PYmplY3QsXG4gICAgICAgIERhdGUgPSBjb250ZXh0LkRhdGUgfHwgcm9vdC5EYXRlLFxuICAgICAgICBTeW50YXhFcnJvciA9IGNvbnRleHQuU3ludGF4RXJyb3IgfHwgcm9vdC5TeW50YXhFcnJvcixcbiAgICAgICAgVHlwZUVycm9yID0gY29udGV4dC5UeXBlRXJyb3IgfHwgcm9vdC5UeXBlRXJyb3IsXG4gICAgICAgIE1hdGggPSBjb250ZXh0Lk1hdGggfHwgcm9vdC5NYXRoLFxuICAgICAgICBuYXRpdmVKU09OID0gY29udGV4dC5KU09OIHx8IHJvb3QuSlNPTjtcblxuICAgIC8vIERlbGVnYXRlIHRvIHRoZSBuYXRpdmUgYHN0cmluZ2lmeWAgYW5kIGBwYXJzZWAgaW1wbGVtZW50YXRpb25zLlxuICAgIGlmICh0eXBlb2YgbmF0aXZlSlNPTiA9PSBcIm9iamVjdFwiICYmIG5hdGl2ZUpTT04pIHtcbiAgICAgIGV4cG9ydHMuc3RyaW5naWZ5ID0gbmF0aXZlSlNPTi5zdHJpbmdpZnk7XG4gICAgICBleHBvcnRzLnBhcnNlID0gbmF0aXZlSlNPTi5wYXJzZTtcbiAgICB9XG5cbiAgICAvLyBDb252ZW5pZW5jZSBhbGlhc2VzLlxuICAgIHZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGUsXG4gICAgICAgIGdldENsYXNzID0gb2JqZWN0UHJvdG8udG9TdHJpbmcsXG4gICAgICAgIGlzUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eSxcbiAgICAgICAgdW5kZWZpbmVkO1xuXG4gICAgLy8gSW50ZXJuYWw6IENvbnRhaW5zIGB0cnkuLi5jYXRjaGAgbG9naWMgdXNlZCBieSBvdGhlciBmdW5jdGlvbnMuXG4gICAgLy8gVGhpcyBwcmV2ZW50cyBvdGhlciBmdW5jdGlvbnMgZnJvbSBiZWluZyBkZW9wdGltaXplZC5cbiAgICBmdW5jdGlvbiBhdHRlbXB0KGZ1bmMsIGVycm9yRnVuYykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZnVuYygpO1xuICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgIGlmIChlcnJvckZ1bmMpIHtcbiAgICAgICAgICBlcnJvckZ1bmMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRlc3QgdGhlIGBEYXRlI2dldFVUQypgIG1ldGhvZHMuIEJhc2VkIG9uIHdvcmsgYnkgQFlhZmZsZS5cbiAgICB2YXIgaXNFeHRlbmRlZCA9IG5ldyBEYXRlKC0zNTA5ODI3MzM0NTczMjkyKTtcbiAgICBhdHRlbXB0KGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIFRoZSBgZ2V0VVRDRnVsbFllYXJgLCBgTW9udGhgLCBhbmQgYERhdGVgIG1ldGhvZHMgcmV0dXJuIG5vbnNlbnNpY2FsXG4gICAgICAvLyByZXN1bHRzIGZvciBjZXJ0YWluIGRhdGVzIGluIE9wZXJhID49IDEwLjUzLlxuICAgICAgaXNFeHRlbmRlZCA9IGlzRXh0ZW5kZWQuZ2V0VVRDRnVsbFllYXIoKSA9PSAtMTA5MjUyICYmIGlzRXh0ZW5kZWQuZ2V0VVRDTW9udGgoKSA9PT0gMCAmJiBpc0V4dGVuZGVkLmdldFVUQ0RhdGUoKSA9PT0gMSAmJlxuICAgICAgICBpc0V4dGVuZGVkLmdldFVUQ0hvdXJzKCkgPT0gMTAgJiYgaXNFeHRlbmRlZC5nZXRVVENNaW51dGVzKCkgPT0gMzcgJiYgaXNFeHRlbmRlZC5nZXRVVENTZWNvbmRzKCkgPT0gNiAmJiBpc0V4dGVuZGVkLmdldFVUQ01pbGxpc2Vjb25kcygpID09IDcwODtcbiAgICB9KTtcblxuICAgIC8vIEludGVybmFsOiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIG5hdGl2ZSBgSlNPTi5zdHJpbmdpZnlgIGFuZCBgcGFyc2VgXG4gICAgLy8gaW1wbGVtZW50YXRpb25zIGFyZSBzcGVjLWNvbXBsaWFudC4gQmFzZWQgb24gd29yayBieSBLZW4gU255ZGVyLlxuICAgIGZ1bmN0aW9uIGhhcyhuYW1lKSB7XG4gICAgICBpZiAoaGFzW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgLy8gUmV0dXJuIGNhY2hlZCBmZWF0dXJlIHRlc3QgcmVzdWx0LlxuICAgICAgICByZXR1cm4gaGFzW25hbWVdO1xuICAgICAgfVxuICAgICAgdmFyIGlzU3VwcG9ydGVkO1xuICAgICAgaWYgKG5hbWUgPT0gXCJidWctc3RyaW5nLWNoYXItaW5kZXhcIikge1xuICAgICAgICAvLyBJRSA8PSA3IGRvZXNuJ3Qgc3VwcG9ydCBhY2Nlc3Npbmcgc3RyaW5nIGNoYXJhY3RlcnMgdXNpbmcgc3F1YXJlXG4gICAgICAgIC8vIGJyYWNrZXQgbm90YXRpb24uIElFIDggb25seSBzdXBwb3J0cyB0aGlzIGZvciBwcmltaXRpdmVzLlxuICAgICAgICBpc1N1cHBvcnRlZCA9IFwiYVwiWzBdICE9IFwiYVwiO1xuICAgICAgfSBlbHNlIGlmIChuYW1lID09IFwianNvblwiKSB7XG4gICAgICAgIC8vIEluZGljYXRlcyB3aGV0aGVyIGJvdGggYEpTT04uc3RyaW5naWZ5YCBhbmQgYEpTT04ucGFyc2VgIGFyZVxuICAgICAgICAvLyBzdXBwb3J0ZWQuXG4gICAgICAgIGlzU3VwcG9ydGVkID0gaGFzKFwianNvbi1zdHJpbmdpZnlcIikgJiYgaGFzKFwiZGF0ZS1zZXJpYWxpemF0aW9uXCIpICYmIGhhcyhcImpzb24tcGFyc2VcIik7XG4gICAgICB9IGVsc2UgaWYgKG5hbWUgPT0gXCJkYXRlLXNlcmlhbGl6YXRpb25cIikge1xuICAgICAgICAvLyBJbmRpY2F0ZXMgd2hldGhlciBgRGF0ZWBzIGNhbiBiZSBzZXJpYWxpemVkIGFjY3VyYXRlbHkgYnkgYEpTT04uc3RyaW5naWZ5YC5cbiAgICAgICAgaXNTdXBwb3J0ZWQgPSBoYXMoXCJqc29uLXN0cmluZ2lmeVwiKSAmJiBpc0V4dGVuZGVkO1xuICAgICAgICBpZiAoaXNTdXBwb3J0ZWQpIHtcbiAgICAgICAgICB2YXIgc3RyaW5naWZ5ID0gZXhwb3J0cy5zdHJpbmdpZnk7XG4gICAgICAgICAgYXR0ZW1wdChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpc1N1cHBvcnRlZCA9XG4gICAgICAgICAgICAgIC8vIEpTT04gMiwgUHJvdG90eXBlIDw9IDEuNywgYW5kIG9sZGVyIFdlYktpdCBidWlsZHMgaW5jb3JyZWN0bHlcbiAgICAgICAgICAgICAgLy8gc2VyaWFsaXplIGV4dGVuZGVkIHllYXJzLlxuICAgICAgICAgICAgICBzdHJpbmdpZnkobmV3IERhdGUoLTguNjRlMTUpKSA9PSAnXCItMjcxODIxLTA0LTIwVDAwOjAwOjAwLjAwMFpcIicgJiZcbiAgICAgICAgICAgICAgLy8gVGhlIG1pbGxpc2Vjb25kcyBhcmUgb3B0aW9uYWwgaW4gRVMgNSwgYnV0IHJlcXVpcmVkIGluIDUuMS5cbiAgICAgICAgICAgICAgc3RyaW5naWZ5KG5ldyBEYXRlKDguNjRlMTUpKSA9PSAnXCIrMjc1NzYwLTA5LTEzVDAwOjAwOjAwLjAwMFpcIicgJiZcbiAgICAgICAgICAgICAgLy8gRmlyZWZveCA8PSAxMS4wIGluY29ycmVjdGx5IHNlcmlhbGl6ZXMgeWVhcnMgcHJpb3IgdG8gMCBhcyBuZWdhdGl2ZVxuICAgICAgICAgICAgICAvLyBmb3VyLWRpZ2l0IHllYXJzIGluc3RlYWQgb2Ygc2l4LWRpZ2l0IHllYXJzLiBDcmVkaXRzOiBAWWFmZmxlLlxuICAgICAgICAgICAgICBzdHJpbmdpZnkobmV3IERhdGUoLTYyMTk4NzU1MmU1KSkgPT0gJ1wiLTAwMDAwMS0wMS0wMVQwMDowMDowMC4wMDBaXCInICYmXG4gICAgICAgICAgICAgIC8vIFNhZmFyaSA8PSA1LjEuNSBhbmQgT3BlcmEgPj0gMTAuNTMgaW5jb3JyZWN0bHkgc2VyaWFsaXplIG1pbGxpc2Vjb25kXG4gICAgICAgICAgICAgIC8vIHZhbHVlcyBsZXNzIHRoYW4gMTAwMC4gQ3JlZGl0czogQFlhZmZsZS5cbiAgICAgICAgICAgICAgc3RyaW5naWZ5KG5ldyBEYXRlKC0xKSkgPT0gJ1wiMTk2OS0xMi0zMVQyMzo1OTo1OS45OTlaXCInO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgdmFsdWUsIHNlcmlhbGl6ZWQgPSAne1wiYVwiOlsxLHRydWUsZmFsc2UsbnVsbCxcIlxcXFx1MDAwMFxcXFxiXFxcXG5cXFxcZlxcXFxyXFxcXHRcIl19JztcbiAgICAgICAgLy8gVGVzdCBgSlNPTi5zdHJpbmdpZnlgLlxuICAgICAgICBpZiAobmFtZSA9PSBcImpzb24tc3RyaW5naWZ5XCIpIHtcbiAgICAgICAgICB2YXIgc3RyaW5naWZ5ID0gZXhwb3J0cy5zdHJpbmdpZnksIHN0cmluZ2lmeVN1cHBvcnRlZCA9IHR5cGVvZiBzdHJpbmdpZnkgPT0gXCJmdW5jdGlvblwiO1xuICAgICAgICAgIGlmIChzdHJpbmdpZnlTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgIC8vIEEgdGVzdCBmdW5jdGlvbiBvYmplY3Qgd2l0aCBhIGN1c3RvbSBgdG9KU09OYCBtZXRob2QuXG4gICAgICAgICAgICAodmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfSkudG9KU09OID0gdmFsdWU7XG4gICAgICAgICAgICBhdHRlbXB0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgc3RyaW5naWZ5U3VwcG9ydGVkID1cbiAgICAgICAgICAgICAgICAvLyBGaXJlZm94IDMuMWIxIGFuZCBiMiBzZXJpYWxpemUgc3RyaW5nLCBudW1iZXIsIGFuZCBib29sZWFuXG4gICAgICAgICAgICAgICAgLy8gcHJpbWl0aXZlcyBhcyBvYmplY3QgbGl0ZXJhbHMuXG4gICAgICAgICAgICAgICAgc3RyaW5naWZ5KDApID09PSBcIjBcIiAmJlxuICAgICAgICAgICAgICAgIC8vIEZGIDMuMWIxLCBiMiwgYW5kIEpTT04gMiBzZXJpYWxpemUgd3JhcHBlZCBwcmltaXRpdmVzIGFzIG9iamVjdFxuICAgICAgICAgICAgICAgIC8vIGxpdGVyYWxzLlxuICAgICAgICAgICAgICAgIHN0cmluZ2lmeShuZXcgTnVtYmVyKCkpID09PSBcIjBcIiAmJlxuICAgICAgICAgICAgICAgIHN0cmluZ2lmeShuZXcgU3RyaW5nKCkpID09ICdcIlwiJyAmJlxuICAgICAgICAgICAgICAgIC8vIEZGIDMuMWIxLCAyIHRocm93IGFuIGVycm9yIGlmIHRoZSB2YWx1ZSBpcyBgbnVsbGAsIGB1bmRlZmluZWRgLCBvclxuICAgICAgICAgICAgICAgIC8vIGRvZXMgbm90IGRlZmluZSBhIGNhbm9uaWNhbCBKU09OIHJlcHJlc2VudGF0aW9uICh0aGlzIGFwcGxpZXMgdG9cbiAgICAgICAgICAgICAgICAvLyBvYmplY3RzIHdpdGggYHRvSlNPTmAgcHJvcGVydGllcyBhcyB3ZWxsLCAqdW5sZXNzKiB0aGV5IGFyZSBuZXN0ZWRcbiAgICAgICAgICAgICAgICAvLyB3aXRoaW4gYW4gb2JqZWN0IG9yIGFycmF5KS5cbiAgICAgICAgICAgICAgICBzdHJpbmdpZnkoZ2V0Q2xhc3MpID09PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICAvLyBJRSA4IHNlcmlhbGl6ZXMgYHVuZGVmaW5lZGAgYXMgYFwidW5kZWZpbmVkXCJgLiBTYWZhcmkgPD0gNS4xLjcgYW5kXG4gICAgICAgICAgICAgICAgLy8gRkYgMy4xYjMgcGFzcyB0aGlzIHRlc3QuXG4gICAgICAgICAgICAgICAgc3RyaW5naWZ5KHVuZGVmaW5lZCkgPT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgIC8vIFNhZmFyaSA8PSA1LjEuNyBhbmQgRkYgMy4xYjMgdGhyb3cgYEVycm9yYHMgYW5kIGBUeXBlRXJyb3JgcyxcbiAgICAgICAgICAgICAgICAvLyByZXNwZWN0aXZlbHksIGlmIHRoZSB2YWx1ZSBpcyBvbWl0dGVkIGVudGlyZWx5LlxuICAgICAgICAgICAgICAgIHN0cmluZ2lmeSgpID09PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICAvLyBGRiAzLjFiMSwgMiB0aHJvdyBhbiBlcnJvciBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgbm90IGEgbnVtYmVyLFxuICAgICAgICAgICAgICAgIC8vIHN0cmluZywgYXJyYXksIG9iamVjdCwgQm9vbGVhbiwgb3IgYG51bGxgIGxpdGVyYWwuIFRoaXMgYXBwbGllcyB0b1xuICAgICAgICAgICAgICAgIC8vIG9iamVjdHMgd2l0aCBjdXN0b20gYHRvSlNPTmAgbWV0aG9kcyBhcyB3ZWxsLCB1bmxlc3MgdGhleSBhcmUgbmVzdGVkXG4gICAgICAgICAgICAgICAgLy8gaW5zaWRlIG9iamVjdCBvciBhcnJheSBsaXRlcmFscy4gWVVJIDMuMC4wYjEgaWdub3JlcyBjdXN0b20gYHRvSlNPTmBcbiAgICAgICAgICAgICAgICAvLyBtZXRob2RzIGVudGlyZWx5LlxuICAgICAgICAgICAgICAgIHN0cmluZ2lmeSh2YWx1ZSkgPT09IFwiMVwiICYmXG4gICAgICAgICAgICAgICAgc3RyaW5naWZ5KFt2YWx1ZV0pID09IFwiWzFdXCIgJiZcbiAgICAgICAgICAgICAgICAvLyBQcm90b3R5cGUgPD0gMS42LjEgc2VyaWFsaXplcyBgW3VuZGVmaW5lZF1gIGFzIGBcIltdXCJgIGluc3RlYWQgb2ZcbiAgICAgICAgICAgICAgICAvLyBgXCJbbnVsbF1cImAuXG4gICAgICAgICAgICAgICAgc3RyaW5naWZ5KFt1bmRlZmluZWRdKSA9PSBcIltudWxsXVwiICYmXG4gICAgICAgICAgICAgICAgLy8gWVVJIDMuMC4wYjEgZmFpbHMgdG8gc2VyaWFsaXplIGBudWxsYCBsaXRlcmFscy5cbiAgICAgICAgICAgICAgICBzdHJpbmdpZnkobnVsbCkgPT0gXCJudWxsXCIgJiZcbiAgICAgICAgICAgICAgICAvLyBGRiAzLjFiMSwgMiBoYWx0cyBzZXJpYWxpemF0aW9uIGlmIGFuIGFycmF5IGNvbnRhaW5zIGEgZnVuY3Rpb246XG4gICAgICAgICAgICAgICAgLy8gYFsxLCB0cnVlLCBnZXRDbGFzcywgMV1gIHNlcmlhbGl6ZXMgYXMgXCJbMSx0cnVlLF0sXCIuIEZGIDMuMWIzXG4gICAgICAgICAgICAgICAgLy8gZWxpZGVzIG5vbi1KU09OIHZhbHVlcyBmcm9tIG9iamVjdHMgYW5kIGFycmF5cywgdW5sZXNzIHRoZXlcbiAgICAgICAgICAgICAgICAvLyBkZWZpbmUgY3VzdG9tIGB0b0pTT05gIG1ldGhvZHMuXG4gICAgICAgICAgICAgICAgc3RyaW5naWZ5KFt1bmRlZmluZWQsIGdldENsYXNzLCBudWxsXSkgPT0gXCJbbnVsbCxudWxsLG51bGxdXCIgJiZcbiAgICAgICAgICAgICAgICAvLyBTaW1wbGUgc2VyaWFsaXphdGlvbiB0ZXN0LiBGRiAzLjFiMSB1c2VzIFVuaWNvZGUgZXNjYXBlIHNlcXVlbmNlc1xuICAgICAgICAgICAgICAgIC8vIHdoZXJlIGNoYXJhY3RlciBlc2NhcGUgY29kZXMgYXJlIGV4cGVjdGVkIChlLmcuLCBgXFxiYCA9PiBgXFx1MDAwOGApLlxuICAgICAgICAgICAgICAgIHN0cmluZ2lmeSh7IFwiYVwiOiBbdmFsdWUsIHRydWUsIGZhbHNlLCBudWxsLCBcIlxceDAwXFxiXFxuXFxmXFxyXFx0XCJdIH0pID09IHNlcmlhbGl6ZWQgJiZcbiAgICAgICAgICAgICAgICAvLyBGRiAzLjFiMSBhbmQgYjIgaWdub3JlIHRoZSBgZmlsdGVyYCBhbmQgYHdpZHRoYCBhcmd1bWVudHMuXG4gICAgICAgICAgICAgICAgc3RyaW5naWZ5KG51bGwsIHZhbHVlKSA9PT0gXCIxXCIgJiZcbiAgICAgICAgICAgICAgICBzdHJpbmdpZnkoWzEsIDJdLCBudWxsLCAxKSA9PSBcIltcXG4gMSxcXG4gMlxcbl1cIjtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgc3RyaW5naWZ5U3VwcG9ydGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaXNTdXBwb3J0ZWQgPSBzdHJpbmdpZnlTdXBwb3J0ZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGVzdCBgSlNPTi5wYXJzZWAuXG4gICAgICAgIGlmIChuYW1lID09IFwianNvbi1wYXJzZVwiKSB7XG4gICAgICAgICAgdmFyIHBhcnNlID0gZXhwb3J0cy5wYXJzZSwgcGFyc2VTdXBwb3J0ZWQ7XG4gICAgICAgICAgaWYgKHR5cGVvZiBwYXJzZSA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGF0dGVtcHQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAvLyBGRiAzLjFiMSwgYjIgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYSBiYXJlIGxpdGVyYWwgaXMgcHJvdmlkZWQuXG4gICAgICAgICAgICAgIC8vIENvbmZvcm1pbmcgaW1wbGVtZW50YXRpb25zIHNob3VsZCBhbHNvIGNvZXJjZSB0aGUgaW5pdGlhbCBhcmd1bWVudCB0b1xuICAgICAgICAgICAgICAvLyBhIHN0cmluZyBwcmlvciB0byBwYXJzaW5nLlxuICAgICAgICAgICAgICBpZiAocGFyc2UoXCIwXCIpID09PSAwICYmICFwYXJzZShmYWxzZSkpIHtcbiAgICAgICAgICAgICAgICAvLyBTaW1wbGUgcGFyc2luZyB0ZXN0LlxuICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2Uoc2VyaWFsaXplZCk7XG4gICAgICAgICAgICAgICAgcGFyc2VTdXBwb3J0ZWQgPSB2YWx1ZVtcImFcIl0ubGVuZ3RoID09IDUgJiYgdmFsdWVbXCJhXCJdWzBdID09PSAxO1xuICAgICAgICAgICAgICAgIGlmIChwYXJzZVN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgICAgYXR0ZW1wdChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNhZmFyaSA8PSA1LjEuMiBhbmQgRkYgMy4xYjEgYWxsb3cgdW5lc2NhcGVkIHRhYnMgaW4gc3RyaW5ncy5cbiAgICAgICAgICAgICAgICAgICAgcGFyc2VTdXBwb3J0ZWQgPSAhcGFyc2UoJ1wiXFx0XCInKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlU3VwcG9ydGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dGVtcHQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIEZGIDQuMCBhbmQgNC4wLjEgYWxsb3cgbGVhZGluZyBgK2Agc2lnbnMgYW5kIGxlYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAvLyBkZWNpbWFsIHBvaW50cy4gRkYgNC4wLCA0LjAuMSwgYW5kIElFIDktMTAgYWxzbyBhbGxvd1xuICAgICAgICAgICAgICAgICAgICAgIC8vIGNlcnRhaW4gb2N0YWwgbGl0ZXJhbHMuXG4gICAgICAgICAgICAgICAgICAgICAgcGFyc2VTdXBwb3J0ZWQgPSBwYXJzZShcIjAxXCIpICE9PSAxO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGlmIChwYXJzZVN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICBhdHRlbXB0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBGRiA0LjAsIDQuMC4xLCBhbmQgUmhpbm8gMS43UjMtUjQgYWxsb3cgdHJhaWxpbmcgZGVjaW1hbFxuICAgICAgICAgICAgICAgICAgICAgIC8vIHBvaW50cy4gVGhlc2UgZW52aXJvbm1lbnRzLCBhbG9uZyB3aXRoIEZGIDMuMWIxIGFuZCAyLFxuICAgICAgICAgICAgICAgICAgICAgIC8vIGFsc28gYWxsb3cgdHJhaWxpbmcgY29tbWFzIGluIEpTT04gb2JqZWN0cyBhbmQgYXJyYXlzLlxuICAgICAgICAgICAgICAgICAgICAgIHBhcnNlU3VwcG9ydGVkID0gcGFyc2UoXCIxLlwiKSAhPT0gMTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHBhcnNlU3VwcG9ydGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaXNTdXBwb3J0ZWQgPSBwYXJzZVN1cHBvcnRlZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGhhc1tuYW1lXSA9ICEhaXNTdXBwb3J0ZWQ7XG4gICAgfVxuICAgIGhhc1tcImJ1Zy1zdHJpbmctY2hhci1pbmRleFwiXSA9IGhhc1tcImRhdGUtc2VyaWFsaXphdGlvblwiXSA9IGhhc1tcImpzb25cIl0gPSBoYXNbXCJqc29uLXN0cmluZ2lmeVwiXSA9IGhhc1tcImpzb24tcGFyc2VcIl0gPSBudWxsO1xuXG4gICAgaWYgKCFoYXMoXCJqc29uXCIpKSB7XG4gICAgICAvLyBDb21tb24gYFtbQ2xhc3NdXWAgbmFtZSBhbGlhc2VzLlxuICAgICAgdmFyIGZ1bmN0aW9uQ2xhc3MgPSBcIltvYmplY3QgRnVuY3Rpb25dXCIsXG4gICAgICAgICAgZGF0ZUNsYXNzID0gXCJbb2JqZWN0IERhdGVdXCIsXG4gICAgICAgICAgbnVtYmVyQ2xhc3MgPSBcIltvYmplY3QgTnVtYmVyXVwiLFxuICAgICAgICAgIHN0cmluZ0NsYXNzID0gXCJbb2JqZWN0IFN0cmluZ11cIixcbiAgICAgICAgICBhcnJheUNsYXNzID0gXCJbb2JqZWN0IEFycmF5XVwiLFxuICAgICAgICAgIGJvb2xlYW5DbGFzcyA9IFwiW29iamVjdCBCb29sZWFuXVwiO1xuXG4gICAgICAvLyBEZXRlY3QgaW5jb21wbGV0ZSBzdXBwb3J0IGZvciBhY2Nlc3Npbmcgc3RyaW5nIGNoYXJhY3RlcnMgYnkgaW5kZXguXG4gICAgICB2YXIgY2hhckluZGV4QnVnZ3kgPSBoYXMoXCJidWctc3RyaW5nLWNoYXItaW5kZXhcIik7XG5cbiAgICAgIC8vIEludGVybmFsOiBOb3JtYWxpemVzIHRoZSBgZm9yLi4uaW5gIGl0ZXJhdGlvbiBhbGdvcml0aG0gYWNyb3NzXG4gICAgICAvLyBlbnZpcm9ubWVudHMuIEVhY2ggZW51bWVyYXRlZCBrZXkgaXMgeWllbGRlZCB0byBhIGBjYWxsYmFja2AgZnVuY3Rpb24uXG4gICAgICB2YXIgZm9yT3duID0gZnVuY3Rpb24gKG9iamVjdCwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHNpemUgPSAwLCBQcm9wZXJ0aWVzLCBkb250RW51bXMsIHByb3BlcnR5O1xuXG4gICAgICAgIC8vIFRlc3RzIGZvciBidWdzIGluIHRoZSBjdXJyZW50IGVudmlyb25tZW50J3MgYGZvci4uLmluYCBhbGdvcml0aG0uIFRoZVxuICAgICAgICAvLyBgdmFsdWVPZmAgcHJvcGVydHkgaW5oZXJpdHMgdGhlIG5vbi1lbnVtZXJhYmxlIGZsYWcgZnJvbVxuICAgICAgICAvLyBgT2JqZWN0LnByb3RvdHlwZWAgaW4gb2xkZXIgdmVyc2lvbnMgb2YgSUUsIE5ldHNjYXBlLCBhbmQgTW96aWxsYS5cbiAgICAgICAgKFByb3BlcnRpZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhpcy52YWx1ZU9mID0gMDtcbiAgICAgICAgfSkucHJvdG90eXBlLnZhbHVlT2YgPSAwO1xuXG4gICAgICAgIC8vIEl0ZXJhdGUgb3ZlciBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgYFByb3BlcnRpZXNgIGNsYXNzLlxuICAgICAgICBkb250RW51bXMgPSBuZXcgUHJvcGVydGllcygpO1xuICAgICAgICBmb3IgKHByb3BlcnR5IGluIGRvbnRFbnVtcykge1xuICAgICAgICAgIC8vIElnbm9yZSBhbGwgcHJvcGVydGllcyBpbmhlcml0ZWQgZnJvbSBgT2JqZWN0LnByb3RvdHlwZWAuXG4gICAgICAgICAgaWYgKGlzUHJvcGVydHkuY2FsbChkb250RW51bXMsIHByb3BlcnR5KSkge1xuICAgICAgICAgICAgc2l6ZSsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBQcm9wZXJ0aWVzID0gZG9udEVudW1zID0gbnVsbDtcblxuICAgICAgICAvLyBOb3JtYWxpemUgdGhlIGl0ZXJhdGlvbiBhbGdvcml0aG0uXG4gICAgICAgIGlmICghc2l6ZSkge1xuICAgICAgICAgIC8vIEEgbGlzdCBvZiBub24tZW51bWVyYWJsZSBwcm9wZXJ0aWVzIGluaGVyaXRlZCBmcm9tIGBPYmplY3QucHJvdG90eXBlYC5cbiAgICAgICAgICBkb250RW51bXMgPSBbXCJ2YWx1ZU9mXCIsIFwidG9TdHJpbmdcIiwgXCJ0b0xvY2FsZVN0cmluZ1wiLCBcInByb3BlcnR5SXNFbnVtZXJhYmxlXCIsIFwiaXNQcm90b3R5cGVPZlwiLCBcImhhc093blByb3BlcnR5XCIsIFwiY29uc3RydWN0b3JcIl07XG4gICAgICAgICAgLy8gSUUgPD0gOCwgTW96aWxsYSAxLjAsIGFuZCBOZXRzY2FwZSA2LjIgaWdub3JlIHNoYWRvd2VkIG5vbi1lbnVtZXJhYmxlXG4gICAgICAgICAgLy8gcHJvcGVydGllcy5cbiAgICAgICAgICBmb3JPd24gPSBmdW5jdGlvbiAob2JqZWN0LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIGlzRnVuY3Rpb24gPSBnZXRDbGFzcy5jYWxsKG9iamVjdCkgPT0gZnVuY3Rpb25DbGFzcywgcHJvcGVydHksIGxlbmd0aDtcbiAgICAgICAgICAgIHZhciBoYXNQcm9wZXJ0eSA9ICFpc0Z1bmN0aW9uICYmIHR5cGVvZiBvYmplY3QuY29uc3RydWN0b3IgIT0gXCJmdW5jdGlvblwiICYmIG9iamVjdFR5cGVzW3R5cGVvZiBvYmplY3QuaGFzT3duUHJvcGVydHldICYmIG9iamVjdC5oYXNPd25Qcm9wZXJ0eSB8fCBpc1Byb3BlcnR5O1xuICAgICAgICAgICAgZm9yIChwcm9wZXJ0eSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgICAgLy8gR2Vja28gPD0gMS4wIGVudW1lcmF0ZXMgdGhlIGBwcm90b3R5cGVgIHByb3BlcnR5IG9mIGZ1bmN0aW9ucyB1bmRlclxuICAgICAgICAgICAgICAvLyBjZXJ0YWluIGNvbmRpdGlvbnM7IElFIGRvZXMgbm90LlxuICAgICAgICAgICAgICBpZiAoIShpc0Z1bmN0aW9uICYmIHByb3BlcnR5ID09IFwicHJvdG90eXBlXCIpICYmIGhhc1Byb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhwcm9wZXJ0eSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE1hbnVhbGx5IGludm9rZSB0aGUgY2FsbGJhY2sgZm9yIGVhY2ggbm9uLWVudW1lcmFibGUgcHJvcGVydHkuXG4gICAgICAgICAgICBmb3IgKGxlbmd0aCA9IGRvbnRFbnVtcy5sZW5ndGg7IHByb3BlcnR5ID0gZG9udEVudW1zWy0tbGVuZ3RoXTspIHtcbiAgICAgICAgICAgICAgaWYgKGhhc1Byb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhwcm9wZXJ0eSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE5vIGJ1Z3MgZGV0ZWN0ZWQ7IHVzZSB0aGUgc3RhbmRhcmQgYGZvci4uLmluYCBhbGdvcml0aG0uXG4gICAgICAgICAgZm9yT3duID0gZnVuY3Rpb24gKG9iamVjdCwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBpc0Z1bmN0aW9uID0gZ2V0Q2xhc3MuY2FsbChvYmplY3QpID09IGZ1bmN0aW9uQ2xhc3MsIHByb3BlcnR5LCBpc0NvbnN0cnVjdG9yO1xuICAgICAgICAgICAgZm9yIChwcm9wZXJ0eSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgICAgaWYgKCEoaXNGdW5jdGlvbiAmJiBwcm9wZXJ0eSA9PSBcInByb3RvdHlwZVwiKSAmJiBpc1Byb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkgJiYgIShpc0NvbnN0cnVjdG9yID0gcHJvcGVydHkgPT09IFwiY29uc3RydWN0b3JcIikpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhwcm9wZXJ0eSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE1hbnVhbGx5IGludm9rZSB0aGUgY2FsbGJhY2sgZm9yIHRoZSBgY29uc3RydWN0b3JgIHByb3BlcnR5IGR1ZSB0b1xuICAgICAgICAgICAgLy8gY3Jvc3MtZW52aXJvbm1lbnQgaW5jb25zaXN0ZW5jaWVzLlxuICAgICAgICAgICAgaWYgKGlzQ29uc3RydWN0b3IgfHwgaXNQcm9wZXJ0eS5jYWxsKG9iamVjdCwgKHByb3BlcnR5ID0gXCJjb25zdHJ1Y3RvclwiKSkpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2socHJvcGVydHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvck93bihvYmplY3QsIGNhbGxiYWNrKTtcbiAgICAgIH07XG5cbiAgICAgIC8vIFB1YmxpYzogU2VyaWFsaXplcyBhIEphdmFTY3JpcHQgYHZhbHVlYCBhcyBhIEpTT04gc3RyaW5nLiBUaGUgb3B0aW9uYWxcbiAgICAgIC8vIGBmaWx0ZXJgIGFyZ3VtZW50IG1heSBzcGVjaWZ5IGVpdGhlciBhIGZ1bmN0aW9uIHRoYXQgYWx0ZXJzIGhvdyBvYmplY3QgYW5kXG4gICAgICAvLyBhcnJheSBtZW1iZXJzIGFyZSBzZXJpYWxpemVkLCBvciBhbiBhcnJheSBvZiBzdHJpbmdzIGFuZCBudW1iZXJzIHRoYXRcbiAgICAgIC8vIGluZGljYXRlcyB3aGljaCBwcm9wZXJ0aWVzIHNob3VsZCBiZSBzZXJpYWxpemVkLiBUaGUgb3B0aW9uYWwgYHdpZHRoYFxuICAgICAgLy8gYXJndW1lbnQgbWF5IGJlIGVpdGhlciBhIHN0cmluZyBvciBudW1iZXIgdGhhdCBzcGVjaWZpZXMgdGhlIGluZGVudGF0aW9uXG4gICAgICAvLyBsZXZlbCBvZiB0aGUgb3V0cHV0LlxuICAgICAgaWYgKCFoYXMoXCJqc29uLXN0cmluZ2lmeVwiKSAmJiAhaGFzKFwiZGF0ZS1zZXJpYWxpemF0aW9uXCIpKSB7XG4gICAgICAgIC8vIEludGVybmFsOiBBIG1hcCBvZiBjb250cm9sIGNoYXJhY3RlcnMgYW5kIHRoZWlyIGVzY2FwZWQgZXF1aXZhbGVudHMuXG4gICAgICAgIHZhciBFc2NhcGVzID0ge1xuICAgICAgICAgIDkyOiBcIlxcXFxcXFxcXCIsXG4gICAgICAgICAgMzQ6ICdcXFxcXCInLFxuICAgICAgICAgIDg6IFwiXFxcXGJcIixcbiAgICAgICAgICAxMjogXCJcXFxcZlwiLFxuICAgICAgICAgIDEwOiBcIlxcXFxuXCIsXG4gICAgICAgICAgMTM6IFwiXFxcXHJcIixcbiAgICAgICAgICA5OiBcIlxcXFx0XCJcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBJbnRlcm5hbDogQ29udmVydHMgYHZhbHVlYCBpbnRvIGEgemVyby1wYWRkZWQgc3RyaW5nIHN1Y2ggdGhhdCBpdHNcbiAgICAgICAgLy8gbGVuZ3RoIGlzIGF0IGxlYXN0IGVxdWFsIHRvIGB3aWR0aGAuIFRoZSBgd2lkdGhgIG11c3QgYmUgPD0gNi5cbiAgICAgICAgdmFyIGxlYWRpbmdaZXJvZXMgPSBcIjAwMDAwMFwiO1xuICAgICAgICB2YXIgdG9QYWRkZWRTdHJpbmcgPSBmdW5jdGlvbiAod2lkdGgsIHZhbHVlKSB7XG4gICAgICAgICAgLy8gVGhlIGB8fCAwYCBleHByZXNzaW9uIGlzIG5lY2Vzc2FyeSB0byB3b3JrIGFyb3VuZCBhIGJ1ZyBpblxuICAgICAgICAgIC8vIE9wZXJhIDw9IDcuNTR1MiB3aGVyZSBgMCA9PSAtMGAsIGJ1dCBgU3RyaW5nKC0wKSAhPT0gXCIwXCJgLlxuICAgICAgICAgIHJldHVybiAobGVhZGluZ1plcm9lcyArICh2YWx1ZSB8fCAwKSkuc2xpY2UoLXdpZHRoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBJbnRlcm5hbDogU2VyaWFsaXplcyBhIGRhdGUgb2JqZWN0LlxuICAgICAgICB2YXIgc2VyaWFsaXplRGF0ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIHZhciBnZXREYXRhLCB5ZWFyLCBtb250aCwgZGF0ZSwgdGltZSwgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMsIG1pbGxpc2Vjb25kcztcbiAgICAgICAgICAvLyBEZWZpbmUgYWRkaXRpb25hbCB1dGlsaXR5IG1ldGhvZHMgaWYgdGhlIGBEYXRlYCBtZXRob2RzIGFyZSBidWdneS5cbiAgICAgICAgICBpZiAoIWlzRXh0ZW5kZWQpIHtcbiAgICAgICAgICAgIHZhciBmbG9vciA9IE1hdGguZmxvb3I7XG4gICAgICAgICAgICAvLyBBIG1hcHBpbmcgYmV0d2VlbiB0aGUgbW9udGhzIG9mIHRoZSB5ZWFyIGFuZCB0aGUgbnVtYmVyIG9mIGRheXMgYmV0d2VlblxuICAgICAgICAgICAgLy8gSmFudWFyeSAxc3QgYW5kIHRoZSBmaXJzdCBvZiB0aGUgcmVzcGVjdGl2ZSBtb250aC5cbiAgICAgICAgICAgIHZhciBNb250aHMgPSBbMCwgMzEsIDU5LCA5MCwgMTIwLCAxNTEsIDE4MSwgMjEyLCAyNDMsIDI3MywgMzA0LCAzMzRdO1xuICAgICAgICAgICAgLy8gSW50ZXJuYWw6IENhbGN1bGF0ZXMgdGhlIG51bWJlciBvZiBkYXlzIGJldHdlZW4gdGhlIFVuaXggZXBvY2ggYW5kIHRoZVxuICAgICAgICAgICAgLy8gZmlyc3QgZGF5IG9mIHRoZSBnaXZlbiBtb250aC5cbiAgICAgICAgICAgIHZhciBnZXREYXkgPSBmdW5jdGlvbiAoeWVhciwgbW9udGgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIE1vbnRoc1ttb250aF0gKyAzNjUgKiAoeWVhciAtIDE5NzApICsgZmxvb3IoKHllYXIgLSAxOTY5ICsgKG1vbnRoID0gKyhtb250aCA+IDEpKSkgLyA0KSAtIGZsb29yKCh5ZWFyIC0gMTkwMSArIG1vbnRoKSAvIDEwMCkgKyBmbG9vcigoeWVhciAtIDE2MDEgKyBtb250aCkgLyA0MDApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGdldERhdGEgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgLy8gTWFudWFsbHkgY29tcHV0ZSB0aGUgeWVhciwgbW9udGgsIGRhdGUsIGhvdXJzLCBtaW51dGVzLFxuICAgICAgICAgICAgICAvLyBzZWNvbmRzLCBhbmQgbWlsbGlzZWNvbmRzIGlmIHRoZSBgZ2V0VVRDKmAgbWV0aG9kcyBhcmVcbiAgICAgICAgICAgICAgLy8gYnVnZ3kuIEFkYXB0ZWQgZnJvbSBAWWFmZmxlJ3MgYGRhdGUtc2hpbWAgcHJvamVjdC5cbiAgICAgICAgICAgICAgZGF0ZSA9IGZsb29yKHZhbHVlIC8gODY0ZTUpO1xuICAgICAgICAgICAgICBmb3IgKHllYXIgPSBmbG9vcihkYXRlIC8gMzY1LjI0MjUpICsgMTk3MCAtIDE7IGdldERheSh5ZWFyICsgMSwgMCkgPD0gZGF0ZTsgeWVhcisrKTtcbiAgICAgICAgICAgICAgZm9yIChtb250aCA9IGZsb29yKChkYXRlIC0gZ2V0RGF5KHllYXIsIDApKSAvIDMwLjQyKTsgZ2V0RGF5KHllYXIsIG1vbnRoICsgMSkgPD0gZGF0ZTsgbW9udGgrKyk7XG4gICAgICAgICAgICAgIGRhdGUgPSAxICsgZGF0ZSAtIGdldERheSh5ZWFyLCBtb250aCk7XG4gICAgICAgICAgICAgIC8vIFRoZSBgdGltZWAgdmFsdWUgc3BlY2lmaWVzIHRoZSB0aW1lIHdpdGhpbiB0aGUgZGF5IChzZWUgRVNcbiAgICAgICAgICAgICAgLy8gNS4xIHNlY3Rpb24gMTUuOS4xLjIpLiBUaGUgZm9ybXVsYSBgKEEgJSBCICsgQikgJSBCYCBpcyB1c2VkXG4gICAgICAgICAgICAgIC8vIHRvIGNvbXB1dGUgYEEgbW9kdWxvIEJgLCBhcyB0aGUgYCVgIG9wZXJhdG9yIGRvZXMgbm90XG4gICAgICAgICAgICAgIC8vIGNvcnJlc3BvbmQgdG8gdGhlIGBtb2R1bG9gIG9wZXJhdGlvbiBmb3IgbmVnYXRpdmUgbnVtYmVycy5cbiAgICAgICAgICAgICAgdGltZSA9ICh2YWx1ZSAlIDg2NGU1ICsgODY0ZTUpICUgODY0ZTU7XG4gICAgICAgICAgICAgIC8vIFRoZSBob3VycywgbWludXRlcywgc2Vjb25kcywgYW5kIG1pbGxpc2Vjb25kcyBhcmUgb2J0YWluZWQgYnlcbiAgICAgICAgICAgICAgLy8gZGVjb21wb3NpbmcgdGhlIHRpbWUgd2l0aGluIHRoZSBkYXkuIFNlZSBzZWN0aW9uIDE1LjkuMS4xMC5cbiAgICAgICAgICAgICAgaG91cnMgPSBmbG9vcih0aW1lIC8gMzZlNSkgJSAyNDtcbiAgICAgICAgICAgICAgbWludXRlcyA9IGZsb29yKHRpbWUgLyA2ZTQpICUgNjA7XG4gICAgICAgICAgICAgIHNlY29uZHMgPSBmbG9vcih0aW1lIC8gMWUzKSAlIDYwO1xuICAgICAgICAgICAgICBtaWxsaXNlY29uZHMgPSB0aW1lICUgMWUzO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2V0RGF0YSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICB5ZWFyID0gdmFsdWUuZ2V0VVRDRnVsbFllYXIoKTtcbiAgICAgICAgICAgICAgbW9udGggPSB2YWx1ZS5nZXRVVENNb250aCgpO1xuICAgICAgICAgICAgICBkYXRlID0gdmFsdWUuZ2V0VVRDRGF0ZSgpO1xuICAgICAgICAgICAgICBob3VycyA9IHZhbHVlLmdldFVUQ0hvdXJzKCk7XG4gICAgICAgICAgICAgIG1pbnV0ZXMgPSB2YWx1ZS5nZXRVVENNaW51dGVzKCk7XG4gICAgICAgICAgICAgIHNlY29uZHMgPSB2YWx1ZS5nZXRVVENTZWNvbmRzKCk7XG4gICAgICAgICAgICAgIG1pbGxpc2Vjb25kcyA9IHZhbHVlLmdldFVUQ01pbGxpc2Vjb25kcygpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2VyaWFsaXplRGF0ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlID4gLTEgLyAwICYmIHZhbHVlIDwgMSAvIDApIHtcbiAgICAgICAgICAgICAgLy8gRGF0ZXMgYXJlIHNlcmlhbGl6ZWQgYWNjb3JkaW5nIHRvIHRoZSBgRGF0ZSN0b0pTT05gIG1ldGhvZFxuICAgICAgICAgICAgICAvLyBzcGVjaWZpZWQgaW4gRVMgNS4xIHNlY3Rpb24gMTUuOS41LjQ0LiBTZWUgc2VjdGlvbiAxNS45LjEuMTVcbiAgICAgICAgICAgICAgLy8gZm9yIHRoZSBJU08gODYwMSBkYXRlIHRpbWUgc3RyaW5nIGZvcm1hdC5cbiAgICAgICAgICAgICAgZ2V0RGF0YSh2YWx1ZSk7XG4gICAgICAgICAgICAgIC8vIFNlcmlhbGl6ZSBleHRlbmRlZCB5ZWFycyBjb3JyZWN0bHkuXG4gICAgICAgICAgICAgIHZhbHVlID0gKHllYXIgPD0gMCB8fCB5ZWFyID49IDFlNCA/ICh5ZWFyIDwgMCA/IFwiLVwiIDogXCIrXCIpICsgdG9QYWRkZWRTdHJpbmcoNiwgeWVhciA8IDAgPyAteWVhciA6IHllYXIpIDogdG9QYWRkZWRTdHJpbmcoNCwgeWVhcikpICtcbiAgICAgICAgICAgICAgXCItXCIgKyB0b1BhZGRlZFN0cmluZygyLCBtb250aCArIDEpICsgXCItXCIgKyB0b1BhZGRlZFN0cmluZygyLCBkYXRlKSArXG4gICAgICAgICAgICAgIC8vIE1vbnRocywgZGF0ZXMsIGhvdXJzLCBtaW51dGVzLCBhbmQgc2Vjb25kcyBzaG91bGQgaGF2ZSB0d29cbiAgICAgICAgICAgICAgLy8gZGlnaXRzOyBtaWxsaXNlY29uZHMgc2hvdWxkIGhhdmUgdGhyZWUuXG4gICAgICAgICAgICAgIFwiVFwiICsgdG9QYWRkZWRTdHJpbmcoMiwgaG91cnMpICsgXCI6XCIgKyB0b1BhZGRlZFN0cmluZygyLCBtaW51dGVzKSArIFwiOlwiICsgdG9QYWRkZWRTdHJpbmcoMiwgc2Vjb25kcykgK1xuICAgICAgICAgICAgICAvLyBNaWxsaXNlY29uZHMgYXJlIG9wdGlvbmFsIGluIEVTIDUuMCwgYnV0IHJlcXVpcmVkIGluIDUuMS5cbiAgICAgICAgICAgICAgXCIuXCIgKyB0b1BhZGRlZFN0cmluZygzLCBtaWxsaXNlY29uZHMpICsgXCJaXCI7XG4gICAgICAgICAgICAgIHllYXIgPSBtb250aCA9IGRhdGUgPSBob3VycyA9IG1pbnV0ZXMgPSBzZWNvbmRzID0gbWlsbGlzZWNvbmRzID0gbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiBzZXJpYWxpemVEYXRlKHZhbHVlKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBGb3IgZW52aXJvbm1lbnRzIHdpdGggYEpTT04uc3RyaW5naWZ5YCBidXQgYnVnZ3kgZGF0ZSBzZXJpYWxpemF0aW9uLFxuICAgICAgICAvLyB3ZSBvdmVycmlkZSB0aGUgbmF0aXZlIGBEYXRlI3RvSlNPTmAgaW1wbGVtZW50YXRpb24gd2l0aCBhXG4gICAgICAgIC8vIHNwZWMtY29tcGxpYW50IG9uZS5cbiAgICAgICAgaWYgKGhhcyhcImpzb24tc3RyaW5naWZ5XCIpICYmICFoYXMoXCJkYXRlLXNlcmlhbGl6YXRpb25cIikpIHtcbiAgICAgICAgICAvLyBJbnRlcm5hbDogdGhlIGBEYXRlI3RvSlNPTmAgaW1wbGVtZW50YXRpb24gdXNlZCB0byBvdmVycmlkZSB0aGUgbmF0aXZlIG9uZS5cbiAgICAgICAgICBmdW5jdGlvbiBkYXRlVG9KU09OIChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBzZXJpYWxpemVEYXRlKHRoaXMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFB1YmxpYzogYEpTT04uc3RyaW5naWZ5YC4gU2VlIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjMuXG4gICAgICAgICAgdmFyIG5hdGl2ZVN0cmluZ2lmeSA9IGV4cG9ydHMuc3RyaW5naWZ5O1xuICAgICAgICAgIGV4cG9ydHMuc3RyaW5naWZ5ID0gZnVuY3Rpb24gKHNvdXJjZSwgZmlsdGVyLCB3aWR0aCkge1xuICAgICAgICAgICAgdmFyIG5hdGl2ZVRvSlNPTiA9IERhdGUucHJvdG90eXBlLnRvSlNPTjtcbiAgICAgICAgICAgIERhdGUucHJvdG90eXBlLnRvSlNPTiA9IGRhdGVUb0pTT047XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gbmF0aXZlU3RyaW5naWZ5KHNvdXJjZSwgZmlsdGVyLCB3aWR0aCk7XG4gICAgICAgICAgICBEYXRlLnByb3RvdHlwZS50b0pTT04gPSBuYXRpdmVUb0pTT047XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBJbnRlcm5hbDogRG91YmxlLXF1b3RlcyBhIHN0cmluZyBgdmFsdWVgLCByZXBsYWNpbmcgYWxsIEFTQ0lJIGNvbnRyb2xcbiAgICAgICAgICAvLyBjaGFyYWN0ZXJzIChjaGFyYWN0ZXJzIHdpdGggY29kZSB1bml0IHZhbHVlcyBiZXR3ZWVuIDAgYW5kIDMxKSB3aXRoXG4gICAgICAgICAgLy8gdGhlaXIgZXNjYXBlZCBlcXVpdmFsZW50cy4gVGhpcyBpcyBhbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGVcbiAgICAgICAgICAvLyBgUXVvdGUodmFsdWUpYCBvcGVyYXRpb24gZGVmaW5lZCBpbiBFUyA1LjEgc2VjdGlvbiAxNS4xMi4zLlxuICAgICAgICAgIHZhciB1bmljb2RlUHJlZml4ID0gXCJcXFxcdTAwXCI7XG4gICAgICAgICAgdmFyIGVzY2FwZUNoYXIgPSBmdW5jdGlvbiAoY2hhcmFjdGVyKSB7XG4gICAgICAgICAgICB2YXIgY2hhckNvZGUgPSBjaGFyYWN0ZXIuY2hhckNvZGVBdCgwKSwgZXNjYXBlZCA9IEVzY2FwZXNbY2hhckNvZGVdO1xuICAgICAgICAgICAgaWYgKGVzY2FwZWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGVzY2FwZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdW5pY29kZVByZWZpeCArIHRvUGFkZGVkU3RyaW5nKDIsIGNoYXJDb2RlLnRvU3RyaW5nKDE2KSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICB2YXIgcmVFc2NhcGUgPSAvW1xceDAwLVxceDFmXFx4MjJcXHg1Y10vZztcbiAgICAgICAgICB2YXIgcXVvdGUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJlRXNjYXBlLmxhc3RJbmRleCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gJ1wiJyArXG4gICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICByZUVzY2FwZS50ZXN0KHZhbHVlKVxuICAgICAgICAgICAgICAgICAgPyB2YWx1ZS5yZXBsYWNlKHJlRXNjYXBlLCBlc2NhcGVDaGFyKVxuICAgICAgICAgICAgICAgICAgOiB2YWx1ZVxuICAgICAgICAgICAgICApICtcbiAgICAgICAgICAgICAgJ1wiJztcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLy8gSW50ZXJuYWw6IFJlY3Vyc2l2ZWx5IHNlcmlhbGl6ZXMgYW4gb2JqZWN0LiBJbXBsZW1lbnRzIHRoZVxuICAgICAgICAgIC8vIGBTdHIoa2V5LCBob2xkZXIpYCwgYEpPKHZhbHVlKWAsIGFuZCBgSkEodmFsdWUpYCBvcGVyYXRpb25zLlxuICAgICAgICAgIHZhciBzZXJpYWxpemUgPSBmdW5jdGlvbiAocHJvcGVydHksIG9iamVjdCwgY2FsbGJhY2ssIHByb3BlcnRpZXMsIHdoaXRlc3BhY2UsIGluZGVudGF0aW9uLCBzdGFjaykge1xuICAgICAgICAgICAgdmFyIHZhbHVlLCB0eXBlLCBjbGFzc05hbWUsIHJlc3VsdHMsIGVsZW1lbnQsIGluZGV4LCBsZW5ndGgsIHByZWZpeCwgcmVzdWx0O1xuICAgICAgICAgICAgYXR0ZW1wdChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIC8vIE5lY2Vzc2FyeSBmb3IgaG9zdCBvYmplY3Qgc3VwcG9ydC5cbiAgICAgICAgICAgICAgdmFsdWUgPSBvYmplY3RbcHJvcGVydHldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09IFwib2JqZWN0XCIgJiYgdmFsdWUpIHtcbiAgICAgICAgICAgICAgaWYgKHZhbHVlLmdldFVUQ0Z1bGxZZWFyICYmIGdldENsYXNzLmNhbGwodmFsdWUpID09IGRhdGVDbGFzcyAmJiB2YWx1ZS50b0pTT04gPT09IERhdGUucHJvdG90eXBlLnRvSlNPTikge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gc2VyaWFsaXplRGF0ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlLnRvSlNPTiA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvSlNPTihwcm9wZXJ0eSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAvLyBJZiBhIHJlcGxhY2VtZW50IGZ1bmN0aW9uIHdhcyBwcm92aWRlZCwgY2FsbCBpdCB0byBvYnRhaW4gdGhlIHZhbHVlXG4gICAgICAgICAgICAgIC8vIGZvciBzZXJpYWxpemF0aW9uLlxuICAgICAgICAgICAgICB2YWx1ZSA9IGNhbGxiYWNrLmNhbGwob2JqZWN0LCBwcm9wZXJ0eSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRXhpdCBlYXJseSBpZiB2YWx1ZSBpcyBgdW5kZWZpbmVkYCBvciBgbnVsbGAuXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdmFsdWUgOiBcIm51bGxcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gICAgICAgICAgICAvLyBPbmx5IGNhbGwgYGdldENsYXNzYCBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICBjbGFzc05hbWUgPSBnZXRDbGFzcy5jYWxsKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAoY2xhc3NOYW1lIHx8IHR5cGUpIHtcbiAgICAgICAgICAgICAgY2FzZSBcImJvb2xlYW5cIjpcbiAgICAgICAgICAgICAgY2FzZSBib29sZWFuQ2xhc3M6XG4gICAgICAgICAgICAgICAgLy8gQm9vbGVhbnMgYXJlIHJlcHJlc2VudGVkIGxpdGVyYWxseS5cbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIiArIHZhbHVlO1xuICAgICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgICAgICAgIGNhc2UgbnVtYmVyQ2xhc3M6XG4gICAgICAgICAgICAgICAgLy8gSlNPTiBudW1iZXJzIG11c3QgYmUgZmluaXRlLiBgSW5maW5pdHlgIGFuZCBgTmFOYCBhcmUgc2VyaWFsaXplZCBhc1xuICAgICAgICAgICAgICAgIC8vIGBcIm51bGxcImAuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID4gLTEgLyAwICYmIHZhbHVlIDwgMSAvIDAgPyBcIlwiICsgdmFsdWUgOiBcIm51bGxcIjtcbiAgICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgICAgICBjYXNlIHN0cmluZ0NsYXNzOlxuICAgICAgICAgICAgICAgIC8vIFN0cmluZ3MgYXJlIGRvdWJsZS1xdW90ZWQgYW5kIGVzY2FwZWQuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHF1b3RlKFwiXCIgKyB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBSZWN1cnNpdmVseSBzZXJpYWxpemUgb2JqZWN0cyBhbmQgYXJyYXlzLlxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgIC8vIENoZWNrIGZvciBjeWNsaWMgc3RydWN0dXJlcy4gVGhpcyBpcyBhIGxpbmVhciBzZWFyY2g7IHBlcmZvcm1hbmNlXG4gICAgICAgICAgICAgIC8vIGlzIGludmVyc2VseSBwcm9wb3J0aW9uYWwgdG8gdGhlIG51bWJlciBvZiB1bmlxdWUgbmVzdGVkIG9iamVjdHMuXG4gICAgICAgICAgICAgIGZvciAobGVuZ3RoID0gc3RhY2subGVuZ3RoOyBsZW5ndGgtLTspIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhY2tbbGVuZ3RoXSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIC8vIEN5Y2xpYyBzdHJ1Y3R1cmVzIGNhbm5vdCBiZSBzZXJpYWxpemVkIGJ5IGBKU09OLnN0cmluZ2lmeWAuXG4gICAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gQWRkIHRoZSBvYmplY3QgdG8gdGhlIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuICAgICAgICAgICAgICBzdGFjay5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgICAgICAvLyBTYXZlIHRoZSBjdXJyZW50IGluZGVudGF0aW9uIGxldmVsIGFuZCBpbmRlbnQgb25lIGFkZGl0aW9uYWwgbGV2ZWwuXG4gICAgICAgICAgICAgIHByZWZpeCA9IGluZGVudGF0aW9uO1xuICAgICAgICAgICAgICBpbmRlbnRhdGlvbiArPSB3aGl0ZXNwYWNlO1xuICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lID09IGFycmF5Q2xhc3MpIHtcbiAgICAgICAgICAgICAgICAvLyBSZWN1cnNpdmVseSBzZXJpYWxpemUgYXJyYXkgZWxlbWVudHMuXG4gICAgICAgICAgICAgICAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IHZhbHVlLmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBzZXJpYWxpemUoaW5kZXgsIHZhbHVlLCBjYWxsYmFjaywgcHJvcGVydGllcywgd2hpdGVzcGFjZSwgaW5kZW50YXRpb24sIHN0YWNrKTtcbiAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChlbGVtZW50ID09PSB1bmRlZmluZWQgPyBcIm51bGxcIiA6IGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHRzLmxlbmd0aCA/ICh3aGl0ZXNwYWNlID8gXCJbXFxuXCIgKyBpbmRlbnRhdGlvbiArIHJlc3VsdHMuam9pbihcIixcXG5cIiArIGluZGVudGF0aW9uKSArIFwiXFxuXCIgKyBwcmVmaXggKyBcIl1cIiA6IChcIltcIiArIHJlc3VsdHMuam9pbihcIixcIikgKyBcIl1cIikpIDogXCJbXVwiO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFJlY3Vyc2l2ZWx5IHNlcmlhbGl6ZSBvYmplY3QgbWVtYmVycy4gTWVtYmVycyBhcmUgc2VsZWN0ZWQgZnJvbVxuICAgICAgICAgICAgICAgIC8vIGVpdGhlciBhIHVzZXItc3BlY2lmaWVkIGxpc3Qgb2YgcHJvcGVydHkgbmFtZXMsIG9yIHRoZSBvYmplY3RcbiAgICAgICAgICAgICAgICAvLyBpdHNlbGYuXG4gICAgICAgICAgICAgICAgZm9yT3duKHByb3BlcnRpZXMgfHwgdmFsdWUsIGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBzZXJpYWxpemUocHJvcGVydHksIHZhbHVlLCBjYWxsYmFjaywgcHJvcGVydGllcywgd2hpdGVzcGFjZSwgaW5kZW50YXRpb24sIHN0YWNrKTtcbiAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWNjb3JkaW5nIHRvIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjM6IFwiSWYgYGdhcGAge3doaXRlc3BhY2V9XG4gICAgICAgICAgICAgICAgICAgIC8vIGlzIG5vdCB0aGUgZW1wdHkgc3RyaW5nLCBsZXQgYG1lbWJlcmAge3F1b3RlKHByb3BlcnR5KSArIFwiOlwifVxuICAgICAgICAgICAgICAgICAgICAvLyBiZSB0aGUgY29uY2F0ZW5hdGlvbiBvZiBgbWVtYmVyYCBhbmQgdGhlIGBzcGFjZWAgY2hhcmFjdGVyLlwiXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBcImBzcGFjZWAgY2hhcmFjdGVyXCIgcmVmZXJzIHRvIHRoZSBsaXRlcmFsIHNwYWNlXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoYXJhY3Rlciwgbm90IHRoZSBgc3BhY2VgIHt3aWR0aH0gYXJndW1lbnQgcHJvdmlkZWQgdG9cbiAgICAgICAgICAgICAgICAgICAgLy8gYEpTT04uc3RyaW5naWZ5YC5cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHF1b3RlKHByb3BlcnR5KSArIFwiOlwiICsgKHdoaXRlc3BhY2UgPyBcIiBcIiA6IFwiXCIpICsgZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0cy5sZW5ndGggPyAod2hpdGVzcGFjZSA/IFwie1xcblwiICsgaW5kZW50YXRpb24gKyByZXN1bHRzLmpvaW4oXCIsXFxuXCIgKyBpbmRlbnRhdGlvbikgKyBcIlxcblwiICsgcHJlZml4ICsgXCJ9XCIgOiAoXCJ7XCIgKyByZXN1bHRzLmpvaW4oXCIsXCIpICsgXCJ9XCIpKSA6IFwie31cIjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIG9iamVjdCBmcm9tIHRoZSB0cmF2ZXJzZWQgb2JqZWN0IHN0YWNrLlxuICAgICAgICAgICAgICBzdGFjay5wb3AoKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLy8gUHVibGljOiBgSlNPTi5zdHJpbmdpZnlgLiBTZWUgRVMgNS4xIHNlY3Rpb24gMTUuMTIuMy5cbiAgICAgICAgICBleHBvcnRzLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIChzb3VyY2UsIGZpbHRlciwgd2lkdGgpIHtcbiAgICAgICAgICAgIHZhciB3aGl0ZXNwYWNlLCBjYWxsYmFjaywgcHJvcGVydGllcywgY2xhc3NOYW1lO1xuICAgICAgICAgICAgaWYgKG9iamVjdFR5cGVzW3R5cGVvZiBmaWx0ZXJdICYmIGZpbHRlcikge1xuICAgICAgICAgICAgICBjbGFzc05hbWUgPSBnZXRDbGFzcy5jYWxsKGZpbHRlcik7XG4gICAgICAgICAgICAgIGlmIChjbGFzc05hbWUgPT0gZnVuY3Rpb25DbGFzcykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gZmlsdGVyO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNsYXNzTmFtZSA9PSBhcnJheUNsYXNzKSB7XG4gICAgICAgICAgICAgICAgLy8gQ29udmVydCB0aGUgcHJvcGVydHkgbmFtZXMgYXJyYXkgaW50byBhIG1ha2VzaGlmdCBzZXQuXG4gICAgICAgICAgICAgICAgcHJvcGVydGllcyA9IHt9O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMCwgbGVuZ3RoID0gZmlsdGVyLmxlbmd0aCwgdmFsdWU7IGluZGV4IDwgbGVuZ3RoOykge1xuICAgICAgICAgICAgICAgICAgdmFsdWUgPSBmaWx0ZXJbaW5kZXgrK107XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBnZXRDbGFzcy5jYWxsKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIGlmIChjbGFzc05hbWUgPT0gXCJbb2JqZWN0IFN0cmluZ11cIiB8fCBjbGFzc05hbWUgPT0gXCJbb2JqZWN0IE51bWJlcl1cIikge1xuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW3ZhbHVlXSA9IDE7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAod2lkdGgpIHtcbiAgICAgICAgICAgICAgY2xhc3NOYW1lID0gZ2V0Q2xhc3MuY2FsbCh3aWR0aCk7XG4gICAgICAgICAgICAgIGlmIChjbGFzc05hbWUgPT0gbnVtYmVyQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICAvLyBDb252ZXJ0IHRoZSBgd2lkdGhgIHRvIGFuIGludGVnZXIgYW5kIGNyZWF0ZSBhIHN0cmluZyBjb250YWluaW5nXG4gICAgICAgICAgICAgICAgLy8gYHdpZHRoYCBudW1iZXIgb2Ygc3BhY2UgY2hhcmFjdGVycy5cbiAgICAgICAgICAgICAgICBpZiAoKHdpZHRoIC09IHdpZHRoICUgMSkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICBpZiAod2lkdGggPiAxMCkge1xuICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IDEwO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgZm9yICh3aGl0ZXNwYWNlID0gXCJcIjsgd2hpdGVzcGFjZS5sZW5ndGggPCB3aWR0aDspIHtcbiAgICAgICAgICAgICAgICAgICAgd2hpdGVzcGFjZSArPSBcIiBcIjtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2xhc3NOYW1lID09IHN0cmluZ0NsYXNzKSB7XG4gICAgICAgICAgICAgICAgd2hpdGVzcGFjZSA9IHdpZHRoLmxlbmd0aCA8PSAxMCA/IHdpZHRoIDogd2lkdGguc2xpY2UoMCwgMTApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBPcGVyYSA8PSA3LjU0dTIgZGlzY2FyZHMgdGhlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggZW1wdHkgc3RyaW5nIGtleXNcbiAgICAgICAgICAgIC8vIChgXCJcImApIG9ubHkgaWYgdGhleSBhcmUgdXNlZCBkaXJlY3RseSB3aXRoaW4gYW4gb2JqZWN0IG1lbWJlciBsaXN0XG4gICAgICAgICAgICAvLyAoZS5nLiwgYCEoXCJcIiBpbiB7IFwiXCI6IDF9KWApLlxuICAgICAgICAgICAgcmV0dXJuIHNlcmlhbGl6ZShcIlwiLCAodmFsdWUgPSB7fSwgdmFsdWVbXCJcIl0gPSBzb3VyY2UsIHZhbHVlKSwgY2FsbGJhY2ssIHByb3BlcnRpZXMsIHdoaXRlc3BhY2UsIFwiXCIsIFtdKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFB1YmxpYzogUGFyc2VzIGEgSlNPTiBzb3VyY2Ugc3RyaW5nLlxuICAgICAgaWYgKCFoYXMoXCJqc29uLXBhcnNlXCIpKSB7XG4gICAgICAgIHZhciBmcm9tQ2hhckNvZGUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlO1xuXG4gICAgICAgIC8vIEludGVybmFsOiBBIG1hcCBvZiBlc2NhcGVkIGNvbnRyb2wgY2hhcmFjdGVycyBhbmQgdGhlaXIgdW5lc2NhcGVkXG4gICAgICAgIC8vIGVxdWl2YWxlbnRzLlxuICAgICAgICB2YXIgVW5lc2NhcGVzID0ge1xuICAgICAgICAgIDkyOiBcIlxcXFxcIixcbiAgICAgICAgICAzNDogJ1wiJyxcbiAgICAgICAgICA0NzogXCIvXCIsXG4gICAgICAgICAgOTg6IFwiXFxiXCIsXG4gICAgICAgICAgMTE2OiBcIlxcdFwiLFxuICAgICAgICAgIDExMDogXCJcXG5cIixcbiAgICAgICAgICAxMDI6IFwiXFxmXCIsXG4gICAgICAgICAgMTE0OiBcIlxcclwiXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gSW50ZXJuYWw6IFN0b3JlcyB0aGUgcGFyc2VyIHN0YXRlLlxuICAgICAgICB2YXIgSW5kZXgsIFNvdXJjZTtcblxuICAgICAgICAvLyBJbnRlcm5hbDogUmVzZXRzIHRoZSBwYXJzZXIgc3RhdGUgYW5kIHRocm93cyBhIGBTeW50YXhFcnJvcmAuXG4gICAgICAgIHZhciBhYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBJbmRleCA9IFNvdXJjZSA9IG51bGw7XG4gICAgICAgICAgdGhyb3cgU3ludGF4RXJyb3IoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBJbnRlcm5hbDogUmV0dXJucyB0aGUgbmV4dCB0b2tlbiwgb3IgYFwiJFwiYCBpZiB0aGUgcGFyc2VyIGhhcyByZWFjaGVkXG4gICAgICAgIC8vIHRoZSBlbmQgb2YgdGhlIHNvdXJjZSBzdHJpbmcuIEEgdG9rZW4gbWF5IGJlIGEgc3RyaW5nLCBudW1iZXIsIGBudWxsYFxuICAgICAgICAvLyBsaXRlcmFsLCBvciBCb29sZWFuIGxpdGVyYWwuXG4gICAgICAgIHZhciBsZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIHNvdXJjZSA9IFNvdXJjZSwgbGVuZ3RoID0gc291cmNlLmxlbmd0aCwgdmFsdWUsIGJlZ2luLCBwb3NpdGlvbiwgaXNTaWduZWQsIGNoYXJDb2RlO1xuICAgICAgICAgIHdoaWxlIChJbmRleCA8IGxlbmd0aCkge1xuICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCk7XG4gICAgICAgICAgICBzd2l0Y2ggKGNoYXJDb2RlKSB7XG4gICAgICAgICAgICAgIGNhc2UgOTogY2FzZSAxMDogY2FzZSAxMzogY2FzZSAzMjpcbiAgICAgICAgICAgICAgICAvLyBTa2lwIHdoaXRlc3BhY2UgdG9rZW5zLCBpbmNsdWRpbmcgdGFicywgY2FycmlhZ2UgcmV0dXJucywgbGluZVxuICAgICAgICAgICAgICAgIC8vIGZlZWRzLCBhbmQgc3BhY2UgY2hhcmFjdGVycy5cbiAgICAgICAgICAgICAgICBJbmRleCsrO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIDEyMzogY2FzZSAxMjU6IGNhc2UgOTE6IGNhc2UgOTM6IGNhc2UgNTg6IGNhc2UgNDQ6XG4gICAgICAgICAgICAgICAgLy8gUGFyc2UgYSBwdW5jdHVhdG9yIHRva2VuIChge2AsIGB9YCwgYFtgLCBgXWAsIGA6YCwgb3IgYCxgKSBhdFxuICAgICAgICAgICAgICAgIC8vIHRoZSBjdXJyZW50IHBvc2l0aW9uLlxuICAgICAgICAgICAgICAgIHZhbHVlID0gY2hhckluZGV4QnVnZ3kgPyBzb3VyY2UuY2hhckF0KEluZGV4KSA6IHNvdXJjZVtJbmRleF07XG4gICAgICAgICAgICAgICAgSW5kZXgrKztcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgIGNhc2UgMzQ6XG4gICAgICAgICAgICAgICAgLy8gYFwiYCBkZWxpbWl0cyBhIEpTT04gc3RyaW5nOyBhZHZhbmNlIHRvIHRoZSBuZXh0IGNoYXJhY3RlciBhbmRcbiAgICAgICAgICAgICAgICAvLyBiZWdpbiBwYXJzaW5nIHRoZSBzdHJpbmcuIFN0cmluZyB0b2tlbnMgYXJlIHByZWZpeGVkIHdpdGggdGhlXG4gICAgICAgICAgICAgICAgLy8gc2VudGluZWwgYEBgIGNoYXJhY3RlciB0byBkaXN0aW5ndWlzaCB0aGVtIGZyb20gcHVuY3R1YXRvcnMgYW5kXG4gICAgICAgICAgICAgICAgLy8gZW5kLW9mLXN0cmluZyB0b2tlbnMuXG4gICAgICAgICAgICAgICAgZm9yICh2YWx1ZSA9IFwiQFwiLCBJbmRleCsrOyBJbmRleCA8IGxlbmd0aDspIHtcbiAgICAgICAgICAgICAgICAgIGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlIDwgMzIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVW5lc2NhcGVkIEFTQ0lJIGNvbnRyb2wgY2hhcmFjdGVycyAodGhvc2Ugd2l0aCBhIGNvZGUgdW5pdFxuICAgICAgICAgICAgICAgICAgICAvLyBsZXNzIHRoYW4gdGhlIHNwYWNlIGNoYXJhY3RlcikgYXJlIG5vdCBwZXJtaXR0ZWQuXG4gICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNoYXJDb2RlID09IDkyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEEgcmV2ZXJzZSBzb2xpZHVzIChgXFxgKSBtYXJrcyB0aGUgYmVnaW5uaW5nIG9mIGFuIGVzY2FwZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gY29udHJvbCBjaGFyYWN0ZXIgKGluY2x1ZGluZyBgXCJgLCBgXFxgLCBhbmQgYC9gKSBvciBVbmljb2RlXG4gICAgICAgICAgICAgICAgICAgIC8vIGVzY2FwZSBzZXF1ZW5jZS5cbiAgICAgICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdCgrK0luZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjaGFyQ29kZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgOTI6IGNhc2UgMzQ6IGNhc2UgNDc6IGNhc2UgOTg6IGNhc2UgMTE2OiBjYXNlIDExMDogY2FzZSAxMDI6IGNhc2UgMTE0OlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmV2aXZlIGVzY2FwZWQgY29udHJvbCBjaGFyYWN0ZXJzLlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gVW5lc2NhcGVzW2NoYXJDb2RlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIEluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIDExNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGBcXHVgIG1hcmtzIHRoZSBiZWdpbm5pbmcgb2YgYSBVbmljb2RlIGVzY2FwZSBzZXF1ZW5jZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkdmFuY2UgdG8gdGhlIGZpcnN0IGNoYXJhY3RlciBhbmQgdmFsaWRhdGUgdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmb3VyLWRpZ2l0IGNvZGUgcG9pbnQuXG4gICAgICAgICAgICAgICAgICAgICAgICBiZWdpbiA9ICsrSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHBvc2l0aW9uID0gSW5kZXggKyA0OyBJbmRleCA8IHBvc2l0aW9uOyBJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBIHZhbGlkIHNlcXVlbmNlIGNvbXByaXNlcyBmb3VyIGhleGRpZ2l0cyAoY2FzZS1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW5zZW5zaXRpdmUpIHRoYXQgZm9ybSBhIHNpbmdsZSBoZXhhZGVjaW1hbCB2YWx1ZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoY2hhckNvZGUgPj0gNDggJiYgY2hhckNvZGUgPD0gNTcgfHwgY2hhckNvZGUgPj0gOTcgJiYgY2hhckNvZGUgPD0gMTAyIHx8IGNoYXJDb2RlID49IDY1ICYmIGNoYXJDb2RlIDw9IDcwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEludmFsaWQgVW5pY29kZSBlc2NhcGUgc2VxdWVuY2UuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmV2aXZlIHRoZSBlc2NhcGVkIGNoYXJhY3Rlci5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICs9IGZyb21DaGFyQ29kZShcIjB4XCIgKyBzb3VyY2Uuc2xpY2UoYmVnaW4sIEluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSW52YWxpZCBlc2NhcGUgc2VxdWVuY2UuXG4gICAgICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgPT0gMzQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBBbiB1bmVzY2FwZWQgZG91YmxlLXF1b3RlIGNoYXJhY3RlciBtYXJrcyB0aGUgZW5kIG9mIHRoZVxuICAgICAgICAgICAgICAgICAgICAgIC8vIHN0cmluZy5cbiAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgYmVnaW4gPSBJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgLy8gT3B0aW1pemUgZm9yIHRoZSBjb21tb24gY2FzZSB3aGVyZSBhIHN0cmluZyBpcyB2YWxpZC5cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGNoYXJDb2RlID49IDMyICYmIGNoYXJDb2RlICE9IDkyICYmIGNoYXJDb2RlICE9IDM0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdCgrK0luZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBBcHBlbmQgdGhlIHN0cmluZyBhcy1pcy5cbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gc291cmNlLnNsaWNlKGJlZ2luLCBJbmRleCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UuY2hhckNvZGVBdChJbmRleCkgPT0gMzQpIHtcbiAgICAgICAgICAgICAgICAgIC8vIEFkdmFuY2UgdG8gdGhlIG5leHQgY2hhcmFjdGVyIGFuZCByZXR1cm4gdGhlIHJldml2ZWQgc3RyaW5nLlxuICAgICAgICAgICAgICAgICAgSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gVW50ZXJtaW5hdGVkIHN0cmluZy5cbiAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vIFBhcnNlIG51bWJlcnMgYW5kIGxpdGVyYWxzLlxuICAgICAgICAgICAgICAgIGJlZ2luID0gSW5kZXg7XG4gICAgICAgICAgICAgICAgLy8gQWR2YW5jZSBwYXN0IHRoZSBuZWdhdGl2ZSBzaWduLCBpZiBvbmUgaXMgc3BlY2lmaWVkLlxuICAgICAgICAgICAgICAgIGlmIChjaGFyQ29kZSA9PSA0NSkge1xuICAgICAgICAgICAgICAgICAgaXNTaWduZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdCgrK0luZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gUGFyc2UgYW4gaW50ZWdlciBvciBmbG9hdGluZy1wb2ludCB2YWx1ZS5cbiAgICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgPj0gNDggJiYgY2hhckNvZGUgPD0gNTcpIHtcbiAgICAgICAgICAgICAgICAgIC8vIExlYWRpbmcgemVyb2VzIGFyZSBpbnRlcnByZXRlZCBhcyBvY3RhbCBsaXRlcmFscy5cbiAgICAgICAgICAgICAgICAgIGlmIChjaGFyQ29kZSA9PSA0OCAmJiAoKGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXggKyAxKSksIGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3KSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJbGxlZ2FsIG9jdGFsIGxpdGVyYWwuXG4gICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpc1NpZ25lZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgLy8gUGFyc2UgdGhlIGludGVnZXIgY29tcG9uZW50LlxuICAgICAgICAgICAgICAgICAgZm9yICg7IEluZGV4IDwgbGVuZ3RoICYmICgoY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCkpLCBjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1Nyk7IEluZGV4KyspO1xuICAgICAgICAgICAgICAgICAgLy8gRmxvYXRzIGNhbm5vdCBjb250YWluIGEgbGVhZGluZyBkZWNpbWFsIHBvaW50OyBob3dldmVyLCB0aGlzXG4gICAgICAgICAgICAgICAgICAvLyBjYXNlIGlzIGFscmVhZHkgYWNjb3VudGVkIGZvciBieSB0aGUgcGFyc2VyLlxuICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KSA9PSA0Nikge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9ICsrSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIC8vIFBhcnNlIHRoZSBkZWNpbWFsIGNvbXBvbmVudC5cbiAgICAgICAgICAgICAgICAgICAgZm9yICg7IHBvc2l0aW9uIDwgbGVuZ3RoOyBwb3NpdGlvbisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChwb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlIDwgNDggfHwgY2hhckNvZGUgPiA1Nykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbiA9PSBJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIElsbGVnYWwgdHJhaWxpbmcgZGVjaW1hbC5cbiAgICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIEluZGV4ID0gcG9zaXRpb247XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAvLyBQYXJzZSBleHBvbmVudHMuIFRoZSBgZWAgZGVub3RpbmcgdGhlIGV4cG9uZW50IGlzXG4gICAgICAgICAgICAgICAgICAvLyBjYXNlLWluc2Vuc2l0aXZlLlxuICAgICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCk7XG4gICAgICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgPT0gMTAxIHx8IGNoYXJDb2RlID09IDY5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoKytJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNraXAgcGFzdCB0aGUgc2lnbiBmb2xsb3dpbmcgdGhlIGV4cG9uZW50LCBpZiBvbmUgaXNcbiAgICAgICAgICAgICAgICAgICAgLy8gc3BlY2lmaWVkLlxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgPT0gNDMgfHwgY2hhckNvZGUgPT0gNDUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIFBhcnNlIHRoZSBleHBvbmVudGlhbCBjb21wb25lbnQuXG4gICAgICAgICAgICAgICAgICAgIGZvciAocG9zaXRpb24gPSBJbmRleDsgcG9zaXRpb24gPCBsZW5ndGg7IHBvc2l0aW9uKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICBjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KHBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgPCA0OCB8fCBjaGFyQ29kZSA+IDU3KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uID09IEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gSWxsZWdhbCBlbXB0eSBleHBvbmVudC5cbiAgICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIEluZGV4ID0gcG9zaXRpb247XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAvLyBDb2VyY2UgdGhlIHBhcnNlZCB2YWx1ZSB0byBhIEphdmFTY3JpcHQgbnVtYmVyLlxuICAgICAgICAgICAgICAgICAgcmV0dXJuICtzb3VyY2Uuc2xpY2UoYmVnaW4sIEluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gQSBuZWdhdGl2ZSBzaWduIG1heSBvbmx5IHByZWNlZGUgbnVtYmVycy5cbiAgICAgICAgICAgICAgICBpZiAoaXNTaWduZWQpIHtcbiAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGB0cnVlYCwgYGZhbHNlYCwgYW5kIGBudWxsYCBsaXRlcmFscy5cbiAgICAgICAgICAgICAgICB2YXIgdGVtcCA9IHNvdXJjZS5zbGljZShJbmRleCwgSW5kZXggKyA0KTtcbiAgICAgICAgICAgICAgICBpZiAodGVtcCA9PSBcInRydWVcIikge1xuICAgICAgICAgICAgICAgICAgSW5kZXggKz0gNDtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGVtcCA9PSBcImZhbHNcIiAmJiBzb3VyY2UuY2hhckNvZGVBdChJbmRleCArIDQgKSA9PSAxMDEpIHtcbiAgICAgICAgICAgICAgICAgIEluZGV4ICs9IDU7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0ZW1wID09IFwibnVsbFwiKSB7XG4gICAgICAgICAgICAgICAgICBJbmRleCArPSA0O1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFVucmVjb2duaXplZCB0b2tlbi5cbiAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBSZXR1cm4gdGhlIHNlbnRpbmVsIGAkYCBjaGFyYWN0ZXIgaWYgdGhlIHBhcnNlciBoYXMgcmVhY2hlZCB0aGUgZW5kXG4gICAgICAgICAgLy8gb2YgdGhlIHNvdXJjZSBzdHJpbmcuXG4gICAgICAgICAgcmV0dXJuIFwiJFwiO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEludGVybmFsOiBQYXJzZXMgYSBKU09OIGB2YWx1ZWAgdG9rZW4uXG4gICAgICAgIHZhciBnZXQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICB2YXIgcmVzdWx0cywgaGFzTWVtYmVycztcbiAgICAgICAgICBpZiAodmFsdWUgPT0gXCIkXCIpIHtcbiAgICAgICAgICAgIC8vIFVuZXhwZWN0ZWQgZW5kIG9mIGlucHV0LlxuICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBpZiAoKGNoYXJJbmRleEJ1Z2d5ID8gdmFsdWUuY2hhckF0KDApIDogdmFsdWVbMF0pID09IFwiQFwiKSB7XG4gICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgc2VudGluZWwgYEBgIGNoYXJhY3Rlci5cbiAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnNsaWNlKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUGFyc2Ugb2JqZWN0IGFuZCBhcnJheSBsaXRlcmFscy5cbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIltcIikge1xuICAgICAgICAgICAgICAvLyBQYXJzZXMgYSBKU09OIGFycmF5LCByZXR1cm5pbmcgYSBuZXcgSmF2YVNjcmlwdCBhcnJheS5cbiAgICAgICAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgICAgICBmb3IgKDs7KSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBsZXgoKTtcbiAgICAgICAgICAgICAgICAvLyBBIGNsb3Npbmcgc3F1YXJlIGJyYWNrZXQgbWFya3MgdGhlIGVuZCBvZiB0aGUgYXJyYXkgbGl0ZXJhbC5cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gXCJdXCIpIHtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgYXJyYXkgbGl0ZXJhbCBjb250YWlucyBlbGVtZW50cywgdGhlIGN1cnJlbnQgdG9rZW5cbiAgICAgICAgICAgICAgICAvLyBzaG91bGQgYmUgYSBjb21tYSBzZXBhcmF0aW5nIHRoZSBwcmV2aW91cyBlbGVtZW50IGZyb20gdGhlXG4gICAgICAgICAgICAgICAgLy8gbmV4dC5cbiAgICAgICAgICAgICAgICBpZiAoaGFzTWVtYmVycykge1xuICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IFwiLFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gbGV4KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIl1cIikge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIFVuZXhwZWN0ZWQgdHJhaWxpbmcgYCxgIGluIGFycmF5IGxpdGVyYWwuXG4gICAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQSBgLGAgbXVzdCBzZXBhcmF0ZSBlYWNoIGFycmF5IGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGhhc01lbWJlcnMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBFbGlzaW9ucyBhbmQgbGVhZGluZyBjb21tYXMgYXJlIG5vdCBwZXJtaXR0ZWQuXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IFwiLFwiKSB7XG4gICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goZ2V0KHZhbHVlKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09IFwie1wiKSB7XG4gICAgICAgICAgICAgIC8vIFBhcnNlcyBhIEpTT04gb2JqZWN0LCByZXR1cm5pbmcgYSBuZXcgSmF2YVNjcmlwdCBvYmplY3QuXG4gICAgICAgICAgICAgIHJlc3VsdHMgPSB7fTtcbiAgICAgICAgICAgICAgZm9yICg7Oykge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gbGV4KCk7XG4gICAgICAgICAgICAgICAgLy8gQSBjbG9zaW5nIGN1cmx5IGJyYWNlIG1hcmtzIHRoZSBlbmQgb2YgdGhlIG9iamVjdCBsaXRlcmFsLlxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIn1cIikge1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBvYmplY3QgbGl0ZXJhbCBjb250YWlucyBtZW1iZXJzLCB0aGUgY3VycmVudCB0b2tlblxuICAgICAgICAgICAgICAgIC8vIHNob3VsZCBiZSBhIGNvbW1hIHNlcGFyYXRvci5cbiAgICAgICAgICAgICAgICBpZiAoaGFzTWVtYmVycykge1xuICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IFwiLFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gbGV4KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIn1cIikge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIFVuZXhwZWN0ZWQgdHJhaWxpbmcgYCxgIGluIG9iamVjdCBsaXRlcmFsLlxuICAgICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEEgYCxgIG11c3Qgc2VwYXJhdGUgZWFjaCBvYmplY3QgbWVtYmVyLlxuICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBoYXNNZW1iZXJzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gTGVhZGluZyBjb21tYXMgYXJlIG5vdCBwZXJtaXR0ZWQsIG9iamVjdCBwcm9wZXJ0eSBuYW1lcyBtdXN0IGJlXG4gICAgICAgICAgICAgICAgLy8gZG91YmxlLXF1b3RlZCBzdHJpbmdzLCBhbmQgYSBgOmAgbXVzdCBzZXBhcmF0ZSBlYWNoIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgLy8gbmFtZSBhbmQgdmFsdWUuXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IFwiLFwiIHx8IHR5cGVvZiB2YWx1ZSAhPSBcInN0cmluZ1wiIHx8IChjaGFySW5kZXhCdWdneSA/IHZhbHVlLmNoYXJBdCgwKSA6IHZhbHVlWzBdKSAhPSBcIkBcIiB8fCBsZXgoKSAhPSBcIjpcIikge1xuICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzdWx0c1t2YWx1ZS5zbGljZSgxKV0gPSBnZXQobGV4KCkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVW5leHBlY3RlZCB0b2tlbiBlbmNvdW50ZXJlZC5cbiAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBJbnRlcm5hbDogVXBkYXRlcyBhIHRyYXZlcnNlZCBvYmplY3QgbWVtYmVyLlxuICAgICAgICB2YXIgdXBkYXRlID0gZnVuY3Rpb24gKHNvdXJjZSwgcHJvcGVydHksIGNhbGxiYWNrKSB7XG4gICAgICAgICAgdmFyIGVsZW1lbnQgPSB3YWxrKHNvdXJjZSwgcHJvcGVydHksIGNhbGxiYWNrKTtcbiAgICAgICAgICBpZiAoZWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBkZWxldGUgc291cmNlW3Byb3BlcnR5XTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc291cmNlW3Byb3BlcnR5XSA9IGVsZW1lbnQ7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEludGVybmFsOiBSZWN1cnNpdmVseSB0cmF2ZXJzZXMgYSBwYXJzZWQgSlNPTiBvYmplY3QsIGludm9raW5nIHRoZVxuICAgICAgICAvLyBgY2FsbGJhY2tgIGZ1bmN0aW9uIGZvciBlYWNoIHZhbHVlLiBUaGlzIGlzIGFuIGltcGxlbWVudGF0aW9uIG9mIHRoZVxuICAgICAgICAvLyBgV2Fsayhob2xkZXIsIG5hbWUpYCBvcGVyYXRpb24gZGVmaW5lZCBpbiBFUyA1LjEgc2VjdGlvbiAxNS4xMi4yLlxuICAgICAgICB2YXIgd2FsayA9IGZ1bmN0aW9uIChzb3VyY2UsIHByb3BlcnR5LCBjYWxsYmFjaykge1xuICAgICAgICAgIHZhciB2YWx1ZSA9IHNvdXJjZVtwcm9wZXJ0eV0sIGxlbmd0aDtcbiAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09IFwib2JqZWN0XCIgJiYgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIGBmb3JPd25gIGNhbid0IGJlIHVzZWQgdG8gdHJhdmVyc2UgYW4gYXJyYXkgaW4gT3BlcmEgPD0gOC41NFxuICAgICAgICAgICAgLy8gYmVjYXVzZSBpdHMgYE9iamVjdCNoYXNPd25Qcm9wZXJ0eWAgaW1wbGVtZW50YXRpb24gcmV0dXJucyBgZmFsc2VgXG4gICAgICAgICAgICAvLyBmb3IgYXJyYXkgaW5kaWNlcyAoZS5nLiwgYCFbMSwgMiwgM10uaGFzT3duUHJvcGVydHkoXCIwXCIpYCkuXG4gICAgICAgICAgICBpZiAoZ2V0Q2xhc3MuY2FsbCh2YWx1ZSkgPT0gYXJyYXlDbGFzcykge1xuICAgICAgICAgICAgICBmb3IgKGxlbmd0aCA9IHZhbHVlLmxlbmd0aDsgbGVuZ3RoLS07KSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlKGdldENsYXNzLCBmb3JPd24sIHZhbHVlLCBsZW5ndGgsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZm9yT3duKHZhbHVlLCBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGUodmFsdWUsIHByb3BlcnR5LCBjYWxsYmFjayk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2suY2FsbChzb3VyY2UsIHByb3BlcnR5LCB2YWx1ZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gUHVibGljOiBgSlNPTi5wYXJzZWAuIFNlZSBFUyA1LjEgc2VjdGlvbiAxNS4xMi4yLlxuICAgICAgICBleHBvcnRzLnBhcnNlID0gZnVuY3Rpb24gKHNvdXJjZSwgY2FsbGJhY2spIHtcbiAgICAgICAgICB2YXIgcmVzdWx0LCB2YWx1ZTtcbiAgICAgICAgICBJbmRleCA9IDA7XG4gICAgICAgICAgU291cmNlID0gXCJcIiArIHNvdXJjZTtcbiAgICAgICAgICByZXN1bHQgPSBnZXQobGV4KCkpO1xuICAgICAgICAgIC8vIElmIGEgSlNPTiBzdHJpbmcgY29udGFpbnMgbXVsdGlwbGUgdG9rZW5zLCBpdCBpcyBpbnZhbGlkLlxuICAgICAgICAgIGlmIChsZXgoKSAhPSBcIiRcIikge1xuICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gUmVzZXQgdGhlIHBhcnNlciBzdGF0ZS5cbiAgICAgICAgICBJbmRleCA9IFNvdXJjZSA9IG51bGw7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrICYmIGdldENsYXNzLmNhbGwoY2FsbGJhY2spID09IGZ1bmN0aW9uQ2xhc3MgPyB3YWxrKCh2YWx1ZSA9IHt9LCB2YWx1ZVtcIlwiXSA9IHJlc3VsdCwgdmFsdWUpLCBcIlwiLCBjYWxsYmFjaykgOiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0cy5ydW5JbkNvbnRleHQgPSBydW5JbkNvbnRleHQ7XG4gICAgcmV0dXJuIGV4cG9ydHM7XG4gIH1cblxuICBpZiAoZnJlZUV4cG9ydHMgJiYgIWlzTG9hZGVyKSB7XG4gICAgLy8gRXhwb3J0IGZvciBDb21tb25KUyBlbnZpcm9ubWVudHMuXG4gICAgcnVuSW5Db250ZXh0KHJvb3QsIGZyZWVFeHBvcnRzKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBFeHBvcnQgZm9yIHdlYiBicm93c2VycyBhbmQgSmF2YVNjcmlwdCBlbmdpbmVzLlxuICAgIHZhciBuYXRpdmVKU09OID0gcm9vdC5KU09OLFxuICAgICAgICBwcmV2aW91c0pTT04gPSByb290LkpTT04zLFxuICAgICAgICBpc1Jlc3RvcmVkID0gZmFsc2U7XG5cbiAgICB2YXIgSlNPTjMgPSBydW5JbkNvbnRleHQocm9vdCwgKHJvb3QuSlNPTjMgPSB7XG4gICAgICAvLyBQdWJsaWM6IFJlc3RvcmVzIHRoZSBvcmlnaW5hbCB2YWx1ZSBvZiB0aGUgZ2xvYmFsIGBKU09OYCBvYmplY3QgYW5kXG4gICAgICAvLyByZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSBgSlNPTjNgIG9iamVjdC5cbiAgICAgIFwibm9Db25mbGljdFwiOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghaXNSZXN0b3JlZCkge1xuICAgICAgICAgIGlzUmVzdG9yZWQgPSB0cnVlO1xuICAgICAgICAgIHJvb3QuSlNPTiA9IG5hdGl2ZUpTT047XG4gICAgICAgICAgcm9vdC5KU09OMyA9IHByZXZpb3VzSlNPTjtcbiAgICAgICAgICBuYXRpdmVKU09OID0gcHJldmlvdXNKU09OID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gSlNPTjM7XG4gICAgICB9XG4gICAgfSkpO1xuXG4gICAgcm9vdC5KU09OID0ge1xuICAgICAgXCJwYXJzZVwiOiBKU09OMy5wYXJzZSxcbiAgICAgIFwic3RyaW5naWZ5XCI6IEpTT04zLnN0cmluZ2lmeVxuICAgIH07XG4gIH1cblxuICAvLyBFeHBvcnQgZm9yIGFzeW5jaHJvbm91cyBtb2R1bGUgbG9hZGVycy5cbiAgaWYgKGlzTG9hZGVyKSB7XG4gICAgZGVmaW5lKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBKU09OMztcbiAgICB9KTtcbiAgfVxufSkuY2FsbCh0aGlzKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMyBTbGVlcGxlc3MgU29mdHdhcmUgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0b1xuZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbnJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG5GUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTXG5JTiBUSEUgU09GVFdBUkUuIFxuKi9cblxuLy8geWVzLCBJIGtub3cgdGhpcyBzZWVtcyBzdHVwaWQsIGJ1dCBJIGhhdmUgbXkgcmVhc29ucy5cblxudmFyIG5ldCA9IHJlcXVpcmUoXCJuZXRcIilcbmZvcihrIGluIG5ldClcblx0Z2xvYmFsW2tdID0gbmV0W2tdXG5cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlcbiAgLCB1bmRlZjtcblxuLyoqXG4gKiBEZWNvZGUgYSBVUkkgZW5jb2RlZCBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBVUkkgZW5jb2RlZCBzdHJpbmcuXG4gKiBAcmV0dXJucyB7U3RyaW5nfE51bGx9IFRoZSBkZWNvZGVkIHN0cmluZy5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBkZWNvZGUoaW5wdXQpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGlucHV0LnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8qKlxuICogQXR0ZW1wdHMgdG8gZW5jb2RlIGEgZ2l2ZW4gaW5wdXQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBzdHJpbmcgdGhhdCBuZWVkcyB0byBiZSBlbmNvZGVkLlxuICogQHJldHVybnMge1N0cmluZ3xOdWxsfSBUaGUgZW5jb2RlZCBzdHJpbmcuXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZW5jb2RlKGlucHV0KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChpbnB1dCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG4vKipcbiAqIFNpbXBsZSBxdWVyeSBzdHJpbmcgcGFyc2VyLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBxdWVyeSBUaGUgcXVlcnkgc3RyaW5nIHRoYXQgbmVlZHMgdG8gYmUgcGFyc2VkLlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIHF1ZXJ5c3RyaW5nKHF1ZXJ5KSB7XG4gIHZhciBwYXJzZXIgPSAvKFtePT8jJl0rKT0/KFteJl0qKS9nXG4gICAgLCByZXN1bHQgPSB7fVxuICAgICwgcGFydDtcblxuICB3aGlsZSAocGFydCA9IHBhcnNlci5leGVjKHF1ZXJ5KSkge1xuICAgIHZhciBrZXkgPSBkZWNvZGUocGFydFsxXSlcbiAgICAgICwgdmFsdWUgPSBkZWNvZGUocGFydFsyXSk7XG5cbiAgICAvL1xuICAgIC8vIFByZXZlbnQgb3ZlcnJpZGluZyBvZiBleGlzdGluZyBwcm9wZXJ0aWVzLiBUaGlzIGVuc3VyZXMgdGhhdCBidWlsZC1pblxuICAgIC8vIG1ldGhvZHMgbGlrZSBgdG9TdHJpbmdgIG9yIF9fcHJvdG9fXyBhcmUgbm90IG92ZXJyaWRlbiBieSBtYWxpY2lvdXNcbiAgICAvLyBxdWVyeXN0cmluZ3MuXG4gICAgLy9cbiAgICAvLyBJbiB0aGUgY2FzZSBpZiBmYWlsZWQgZGVjb2RpbmcsIHdlIHdhbnQgdG8gb21pdCB0aGUga2V5L3ZhbHVlIHBhaXJzXG4gICAgLy8gZnJvbSB0aGUgcmVzdWx0LlxuICAgIC8vXG4gICAgaWYgKGtleSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gbnVsbCB8fCBrZXkgaW4gcmVzdWx0KSBjb250aW51ZTtcbiAgICByZXN1bHRba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUcmFuc2Zvcm0gYSBxdWVyeSBzdHJpbmcgdG8gYW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogT2JqZWN0IHRoYXQgc2hvdWxkIGJlIHRyYW5zZm9ybWVkLlxuICogQHBhcmFtIHtTdHJpbmd9IHByZWZpeCBPcHRpb25hbCBwcmVmaXguXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gcXVlcnlzdHJpbmdpZnkob2JqLCBwcmVmaXgpIHtcbiAgcHJlZml4ID0gcHJlZml4IHx8ICcnO1xuXG4gIHZhciBwYWlycyA9IFtdXG4gICAgLCB2YWx1ZVxuICAgICwga2V5O1xuXG4gIC8vXG4gIC8vIE9wdGlvbmFsbHkgcHJlZml4IHdpdGggYSAnPycgaWYgbmVlZGVkXG4gIC8vXG4gIGlmICgnc3RyaW5nJyAhPT0gdHlwZW9mIHByZWZpeCkgcHJlZml4ID0gJz8nO1xuXG4gIGZvciAoa2V5IGluIG9iaikge1xuICAgIGlmIChoYXMuY2FsbChvYmosIGtleSkpIHtcbiAgICAgIHZhbHVlID0gb2JqW2tleV07XG5cbiAgICAgIC8vXG4gICAgICAvLyBFZGdlIGNhc2VzIHdoZXJlIHdlIGFjdHVhbGx5IHdhbnQgdG8gZW5jb2RlIHRoZSB2YWx1ZSB0byBhbiBlbXB0eVxuICAgICAgLy8gc3RyaW5nIGluc3RlYWQgb2YgdGhlIHN0cmluZ2lmaWVkIHZhbHVlLlxuICAgICAgLy9cbiAgICAgIGlmICghdmFsdWUgJiYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZiB8fCBpc05hTih2YWx1ZSkpKSB7XG4gICAgICAgIHZhbHVlID0gJyc7XG4gICAgICB9XG5cbiAgICAgIGtleSA9IGVuY29kZShrZXkpO1xuICAgICAgdmFsdWUgPSBlbmNvZGUodmFsdWUpO1xuXG4gICAgICAvL1xuICAgICAgLy8gSWYgd2UgZmFpbGVkIHRvIGVuY29kZSB0aGUgc3RyaW5ncywgd2Ugc2hvdWxkIGJhaWwgb3V0IGFzIHdlIGRvbid0XG4gICAgICAvLyB3YW50IHRvIGFkZCBpbnZhbGlkIHN0cmluZ3MgdG8gdGhlIHF1ZXJ5LlxuICAgICAgLy9cbiAgICAgIGlmIChrZXkgPT09IG51bGwgfHwgdmFsdWUgPT09IG51bGwpIGNvbnRpbnVlO1xuICAgICAgcGFpcnMucHVzaChrZXkgKyc9JysgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYWlycy5sZW5ndGggPyBwcmVmaXggKyBwYWlycy5qb2luKCcmJykgOiAnJztcbn1cblxuLy9cbi8vIEV4cG9zZSB0aGUgbW9kdWxlLlxuLy9cbmV4cG9ydHMuc3RyaW5naWZ5ID0gcXVlcnlzdHJpbmdpZnk7XG5leHBvcnRzLnBhcnNlID0gcXVlcnlzdHJpbmc7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ2hlY2sgaWYgd2UncmUgcmVxdWlyZWQgdG8gYWRkIGEgcG9ydCBudW1iZXIuXG4gKlxuICogQHNlZSBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RlZmF1bHQtcG9ydFxuICogQHBhcmFtIHtOdW1iZXJ8U3RyaW5nfSBwb3J0IFBvcnQgbnVtYmVyIHdlIG5lZWQgdG8gY2hlY2tcbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm90b2NvbCBQcm90b2NvbCB3ZSBuZWVkIHRvIGNoZWNrIGFnYWluc3QuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gSXMgaXQgYSBkZWZhdWx0IHBvcnQgZm9yIHRoZSBnaXZlbiBwcm90b2NvbFxuICogQGFwaSBwcml2YXRlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVxdWlyZWQocG9ydCwgcHJvdG9jb2wpIHtcbiAgcHJvdG9jb2wgPSBwcm90b2NvbC5zcGxpdCgnOicpWzBdO1xuICBwb3J0ID0gK3BvcnQ7XG5cbiAgaWYgKCFwb3J0KSByZXR1cm4gZmFsc2U7XG5cbiAgc3dpdGNoIChwcm90b2NvbCkge1xuICAgIGNhc2UgJ2h0dHAnOlxuICAgIGNhc2UgJ3dzJzpcbiAgICByZXR1cm4gcG9ydCAhPT0gODA7XG5cbiAgICBjYXNlICdodHRwcyc6XG4gICAgY2FzZSAnd3NzJzpcbiAgICByZXR1cm4gcG9ydCAhPT0gNDQzO1xuXG4gICAgY2FzZSAnZnRwJzpcbiAgICByZXR1cm4gcG9ydCAhPT0gMjE7XG5cbiAgICBjYXNlICdnb3BoZXInOlxuICAgIHJldHVybiBwb3J0ICE9PSA3MDtcblxuICAgIGNhc2UgJ2ZpbGUnOlxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBwb3J0ICE9PSAwO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRyYW5zcG9ydExpc3QgPSByZXF1aXJlKCcuL3RyYW5zcG9ydC1saXN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9tYWluJykodHJhbnNwb3J0TGlzdCk7XG5cbi8vIFRPRE8gY2FuJ3QgZ2V0IHJpZCBvZiB0aGlzIHVudGlsIGFsbCBzZXJ2ZXJzIGRvXG5pZiAoJ19zb2NranNfb25sb2FkJyBpbiBnbG9iYWwpIHtcbiAgc2V0VGltZW91dChnbG9iYWwuX3NvY2tqc19vbmxvYWQsIDEpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG4gICwgRXZlbnQgPSByZXF1aXJlKCcuL2V2ZW50JylcbiAgO1xuXG5mdW5jdGlvbiBDbG9zZUV2ZW50KCkge1xuICBFdmVudC5jYWxsKHRoaXMpO1xuICB0aGlzLmluaXRFdmVudCgnY2xvc2UnLCBmYWxzZSwgZmFsc2UpO1xuICB0aGlzLndhc0NsZWFuID0gZmFsc2U7XG4gIHRoaXMuY29kZSA9IDA7XG4gIHRoaXMucmVhc29uID0gJyc7XG59XG5cbmluaGVyaXRzKENsb3NlRXZlbnQsIEV2ZW50KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDbG9zZUV2ZW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG4gICwgRXZlbnRUYXJnZXQgPSByZXF1aXJlKCcuL2V2ZW50dGFyZ2V0JylcbiAgO1xuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50VGFyZ2V0LmNhbGwodGhpcyk7XG59XG5cbmluaGVyaXRzKEV2ZW50RW1pdHRlciwgRXZlbnRUYXJnZXQpO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgaWYgKHR5cGUpIHtcbiAgICBkZWxldGUgdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX2xpc3RlbmVycyA9IHt9O1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgICAsIGZpcmVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZygpIHtcbiAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGcpO1xuXG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICB0aGlzLm9uKHR5cGUsIGcpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0eXBlID0gYXJndW1lbnRzWzBdO1xuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuICBpZiAoIWxpc3RlbmVycykge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBlcXVpdmFsZW50IG9mIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gIHZhciBsID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkobCAtIDEpO1xuICBmb3IgKHZhciBhaSA9IDE7IGFpIDwgbDsgYWkrKykge1xuICAgIGFyZ3NbYWkgLSAxXSA9IGFyZ3VtZW50c1thaV07XG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gRXZlbnRUYXJnZXQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXI7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gRXZlbnRUYXJnZXQucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXI7XG5cbm1vZHVsZS5leHBvcnRzLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gRXZlbnQoZXZlbnRUeXBlKSB7XG4gIHRoaXMudHlwZSA9IGV2ZW50VHlwZTtcbn1cblxuRXZlbnQucHJvdG90eXBlLmluaXRFdmVudCA9IGZ1bmN0aW9uKGV2ZW50VHlwZSwgY2FuQnViYmxlLCBjYW5jZWxhYmxlKSB7XG4gIHRoaXMudHlwZSA9IGV2ZW50VHlwZTtcbiAgdGhpcy5idWJibGVzID0gY2FuQnViYmxlO1xuICB0aGlzLmNhbmNlbGFibGUgPSBjYW5jZWxhYmxlO1xuICB0aGlzLnRpbWVTdGFtcCA9ICtuZXcgRGF0ZSgpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50LnByb3RvdHlwZS5zdG9wUHJvcGFnYXRpb24gPSBmdW5jdGlvbigpIHt9O1xuRXZlbnQucHJvdG90eXBlLnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24oKSB7fTtcblxuRXZlbnQuQ0FQVFVSSU5HX1BIQVNFID0gMTtcbkV2ZW50LkFUX1RBUkdFVCA9IDI7XG5FdmVudC5CVUJCTElOR19QSEFTRSA9IDM7XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qIFNpbXBsaWZpZWQgaW1wbGVtZW50YXRpb24gb2YgRE9NMiBFdmVudFRhcmdldC5cbiAqICAgaHR0cDovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTItRXZlbnRzL2V2ZW50cy5odG1sI0V2ZW50cy1FdmVudFRhcmdldFxuICovXG5cbmZ1bmN0aW9uIEV2ZW50VGFyZ2V0KCkge1xuICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcbn1cblxuRXZlbnRUYXJnZXQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudFR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICghKGV2ZW50VHlwZSBpbiB0aGlzLl9saXN0ZW5lcnMpKSB7XG4gICAgdGhpcy5fbGlzdGVuZXJzW2V2ZW50VHlwZV0gPSBbXTtcbiAgfVxuICB2YXIgYXJyID0gdGhpcy5fbGlzdGVuZXJzW2V2ZW50VHlwZV07XG4gIC8vICM0XG4gIGlmIChhcnIuaW5kZXhPZihsaXN0ZW5lcikgPT09IC0xKSB7XG4gICAgLy8gTWFrZSBhIGNvcHkgc28gYXMgbm90IHRvIGludGVyZmVyZSB3aXRoIGEgY3VycmVudCBkaXNwYXRjaEV2ZW50LlxuICAgIGFyciA9IGFyci5jb25jYXQoW2xpc3RlbmVyXSk7XG4gIH1cbiAgdGhpcy5fbGlzdGVuZXJzW2V2ZW50VHlwZV0gPSBhcnI7XG59O1xuXG5FdmVudFRhcmdldC5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50VHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGFyciA9IHRoaXMuX2xpc3RlbmVyc1tldmVudFR5cGVdO1xuICBpZiAoIWFycikge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgaWR4ID0gYXJyLmluZGV4T2YobGlzdGVuZXIpO1xuICBpZiAoaWR4ICE9PSAtMSkge1xuICAgIGlmIChhcnIubGVuZ3RoID4gMSkge1xuICAgICAgLy8gTWFrZSBhIGNvcHkgc28gYXMgbm90IHRvIGludGVyZmVyZSB3aXRoIGEgY3VycmVudCBkaXNwYXRjaEV2ZW50LlxuICAgICAgdGhpcy5fbGlzdGVuZXJzW2V2ZW50VHlwZV0gPSBhcnIuc2xpY2UoMCwgaWR4KS5jb25jYXQoYXJyLnNsaWNlKGlkeCArIDEpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHRoaXMuX2xpc3RlbmVyc1tldmVudFR5cGVdO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbn07XG5cbkV2ZW50VGFyZ2V0LnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBldmVudCA9IGFyZ3VtZW50c1swXTtcbiAgdmFyIHQgPSBldmVudC50eXBlO1xuICAvLyBlcXVpdmFsZW50IG9mIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gIHZhciBhcmdzID0gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IFtldmVudF0gOiBBcnJheS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAvLyBUT0RPOiBUaGlzIGRvZXNuJ3QgbWF0Y2ggdGhlIHJlYWwgYmVoYXZpb3I7IHBlciBzcGVjLCBvbmZvbyBnZXRcbiAgLy8gdGhlaXIgcGxhY2UgaW4gbGluZSBmcm9tIHRoZSAvZmlyc3QvIHRpbWUgdGhleSdyZSBzZXQgZnJvbVxuICAvLyBub24tbnVsbC4gQWx0aG91Z2ggV2ViS2l0IGJ1bXBzIGl0IHRvIHRoZSBlbmQgZXZlcnkgdGltZSBpdCdzXG4gIC8vIHNldC5cbiAgaWYgKHRoaXNbJ29uJyArIHRdKSB7XG4gICAgdGhpc1snb24nICsgdF0uYXBwbHkodGhpcywgYXJncyk7XG4gIH1cbiAgaWYgKHQgaW4gdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgLy8gR3JhYiBhIHJlZmVyZW5jZSB0byB0aGUgbGlzdGVuZXJzIGxpc3QuIHJlbW92ZUV2ZW50TGlzdGVuZXIgbWF5IGFsdGVyIHRoZSBsaXN0LlxuICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnNbdF07XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRUYXJnZXQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJylcbiAgLCBFdmVudCA9IHJlcXVpcmUoJy4vZXZlbnQnKVxuICA7XG5cbmZ1bmN0aW9uIFRyYW5zcG9ydE1lc3NhZ2VFdmVudChkYXRhKSB7XG4gIEV2ZW50LmNhbGwodGhpcyk7XG4gIHRoaXMuaW5pdEV2ZW50KCdtZXNzYWdlJywgZmFsc2UsIGZhbHNlKTtcbiAgdGhpcy5kYXRhID0gZGF0YTtcbn1cblxuaW5oZXJpdHMoVHJhbnNwb3J0TWVzc2FnZUV2ZW50LCBFdmVudCk7XG5cbm1vZHVsZS5leHBvcnRzID0gVHJhbnNwb3J0TWVzc2FnZUV2ZW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgSlNPTjMgPSByZXF1aXJlKCdqc29uMycpXG4gICwgaWZyYW1lVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzL2lmcmFtZScpXG4gIDtcblxuZnVuY3Rpb24gRmFjYWRlSlModHJhbnNwb3J0KSB7XG4gIHRoaXMuX3RyYW5zcG9ydCA9IHRyYW5zcG9ydDtcbiAgdHJhbnNwb3J0Lm9uKCdtZXNzYWdlJywgdGhpcy5fdHJhbnNwb3J0TWVzc2FnZS5iaW5kKHRoaXMpKTtcbiAgdHJhbnNwb3J0Lm9uKCdjbG9zZScsIHRoaXMuX3RyYW5zcG9ydENsb3NlLmJpbmQodGhpcykpO1xufVxuXG5GYWNhZGVKUy5wcm90b3R5cGUuX3RyYW5zcG9ydENsb3NlID0gZnVuY3Rpb24oY29kZSwgcmVhc29uKSB7XG4gIGlmcmFtZVV0aWxzLnBvc3RNZXNzYWdlKCdjJywgSlNPTjMuc3RyaW5naWZ5KFtjb2RlLCByZWFzb25dKSk7XG59O1xuRmFjYWRlSlMucHJvdG90eXBlLl90cmFuc3BvcnRNZXNzYWdlID0gZnVuY3Rpb24oZnJhbWUpIHtcbiAgaWZyYW1lVXRpbHMucG9zdE1lc3NhZ2UoJ3QnLCBmcmFtZSk7XG59O1xuRmFjYWRlSlMucHJvdG90eXBlLl9zZW5kID0gZnVuY3Rpb24oZGF0YSkge1xuICB0aGlzLl90cmFuc3BvcnQuc2VuZChkYXRhKTtcbn07XG5GYWNhZGVKUy5wcm90b3R5cGUuX2Nsb3NlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX3RyYW5zcG9ydC5jbG9zZSgpO1xuICB0aGlzLl90cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZhY2FkZUpTO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXJsVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzL3VybCcpXG4gICwgZXZlbnRVdGlscyA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnQnKVxuICAsIEpTT04zID0gcmVxdWlyZSgnanNvbjMnKVxuICAsIEZhY2FkZUpTID0gcmVxdWlyZSgnLi9mYWNhZGUnKVxuICAsIEluZm9JZnJhbWVSZWNlaXZlciA9IHJlcXVpcmUoJy4vaW5mby1pZnJhbWUtcmVjZWl2ZXInKVxuICAsIGlmcmFtZVV0aWxzID0gcmVxdWlyZSgnLi91dGlscy9pZnJhbWUnKVxuICAsIGxvYyA9IHJlcXVpcmUoJy4vbG9jYXRpb24nKVxuICA7XG5cbnZhciBkZWJ1ZyA9IGZ1bmN0aW9uKCkge307XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tqcy1jbGllbnQ6aWZyYW1lLWJvb3RzdHJhcCcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFNvY2tKUywgYXZhaWxhYmxlVHJhbnNwb3J0cykge1xuICB2YXIgdHJhbnNwb3J0TWFwID0ge307XG4gIGF2YWlsYWJsZVRyYW5zcG9ydHMuZm9yRWFjaChmdW5jdGlvbihhdCkge1xuICAgIGlmIChhdC5mYWNhZGVUcmFuc3BvcnQpIHtcbiAgICAgIHRyYW5zcG9ydE1hcFthdC5mYWNhZGVUcmFuc3BvcnQudHJhbnNwb3J0TmFtZV0gPSBhdC5mYWNhZGVUcmFuc3BvcnQ7XG4gICAgfVxuICB9KTtcblxuICAvLyBoYXJkLWNvZGVkIGZvciB0aGUgaW5mbyBpZnJhbWVcbiAgLy8gVE9ETyBzZWUgaWYgd2UgY2FuIG1ha2UgdGhpcyBtb3JlIGR5bmFtaWNcbiAgdHJhbnNwb3J0TWFwW0luZm9JZnJhbWVSZWNlaXZlci50cmFuc3BvcnROYW1lXSA9IEluZm9JZnJhbWVSZWNlaXZlcjtcbiAgdmFyIHBhcmVudE9yaWdpbjtcblxuICAvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbiAgU29ja0pTLmJvb3RzdHJhcF9pZnJhbWUgPSBmdW5jdGlvbigpIHtcbiAgICAvKiBlc2xpbnQtZW5hYmxlIGNhbWVsY2FzZSAqL1xuICAgIHZhciBmYWNhZGU7XG4gICAgaWZyYW1lVXRpbHMuY3VycmVudFdpbmRvd0lkID0gbG9jLmhhc2guc2xpY2UoMSk7XG4gICAgdmFyIG9uTWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChlLnNvdXJjZSAhPT0gcGFyZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgcGFyZW50T3JpZ2luID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBwYXJlbnRPcmlnaW4gPSBlLm9yaWdpbjtcbiAgICAgIH1cbiAgICAgIGlmIChlLm9yaWdpbiAhPT0gcGFyZW50T3JpZ2luKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGlmcmFtZU1lc3NhZ2U7XG4gICAgICB0cnkge1xuICAgICAgICBpZnJhbWVNZXNzYWdlID0gSlNPTjMucGFyc2UoZS5kYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGlnbm9yZWQpIHtcbiAgICAgICAgZGVidWcoJ2JhZCBqc29uJywgZS5kYXRhKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoaWZyYW1lTWVzc2FnZS53aW5kb3dJZCAhPT0gaWZyYW1lVXRpbHMuY3VycmVudFdpbmRvd0lkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHN3aXRjaCAoaWZyYW1lTWVzc2FnZS50eXBlKSB7XG4gICAgICBjYXNlICdzJzpcbiAgICAgICAgdmFyIHA7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcCA9IEpTT04zLnBhcnNlKGlmcmFtZU1lc3NhZ2UuZGF0YSk7XG4gICAgICAgIH0gY2F0Y2ggKGlnbm9yZWQpIHtcbiAgICAgICAgICBkZWJ1ZygnYmFkIGpzb24nLCBpZnJhbWVNZXNzYWdlLmRhdGEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHZhciB2ZXJzaW9uID0gcFswXTtcbiAgICAgICAgdmFyIHRyYW5zcG9ydCA9IHBbMV07XG4gICAgICAgIHZhciB0cmFuc1VybCA9IHBbMl07XG4gICAgICAgIHZhciBiYXNlVXJsID0gcFszXTtcbiAgICAgICAgZGVidWcodmVyc2lvbiwgdHJhbnNwb3J0LCB0cmFuc1VybCwgYmFzZVVybCk7XG4gICAgICAgIC8vIGNoYW5nZSB0aGlzIHRvIHNlbXZlciBsb2dpY1xuICAgICAgICBpZiAodmVyc2lvbiAhPT0gU29ja0pTLnZlcnNpb24pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luY29tcGF0aWJsZSBTb2NrSlMhIE1haW4gc2l0ZSB1c2VzOicgK1xuICAgICAgICAgICAgICAgICAgICAnIFwiJyArIHZlcnNpb24gKyAnXCIsIHRoZSBpZnJhbWU6JyArXG4gICAgICAgICAgICAgICAgICAgICcgXCInICsgU29ja0pTLnZlcnNpb24gKyAnXCIuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXVybFV0aWxzLmlzT3JpZ2luRXF1YWwodHJhbnNVcmwsIGxvYy5ocmVmKSB8fFxuICAgICAgICAgICAgIXVybFV0aWxzLmlzT3JpZ2luRXF1YWwoYmFzZVVybCwgbG9jLmhyZWYpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5cXCd0IGNvbm5lY3QgdG8gZGlmZmVyZW50IGRvbWFpbiBmcm9tIHdpdGhpbiBhbiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2lmcmFtZS4gKCcgKyBsb2MuaHJlZiArICcsICcgKyB0cmFuc1VybCArICcsICcgKyBiYXNlVXJsICsgJyknKTtcbiAgICAgICAgfVxuICAgICAgICBmYWNhZGUgPSBuZXcgRmFjYWRlSlMobmV3IHRyYW5zcG9ydE1hcFt0cmFuc3BvcnRdKHRyYW5zVXJsLCBiYXNlVXJsKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbSc6XG4gICAgICAgIGZhY2FkZS5fc2VuZChpZnJhbWVNZXNzYWdlLmRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2MnOlxuICAgICAgICBpZiAoZmFjYWRlKSB7XG4gICAgICAgICAgZmFjYWRlLl9jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIGZhY2FkZSA9IG51bGw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBldmVudFV0aWxzLmF0dGFjaEV2ZW50KCdtZXNzYWdlJywgb25NZXNzYWdlKTtcblxuICAgIC8vIFN0YXJ0XG4gICAgaWZyYW1lVXRpbHMucG9zdE1lc3NhZ2UoJ3MnKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXJcbiAgLCBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJylcbiAgLCBKU09OMyA9IHJlcXVpcmUoJ2pzb24zJylcbiAgLCBvYmplY3RVdGlscyA9IHJlcXVpcmUoJy4vdXRpbHMvb2JqZWN0JylcbiAgO1xuXG52YXIgZGVidWcgPSBmdW5jdGlvbigpIHt9O1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NranMtY2xpZW50OmluZm8tYWpheCcpO1xufVxuXG5mdW5jdGlvbiBJbmZvQWpheCh1cmwsIEFqYXhPYmplY3QpIHtcbiAgRXZlbnRFbWl0dGVyLmNhbGwodGhpcyk7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgdDAgPSArbmV3IERhdGUoKTtcbiAgdGhpcy54byA9IG5ldyBBamF4T2JqZWN0KCdHRVQnLCB1cmwpO1xuXG4gIHRoaXMueG8ub25jZSgnZmluaXNoJywgZnVuY3Rpb24oc3RhdHVzLCB0ZXh0KSB7XG4gICAgdmFyIGluZm8sIHJ0dDtcbiAgICBpZiAoc3RhdHVzID09PSAyMDApIHtcbiAgICAgIHJ0dCA9ICgrbmV3IERhdGUoKSkgLSB0MDtcbiAgICAgIGlmICh0ZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaW5mbyA9IEpTT04zLnBhcnNlKHRleHQpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgZGVidWcoJ2JhZCBqc29uJywgdGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFvYmplY3RVdGlscy5pc09iamVjdChpbmZvKSkge1xuICAgICAgICBpbmZvID0ge307XG4gICAgICB9XG4gICAgfVxuICAgIHNlbGYuZW1pdCgnZmluaXNoJywgaW5mbywgcnR0KTtcbiAgICBzZWxmLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICB9KTtcbn1cblxuaW5oZXJpdHMoSW5mb0FqYXgsIEV2ZW50RW1pdHRlcik7XG5cbkluZm9BamF4LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICB0aGlzLnhvLmNsb3NlKCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEluZm9BamF4O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG4gICwgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyXG4gICwgSlNPTjMgPSByZXF1aXJlKCdqc29uMycpXG4gICwgWEhSTG9jYWxPYmplY3QgPSByZXF1aXJlKCcuL3RyYW5zcG9ydC9zZW5kZXIveGhyLWxvY2FsJylcbiAgLCBJbmZvQWpheCA9IHJlcXVpcmUoJy4vaW5mby1hamF4JylcbiAgO1xuXG5mdW5jdGlvbiBJbmZvUmVjZWl2ZXJJZnJhbWUodHJhbnNVcmwpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcblxuICB0aGlzLmlyID0gbmV3IEluZm9BamF4KHRyYW5zVXJsLCBYSFJMb2NhbE9iamVjdCk7XG4gIHRoaXMuaXIub25jZSgnZmluaXNoJywgZnVuY3Rpb24oaW5mbywgcnR0KSB7XG4gICAgc2VsZi5pciA9IG51bGw7XG4gICAgc2VsZi5lbWl0KCdtZXNzYWdlJywgSlNPTjMuc3RyaW5naWZ5KFtpbmZvLCBydHRdKSk7XG4gIH0pO1xufVxuXG5pbmhlcml0cyhJbmZvUmVjZWl2ZXJJZnJhbWUsIEV2ZW50RW1pdHRlcik7XG5cbkluZm9SZWNlaXZlcklmcmFtZS50cmFuc3BvcnROYW1lID0gJ2lmcmFtZS1pbmZvLXJlY2VpdmVyJztcblxuSW5mb1JlY2VpdmVySWZyYW1lLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5pcikge1xuICAgIHRoaXMuaXIuY2xvc2UoKTtcbiAgICB0aGlzLmlyID0gbnVsbDtcbiAgfVxuICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbmZvUmVjZWl2ZXJJZnJhbWU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXJcbiAgLCBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJylcbiAgLCBKU09OMyA9IHJlcXVpcmUoJ2pzb24zJylcbiAgLCB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnQnKVxuICAsIElmcmFtZVRyYW5zcG9ydCA9IHJlcXVpcmUoJy4vdHJhbnNwb3J0L2lmcmFtZScpXG4gICwgSW5mb1JlY2VpdmVySWZyYW1lID0gcmVxdWlyZSgnLi9pbmZvLWlmcmFtZS1yZWNlaXZlcicpXG4gIDtcblxudmFyIGRlYnVnID0gZnVuY3Rpb24oKSB7fTtcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2pzLWNsaWVudDppbmZvLWlmcmFtZScpO1xufVxuXG5mdW5jdGlvbiBJbmZvSWZyYW1lKGJhc2VVcmwsIHVybCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIEV2ZW50RW1pdHRlci5jYWxsKHRoaXMpO1xuXG4gIHZhciBnbyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpZnIgPSBzZWxmLmlmciA9IG5ldyBJZnJhbWVUcmFuc3BvcnQoSW5mb1JlY2VpdmVySWZyYW1lLnRyYW5zcG9ydE5hbWUsIHVybCwgYmFzZVVybCk7XG5cbiAgICBpZnIub25jZSgnbWVzc2FnZScsIGZ1bmN0aW9uKG1zZykge1xuICAgICAgaWYgKG1zZykge1xuICAgICAgICB2YXIgZDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkID0gSlNPTjMucGFyc2UobXNnKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGRlYnVnKCdiYWQganNvbicsIG1zZyk7XG4gICAgICAgICAgc2VsZi5lbWl0KCdmaW5pc2gnKTtcbiAgICAgICAgICBzZWxmLmNsb3NlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGluZm8gPSBkWzBdLCBydHQgPSBkWzFdO1xuICAgICAgICBzZWxmLmVtaXQoJ2ZpbmlzaCcsIGluZm8sIHJ0dCk7XG4gICAgICB9XG4gICAgICBzZWxmLmNsb3NlKCk7XG4gICAgfSk7XG5cbiAgICBpZnIub25jZSgnY2xvc2UnLCBmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYuZW1pdCgnZmluaXNoJyk7XG4gICAgICBzZWxmLmNsb3NlKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gVE9ETyB0aGlzIHNlZW1zIHRoZSBzYW1lIGFzIHRoZSAnbmVlZEJvZHknIGZyb20gdHJhbnNwb3J0c1xuICBpZiAoIWdsb2JhbC5kb2N1bWVudC5ib2R5KSB7XG4gICAgdXRpbHMuYXR0YWNoRXZlbnQoJ2xvYWQnLCBnbyk7XG4gIH0gZWxzZSB7XG4gICAgZ28oKTtcbiAgfVxufVxuXG5pbmhlcml0cyhJbmZvSWZyYW1lLCBFdmVudEVtaXR0ZXIpO1xuXG5JbmZvSWZyYW1lLmVuYWJsZWQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIElmcmFtZVRyYW5zcG9ydC5lbmFibGVkKCk7XG59O1xuXG5JbmZvSWZyYW1lLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5pZnIpIHtcbiAgICB0aGlzLmlmci5jbG9zZSgpO1xuICB9XG4gIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gIHRoaXMuaWZyID0gbnVsbDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW5mb0lmcmFtZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlclxuICAsIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKVxuICAsIHVybFV0aWxzID0gcmVxdWlyZSgnLi91dGlscy91cmwnKVxuICAsIFhEUiA9IHJlcXVpcmUoJy4vdHJhbnNwb3J0L3NlbmRlci94ZHInKVxuICAsIFhIUkNvcnMgPSByZXF1aXJlKCcuL3RyYW5zcG9ydC9zZW5kZXIveGhyLWNvcnMnKVxuICAsIFhIUkxvY2FsID0gcmVxdWlyZSgnLi90cmFuc3BvcnQvc2VuZGVyL3hoci1sb2NhbCcpXG4gICwgWEhSRmFrZSA9IHJlcXVpcmUoJy4vdHJhbnNwb3J0L3NlbmRlci94aHItZmFrZScpXG4gICwgSW5mb0lmcmFtZSA9IHJlcXVpcmUoJy4vaW5mby1pZnJhbWUnKVxuICAsIEluZm9BamF4ID0gcmVxdWlyZSgnLi9pbmZvLWFqYXgnKVxuICA7XG5cbnZhciBkZWJ1ZyA9IGZ1bmN0aW9uKCkge307XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tqcy1jbGllbnQ6aW5mby1yZWNlaXZlcicpO1xufVxuXG5mdW5jdGlvbiBJbmZvUmVjZWl2ZXIoYmFzZVVybCwgdXJsSW5mbykge1xuICBkZWJ1ZyhiYXNlVXJsKTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIHNlbGYuZG9YaHIoYmFzZVVybCwgdXJsSW5mbyk7XG4gIH0sIDApO1xufVxuXG5pbmhlcml0cyhJbmZvUmVjZWl2ZXIsIEV2ZW50RW1pdHRlcik7XG5cbi8vIFRPRE8gdGhpcyBpcyBjdXJyZW50bHkgaWdub3JpbmcgdGhlIGxpc3Qgb2YgYXZhaWxhYmxlIHRyYW5zcG9ydHMgYW5kIHRoZSB3aGl0ZWxpc3RcblxuSW5mb1JlY2VpdmVyLl9nZXRSZWNlaXZlciA9IGZ1bmN0aW9uKGJhc2VVcmwsIHVybCwgdXJsSW5mbykge1xuICAvLyBkZXRlcm1pbmUgbWV0aG9kIG9mIENPUlMgc3VwcG9ydCAoaWYgbmVlZGVkKVxuICBpZiAodXJsSW5mby5zYW1lT3JpZ2luKSB7XG4gICAgcmV0dXJuIG5ldyBJbmZvQWpheCh1cmwsIFhIUkxvY2FsKTtcbiAgfVxuICBpZiAoWEhSQ29ycy5lbmFibGVkKSB7XG4gICAgcmV0dXJuIG5ldyBJbmZvQWpheCh1cmwsIFhIUkNvcnMpO1xuICB9XG4gIGlmIChYRFIuZW5hYmxlZCAmJiB1cmxJbmZvLnNhbWVTY2hlbWUpIHtcbiAgICByZXR1cm4gbmV3IEluZm9BamF4KHVybCwgWERSKTtcbiAgfVxuICBpZiAoSW5mb0lmcmFtZS5lbmFibGVkKCkpIHtcbiAgICByZXR1cm4gbmV3IEluZm9JZnJhbWUoYmFzZVVybCwgdXJsKTtcbiAgfVxuICByZXR1cm4gbmV3IEluZm9BamF4KHVybCwgWEhSRmFrZSk7XG59O1xuXG5JbmZvUmVjZWl2ZXIucHJvdG90eXBlLmRvWGhyID0gZnVuY3Rpb24oYmFzZVVybCwgdXJsSW5mbykge1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgICAsIHVybCA9IHVybFV0aWxzLmFkZFBhdGgoYmFzZVVybCwgJy9pbmZvJylcbiAgICA7XG4gIGRlYnVnKCdkb1hocicsIHVybCk7XG5cbiAgdGhpcy54byA9IEluZm9SZWNlaXZlci5fZ2V0UmVjZWl2ZXIoYmFzZVVybCwgdXJsLCB1cmxJbmZvKTtcblxuICB0aGlzLnRpbWVvdXRSZWYgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIGRlYnVnKCd0aW1lb3V0Jyk7XG4gICAgc2VsZi5fY2xlYW51cChmYWxzZSk7XG4gICAgc2VsZi5lbWl0KCdmaW5pc2gnKTtcbiAgfSwgSW5mb1JlY2VpdmVyLnRpbWVvdXQpO1xuXG4gIHRoaXMueG8ub25jZSgnZmluaXNoJywgZnVuY3Rpb24oaW5mbywgcnR0KSB7XG4gICAgZGVidWcoJ2ZpbmlzaCcsIGluZm8sIHJ0dCk7XG4gICAgc2VsZi5fY2xlYW51cCh0cnVlKTtcbiAgICBzZWxmLmVtaXQoJ2ZpbmlzaCcsIGluZm8sIHJ0dCk7XG4gIH0pO1xufTtcblxuSW5mb1JlY2VpdmVyLnByb3RvdHlwZS5fY2xlYW51cCA9IGZ1bmN0aW9uKHdhc0NsZWFuKSB7XG4gIGRlYnVnKCdfY2xlYW51cCcpO1xuICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0UmVmKTtcbiAgdGhpcy50aW1lb3V0UmVmID0gbnVsbDtcbiAgaWYgKCF3YXNDbGVhbiAmJiB0aGlzLnhvKSB7XG4gICAgdGhpcy54by5jbG9zZSgpO1xuICB9XG4gIHRoaXMueG8gPSBudWxsO1xufTtcblxuSW5mb1JlY2VpdmVyLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICBkZWJ1ZygnY2xvc2UnKTtcbiAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgdGhpcy5fY2xlYW51cChmYWxzZSk7XG59O1xuXG5JbmZvUmVjZWl2ZXIudGltZW91dCA9IDgwMDA7XG5cbm1vZHVsZS5leHBvcnRzID0gSW5mb1JlY2VpdmVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdsb2JhbC5sb2NhdGlvbiB8fCB7XG4gIG9yaWdpbjogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAnXG4sIHByb3RvY29sOiAnaHR0cDonXG4sIGhvc3Q6ICdsb2NhbGhvc3QnXG4sIHBvcnQ6IDgwXG4sIGhyZWY6ICdodHRwOi8vbG9jYWxob3N0LydcbiwgaGFzaDogJydcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnJlcXVpcmUoJy4vc2hpbXMnKTtcblxudmFyIFVSTCA9IHJlcXVpcmUoJ3VybC1wYXJzZScpXG4gICwgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG4gICwgSlNPTjMgPSByZXF1aXJlKCdqc29uMycpXG4gICwgcmFuZG9tID0gcmVxdWlyZSgnLi91dGlscy9yYW5kb20nKVxuICAsIGVzY2FwZSA9IHJlcXVpcmUoJy4vdXRpbHMvZXNjYXBlJylcbiAgLCB1cmxVdGlscyA9IHJlcXVpcmUoJy4vdXRpbHMvdXJsJylcbiAgLCBldmVudFV0aWxzID0gcmVxdWlyZSgnLi91dGlscy9ldmVudCcpXG4gICwgdHJhbnNwb3J0ID0gcmVxdWlyZSgnLi91dGlscy90cmFuc3BvcnQnKVxuICAsIG9iamVjdFV0aWxzID0gcmVxdWlyZSgnLi91dGlscy9vYmplY3QnKVxuICAsIGJyb3dzZXIgPSByZXF1aXJlKCcuL3V0aWxzL2Jyb3dzZXInKVxuICAsIGxvZyA9IHJlcXVpcmUoJy4vdXRpbHMvbG9nJylcbiAgLCBFdmVudCA9IHJlcXVpcmUoJy4vZXZlbnQvZXZlbnQnKVxuICAsIEV2ZW50VGFyZ2V0ID0gcmVxdWlyZSgnLi9ldmVudC9ldmVudHRhcmdldCcpXG4gICwgbG9jID0gcmVxdWlyZSgnLi9sb2NhdGlvbicpXG4gICwgQ2xvc2VFdmVudCA9IHJlcXVpcmUoJy4vZXZlbnQvY2xvc2UnKVxuICAsIFRyYW5zcG9ydE1lc3NhZ2VFdmVudCA9IHJlcXVpcmUoJy4vZXZlbnQvdHJhbnMtbWVzc2FnZScpXG4gICwgSW5mb1JlY2VpdmVyID0gcmVxdWlyZSgnLi9pbmZvLXJlY2VpdmVyJylcbiAgO1xuXG52YXIgZGVidWcgPSBmdW5jdGlvbigpIHt9O1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NranMtY2xpZW50Om1haW4nKTtcbn1cblxudmFyIHRyYW5zcG9ydHM7XG5cbi8vIGZvbGxvdyBjb25zdHJ1Y3RvciBzdGVwcyBkZWZpbmVkIGF0IGh0dHA6Ly9kZXYudzMub3JnL2h0bWw1L3dlYnNvY2tldHMvI3RoZS13ZWJzb2NrZXQtaW50ZXJmYWNlXG5mdW5jdGlvbiBTb2NrSlModXJsLCBwcm90b2NvbHMsIG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFNvY2tKUykpIHtcbiAgICByZXR1cm4gbmV3IFNvY2tKUyh1cmwsIHByb3RvY29scywgb3B0aW9ucyk7XG4gIH1cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAxKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZhaWxlZCB0byBjb25zdHJ1Y3QgJ1NvY2tKUzogMSBhcmd1bWVudCByZXF1aXJlZCwgYnV0IG9ubHkgMCBwcmVzZW50XCIpO1xuICB9XG4gIEV2ZW50VGFyZ2V0LmNhbGwodGhpcyk7XG5cbiAgdGhpcy5yZWFkeVN0YXRlID0gU29ja0pTLkNPTk5FQ1RJTkc7XG4gIHRoaXMuZXh0ZW5zaW9ucyA9ICcnO1xuICB0aGlzLnByb3RvY29sID0gJyc7XG5cbiAgLy8gbm9uLXN0YW5kYXJkIGV4dGVuc2lvblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgaWYgKG9wdGlvbnMucHJvdG9jb2xzX3doaXRlbGlzdCkge1xuICAgIGxvZy53YXJuKFwiJ3Byb3RvY29sc193aGl0ZWxpc3QnIGlzIERFUFJFQ0FURUQuIFVzZSAndHJhbnNwb3J0cycgaW5zdGVhZC5cIik7XG4gIH1cbiAgdGhpcy5fdHJhbnNwb3J0c1doaXRlbGlzdCA9IG9wdGlvbnMudHJhbnNwb3J0cztcbiAgdGhpcy5fdHJhbnNwb3J0T3B0aW9ucyA9IG9wdGlvbnMudHJhbnNwb3J0T3B0aW9ucyB8fCB7fTtcbiAgdGhpcy5fdGltZW91dCA9IG9wdGlvbnMudGltZW91dCB8fCAwO1xuXG4gIHZhciBzZXNzaW9uSWQgPSBvcHRpb25zLnNlc3Npb25JZCB8fCA4O1xuICBpZiAodHlwZW9mIHNlc3Npb25JZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHRoaXMuX2dlbmVyYXRlU2Vzc2lvbklkID0gc2Vzc2lvbklkO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBzZXNzaW9uSWQgPT09ICdudW1iZXInKSB7XG4gICAgdGhpcy5fZ2VuZXJhdGVTZXNzaW9uSWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiByYW5kb20uc3RyaW5nKHNlc3Npb25JZCk7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJZiBzZXNzaW9uSWQgaXMgdXNlZCBpbiB0aGUgb3B0aW9ucywgaXQgbmVlZHMgdG8gYmUgYSBudW1iZXIgb3IgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHRoaXMuX3NlcnZlciA9IG9wdGlvbnMuc2VydmVyIHx8IHJhbmRvbS5udW1iZXJTdHJpbmcoMTAwMCk7XG5cbiAgLy8gU3RlcCAxIG9mIFdTIHNwZWMgLSBwYXJzZSBhbmQgdmFsaWRhdGUgdGhlIHVybC4gSXNzdWUgIzhcbiAgdmFyIHBhcnNlZFVybCA9IG5ldyBVUkwodXJsKTtcbiAgaWYgKCFwYXJzZWRVcmwuaG9zdCB8fCAhcGFyc2VkVXJsLnByb3RvY29sKSB7XG4gICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiVGhlIFVSTCAnXCIgKyB1cmwgKyBcIicgaXMgaW52YWxpZFwiKTtcbiAgfSBlbHNlIGlmIChwYXJzZWRVcmwuaGFzaCkge1xuICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignVGhlIFVSTCBtdXN0IG5vdCBjb250YWluIGEgZnJhZ21lbnQnKTtcbiAgfSBlbHNlIGlmIChwYXJzZWRVcmwucHJvdG9jb2wgIT09ICdodHRwOicgJiYgcGFyc2VkVXJsLnByb3RvY29sICE9PSAnaHR0cHM6Jykge1xuICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIlRoZSBVUkwncyBzY2hlbWUgbXVzdCBiZSBlaXRoZXIgJ2h0dHA6JyBvciAnaHR0cHM6Jy4gJ1wiICsgcGFyc2VkVXJsLnByb3RvY29sICsgXCInIGlzIG5vdCBhbGxvd2VkLlwiKTtcbiAgfVxuXG4gIHZhciBzZWN1cmUgPSBwYXJzZWRVcmwucHJvdG9jb2wgPT09ICdodHRwczonO1xuICAvLyBTdGVwIDIgLSBkb24ndCBhbGxvdyBzZWN1cmUgb3JpZ2luIHdpdGggYW4gaW5zZWN1cmUgcHJvdG9jb2xcbiAgaWYgKGxvYy5wcm90b2NvbCA9PT0gJ2h0dHBzOicgJiYgIXNlY3VyZSkge1xuICAgIC8vIGV4Y2VwdGlvbiBpcyAxMjcuMC4wLjAvOCBhbmQgOjoxIHVybHNcbiAgICBpZiAoIXVybFV0aWxzLmlzTG9vcGJhY2tBZGRyKHBhcnNlZFVybC5ob3N0bmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU2VjdXJpdHlFcnJvcjogQW4gaW5zZWN1cmUgU29ja0pTIGNvbm5lY3Rpb24gbWF5IG5vdCBiZSBpbml0aWF0ZWQgZnJvbSBhIHBhZ2UgbG9hZGVkIG92ZXIgSFRUUFMnKTtcbiAgICB9XG4gIH1cblxuICAvLyBTdGVwIDMgLSBjaGVjayBwb3J0IGFjY2VzcyAtIG5vIG5lZWQgaGVyZVxuICAvLyBTdGVwIDQgLSBwYXJzZSBwcm90b2NvbHMgYXJndW1lbnRcbiAgaWYgKCFwcm90b2NvbHMpIHtcbiAgICBwcm90b2NvbHMgPSBbXTtcbiAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShwcm90b2NvbHMpKSB7XG4gICAgcHJvdG9jb2xzID0gW3Byb3RvY29sc107XG4gIH1cblxuICAvLyBTdGVwIDUgLSBjaGVjayBwcm90b2NvbHMgYXJndW1lbnRcbiAgdmFyIHNvcnRlZFByb3RvY29scyA9IHByb3RvY29scy5zb3J0KCk7XG4gIHNvcnRlZFByb3RvY29scy5mb3JFYWNoKGZ1bmN0aW9uKHByb3RvLCBpKSB7XG4gICAgaWYgKCFwcm90bykge1xuICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiVGhlIHByb3RvY29scyBlbnRyeSAnXCIgKyBwcm90byArIFwiJyBpcyBpbnZhbGlkLlwiKTtcbiAgICB9XG4gICAgaWYgKGkgPCAoc29ydGVkUHJvdG9jb2xzLmxlbmd0aCAtIDEpICYmIHByb3RvID09PSBzb3J0ZWRQcm90b2NvbHNbaSArIDFdKSB7XG4gICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJUaGUgcHJvdG9jb2xzIGVudHJ5ICdcIiArIHByb3RvICsgXCInIGlzIGR1cGxpY2F0ZWQuXCIpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gU3RlcCA2IC0gY29udmVydCBvcmlnaW5cbiAgdmFyIG8gPSB1cmxVdGlscy5nZXRPcmlnaW4obG9jLmhyZWYpO1xuICB0aGlzLl9vcmlnaW4gPSBvID8gby50b0xvd2VyQ2FzZSgpIDogbnVsbDtcblxuICAvLyByZW1vdmUgdGhlIHRyYWlsaW5nIHNsYXNoXG4gIHBhcnNlZFVybC5zZXQoJ3BhdGhuYW1lJywgcGFyc2VkVXJsLnBhdGhuYW1lLnJlcGxhY2UoL1xcLyskLywgJycpKTtcblxuICAvLyBzdG9yZSB0aGUgc2FuaXRpemVkIHVybFxuICB0aGlzLnVybCA9IHBhcnNlZFVybC5ocmVmO1xuICBkZWJ1ZygndXNpbmcgdXJsJywgdGhpcy51cmwpO1xuXG4gIC8vIFN0ZXAgNyAtIHN0YXJ0IGNvbm5lY3Rpb24gaW4gYmFja2dyb3VuZFxuICAvLyBvYnRhaW4gc2VydmVyIGluZm9cbiAgLy8gaHR0cDovL3NvY2tqcy5naXRodWIuaW8vc29ja2pzLXByb3RvY29sL3NvY2tqcy1wcm90b2NvbC0wLjMuMy5odG1sI3NlY3Rpb24tMjZcbiAgdGhpcy5fdXJsSW5mbyA9IHtcbiAgICBudWxsT3JpZ2luOiAhYnJvd3Nlci5oYXNEb21haW4oKVxuICAsIHNhbWVPcmlnaW46IHVybFV0aWxzLmlzT3JpZ2luRXF1YWwodGhpcy51cmwsIGxvYy5ocmVmKVxuICAsIHNhbWVTY2hlbWU6IHVybFV0aWxzLmlzU2NoZW1lRXF1YWwodGhpcy51cmwsIGxvYy5ocmVmKVxuICB9O1xuXG4gIHRoaXMuX2lyID0gbmV3IEluZm9SZWNlaXZlcih0aGlzLnVybCwgdGhpcy5fdXJsSW5mbyk7XG4gIHRoaXMuX2lyLm9uY2UoJ2ZpbmlzaCcsIHRoaXMuX3JlY2VpdmVJbmZvLmJpbmQodGhpcykpO1xufVxuXG5pbmhlcml0cyhTb2NrSlMsIEV2ZW50VGFyZ2V0KTtcblxuZnVuY3Rpb24gdXNlclNldENvZGUoY29kZSkge1xuICByZXR1cm4gY29kZSA9PT0gMTAwMCB8fCAoY29kZSA+PSAzMDAwICYmIGNvZGUgPD0gNDk5OSk7XG59XG5cblNvY2tKUy5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbihjb2RlLCByZWFzb24pIHtcbiAgLy8gU3RlcCAxXG4gIGlmIChjb2RlICYmICF1c2VyU2V0Q29kZShjb2RlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZEFjY2Vzc0Vycm9yOiBJbnZhbGlkIGNvZGUnKTtcbiAgfVxuICAvLyBTdGVwIDIuNCBzdGF0ZXMgdGhlIG1heCBpcyAxMjMgYnl0ZXMsIGJ1dCB3ZSBhcmUganVzdCBjaGVja2luZyBsZW5ndGhcbiAgaWYgKHJlYXNvbiAmJiByZWFzb24ubGVuZ3RoID4gMTIzKSB7XG4gICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdyZWFzb24gYXJndW1lbnQgaGFzIGFuIGludmFsaWQgbGVuZ3RoJyk7XG4gIH1cblxuICAvLyBTdGVwIDMuMVxuICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBTb2NrSlMuQ0xPU0lORyB8fCB0aGlzLnJlYWR5U3RhdGUgPT09IFNvY2tKUy5DTE9TRUQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBUT0RPIGxvb2sgYXQgZG9jcyB0byBkZXRlcm1pbmUgaG93IHRvIHNldCB0aGlzXG4gIHZhciB3YXNDbGVhbiA9IHRydWU7XG4gIHRoaXMuX2Nsb3NlKGNvZGUgfHwgMTAwMCwgcmVhc29uIHx8ICdOb3JtYWwgY2xvc3VyZScsIHdhc0NsZWFuKTtcbn07XG5cblNvY2tKUy5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgLy8gIzEzIC0gY29udmVydCBhbnl0aGluZyBub24tc3RyaW5nIHRvIHN0cmluZ1xuICAvLyBUT0RPIHRoaXMgY3VycmVudGx5IHR1cm5zIG9iamVjdHMgaW50byBbb2JqZWN0IE9iamVjdF1cbiAgaWYgKHR5cGVvZiBkYXRhICE9PSAnc3RyaW5nJykge1xuICAgIGRhdGEgPSAnJyArIGRhdGE7XG4gIH1cbiAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gU29ja0pTLkNPTk5FQ1RJTkcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yOiBUaGUgY29ubmVjdGlvbiBoYXMgbm90IGJlZW4gZXN0YWJsaXNoZWQgeWV0Jyk7XG4gIH1cbiAgaWYgKHRoaXMucmVhZHlTdGF0ZSAhPT0gU29ja0pTLk9QRU4pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5fdHJhbnNwb3J0LnNlbmQoZXNjYXBlLnF1b3RlKGRhdGEpKTtcbn07XG5cblNvY2tKUy52ZXJzaW9uID0gcmVxdWlyZSgnLi92ZXJzaW9uJyk7XG5cblNvY2tKUy5DT05ORUNUSU5HID0gMDtcblNvY2tKUy5PUEVOID0gMTtcblNvY2tKUy5DTE9TSU5HID0gMjtcblNvY2tKUy5DTE9TRUQgPSAzO1xuXG5Tb2NrSlMucHJvdG90eXBlLl9yZWNlaXZlSW5mbyA9IGZ1bmN0aW9uKGluZm8sIHJ0dCkge1xuICBkZWJ1ZygnX3JlY2VpdmVJbmZvJywgcnR0KTtcbiAgdGhpcy5faXIgPSBudWxsO1xuICBpZiAoIWluZm8pIHtcbiAgICB0aGlzLl9jbG9zZSgxMDAyLCAnQ2Fubm90IGNvbm5lY3QgdG8gc2VydmVyJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gZXN0YWJsaXNoIGEgcm91bmQtdHJpcCB0aW1lb3V0IChSVE8pIGJhc2VkIG9uIHRoZVxuICAvLyByb3VuZC10cmlwIHRpbWUgKFJUVClcbiAgdGhpcy5fcnRvID0gdGhpcy5jb3VudFJUTyhydHQpO1xuICAvLyBhbGxvdyBzZXJ2ZXIgdG8gb3ZlcnJpZGUgdXJsIHVzZWQgZm9yIHRoZSBhY3R1YWwgdHJhbnNwb3J0XG4gIHRoaXMuX3RyYW5zVXJsID0gaW5mby5iYXNlX3VybCA/IGluZm8uYmFzZV91cmwgOiB0aGlzLnVybDtcbiAgaW5mbyA9IG9iamVjdFV0aWxzLmV4dGVuZChpbmZvLCB0aGlzLl91cmxJbmZvKTtcbiAgZGVidWcoJ2luZm8nLCBpbmZvKTtcbiAgLy8gZGV0ZXJtaW5lIGxpc3Qgb2YgZGVzaXJlZCBhbmQgc3VwcG9ydGVkIHRyYW5zcG9ydHNcbiAgdmFyIGVuYWJsZWRUcmFuc3BvcnRzID0gdHJhbnNwb3J0cy5maWx0ZXJUb0VuYWJsZWQodGhpcy5fdHJhbnNwb3J0c1doaXRlbGlzdCwgaW5mbyk7XG4gIHRoaXMuX3RyYW5zcG9ydHMgPSBlbmFibGVkVHJhbnNwb3J0cy5tYWluO1xuICBkZWJ1Zyh0aGlzLl90cmFuc3BvcnRzLmxlbmd0aCArICcgZW5hYmxlZCB0cmFuc3BvcnRzJyk7XG5cbiAgdGhpcy5fY29ubmVjdCgpO1xufTtcblxuU29ja0pTLnByb3RvdHlwZS5fY29ubmVjdCA9IGZ1bmN0aW9uKCkge1xuICBmb3IgKHZhciBUcmFuc3BvcnQgPSB0aGlzLl90cmFuc3BvcnRzLnNoaWZ0KCk7IFRyYW5zcG9ydDsgVHJhbnNwb3J0ID0gdGhpcy5fdHJhbnNwb3J0cy5zaGlmdCgpKSB7XG4gICAgZGVidWcoJ2F0dGVtcHQnLCBUcmFuc3BvcnQudHJhbnNwb3J0TmFtZSk7XG4gICAgaWYgKFRyYW5zcG9ydC5uZWVkQm9keSkge1xuICAgICAgaWYgKCFnbG9iYWwuZG9jdW1lbnQuYm9keSB8fFxuICAgICAgICAgICh0eXBlb2YgZ2xvYmFsLmRvY3VtZW50LnJlYWR5U3RhdGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICBnbG9iYWwuZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gJ2NvbXBsZXRlJyAmJlxuICAgICAgICAgICAgZ2xvYmFsLmRvY3VtZW50LnJlYWR5U3RhdGUgIT09ICdpbnRlcmFjdGl2ZScpKSB7XG4gICAgICAgIGRlYnVnKCd3YWl0aW5nIGZvciBib2R5Jyk7XG4gICAgICAgIHRoaXMuX3RyYW5zcG9ydHMudW5zaGlmdChUcmFuc3BvcnQpO1xuICAgICAgICBldmVudFV0aWxzLmF0dGFjaEV2ZW50KCdsb2FkJywgdGhpcy5fY29ubmVjdC5iaW5kKHRoaXMpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNhbGN1bGF0ZSB0aW1lb3V0IGJhc2VkIG9uIFJUTyBhbmQgcm91bmQgdHJpcHMuIERlZmF1bHQgdG8gNXNcbiAgICB2YXIgdGltZW91dE1zID0gTWF0aC5tYXgodGhpcy5fdGltZW91dCwgKHRoaXMuX3J0byAqIFRyYW5zcG9ydC5yb3VuZFRyaXBzKSB8fCA1MDAwKTtcbiAgICB0aGlzLl90cmFuc3BvcnRUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KHRoaXMuX3RyYW5zcG9ydFRpbWVvdXQuYmluZCh0aGlzKSwgdGltZW91dE1zKTtcbiAgICBkZWJ1ZygndXNpbmcgdGltZW91dCcsIHRpbWVvdXRNcyk7XG5cbiAgICB2YXIgdHJhbnNwb3J0VXJsID0gdXJsVXRpbHMuYWRkUGF0aCh0aGlzLl90cmFuc1VybCwgJy8nICsgdGhpcy5fc2VydmVyICsgJy8nICsgdGhpcy5fZ2VuZXJhdGVTZXNzaW9uSWQoKSk7XG4gICAgdmFyIG9wdGlvbnMgPSB0aGlzLl90cmFuc3BvcnRPcHRpb25zW1RyYW5zcG9ydC50cmFuc3BvcnROYW1lXTtcbiAgICBkZWJ1ZygndHJhbnNwb3J0IHVybCcsIHRyYW5zcG9ydFVybCk7XG4gICAgdmFyIHRyYW5zcG9ydE9iaiA9IG5ldyBUcmFuc3BvcnQodHJhbnNwb3J0VXJsLCB0aGlzLl90cmFuc1VybCwgb3B0aW9ucyk7XG4gICAgdHJhbnNwb3J0T2JqLm9uKCdtZXNzYWdlJywgdGhpcy5fdHJhbnNwb3J0TWVzc2FnZS5iaW5kKHRoaXMpKTtcbiAgICB0cmFuc3BvcnRPYmoub25jZSgnY2xvc2UnLCB0aGlzLl90cmFuc3BvcnRDbG9zZS5iaW5kKHRoaXMpKTtcbiAgICB0cmFuc3BvcnRPYmoudHJhbnNwb3J0TmFtZSA9IFRyYW5zcG9ydC50cmFuc3BvcnROYW1lO1xuICAgIHRoaXMuX3RyYW5zcG9ydCA9IHRyYW5zcG9ydE9iajtcblxuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLl9jbG9zZSgyMDAwLCAnQWxsIHRyYW5zcG9ydHMgZmFpbGVkJywgZmFsc2UpO1xufTtcblxuU29ja0pTLnByb3RvdHlwZS5fdHJhbnNwb3J0VGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICBkZWJ1ZygnX3RyYW5zcG9ydFRpbWVvdXQnKTtcbiAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gU29ja0pTLkNPTk5FQ1RJTkcpIHtcbiAgICBpZiAodGhpcy5fdHJhbnNwb3J0KSB7XG4gICAgICB0aGlzLl90cmFuc3BvcnQuY2xvc2UoKTtcbiAgICB9XG5cbiAgICB0aGlzLl90cmFuc3BvcnRDbG9zZSgyMDA3LCAnVHJhbnNwb3J0IHRpbWVkIG91dCcpO1xuICB9XG59O1xuXG5Tb2NrSlMucHJvdG90eXBlLl90cmFuc3BvcnRNZXNzYWdlID0gZnVuY3Rpb24obXNnKSB7XG4gIGRlYnVnKCdfdHJhbnNwb3J0TWVzc2FnZScsIG1zZyk7XG4gIHZhciBzZWxmID0gdGhpc1xuICAgICwgdHlwZSA9IG1zZy5zbGljZSgwLCAxKVxuICAgICwgY29udGVudCA9IG1zZy5zbGljZSgxKVxuICAgICwgcGF5bG9hZFxuICAgIDtcblxuICAvLyBmaXJzdCBjaGVjayBmb3IgbWVzc2FnZXMgdGhhdCBkb24ndCBuZWVkIGEgcGF5bG9hZFxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdvJzpcbiAgICAgIHRoaXMuX29wZW4oKTtcbiAgICAgIHJldHVybjtcbiAgICBjYXNlICdoJzpcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2hlYXJ0YmVhdCcpKTtcbiAgICAgIGRlYnVnKCdoZWFydGJlYXQnLCB0aGlzLnRyYW5zcG9ydCk7XG4gICAgICByZXR1cm47XG4gIH1cblxuICBpZiAoY29udGVudCkge1xuICAgIHRyeSB7XG4gICAgICBwYXlsb2FkID0gSlNPTjMucGFyc2UoY29udGVudCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZGVidWcoJ2JhZCBqc29uJywgY29udGVudCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiBwYXlsb2FkID09PSAndW5kZWZpbmVkJykge1xuICAgIGRlYnVnKCdlbXB0eSBwYXlsb2FkJywgY29udGVudCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnYSc6XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXlsb2FkKSkge1xuICAgICAgICBwYXlsb2FkLmZvckVhY2goZnVuY3Rpb24ocCkge1xuICAgICAgICAgIGRlYnVnKCdtZXNzYWdlJywgc2VsZi50cmFuc3BvcnQsIHApO1xuICAgICAgICAgIHNlbGYuZGlzcGF0Y2hFdmVudChuZXcgVHJhbnNwb3J0TWVzc2FnZUV2ZW50KHApKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdtJzpcbiAgICAgIGRlYnVnKCdtZXNzYWdlJywgdGhpcy50cmFuc3BvcnQsIHBheWxvYWQpO1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBUcmFuc3BvcnRNZXNzYWdlRXZlbnQocGF5bG9hZCkpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYyc6XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXlsb2FkKSAmJiBwYXlsb2FkLmxlbmd0aCA9PT0gMikge1xuICAgICAgICB0aGlzLl9jbG9zZShwYXlsb2FkWzBdLCBwYXlsb2FkWzFdLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICB9XG59O1xuXG5Tb2NrSlMucHJvdG90eXBlLl90cmFuc3BvcnRDbG9zZSA9IGZ1bmN0aW9uKGNvZGUsIHJlYXNvbikge1xuICBkZWJ1ZygnX3RyYW5zcG9ydENsb3NlJywgdGhpcy50cmFuc3BvcnQsIGNvZGUsIHJlYXNvbik7XG4gIGlmICh0aGlzLl90cmFuc3BvcnQpIHtcbiAgICB0aGlzLl90cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgdGhpcy5fdHJhbnNwb3J0ID0gbnVsbDtcbiAgICB0aGlzLnRyYW5zcG9ydCA9IG51bGw7XG4gIH1cblxuICBpZiAoIXVzZXJTZXRDb2RlKGNvZGUpICYmIGNvZGUgIT09IDIwMDAgJiYgdGhpcy5yZWFkeVN0YXRlID09PSBTb2NrSlMuQ09OTkVDVElORykge1xuICAgIHRoaXMuX2Nvbm5lY3QoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLl9jbG9zZShjb2RlLCByZWFzb24pO1xufTtcblxuU29ja0pTLnByb3RvdHlwZS5fb3BlbiA9IGZ1bmN0aW9uKCkge1xuICBkZWJ1ZygnX29wZW4nLCB0aGlzLl90cmFuc3BvcnQgJiYgdGhpcy5fdHJhbnNwb3J0LnRyYW5zcG9ydE5hbWUsIHRoaXMucmVhZHlTdGF0ZSk7XG4gIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IFNvY2tKUy5DT05ORUNUSU5HKSB7XG4gICAgaWYgKHRoaXMuX3RyYW5zcG9ydFRpbWVvdXRJZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RyYW5zcG9ydFRpbWVvdXRJZCk7XG4gICAgICB0aGlzLl90cmFuc3BvcnRUaW1lb3V0SWQgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLnJlYWR5U3RhdGUgPSBTb2NrSlMuT1BFTjtcbiAgICB0aGlzLnRyYW5zcG9ydCA9IHRoaXMuX3RyYW5zcG9ydC50cmFuc3BvcnROYW1lO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ29wZW4nKSk7XG4gICAgZGVidWcoJ2Nvbm5lY3RlZCcsIHRoaXMudHJhbnNwb3J0KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBUaGUgc2VydmVyIG1pZ2h0IGhhdmUgYmVlbiByZXN0YXJ0ZWQsIGFuZCBsb3N0IHRyYWNrIG9mIG91clxuICAgIC8vIGNvbm5lY3Rpb24uXG4gICAgdGhpcy5fY2xvc2UoMTAwNiwgJ1NlcnZlciBsb3N0IHNlc3Npb24nKTtcbiAgfVxufTtcblxuU29ja0pTLnByb3RvdHlwZS5fY2xvc2UgPSBmdW5jdGlvbihjb2RlLCByZWFzb24sIHdhc0NsZWFuKSB7XG4gIGRlYnVnKCdfY2xvc2UnLCB0aGlzLnRyYW5zcG9ydCwgY29kZSwgcmVhc29uLCB3YXNDbGVhbiwgdGhpcy5yZWFkeVN0YXRlKTtcbiAgdmFyIGZvcmNlRmFpbCA9IGZhbHNlO1xuXG4gIGlmICh0aGlzLl9pcikge1xuICAgIGZvcmNlRmFpbCA9IHRydWU7XG4gICAgdGhpcy5faXIuY2xvc2UoKTtcbiAgICB0aGlzLl9pciA9IG51bGw7XG4gIH1cbiAgaWYgKHRoaXMuX3RyYW5zcG9ydCkge1xuICAgIHRoaXMuX3RyYW5zcG9ydC5jbG9zZSgpO1xuICAgIHRoaXMuX3RyYW5zcG9ydCA9IG51bGw7XG4gICAgdGhpcy50cmFuc3BvcnQgPSBudWxsO1xuICB9XG5cbiAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gU29ja0pTLkNMT1NFRCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZFN0YXRlRXJyb3I6IFNvY2tKUyBoYXMgYWxyZWFkeSBiZWVuIGNsb3NlZCcpO1xuICB9XG5cbiAgdGhpcy5yZWFkeVN0YXRlID0gU29ja0pTLkNMT1NJTkc7XG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5yZWFkeVN0YXRlID0gU29ja0pTLkNMT1NFRDtcblxuICAgIGlmIChmb3JjZUZhaWwpIHtcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2Vycm9yJykpO1xuICAgIH1cblxuICAgIHZhciBlID0gbmV3IENsb3NlRXZlbnQoJ2Nsb3NlJyk7XG4gICAgZS53YXNDbGVhbiA9IHdhc0NsZWFuIHx8IGZhbHNlO1xuICAgIGUuY29kZSA9IGNvZGUgfHwgMTAwMDtcbiAgICBlLnJlYXNvbiA9IHJlYXNvbjtcblxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChlKTtcbiAgICB0aGlzLm9ubWVzc2FnZSA9IHRoaXMub25jbG9zZSA9IHRoaXMub25lcnJvciA9IG51bGw7XG4gICAgZGVidWcoJ2Rpc2Nvbm5lY3RlZCcpO1xuICB9LmJpbmQodGhpcyksIDApO1xufTtcblxuLy8gU2VlOiBodHRwOi8vd3d3LmVyZy5hYmRuLmFjLnVrL35nZXJyaXQvZGNjcC9ub3Rlcy9jY2lkMi9ydG9fZXN0aW1hdG9yL1xuLy8gYW5kIFJGQyAyOTg4LlxuU29ja0pTLnByb3RvdHlwZS5jb3VudFJUTyA9IGZ1bmN0aW9uKHJ0dCkge1xuICAvLyBJbiBhIGxvY2FsIGVudmlyb25tZW50LCB3aGVuIHVzaW5nIElFOC85IGFuZCB0aGUgYGpzb25wLXBvbGxpbmdgXG4gIC8vIHRyYW5zcG9ydCB0aGUgdGltZSBuZWVkZWQgdG8gZXN0YWJsaXNoIGEgY29ubmVjdGlvbiAodGhlIHRpbWUgdGhhdCBwYXNzXG4gIC8vIGZyb20gdGhlIG9wZW5pbmcgb2YgdGhlIHRyYW5zcG9ydCB0byB0aGUgY2FsbCBvZiBgX2Rpc3BhdGNoT3BlbmApIGlzXG4gIC8vIGFyb3VuZCAyMDBtc2VjICh0aGUgbG93ZXIgYm91bmQgdXNlZCBpbiB0aGUgYXJ0aWNsZSBhYm92ZSkgYW5kIHRoaXNcbiAgLy8gY2F1c2VzIHNwdXJpb3VzIHRpbWVvdXRzLiBGb3IgdGhpcyByZWFzb24gd2UgY2FsY3VsYXRlIGEgdmFsdWUgc2xpZ2h0bHlcbiAgLy8gbGFyZ2VyIHRoYW4gdGhhdCB1c2VkIGluIHRoZSBhcnRpY2xlLlxuICBpZiAocnR0ID4gMTAwKSB7XG4gICAgcmV0dXJuIDQgKiBydHQ7IC8vIHJ0byA+IDQwMG1zZWNcbiAgfVxuICByZXR1cm4gMzAwICsgcnR0OyAvLyAzMDBtc2VjIDwgcnRvIDw9IDQwMG1zZWNcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXZhaWxhYmxlVHJhbnNwb3J0cykge1xuICB0cmFuc3BvcnRzID0gdHJhbnNwb3J0KGF2YWlsYWJsZVRyYW5zcG9ydHMpO1xuICByZXF1aXJlKCcuL2lmcmFtZS1ib290c3RyYXAnKShTb2NrSlMsIGF2YWlsYWJsZVRyYW5zcG9ydHMpO1xuICByZXR1cm4gU29ja0pTO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlICovXG4vKiBqc2NzOiBkaXNhYmxlICovXG4ndXNlIHN0cmljdCc7XG5cbi8vIHB1bGxlZCBzcGVjaWZpYyBzaGltcyBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9lcy1zaGltcy9lczUtc2hpbVxuXG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG52YXIgT2JqZWN0UHJvdG90eXBlID0gT2JqZWN0LnByb3RvdHlwZTtcbnZhciBGdW5jdGlvblByb3RvdHlwZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbnZhciBTdHJpbmdQcm90b3R5cGUgPSBTdHJpbmcucHJvdG90eXBlO1xudmFyIGFycmF5X3NsaWNlID0gQXJyYXlQcm90b3R5cGUuc2xpY2U7XG5cbnZhciBfdG9TdHJpbmcgPSBPYmplY3RQcm90b3R5cGUudG9TdHJpbmc7XG52YXIgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICByZXR1cm4gT2JqZWN0UHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn07XG52YXIgaXNBcnJheSA9IGZ1bmN0aW9uIGlzQXJyYXkob2JqKSB7XG4gICAgcmV0dXJuIF90b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xudmFyIGlzU3RyaW5nID0gZnVuY3Rpb24gaXNTdHJpbmcob2JqKSB7XG4gICAgcmV0dXJuIF90b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xufTtcblxudmFyIHN1cHBvcnRzRGVzY3JpcHRvcnMgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgJiYgKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICd4Jywge30pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7IC8qIHRoaXMgaXMgRVMzICovXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59KCkpO1xuXG4vLyBEZWZpbmUgY29uZmlndXJhYmxlLCB3cml0YWJsZSBhbmQgbm9uLWVudW1lcmFibGUgcHJvcHNcbi8vIGlmIHRoZXkgZG9uJ3QgZXhpc3QuXG52YXIgZGVmaW5lUHJvcGVydHk7XG5pZiAoc3VwcG9ydHNEZXNjcmlwdG9ycykge1xuICAgIGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZSwgbWV0aG9kLCBmb3JjZUFzc2lnbikge1xuICAgICAgICBpZiAoIWZvcmNlQXNzaWduICYmIChuYW1lIGluIG9iamVjdCkpIHsgcmV0dXJuOyB9XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogbWV0aG9kXG4gICAgICAgIH0pO1xuICAgIH07XG59IGVsc2Uge1xuICAgIGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZSwgbWV0aG9kLCBmb3JjZUFzc2lnbikge1xuICAgICAgICBpZiAoIWZvcmNlQXNzaWduICYmIChuYW1lIGluIG9iamVjdCkpIHsgcmV0dXJuOyB9XG4gICAgICAgIG9iamVjdFtuYW1lXSA9IG1ldGhvZDtcbiAgICB9O1xufVxudmFyIGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiAob2JqZWN0LCBtYXAsIGZvcmNlQXNzaWduKSB7XG4gICAgZm9yICh2YXIgbmFtZSBpbiBtYXApIHtcbiAgICAgICAgaWYgKE9iamVjdFByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1hcCwgbmFtZSkpIHtcbiAgICAgICAgICBkZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIG1hcFtuYW1lXSwgZm9yY2VBc3NpZ24pO1xuICAgICAgICB9XG4gICAgfVxufTtcblxudmFyIHRvT2JqZWN0ID0gZnVuY3Rpb24gKG8pIHtcbiAgICBpZiAobyA9PSBudWxsKSB7IC8vIHRoaXMgbWF0Y2hlcyBib3RoIG51bGwgYW5kIHVuZGVmaW5lZFxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiY2FuJ3QgY29udmVydCBcIiArIG8gKyAnIHRvIG9iamVjdCcpO1xuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0KG8pO1xufTtcblxuLy9cbi8vIFV0aWxcbi8vID09PT09PVxuLy9cblxuLy8gRVM1IDkuNFxuLy8gaHR0cDovL2VzNS5naXRodWIuY29tLyN4OS40XG4vLyBodHRwOi8vanNwZXJmLmNvbS90by1pbnRlZ2VyXG5cbmZ1bmN0aW9uIHRvSW50ZWdlcihudW0pIHtcbiAgICB2YXIgbiA9ICtudW07XG4gICAgaWYgKG4gIT09IG4pIHsgLy8gaXNOYU5cbiAgICAgICAgbiA9IDA7XG4gICAgfSBlbHNlIGlmIChuICE9PSAwICYmIG4gIT09ICgxIC8gMCkgJiYgbiAhPT0gLSgxIC8gMCkpIHtcbiAgICAgICAgbiA9IChuID4gMCB8fCAtMSkgKiBNYXRoLmZsb29yKE1hdGguYWJzKG4pKTtcbiAgICB9XG4gICAgcmV0dXJuIG47XG59XG5cbmZ1bmN0aW9uIFRvVWludDMyKHgpIHtcbiAgICByZXR1cm4geCA+Pj4gMDtcbn1cblxuLy9cbi8vIEZ1bmN0aW9uXG4vLyA9PT09PT09PVxuLy9cblxuLy8gRVMtNSAxNS4zLjQuNVxuLy8gaHR0cDovL2VzNS5naXRodWIuY29tLyN4MTUuMy40LjVcblxuZnVuY3Rpb24gRW1wdHkoKSB7fVxuXG5kZWZpbmVQcm9wZXJ0aWVzKEZ1bmN0aW9uUHJvdG90eXBlLCB7XG4gICAgYmluZDogZnVuY3Rpb24gYmluZCh0aGF0KSB7IC8vIC5sZW5ndGggaXMgMVxuICAgICAgICAvLyAxLiBMZXQgVGFyZ2V0IGJlIHRoZSB0aGlzIHZhbHVlLlxuICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcztcbiAgICAgICAgLy8gMi4gSWYgSXNDYWxsYWJsZShUYXJnZXQpIGlzIGZhbHNlLCB0aHJvdyBhIFR5cGVFcnJvciBleGNlcHRpb24uXG4gICAgICAgIGlmICghaXNGdW5jdGlvbih0YXJnZXQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGdW5jdGlvbi5wcm90b3R5cGUuYmluZCBjYWxsZWQgb24gaW5jb21wYXRpYmxlICcgKyB0YXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIDMuIExldCBBIGJlIGEgbmV3IChwb3NzaWJseSBlbXB0eSkgaW50ZXJuYWwgbGlzdCBvZiBhbGwgb2YgdGhlXG4gICAgICAgIC8vICAgYXJndW1lbnQgdmFsdWVzIHByb3ZpZGVkIGFmdGVyIHRoaXNBcmcgKGFyZzEsIGFyZzIgZXRjKSwgaW4gb3JkZXIuXG4gICAgICAgIC8vIFhYWCBzbGljZWRBcmdzIHdpbGwgc3RhbmQgaW4gZm9yIFwiQVwiIGlmIHVzZWRcbiAgICAgICAgdmFyIGFyZ3MgPSBhcnJheV9zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7IC8vIGZvciBub3JtYWwgY2FsbFxuICAgICAgICAvLyA0LiBMZXQgRiBiZSBhIG5ldyBuYXRpdmUgRUNNQVNjcmlwdCBvYmplY3QuXG4gICAgICAgIC8vIDExLiBTZXQgdGhlIFtbUHJvdG90eXBlXV0gaW50ZXJuYWwgcHJvcGVydHkgb2YgRiB0byB0aGUgc3RhbmRhcmRcbiAgICAgICAgLy8gICBidWlsdC1pbiBGdW5jdGlvbiBwcm90b3R5cGUgb2JqZWN0IGFzIHNwZWNpZmllZCBpbiAxNS4zLjMuMS5cbiAgICAgICAgLy8gMTIuIFNldCB0aGUgW1tDYWxsXV0gaW50ZXJuYWwgcHJvcGVydHkgb2YgRiBhcyBkZXNjcmliZWQgaW5cbiAgICAgICAgLy8gICAxNS4zLjQuNS4xLlxuICAgICAgICAvLyAxMy4gU2V0IHRoZSBbW0NvbnN0cnVjdF1dIGludGVybmFsIHByb3BlcnR5IG9mIEYgYXMgZGVzY3JpYmVkIGluXG4gICAgICAgIC8vICAgMTUuMy40LjUuMi5cbiAgICAgICAgLy8gMTQuIFNldCB0aGUgW1tIYXNJbnN0YW5jZV1dIGludGVybmFsIHByb3BlcnR5IG9mIEYgYXMgZGVzY3JpYmVkIGluXG4gICAgICAgIC8vICAgMTUuMy40LjUuMy5cbiAgICAgICAgdmFyIGJpbmRlciA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBib3VuZCkge1xuICAgICAgICAgICAgICAgIC8vIDE1LjMuNC41LjIgW1tDb25zdHJ1Y3RdXVxuICAgICAgICAgICAgICAgIC8vIFdoZW4gdGhlIFtbQ29uc3RydWN0XV0gaW50ZXJuYWwgbWV0aG9kIG9mIGEgZnVuY3Rpb24gb2JqZWN0LFxuICAgICAgICAgICAgICAgIC8vIEYgdGhhdCB3YXMgY3JlYXRlZCB1c2luZyB0aGUgYmluZCBmdW5jdGlvbiBpcyBjYWxsZWQgd2l0aCBhXG4gICAgICAgICAgICAgICAgLy8gbGlzdCBvZiBhcmd1bWVudHMgRXh0cmFBcmdzLCB0aGUgZm9sbG93aW5nIHN0ZXBzIGFyZSB0YWtlbjpcbiAgICAgICAgICAgICAgICAvLyAxLiBMZXQgdGFyZ2V0IGJlIHRoZSB2YWx1ZSBvZiBGJ3MgW1tUYXJnZXRGdW5jdGlvbl1dXG4gICAgICAgICAgICAgICAgLy8gICBpbnRlcm5hbCBwcm9wZXJ0eS5cbiAgICAgICAgICAgICAgICAvLyAyLiBJZiB0YXJnZXQgaGFzIG5vIFtbQ29uc3RydWN0XV0gaW50ZXJuYWwgbWV0aG9kLCBhXG4gICAgICAgICAgICAgICAgLy8gICBUeXBlRXJyb3IgZXhjZXB0aW9uIGlzIHRocm93bi5cbiAgICAgICAgICAgICAgICAvLyAzLiBMZXQgYm91bmRBcmdzIGJlIHRoZSB2YWx1ZSBvZiBGJ3MgW1tCb3VuZEFyZ3NdXSBpbnRlcm5hbFxuICAgICAgICAgICAgICAgIC8vICAgcHJvcGVydHkuXG4gICAgICAgICAgICAgICAgLy8gNC4gTGV0IGFyZ3MgYmUgYSBuZXcgbGlzdCBjb250YWluaW5nIHRoZSBzYW1lIHZhbHVlcyBhcyB0aGVcbiAgICAgICAgICAgICAgICAvLyAgIGxpc3QgYm91bmRBcmdzIGluIHRoZSBzYW1lIG9yZGVyIGZvbGxvd2VkIGJ5IHRoZSBzYW1lXG4gICAgICAgICAgICAgICAgLy8gICB2YWx1ZXMgYXMgdGhlIGxpc3QgRXh0cmFBcmdzIGluIHRoZSBzYW1lIG9yZGVyLlxuICAgICAgICAgICAgICAgIC8vIDUuIFJldHVybiB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgdGhlIFtbQ29uc3RydWN0XV0gaW50ZXJuYWxcbiAgICAgICAgICAgICAgICAvLyAgIG1ldGhvZCBvZiB0YXJnZXQgcHJvdmlkaW5nIGFyZ3MgYXMgdGhlIGFyZ3VtZW50cy5cblxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0YXJnZXQuYXBwbHkoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MuY29uY2F0KGFycmF5X3NsaWNlLmNhbGwoYXJndW1lbnRzKSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3QocmVzdWx0KSA9PT0gcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIDE1LjMuNC41LjEgW1tDYWxsXV1cbiAgICAgICAgICAgICAgICAvLyBXaGVuIHRoZSBbW0NhbGxdXSBpbnRlcm5hbCBtZXRob2Qgb2YgYSBmdW5jdGlvbiBvYmplY3QsIEYsXG4gICAgICAgICAgICAgICAgLy8gd2hpY2ggd2FzIGNyZWF0ZWQgdXNpbmcgdGhlIGJpbmQgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGggYVxuICAgICAgICAgICAgICAgIC8vIHRoaXMgdmFsdWUgYW5kIGEgbGlzdCBvZiBhcmd1bWVudHMgRXh0cmFBcmdzLCB0aGUgZm9sbG93aW5nXG4gICAgICAgICAgICAgICAgLy8gc3RlcHMgYXJlIHRha2VuOlxuICAgICAgICAgICAgICAgIC8vIDEuIExldCBib3VuZEFyZ3MgYmUgdGhlIHZhbHVlIG9mIEYncyBbW0JvdW5kQXJnc11dIGludGVybmFsXG4gICAgICAgICAgICAgICAgLy8gICBwcm9wZXJ0eS5cbiAgICAgICAgICAgICAgICAvLyAyLiBMZXQgYm91bmRUaGlzIGJlIHRoZSB2YWx1ZSBvZiBGJ3MgW1tCb3VuZFRoaXNdXSBpbnRlcm5hbFxuICAgICAgICAgICAgICAgIC8vICAgcHJvcGVydHkuXG4gICAgICAgICAgICAgICAgLy8gMy4gTGV0IHRhcmdldCBiZSB0aGUgdmFsdWUgb2YgRidzIFtbVGFyZ2V0RnVuY3Rpb25dXSBpbnRlcm5hbFxuICAgICAgICAgICAgICAgIC8vICAgcHJvcGVydHkuXG4gICAgICAgICAgICAgICAgLy8gNC4gTGV0IGFyZ3MgYmUgYSBuZXcgbGlzdCBjb250YWluaW5nIHRoZSBzYW1lIHZhbHVlcyBhcyB0aGVcbiAgICAgICAgICAgICAgICAvLyAgIGxpc3QgYm91bmRBcmdzIGluIHRoZSBzYW1lIG9yZGVyIGZvbGxvd2VkIGJ5IHRoZSBzYW1lXG4gICAgICAgICAgICAgICAgLy8gICB2YWx1ZXMgYXMgdGhlIGxpc3QgRXh0cmFBcmdzIGluIHRoZSBzYW1lIG9yZGVyLlxuICAgICAgICAgICAgICAgIC8vIDUuIFJldHVybiB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgdGhlIFtbQ2FsbF1dIGludGVybmFsIG1ldGhvZFxuICAgICAgICAgICAgICAgIC8vICAgb2YgdGFyZ2V0IHByb3ZpZGluZyBib3VuZFRoaXMgYXMgdGhlIHRoaXMgdmFsdWUgYW5kXG4gICAgICAgICAgICAgICAgLy8gICBwcm92aWRpbmcgYXJncyBhcyB0aGUgYXJndW1lbnRzLlxuXG4gICAgICAgICAgICAgICAgLy8gZXF1aXY6IHRhcmdldC5jYWxsKHRoaXMsIC4uLmJvdW5kQXJncywgLi4uYXJncylcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0LmFwcGx5KFxuICAgICAgICAgICAgICAgICAgICB0aGF0LFxuICAgICAgICAgICAgICAgICAgICBhcmdzLmNvbmNhdChhcnJheV9zbGljZS5jYWxsKGFyZ3VtZW50cykpXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gMTUuIElmIHRoZSBbW0NsYXNzXV0gaW50ZXJuYWwgcHJvcGVydHkgb2YgVGFyZ2V0IGlzIFwiRnVuY3Rpb25cIiwgdGhlblxuICAgICAgICAvLyAgICAgYS4gTGV0IEwgYmUgdGhlIGxlbmd0aCBwcm9wZXJ0eSBvZiBUYXJnZXQgbWludXMgdGhlIGxlbmd0aCBvZiBBLlxuICAgICAgICAvLyAgICAgYi4gU2V0IHRoZSBsZW5ndGggb3duIHByb3BlcnR5IG9mIEYgdG8gZWl0aGVyIDAgb3IgTCwgd2hpY2hldmVyIGlzXG4gICAgICAgIC8vICAgICAgIGxhcmdlci5cbiAgICAgICAgLy8gMTYuIEVsc2Ugc2V0IHRoZSBsZW5ndGggb3duIHByb3BlcnR5IG9mIEYgdG8gMC5cblxuICAgICAgICB2YXIgYm91bmRMZW5ndGggPSBNYXRoLm1heCgwLCB0YXJnZXQubGVuZ3RoIC0gYXJncy5sZW5ndGgpO1xuXG4gICAgICAgIC8vIDE3LiBTZXQgdGhlIGF0dHJpYnV0ZXMgb2YgdGhlIGxlbmd0aCBvd24gcHJvcGVydHkgb2YgRiB0byB0aGUgdmFsdWVzXG4gICAgICAgIC8vICAgc3BlY2lmaWVkIGluIDE1LjMuNS4xLlxuICAgICAgICB2YXIgYm91bmRBcmdzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm91bmRMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYm91bmRBcmdzLnB1c2goJyQnICsgaSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBYWFggQnVpbGQgYSBkeW5hbWljIGZ1bmN0aW9uIHdpdGggZGVzaXJlZCBhbW91bnQgb2YgYXJndW1lbnRzIGlzIHRoZSBvbmx5XG4gICAgICAgIC8vIHdheSB0byBzZXQgdGhlIGxlbmd0aCBwcm9wZXJ0eSBvZiBhIGZ1bmN0aW9uLlxuICAgICAgICAvLyBJbiBlbnZpcm9ubWVudHMgd2hlcmUgQ29udGVudCBTZWN1cml0eSBQb2xpY2llcyBlbmFibGVkIChDaHJvbWUgZXh0ZW5zaW9ucyxcbiAgICAgICAgLy8gZm9yIGV4LikgYWxsIHVzZSBvZiBldmFsIG9yIEZ1bmN0aW9uIGNvc3RydWN0b3IgdGhyb3dzIGFuIGV4Y2VwdGlvbi5cbiAgICAgICAgLy8gSG93ZXZlciBpbiBhbGwgb2YgdGhlc2UgZW52aXJvbm1lbnRzIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kIGV4aXN0c1xuICAgICAgICAvLyBhbmQgc28gdGhpcyBjb2RlIHdpbGwgbmV2ZXIgYmUgZXhlY3V0ZWQuXG4gICAgICAgIHZhciBib3VuZCA9IEZ1bmN0aW9uKCdiaW5kZXInLCAncmV0dXJuIGZ1bmN0aW9uICgnICsgYm91bmRBcmdzLmpvaW4oJywnKSArICcpeyByZXR1cm4gYmluZGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH0nKShiaW5kZXIpO1xuXG4gICAgICAgIGlmICh0YXJnZXQucHJvdG90eXBlKSB7XG4gICAgICAgICAgICBFbXB0eS5wcm90b3R5cGUgPSB0YXJnZXQucHJvdG90eXBlO1xuICAgICAgICAgICAgYm91bmQucHJvdG90eXBlID0gbmV3IEVtcHR5KCk7XG4gICAgICAgICAgICAvLyBDbGVhbiB1cCBkYW5nbGluZyByZWZlcmVuY2VzLlxuICAgICAgICAgICAgRW1wdHkucHJvdG90eXBlID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgLy8gMTguIFNldCB0aGUgW1tFeHRlbnNpYmxlXV0gaW50ZXJuYWwgcHJvcGVydHkgb2YgRiB0byB0cnVlLlxuXG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgLy8gMTkuIExldCB0aHJvd2VyIGJlIHRoZSBbW1Rocm93VHlwZUVycm9yXV0gZnVuY3Rpb24gT2JqZWN0ICgxMy4yLjMpLlxuICAgICAgICAvLyAyMC4gQ2FsbCB0aGUgW1tEZWZpbmVPd25Qcm9wZXJ0eV1dIGludGVybmFsIG1ldGhvZCBvZiBGIHdpdGhcbiAgICAgICAgLy8gICBhcmd1bWVudHMgXCJjYWxsZXJcIiwgUHJvcGVydHlEZXNjcmlwdG9yIHtbW0dldF1dOiB0aHJvd2VyLCBbW1NldF1dOlxuICAgICAgICAvLyAgIHRocm93ZXIsIFtbRW51bWVyYWJsZV1dOiBmYWxzZSwgW1tDb25maWd1cmFibGVdXTogZmFsc2V9LCBhbmRcbiAgICAgICAgLy8gICBmYWxzZS5cbiAgICAgICAgLy8gMjEuIENhbGwgdGhlIFtbRGVmaW5lT3duUHJvcGVydHldXSBpbnRlcm5hbCBtZXRob2Qgb2YgRiB3aXRoXG4gICAgICAgIC8vICAgYXJndW1lbnRzIFwiYXJndW1lbnRzXCIsIFByb3BlcnR5RGVzY3JpcHRvciB7W1tHZXRdXTogdGhyb3dlcixcbiAgICAgICAgLy8gICBbW1NldF1dOiB0aHJvd2VyLCBbW0VudW1lcmFibGVdXTogZmFsc2UsIFtbQ29uZmlndXJhYmxlXV06IGZhbHNlfSxcbiAgICAgICAgLy8gICBhbmQgZmFsc2UuXG5cbiAgICAgICAgLy8gVE9ET1xuICAgICAgICAvLyBOT1RFIEZ1bmN0aW9uIG9iamVjdHMgY3JlYXRlZCB1c2luZyBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCBkbyBub3RcbiAgICAgICAgLy8gaGF2ZSBhIHByb3RvdHlwZSBwcm9wZXJ0eSBvciB0aGUgW1tDb2RlXV0sIFtbRm9ybWFsUGFyYW1ldGVyc11dLCBhbmRcbiAgICAgICAgLy8gW1tTY29wZV1dIGludGVybmFsIHByb3BlcnRpZXMuXG4gICAgICAgIC8vIFhYWCBjYW4ndCBkZWxldGUgcHJvdG90eXBlIGluIHB1cmUtanMuXG5cbiAgICAgICAgLy8gMjIuIFJldHVybiBGLlxuICAgICAgICByZXR1cm4gYm91bmQ7XG4gICAgfVxufSk7XG5cbi8vXG4vLyBBcnJheVxuLy8gPT09PT1cbi8vXG5cbi8vIEVTNSAxNS40LjMuMlxuLy8gaHR0cDovL2VzNS5naXRodWIuY29tLyN4MTUuNC4zLjJcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L2lzQXJyYXlcbmRlZmluZVByb3BlcnRpZXMoQXJyYXksIHsgaXNBcnJheTogaXNBcnJheSB9KTtcblxuXG52YXIgYm94ZWRTdHJpbmcgPSBPYmplY3QoJ2EnKTtcbnZhciBzcGxpdFN0cmluZyA9IGJveGVkU3RyaW5nWzBdICE9PSAnYScgfHwgISgwIGluIGJveGVkU3RyaW5nKTtcblxudmFyIHByb3Blcmx5Qm94ZXNDb250ZXh0ID0gZnVuY3Rpb24gcHJvcGVybHlCb3hlZChtZXRob2QpIHtcbiAgICAvLyBDaGVjayBub2RlIDAuNi4yMSBidWcgd2hlcmUgdGhpcmQgcGFyYW1ldGVyIGlzIG5vdCBib3hlZFxuICAgIHZhciBwcm9wZXJseUJveGVzTm9uU3RyaWN0ID0gdHJ1ZTtcbiAgICB2YXIgcHJvcGVybHlCb3hlc1N0cmljdCA9IHRydWU7XG4gICAgaWYgKG1ldGhvZCkge1xuICAgICAgICBtZXRob2QuY2FsbCgnZm9vJywgZnVuY3Rpb24gKF8sIF9fLCBjb250ZXh0KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRleHQgIT09ICdvYmplY3QnKSB7IHByb3Blcmx5Qm94ZXNOb25TdHJpY3QgPSBmYWxzZTsgfVxuICAgICAgICB9KTtcblxuICAgICAgICBtZXRob2QuY2FsbChbMV0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICd1c2Ugc3RyaWN0JztcbiAgICAgICAgICAgIHByb3Blcmx5Qm94ZXNTdHJpY3QgPSB0eXBlb2YgdGhpcyA9PT0gJ3N0cmluZyc7XG4gICAgICAgIH0sICd4Jyk7XG4gICAgfVxuICAgIHJldHVybiAhIW1ldGhvZCAmJiBwcm9wZXJseUJveGVzTm9uU3RyaWN0ICYmIHByb3Blcmx5Qm94ZXNTdHJpY3Q7XG59O1xuXG5kZWZpbmVQcm9wZXJ0aWVzKEFycmF5UHJvdG90eXBlLCB7XG4gICAgZm9yRWFjaDogZnVuY3Rpb24gZm9yRWFjaChmdW4gLyosIHRoaXNwKi8pIHtcbiAgICAgICAgdmFyIG9iamVjdCA9IHRvT2JqZWN0KHRoaXMpLFxuICAgICAgICAgICAgc2VsZiA9IHNwbGl0U3RyaW5nICYmIGlzU3RyaW5nKHRoaXMpID8gdGhpcy5zcGxpdCgnJykgOiBvYmplY3QsXG4gICAgICAgICAgICB0aGlzcCA9IGFyZ3VtZW50c1sxXSxcbiAgICAgICAgICAgIGkgPSAtMSxcbiAgICAgICAgICAgIGxlbmd0aCA9IHNlbGYubGVuZ3RoID4+PiAwO1xuXG4gICAgICAgIC8vIElmIG5vIGNhbGxiYWNrIGZ1bmN0aW9uIG9yIGlmIGNhbGxiYWNrIGlzIG5vdCBhIGNhbGxhYmxlIGZ1bmN0aW9uXG4gICAgICAgIGlmICghaXNGdW5jdGlvbihmdW4pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7IC8vIFRPRE8gbWVzc2FnZVxuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKCsraSA8IGxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGkgaW4gc2VsZikge1xuICAgICAgICAgICAgICAgIC8vIEludm9rZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBjYWxsLCBwYXNzaW5nIGFyZ3VtZW50czpcbiAgICAgICAgICAgICAgICAvLyBjb250ZXh0LCBwcm9wZXJ0eSB2YWx1ZSwgcHJvcGVydHkga2V5LCB0aGlzQXJnIG9iamVjdFxuICAgICAgICAgICAgICAgIC8vIGNvbnRleHRcbiAgICAgICAgICAgICAgICBmdW4uY2FsbCh0aGlzcCwgc2VsZltpXSwgaSwgb2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0sICFwcm9wZXJseUJveGVzQ29udGV4dChBcnJheVByb3RvdHlwZS5mb3JFYWNoKSk7XG5cbi8vIEVTNSAxNS40LjQuMTRcbi8vIGh0dHA6Ly9lczUuZ2l0aHViLmNvbS8jeDE1LjQuNC4xNFxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvaW5kZXhPZlxudmFyIGhhc0ZpcmVmb3gySW5kZXhPZkJ1ZyA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mICYmIFswLCAxXS5pbmRleE9mKDEsIDIpICE9PSAtMTtcbmRlZmluZVByb3BlcnRpZXMoQXJyYXlQcm90b3R5cGUsIHtcbiAgICBpbmRleE9mOiBmdW5jdGlvbiBpbmRleE9mKHNvdWdodCAvKiwgZnJvbUluZGV4ICovICkge1xuICAgICAgICB2YXIgc2VsZiA9IHNwbGl0U3RyaW5nICYmIGlzU3RyaW5nKHRoaXMpID8gdGhpcy5zcGxpdCgnJykgOiB0b09iamVjdCh0aGlzKSxcbiAgICAgICAgICAgIGxlbmd0aCA9IHNlbGYubGVuZ3RoID4+PiAwO1xuXG4gICAgICAgIGlmICghbGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgaSA9IHRvSW50ZWdlcihhcmd1bWVudHNbMV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaGFuZGxlIG5lZ2F0aXZlIGluZGljZXNcbiAgICAgICAgaSA9IGkgPj0gMCA/IGkgOiBNYXRoLm1heCgwLCBsZW5ndGggKyBpKTtcbiAgICAgICAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgaW4gc2VsZiAmJiBzZWxmW2ldID09PSBzb3VnaHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxufSwgaGFzRmlyZWZveDJJbmRleE9mQnVnKTtcblxuLy9cbi8vIFN0cmluZ1xuLy8gPT09PT09XG4vL1xuXG4vLyBFUzUgMTUuNS40LjE0XG4vLyBodHRwOi8vZXM1LmdpdGh1Yi5jb20vI3gxNS41LjQuMTRcblxuLy8gW2J1Z2ZpeCwgSUUgbHQgOSwgZmlyZWZveCA0LCBLb25xdWVyb3IsIE9wZXJhLCBvYnNjdXJlIGJyb3dzZXJzXVxuLy8gTWFueSBicm93c2VycyBkbyBub3Qgc3BsaXQgcHJvcGVybHkgd2l0aCByZWd1bGFyIGV4cHJlc3Npb25zIG9yIHRoZXlcbi8vIGRvIG5vdCBwZXJmb3JtIHRoZSBzcGxpdCBjb3JyZWN0bHkgdW5kZXIgb2JzY3VyZSBjb25kaXRpb25zLlxuLy8gU2VlIGh0dHA6Ly9ibG9nLnN0ZXZlbmxldml0aGFuLmNvbS9hcmNoaXZlcy9jcm9zcy1icm93c2VyLXNwbGl0XG4vLyBJJ3ZlIHRlc3RlZCBpbiBtYW55IGJyb3dzZXJzIGFuZCB0aGlzIHNlZW1zIHRvIGNvdmVyIHRoZSBkZXZpYW50IG9uZXM6XG4vLyAgICAnYWInLnNwbGl0KC8oPzphYikqLykgc2hvdWxkIGJlIFtcIlwiLCBcIlwiXSwgbm90IFtcIlwiXVxuLy8gICAgJy4nLnNwbGl0KC8oLj8pKC4/KS8pIHNob3VsZCBiZSBbXCJcIiwgXCIuXCIsIFwiXCIsIFwiXCJdLCBub3QgW1wiXCIsIFwiXCJdXG4vLyAgICAndGVzc3QnLnNwbGl0KC8ocykqLykgc2hvdWxkIGJlIFtcInRcIiwgdW5kZWZpbmVkLCBcImVcIiwgXCJzXCIsIFwidFwiXSwgbm90XG4vLyAgICAgICBbdW5kZWZpbmVkLCBcInRcIiwgdW5kZWZpbmVkLCBcImVcIiwgLi4uXVxuLy8gICAgJycuc3BsaXQoLy4/Lykgc2hvdWxkIGJlIFtdLCBub3QgW1wiXCJdXG4vLyAgICAnLicuc3BsaXQoLygpKCkvKSBzaG91bGQgYmUgW1wiLlwiXSwgbm90IFtcIlwiLCBcIlwiLCBcIi5cIl1cblxudmFyIHN0cmluZ19zcGxpdCA9IFN0cmluZ1Byb3RvdHlwZS5zcGxpdDtcbmlmIChcbiAgICAnYWInLnNwbGl0KC8oPzphYikqLykubGVuZ3RoICE9PSAyIHx8XG4gICAgJy4nLnNwbGl0KC8oLj8pKC4/KS8pLmxlbmd0aCAhPT0gNCB8fFxuICAgICd0ZXNzdCcuc3BsaXQoLyhzKSovKVsxXSA9PT0gJ3QnIHx8XG4gICAgJ3Rlc3QnLnNwbGl0KC8oPzopLywgLTEpLmxlbmd0aCAhPT0gNCB8fFxuICAgICcnLnNwbGl0KC8uPy8pLmxlbmd0aCB8fFxuICAgICcuJy5zcGxpdCgvKCkoKS8pLmxlbmd0aCA+IDFcbikge1xuICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb21wbGlhbnRFeGVjTnBjZyA9IC8oKT8/Ly5leGVjKCcnKVsxXSA9PT0gdm9pZCAwOyAvLyBOUENHOiBub25wYXJ0aWNpcGF0aW5nIGNhcHR1cmluZyBncm91cFxuXG4gICAgICAgIFN0cmluZ1Byb3RvdHlwZS5zcGxpdCA9IGZ1bmN0aW9uIChzZXBhcmF0b3IsIGxpbWl0KSB7XG4gICAgICAgICAgICB2YXIgc3RyaW5nID0gdGhpcztcbiAgICAgICAgICAgIGlmIChzZXBhcmF0b3IgPT09IHZvaWQgMCAmJiBsaW1pdCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSWYgYHNlcGFyYXRvcmAgaXMgbm90IGEgcmVnZXgsIHVzZSBuYXRpdmUgc3BsaXRcbiAgICAgICAgICAgIGlmIChfdG9TdHJpbmcuY2FsbChzZXBhcmF0b3IpICE9PSAnW29iamVjdCBSZWdFeHBdJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmdfc3BsaXQuY2FsbCh0aGlzLCBzZXBhcmF0b3IsIGxpbWl0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG91dHB1dCA9IFtdLFxuICAgICAgICAgICAgICAgIGZsYWdzID0gKHNlcGFyYXRvci5pZ25vcmVDYXNlID8gJ2knIDogJycpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIChzZXBhcmF0b3IubXVsdGlsaW5lICA/ICdtJyA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAoc2VwYXJhdG9yLmV4dGVuZGVkICAgPyAneCcgOiAnJykgKyAvLyBQcm9wb3NlZCBmb3IgRVM2XG4gICAgICAgICAgICAgICAgICAgICAgICAoc2VwYXJhdG9yLnN0aWNreSAgICAgPyAneScgOiAnJyksIC8vIEZpcmVmb3ggMytcbiAgICAgICAgICAgICAgICBsYXN0TGFzdEluZGV4ID0gMCxcbiAgICAgICAgICAgICAgICAvLyBNYWtlIGBnbG9iYWxgIGFuZCBhdm9pZCBgbGFzdEluZGV4YCBpc3N1ZXMgYnkgd29ya2luZyB3aXRoIGEgY29weVxuICAgICAgICAgICAgICAgIHNlcGFyYXRvcjIsIG1hdGNoLCBsYXN0SW5kZXgsIGxhc3RMZW5ndGg7XG4gICAgICAgICAgICBzZXBhcmF0b3IgPSBuZXcgUmVnRXhwKHNlcGFyYXRvci5zb3VyY2UsIGZsYWdzICsgJ2cnKTtcbiAgICAgICAgICAgIHN0cmluZyArPSAnJzsgLy8gVHlwZS1jb252ZXJ0XG4gICAgICAgICAgICBpZiAoIWNvbXBsaWFudEV4ZWNOcGNnKSB7XG4gICAgICAgICAgICAgICAgLy8gRG9lc24ndCBuZWVkIGZsYWdzIGd5LCBidXQgdGhleSBkb24ndCBodXJ0XG4gICAgICAgICAgICAgICAgc2VwYXJhdG9yMiA9IG5ldyBSZWdFeHAoJ14nICsgc2VwYXJhdG9yLnNvdXJjZSArICckKD8hXFxcXHMpJywgZmxhZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyogVmFsdWVzIGZvciBgbGltaXRgLCBwZXIgdGhlIHNwZWM6XG4gICAgICAgICAgICAgKiBJZiB1bmRlZmluZWQ6IDQyOTQ5NjcyOTUgLy8gTWF0aC5wb3coMiwgMzIpIC0gMVxuICAgICAgICAgICAgICogSWYgMCwgSW5maW5pdHksIG9yIE5hTjogMFxuICAgICAgICAgICAgICogSWYgcG9zaXRpdmUgbnVtYmVyOiBsaW1pdCA9IE1hdGguZmxvb3IobGltaXQpOyBpZiAobGltaXQgPiA0Mjk0OTY3Mjk1KSBsaW1pdCAtPSA0Mjk0OTY3Mjk2O1xuICAgICAgICAgICAgICogSWYgbmVnYXRpdmUgbnVtYmVyOiA0Mjk0OTY3Mjk2IC0gTWF0aC5mbG9vcihNYXRoLmFicyhsaW1pdCkpXG4gICAgICAgICAgICAgKiBJZiBvdGhlcjogVHlwZS1jb252ZXJ0LCB0aGVuIHVzZSB0aGUgYWJvdmUgcnVsZXNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgbGltaXQgPSBsaW1pdCA9PT0gdm9pZCAwID9cbiAgICAgICAgICAgICAgICAtMSA+Pj4gMCA6IC8vIE1hdGgucG93KDIsIDMyKSAtIDFcbiAgICAgICAgICAgICAgICBUb1VpbnQzMihsaW1pdCk7XG4gICAgICAgICAgICB3aGlsZSAobWF0Y2ggPSBzZXBhcmF0b3IuZXhlYyhzdHJpbmcpKSB7XG4gICAgICAgICAgICAgICAgLy8gYHNlcGFyYXRvci5sYXN0SW5kZXhgIGlzIG5vdCByZWxpYWJsZSBjcm9zcy1icm93c2VyXG4gICAgICAgICAgICAgICAgbGFzdEluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgaWYgKGxhc3RJbmRleCA+IGxhc3RMYXN0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goc3RyaW5nLnNsaWNlKGxhc3RMYXN0SW5kZXgsIG1hdGNoLmluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIEZpeCBicm93c2VycyB3aG9zZSBgZXhlY2AgbWV0aG9kcyBkb24ndCBjb25zaXN0ZW50bHkgcmV0dXJuIGB1bmRlZmluZWRgIGZvclxuICAgICAgICAgICAgICAgICAgICAvLyBub25wYXJ0aWNpcGF0aW5nIGNhcHR1cmluZyBncm91cHNcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb21wbGlhbnRFeGVjTnBjZyAmJiBtYXRjaC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaFswXS5yZXBsYWNlKHNlcGFyYXRvcjIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGggLSAyOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50c1tpXSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaFtpXSA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaC5sZW5ndGggPiAxICYmIG1hdGNoLmluZGV4IDwgc3RyaW5nLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgQXJyYXlQcm90b3R5cGUucHVzaC5hcHBseShvdXRwdXQsIG1hdGNoLnNsaWNlKDEpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsYXN0TGVuZ3RoID0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBsYXN0TGFzdEluZGV4ID0gbGFzdEluZGV4O1xuICAgICAgICAgICAgICAgICAgICBpZiAob3V0cHV0Lmxlbmd0aCA+PSBsaW1pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNlcGFyYXRvci5sYXN0SW5kZXggPT09IG1hdGNoLmluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHNlcGFyYXRvci5sYXN0SW5kZXgrKzsgLy8gQXZvaWQgYW4gaW5maW5pdGUgbG9vcFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsYXN0TGFzdEluZGV4ID09PSBzdHJpbmcubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxhc3RMZW5ndGggfHwgIXNlcGFyYXRvci50ZXN0KCcnKSkge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCgnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChzdHJpbmcuc2xpY2UobGFzdExhc3RJbmRleCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dC5sZW5ndGggPiBsaW1pdCA/IG91dHB1dC5zbGljZSgwLCBsaW1pdCkgOiBvdXRwdXQ7XG4gICAgICAgIH07XG4gICAgfSgpKTtcblxuLy8gW2J1Z2ZpeCwgY2hyb21lXVxuLy8gSWYgc2VwYXJhdG9yIGlzIHVuZGVmaW5lZCwgdGhlbiB0aGUgcmVzdWx0IGFycmF5IGNvbnRhaW5zIGp1c3Qgb25lIFN0cmluZyxcbi8vIHdoaWNoIGlzIHRoZSB0aGlzIHZhbHVlIChjb252ZXJ0ZWQgdG8gYSBTdHJpbmcpLiBJZiBsaW1pdCBpcyBub3QgdW5kZWZpbmVkLFxuLy8gdGhlbiB0aGUgb3V0cHV0IGFycmF5IGlzIHRydW5jYXRlZCBzbyB0aGF0IGl0IGNvbnRhaW5zIG5vIG1vcmUgdGhhbiBsaW1pdFxuLy8gZWxlbWVudHMuXG4vLyBcIjBcIi5zcGxpdCh1bmRlZmluZWQsIDApIC0+IFtdXG59IGVsc2UgaWYgKCcwJy5zcGxpdCh2b2lkIDAsIDApLmxlbmd0aCkge1xuICAgIFN0cmluZ1Byb3RvdHlwZS5zcGxpdCA9IGZ1bmN0aW9uIHNwbGl0KHNlcGFyYXRvciwgbGltaXQpIHtcbiAgICAgICAgaWYgKHNlcGFyYXRvciA9PT0gdm9pZCAwICYmIGxpbWl0ID09PSAwKSB7IHJldHVybiBbXTsgfVxuICAgICAgICByZXR1cm4gc3RyaW5nX3NwbGl0LmNhbGwodGhpcywgc2VwYXJhdG9yLCBsaW1pdCk7XG4gICAgfTtcbn1cblxuLy8gRUNNQS0yNjIsIDNyZCBCLjIuM1xuLy8gTm90IGFuIEVDTUFTY3JpcHQgc3RhbmRhcmQsIGFsdGhvdWdoIEVDTUFTY3JpcHQgM3JkIEVkaXRpb24gaGFzIGFcbi8vIG5vbi1ub3JtYXRpdmUgc2VjdGlvbiBzdWdnZXN0aW5nIHVuaWZvcm0gc2VtYW50aWNzIGFuZCBpdCBzaG91bGQgYmVcbi8vIG5vcm1hbGl6ZWQgYWNyb3NzIGFsbCBicm93c2Vyc1xuLy8gW2J1Z2ZpeCwgSUUgbHQgOV0gSUUgPCA5IHN1YnN0cigpIHdpdGggbmVnYXRpdmUgdmFsdWUgbm90IHdvcmtpbmcgaW4gSUVcbnZhciBzdHJpbmdfc3Vic3RyID0gU3RyaW5nUHJvdG90eXBlLnN1YnN0cjtcbnZhciBoYXNOZWdhdGl2ZVN1YnN0ckJ1ZyA9ICcnLnN1YnN0ciAmJiAnMGInLnN1YnN0cigtMSkgIT09ICdiJztcbmRlZmluZVByb3BlcnRpZXMoU3RyaW5nUHJvdG90eXBlLCB7XG4gICAgc3Vic3RyOiBmdW5jdGlvbiBzdWJzdHIoc3RhcnQsIGxlbmd0aCkge1xuICAgICAgICByZXR1cm4gc3RyaW5nX3N1YnN0ci5jYWxsKFxuICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgIHN0YXJ0IDwgMCA/ICgoc3RhcnQgPSB0aGlzLmxlbmd0aCArIHN0YXJ0KSA8IDAgPyAwIDogc3RhcnQpIDogc3RhcnQsXG4gICAgICAgICAgICBsZW5ndGhcbiAgICAgICAgKTtcbiAgICB9XG59LCBoYXNOZWdhdGl2ZVN1YnN0ckJ1Zyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gW1xuICAvLyBzdHJlYW1pbmcgdHJhbnNwb3J0c1xuICByZXF1aXJlKCcuL3RyYW5zcG9ydC93ZWJzb2NrZXQnKVxuLCByZXF1aXJlKCcuL3RyYW5zcG9ydC94aHItc3RyZWFtaW5nJylcbiwgcmVxdWlyZSgnLi90cmFuc3BvcnQveGRyLXN0cmVhbWluZycpXG4sIHJlcXVpcmUoJy4vdHJhbnNwb3J0L2V2ZW50c291cmNlJylcbiwgcmVxdWlyZSgnLi90cmFuc3BvcnQvbGliL2lmcmFtZS13cmFwJykocmVxdWlyZSgnLi90cmFuc3BvcnQvZXZlbnRzb3VyY2UnKSlcblxuICAvLyBwb2xsaW5nIHRyYW5zcG9ydHNcbiwgcmVxdWlyZSgnLi90cmFuc3BvcnQvaHRtbGZpbGUnKVxuLCByZXF1aXJlKCcuL3RyYW5zcG9ydC9saWIvaWZyYW1lLXdyYXAnKShyZXF1aXJlKCcuL3RyYW5zcG9ydC9odG1sZmlsZScpKVxuLCByZXF1aXJlKCcuL3RyYW5zcG9ydC94aHItcG9sbGluZycpXG4sIHJlcXVpcmUoJy4vdHJhbnNwb3J0L3hkci1wb2xsaW5nJylcbiwgcmVxdWlyZSgnLi90cmFuc3BvcnQvbGliL2lmcmFtZS13cmFwJykocmVxdWlyZSgnLi90cmFuc3BvcnQveGhyLXBvbGxpbmcnKSlcbiwgcmVxdWlyZSgnLi90cmFuc3BvcnQvanNvbnAtcG9sbGluZycpXG5dO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyXG4gICwgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG4gICwgdXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy9ldmVudCcpXG4gICwgdXJsVXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy91cmwnKVxuICAsIFhIUiA9IGdsb2JhbC5YTUxIdHRwUmVxdWVzdFxuICA7XG5cbnZhciBkZWJ1ZyA9IGZ1bmN0aW9uKCkge307XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tqcy1jbGllbnQ6YnJvd3Nlcjp4aHInKTtcbn1cblxuZnVuY3Rpb24gQWJzdHJhY3RYSFJPYmplY3QobWV0aG9kLCB1cmwsIHBheWxvYWQsIG9wdHMpIHtcbiAgZGVidWcobWV0aG9kLCB1cmwpO1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIEV2ZW50RW1pdHRlci5jYWxsKHRoaXMpO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHNlbGYuX3N0YXJ0KG1ldGhvZCwgdXJsLCBwYXlsb2FkLCBvcHRzKTtcbiAgfSwgMCk7XG59XG5cbmluaGVyaXRzKEFic3RyYWN0WEhST2JqZWN0LCBFdmVudEVtaXR0ZXIpO1xuXG5BYnN0cmFjdFhIUk9iamVjdC5wcm90b3R5cGUuX3N0YXJ0ID0gZnVuY3Rpb24obWV0aG9kLCB1cmwsIHBheWxvYWQsIG9wdHMpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHRyeSB7XG4gICAgdGhpcy54aHIgPSBuZXcgWEhSKCk7XG4gIH0gY2F0Y2ggKHgpIHtcbiAgICAvLyBpbnRlbnRpb25hbGx5IGVtcHR5XG4gIH1cblxuICBpZiAoIXRoaXMueGhyKSB7XG4gICAgZGVidWcoJ25vIHhocicpO1xuICAgIHRoaXMuZW1pdCgnZmluaXNoJywgMCwgJ25vIHhociBzdXBwb3J0Jyk7XG4gICAgdGhpcy5fY2xlYW51cCgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIHNldmVyYWwgYnJvd3NlcnMgY2FjaGUgUE9TVHNcbiAgdXJsID0gdXJsVXRpbHMuYWRkUXVlcnkodXJsLCAndD0nICsgKCtuZXcgRGF0ZSgpKSk7XG5cbiAgLy8gRXhwbG9yZXIgdGVuZHMgdG8ga2VlcCBjb25uZWN0aW9uIG9wZW4sIGV2ZW4gYWZ0ZXIgdGhlXG4gIC8vIHRhYiBnZXRzIGNsb3NlZDogaHR0cDovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvNTI4MFxuICB0aGlzLnVubG9hZFJlZiA9IHV0aWxzLnVubG9hZEFkZChmdW5jdGlvbigpIHtcbiAgICBkZWJ1ZygndW5sb2FkIGNsZWFudXAnKTtcbiAgICBzZWxmLl9jbGVhbnVwKHRydWUpO1xuICB9KTtcbiAgdHJ5IHtcbiAgICB0aGlzLnhoci5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKTtcbiAgICBpZiAodGhpcy50aW1lb3V0ICYmICd0aW1lb3V0JyBpbiB0aGlzLnhocikge1xuICAgICAgdGhpcy54aHIudGltZW91dCA9IHRoaXMudGltZW91dDtcbiAgICAgIHRoaXMueGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBkZWJ1ZygneGhyIHRpbWVvdXQnKTtcbiAgICAgICAgc2VsZi5lbWl0KCdmaW5pc2gnLCAwLCAnJyk7XG4gICAgICAgIHNlbGYuX2NsZWFudXAoZmFsc2UpO1xuICAgICAgfTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBkZWJ1ZygnZXhjZXB0aW9uJywgZSk7XG4gICAgLy8gSUUgcmFpc2VzIGFuIGV4Y2VwdGlvbiBvbiB3cm9uZyBwb3J0LlxuICAgIHRoaXMuZW1pdCgnZmluaXNoJywgMCwgJycpO1xuICAgIHRoaXMuX2NsZWFudXAoZmFsc2UpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICgoIW9wdHMgfHwgIW9wdHMubm9DcmVkZW50aWFscykgJiYgQWJzdHJhY3RYSFJPYmplY3Quc3VwcG9ydHNDT1JTKSB7XG4gICAgZGVidWcoJ3dpdGhDcmVkZW50aWFscycpO1xuICAgIC8vIE1vemlsbGEgZG9jcyBzYXlzIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL1hNTEh0dHBSZXF1ZXN0IDpcbiAgICAvLyBcIlRoaXMgbmV2ZXIgYWZmZWN0cyBzYW1lLXNpdGUgcmVxdWVzdHMuXCJcblxuICAgIHRoaXMueGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gIH1cbiAgaWYgKG9wdHMgJiYgb3B0cy5oZWFkZXJzKSB7XG4gICAgZm9yICh2YXIga2V5IGluIG9wdHMuaGVhZGVycykge1xuICAgICAgdGhpcy54aHIuc2V0UmVxdWVzdEhlYWRlcihrZXksIG9wdHMuaGVhZGVyc1trZXldKTtcbiAgICB9XG4gIH1cblxuICB0aGlzLnhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoc2VsZi54aHIpIHtcbiAgICAgIHZhciB4ID0gc2VsZi54aHI7XG4gICAgICB2YXIgdGV4dCwgc3RhdHVzO1xuICAgICAgZGVidWcoJ3JlYWR5U3RhdGUnLCB4LnJlYWR5U3RhdGUpO1xuICAgICAgc3dpdGNoICh4LnJlYWR5U3RhdGUpIHtcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgLy8gSUUgZG9lc24ndCBsaWtlIHBlZWtpbmcgaW50byByZXNwb25zZVRleHQgb3Igc3RhdHVzXG4gICAgICAgIC8vIG9uIE1pY3Jvc29mdC5YTUxIVFRQIGFuZCByZWFkeXN0YXRlPTNcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzdGF0dXMgPSB4LnN0YXR1cztcbiAgICAgICAgICB0ZXh0ID0geC5yZXNwb25zZVRleHQ7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpbnRlbnRpb25hbGx5IGVtcHR5XG4gICAgICAgIH1cbiAgICAgICAgZGVidWcoJ3N0YXR1cycsIHN0YXR1cyk7XG4gICAgICAgIC8vIElFIHJldHVybnMgMTIyMyBmb3IgMjA0OiBodHRwOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xNDUwXG4gICAgICAgIGlmIChzdGF0dXMgPT09IDEyMjMpIHtcbiAgICAgICAgICBzdGF0dXMgPSAyMDQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJRSBkb2VzIHJldHVybiByZWFkeXN0YXRlID09IDMgZm9yIDQwNCBhbnN3ZXJzLlxuICAgICAgICBpZiAoc3RhdHVzID09PSAyMDAgJiYgdGV4dCAmJiB0ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBkZWJ1ZygnY2h1bmsnKTtcbiAgICAgICAgICBzZWxmLmVtaXQoJ2NodW5rJywgc3RhdHVzLCB0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgc3RhdHVzID0geC5zdGF0dXM7XG4gICAgICAgIGRlYnVnKCdzdGF0dXMnLCBzdGF0dXMpO1xuICAgICAgICAvLyBJRSByZXR1cm5zIDEyMjMgZm9yIDIwNDogaHR0cDovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTQ1MFxuICAgICAgICBpZiAoc3RhdHVzID09PSAxMjIzKSB7XG4gICAgICAgICAgc3RhdHVzID0gMjA0O1xuICAgICAgICB9XG4gICAgICAgIC8vIElFIHJldHVybnMgdGhpcyBmb3IgYSBiYWQgcG9ydFxuICAgICAgICAvLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvd2luZG93cy9kZXNrdG9wL2FhMzgzNzcwKHY9dnMuODUpLmFzcHhcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gMTIwMDUgfHwgc3RhdHVzID09PSAxMjAyOSkge1xuICAgICAgICAgIHN0YXR1cyA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBkZWJ1ZygnZmluaXNoJywgc3RhdHVzLCB4LnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIHNlbGYuZW1pdCgnZmluaXNoJywgc3RhdHVzLCB4LnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIHNlbGYuX2NsZWFudXAoZmFsc2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdHJ5IHtcbiAgICBzZWxmLnhoci5zZW5kKHBheWxvYWQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgc2VsZi5lbWl0KCdmaW5pc2gnLCAwLCAnJyk7XG4gICAgc2VsZi5fY2xlYW51cChmYWxzZSk7XG4gIH1cbn07XG5cbkFic3RyYWN0WEhST2JqZWN0LnByb3RvdHlwZS5fY2xlYW51cCA9IGZ1bmN0aW9uKGFib3J0KSB7XG4gIGRlYnVnKCdjbGVhbnVwJyk7XG4gIGlmICghdGhpcy54aHIpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgdXRpbHMudW5sb2FkRGVsKHRoaXMudW5sb2FkUmVmKTtcblxuICAvLyBJRSBuZWVkcyB0aGlzIGZpZWxkIHRvIGJlIGEgZnVuY3Rpb25cbiAgdGhpcy54aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7fTtcbiAgaWYgKHRoaXMueGhyLm9udGltZW91dCkge1xuICAgIHRoaXMueGhyLm9udGltZW91dCA9IG51bGw7XG4gIH1cblxuICBpZiAoYWJvcnQpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy54aHIuYWJvcnQoKTtcbiAgICB9IGNhdGNoICh4KSB7XG4gICAgICAvLyBpbnRlbnRpb25hbGx5IGVtcHR5XG4gICAgfVxuICB9XG4gIHRoaXMudW5sb2FkUmVmID0gdGhpcy54aHIgPSBudWxsO1xufTtcblxuQWJzdHJhY3RYSFJPYmplY3QucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIGRlYnVnKCdjbG9zZScpO1xuICB0aGlzLl9jbGVhbnVwKHRydWUpO1xufTtcblxuQWJzdHJhY3RYSFJPYmplY3QuZW5hYmxlZCA9ICEhWEhSO1xuLy8gb3ZlcnJpZGUgWE1MSHR0cFJlcXVlc3QgZm9yIElFNi83XG4vLyBvYmZ1c2NhdGUgdG8gYXZvaWQgZmlyZXdhbGxzXG52YXIgYXhvID0gWydBY3RpdmUnXS5jb25jYXQoJ09iamVjdCcpLmpvaW4oJ1gnKTtcbmlmICghQWJzdHJhY3RYSFJPYmplY3QuZW5hYmxlZCAmJiAoYXhvIGluIGdsb2JhbCkpIHtcbiAgZGVidWcoJ292ZXJyaWRpbmcgeG1saHR0cHJlcXVlc3QnKTtcbiAgWEhSID0gZnVuY3Rpb24oKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBuZXcgZ2xvYmFsW2F4b10oJ01pY3Jvc29mdC5YTUxIVFRQJyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9O1xuICBBYnN0cmFjdFhIUk9iamVjdC5lbmFibGVkID0gISFuZXcgWEhSKCk7XG59XG5cbnZhciBjb3JzID0gZmFsc2U7XG50cnkge1xuICBjb3JzID0gJ3dpdGhDcmVkZW50aWFscycgaW4gbmV3IFhIUigpO1xufSBjYXRjaCAoaWdub3JlZCkge1xuICAvLyBpbnRlbnRpb25hbGx5IGVtcHR5XG59XG5cbkFic3RyYWN0WEhST2JqZWN0LnN1cHBvcnRzQ09SUyA9IGNvcnM7XG5cbm1vZHVsZS5leHBvcnRzID0gQWJzdHJhY3RYSFJPYmplY3Q7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbC5FdmVudFNvdXJjZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIERyaXZlciA9IGdsb2JhbC5XZWJTb2NrZXQgfHwgZ2xvYmFsLk1veldlYlNvY2tldDtcbmlmIChEcml2ZXIpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBXZWJTb2NrZXRCcm93c2VyRHJpdmVyKHVybCkge1xuXHRcdHJldHVybiBuZXcgRHJpdmVyKHVybCk7XG5cdH07XG59IGVsc2Uge1xuXHRtb2R1bGUuZXhwb3J0cyA9IHVuZGVmaW5lZDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKVxuICAsIEFqYXhCYXNlZFRyYW5zcG9ydCA9IHJlcXVpcmUoJy4vbGliL2FqYXgtYmFzZWQnKVxuICAsIEV2ZW50U291cmNlUmVjZWl2ZXIgPSByZXF1aXJlKCcuL3JlY2VpdmVyL2V2ZW50c291cmNlJylcbiAgLCBYSFJDb3JzT2JqZWN0ID0gcmVxdWlyZSgnLi9zZW5kZXIveGhyLWNvcnMnKVxuICAsIEV2ZW50U291cmNlRHJpdmVyID0gcmVxdWlyZSgnZXZlbnRzb3VyY2UnKVxuICA7XG5cbmZ1bmN0aW9uIEV2ZW50U291cmNlVHJhbnNwb3J0KHRyYW5zVXJsKSB7XG4gIGlmICghRXZlbnRTb3VyY2VUcmFuc3BvcnQuZW5hYmxlZCgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUcmFuc3BvcnQgY3JlYXRlZCB3aGVuIGRpc2FibGVkJyk7XG4gIH1cblxuICBBamF4QmFzZWRUcmFuc3BvcnQuY2FsbCh0aGlzLCB0cmFuc1VybCwgJy9ldmVudHNvdXJjZScsIEV2ZW50U291cmNlUmVjZWl2ZXIsIFhIUkNvcnNPYmplY3QpO1xufVxuXG5pbmhlcml0cyhFdmVudFNvdXJjZVRyYW5zcG9ydCwgQWpheEJhc2VkVHJhbnNwb3J0KTtcblxuRXZlbnRTb3VyY2VUcmFuc3BvcnQuZW5hYmxlZCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gISFFdmVudFNvdXJjZURyaXZlcjtcbn07XG5cbkV2ZW50U291cmNlVHJhbnNwb3J0LnRyYW5zcG9ydE5hbWUgPSAnZXZlbnRzb3VyY2UnO1xuRXZlbnRTb3VyY2VUcmFuc3BvcnQucm91bmRUcmlwcyA9IDI7XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRTb3VyY2VUcmFuc3BvcnQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJylcbiAgLCBIdG1sZmlsZVJlY2VpdmVyID0gcmVxdWlyZSgnLi9yZWNlaXZlci9odG1sZmlsZScpXG4gICwgWEhSTG9jYWxPYmplY3QgPSByZXF1aXJlKCcuL3NlbmRlci94aHItbG9jYWwnKVxuICAsIEFqYXhCYXNlZFRyYW5zcG9ydCA9IHJlcXVpcmUoJy4vbGliL2FqYXgtYmFzZWQnKVxuICA7XG5cbmZ1bmN0aW9uIEh0bWxGaWxlVHJhbnNwb3J0KHRyYW5zVXJsKSB7XG4gIGlmICghSHRtbGZpbGVSZWNlaXZlci5lbmFibGVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUcmFuc3BvcnQgY3JlYXRlZCB3aGVuIGRpc2FibGVkJyk7XG4gIH1cbiAgQWpheEJhc2VkVHJhbnNwb3J0LmNhbGwodGhpcywgdHJhbnNVcmwsICcvaHRtbGZpbGUnLCBIdG1sZmlsZVJlY2VpdmVyLCBYSFJMb2NhbE9iamVjdCk7XG59XG5cbmluaGVyaXRzKEh0bWxGaWxlVHJhbnNwb3J0LCBBamF4QmFzZWRUcmFuc3BvcnQpO1xuXG5IdG1sRmlsZVRyYW5zcG9ydC5lbmFibGVkID0gZnVuY3Rpb24oaW5mbykge1xuICByZXR1cm4gSHRtbGZpbGVSZWNlaXZlci5lbmFibGVkICYmIGluZm8uc2FtZU9yaWdpbjtcbn07XG5cbkh0bWxGaWxlVHJhbnNwb3J0LnRyYW5zcG9ydE5hbWUgPSAnaHRtbGZpbGUnO1xuSHRtbEZpbGVUcmFuc3BvcnQucm91bmRUcmlwcyA9IDI7XG5cbm1vZHVsZS5leHBvcnRzID0gSHRtbEZpbGVUcmFuc3BvcnQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIEZldyBjb29sIHRyYW5zcG9ydHMgZG8gd29yayBvbmx5IGZvciBzYW1lLW9yaWdpbi4gSW4gb3JkZXIgdG8gbWFrZVxuLy8gdGhlbSB3b3JrIGNyb3NzLWRvbWFpbiB3ZSBzaGFsbCB1c2UgaWZyYW1lLCBzZXJ2ZWQgZnJvbSB0aGVcbi8vIHJlbW90ZSBkb21haW4uIE5ldyBicm93c2VycyBoYXZlIGNhcGFiaWxpdGllcyB0byBjb21tdW5pY2F0ZSB3aXRoXG4vLyBjcm9zcyBkb21haW4gaWZyYW1lIHVzaW5nIHBvc3RNZXNzYWdlKCkuIEluIElFIGl0IHdhcyBpbXBsZW1lbnRlZFxuLy8gZnJvbSBJRSA4KywgYnV0IG9mIGNvdXJzZSwgSUUgZ290IHNvbWUgZGV0YWlscyB3cm9uZzpcbi8vICAgIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9jYzE5NzAxNSh2PVZTLjg1KS5hc3B4XG4vLyAgICBodHRwOi8vc3RldmVzb3VkZXJzLmNvbS9taXNjL3Rlc3QtcG9zdG1lc3NhZ2UucGhwXG5cbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJylcbiAgLCBKU09OMyA9IHJlcXVpcmUoJ2pzb24zJylcbiAgLCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXJcbiAgLCB2ZXJzaW9uID0gcmVxdWlyZSgnLi4vdmVyc2lvbicpXG4gICwgdXJsVXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy91cmwnKVxuICAsIGlmcmFtZVV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMvaWZyYW1lJylcbiAgLCBldmVudFV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMvZXZlbnQnKVxuICAsIHJhbmRvbSA9IHJlcXVpcmUoJy4uL3V0aWxzL3JhbmRvbScpXG4gIDtcblxudmFyIGRlYnVnID0gZnVuY3Rpb24oKSB7fTtcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2pzLWNsaWVudDp0cmFuc3BvcnQ6aWZyYW1lJyk7XG59XG5cbmZ1bmN0aW9uIElmcmFtZVRyYW5zcG9ydCh0cmFuc3BvcnQsIHRyYW5zVXJsLCBiYXNlVXJsKSB7XG4gIGlmICghSWZyYW1lVHJhbnNwb3J0LmVuYWJsZWQoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignVHJhbnNwb3J0IGNyZWF0ZWQgd2hlbiBkaXNhYmxlZCcpO1xuICB9XG4gIEV2ZW50RW1pdHRlci5jYWxsKHRoaXMpO1xuXG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5vcmlnaW4gPSB1cmxVdGlscy5nZXRPcmlnaW4oYmFzZVVybCk7XG4gIHRoaXMuYmFzZVVybCA9IGJhc2VVcmw7XG4gIHRoaXMudHJhbnNVcmwgPSB0cmFuc1VybDtcbiAgdGhpcy50cmFuc3BvcnQgPSB0cmFuc3BvcnQ7XG4gIHRoaXMud2luZG93SWQgPSByYW5kb20uc3RyaW5nKDgpO1xuXG4gIHZhciBpZnJhbWVVcmwgPSB1cmxVdGlscy5hZGRQYXRoKGJhc2VVcmwsICcvaWZyYW1lLmh0bWwnKSArICcjJyArIHRoaXMud2luZG93SWQ7XG4gIGRlYnVnKHRyYW5zcG9ydCwgdHJhbnNVcmwsIGlmcmFtZVVybCk7XG5cbiAgdGhpcy5pZnJhbWVPYmogPSBpZnJhbWVVdGlscy5jcmVhdGVJZnJhbWUoaWZyYW1lVXJsLCBmdW5jdGlvbihyKSB7XG4gICAgZGVidWcoJ2VyciBjYWxsYmFjaycpO1xuICAgIHNlbGYuZW1pdCgnY2xvc2UnLCAxMDA2LCAnVW5hYmxlIHRvIGxvYWQgYW4gaWZyYW1lICgnICsgciArICcpJyk7XG4gICAgc2VsZi5jbG9zZSgpO1xuICB9KTtcblxuICB0aGlzLm9ubWVzc2FnZUNhbGxiYWNrID0gdGhpcy5fbWVzc2FnZS5iaW5kKHRoaXMpO1xuICBldmVudFV0aWxzLmF0dGFjaEV2ZW50KCdtZXNzYWdlJywgdGhpcy5vbm1lc3NhZ2VDYWxsYmFjayk7XG59XG5cbmluaGVyaXRzKElmcmFtZVRyYW5zcG9ydCwgRXZlbnRFbWl0dGVyKTtcblxuSWZyYW1lVHJhbnNwb3J0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICBkZWJ1ZygnY2xvc2UnKTtcbiAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgaWYgKHRoaXMuaWZyYW1lT2JqKSB7XG4gICAgZXZlbnRVdGlscy5kZXRhY2hFdmVudCgnbWVzc2FnZScsIHRoaXMub25tZXNzYWdlQ2FsbGJhY2spO1xuICAgIHRyeSB7XG4gICAgICAvLyBXaGVuIHRoZSBpZnJhbWUgaXMgbm90IGxvYWRlZCwgSUUgcmFpc2VzIGFuIGV4Y2VwdGlvblxuICAgICAgLy8gb24gJ2NvbnRlbnRXaW5kb3cnLlxuICAgICAgdGhpcy5wb3N0TWVzc2FnZSgnYycpO1xuICAgIH0gY2F0Y2ggKHgpIHtcbiAgICAgIC8vIGludGVudGlvbmFsbHkgZW1wdHlcbiAgICB9XG4gICAgdGhpcy5pZnJhbWVPYmouY2xlYW51cCgpO1xuICAgIHRoaXMuaWZyYW1lT2JqID0gbnVsbDtcbiAgICB0aGlzLm9ubWVzc2FnZUNhbGxiYWNrID0gdGhpcy5pZnJhbWVPYmogPSBudWxsO1xuICB9XG59O1xuXG5JZnJhbWVUcmFuc3BvcnQucHJvdG90eXBlLl9tZXNzYWdlID0gZnVuY3Rpb24oZSkge1xuICBkZWJ1ZygnbWVzc2FnZScsIGUuZGF0YSk7XG4gIGlmICghdXJsVXRpbHMuaXNPcmlnaW5FcXVhbChlLm9yaWdpbiwgdGhpcy5vcmlnaW4pKSB7XG4gICAgZGVidWcoJ25vdCBzYW1lIG9yaWdpbicsIGUub3JpZ2luLCB0aGlzLm9yaWdpbik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGlmcmFtZU1lc3NhZ2U7XG4gIHRyeSB7XG4gICAgaWZyYW1lTWVzc2FnZSA9IEpTT04zLnBhcnNlKGUuZGF0YSk7XG4gIH0gY2F0Y2ggKGlnbm9yZWQpIHtcbiAgICBkZWJ1ZygnYmFkIGpzb24nLCBlLmRhdGEpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpZnJhbWVNZXNzYWdlLndpbmRvd0lkICE9PSB0aGlzLndpbmRvd0lkKSB7XG4gICAgZGVidWcoJ21pc21hdGNoZWQgd2luZG93IGlkJywgaWZyYW1lTWVzc2FnZS53aW5kb3dJZCwgdGhpcy53aW5kb3dJZCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgc3dpdGNoIChpZnJhbWVNZXNzYWdlLnR5cGUpIHtcbiAgY2FzZSAncyc6XG4gICAgdGhpcy5pZnJhbWVPYmoubG9hZGVkKCk7XG4gICAgLy8gd2luZG93IGdsb2JhbCBkZXBlbmRlbmN5XG4gICAgdGhpcy5wb3N0TWVzc2FnZSgncycsIEpTT04zLnN0cmluZ2lmeShbXG4gICAgICB2ZXJzaW9uXG4gICAgLCB0aGlzLnRyYW5zcG9ydFxuICAgICwgdGhpcy50cmFuc1VybFxuICAgICwgdGhpcy5iYXNlVXJsXG4gICAgXSkpO1xuICAgIGJyZWFrO1xuICBjYXNlICd0JzpcbiAgICB0aGlzLmVtaXQoJ21lc3NhZ2UnLCBpZnJhbWVNZXNzYWdlLmRhdGEpO1xuICAgIGJyZWFrO1xuICBjYXNlICdjJzpcbiAgICB2YXIgY2RhdGE7XG4gICAgdHJ5IHtcbiAgICAgIGNkYXRhID0gSlNPTjMucGFyc2UoaWZyYW1lTWVzc2FnZS5kYXRhKTtcbiAgICB9IGNhdGNoIChpZ25vcmVkKSB7XG4gICAgICBkZWJ1ZygnYmFkIGpzb24nLCBpZnJhbWVNZXNzYWdlLmRhdGEpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmVtaXQoJ2Nsb3NlJywgY2RhdGFbMF0sIGNkYXRhWzFdKTtcbiAgICB0aGlzLmNsb3NlKCk7XG4gICAgYnJlYWs7XG4gIH1cbn07XG5cbklmcmFtZVRyYW5zcG9ydC5wcm90b3R5cGUucG9zdE1lc3NhZ2UgPSBmdW5jdGlvbih0eXBlLCBkYXRhKSB7XG4gIGRlYnVnKCdwb3N0TWVzc2FnZScsIHR5cGUsIGRhdGEpO1xuICB0aGlzLmlmcmFtZU9iai5wb3N0KEpTT04zLnN0cmluZ2lmeSh7XG4gICAgd2luZG93SWQ6IHRoaXMud2luZG93SWRcbiAgLCB0eXBlOiB0eXBlXG4gICwgZGF0YTogZGF0YSB8fCAnJ1xuICB9KSwgdGhpcy5vcmlnaW4pO1xufTtcblxuSWZyYW1lVHJhbnNwb3J0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24obWVzc2FnZSkge1xuICBkZWJ1Zygnc2VuZCcsIG1lc3NhZ2UpO1xuICB0aGlzLnBvc3RNZXNzYWdlKCdtJywgbWVzc2FnZSk7XG59O1xuXG5JZnJhbWVUcmFuc3BvcnQuZW5hYmxlZCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gaWZyYW1lVXRpbHMuaWZyYW1lRW5hYmxlZDtcbn07XG5cbklmcmFtZVRyYW5zcG9ydC50cmFuc3BvcnROYW1lID0gJ2lmcmFtZSc7XG5JZnJhbWVUcmFuc3BvcnQucm91bmRUcmlwcyA9IDI7XG5cbm1vZHVsZS5leHBvcnRzID0gSWZyYW1lVHJhbnNwb3J0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBUaGUgc2ltcGxlc3QgYW5kIG1vc3Qgcm9idXN0IHRyYW5zcG9ydCwgdXNpbmcgdGhlIHdlbGwta25vdyBjcm9zc1xuLy8gZG9tYWluIGhhY2sgLSBKU09OUC4gVGhpcyB0cmFuc3BvcnQgaXMgcXVpdGUgaW5lZmZpY2llbnQgLSBvbmVcbi8vIG1lc3NhZ2UgY291bGQgdXNlIHVwIHRvIG9uZSBodHRwIHJlcXVlc3QuIEJ1dCBhdCBsZWFzdCBpdCB3b3JrcyBhbG1vc3Rcbi8vIGV2ZXJ5d2hlcmUuXG4vLyBLbm93biBsaW1pdGF0aW9uczpcbi8vICAgbyB5b3Ugd2lsbCBnZXQgYSBzcGlubmluZyBjdXJzb3Jcbi8vICAgbyBmb3IgS29ucXVlcm9yIGEgZHVtYiB0aW1lciBpcyBuZWVkZWQgdG8gZGV0ZWN0IGVycm9yc1xuXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG4gICwgU2VuZGVyUmVjZWl2ZXIgPSByZXF1aXJlKCcuL2xpYi9zZW5kZXItcmVjZWl2ZXInKVxuICAsIEpzb25wUmVjZWl2ZXIgPSByZXF1aXJlKCcuL3JlY2VpdmVyL2pzb25wJylcbiAgLCBqc29ucFNlbmRlciA9IHJlcXVpcmUoJy4vc2VuZGVyL2pzb25wJylcbiAgO1xuXG5mdW5jdGlvbiBKc29uUFRyYW5zcG9ydCh0cmFuc1VybCkge1xuICBpZiAoIUpzb25QVHJhbnNwb3J0LmVuYWJsZWQoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignVHJhbnNwb3J0IGNyZWF0ZWQgd2hlbiBkaXNhYmxlZCcpO1xuICB9XG4gIFNlbmRlclJlY2VpdmVyLmNhbGwodGhpcywgdHJhbnNVcmwsICcvanNvbnAnLCBqc29ucFNlbmRlciwgSnNvbnBSZWNlaXZlcik7XG59XG5cbmluaGVyaXRzKEpzb25QVHJhbnNwb3J0LCBTZW5kZXJSZWNlaXZlcik7XG5cbkpzb25QVHJhbnNwb3J0LmVuYWJsZWQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICEhZ2xvYmFsLmRvY3VtZW50O1xufTtcblxuSnNvblBUcmFuc3BvcnQudHJhbnNwb3J0TmFtZSA9ICdqc29ucC1wb2xsaW5nJztcbkpzb25QVHJhbnNwb3J0LnJvdW5kVHJpcHMgPSAxO1xuSnNvblBUcmFuc3BvcnQubmVlZEJvZHkgPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEpzb25QVHJhbnNwb3J0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG4gICwgdXJsVXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy91cmwnKVxuICAsIFNlbmRlclJlY2VpdmVyID0gcmVxdWlyZSgnLi9zZW5kZXItcmVjZWl2ZXInKVxuICA7XG5cbnZhciBkZWJ1ZyA9IGZ1bmN0aW9uKCkge307XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tqcy1jbGllbnQ6YWpheC1iYXNlZCcpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVBamF4U2VuZGVyKEFqYXhPYmplY3QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHVybCwgcGF5bG9hZCwgY2FsbGJhY2spIHtcbiAgICBkZWJ1ZygnY3JlYXRlIGFqYXggc2VuZGVyJywgdXJsLCBwYXlsb2FkKTtcbiAgICB2YXIgb3B0ID0ge307XG4gICAgaWYgKHR5cGVvZiBwYXlsb2FkID09PSAnc3RyaW5nJykge1xuICAgICAgb3B0LmhlYWRlcnMgPSB7J0NvbnRlbnQtdHlwZSc6ICd0ZXh0L3BsYWluJ307XG4gICAgfVxuICAgIHZhciBhamF4VXJsID0gdXJsVXRpbHMuYWRkUGF0aCh1cmwsICcveGhyX3NlbmQnKTtcbiAgICB2YXIgeG8gPSBuZXcgQWpheE9iamVjdCgnUE9TVCcsIGFqYXhVcmwsIHBheWxvYWQsIG9wdCk7XG4gICAgeG8ub25jZSgnZmluaXNoJywgZnVuY3Rpb24oc3RhdHVzKSB7XG4gICAgICBkZWJ1ZygnZmluaXNoJywgc3RhdHVzKTtcbiAgICAgIHhvID0gbnVsbDtcblxuICAgICAgaWYgKHN0YXR1cyAhPT0gMjAwICYmIHN0YXR1cyAhPT0gMjA0KSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IoJ2h0dHAgc3RhdHVzICcgKyBzdGF0dXMpKTtcbiAgICAgIH1cbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgZGVidWcoJ2Fib3J0Jyk7XG4gICAgICB4by5jbG9zZSgpO1xuICAgICAgeG8gPSBudWxsO1xuXG4gICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdBYm9ydGVkJyk7XG4gICAgICBlcnIuY29kZSA9IDEwMDA7XG4gICAgICBjYWxsYmFjayhlcnIpO1xuICAgIH07XG4gIH07XG59XG5cbmZ1bmN0aW9uIEFqYXhCYXNlZFRyYW5zcG9ydCh0cmFuc1VybCwgdXJsU3VmZml4LCBSZWNlaXZlciwgQWpheE9iamVjdCkge1xuICBTZW5kZXJSZWNlaXZlci5jYWxsKHRoaXMsIHRyYW5zVXJsLCB1cmxTdWZmaXgsIGNyZWF0ZUFqYXhTZW5kZXIoQWpheE9iamVjdCksIFJlY2VpdmVyLCBBamF4T2JqZWN0KTtcbn1cblxuaW5oZXJpdHMoQWpheEJhc2VkVHJhbnNwb3J0LCBTZW5kZXJSZWNlaXZlcik7XG5cbm1vZHVsZS5leHBvcnRzID0gQWpheEJhc2VkVHJhbnNwb3J0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG4gICwgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyXG4gIDtcblxudmFyIGRlYnVnID0gZnVuY3Rpb24oKSB7fTtcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2pzLWNsaWVudDpidWZmZXJlZC1zZW5kZXInKTtcbn1cblxuZnVuY3Rpb24gQnVmZmVyZWRTZW5kZXIodXJsLCBzZW5kZXIpIHtcbiAgZGVidWcodXJsKTtcbiAgRXZlbnRFbWl0dGVyLmNhbGwodGhpcyk7XG4gIHRoaXMuc2VuZEJ1ZmZlciA9IFtdO1xuICB0aGlzLnNlbmRlciA9IHNlbmRlcjtcbiAgdGhpcy51cmwgPSB1cmw7XG59XG5cbmluaGVyaXRzKEJ1ZmZlcmVkU2VuZGVyLCBFdmVudEVtaXR0ZXIpO1xuXG5CdWZmZXJlZFNlbmRlci5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgZGVidWcoJ3NlbmQnLCBtZXNzYWdlKTtcbiAgdGhpcy5zZW5kQnVmZmVyLnB1c2gobWVzc2FnZSk7XG4gIGlmICghdGhpcy5zZW5kU3RvcCkge1xuICAgIHRoaXMuc2VuZFNjaGVkdWxlKCk7XG4gIH1cbn07XG5cbi8vIEZvciBwb2xsaW5nIHRyYW5zcG9ydHMgaW4gYSBzaXR1YXRpb24gd2hlbiBpbiB0aGUgbWVzc2FnZSBjYWxsYmFjayxcbi8vIG5ldyBtZXNzYWdlIGlzIGJlaW5nIHNlbmQuIElmIHRoZSBzZW5kaW5nIGNvbm5lY3Rpb24gd2FzIHN0YXJ0ZWRcbi8vIGJlZm9yZSByZWNlaXZpbmcgb25lLCBpdCBpcyBwb3NzaWJsZSB0byBzYXR1cmF0ZSB0aGUgbmV0d29yayBhbmRcbi8vIHRpbWVvdXQgZHVlIHRvIHRoZSBsYWNrIG9mIHJlY2VpdmluZyBzb2NrZXQuIFRvIGF2b2lkIHRoYXQgd2UgZGVsYXlcbi8vIHNlbmRpbmcgbWVzc2FnZXMgYnkgc29tZSBzbWFsbCB0aW1lLCBpbiBvcmRlciB0byBsZXQgcmVjZWl2aW5nXG4vLyBjb25uZWN0aW9uIGJlIHN0YXJ0ZWQgYmVmb3JlaGFuZC4gVGhpcyBpcyBvbmx5IGEgaGFsZm1lYXN1cmUgYW5kXG4vLyBkb2VzIG5vdCBmaXggdGhlIGJpZyBwcm9ibGVtLCBidXQgaXQgZG9lcyBtYWtlIHRoZSB0ZXN0cyBnbyBtb3JlXG4vLyBzdGFibGUgb24gc2xvdyBuZXR3b3Jrcy5cbkJ1ZmZlcmVkU2VuZGVyLnByb3RvdHlwZS5zZW5kU2NoZWR1bGVXYWl0ID0gZnVuY3Rpb24oKSB7XG4gIGRlYnVnKCdzZW5kU2NoZWR1bGVXYWl0Jyk7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHRyZWY7XG4gIHRoaXMuc2VuZFN0b3AgPSBmdW5jdGlvbigpIHtcbiAgICBkZWJ1Zygnc2VuZFN0b3AnKTtcbiAgICBzZWxmLnNlbmRTdG9wID0gbnVsbDtcbiAgICBjbGVhclRpbWVvdXQodHJlZik7XG4gIH07XG4gIHRyZWYgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIGRlYnVnKCd0aW1lb3V0Jyk7XG4gICAgc2VsZi5zZW5kU3RvcCA9IG51bGw7XG4gICAgc2VsZi5zZW5kU2NoZWR1bGUoKTtcbiAgfSwgMjUpO1xufTtcblxuQnVmZmVyZWRTZW5kZXIucHJvdG90eXBlLnNlbmRTY2hlZHVsZSA9IGZ1bmN0aW9uKCkge1xuICBkZWJ1Zygnc2VuZFNjaGVkdWxlJywgdGhpcy5zZW5kQnVmZmVyLmxlbmd0aCk7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgaWYgKHRoaXMuc2VuZEJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgdmFyIHBheWxvYWQgPSAnWycgKyB0aGlzLnNlbmRCdWZmZXIuam9pbignLCcpICsgJ10nO1xuICAgIHRoaXMuc2VuZFN0b3AgPSB0aGlzLnNlbmRlcih0aGlzLnVybCwgcGF5bG9hZCwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICBzZWxmLnNlbmRTdG9wID0gbnVsbDtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgZGVidWcoJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgc2VsZi5lbWl0KCdjbG9zZScsIGVyci5jb2RlIHx8IDEwMDYsICdTZW5kaW5nIGVycm9yOiAnICsgZXJyKTtcbiAgICAgICAgc2VsZi5jbG9zZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5zZW5kU2NoZWR1bGVXYWl0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5zZW5kQnVmZmVyID0gW107XG4gIH1cbn07XG5cbkJ1ZmZlcmVkU2VuZGVyLnByb3RvdHlwZS5fY2xlYW51cCA9IGZ1bmN0aW9uKCkge1xuICBkZWJ1ZygnX2NsZWFudXAnKTtcbiAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbn07XG5cbkJ1ZmZlcmVkU2VuZGVyLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICBkZWJ1ZygnY2xvc2UnKTtcbiAgdGhpcy5fY2xlYW51cCgpO1xuICBpZiAodGhpcy5zZW5kU3RvcCkge1xuICAgIHRoaXMuc2VuZFN0b3AoKTtcbiAgICB0aGlzLnNlbmRTdG9wID0gbnVsbDtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBCdWZmZXJlZFNlbmRlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKVxuICAsIElmcmFtZVRyYW5zcG9ydCA9IHJlcXVpcmUoJy4uL2lmcmFtZScpXG4gICwgb2JqZWN0VXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy9vYmplY3QnKVxuICA7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odHJhbnNwb3J0KSB7XG5cbiAgZnVuY3Rpb24gSWZyYW1lV3JhcFRyYW5zcG9ydCh0cmFuc1VybCwgYmFzZVVybCkge1xuICAgIElmcmFtZVRyYW5zcG9ydC5jYWxsKHRoaXMsIHRyYW5zcG9ydC50cmFuc3BvcnROYW1lLCB0cmFuc1VybCwgYmFzZVVybCk7XG4gIH1cblxuICBpbmhlcml0cyhJZnJhbWVXcmFwVHJhbnNwb3J0LCBJZnJhbWVUcmFuc3BvcnQpO1xuXG4gIElmcmFtZVdyYXBUcmFuc3BvcnQuZW5hYmxlZCA9IGZ1bmN0aW9uKHVybCwgaW5mbykge1xuICAgIGlmICghZ2xvYmFsLmRvY3VtZW50KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGlmcmFtZUluZm8gPSBvYmplY3RVdGlscy5leHRlbmQoe30sIGluZm8pO1xuICAgIGlmcmFtZUluZm8uc2FtZU9yaWdpbiA9IHRydWU7XG4gICAgcmV0dXJuIHRyYW5zcG9ydC5lbmFibGVkKGlmcmFtZUluZm8pICYmIElmcmFtZVRyYW5zcG9ydC5lbmFibGVkKCk7XG4gIH07XG5cbiAgSWZyYW1lV3JhcFRyYW5zcG9ydC50cmFuc3BvcnROYW1lID0gJ2lmcmFtZS0nICsgdHJhbnNwb3J0LnRyYW5zcG9ydE5hbWU7XG4gIElmcmFtZVdyYXBUcmFuc3BvcnQubmVlZEJvZHkgPSB0cnVlO1xuICBJZnJhbWVXcmFwVHJhbnNwb3J0LnJvdW5kVHJpcHMgPSBJZnJhbWVUcmFuc3BvcnQucm91bmRUcmlwcyArIHRyYW5zcG9ydC5yb3VuZFRyaXBzIC0gMTsgLy8gaHRtbCwgamF2YXNjcmlwdCAoMikgKyB0cmFuc3BvcnQgLSBubyBDT1JTICgxKVxuXG4gIElmcmFtZVdyYXBUcmFuc3BvcnQuZmFjYWRlVHJhbnNwb3J0ID0gdHJhbnNwb3J0O1xuXG4gIHJldHVybiBJZnJhbWVXcmFwVHJhbnNwb3J0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKVxuICAsIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlclxuICA7XG5cbnZhciBkZWJ1ZyA9IGZ1bmN0aW9uKCkge307XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tqcy1jbGllbnQ6cG9sbGluZycpO1xufVxuXG5mdW5jdGlvbiBQb2xsaW5nKFJlY2VpdmVyLCByZWNlaXZlVXJsLCBBamF4T2JqZWN0KSB7XG4gIGRlYnVnKHJlY2VpdmVVcmwpO1xuICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcbiAgdGhpcy5SZWNlaXZlciA9IFJlY2VpdmVyO1xuICB0aGlzLnJlY2VpdmVVcmwgPSByZWNlaXZlVXJsO1xuICB0aGlzLkFqYXhPYmplY3QgPSBBamF4T2JqZWN0O1xuICB0aGlzLl9zY2hlZHVsZVJlY2VpdmVyKCk7XG59XG5cbmluaGVyaXRzKFBvbGxpbmcsIEV2ZW50RW1pdHRlcik7XG5cblBvbGxpbmcucHJvdG90eXBlLl9zY2hlZHVsZVJlY2VpdmVyID0gZnVuY3Rpb24oKSB7XG4gIGRlYnVnKCdfc2NoZWR1bGVSZWNlaXZlcicpO1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBwb2xsID0gdGhpcy5wb2xsID0gbmV3IHRoaXMuUmVjZWl2ZXIodGhpcy5yZWNlaXZlVXJsLCB0aGlzLkFqYXhPYmplY3QpO1xuXG4gIHBvbGwub24oJ21lc3NhZ2UnLCBmdW5jdGlvbihtc2cpIHtcbiAgICBkZWJ1ZygnbWVzc2FnZScsIG1zZyk7XG4gICAgc2VsZi5lbWl0KCdtZXNzYWdlJywgbXNnKTtcbiAgfSk7XG5cbiAgcG9sbC5vbmNlKCdjbG9zZScsIGZ1bmN0aW9uKGNvZGUsIHJlYXNvbikge1xuICAgIGRlYnVnKCdjbG9zZScsIGNvZGUsIHJlYXNvbiwgc2VsZi5wb2xsSXNDbG9zaW5nKTtcbiAgICBzZWxmLnBvbGwgPSBwb2xsID0gbnVsbDtcblxuICAgIGlmICghc2VsZi5wb2xsSXNDbG9zaW5nKSB7XG4gICAgICBpZiAocmVhc29uID09PSAnbmV0d29yaycpIHtcbiAgICAgICAgc2VsZi5fc2NoZWR1bGVSZWNlaXZlcigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5lbWl0KCdjbG9zZScsIGNvZGUgfHwgMTAwNiwgcmVhc29uKTtcbiAgICAgICAgc2VsZi5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufTtcblxuUG9sbGluZy5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbigpIHtcbiAgZGVidWcoJ2Fib3J0Jyk7XG4gIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gIHRoaXMucG9sbElzQ2xvc2luZyA9IHRydWU7XG4gIGlmICh0aGlzLnBvbGwpIHtcbiAgICB0aGlzLnBvbGwuYWJvcnQoKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQb2xsaW5nO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG4gICwgdXJsVXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy91cmwnKVxuICAsIEJ1ZmZlcmVkU2VuZGVyID0gcmVxdWlyZSgnLi9idWZmZXJlZC1zZW5kZXInKVxuICAsIFBvbGxpbmcgPSByZXF1aXJlKCcuL3BvbGxpbmcnKVxuICA7XG5cbnZhciBkZWJ1ZyA9IGZ1bmN0aW9uKCkge307XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tqcy1jbGllbnQ6c2VuZGVyLXJlY2VpdmVyJyk7XG59XG5cbmZ1bmN0aW9uIFNlbmRlclJlY2VpdmVyKHRyYW5zVXJsLCB1cmxTdWZmaXgsIHNlbmRlckZ1bmMsIFJlY2VpdmVyLCBBamF4T2JqZWN0KSB7XG4gIHZhciBwb2xsVXJsID0gdXJsVXRpbHMuYWRkUGF0aCh0cmFuc1VybCwgdXJsU3VmZml4KTtcbiAgZGVidWcocG9sbFVybCk7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgQnVmZmVyZWRTZW5kZXIuY2FsbCh0aGlzLCB0cmFuc1VybCwgc2VuZGVyRnVuYyk7XG5cbiAgdGhpcy5wb2xsID0gbmV3IFBvbGxpbmcoUmVjZWl2ZXIsIHBvbGxVcmwsIEFqYXhPYmplY3QpO1xuICB0aGlzLnBvbGwub24oJ21lc3NhZ2UnLCBmdW5jdGlvbihtc2cpIHtcbiAgICBkZWJ1ZygncG9sbCBtZXNzYWdlJywgbXNnKTtcbiAgICBzZWxmLmVtaXQoJ21lc3NhZ2UnLCBtc2cpO1xuICB9KTtcbiAgdGhpcy5wb2xsLm9uY2UoJ2Nsb3NlJywgZnVuY3Rpb24oY29kZSwgcmVhc29uKSB7XG4gICAgZGVidWcoJ3BvbGwgY2xvc2UnLCBjb2RlLCByZWFzb24pO1xuICAgIHNlbGYucG9sbCA9IG51bGw7XG4gICAgc2VsZi5lbWl0KCdjbG9zZScsIGNvZGUsIHJlYXNvbik7XG4gICAgc2VsZi5jbG9zZSgpO1xuICB9KTtcbn1cblxuaW5oZXJpdHMoU2VuZGVyUmVjZWl2ZXIsIEJ1ZmZlcmVkU2VuZGVyKTtcblxuU2VuZGVyUmVjZWl2ZXIucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIEJ1ZmZlcmVkU2VuZGVyLnByb3RvdHlwZS5jbG9zZS5jYWxsKHRoaXMpO1xuICBkZWJ1ZygnY2xvc2UnKTtcbiAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgaWYgKHRoaXMucG9sbCkge1xuICAgIHRoaXMucG9sbC5hYm9ydCgpO1xuICAgIHRoaXMucG9sbCA9IG51bGw7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2VuZGVyUmVjZWl2ZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJylcbiAgLCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXJcbiAgLCBFdmVudFNvdXJjZURyaXZlciA9IHJlcXVpcmUoJ2V2ZW50c291cmNlJylcbiAgO1xuXG52YXIgZGVidWcgPSBmdW5jdGlvbigpIHt9O1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NranMtY2xpZW50OnJlY2VpdmVyOmV2ZW50c291cmNlJyk7XG59XG5cbmZ1bmN0aW9uIEV2ZW50U291cmNlUmVjZWl2ZXIodXJsKSB7XG4gIGRlYnVnKHVybCk7XG4gIEV2ZW50RW1pdHRlci5jYWxsKHRoaXMpO1xuXG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIGVzID0gdGhpcy5lcyA9IG5ldyBFdmVudFNvdXJjZURyaXZlcih1cmwpO1xuICBlcy5vbm1lc3NhZ2UgPSBmdW5jdGlvbihlKSB7XG4gICAgZGVidWcoJ21lc3NhZ2UnLCBlLmRhdGEpO1xuICAgIHNlbGYuZW1pdCgnbWVzc2FnZScsIGRlY29kZVVSSShlLmRhdGEpKTtcbiAgfTtcbiAgZXMub25lcnJvciA9IGZ1bmN0aW9uKGUpIHtcbiAgICBkZWJ1ZygnZXJyb3InLCBlcy5yZWFkeVN0YXRlLCBlKTtcbiAgICAvLyBFUyBvbiByZWNvbm5lY3Rpb24gaGFzIHJlYWR5U3RhdGUgPSAwIG9yIDEuXG4gICAgLy8gb24gbmV0d29yayBlcnJvciBpdCdzIENMT1NFRCA9IDJcbiAgICB2YXIgcmVhc29uID0gKGVzLnJlYWR5U3RhdGUgIT09IDIgPyAnbmV0d29yaycgOiAncGVybWFuZW50Jyk7XG4gICAgc2VsZi5fY2xlYW51cCgpO1xuICAgIHNlbGYuX2Nsb3NlKHJlYXNvbik7XG4gIH07XG59XG5cbmluaGVyaXRzKEV2ZW50U291cmNlUmVjZWl2ZXIsIEV2ZW50RW1pdHRlcik7XG5cbkV2ZW50U291cmNlUmVjZWl2ZXIucHJvdG90eXBlLmFib3J0ID0gZnVuY3Rpb24oKSB7XG4gIGRlYnVnKCdhYm9ydCcpO1xuICB0aGlzLl9jbGVhbnVwKCk7XG4gIHRoaXMuX2Nsb3NlKCd1c2VyJyk7XG59O1xuXG5FdmVudFNvdXJjZVJlY2VpdmVyLnByb3RvdHlwZS5fY2xlYW51cCA9IGZ1bmN0aW9uKCkge1xuICBkZWJ1ZygnY2xlYW51cCcpO1xuICB2YXIgZXMgPSB0aGlzLmVzO1xuICBpZiAoZXMpIHtcbiAgICBlcy5vbm1lc3NhZ2UgPSBlcy5vbmVycm9yID0gbnVsbDtcbiAgICBlcy5jbG9zZSgpO1xuICAgIHRoaXMuZXMgPSBudWxsO1xuICB9XG59O1xuXG5FdmVudFNvdXJjZVJlY2VpdmVyLnByb3RvdHlwZS5fY2xvc2UgPSBmdW5jdGlvbihyZWFzb24pIHtcbiAgZGVidWcoJ2Nsb3NlJywgcmVhc29uKTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICAvLyBTYWZhcmkgYW5kIGNocm9tZSA8IDE1IGNyYXNoIGlmIHdlIGNsb3NlIHdpbmRvdyBiZWZvcmVcbiAgLy8gd2FpdGluZyBmb3IgRVMgY2xlYW51cC4gU2VlOlxuICAvLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9ODkxNTVcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICBzZWxmLmVtaXQoJ2Nsb3NlJywgbnVsbCwgcmVhc29uKTtcbiAgICBzZWxmLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICB9LCAyMDApO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudFNvdXJjZVJlY2VpdmVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG4gICwgaWZyYW1lVXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy9pZnJhbWUnKVxuICAsIHVybFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvdXJsJylcbiAgLCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXJcbiAgLCByYW5kb20gPSByZXF1aXJlKCcuLi8uLi91dGlscy9yYW5kb20nKVxuICA7XG5cbnZhciBkZWJ1ZyA9IGZ1bmN0aW9uKCkge307XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tqcy1jbGllbnQ6cmVjZWl2ZXI6aHRtbGZpbGUnKTtcbn1cblxuZnVuY3Rpb24gSHRtbGZpbGVSZWNlaXZlcih1cmwpIHtcbiAgZGVidWcodXJsKTtcbiAgRXZlbnRFbWl0dGVyLmNhbGwodGhpcyk7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgaWZyYW1lVXRpbHMucG9sbHV0ZUdsb2JhbE5hbWVzcGFjZSgpO1xuXG4gIHRoaXMuaWQgPSAnYScgKyByYW5kb20uc3RyaW5nKDYpO1xuICB1cmwgPSB1cmxVdGlscy5hZGRRdWVyeSh1cmwsICdjPScgKyBkZWNvZGVVUklDb21wb25lbnQoaWZyYW1lVXRpbHMuV1ByZWZpeCArICcuJyArIHRoaXMuaWQpKTtcblxuICBkZWJ1ZygndXNpbmcgaHRtbGZpbGUnLCBIdG1sZmlsZVJlY2VpdmVyLmh0bWxmaWxlRW5hYmxlZCk7XG4gIHZhciBjb25zdHJ1Y3RGdW5jID0gSHRtbGZpbGVSZWNlaXZlci5odG1sZmlsZUVuYWJsZWQgP1xuICAgICAgaWZyYW1lVXRpbHMuY3JlYXRlSHRtbGZpbGUgOiBpZnJhbWVVdGlscy5jcmVhdGVJZnJhbWU7XG5cbiAgZ2xvYmFsW2lmcmFtZVV0aWxzLldQcmVmaXhdW3RoaXMuaWRdID0ge1xuICAgIHN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgIGRlYnVnKCdzdGFydCcpO1xuICAgICAgc2VsZi5pZnJhbWVPYmoubG9hZGVkKCk7XG4gICAgfVxuICAsIG1lc3NhZ2U6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIGRlYnVnKCdtZXNzYWdlJywgZGF0YSk7XG4gICAgICBzZWxmLmVtaXQoJ21lc3NhZ2UnLCBkYXRhKTtcbiAgICB9XG4gICwgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICBkZWJ1Zygnc3RvcCcpO1xuICAgICAgc2VsZi5fY2xlYW51cCgpO1xuICAgICAgc2VsZi5fY2xvc2UoJ25ldHdvcmsnKTtcbiAgICB9XG4gIH07XG4gIHRoaXMuaWZyYW1lT2JqID0gY29uc3RydWN0RnVuYyh1cmwsIGZ1bmN0aW9uKCkge1xuICAgIGRlYnVnKCdjYWxsYmFjaycpO1xuICAgIHNlbGYuX2NsZWFudXAoKTtcbiAgICBzZWxmLl9jbG9zZSgncGVybWFuZW50Jyk7XG4gIH0pO1xufVxuXG5pbmhlcml0cyhIdG1sZmlsZVJlY2VpdmVyLCBFdmVudEVtaXR0ZXIpO1xuXG5IdG1sZmlsZVJlY2VpdmVyLnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uKCkge1xuICBkZWJ1ZygnYWJvcnQnKTtcbiAgdGhpcy5fY2xlYW51cCgpO1xuICB0aGlzLl9jbG9zZSgndXNlcicpO1xufTtcblxuSHRtbGZpbGVSZWNlaXZlci5wcm90b3R5cGUuX2NsZWFudXAgPSBmdW5jdGlvbigpIHtcbiAgZGVidWcoJ19jbGVhbnVwJyk7XG4gIGlmICh0aGlzLmlmcmFtZU9iaikge1xuICAgIHRoaXMuaWZyYW1lT2JqLmNsZWFudXAoKTtcbiAgICB0aGlzLmlmcmFtZU9iaiA9IG51bGw7XG4gIH1cbiAgZGVsZXRlIGdsb2JhbFtpZnJhbWVVdGlscy5XUHJlZml4XVt0aGlzLmlkXTtcbn07XG5cbkh0bWxmaWxlUmVjZWl2ZXIucHJvdG90eXBlLl9jbG9zZSA9IGZ1bmN0aW9uKHJlYXNvbikge1xuICBkZWJ1ZygnX2Nsb3NlJywgcmVhc29uKTtcbiAgdGhpcy5lbWl0KCdjbG9zZScsIG51bGwsIHJlYXNvbik7XG4gIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG59O1xuXG5IdG1sZmlsZVJlY2VpdmVyLmh0bWxmaWxlRW5hYmxlZCA9IGZhbHNlO1xuXG4vLyBvYmZ1c2NhdGUgdG8gYXZvaWQgZmlyZXdhbGxzXG52YXIgYXhvID0gWydBY3RpdmUnXS5jb25jYXQoJ09iamVjdCcpLmpvaW4oJ1gnKTtcbmlmIChheG8gaW4gZ2xvYmFsKSB7XG4gIHRyeSB7XG4gICAgSHRtbGZpbGVSZWNlaXZlci5odG1sZmlsZUVuYWJsZWQgPSAhIW5ldyBnbG9iYWxbYXhvXSgnaHRtbGZpbGUnKTtcbiAgfSBjYXRjaCAoeCkge1xuICAgIC8vIGludGVudGlvbmFsbHkgZW1wdHlcbiAgfVxufVxuXG5IdG1sZmlsZVJlY2VpdmVyLmVuYWJsZWQgPSBIdG1sZmlsZVJlY2VpdmVyLmh0bWxmaWxlRW5hYmxlZCB8fCBpZnJhbWVVdGlscy5pZnJhbWVFbmFibGVkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEh0bWxmaWxlUmVjZWl2ZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2lmcmFtZScpXG4gICwgcmFuZG9tID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvcmFuZG9tJylcbiAgLCBicm93c2VyID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvYnJvd3NlcicpXG4gICwgdXJsVXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy91cmwnKVxuICAsIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKVxuICAsIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlclxuICA7XG5cbnZhciBkZWJ1ZyA9IGZ1bmN0aW9uKCkge307XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tqcy1jbGllbnQ6cmVjZWl2ZXI6anNvbnAnKTtcbn1cblxuZnVuY3Rpb24gSnNvbnBSZWNlaXZlcih1cmwpIHtcbiAgZGVidWcodXJsKTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcblxuICB1dGlscy5wb2xsdXRlR2xvYmFsTmFtZXNwYWNlKCk7XG5cbiAgdGhpcy5pZCA9ICdhJyArIHJhbmRvbS5zdHJpbmcoNik7XG4gIHZhciB1cmxXaXRoSWQgPSB1cmxVdGlscy5hZGRRdWVyeSh1cmwsICdjPScgKyBlbmNvZGVVUklDb21wb25lbnQodXRpbHMuV1ByZWZpeCArICcuJyArIHRoaXMuaWQpKTtcblxuICBnbG9iYWxbdXRpbHMuV1ByZWZpeF1bdGhpcy5pZF0gPSB0aGlzLl9jYWxsYmFjay5iaW5kKHRoaXMpO1xuICB0aGlzLl9jcmVhdGVTY3JpcHQodXJsV2l0aElkKTtcblxuICAvLyBGYWxsYmFjayBtb3N0bHkgZm9yIEtvbnF1ZXJvciAtIHN0dXBpZCB0aW1lciwgMzUgc2Vjb25kcyBzaGFsbCBiZSBwbGVudHkuXG4gIHRoaXMudGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICBkZWJ1ZygndGltZW91dCcpO1xuICAgIHNlbGYuX2Fib3J0KG5ldyBFcnJvcignSlNPTlAgc2NyaXB0IGxvYWRlZCBhYm5vcm1hbGx5ICh0aW1lb3V0KScpKTtcbiAgfSwgSnNvbnBSZWNlaXZlci50aW1lb3V0KTtcbn1cblxuaW5oZXJpdHMoSnNvbnBSZWNlaXZlciwgRXZlbnRFbWl0dGVyKTtcblxuSnNvbnBSZWNlaXZlci5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbigpIHtcbiAgZGVidWcoJ2Fib3J0Jyk7XG4gIGlmIChnbG9iYWxbdXRpbHMuV1ByZWZpeF1bdGhpcy5pZF0pIHtcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdKU09OUCB1c2VyIGFib3J0ZWQgcmVhZCcpO1xuICAgIGVyci5jb2RlID0gMTAwMDtcbiAgICB0aGlzLl9hYm9ydChlcnIpO1xuICB9XG59O1xuXG5Kc29ucFJlY2VpdmVyLnRpbWVvdXQgPSAzNTAwMDtcbkpzb25wUmVjZWl2ZXIuc2NyaXB0RXJyb3JUaW1lb3V0ID0gMTAwMDtcblxuSnNvbnBSZWNlaXZlci5wcm90b3R5cGUuX2NhbGxiYWNrID0gZnVuY3Rpb24oZGF0YSkge1xuICBkZWJ1ZygnX2NhbGxiYWNrJywgZGF0YSk7XG4gIHRoaXMuX2NsZWFudXAoKTtcblxuICBpZiAodGhpcy5hYm9ydGluZykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChkYXRhKSB7XG4gICAgZGVidWcoJ21lc3NhZ2UnLCBkYXRhKTtcbiAgICB0aGlzLmVtaXQoJ21lc3NhZ2UnLCBkYXRhKTtcbiAgfVxuICB0aGlzLmVtaXQoJ2Nsb3NlJywgbnVsbCwgJ25ldHdvcmsnKTtcbiAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbn07XG5cbkpzb25wUmVjZWl2ZXIucHJvdG90eXBlLl9hYm9ydCA9IGZ1bmN0aW9uKGVycikge1xuICBkZWJ1ZygnX2Fib3J0JywgZXJyKTtcbiAgdGhpcy5fY2xlYW51cCgpO1xuICB0aGlzLmFib3J0aW5nID0gdHJ1ZTtcbiAgdGhpcy5lbWl0KCdjbG9zZScsIGVyci5jb2RlLCBlcnIubWVzc2FnZSk7XG4gIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG59O1xuXG5Kc29ucFJlY2VpdmVyLnByb3RvdHlwZS5fY2xlYW51cCA9IGZ1bmN0aW9uKCkge1xuICBkZWJ1ZygnX2NsZWFudXAnKTtcbiAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dElkKTtcbiAgaWYgKHRoaXMuc2NyaXB0Mikge1xuICAgIHRoaXMuc2NyaXB0Mi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuc2NyaXB0Mik7XG4gICAgdGhpcy5zY3JpcHQyID0gbnVsbDtcbiAgfVxuICBpZiAodGhpcy5zY3JpcHQpIHtcbiAgICB2YXIgc2NyaXB0ID0gdGhpcy5zY3JpcHQ7XG4gICAgLy8gVW5mb3J0dW5hdGVseSwgeW91IGNhbid0IHJlYWxseSBhYm9ydCBzY3JpcHQgbG9hZGluZyBvZlxuICAgIC8vIHRoZSBzY3JpcHQuXG4gICAgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gc2NyaXB0Lm9uZXJyb3IgPVxuICAgICAgICBzY3JpcHQub25sb2FkID0gc2NyaXB0Lm9uY2xpY2sgPSBudWxsO1xuICAgIHRoaXMuc2NyaXB0ID0gbnVsbDtcbiAgfVxuICBkZWxldGUgZ2xvYmFsW3V0aWxzLldQcmVmaXhdW3RoaXMuaWRdO1xufTtcblxuSnNvbnBSZWNlaXZlci5wcm90b3R5cGUuX3NjcmlwdEVycm9yID0gZnVuY3Rpb24oKSB7XG4gIGRlYnVnKCdfc2NyaXB0RXJyb3InKTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBpZiAodGhpcy5lcnJvclRpbWVyKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5lcnJvclRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICBpZiAoIXNlbGYubG9hZGVkT2theSkge1xuICAgICAgc2VsZi5fYWJvcnQobmV3IEVycm9yKCdKU09OUCBzY3JpcHQgbG9hZGVkIGFibm9ybWFsbHkgKG9uZXJyb3IpJykpO1xuICAgIH1cbiAgfSwgSnNvbnBSZWNlaXZlci5zY3JpcHRFcnJvclRpbWVvdXQpO1xufTtcblxuSnNvbnBSZWNlaXZlci5wcm90b3R5cGUuX2NyZWF0ZVNjcmlwdCA9IGZ1bmN0aW9uKHVybCkge1xuICBkZWJ1ZygnX2NyZWF0ZVNjcmlwdCcsIHVybCk7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHNjcmlwdCA9IHRoaXMuc2NyaXB0ID0gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICB2YXIgc2NyaXB0MjsgIC8vIE9wZXJhIHN5bmNocm9ub3VzIGxvYWQgdHJpY2suXG5cbiAgc2NyaXB0LmlkID0gJ2EnICsgcmFuZG9tLnN0cmluZyg4KTtcbiAgc2NyaXB0LnNyYyA9IHVybDtcbiAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgc2NyaXB0LmNoYXJzZXQgPSAnVVRGLTgnO1xuICBzY3JpcHQub25lcnJvciA9IHRoaXMuX3NjcmlwdEVycm9yLmJpbmQodGhpcyk7XG4gIHNjcmlwdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICBkZWJ1Zygnb25sb2FkJyk7XG4gICAgc2VsZi5fYWJvcnQobmV3IEVycm9yKCdKU09OUCBzY3JpcHQgbG9hZGVkIGFibm9ybWFsbHkgKG9ubG9hZCknKSk7XG4gIH07XG5cbiAgLy8gSUU5IGZpcmVzICdlcnJvcicgZXZlbnQgYWZ0ZXIgb25yZWFkeXN0YXRlY2hhbmdlIG9yIGJlZm9yZSwgaW4gcmFuZG9tIG9yZGVyLlxuICAvLyBVc2UgbG9hZGVkT2theSB0byBkZXRlcm1pbmUgaWYgYWN0dWFsbHkgZXJyb3JlZFxuICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgZGVidWcoJ29ucmVhZHlzdGF0ZWNoYW5nZScsIHNjcmlwdC5yZWFkeVN0YXRlKTtcbiAgICBpZiAoL2xvYWRlZHxjbG9zZWQvLnRlc3Qoc2NyaXB0LnJlYWR5U3RhdGUpKSB7XG4gICAgICBpZiAoc2NyaXB0ICYmIHNjcmlwdC5odG1sRm9yICYmIHNjcmlwdC5vbmNsaWNrKSB7XG4gICAgICAgIHNlbGYubG9hZGVkT2theSA9IHRydWU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gSW4gSUUsIGFjdHVhbGx5IGV4ZWN1dGUgdGhlIHNjcmlwdC5cbiAgICAgICAgICBzY3JpcHQub25jbGljaygpO1xuICAgICAgICB9IGNhdGNoICh4KSB7XG4gICAgICAgICAgLy8gaW50ZW50aW9uYWxseSBlbXB0eVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc2NyaXB0KSB7XG4gICAgICAgIHNlbGYuX2Fib3J0KG5ldyBFcnJvcignSlNPTlAgc2NyaXB0IGxvYWRlZCBhYm5vcm1hbGx5IChvbnJlYWR5c3RhdGVjaGFuZ2UpJykpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgLy8gSUU6IGV2ZW50L2h0bWxGb3Ivb25jbGljayB0cmljay5cbiAgLy8gT25lIGNhbid0IHJlbHkgb24gcHJvcGVyIG9yZGVyIGZvciBvbnJlYWR5c3RhdGVjaGFuZ2UuIEluIG9yZGVyIHRvXG4gIC8vIG1ha2Ugc3VyZSwgc2V0IGEgJ2h0bWxGb3InIGFuZCAnZXZlbnQnIHByb3BlcnRpZXMsIHNvIHRoYXRcbiAgLy8gc2NyaXB0IGNvZGUgd2lsbCBiZSBpbnN0YWxsZWQgYXMgJ29uY2xpY2snIGhhbmRsZXIgZm9yIHRoZVxuICAvLyBzY3JpcHQgb2JqZWN0LiBMYXRlciwgb25yZWFkeXN0YXRlY2hhbmdlLCBtYW51YWxseSBleGVjdXRlIHRoaXNcbiAgLy8gY29kZS4gRkYgYW5kIENocm9tZSBkb2Vzbid0IHdvcmsgd2l0aCAnZXZlbnQnIGFuZCAnaHRtbEZvcidcbiAgLy8gc2V0LiBGb3IgcmVmZXJlbmNlIHNlZTpcbiAgLy8gICBodHRwOi8vamF1Ym91cmcubmV0LzIwMTAvMDcvbG9hZGluZy1zY3JpcHQtYXMtb25jbGljay1oYW5kbGVyLW9mLmh0bWxcbiAgLy8gQWxzbywgcmVhZCBvbiB0aGF0IGFib3V0IHNjcmlwdCBvcmRlcmluZzpcbiAgLy8gICBodHRwOi8vd2lraS53aGF0d2cub3JnL3dpa2kvRHluYW1pY19TY3JpcHRfRXhlY3V0aW9uX09yZGVyXG4gIGlmICh0eXBlb2Ygc2NyaXB0LmFzeW5jID09PSAndW5kZWZpbmVkJyAmJiBnbG9iYWwuZG9jdW1lbnQuYXR0YWNoRXZlbnQpIHtcbiAgICAvLyBBY2NvcmRpbmcgdG8gbW96aWxsYSBkb2NzLCBpbiByZWNlbnQgYnJvd3NlcnMgc2NyaXB0LmFzeW5jIGRlZmF1bHRzXG4gICAgLy8gdG8gJ3RydWUnLCBzbyB3ZSBtYXkgdXNlIGl0IHRvIGRldGVjdCBhIGdvb2QgYnJvd3NlcjpcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9IVE1ML0VsZW1lbnQvc2NyaXB0XG4gICAgaWYgKCFicm93c2VyLmlzT3BlcmEoKSkge1xuICAgICAgLy8gTmFpdmVseSBhc3N1bWUgd2UncmUgaW4gSUVcbiAgICAgIHRyeSB7XG4gICAgICAgIHNjcmlwdC5odG1sRm9yID0gc2NyaXB0LmlkO1xuICAgICAgICBzY3JpcHQuZXZlbnQgPSAnb25jbGljayc7XG4gICAgICB9IGNhdGNoICh4KSB7XG4gICAgICAgIC8vIGludGVudGlvbmFsbHkgZW1wdHlcbiAgICAgIH1cbiAgICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE9wZXJhLCBzZWNvbmQgc3luYyBzY3JpcHQgaGFja1xuICAgICAgc2NyaXB0MiA9IHRoaXMuc2NyaXB0MiA9IGdsb2JhbC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgIHNjcmlwdDIudGV4dCA9IFwidHJ5e3ZhciBhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1wiICsgc2NyaXB0LmlkICsgXCInKTsgaWYoYSlhLm9uZXJyb3IoKTt9Y2F0Y2goeCl7fTtcIjtcbiAgICAgIHNjcmlwdC5hc3luYyA9IHNjcmlwdDIuYXN5bmMgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgaWYgKHR5cGVvZiBzY3JpcHQuYXN5bmMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgfVxuXG4gIHZhciBoZWFkID0gZ2xvYmFsLmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gIGhlYWQuaW5zZXJ0QmVmb3JlKHNjcmlwdCwgaGVhZC5maXJzdENoaWxkKTtcbiAgaWYgKHNjcmlwdDIpIHtcbiAgICBoZWFkLmluc2VydEJlZm9yZShzY3JpcHQyLCBoZWFkLmZpcnN0Q2hpbGQpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEpzb25wUmVjZWl2ZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJylcbiAgLCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXJcbiAgO1xuXG52YXIgZGVidWcgPSBmdW5jdGlvbigpIHt9O1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NranMtY2xpZW50OnJlY2VpdmVyOnhocicpO1xufVxuXG5mdW5jdGlvbiBYaHJSZWNlaXZlcih1cmwsIEFqYXhPYmplY3QpIHtcbiAgZGVidWcodXJsKTtcbiAgRXZlbnRFbWl0dGVyLmNhbGwodGhpcyk7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICB0aGlzLmJ1ZmZlclBvc2l0aW9uID0gMDtcblxuICB0aGlzLnhvID0gbmV3IEFqYXhPYmplY3QoJ1BPU1QnLCB1cmwsIG51bGwpO1xuICB0aGlzLnhvLm9uKCdjaHVuaycsIHRoaXMuX2NodW5rSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgdGhpcy54by5vbmNlKCdmaW5pc2gnLCBmdW5jdGlvbihzdGF0dXMsIHRleHQpIHtcbiAgICBkZWJ1ZygnZmluaXNoJywgc3RhdHVzLCB0ZXh0KTtcbiAgICBzZWxmLl9jaHVua0hhbmRsZXIoc3RhdHVzLCB0ZXh0KTtcbiAgICBzZWxmLnhvID0gbnVsbDtcbiAgICB2YXIgcmVhc29uID0gc3RhdHVzID09PSAyMDAgPyAnbmV0d29yaycgOiAncGVybWFuZW50JztcbiAgICBkZWJ1ZygnY2xvc2UnLCByZWFzb24pO1xuICAgIHNlbGYuZW1pdCgnY2xvc2UnLCBudWxsLCByZWFzb24pO1xuICAgIHNlbGYuX2NsZWFudXAoKTtcbiAgfSk7XG59XG5cbmluaGVyaXRzKFhoclJlY2VpdmVyLCBFdmVudEVtaXR0ZXIpO1xuXG5YaHJSZWNlaXZlci5wcm90b3R5cGUuX2NodW5rSGFuZGxlciA9IGZ1bmN0aW9uKHN0YXR1cywgdGV4dCkge1xuICBkZWJ1ZygnX2NodW5rSGFuZGxlcicsIHN0YXR1cyk7XG4gIGlmIChzdGF0dXMgIT09IDIwMCB8fCAhdGV4dCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGZvciAodmFyIGlkeCA9IC0xOyA7IHRoaXMuYnVmZmVyUG9zaXRpb24gKz0gaWR4ICsgMSkge1xuICAgIHZhciBidWYgPSB0ZXh0LnNsaWNlKHRoaXMuYnVmZmVyUG9zaXRpb24pO1xuICAgIGlkeCA9IGJ1Zi5pbmRleE9mKCdcXG4nKTtcbiAgICBpZiAoaWR4ID09PSAtMSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHZhciBtc2cgPSBidWYuc2xpY2UoMCwgaWR4KTtcbiAgICBpZiAobXNnKSB7XG4gICAgICBkZWJ1ZygnbWVzc2FnZScsIG1zZyk7XG4gICAgICB0aGlzLmVtaXQoJ21lc3NhZ2UnLCBtc2cpO1xuICAgIH1cbiAgfVxufTtcblxuWGhyUmVjZWl2ZXIucHJvdG90eXBlLl9jbGVhbnVwID0gZnVuY3Rpb24oKSB7XG4gIGRlYnVnKCdfY2xlYW51cCcpO1xuICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpO1xufTtcblxuWGhyUmVjZWl2ZXIucHJvdG90eXBlLmFib3J0ID0gZnVuY3Rpb24oKSB7XG4gIGRlYnVnKCdhYm9ydCcpO1xuICBpZiAodGhpcy54bykge1xuICAgIHRoaXMueG8uY2xvc2UoKTtcbiAgICBkZWJ1ZygnY2xvc2UnKTtcbiAgICB0aGlzLmVtaXQoJ2Nsb3NlJywgbnVsbCwgJ3VzZXInKTtcbiAgICB0aGlzLnhvID0gbnVsbDtcbiAgfVxuICB0aGlzLl9jbGVhbnVwKCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFhoclJlY2VpdmVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmFuZG9tID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvcmFuZG9tJylcbiAgLCB1cmxVdGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3VybCcpXG4gIDtcblxudmFyIGRlYnVnID0gZnVuY3Rpb24oKSB7fTtcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2pzLWNsaWVudDpzZW5kZXI6anNvbnAnKTtcbn1cblxudmFyIGZvcm0sIGFyZWE7XG5cbmZ1bmN0aW9uIGNyZWF0ZUlmcmFtZShpZCkge1xuICBkZWJ1ZygnY3JlYXRlSWZyYW1lJywgaWQpO1xuICB0cnkge1xuICAgIC8vIGllNiBkeW5hbWljIGlmcmFtZXMgd2l0aCB0YXJnZXQ9XCJcIiBzdXBwb3J0ICh0aGFua3MgQ2hyaXMgTGFtYmFjaGVyKVxuICAgIHJldHVybiBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnPGlmcmFtZSBuYW1lPVwiJyArIGlkICsgJ1wiPicpO1xuICB9IGNhdGNoICh4KSB7XG4gICAgdmFyIGlmcmFtZSA9IGdsb2JhbC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICBpZnJhbWUubmFtZSA9IGlkO1xuICAgIHJldHVybiBpZnJhbWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlRm9ybSgpIHtcbiAgZGVidWcoJ2NyZWF0ZUZvcm0nKTtcbiAgZm9ybSA9IGdsb2JhbC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gIGZvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgZm9ybS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gIGZvcm0ubWV0aG9kID0gJ1BPU1QnO1xuICBmb3JtLmVuY3R5cGUgPSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJztcbiAgZm9ybS5hY2NlcHRDaGFyc2V0ID0gJ1VURi04JztcblxuICBhcmVhID0gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gIGFyZWEubmFtZSA9ICdkJztcbiAgZm9ybS5hcHBlbmRDaGlsZChhcmVhKTtcblxuICBnbG9iYWwuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb3JtKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1cmwsIHBheWxvYWQsIGNhbGxiYWNrKSB7XG4gIGRlYnVnKHVybCwgcGF5bG9hZCk7XG4gIGlmICghZm9ybSkge1xuICAgIGNyZWF0ZUZvcm0oKTtcbiAgfVxuICB2YXIgaWQgPSAnYScgKyByYW5kb20uc3RyaW5nKDgpO1xuICBmb3JtLnRhcmdldCA9IGlkO1xuICBmb3JtLmFjdGlvbiA9IHVybFV0aWxzLmFkZFF1ZXJ5KHVybFV0aWxzLmFkZFBhdGgodXJsLCAnL2pzb25wX3NlbmQnKSwgJ2k9JyArIGlkKTtcblxuICB2YXIgaWZyYW1lID0gY3JlYXRlSWZyYW1lKGlkKTtcbiAgaWZyYW1lLmlkID0gaWQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBmb3JtLmFwcGVuZENoaWxkKGlmcmFtZSk7XG5cbiAgdHJ5IHtcbiAgICBhcmVhLnZhbHVlID0gcGF5bG9hZDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIHNlcmlvdXNseSBicm9rZW4gYnJvd3NlcnMgZ2V0IGhlcmVcbiAgfVxuICBmb3JtLnN1Ym1pdCgpO1xuXG4gIHZhciBjb21wbGV0ZWQgPSBmdW5jdGlvbihlcnIpIHtcbiAgICBkZWJ1ZygnY29tcGxldGVkJywgaWQsIGVycik7XG4gICAgaWYgKCFpZnJhbWUub25lcnJvcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZnJhbWUub25yZWFkeXN0YXRlY2hhbmdlID0gaWZyYW1lLm9uZXJyb3IgPSBpZnJhbWUub25sb2FkID0gbnVsbDtcbiAgICAvLyBPcGVyYSBtaW5pIGRvZXNuJ3QgbGlrZSBpZiB3ZSBHQyBpZnJhbWVcbiAgICAvLyBpbW1lZGlhdGVseSwgdGh1cyB0aGlzIHRpbWVvdXQuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGRlYnVnKCdjbGVhbmluZyB1cCcsIGlkKTtcbiAgICAgIGlmcmFtZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gICAgICBpZnJhbWUgPSBudWxsO1xuICAgIH0sIDUwMCk7XG4gICAgYXJlYS52YWx1ZSA9ICcnO1xuICAgIC8vIEl0IGlzIG5vdCBwb3NzaWJsZSB0byBkZXRlY3QgaWYgdGhlIGlmcmFtZSBzdWNjZWVkZWQgb3JcbiAgICAvLyBmYWlsZWQgdG8gc3VibWl0IG91ciBmb3JtLlxuICAgIGNhbGxiYWNrKGVycik7XG4gIH07XG4gIGlmcmFtZS5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgZGVidWcoJ29uZXJyb3InLCBpZCk7XG4gICAgY29tcGxldGVkKCk7XG4gIH07XG4gIGlmcmFtZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICBkZWJ1Zygnb25sb2FkJywgaWQpO1xuICAgIGNvbXBsZXRlZCgpO1xuICB9O1xuICBpZnJhbWUub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oZSkge1xuICAgIGRlYnVnKCdvbnJlYWR5c3RhdGVjaGFuZ2UnLCBpZCwgaWZyYW1lLnJlYWR5U3RhdGUsIGUpO1xuICAgIGlmIChpZnJhbWUucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgY29tcGxldGVkKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgZGVidWcoJ2Fib3J0ZWQnLCBpZCk7XG4gICAgY29tcGxldGVkKG5ldyBFcnJvcignQWJvcnRlZCcpKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXJcbiAgLCBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJylcbiAgLCBldmVudFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvZXZlbnQnKVxuICAsIGJyb3dzZXIgPSByZXF1aXJlKCcuLi8uLi91dGlscy9icm93c2VyJylcbiAgLCB1cmxVdGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3VybCcpXG4gIDtcblxudmFyIGRlYnVnID0gZnVuY3Rpb24oKSB7fTtcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2pzLWNsaWVudDpzZW5kZXI6eGRyJyk7XG59XG5cbi8vIFJlZmVyZW5jZXM6XG4vLyAgIGh0dHA6Ly9hamF4aWFuLmNvbS9hcmNoaXZlcy8xMDAtbGluZS1hamF4LXdyYXBwZXJcbi8vICAgaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2NjMjg4MDYwKHY9VlMuODUpLmFzcHhcblxuZnVuY3Rpb24gWERST2JqZWN0KG1ldGhvZCwgdXJsLCBwYXlsb2FkKSB7XG4gIGRlYnVnKG1ldGhvZCwgdXJsKTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIHNlbGYuX3N0YXJ0KG1ldGhvZCwgdXJsLCBwYXlsb2FkKTtcbiAgfSwgMCk7XG59XG5cbmluaGVyaXRzKFhEUk9iamVjdCwgRXZlbnRFbWl0dGVyKTtcblxuWERST2JqZWN0LnByb3RvdHlwZS5fc3RhcnQgPSBmdW5jdGlvbihtZXRob2QsIHVybCwgcGF5bG9hZCkge1xuICBkZWJ1ZygnX3N0YXJ0Jyk7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHhkciA9IG5ldyBnbG9iYWwuWERvbWFpblJlcXVlc3QoKTtcbiAgLy8gSUUgY2FjaGVzIGV2ZW4gUE9TVHNcbiAgdXJsID0gdXJsVXRpbHMuYWRkUXVlcnkodXJsLCAndD0nICsgKCtuZXcgRGF0ZSgpKSk7XG5cbiAgeGRyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICBkZWJ1Zygnb25lcnJvcicpO1xuICAgIHNlbGYuX2Vycm9yKCk7XG4gIH07XG4gIHhkci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgICBkZWJ1Zygnb250aW1lb3V0Jyk7XG4gICAgc2VsZi5fZXJyb3IoKTtcbiAgfTtcbiAgeGRyLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbigpIHtcbiAgICBkZWJ1ZygncHJvZ3Jlc3MnLCB4ZHIucmVzcG9uc2VUZXh0KTtcbiAgICBzZWxmLmVtaXQoJ2NodW5rJywgMjAwLCB4ZHIucmVzcG9uc2VUZXh0KTtcbiAgfTtcbiAgeGRyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIGRlYnVnKCdsb2FkJyk7XG4gICAgc2VsZi5lbWl0KCdmaW5pc2gnLCAyMDAsIHhkci5yZXNwb25zZVRleHQpO1xuICAgIHNlbGYuX2NsZWFudXAoZmFsc2UpO1xuICB9O1xuICB0aGlzLnhkciA9IHhkcjtcbiAgdGhpcy51bmxvYWRSZWYgPSBldmVudFV0aWxzLnVubG9hZEFkZChmdW5jdGlvbigpIHtcbiAgICBzZWxmLl9jbGVhbnVwKHRydWUpO1xuICB9KTtcbiAgdHJ5IHtcbiAgICAvLyBGYWlscyB3aXRoIEFjY2Vzc0RlbmllZCBpZiBwb3J0IG51bWJlciBpcyBib2d1c1xuICAgIHRoaXMueGRyLm9wZW4obWV0aG9kLCB1cmwpO1xuICAgIGlmICh0aGlzLnRpbWVvdXQpIHtcbiAgICAgIHRoaXMueGRyLnRpbWVvdXQgPSB0aGlzLnRpbWVvdXQ7XG4gICAgfVxuICAgIHRoaXMueGRyLnNlbmQocGF5bG9hZCk7XG4gIH0gY2F0Y2ggKHgpIHtcbiAgICB0aGlzLl9lcnJvcigpO1xuICB9XG59O1xuXG5YRFJPYmplY3QucHJvdG90eXBlLl9lcnJvciA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmVtaXQoJ2ZpbmlzaCcsIDAsICcnKTtcbiAgdGhpcy5fY2xlYW51cChmYWxzZSk7XG59O1xuXG5YRFJPYmplY3QucHJvdG90eXBlLl9jbGVhbnVwID0gZnVuY3Rpb24oYWJvcnQpIHtcbiAgZGVidWcoJ2NsZWFudXAnLCBhYm9ydCk7XG4gIGlmICghdGhpcy54ZHIpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgZXZlbnRVdGlscy51bmxvYWREZWwodGhpcy51bmxvYWRSZWYpO1xuXG4gIHRoaXMueGRyLm9udGltZW91dCA9IHRoaXMueGRyLm9uZXJyb3IgPSB0aGlzLnhkci5vbnByb2dyZXNzID0gdGhpcy54ZHIub25sb2FkID0gbnVsbDtcbiAgaWYgKGFib3J0KSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMueGRyLmFib3J0KCk7XG4gICAgfSBjYXRjaCAoeCkge1xuICAgICAgLy8gaW50ZW50aW9uYWxseSBlbXB0eVxuICAgIH1cbiAgfVxuICB0aGlzLnVubG9hZFJlZiA9IHRoaXMueGRyID0gbnVsbDtcbn07XG5cblhEUk9iamVjdC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgZGVidWcoJ2Nsb3NlJyk7XG4gIHRoaXMuX2NsZWFudXAodHJ1ZSk7XG59O1xuXG4vLyBJRSA4LzkgaWYgdGhlIHJlcXVlc3QgdGFyZ2V0IHVzZXMgdGhlIHNhbWUgc2NoZW1lIC0gIzc5XG5YRFJPYmplY3QuZW5hYmxlZCA9ICEhKGdsb2JhbC5YRG9tYWluUmVxdWVzdCAmJiBicm93c2VyLmhhc0RvbWFpbigpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBYRFJPYmplY3Q7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJylcbiAgLCBYaHJEcml2ZXIgPSByZXF1aXJlKCcuLi9kcml2ZXIveGhyJylcbiAgO1xuXG5mdW5jdGlvbiBYSFJDb3JzT2JqZWN0KG1ldGhvZCwgdXJsLCBwYXlsb2FkLCBvcHRzKSB7XG4gIFhockRyaXZlci5jYWxsKHRoaXMsIG1ldGhvZCwgdXJsLCBwYXlsb2FkLCBvcHRzKTtcbn1cblxuaW5oZXJpdHMoWEhSQ29yc09iamVjdCwgWGhyRHJpdmVyKTtcblxuWEhSQ29yc09iamVjdC5lbmFibGVkID0gWGhyRHJpdmVyLmVuYWJsZWQgJiYgWGhyRHJpdmVyLnN1cHBvcnRzQ09SUztcblxubW9kdWxlLmV4cG9ydHMgPSBYSFJDb3JzT2JqZWN0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyXG4gICwgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG4gIDtcblxuZnVuY3Rpb24gWEhSRmFrZSgvKiBtZXRob2QsIHVybCwgcGF5bG9hZCwgb3B0cyAqLykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIEV2ZW50RW1pdHRlci5jYWxsKHRoaXMpO1xuXG4gIHRoaXMudG8gPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIHNlbGYuZW1pdCgnZmluaXNoJywgMjAwLCAne30nKTtcbiAgfSwgWEhSRmFrZS50aW1lb3V0KTtcbn1cblxuaW5oZXJpdHMoWEhSRmFrZSwgRXZlbnRFbWl0dGVyKTtcblxuWEhSRmFrZS5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgY2xlYXJUaW1lb3V0KHRoaXMudG8pO1xufTtcblxuWEhSRmFrZS50aW1lb3V0ID0gMjAwMDtcblxubW9kdWxlLmV4cG9ydHMgPSBYSFJGYWtlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG4gICwgWGhyRHJpdmVyID0gcmVxdWlyZSgnLi4vZHJpdmVyL3hocicpXG4gIDtcblxuZnVuY3Rpb24gWEhSTG9jYWxPYmplY3QobWV0aG9kLCB1cmwsIHBheWxvYWQgLyosIG9wdHMgKi8pIHtcbiAgWGhyRHJpdmVyLmNhbGwodGhpcywgbWV0aG9kLCB1cmwsIHBheWxvYWQsIHtcbiAgICBub0NyZWRlbnRpYWxzOiB0cnVlXG4gIH0pO1xufVxuXG5pbmhlcml0cyhYSFJMb2NhbE9iamVjdCwgWGhyRHJpdmVyKTtcblxuWEhSTG9jYWxPYmplY3QuZW5hYmxlZCA9IFhockRyaXZlci5lbmFibGVkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFhIUkxvY2FsT2JqZWN0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy9ldmVudCcpXG4gICwgdXJsVXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy91cmwnKVxuICAsIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKVxuICAsIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlclxuICAsIFdlYnNvY2tldERyaXZlciA9IHJlcXVpcmUoJy4vZHJpdmVyL3dlYnNvY2tldCcpXG4gIDtcblxudmFyIGRlYnVnID0gZnVuY3Rpb24oKSB7fTtcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2pzLWNsaWVudDp3ZWJzb2NrZXQnKTtcbn1cblxuZnVuY3Rpb24gV2ViU29ja2V0VHJhbnNwb3J0KHRyYW5zVXJsLCBpZ25vcmUsIG9wdGlvbnMpIHtcbiAgaWYgKCFXZWJTb2NrZXRUcmFuc3BvcnQuZW5hYmxlZCgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUcmFuc3BvcnQgY3JlYXRlZCB3aGVuIGRpc2FibGVkJyk7XG4gIH1cblxuICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcbiAgZGVidWcoJ2NvbnN0cnVjdG9yJywgdHJhbnNVcmwpO1xuXG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHVybCA9IHVybFV0aWxzLmFkZFBhdGgodHJhbnNVcmwsICcvd2Vic29ja2V0Jyk7XG4gIGlmICh1cmwuc2xpY2UoMCwgNSkgPT09ICdodHRwcycpIHtcbiAgICB1cmwgPSAnd3NzJyArIHVybC5zbGljZSg1KTtcbiAgfSBlbHNlIHtcbiAgICB1cmwgPSAnd3MnICsgdXJsLnNsaWNlKDQpO1xuICB9XG4gIHRoaXMudXJsID0gdXJsO1xuXG4gIHRoaXMud3MgPSBuZXcgV2Vic29ja2V0RHJpdmVyKHRoaXMudXJsLCBbXSwgb3B0aW9ucyk7XG4gIHRoaXMud3Mub25tZXNzYWdlID0gZnVuY3Rpb24oZSkge1xuICAgIGRlYnVnKCdtZXNzYWdlIGV2ZW50JywgZS5kYXRhKTtcbiAgICBzZWxmLmVtaXQoJ21lc3NhZ2UnLCBlLmRhdGEpO1xuICB9O1xuICAvLyBGaXJlZm94IGhhcyBhbiBpbnRlcmVzdGluZyBidWcuIElmIGEgd2Vic29ja2V0IGNvbm5lY3Rpb24gaXNcbiAgLy8gY3JlYXRlZCBhZnRlciBvbnVubG9hZCwgaXQgc3RheXMgYWxpdmUgZXZlbiB3aGVuIHVzZXJcbiAgLy8gbmF2aWdhdGVzIGF3YXkgZnJvbSB0aGUgcGFnZS4gSW4gc3VjaCBzaXR1YXRpb24gbGV0J3MgbGllIC1cbiAgLy8gbGV0J3Mgbm90IG9wZW4gdGhlIHdzIGNvbm5lY3Rpb24gYXQgYWxsLiBTZWU6XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zb2NranMvc29ja2pzLWNsaWVudC9pc3N1ZXMvMjhcbiAgLy8gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk2MDg1XG4gIHRoaXMudW5sb2FkUmVmID0gdXRpbHMudW5sb2FkQWRkKGZ1bmN0aW9uKCkge1xuICAgIGRlYnVnKCd1bmxvYWQnKTtcbiAgICBzZWxmLndzLmNsb3NlKCk7XG4gIH0pO1xuICB0aGlzLndzLm9uY2xvc2UgPSBmdW5jdGlvbihlKSB7XG4gICAgZGVidWcoJ2Nsb3NlIGV2ZW50JywgZS5jb2RlLCBlLnJlYXNvbik7XG4gICAgc2VsZi5lbWl0KCdjbG9zZScsIGUuY29kZSwgZS5yZWFzb24pO1xuICAgIHNlbGYuX2NsZWFudXAoKTtcbiAgfTtcbiAgdGhpcy53cy5vbmVycm9yID0gZnVuY3Rpb24oZSkge1xuICAgIGRlYnVnKCdlcnJvciBldmVudCcsIGUpO1xuICAgIHNlbGYuZW1pdCgnY2xvc2UnLCAxMDA2LCAnV2ViU29ja2V0IGNvbm5lY3Rpb24gYnJva2VuJyk7XG4gICAgc2VsZi5fY2xlYW51cCgpO1xuICB9O1xufVxuXG5pbmhlcml0cyhXZWJTb2NrZXRUcmFuc3BvcnQsIEV2ZW50RW1pdHRlcik7XG5cbldlYlNvY2tldFRyYW5zcG9ydC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgdmFyIG1zZyA9ICdbJyArIGRhdGEgKyAnXSc7XG4gIGRlYnVnKCdzZW5kJywgbXNnKTtcbiAgdGhpcy53cy5zZW5kKG1zZyk7XG59O1xuXG5XZWJTb2NrZXRUcmFuc3BvcnQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIGRlYnVnKCdjbG9zZScpO1xuICB2YXIgd3MgPSB0aGlzLndzO1xuICB0aGlzLl9jbGVhbnVwKCk7XG4gIGlmICh3cykge1xuICAgIHdzLmNsb3NlKCk7XG4gIH1cbn07XG5cbldlYlNvY2tldFRyYW5zcG9ydC5wcm90b3R5cGUuX2NsZWFudXAgPSBmdW5jdGlvbigpIHtcbiAgZGVidWcoJ19jbGVhbnVwJyk7XG4gIHZhciB3cyA9IHRoaXMud3M7XG4gIGlmICh3cykge1xuICAgIHdzLm9ubWVzc2FnZSA9IHdzLm9uY2xvc2UgPSB3cy5vbmVycm9yID0gbnVsbDtcbiAgfVxuICB1dGlscy51bmxvYWREZWwodGhpcy51bmxvYWRSZWYpO1xuICB0aGlzLnVubG9hZFJlZiA9IHRoaXMud3MgPSBudWxsO1xuICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpO1xufTtcblxuV2ViU29ja2V0VHJhbnNwb3J0LmVuYWJsZWQgPSBmdW5jdGlvbigpIHtcbiAgZGVidWcoJ2VuYWJsZWQnKTtcbiAgcmV0dXJuICEhV2Vic29ja2V0RHJpdmVyO1xufTtcbldlYlNvY2tldFRyYW5zcG9ydC50cmFuc3BvcnROYW1lID0gJ3dlYnNvY2tldCc7XG5cbi8vIEluIHRoZW9yeSwgd3Mgc2hvdWxkIHJlcXVpcmUgMSByb3VuZCB0cmlwLiBCdXQgaW4gY2hyb21lLCB0aGlzIGlzXG4vLyBub3QgdmVyeSBzdGFibGUgb3ZlciBTU0wuIE1vc3QgbGlrZWx5IGEgd3MgY29ubmVjdGlvbiByZXF1aXJlcyBhXG4vLyBzZXBhcmF0ZSBTU0wgY29ubmVjdGlvbiwgaW4gd2hpY2ggY2FzZSAyIHJvdW5kIHRyaXBzIGFyZSBhblxuLy8gYWJzb2x1dGUgbWludW11bS5cbldlYlNvY2tldFRyYW5zcG9ydC5yb3VuZFRyaXBzID0gMjtcblxubW9kdWxlLmV4cG9ydHMgPSBXZWJTb2NrZXRUcmFuc3BvcnQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJylcbiAgLCBBamF4QmFzZWRUcmFuc3BvcnQgPSByZXF1aXJlKCcuL2xpYi9hamF4LWJhc2VkJylcbiAgLCBYZHJTdHJlYW1pbmdUcmFuc3BvcnQgPSByZXF1aXJlKCcuL3hkci1zdHJlYW1pbmcnKVxuICAsIFhoclJlY2VpdmVyID0gcmVxdWlyZSgnLi9yZWNlaXZlci94aHInKVxuICAsIFhEUk9iamVjdCA9IHJlcXVpcmUoJy4vc2VuZGVyL3hkcicpXG4gIDtcblxuZnVuY3Rpb24gWGRyUG9sbGluZ1RyYW5zcG9ydCh0cmFuc1VybCkge1xuICBpZiAoIVhEUk9iamVjdC5lbmFibGVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUcmFuc3BvcnQgY3JlYXRlZCB3aGVuIGRpc2FibGVkJyk7XG4gIH1cbiAgQWpheEJhc2VkVHJhbnNwb3J0LmNhbGwodGhpcywgdHJhbnNVcmwsICcveGhyJywgWGhyUmVjZWl2ZXIsIFhEUk9iamVjdCk7XG59XG5cbmluaGVyaXRzKFhkclBvbGxpbmdUcmFuc3BvcnQsIEFqYXhCYXNlZFRyYW5zcG9ydCk7XG5cblhkclBvbGxpbmdUcmFuc3BvcnQuZW5hYmxlZCA9IFhkclN0cmVhbWluZ1RyYW5zcG9ydC5lbmFibGVkO1xuWGRyUG9sbGluZ1RyYW5zcG9ydC50cmFuc3BvcnROYW1lID0gJ3hkci1wb2xsaW5nJztcblhkclBvbGxpbmdUcmFuc3BvcnQucm91bmRUcmlwcyA9IDI7IC8vIHByZWZsaWdodCwgYWpheFxuXG5tb2R1bGUuZXhwb3J0cyA9IFhkclBvbGxpbmdUcmFuc3BvcnQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJylcbiAgLCBBamF4QmFzZWRUcmFuc3BvcnQgPSByZXF1aXJlKCcuL2xpYi9hamF4LWJhc2VkJylcbiAgLCBYaHJSZWNlaXZlciA9IHJlcXVpcmUoJy4vcmVjZWl2ZXIveGhyJylcbiAgLCBYRFJPYmplY3QgPSByZXF1aXJlKCcuL3NlbmRlci94ZHInKVxuICA7XG5cbi8vIEFjY29yZGluZyB0bzpcbi8vICAgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNjQxNTA3L2RldGVjdC1icm93c2VyLXN1cHBvcnQtZm9yLWNyb3NzLWRvbWFpbi14bWxodHRwcmVxdWVzdHNcbi8vICAgaHR0cDovL2hhY2tzLm1vemlsbGEub3JnLzIwMDkvMDcvY3Jvc3Mtc2l0ZS14bWxodHRwcmVxdWVzdC13aXRoLWNvcnMvXG5cbmZ1bmN0aW9uIFhkclN0cmVhbWluZ1RyYW5zcG9ydCh0cmFuc1VybCkge1xuICBpZiAoIVhEUk9iamVjdC5lbmFibGVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUcmFuc3BvcnQgY3JlYXRlZCB3aGVuIGRpc2FibGVkJyk7XG4gIH1cbiAgQWpheEJhc2VkVHJhbnNwb3J0LmNhbGwodGhpcywgdHJhbnNVcmwsICcveGhyX3N0cmVhbWluZycsIFhoclJlY2VpdmVyLCBYRFJPYmplY3QpO1xufVxuXG5pbmhlcml0cyhYZHJTdHJlYW1pbmdUcmFuc3BvcnQsIEFqYXhCYXNlZFRyYW5zcG9ydCk7XG5cblhkclN0cmVhbWluZ1RyYW5zcG9ydC5lbmFibGVkID0gZnVuY3Rpb24oaW5mbykge1xuICBpZiAoaW5mby5jb29raWVfbmVlZGVkIHx8IGluZm8ubnVsbE9yaWdpbikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gWERST2JqZWN0LmVuYWJsZWQgJiYgaW5mby5zYW1lU2NoZW1lO1xufTtcblxuWGRyU3RyZWFtaW5nVHJhbnNwb3J0LnRyYW5zcG9ydE5hbWUgPSAneGRyLXN0cmVhbWluZyc7XG5YZHJTdHJlYW1pbmdUcmFuc3BvcnQucm91bmRUcmlwcyA9IDI7IC8vIHByZWZsaWdodCwgYWpheFxuXG5tb2R1bGUuZXhwb3J0cyA9IFhkclN0cmVhbWluZ1RyYW5zcG9ydDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKVxuICAsIEFqYXhCYXNlZFRyYW5zcG9ydCA9IHJlcXVpcmUoJy4vbGliL2FqYXgtYmFzZWQnKVxuICAsIFhoclJlY2VpdmVyID0gcmVxdWlyZSgnLi9yZWNlaXZlci94aHInKVxuICAsIFhIUkNvcnNPYmplY3QgPSByZXF1aXJlKCcuL3NlbmRlci94aHItY29ycycpXG4gICwgWEhSTG9jYWxPYmplY3QgPSByZXF1aXJlKCcuL3NlbmRlci94aHItbG9jYWwnKVxuICA7XG5cbmZ1bmN0aW9uIFhoclBvbGxpbmdUcmFuc3BvcnQodHJhbnNVcmwpIHtcbiAgaWYgKCFYSFJMb2NhbE9iamVjdC5lbmFibGVkICYmICFYSFJDb3JzT2JqZWN0LmVuYWJsZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyYW5zcG9ydCBjcmVhdGVkIHdoZW4gZGlzYWJsZWQnKTtcbiAgfVxuICBBamF4QmFzZWRUcmFuc3BvcnQuY2FsbCh0aGlzLCB0cmFuc1VybCwgJy94aHInLCBYaHJSZWNlaXZlciwgWEhSQ29yc09iamVjdCk7XG59XG5cbmluaGVyaXRzKFhoclBvbGxpbmdUcmFuc3BvcnQsIEFqYXhCYXNlZFRyYW5zcG9ydCk7XG5cblhoclBvbGxpbmdUcmFuc3BvcnQuZW5hYmxlZCA9IGZ1bmN0aW9uKGluZm8pIHtcbiAgaWYgKGluZm8ubnVsbE9yaWdpbikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChYSFJMb2NhbE9iamVjdC5lbmFibGVkICYmIGluZm8uc2FtZU9yaWdpbikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBYSFJDb3JzT2JqZWN0LmVuYWJsZWQ7XG59O1xuXG5YaHJQb2xsaW5nVHJhbnNwb3J0LnRyYW5zcG9ydE5hbWUgPSAneGhyLXBvbGxpbmcnO1xuWGhyUG9sbGluZ1RyYW5zcG9ydC5yb3VuZFRyaXBzID0gMjsgLy8gcHJlZmxpZ2h0LCBhamF4XG5cbm1vZHVsZS5leHBvcnRzID0gWGhyUG9sbGluZ1RyYW5zcG9ydDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKVxuICAsIEFqYXhCYXNlZFRyYW5zcG9ydCA9IHJlcXVpcmUoJy4vbGliL2FqYXgtYmFzZWQnKVxuICAsIFhoclJlY2VpdmVyID0gcmVxdWlyZSgnLi9yZWNlaXZlci94aHInKVxuICAsIFhIUkNvcnNPYmplY3QgPSByZXF1aXJlKCcuL3NlbmRlci94aHItY29ycycpXG4gICwgWEhSTG9jYWxPYmplY3QgPSByZXF1aXJlKCcuL3NlbmRlci94aHItbG9jYWwnKVxuICAsIGJyb3dzZXIgPSByZXF1aXJlKCcuLi91dGlscy9icm93c2VyJylcbiAgO1xuXG5mdW5jdGlvbiBYaHJTdHJlYW1pbmdUcmFuc3BvcnQodHJhbnNVcmwpIHtcbiAgaWYgKCFYSFJMb2NhbE9iamVjdC5lbmFibGVkICYmICFYSFJDb3JzT2JqZWN0LmVuYWJsZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyYW5zcG9ydCBjcmVhdGVkIHdoZW4gZGlzYWJsZWQnKTtcbiAgfVxuICBBamF4QmFzZWRUcmFuc3BvcnQuY2FsbCh0aGlzLCB0cmFuc1VybCwgJy94aHJfc3RyZWFtaW5nJywgWGhyUmVjZWl2ZXIsIFhIUkNvcnNPYmplY3QpO1xufVxuXG5pbmhlcml0cyhYaHJTdHJlYW1pbmdUcmFuc3BvcnQsIEFqYXhCYXNlZFRyYW5zcG9ydCk7XG5cblhoclN0cmVhbWluZ1RyYW5zcG9ydC5lbmFibGVkID0gZnVuY3Rpb24oaW5mbykge1xuICBpZiAoaW5mby5udWxsT3JpZ2luKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIE9wZXJhIGRvZXNuJ3Qgc3VwcG9ydCB4aHItc3RyZWFtaW5nICM2MFxuICAvLyBCdXQgaXQgbWlnaHQgYmUgYWJsZSB0byAjOTJcbiAgaWYgKGJyb3dzZXIuaXNPcGVyYSgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIFhIUkNvcnNPYmplY3QuZW5hYmxlZDtcbn07XG5cblhoclN0cmVhbWluZ1RyYW5zcG9ydC50cmFuc3BvcnROYW1lID0gJ3hoci1zdHJlYW1pbmcnO1xuWGhyU3RyZWFtaW5nVHJhbnNwb3J0LnJvdW5kVHJpcHMgPSAyOyAvLyBwcmVmbGlnaHQsIGFqYXhcblxuLy8gU2FmYXJpIGdldHMgY29uZnVzZWQgd2hlbiBhIHN0cmVhbWluZyBhamF4IHJlcXVlc3QgaXMgc3RhcnRlZFxuLy8gYmVmb3JlIG9ubG9hZC4gVGhpcyBjYXVzZXMgdGhlIGxvYWQgaW5kaWNhdG9yIHRvIHNwaW4gaW5kZWZpbmV0ZWx5LlxuLy8gT25seSByZXF1aXJlIGJvZHkgd2hlbiB1c2VkIGluIGEgYnJvd3NlclxuWGhyU3RyZWFtaW5nVHJhbnNwb3J0Lm5lZWRCb2R5ID0gISFnbG9iYWwuZG9jdW1lbnQ7XG5cbm1vZHVsZS5leHBvcnRzID0gWGhyU3RyZWFtaW5nVHJhbnNwb3J0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pZiAoZ2xvYmFsLmNyeXB0byAmJiBnbG9iYWwuY3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xuICBtb2R1bGUuZXhwb3J0cy5yYW5kb21CeXRlcyA9IGZ1bmN0aW9uKGxlbmd0aCkge1xuICAgIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KGxlbmd0aCk7XG4gICAgZ2xvYmFsLmNyeXB0by5nZXRSYW5kb21WYWx1ZXMoYnl0ZXMpO1xuICAgIHJldHVybiBieXRlcztcbiAgfTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzLnJhbmRvbUJ5dGVzID0gZnVuY3Rpb24obGVuZ3RoKSB7XG4gICAgdmFyIGJ5dGVzID0gbmV3IEFycmF5KGxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgYnl0ZXNbaV0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpO1xuICAgIH1cbiAgICByZXR1cm4gYnl0ZXM7XG4gIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc09wZXJhOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZ2xvYmFsLm5hdmlnYXRvciAmJlxuICAgICAgL29wZXJhL2kudGVzdChnbG9iYWwubmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gIH1cblxuLCBpc0tvbnF1ZXJvcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGdsb2JhbC5uYXZpZ2F0b3IgJiZcbiAgICAgIC9rb25xdWVyb3IvaS50ZXN0KGdsb2JhbC5uYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgfVxuXG4gIC8vICMxODcgd3JhcCBkb2N1bWVudC5kb21haW4gaW4gdHJ5L2NhdGNoIGJlY2F1c2Ugb2YgV1A4IGZyb20gZmlsZTovLy9cbiwgaGFzRG9tYWluOiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gbm9uLWJyb3dzZXIgY2xpZW50IGFsd2F5cyBoYXMgYSBkb21haW5cbiAgICBpZiAoIWdsb2JhbC5kb2N1bWVudCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAhIWdsb2JhbC5kb2N1bWVudC5kb21haW47XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEpTT04zID0gcmVxdWlyZSgnanNvbjMnKTtcblxuLy8gU29tZSBleHRyYSBjaGFyYWN0ZXJzIHRoYXQgQ2hyb21lIGdldHMgd3JvbmcsIGFuZCBzdWJzdGl0dXRlcyB3aXRoXG4vLyBzb21ldGhpbmcgZWxzZSBvbiB0aGUgd2lyZS5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250cm9sLXJlZ2V4LCBuby1taXNsZWFkaW5nLWNoYXJhY3Rlci1jbGFzc1xudmFyIGV4dHJhRXNjYXBhYmxlID0gL1tcXHgwMC1cXHgxZlxcdWQ4MDAtXFx1ZGZmZlxcdWZmZmVcXHVmZmZmXFx1MDMwMC1cXHUwMzMzXFx1MDMzZC1cXHUwMzQ2XFx1MDM0YS1cXHUwMzRjXFx1MDM1MC1cXHUwMzUyXFx1MDM1Ny1cXHUwMzU4XFx1MDM1Yy1cXHUwMzYyXFx1MDM3NFxcdTAzN2VcXHUwMzg3XFx1MDU5MS1cXHUwNWFmXFx1MDVjNFxcdTA2MTAtXFx1MDYxN1xcdTA2NTMtXFx1MDY1NFxcdTA2NTctXFx1MDY1YlxcdTA2NWQtXFx1MDY1ZVxcdTA2ZGYtXFx1MDZlMlxcdTA2ZWItXFx1MDZlY1xcdTA3MzBcXHUwNzMyLVxcdTA3MzNcXHUwNzM1LVxcdTA3MzZcXHUwNzNhXFx1MDczZFxcdTA3M2YtXFx1MDc0MVxcdTA3NDNcXHUwNzQ1XFx1MDc0N1xcdTA3ZWItXFx1MDdmMVxcdTA5NTFcXHUwOTU4LVxcdTA5NWZcXHUwOWRjLVxcdTA5ZGRcXHUwOWRmXFx1MGEzM1xcdTBhMzZcXHUwYTU5LVxcdTBhNWJcXHUwYTVlXFx1MGI1Yy1cXHUwYjVkXFx1MGUzOC1cXHUwZTM5XFx1MGY0M1xcdTBmNGRcXHUwZjUyXFx1MGY1N1xcdTBmNWNcXHUwZjY5XFx1MGY3Mi1cXHUwZjc2XFx1MGY3OFxcdTBmODAtXFx1MGY4M1xcdTBmOTNcXHUwZjlkXFx1MGZhMlxcdTBmYTdcXHUwZmFjXFx1MGZiOVxcdTE5MzktXFx1MTkzYVxcdTFhMTdcXHUxYjZiXFx1MWNkYS1cXHUxY2RiXFx1MWRjMC1cXHUxZGNmXFx1MWRmY1xcdTFkZmVcXHUxZjcxXFx1MWY3M1xcdTFmNzVcXHUxZjc3XFx1MWY3OVxcdTFmN2JcXHUxZjdkXFx1MWZiYlxcdTFmYmVcXHUxZmM5XFx1MWZjYlxcdTFmZDNcXHUxZmRiXFx1MWZlM1xcdTFmZWJcXHUxZmVlLVxcdTFmZWZcXHUxZmY5XFx1MWZmYlxcdTFmZmRcXHUyMDAwLVxcdTIwMDFcXHUyMGQwLVxcdTIwZDFcXHUyMGQ0LVxcdTIwZDdcXHUyMGU3LVxcdTIwZTlcXHUyMTI2XFx1MjEyYS1cXHUyMTJiXFx1MjMyOS1cXHUyMzJhXFx1MmFkY1xcdTMwMmItXFx1MzAyY1xcdWFhYjItXFx1YWFiM1xcdWY5MDAtXFx1ZmEwZFxcdWZhMTBcXHVmYTEyXFx1ZmExNS1cXHVmYTFlXFx1ZmEyMFxcdWZhMjJcXHVmYTI1LVxcdWZhMjZcXHVmYTJhLVxcdWZhMmRcXHVmYTMwLVxcdWZhNmRcXHVmYTcwLVxcdWZhZDlcXHVmYjFkXFx1ZmIxZlxcdWZiMmEtXFx1ZmIzNlxcdWZiMzgtXFx1ZmIzY1xcdWZiM2VcXHVmYjQwLVxcdWZiNDFcXHVmYjQzLVxcdWZiNDRcXHVmYjQ2LVxcdWZiNGVcXHVmZmYwLVxcdWZmZmZdL2dcbiAgLCBleHRyYUxvb2t1cDtcblxuLy8gVGhpcyBtYXkgYmUgcXVpdGUgc2xvdywgc28gbGV0J3MgZGVsYXkgdW50aWwgdXNlciBhY3R1YWxseSB1c2VzIGJhZFxuLy8gY2hhcmFjdGVycy5cbnZhciB1bnJvbGxMb29rdXAgPSBmdW5jdGlvbihlc2NhcGFibGUpIHtcbiAgdmFyIGk7XG4gIHZhciB1bnJvbGxlZCA9IHt9O1xuICB2YXIgYyA9IFtdO1xuICBmb3IgKGkgPSAwOyBpIDwgNjU1MzY7IGkrKykge1xuICAgIGMucHVzaCggU3RyaW5nLmZyb21DaGFyQ29kZShpKSApO1xuICB9XG4gIGVzY2FwYWJsZS5sYXN0SW5kZXggPSAwO1xuICBjLmpvaW4oJycpLnJlcGxhY2UoZXNjYXBhYmxlLCBmdW5jdGlvbihhKSB7XG4gICAgdW5yb2xsZWRbIGEgXSA9ICdcXFxcdScgKyAoJzAwMDAnICsgYS5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTQpO1xuICAgIHJldHVybiAnJztcbiAgfSk7XG4gIGVzY2FwYWJsZS5sYXN0SW5kZXggPSAwO1xuICByZXR1cm4gdW5yb2xsZWQ7XG59O1xuXG4vLyBRdW90ZSBzdHJpbmcsIGFsc28gdGFraW5nIGNhcmUgb2YgdW5pY29kZSBjaGFyYWN0ZXJzIHRoYXQgYnJvd3NlcnNcbi8vIG9mdGVuIGJyZWFrLiBFc3BlY2lhbGx5LCB0YWtlIGNhcmUgb2YgdW5pY29kZSBzdXJyb2dhdGVzOlxuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9NYXBwaW5nX29mX1VuaWNvZGVfY2hhcmFjdGVycyNTdXJyb2dhdGVzXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcXVvdGU6IGZ1bmN0aW9uKHN0cmluZykge1xuICAgIHZhciBxdW90ZWQgPSBKU09OMy5zdHJpbmdpZnkoc3RyaW5nKTtcblxuICAgIC8vIEluIG1vc3QgY2FzZXMgdGhpcyBzaG91bGQgYmUgdmVyeSBmYXN0IGFuZCBnb29kIGVub3VnaC5cbiAgICBleHRyYUVzY2FwYWJsZS5sYXN0SW5kZXggPSAwO1xuICAgIGlmICghZXh0cmFFc2NhcGFibGUudGVzdChxdW90ZWQpKSB7XG4gICAgICByZXR1cm4gcXVvdGVkO1xuICAgIH1cblxuICAgIGlmICghZXh0cmFMb29rdXApIHtcbiAgICAgIGV4dHJhTG9va3VwID0gdW5yb2xsTG9va3VwKGV4dHJhRXNjYXBhYmxlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcXVvdGVkLnJlcGxhY2UoZXh0cmFFc2NhcGFibGUsIGZ1bmN0aW9uKGEpIHtcbiAgICAgIHJldHVybiBleHRyYUxvb2t1cFthXTtcbiAgICB9KTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJhbmRvbSA9IHJlcXVpcmUoJy4vcmFuZG9tJyk7XG5cbnZhciBvblVubG9hZCA9IHt9XG4gICwgYWZ0ZXJVbmxvYWQgPSBmYWxzZVxuICAgIC8vIGRldGVjdCBnb29nbGUgY2hyb21lIHBhY2thZ2VkIGFwcHMgYmVjYXVzZSB0aGV5IGRvbid0IGFsbG93IHRoZSAndW5sb2FkJyBldmVudFxuICAsIGlzQ2hyb21lUGFja2FnZWRBcHAgPSBnbG9iYWwuY2hyb21lICYmIGdsb2JhbC5jaHJvbWUuYXBwICYmIGdsb2JhbC5jaHJvbWUuYXBwLnJ1bnRpbWVcbiAgO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYXR0YWNoRXZlbnQ6IGZ1bmN0aW9uKGV2ZW50LCBsaXN0ZW5lcikge1xuICAgIGlmICh0eXBlb2YgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICB9IGVsc2UgaWYgKGdsb2JhbC5kb2N1bWVudCAmJiBnbG9iYWwuYXR0YWNoRXZlbnQpIHtcbiAgICAgIC8vIElFIHF1aXJrcy5cbiAgICAgIC8vIEFjY29yZGluZyB0bzogaHR0cDovL3N0ZXZlc291ZGVycy5jb20vbWlzYy90ZXN0LXBvc3RtZXNzYWdlLnBocFxuICAgICAgLy8gdGhlIG1lc3NhZ2UgZ2V0cyBkZWxpdmVyZWQgb25seSB0byAnZG9jdW1lbnQnLCBub3QgJ3dpbmRvdycuXG4gICAgICBnbG9iYWwuZG9jdW1lbnQuYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgICAvLyBJIGdldCAnd2luZG93JyBmb3IgaWU4LlxuICAgICAgZ2xvYmFsLmF0dGFjaEV2ZW50KCdvbicgKyBldmVudCwgbGlzdGVuZXIpO1xuICAgIH1cbiAgfVxuXG4sIGRldGFjaEV2ZW50OiBmdW5jdGlvbihldmVudCwgbGlzdGVuZXIpIHtcbiAgICBpZiAodHlwZW9mIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgZ2xvYmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgfSBlbHNlIGlmIChnbG9iYWwuZG9jdW1lbnQgJiYgZ2xvYmFsLmRldGFjaEV2ZW50KSB7XG4gICAgICBnbG9iYWwuZG9jdW1lbnQuZGV0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgICBnbG9iYWwuZGV0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgfVxuICB9XG5cbiwgdW5sb2FkQWRkOiBmdW5jdGlvbihsaXN0ZW5lcikge1xuICAgIGlmIChpc0Nocm9tZVBhY2thZ2VkQXBwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgcmVmID0gcmFuZG9tLnN0cmluZyg4KTtcbiAgICBvblVubG9hZFtyZWZdID0gbGlzdGVuZXI7XG4gICAgaWYgKGFmdGVyVW5sb2FkKSB7XG4gICAgICBzZXRUaW1lb3V0KHRoaXMudHJpZ2dlclVubG9hZENhbGxiYWNrcywgMCk7XG4gICAgfVxuICAgIHJldHVybiByZWY7XG4gIH1cblxuLCB1bmxvYWREZWw6IGZ1bmN0aW9uKHJlZikge1xuICAgIGlmIChyZWYgaW4gb25VbmxvYWQpIHtcbiAgICAgIGRlbGV0ZSBvblVubG9hZFtyZWZdO1xuICAgIH1cbiAgfVxuXG4sIHRyaWdnZXJVbmxvYWRDYWxsYmFja3M6IGZ1bmN0aW9uKCkge1xuICAgIGZvciAodmFyIHJlZiBpbiBvblVubG9hZCkge1xuICAgICAgb25VbmxvYWRbcmVmXSgpO1xuICAgICAgZGVsZXRlIG9uVW5sb2FkW3JlZl07XG4gICAgfVxuICB9XG59O1xuXG52YXIgdW5sb2FkVHJpZ2dlcmVkID0gZnVuY3Rpb24oKSB7XG4gIGlmIChhZnRlclVubG9hZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBhZnRlclVubG9hZCA9IHRydWU7XG4gIG1vZHVsZS5leHBvcnRzLnRyaWdnZXJVbmxvYWRDYWxsYmFja3MoKTtcbn07XG5cbi8vICd1bmxvYWQnIGFsb25lIGlzIG5vdCByZWxpYWJsZSBpbiBvcGVyYSB3aXRoaW4gYW4gaWZyYW1lLCBidXQgd2Vcbi8vIGNhbid0IHVzZSBgYmVmb3JldW5sb2FkYCBhcyBJRSBmaXJlcyBpdCBvbiBqYXZhc2NyaXB0OiBsaW5rcy5cbmlmICghaXNDaHJvbWVQYWNrYWdlZEFwcCkge1xuICBtb2R1bGUuZXhwb3J0cy5hdHRhY2hFdmVudCgndW5sb2FkJywgdW5sb2FkVHJpZ2dlcmVkKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGV2ZW50VXRpbHMgPSByZXF1aXJlKCcuL2V2ZW50JylcbiAgLCBKU09OMyA9IHJlcXVpcmUoJ2pzb24zJylcbiAgLCBicm93c2VyID0gcmVxdWlyZSgnLi9icm93c2VyJylcbiAgO1xuXG52YXIgZGVidWcgPSBmdW5jdGlvbigpIHt9O1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NranMtY2xpZW50OnV0aWxzOmlmcmFtZScpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgV1ByZWZpeDogJ19qcCdcbiwgY3VycmVudFdpbmRvd0lkOiBudWxsXG5cbiwgcG9sbHV0ZUdsb2JhbE5hbWVzcGFjZTogZnVuY3Rpb24oKSB7XG4gICAgaWYgKCEobW9kdWxlLmV4cG9ydHMuV1ByZWZpeCBpbiBnbG9iYWwpKSB7XG4gICAgICBnbG9iYWxbbW9kdWxlLmV4cG9ydHMuV1ByZWZpeF0gPSB7fTtcbiAgICB9XG4gIH1cblxuLCBwb3N0TWVzc2FnZTogZnVuY3Rpb24odHlwZSwgZGF0YSkge1xuICAgIGlmIChnbG9iYWwucGFyZW50ICE9PSBnbG9iYWwpIHtcbiAgICAgIGdsb2JhbC5wYXJlbnQucG9zdE1lc3NhZ2UoSlNPTjMuc3RyaW5naWZ5KHtcbiAgICAgICAgd2luZG93SWQ6IG1vZHVsZS5leHBvcnRzLmN1cnJlbnRXaW5kb3dJZFxuICAgICAgLCB0eXBlOiB0eXBlXG4gICAgICAsIGRhdGE6IGRhdGEgfHwgJydcbiAgICAgIH0pLCAnKicpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1ZygnQ2Fubm90IHBvc3RNZXNzYWdlLCBubyBwYXJlbnQgd2luZG93LicsIHR5cGUsIGRhdGEpO1xuICAgIH1cbiAgfVxuXG4sIGNyZWF0ZUlmcmFtZTogZnVuY3Rpb24oaWZyYW1lVXJsLCBlcnJvckNhbGxiYWNrKSB7XG4gICAgdmFyIGlmcmFtZSA9IGdsb2JhbC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICB2YXIgdHJlZiwgdW5sb2FkUmVmO1xuICAgIHZhciB1bmF0dGFjaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgZGVidWcoJ3VuYXR0YWNoJyk7XG4gICAgICBjbGVhclRpbWVvdXQodHJlZik7XG4gICAgICAvLyBFeHBsb3JlciBoYWQgcHJvYmxlbXMgd2l0aCB0aGF0LlxuICAgICAgdHJ5IHtcbiAgICAgICAgaWZyYW1lLm9ubG9hZCA9IG51bGw7XG4gICAgICB9IGNhdGNoICh4KSB7XG4gICAgICAgIC8vIGludGVudGlvbmFsbHkgZW1wdHlcbiAgICAgIH1cbiAgICAgIGlmcmFtZS5vbmVycm9yID0gbnVsbDtcbiAgICB9O1xuICAgIHZhciBjbGVhbnVwID0gZnVuY3Rpb24oKSB7XG4gICAgICBkZWJ1ZygnY2xlYW51cCcpO1xuICAgICAgaWYgKGlmcmFtZSkge1xuICAgICAgICB1bmF0dGFjaCgpO1xuICAgICAgICAvLyBUaGlzIHRpbWVvdXQgbWFrZXMgY2hyb21lIGZpcmUgb25iZWZvcmV1bmxvYWQgZXZlbnRcbiAgICAgICAgLy8gd2l0aGluIGlmcmFtZS4gV2l0aG91dCB0aGUgdGltZW91dCBpdCBnb2VzIHN0cmFpZ2h0IHRvXG4gICAgICAgIC8vIG9udW5sb2FkLlxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChpZnJhbWUpIHtcbiAgICAgICAgICAgIGlmcmFtZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmcmFtZSA9IG51bGw7XG4gICAgICAgIH0sIDApO1xuICAgICAgICBldmVudFV0aWxzLnVubG9hZERlbCh1bmxvYWRSZWYpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIG9uZXJyb3IgPSBmdW5jdGlvbihlcnIpIHtcbiAgICAgIGRlYnVnKCdvbmVycm9yJywgZXJyKTtcbiAgICAgIGlmIChpZnJhbWUpIHtcbiAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICBlcnJvckNhbGxiYWNrKGVycik7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgcG9zdCA9IGZ1bmN0aW9uKG1zZywgb3JpZ2luKSB7XG4gICAgICBkZWJ1ZygncG9zdCcsIG1zZywgb3JpZ2luKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gV2hlbiB0aGUgaWZyYW1lIGlzIG5vdCBsb2FkZWQsIElFIHJhaXNlcyBhbiBleGNlcHRpb25cbiAgICAgICAgICAvLyBvbiAnY29udGVudFdpbmRvdycuXG4gICAgICAgICAgaWYgKGlmcmFtZSAmJiBpZnJhbWUuY29udGVudFdpbmRvdykge1xuICAgICAgICAgICAgaWZyYW1lLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UobXNnLCBvcmlnaW4pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoeCkge1xuICAgICAgICAgIC8vIGludGVudGlvbmFsbHkgZW1wdHlcbiAgICAgICAgfVxuICAgICAgfSwgMCk7XG4gICAgfTtcblxuICAgIGlmcmFtZS5zcmMgPSBpZnJhbWVVcmw7XG4gICAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgaWZyYW1lLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBpZnJhbWUub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgb25lcnJvcignb25lcnJvcicpO1xuICAgIH07XG4gICAgaWZyYW1lLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgZGVidWcoJ29ubG9hZCcpO1xuICAgICAgLy8gYG9ubG9hZGAgaXMgdHJpZ2dlcmVkIGJlZm9yZSBzY3JpcHRzIG9uIHRoZSBpZnJhbWUgYXJlXG4gICAgICAvLyBleGVjdXRlZC4gR2l2ZSBpdCBmZXcgc2Vjb25kcyB0byBhY3R1YWxseSBsb2FkIHN0dWZmLlxuICAgICAgY2xlYXJUaW1lb3V0KHRyZWYpO1xuICAgICAgdHJlZiA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIG9uZXJyb3IoJ29ubG9hZCB0aW1lb3V0Jyk7XG4gICAgICB9LCAyMDAwKTtcbiAgICB9O1xuICAgIGdsb2JhbC5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgdHJlZiA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBvbmVycm9yKCd0aW1lb3V0Jyk7XG4gICAgfSwgMTUwMDApO1xuICAgIHVubG9hZFJlZiA9IGV2ZW50VXRpbHMudW5sb2FkQWRkKGNsZWFudXApO1xuICAgIHJldHVybiB7XG4gICAgICBwb3N0OiBwb3N0XG4gICAgLCBjbGVhbnVwOiBjbGVhbnVwXG4gICAgLCBsb2FkZWQ6IHVuYXR0YWNoXG4gICAgfTtcbiAgfVxuXG4vKiBlc2xpbnQgbm8tdW5kZWY6IFwib2ZmXCIsIG5ldy1jYXA6IFwib2ZmXCIgKi9cbiwgY3JlYXRlSHRtbGZpbGU6IGZ1bmN0aW9uKGlmcmFtZVVybCwgZXJyb3JDYWxsYmFjaykge1xuICAgIHZhciBheG8gPSBbJ0FjdGl2ZSddLmNvbmNhdCgnT2JqZWN0Jykuam9pbignWCcpO1xuICAgIHZhciBkb2MgPSBuZXcgZ2xvYmFsW2F4b10oJ2h0bWxmaWxlJyk7XG4gICAgdmFyIHRyZWYsIHVubG9hZFJlZjtcbiAgICB2YXIgaWZyYW1lO1xuICAgIHZhciB1bmF0dGFjaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRyZWYpO1xuICAgICAgaWZyYW1lLm9uZXJyb3IgPSBudWxsO1xuICAgIH07XG4gICAgdmFyIGNsZWFudXAgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChkb2MpIHtcbiAgICAgICAgdW5hdHRhY2goKTtcbiAgICAgICAgZXZlbnRVdGlscy51bmxvYWREZWwodW5sb2FkUmVmKTtcbiAgICAgICAgaWZyYW1lLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgICAgICAgaWZyYW1lID0gZG9jID0gbnVsbDtcbiAgICAgICAgQ29sbGVjdEdhcmJhZ2UoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBvbmVycm9yID0gZnVuY3Rpb24ocikge1xuICAgICAgZGVidWcoJ29uZXJyb3InLCByKTtcbiAgICAgIGlmIChkb2MpIHtcbiAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICBlcnJvckNhbGxiYWNrKHIpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHBvc3QgPSBmdW5jdGlvbihtc2csIG9yaWdpbikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gV2hlbiB0aGUgaWZyYW1lIGlzIG5vdCBsb2FkZWQsIElFIHJhaXNlcyBhbiBleGNlcHRpb25cbiAgICAgICAgLy8gb24gJ2NvbnRlbnRXaW5kb3cnLlxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChpZnJhbWUgJiYgaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcbiAgICAgICAgICAgICAgaWZyYW1lLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UobXNnLCBvcmlnaW4pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMCk7XG4gICAgICB9IGNhdGNoICh4KSB7XG4gICAgICAgIC8vIGludGVudGlvbmFsbHkgZW1wdHlcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZG9jLm9wZW4oKTtcbiAgICBkb2Mud3JpdGUoJzxodG1sPjxzJyArICdjcmlwdD4nICtcbiAgICAgICAgICAgICAgJ2RvY3VtZW50LmRvbWFpbj1cIicgKyBnbG9iYWwuZG9jdW1lbnQuZG9tYWluICsgJ1wiOycgK1xuICAgICAgICAgICAgICAnPC9zJyArICdjcmlwdD48L2h0bWw+Jyk7XG4gICAgZG9jLmNsb3NlKCk7XG4gICAgZG9jLnBhcmVudFdpbmRvd1ttb2R1bGUuZXhwb3J0cy5XUHJlZml4XSA9IGdsb2JhbFttb2R1bGUuZXhwb3J0cy5XUHJlZml4XTtcbiAgICB2YXIgYyA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkb2MuYm9keS5hcHBlbmRDaGlsZChjKTtcbiAgICBpZnJhbWUgPSBkb2MuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgYy5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgIGlmcmFtZS5zcmMgPSBpZnJhbWVVcmw7XG4gICAgaWZyYW1lLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIG9uZXJyb3IoJ29uZXJyb3InKTtcbiAgICB9O1xuICAgIHRyZWYgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgb25lcnJvcigndGltZW91dCcpO1xuICAgIH0sIDE1MDAwKTtcbiAgICB1bmxvYWRSZWYgPSBldmVudFV0aWxzLnVubG9hZEFkZChjbGVhbnVwKTtcbiAgICByZXR1cm4ge1xuICAgICAgcG9zdDogcG9zdFxuICAgICwgY2xlYW51cDogY2xlYW51cFxuICAgICwgbG9hZGVkOiB1bmF0dGFjaFxuICAgIH07XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLmlmcmFtZUVuYWJsZWQgPSBmYWxzZTtcbmlmIChnbG9iYWwuZG9jdW1lbnQpIHtcbiAgLy8gcG9zdE1lc3NhZ2UgbWlzYmVoYXZlcyBpbiBrb25xdWVyb3IgNC42LjUgLSB0aGUgbWVzc2FnZXMgYXJlIGRlbGl2ZXJlZCB3aXRoXG4gIC8vIGh1Z2UgZGVsYXksIG9yIG5vdCBhdCBhbGwuXG4gIG1vZHVsZS5leHBvcnRzLmlmcmFtZUVuYWJsZWQgPSAodHlwZW9mIGdsb2JhbC5wb3N0TWVzc2FnZSA9PT0gJ2Z1bmN0aW9uJyB8fFxuICAgIHR5cGVvZiBnbG9iYWwucG9zdE1lc3NhZ2UgPT09ICdvYmplY3QnKSAmJiAoIWJyb3dzZXIuaXNLb25xdWVyb3IoKSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBsb2dPYmplY3QgPSB7fTtcblsnbG9nJywgJ2RlYnVnJywgJ3dhcm4nXS5mb3JFYWNoKGZ1bmN0aW9uIChsZXZlbCkge1xuICB2YXIgbGV2ZWxFeGlzdHM7XG5cbiAgdHJ5IHtcbiAgICBsZXZlbEV4aXN0cyA9IGdsb2JhbC5jb25zb2xlICYmIGdsb2JhbC5jb25zb2xlW2xldmVsXSAmJiBnbG9iYWwuY29uc29sZVtsZXZlbF0uYXBwbHk7XG4gIH0gY2F0Y2goZSkge1xuICAgIC8vIGRvIG5vdGhpbmdcbiAgfVxuXG4gIGxvZ09iamVjdFtsZXZlbF0gPSBsZXZlbEV4aXN0cyA/IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZ2xvYmFsLmNvbnNvbGVbbGV2ZWxdLmFwcGx5KGdsb2JhbC5jb25zb2xlLCBhcmd1bWVudHMpO1xuICB9IDogKGxldmVsID09PSAnbG9nJyA/IGZ1bmN0aW9uICgpIHt9IDogbG9nT2JqZWN0LmxvZyk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBsb2dPYmplY3Q7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc09iamVjdDogZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIHR5cGUgPSB0eXBlb2Ygb2JqO1xuICAgIHJldHVybiB0eXBlID09PSAnZnVuY3Rpb24nIHx8IHR5cGUgPT09ICdvYmplY3QnICYmICEhb2JqO1xuICB9XG5cbiwgZXh0ZW5kOiBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAoIXRoaXMuaXNPYmplY3Qob2JqKSkge1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgdmFyIHNvdXJjZSwgcHJvcDtcbiAgICBmb3IgKHZhciBpID0gMSwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgICBmb3IgKHByb3AgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBwcm9wKSkge1xuICAgICAgICAgIG9ialtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3J5cHRvID0gcmVxdWlyZSgnY3J5cHRvJyk7XG5cbi8vIFRoaXMgc3RyaW5nIGhhcyBsZW5ndGggMzIsIGEgcG93ZXIgb2YgMiwgc28gdGhlIG1vZHVsdXMgZG9lc24ndCBpbnRyb2R1Y2UgYVxuLy8gYmlhcy5cbnZhciBfcmFuZG9tU3RyaW5nQ2hhcnMgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDUnO1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHN0cmluZzogZnVuY3Rpb24obGVuZ3RoKSB7XG4gICAgdmFyIG1heCA9IF9yYW5kb21TdHJpbmdDaGFycy5sZW5ndGg7XG4gICAgdmFyIGJ5dGVzID0gY3J5cHRvLnJhbmRvbUJ5dGVzKGxlbmd0aCk7XG4gICAgdmFyIHJldCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHJldC5wdXNoKF9yYW5kb21TdHJpbmdDaGFycy5zdWJzdHIoYnl0ZXNbaV0gJSBtYXgsIDEpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldC5qb2luKCcnKTtcbiAgfVxuXG4sIG51bWJlcjogZnVuY3Rpb24obWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCk7XG4gIH1cblxuLCBudW1iZXJTdHJpbmc6IGZ1bmN0aW9uKG1heCkge1xuICAgIHZhciB0ID0gKCcnICsgKG1heCAtIDEpKS5sZW5ndGg7XG4gICAgdmFyIHAgPSBuZXcgQXJyYXkodCArIDEpLmpvaW4oJzAnKTtcbiAgICByZXR1cm4gKHAgKyB0aGlzLm51bWJlcihtYXgpKS5zbGljZSgtdCk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkZWJ1ZyA9IGZ1bmN0aW9uKCkge307XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tqcy1jbGllbnQ6dXRpbHM6dHJhbnNwb3J0Jyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXZhaWxhYmxlVHJhbnNwb3J0cykge1xuICByZXR1cm4ge1xuICAgIGZpbHRlclRvRW5hYmxlZDogZnVuY3Rpb24odHJhbnNwb3J0c1doaXRlbGlzdCwgaW5mbykge1xuICAgICAgdmFyIHRyYW5zcG9ydHMgPSB7XG4gICAgICAgIG1haW46IFtdXG4gICAgICAsIGZhY2FkZTogW11cbiAgICAgIH07XG4gICAgICBpZiAoIXRyYW5zcG9ydHNXaGl0ZWxpc3QpIHtcbiAgICAgICAgdHJhbnNwb3J0c1doaXRlbGlzdCA9IFtdO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdHJhbnNwb3J0c1doaXRlbGlzdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdHJhbnNwb3J0c1doaXRlbGlzdCA9IFt0cmFuc3BvcnRzV2hpdGVsaXN0XTtcbiAgICAgIH1cblxuICAgICAgYXZhaWxhYmxlVHJhbnNwb3J0cy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zKSB7XG4gICAgICAgIGlmICghdHJhbnMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHJhbnMudHJhbnNwb3J0TmFtZSA9PT0gJ3dlYnNvY2tldCcgJiYgaW5mby53ZWJzb2NrZXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgZGVidWcoJ2Rpc2FibGVkIGZyb20gc2VydmVyJywgJ3dlYnNvY2tldCcpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0cmFuc3BvcnRzV2hpdGVsaXN0Lmxlbmd0aCAmJlxuICAgICAgICAgICAgdHJhbnNwb3J0c1doaXRlbGlzdC5pbmRleE9mKHRyYW5zLnRyYW5zcG9ydE5hbWUpID09PSAtMSkge1xuICAgICAgICAgIGRlYnVnKCdub3QgaW4gd2hpdGVsaXN0JywgdHJhbnMudHJhbnNwb3J0TmFtZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRyYW5zLmVuYWJsZWQoaW5mbykpIHtcbiAgICAgICAgICBkZWJ1ZygnZW5hYmxlZCcsIHRyYW5zLnRyYW5zcG9ydE5hbWUpO1xuICAgICAgICAgIHRyYW5zcG9ydHMubWFpbi5wdXNoKHRyYW5zKTtcbiAgICAgICAgICBpZiAodHJhbnMuZmFjYWRlVHJhbnNwb3J0KSB7XG4gICAgICAgICAgICB0cmFuc3BvcnRzLmZhY2FkZS5wdXNoKHRyYW5zLmZhY2FkZVRyYW5zcG9ydCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlYnVnKCdkaXNhYmxlZCcsIHRyYW5zLnRyYW5zcG9ydE5hbWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0cmFuc3BvcnRzO1xuICAgIH1cbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBVUkwgPSByZXF1aXJlKCd1cmwtcGFyc2UnKTtcblxudmFyIGRlYnVnID0gZnVuY3Rpb24oKSB7fTtcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2pzLWNsaWVudDp1dGlsczp1cmwnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldE9yaWdpbjogZnVuY3Rpb24odXJsKSB7XG4gICAgaWYgKCF1cmwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBwID0gbmV3IFVSTCh1cmwpO1xuICAgIGlmIChwLnByb3RvY29sID09PSAnZmlsZTonKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgcG9ydCA9IHAucG9ydDtcbiAgICBpZiAoIXBvcnQpIHtcbiAgICAgIHBvcnQgPSAocC5wcm90b2NvbCA9PT0gJ2h0dHBzOicpID8gJzQ0MycgOiAnODAnO1xuICAgIH1cblxuICAgIHJldHVybiBwLnByb3RvY29sICsgJy8vJyArIHAuaG9zdG5hbWUgKyAnOicgKyBwb3J0O1xuICB9XG5cbiwgaXNPcmlnaW5FcXVhbDogZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciByZXMgPSB0aGlzLmdldE9yaWdpbihhKSA9PT0gdGhpcy5nZXRPcmlnaW4oYik7XG4gICAgZGVidWcoJ3NhbWUnLCBhLCBiLCByZXMpO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuLCBpc1NjaGVtZUVxdWFsOiBmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIChhLnNwbGl0KCc6JylbMF0gPT09IGIuc3BsaXQoJzonKVswXSk7XG4gIH1cblxuLCBhZGRQYXRoOiBmdW5jdGlvbiAodXJsLCBwYXRoKSB7XG4gICAgdmFyIHFzID0gdXJsLnNwbGl0KCc/Jyk7XG4gICAgcmV0dXJuIHFzWzBdICsgcGF0aCArIChxc1sxXSA/ICc/JyArIHFzWzFdIDogJycpO1xuICB9XG5cbiwgYWRkUXVlcnk6IGZ1bmN0aW9uICh1cmwsIHEpIHtcbiAgICByZXR1cm4gdXJsICsgKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gKCc/JyArIHEpIDogKCcmJyArIHEpKTtcbiAgfVxuXG4sIGlzTG9vcGJhY2tBZGRyOiBmdW5jdGlvbiAoYWRkcikge1xuICAgIHJldHVybiAvXjEyN1xcLihbMC05XXsxLDN9KVxcLihbMC05XXsxLDN9KVxcLihbMC05XXsxLDN9KSQvaS50ZXN0KGFkZHIpIHx8IC9eXFxbOjoxXFxdJC8udGVzdChhZGRyKTtcbiAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gJzEuNS4yJztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG4vKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cblxuLyoqXG4gKiBUaGlzIGlzIHRoZSB3ZWIgYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXG4gKi9cbmV4cG9ydHMubG9nID0gbG9nO1xuZXhwb3J0cy5mb3JtYXRBcmdzID0gZm9ybWF0QXJncztcbmV4cG9ydHMuc2F2ZSA9IHNhdmU7XG5leHBvcnRzLmxvYWQgPSBsb2FkO1xuZXhwb3J0cy51c2VDb2xvcnMgPSB1c2VDb2xvcnM7XG5leHBvcnRzLnN0b3JhZ2UgPSBsb2NhbHN0b3JhZ2UoKTtcbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gWycjMDAwMENDJywgJyMwMDAwRkYnLCAnIzAwMzNDQycsICcjMDAzM0ZGJywgJyMwMDY2Q0MnLCAnIzAwNjZGRicsICcjMDA5OUNDJywgJyMwMDk5RkYnLCAnIzAwQ0MwMCcsICcjMDBDQzMzJywgJyMwMENDNjYnLCAnIzAwQ0M5OScsICcjMDBDQ0NDJywgJyMwMENDRkYnLCAnIzMzMDBDQycsICcjMzMwMEZGJywgJyMzMzMzQ0MnLCAnIzMzMzNGRicsICcjMzM2NkNDJywgJyMzMzY2RkYnLCAnIzMzOTlDQycsICcjMzM5OUZGJywgJyMzM0NDMDAnLCAnIzMzQ0MzMycsICcjMzNDQzY2JywgJyMzM0NDOTknLCAnIzMzQ0NDQycsICcjMzNDQ0ZGJywgJyM2NjAwQ0MnLCAnIzY2MDBGRicsICcjNjYzM0NDJywgJyM2NjMzRkYnLCAnIzY2Q0MwMCcsICcjNjZDQzMzJywgJyM5OTAwQ0MnLCAnIzk5MDBGRicsICcjOTkzM0NDJywgJyM5OTMzRkYnLCAnIzk5Q0MwMCcsICcjOTlDQzMzJywgJyNDQzAwMDAnLCAnI0NDMDAzMycsICcjQ0MwMDY2JywgJyNDQzAwOTknLCAnI0NDMDBDQycsICcjQ0MwMEZGJywgJyNDQzMzMDAnLCAnI0NDMzMzMycsICcjQ0MzMzY2JywgJyNDQzMzOTknLCAnI0NDMzNDQycsICcjQ0MzM0ZGJywgJyNDQzY2MDAnLCAnI0NDNjYzMycsICcjQ0M5OTAwJywgJyNDQzk5MzMnLCAnI0NDQ0MwMCcsICcjQ0NDQzMzJywgJyNGRjAwMDAnLCAnI0ZGMDAzMycsICcjRkYwMDY2JywgJyNGRjAwOTknLCAnI0ZGMDBDQycsICcjRkYwMEZGJywgJyNGRjMzMDAnLCAnI0ZGMzMzMycsICcjRkYzMzY2JywgJyNGRjMzOTknLCAnI0ZGMzNDQycsICcjRkYzM0ZGJywgJyNGRjY2MDAnLCAnI0ZGNjYzMycsICcjRkY5OTAwJywgJyNGRjk5MzMnLCAnI0ZGQ0MwMCcsICcjRkZDQzMzJ107XG4vKipcbiAqIEN1cnJlbnRseSBvbmx5IFdlYktpdC1iYXNlZCBXZWIgSW5zcGVjdG9ycywgRmlyZWZveCA+PSB2MzEsXG4gKiBhbmQgdGhlIEZpcmVidWcgZXh0ZW5zaW9uIChhbnkgRmlyZWZveCB2ZXJzaW9uKSBhcmUga25vd25cbiAqIHRvIHN1cHBvcnQgXCIlY1wiIENTUyBjdXN0b21pemF0aW9ucy5cbiAqXG4gKiBUT0RPOiBhZGQgYSBgbG9jYWxTdG9yYWdlYCB2YXJpYWJsZSB0byBleHBsaWNpdGx5IGVuYWJsZS9kaXNhYmxlIGNvbG9yc1xuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuXG5mdW5jdGlvbiB1c2VDb2xvcnMoKSB7XG4gIC8vIE5COiBJbiBhbiBFbGVjdHJvbiBwcmVsb2FkIHNjcmlwdCwgZG9jdW1lbnQgd2lsbCBiZSBkZWZpbmVkIGJ1dCBub3QgZnVsbHlcbiAgLy8gaW5pdGlhbGl6ZWQuIFNpbmNlIHdlIGtub3cgd2UncmUgaW4gQ2hyb21lLCB3ZSdsbCBqdXN0IGRldGVjdCB0aGlzIGNhc2VcbiAgLy8gZXhwbGljaXRseVxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnByb2Nlc3MgJiYgKHdpbmRvdy5wcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicgfHwgd2luZG93LnByb2Nlc3MuX19ud2pzKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IC8vIEludGVybmV0IEV4cGxvcmVyIGFuZCBFZGdlIGRvIG5vdCBzdXBwb3J0IGNvbG9ycy5cblxuXG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvKGVkZ2V8dHJpZGVudClcXC8oXFxkKykvKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSAvLyBJcyB3ZWJraXQ/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE2NDU5NjA2LzM3Njc3M1xuICAvLyBkb2N1bWVudCBpcyB1bmRlZmluZWQgaW4gcmVhY3QtbmF0aXZlOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QtbmF0aXZlL3B1bGwvMTYzMlxuXG5cbiAgcmV0dXJuIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuV2Via2l0QXBwZWFyYW5jZSB8fCAvLyBJcyBmaXJlYnVnPyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zOTgxMjAvMzc2NzczXG4gIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5jb25zb2xlICYmICh3aW5kb3cuY29uc29sZS5maXJlYnVnIHx8IHdpbmRvdy5jb25zb2xlLmV4Y2VwdGlvbiAmJiB3aW5kb3cuY29uc29sZS50YWJsZSkgfHwgLy8gSXMgZmlyZWZveCA+PSB2MzE/XG4gIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVG9vbHMvV2ViX0NvbnNvbGUjU3R5bGluZ19tZXNzYWdlc1xuICB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvZmlyZWZveFxcLyhcXGQrKS8pICYmIHBhcnNlSW50KFJlZ0V4cC4kMSwgMTApID49IDMxIHx8IC8vIERvdWJsZSBjaGVjayB3ZWJraXQgaW4gdXNlckFnZW50IGp1c3QgaW4gY2FzZSB3ZSBhcmUgaW4gYSB3b3JrZXJcbiAgdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2FwcGxld2Via2l0XFwvKFxcZCspLyk7XG59XG4vKipcbiAqIENvbG9yaXplIGxvZyBhcmd1bWVudHMgaWYgZW5hYmxlZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblxuZnVuY3Rpb24gZm9ybWF0QXJncyhhcmdzKSB7XG4gIGFyZ3NbMF0gPSAodGhpcy51c2VDb2xvcnMgPyAnJWMnIDogJycpICsgdGhpcy5uYW1lc3BhY2UgKyAodGhpcy51c2VDb2xvcnMgPyAnICVjJyA6ICcgJykgKyBhcmdzWzBdICsgKHRoaXMudXNlQ29sb3JzID8gJyVjICcgOiAnICcpICsgJysnICsgbW9kdWxlLmV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKTtcblxuICBpZiAoIXRoaXMudXNlQ29sb3JzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGMgPSAnY29sb3I6ICcgKyB0aGlzLmNvbG9yO1xuICBhcmdzLnNwbGljZSgxLCAwLCBjLCAnY29sb3I6IGluaGVyaXQnKTsgLy8gVGhlIGZpbmFsIFwiJWNcIiBpcyBzb21ld2hhdCB0cmlja3ksIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb3RoZXJcbiAgLy8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuICAvLyBmaWd1cmUgb3V0IHRoZSBjb3JyZWN0IGluZGV4IHRvIGluc2VydCB0aGUgQ1NTIGludG9cblxuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGFzdEMgPSAwO1xuICBhcmdzWzBdLnJlcGxhY2UoLyVbYS16QS1aJV0vZywgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgaWYgKG1hdGNoID09PSAnJSUnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaW5kZXgrKztcblxuICAgIGlmIChtYXRjaCA9PT0gJyVjJykge1xuICAgICAgLy8gV2Ugb25seSBhcmUgaW50ZXJlc3RlZCBpbiB0aGUgKmxhc3QqICVjXG4gICAgICAvLyAodGhlIHVzZXIgbWF5IGhhdmUgcHJvdmlkZWQgdGhlaXIgb3duKVxuICAgICAgbGFzdEMgPSBpbmRleDtcbiAgICB9XG4gIH0pO1xuICBhcmdzLnNwbGljZShsYXN0QywgMCwgYyk7XG59XG4vKipcbiAqIEludm9rZXMgYGNvbnNvbGUubG9nKClgIHdoZW4gYXZhaWxhYmxlLlxuICogTm8tb3Agd2hlbiBgY29uc29sZS5sb2dgIGlzIG5vdCBhIFwiZnVuY3Rpb25cIi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblxuZnVuY3Rpb24gbG9nKCkge1xuICB2YXIgX2NvbnNvbGU7XG5cbiAgLy8gVGhpcyBoYWNrZXJ5IGlzIHJlcXVpcmVkIGZvciBJRTgvOSwgd2hlcmVcbiAgLy8gdGhlIGBjb25zb2xlLmxvZ2AgZnVuY3Rpb24gZG9lc24ndCBoYXZlICdhcHBseSdcbiAgcmV0dXJuICh0eXBlb2YgY29uc29sZSA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGNvbnNvbGUpKSA9PT0gJ29iamVjdCcgJiYgY29uc29sZS5sb2cgJiYgKF9jb25zb2xlID0gY29uc29sZSkubG9nLmFwcGx5KF9jb25zb2xlLCBhcmd1bWVudHMpO1xufVxuLyoqXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuXG5mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpIHtcbiAgdHJ5IHtcbiAgICBpZiAobmFtZXNwYWNlcykge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLnNldEl0ZW0oJ2RlYnVnJywgbmFtZXNwYWNlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5yZW1vdmVJdGVtKCdkZWJ1ZycpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHsvLyBTd2FsbG93XG4gICAgLy8gWFhYIChAUWl4LSkgc2hvdWxkIHdlIGJlIGxvZ2dpbmcgdGhlc2U/XG4gIH1cbn1cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuXG5mdW5jdGlvbiBsb2FkKCkge1xuICB2YXIgcjtcblxuICB0cnkge1xuICAgIHIgPSBleHBvcnRzLnN0b3JhZ2UuZ2V0SXRlbSgnZGVidWcnKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHt9IC8vIFN3YWxsb3dcbiAgLy8gWFhYIChAUWl4LSkgc2hvdWxkIHdlIGJlIGxvZ2dpbmcgdGhlc2U/XG4gIC8vIElmIGRlYnVnIGlzbid0IHNldCBpbiBMUywgYW5kIHdlJ3JlIGluIEVsZWN0cm9uLCB0cnkgdG8gbG9hZCAkREVCVUdcblxuXG4gIGlmICghciAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgJ2VudicgaW4gcHJvY2Vzcykge1xuICAgIHIgPSBwcm9jZXNzLmVudi5ERUJVRztcbiAgfVxuXG4gIHJldHVybiByO1xufVxuLyoqXG4gKiBMb2NhbHN0b3JhZ2UgYXR0ZW1wdHMgdG8gcmV0dXJuIHRoZSBsb2NhbHN0b3JhZ2UuXG4gKlxuICogVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBzYWZhcmkgdGhyb3dzXG4gKiB3aGVuIGEgdXNlciBkaXNhYmxlcyBjb29raWVzL2xvY2Fsc3RvcmFnZVxuICogYW5kIHlvdSBhdHRlbXB0IHRvIGFjY2VzcyBpdC5cbiAqXG4gKiBAcmV0dXJuIHtMb2NhbFN0b3JhZ2V9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5cbmZ1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpIHtcbiAgdHJ5IHtcbiAgICAvLyBUVk1MS2l0IChBcHBsZSBUViBKUyBSdW50aW1lKSBkb2VzIG5vdCBoYXZlIGEgd2luZG93IG9iamVjdCwganVzdCBsb2NhbFN0b3JhZ2UgaW4gdGhlIGdsb2JhbCBjb250ZXh0XG4gICAgLy8gVGhlIEJyb3dzZXIgYWxzbyBoYXMgbG9jYWxTdG9yYWdlIGluIHRoZSBnbG9iYWwgY29udGV4dC5cbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlO1xuICB9IGNhdGNoIChlcnJvcikgey8vIFN3YWxsb3dcbiAgICAvLyBYWFggKEBRaXgtKSBzaG91bGQgd2UgYmUgbG9nZ2luZyB0aGVzZT9cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29tbW9uJykoZXhwb3J0cyk7XG52YXIgZm9ybWF0dGVycyA9IG1vZHVsZS5leHBvcnRzLmZvcm1hdHRlcnM7XG4vKipcbiAqIE1hcCAlaiB0byBgSlNPTi5zdHJpbmdpZnkoKWAsIHNpbmNlIG5vIFdlYiBJbnNwZWN0b3JzIGRvIHRoYXQgYnkgZGVmYXVsdC5cbiAqL1xuXG5mb3JtYXR0ZXJzLmogPSBmdW5jdGlvbiAodikge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gJ1tVbmV4cGVjdGVkSlNPTlBhcnNlRXJyb3JdOiAnICsgZXJyb3IubWVzc2FnZTtcbiAgfVxufTtcblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgY29tbW9uIGxvZ2ljIGZvciBib3RoIHRoZSBOb2RlLmpzIGFuZCB3ZWIgYnJvd3NlclxuICogaW1wbGVtZW50YXRpb25zIG9mIGBkZWJ1ZygpYC5cbiAqL1xuZnVuY3Rpb24gc2V0dXAoZW52KSB7XG4gIGNyZWF0ZURlYnVnLmRlYnVnID0gY3JlYXRlRGVidWc7XG4gIGNyZWF0ZURlYnVnLmRlZmF1bHQgPSBjcmVhdGVEZWJ1ZztcbiAgY3JlYXRlRGVidWcuY29lcmNlID0gY29lcmNlO1xuICBjcmVhdGVEZWJ1Zy5kaXNhYmxlID0gZGlzYWJsZTtcbiAgY3JlYXRlRGVidWcuZW5hYmxlID0gZW5hYmxlO1xuICBjcmVhdGVEZWJ1Zy5lbmFibGVkID0gZW5hYmxlZDtcbiAgY3JlYXRlRGVidWcuaHVtYW5pemUgPSByZXF1aXJlKCdtcycpO1xuICBPYmplY3Qua2V5cyhlbnYpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGNyZWF0ZURlYnVnW2tleV0gPSBlbnZba2V5XTtcbiAgfSk7XG4gIC8qKlxuICAqIEFjdGl2ZSBgZGVidWdgIGluc3RhbmNlcy5cbiAgKi9cblxuICBjcmVhdGVEZWJ1Zy5pbnN0YW5jZXMgPSBbXTtcbiAgLyoqXG4gICogVGhlIGN1cnJlbnRseSBhY3RpdmUgZGVidWcgbW9kZSBuYW1lcywgYW5kIG5hbWVzIHRvIHNraXAuXG4gICovXG5cbiAgY3JlYXRlRGVidWcubmFtZXMgPSBbXTtcbiAgY3JlYXRlRGVidWcuc2tpcHMgPSBbXTtcbiAgLyoqXG4gICogTWFwIG9mIHNwZWNpYWwgXCIlblwiIGhhbmRsaW5nIGZ1bmN0aW9ucywgZm9yIHRoZSBkZWJ1ZyBcImZvcm1hdFwiIGFyZ3VtZW50LlxuICAqXG4gICogVmFsaWQga2V5IG5hbWVzIGFyZSBhIHNpbmdsZSwgbG93ZXIgb3IgdXBwZXItY2FzZSBsZXR0ZXIsIGkuZS4gXCJuXCIgYW5kIFwiTlwiLlxuICAqL1xuXG4gIGNyZWF0ZURlYnVnLmZvcm1hdHRlcnMgPSB7fTtcbiAgLyoqXG4gICogU2VsZWN0cyBhIGNvbG9yIGZvciBhIGRlYnVnIG5hbWVzcGFjZVxuICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2UgVGhlIG5hbWVzcGFjZSBzdHJpbmcgZm9yIHRoZSBmb3IgdGhlIGRlYnVnIGluc3RhbmNlIHRvIGJlIGNvbG9yZWRcbiAgKiBAcmV0dXJuIHtOdW1iZXJ8U3RyaW5nfSBBbiBBTlNJIGNvbG9yIGNvZGUgZm9yIHRoZSBnaXZlbiBuYW1lc3BhY2VcbiAgKiBAYXBpIHByaXZhdGVcbiAgKi9cblxuICBmdW5jdGlvbiBzZWxlY3RDb2xvcihuYW1lc3BhY2UpIHtcbiAgICB2YXIgaGFzaCA9IDA7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzcGFjZS5sZW5ndGg7IGkrKykge1xuICAgICAgaGFzaCA9IChoYXNoIDw8IDUpIC0gaGFzaCArIG5hbWVzcGFjZS5jaGFyQ29kZUF0KGkpO1xuICAgICAgaGFzaCB8PSAwOyAvLyBDb252ZXJ0IHRvIDMyYml0IGludGVnZXJcbiAgICB9XG5cbiAgICByZXR1cm4gY3JlYXRlRGVidWcuY29sb3JzW01hdGguYWJzKGhhc2gpICUgY3JlYXRlRGVidWcuY29sb3JzLmxlbmd0aF07XG4gIH1cblxuICBjcmVhdGVEZWJ1Zy5zZWxlY3RDb2xvciA9IHNlbGVjdENvbG9yO1xuICAvKipcbiAgKiBDcmVhdGUgYSBkZWJ1Z2dlciB3aXRoIHRoZSBnaXZlbiBgbmFtZXNwYWNlYC5cbiAgKlxuICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgKiBAYXBpIHB1YmxpY1xuICAqL1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZURlYnVnKG5hbWVzcGFjZSkge1xuICAgIHZhciBwcmV2VGltZTtcblxuICAgIGZ1bmN0aW9uIGRlYnVnKCkge1xuICAgICAgLy8gRGlzYWJsZWQ/XG4gICAgICBpZiAoIWRlYnVnLmVuYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgdmFyIHNlbGYgPSBkZWJ1ZzsgLy8gU2V0IGBkaWZmYCB0aW1lc3RhbXBcblxuICAgICAgdmFyIGN1cnIgPSBOdW1iZXIobmV3IERhdGUoKSk7XG4gICAgICB2YXIgbXMgPSBjdXJyIC0gKHByZXZUaW1lIHx8IGN1cnIpO1xuICAgICAgc2VsZi5kaWZmID0gbXM7XG4gICAgICBzZWxmLnByZXYgPSBwcmV2VGltZTtcbiAgICAgIHNlbGYuY3VyciA9IGN1cnI7XG4gICAgICBwcmV2VGltZSA9IGN1cnI7XG4gICAgICBhcmdzWzBdID0gY3JlYXRlRGVidWcuY29lcmNlKGFyZ3NbMF0pO1xuXG4gICAgICBpZiAodHlwZW9mIGFyZ3NbMF0gIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vIEFueXRoaW5nIGVsc2UgbGV0J3MgaW5zcGVjdCB3aXRoICVPXG4gICAgICAgIGFyZ3MudW5zaGlmdCgnJU8nKTtcbiAgICAgIH0gLy8gQXBwbHkgYW55IGBmb3JtYXR0ZXJzYCB0cmFuc2Zvcm1hdGlvbnNcblxuXG4gICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgYXJnc1swXSA9IGFyZ3NbMF0ucmVwbGFjZSgvJShbYS16QS1aJV0pL2csIGZ1bmN0aW9uIChtYXRjaCwgZm9ybWF0KSB7XG4gICAgICAgIC8vIElmIHdlIGVuY291bnRlciBhbiBlc2NhcGVkICUgdGhlbiBkb24ndCBpbmNyZWFzZSB0aGUgYXJyYXkgaW5kZXhcbiAgICAgICAgaWYgKG1hdGNoID09PSAnJSUnKSB7XG4gICAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5kZXgrKztcbiAgICAgICAgdmFyIGZvcm1hdHRlciA9IGNyZWF0ZURlYnVnLmZvcm1hdHRlcnNbZm9ybWF0XTtcblxuICAgICAgICBpZiAodHlwZW9mIGZvcm1hdHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhciB2YWwgPSBhcmdzW2luZGV4XTtcbiAgICAgICAgICBtYXRjaCA9IGZvcm1hdHRlci5jYWxsKHNlbGYsIHZhbCk7IC8vIE5vdyB3ZSBuZWVkIHRvIHJlbW92ZSBgYXJnc1tpbmRleF1gIHNpbmNlIGl0J3MgaW5saW5lZCBpbiB0aGUgYGZvcm1hdGBcblxuICAgICAgICAgIGFyZ3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICBpbmRleC0tO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgICAgfSk7IC8vIEFwcGx5IGVudi1zcGVjaWZpYyBmb3JtYXR0aW5nIChjb2xvcnMsIGV0Yy4pXG5cbiAgICAgIGNyZWF0ZURlYnVnLmZvcm1hdEFyZ3MuY2FsbChzZWxmLCBhcmdzKTtcbiAgICAgIHZhciBsb2dGbiA9IHNlbGYubG9nIHx8IGNyZWF0ZURlYnVnLmxvZztcbiAgICAgIGxvZ0ZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgIH1cblxuICAgIGRlYnVnLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcbiAgICBkZWJ1Zy5lbmFibGVkID0gY3JlYXRlRGVidWcuZW5hYmxlZChuYW1lc3BhY2UpO1xuICAgIGRlYnVnLnVzZUNvbG9ycyA9IGNyZWF0ZURlYnVnLnVzZUNvbG9ycygpO1xuICAgIGRlYnVnLmNvbG9yID0gc2VsZWN0Q29sb3IobmFtZXNwYWNlKTtcbiAgICBkZWJ1Zy5kZXN0cm95ID0gZGVzdHJveTtcbiAgICBkZWJ1Zy5leHRlbmQgPSBleHRlbmQ7IC8vIERlYnVnLmZvcm1hdEFyZ3MgPSBmb3JtYXRBcmdzO1xuICAgIC8vIGRlYnVnLnJhd0xvZyA9IHJhd0xvZztcbiAgICAvLyBlbnYtc3BlY2lmaWMgaW5pdGlhbGl6YXRpb24gbG9naWMgZm9yIGRlYnVnIGluc3RhbmNlc1xuXG4gICAgaWYgKHR5cGVvZiBjcmVhdGVEZWJ1Zy5pbml0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjcmVhdGVEZWJ1Zy5pbml0KGRlYnVnKTtcbiAgICB9XG5cbiAgICBjcmVhdGVEZWJ1Zy5pbnN0YW5jZXMucHVzaChkZWJ1Zyk7XG4gICAgcmV0dXJuIGRlYnVnO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICB2YXIgaW5kZXggPSBjcmVhdGVEZWJ1Zy5pbnN0YW5jZXMuaW5kZXhPZih0aGlzKTtcblxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIGNyZWF0ZURlYnVnLmluc3RhbmNlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gZXh0ZW5kKG5hbWVzcGFjZSwgZGVsaW1pdGVyKSB7XG4gICAgcmV0dXJuIGNyZWF0ZURlYnVnKHRoaXMubmFtZXNwYWNlICsgKHR5cGVvZiBkZWxpbWl0ZXIgPT09ICd1bmRlZmluZWQnID8gJzonIDogZGVsaW1pdGVyKSArIG5hbWVzcGFjZSk7XG4gIH1cbiAgLyoqXG4gICogRW5hYmxlcyBhIGRlYnVnIG1vZGUgYnkgbmFtZXNwYWNlcy4gVGhpcyBjYW4gaW5jbHVkZSBtb2Rlc1xuICAqIHNlcGFyYXRlZCBieSBhIGNvbG9uIGFuZCB3aWxkY2FyZHMuXG4gICpcbiAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICAqIEBhcGkgcHVibGljXG4gICovXG5cblxuICBmdW5jdGlvbiBlbmFibGUobmFtZXNwYWNlcykge1xuICAgIGNyZWF0ZURlYnVnLnNhdmUobmFtZXNwYWNlcyk7XG4gICAgY3JlYXRlRGVidWcubmFtZXMgPSBbXTtcbiAgICBjcmVhdGVEZWJ1Zy5za2lwcyA9IFtdO1xuICAgIHZhciBpO1xuICAgIHZhciBzcGxpdCA9ICh0eXBlb2YgbmFtZXNwYWNlcyA9PT0gJ3N0cmluZycgPyBuYW1lc3BhY2VzIDogJycpLnNwbGl0KC9bXFxzLF0rLyk7XG4gICAgdmFyIGxlbiA9IHNwbGl0Lmxlbmd0aDtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKCFzcGxpdFtpXSkge1xuICAgICAgICAvLyBpZ25vcmUgZW1wdHkgc3RyaW5nc1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgbmFtZXNwYWNlcyA9IHNwbGl0W2ldLnJlcGxhY2UoL1xcKi9nLCAnLio/Jyk7XG5cbiAgICAgIGlmIChuYW1lc3BhY2VzWzBdID09PSAnLScpIHtcbiAgICAgICAgY3JlYXRlRGVidWcuc2tpcHMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMuc3Vic3RyKDEpICsgJyQnKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjcmVhdGVEZWJ1Zy5uYW1lcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcyArICckJykpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoaSA9IDA7IGkgPCBjcmVhdGVEZWJ1Zy5pbnN0YW5jZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpbnN0YW5jZSA9IGNyZWF0ZURlYnVnLmluc3RhbmNlc1tpXTtcbiAgICAgIGluc3RhbmNlLmVuYWJsZWQgPSBjcmVhdGVEZWJ1Zy5lbmFibGVkKGluc3RhbmNlLm5hbWVzcGFjZSk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAqIERpc2FibGUgZGVidWcgb3V0cHV0LlxuICAqXG4gICogQGFwaSBwdWJsaWNcbiAgKi9cblxuXG4gIGZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gICAgY3JlYXRlRGVidWcuZW5hYmxlKCcnKTtcbiAgfVxuICAvKipcbiAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG1vZGUgbmFtZSBpcyBlbmFibGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gICpcbiAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICogQGFwaSBwdWJsaWNcbiAgKi9cblxuXG4gIGZ1bmN0aW9uIGVuYWJsZWQobmFtZSkge1xuICAgIGlmIChuYW1lW25hbWUubGVuZ3RoIC0gMV0gPT09ICcqJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGk7XG4gICAgdmFyIGxlbjtcblxuICAgIGZvciAoaSA9IDAsIGxlbiA9IGNyZWF0ZURlYnVnLnNraXBzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAoY3JlYXRlRGVidWcuc2tpcHNbaV0udGVzdChuYW1lKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChpID0gMCwgbGVuID0gY3JlYXRlRGVidWcubmFtZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChjcmVhdGVEZWJ1Zy5uYW1lc1tpXS50ZXN0KG5hbWUpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvKipcbiAgKiBDb2VyY2UgYHZhbGAuXG4gICpcbiAgKiBAcGFyYW0ge01peGVkfSB2YWxcbiAgKiBAcmV0dXJuIHtNaXhlZH1cbiAgKiBAYXBpIHByaXZhdGVcbiAgKi9cblxuXG4gIGZ1bmN0aW9uIGNvZXJjZSh2YWwpIHtcbiAgICBpZiAodmFsIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIHJldHVybiB2YWwuc3RhY2sgfHwgdmFsLm1lc3NhZ2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbDtcbiAgfVxuXG4gIGNyZWF0ZURlYnVnLmVuYWJsZShjcmVhdGVEZWJ1Zy5sb2FkKCkpO1xuICByZXR1cm4gY3JlYXRlRGVidWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0dXA7XG5cbiIsIi8qKlxuICogSGVscGVycy5cbiAqL1xuXG52YXIgcyA9IDEwMDA7XG52YXIgbSA9IHMgKiA2MDtcbnZhciBoID0gbSAqIDYwO1xudmFyIGQgPSBoICogMjQ7XG52YXIgdyA9IGQgKiA3O1xudmFyIHkgPSBkICogMzY1LjI1O1xuXG4vKipcbiAqIFBhcnNlIG9yIGZvcm1hdCB0aGUgZ2l2ZW4gYHZhbGAuXG4gKlxuICogT3B0aW9uczpcbiAqXG4gKiAgLSBgbG9uZ2AgdmVyYm9zZSBmb3JtYXR0aW5nIFtmYWxzZV1cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IHZhbFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQHRocm93cyB7RXJyb3J9IHRocm93IGFuIGVycm9yIGlmIHZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgbnVtYmVyXG4gKiBAcmV0dXJuIHtTdHJpbmd8TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWwsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbDtcbiAgaWYgKHR5cGUgPT09ICdzdHJpbmcnICYmIHZhbC5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIHBhcnNlKHZhbCk7XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUodmFsKSkge1xuICAgIHJldHVybiBvcHRpb25zLmxvbmcgPyBmbXRMb25nKHZhbCkgOiBmbXRTaG9ydCh2YWwpO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICAndmFsIGlzIG5vdCBhIG5vbi1lbXB0eSBzdHJpbmcgb3IgYSB2YWxpZCBudW1iZXIuIHZhbD0nICtcbiAgICAgIEpTT04uc3RyaW5naWZ5KHZhbClcbiAgKTtcbn07XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGBzdHJgIGFuZCByZXR1cm4gbWlsbGlzZWNvbmRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlKHN0cikge1xuICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgaWYgKHN0ci5sZW5ndGggPiAxMDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG1hdGNoID0gL14oLT8oPzpcXGQrKT9cXC4/XFxkKykgKihtaWxsaXNlY29uZHM/fG1zZWNzP3xtc3xzZWNvbmRzP3xzZWNzP3xzfG1pbnV0ZXM/fG1pbnM/fG18aG91cnM/fGhycz98aHxkYXlzP3xkfHdlZWtzP3x3fHllYXJzP3x5cnM/fHkpPyQvaS5leGVjKFxuICAgIHN0clxuICApO1xuICBpZiAoIW1hdGNoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuID0gcGFyc2VGbG9hdChtYXRjaFsxXSk7XG4gIHZhciB0eXBlID0gKG1hdGNoWzJdIHx8ICdtcycpLnRvTG93ZXJDYXNlKCk7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3llYXJzJzpcbiAgICBjYXNlICd5ZWFyJzpcbiAgICBjYXNlICd5cnMnOlxuICAgIGNhc2UgJ3lyJzpcbiAgICBjYXNlICd5JzpcbiAgICAgIHJldHVybiBuICogeTtcbiAgICBjYXNlICd3ZWVrcyc6XG4gICAgY2FzZSAnd2Vlayc6XG4gICAgY2FzZSAndyc6XG4gICAgICByZXR1cm4gbiAqIHc7XG4gICAgY2FzZSAnZGF5cyc6XG4gICAgY2FzZSAnZGF5JzpcbiAgICBjYXNlICdkJzpcbiAgICAgIHJldHVybiBuICogZDtcbiAgICBjYXNlICdob3Vycyc6XG4gICAgY2FzZSAnaG91cic6XG4gICAgY2FzZSAnaHJzJzpcbiAgICBjYXNlICdocic6XG4gICAgY2FzZSAnaCc6XG4gICAgICByZXR1cm4gbiAqIGg7XG4gICAgY2FzZSAnbWludXRlcyc6XG4gICAgY2FzZSAnbWludXRlJzpcbiAgICBjYXNlICdtaW5zJzpcbiAgICBjYXNlICdtaW4nOlxuICAgIGNhc2UgJ20nOlxuICAgICAgcmV0dXJuIG4gKiBtO1xuICAgIGNhc2UgJ3NlY29uZHMnOlxuICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgY2FzZSAnc2Vjcyc6XG4gICAgY2FzZSAnc2VjJzpcbiAgICBjYXNlICdzJzpcbiAgICAgIHJldHVybiBuICogcztcbiAgICBjYXNlICdtaWxsaXNlY29uZHMnOlxuICAgIGNhc2UgJ21pbGxpc2Vjb25kJzpcbiAgICBjYXNlICdtc2Vjcyc6XG4gICAgY2FzZSAnbXNlYyc6XG4gICAgY2FzZSAnbXMnOlxuICAgICAgcmV0dXJuIG47XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuLyoqXG4gKiBTaG9ydCBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRTaG9ydChtcykge1xuICB2YXIgbXNBYnMgPSBNYXRoLmFicyhtcyk7XG4gIGlmIChtc0FicyA+PSBkKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBkKSArICdkJztcbiAgfVxuICBpZiAobXNBYnMgPj0gaCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gaCkgKyAnaCc7XG4gIH1cbiAgaWYgKG1zQWJzID49IG0pIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIG0pICsgJ20nO1xuICB9XG4gIGlmIChtc0FicyA+PSBzKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBzKSArICdzJztcbiAgfVxuICByZXR1cm4gbXMgKyAnbXMnO1xufVxuXG4vKipcbiAqIExvbmcgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10TG9uZyhtcykge1xuICB2YXIgbXNBYnMgPSBNYXRoLmFicyhtcyk7XG4gIGlmIChtc0FicyA+PSBkKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIGQsICdkYXknKTtcbiAgfVxuICBpZiAobXNBYnMgPj0gaCkge1xuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBoLCAnaG91cicpO1xuICB9XG4gIGlmIChtc0FicyA+PSBtKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIG0sICdtaW51dGUnKTtcbiAgfVxuICBpZiAobXNBYnMgPj0gcykge1xuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBzLCAnc2Vjb25kJyk7XG4gIH1cbiAgcmV0dXJuIG1zICsgJyBtcyc7XG59XG5cbi8qKlxuICogUGx1cmFsaXphdGlvbiBoZWxwZXIuXG4gKi9cblxuZnVuY3Rpb24gcGx1cmFsKG1zLCBtc0FicywgbiwgbmFtZSkge1xuICB2YXIgaXNQbHVyYWwgPSBtc0FicyA+PSBuICogMS41O1xuICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIG4pICsgJyAnICsgbmFtZSArIChpc1BsdXJhbCA/ICdzJyA6ICcnKTtcbn1cbiIsIi8vIENvcHlyaWdodCAoQykgMjAxMyBbSmVmZiBNZXNuaWxdKGh0dHA6Ly9qbWVzbmlsLm5ldC8pXG4vL1xuLy8gICBTdG9tcCBPdmVyIFdlYlNvY2tldCBodHRwOi8vd3d3LmptZXNuaWwubmV0L3N0b21wLXdlYnNvY2tldC9kb2MvIHwgQXBhY2hlIExpY2Vuc2UgVjIuMFxuLy9cbi8vIFRoZSBsaWJyYXJ5IGNhbiBiZSB1c2VkIGluIG5vZGUuanMgYXBwIHRvIGNvbm5lY3QgdG8gU1RPTVAgYnJva2VycyBvdmVyIFRDUCBcbi8vIG9yIFdlYiBzb2NrZXRzLlxuXG4vLyBSb290IG9mIHRoZSBgc3RvbXBqcyBtb2R1bGVgXG5cbnZhciBTdG9tcCA9IHJlcXVpcmUoJy4vbGliL3N0b21wLmpzJyk7XG52YXIgU3RvbXBOb2RlID0gcmVxdWlyZSgnLi9saWIvc3RvbXAtbm9kZS5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0b21wLlN0b21wO1xubW9kdWxlLmV4cG9ydHMub3ZlclRDUCA9IFN0b21wTm9kZS5vdmVyVENQO1xubW9kdWxlLmV4cG9ydHMub3ZlcldTID0gU3RvbXBOb2RlLm92ZXJXUzsiLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuNy4xXG5cbi8qXG4gICBTdG9tcCBPdmVyIFdlYlNvY2tldCBodHRwOi8vd3d3LmptZXNuaWwubmV0L3N0b21wLXdlYnNvY2tldC9kb2MvIHwgQXBhY2hlIExpY2Vuc2UgVjIuMFxuXG4gICBDb3B5cmlnaHQgKEMpIDIwMTMgW0plZmYgTWVzbmlsXShodHRwOi8vam1lc25pbC5uZXQvKVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgdmFyIFN0b21wLCBuZXQsIG92ZXJUQ1AsIG92ZXJXUywgd3JhcFRDUCwgd3JhcFdTO1xuXG4gIFN0b21wID0gcmVxdWlyZSgnLi9zdG9tcCcpO1xuXG4gIG5ldCA9IHJlcXVpcmUoJ25ldCcpO1xuXG4gIFN0b21wLlN0b21wLnNldEludGVydmFsID0gZnVuY3Rpb24oaW50ZXJ2YWwsIGYpIHtcbiAgICByZXR1cm4gc2V0SW50ZXJ2YWwoZiwgaW50ZXJ2YWwpO1xuICB9O1xuXG4gIFN0b21wLlN0b21wLmNsZWFySW50ZXJ2YWwgPSBmdW5jdGlvbihpZCkge1xuICAgIHJldHVybiBjbGVhckludGVydmFsKGlkKTtcbiAgfTtcblxuICB3cmFwVENQID0gZnVuY3Rpb24ocG9ydCwgaG9zdCkge1xuICAgIHZhciBzb2NrZXQsIHdzO1xuICAgIHNvY2tldCA9IG51bGw7XG4gICAgd3MgPSB7XG4gICAgICB1cmw6ICd0Y3A6Ly8gJyArIGhvc3QgKyAnOicgKyBwb3J0LFxuICAgICAgc2VuZDogZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gc29ja2V0LndyaXRlKGQpO1xuICAgICAgfSxcbiAgICAgIGNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHNvY2tldC5lbmQoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHNvY2tldCA9IG5ldC5jb25uZWN0KHBvcnQsIGhvc3QsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHJldHVybiB3cy5vbm9wZW4oKTtcbiAgICB9KTtcbiAgICBzb2NrZXQub24oJ2Vycm9yJywgZnVuY3Rpb24oZSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB3cy5vbmNsb3NlID09PSBcImZ1bmN0aW9uXCIgPyB3cy5vbmNsb3NlKGUpIDogdm9pZCAwO1xuICAgIH0pO1xuICAgIHNvY2tldC5vbignY2xvc2UnLCBmdW5jdGlvbihlKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHdzLm9uY2xvc2UgPT09IFwiZnVuY3Rpb25cIiA/IHdzLm9uY2xvc2UoZSkgOiB2b2lkIDA7XG4gICAgfSk7XG4gICAgc29ja2V0Lm9uKCdkYXRhJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgdmFyIGV2ZW50O1xuICAgICAgZXZlbnQgPSB7XG4gICAgICAgICdkYXRhJzogZGF0YS50b1N0cmluZygpXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHdzLm9ubWVzc2FnZShldmVudCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHdzO1xuICB9O1xuXG4gIHdyYXBXUyA9IGZ1bmN0aW9uKHVybCkge1xuICAgIHZhciBXZWJTb2NrZXRDbGllbnQsIGNvbm5lY3Rpb24sIHNvY2tldCwgd3M7XG4gICAgV2ViU29ja2V0Q2xpZW50ID0gcmVxdWlyZSgnd2Vic29ja2V0JykuY2xpZW50O1xuICAgIGNvbm5lY3Rpb24gPSBudWxsO1xuICAgIHdzID0ge1xuICAgICAgdXJsOiB1cmwsXG4gICAgICBzZW5kOiBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBjb25uZWN0aW9uLnNlbmRVVEYoZCk7XG4gICAgICB9LFxuICAgICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gY29ubmVjdGlvbi5jbG9zZSgpO1xuICAgICAgfVxuICAgIH07XG4gICAgc29ja2V0ID0gbmV3IFdlYlNvY2tldENsaWVudCgpO1xuICAgIHNvY2tldC5vbignY29ubmVjdCcsIGZ1bmN0aW9uKGNvbm4pIHtcbiAgICAgIGNvbm5lY3Rpb24gPSBjb25uO1xuICAgICAgd3Mub25vcGVuKCk7XG4gICAgICBjb25uZWN0aW9uLm9uKCdlcnJvcicsIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygd3Mub25jbG9zZSA9PT0gXCJmdW5jdGlvblwiID8gd3Mub25jbG9zZShlcnJvcikgOiB2b2lkIDA7XG4gICAgICB9KTtcbiAgICAgIGNvbm5lY3Rpb24ub24oJ2Nsb3NlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygd3Mub25jbG9zZSA9PT0gXCJmdW5jdGlvblwiID8gd3Mub25jbG9zZSgpIDogdm9pZCAwO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gY29ubmVjdGlvbi5vbignbWVzc2FnZScsIGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgICAgdmFyIGV2ZW50O1xuICAgICAgICBpZiAobWVzc2FnZS50eXBlID09PSAndXRmOCcpIHtcbiAgICAgICAgICBldmVudCA9IHtcbiAgICAgICAgICAgICdkYXRhJzogbWVzc2FnZS51dGY4RGF0YVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIHdzLm9ubWVzc2FnZShldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHNvY2tldC5jb25uZWN0KHVybCk7XG4gICAgcmV0dXJuIHdzO1xuICB9O1xuXG4gIG92ZXJUQ1AgPSBmdW5jdGlvbihob3N0LCBwb3J0KSB7XG4gICAgdmFyIHNvY2tldDtcbiAgICBzb2NrZXQgPSB3cmFwVENQKHBvcnQsIGhvc3QpO1xuICAgIHJldHVybiBTdG9tcC5TdG9tcC5vdmVyKHNvY2tldCk7XG4gIH07XG5cbiAgb3ZlcldTID0gZnVuY3Rpb24odXJsKSB7XG4gICAgdmFyIHNvY2tldDtcbiAgICBzb2NrZXQgPSB3cmFwV1ModXJsKTtcbiAgICByZXR1cm4gU3RvbXAuU3RvbXAub3Zlcihzb2NrZXQpO1xuICB9O1xuXG4gIGV4cG9ydHMub3ZlclRDUCA9IG92ZXJUQ1A7XG5cbiAgZXhwb3J0cy5vdmVyV1MgPSBvdmVyV1M7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuNy4xXG5cbi8qXG4gICBTdG9tcCBPdmVyIFdlYlNvY2tldCBodHRwOi8vd3d3LmptZXNuaWwubmV0L3N0b21wLXdlYnNvY2tldC9kb2MvIHwgQXBhY2hlIExpY2Vuc2UgVjIuMFxuXG4gICBDb3B5cmlnaHQgKEMpIDIwMTAtMjAxMyBbSmVmZiBNZXNuaWxdKGh0dHA6Ly9qbWVzbmlsLm5ldC8pXG4gICBDb3B5cmlnaHQgKEMpIDIwMTIgW0Z1c2VTb3VyY2UsIEluYy5dKGh0dHA6Ly9mdXNlc291cmNlLmNvbSlcbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBCeXRlLCBDbGllbnQsIEZyYW1lLCBTdG9tcCxcbiAgICBfX2hhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eSxcbiAgICBfX3NsaWNlID0gW10uc2xpY2U7XG5cbiAgQnl0ZSA9IHtcbiAgICBMRjogJ1xceDBBJyxcbiAgICBOVUxMOiAnXFx4MDAnXG4gIH07XG5cbiAgRnJhbWUgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHVubWFyc2hhbGxTaW5nbGU7XG5cbiAgICBmdW5jdGlvbiBGcmFtZShjb21tYW5kLCBoZWFkZXJzLCBib2R5KSB7XG4gICAgICB0aGlzLmNvbW1hbmQgPSBjb21tYW5kO1xuICAgICAgdGhpcy5oZWFkZXJzID0gaGVhZGVycyAhPSBudWxsID8gaGVhZGVycyA6IHt9O1xuICAgICAgdGhpcy5ib2R5ID0gYm9keSAhPSBudWxsID8gYm9keSA6ICcnO1xuICAgIH1cblxuICAgIEZyYW1lLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGxpbmVzLCBuYW1lLCBza2lwQ29udGVudExlbmd0aCwgdmFsdWUsIF9yZWY7XG4gICAgICBsaW5lcyA9IFt0aGlzLmNvbW1hbmRdO1xuICAgICAgc2tpcENvbnRlbnRMZW5ndGggPSB0aGlzLmhlYWRlcnNbJ2NvbnRlbnQtbGVuZ3RoJ10gPT09IGZhbHNlID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgaWYgKHNraXBDb250ZW50TGVuZ3RoKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmhlYWRlcnNbJ2NvbnRlbnQtbGVuZ3RoJ107XG4gICAgICB9XG4gICAgICBfcmVmID0gdGhpcy5oZWFkZXJzO1xuICAgICAgZm9yIChuYW1lIGluIF9yZWYpIHtcbiAgICAgICAgaWYgKCFfX2hhc1Byb3AuY2FsbChfcmVmLCBuYW1lKSkgY29udGludWU7XG4gICAgICAgIHZhbHVlID0gX3JlZltuYW1lXTtcbiAgICAgICAgbGluZXMucHVzaChcIlwiICsgbmFtZSArIFwiOlwiICsgdmFsdWUpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuYm9keSAmJiAhc2tpcENvbnRlbnRMZW5ndGgpIHtcbiAgICAgICAgbGluZXMucHVzaChcImNvbnRlbnQtbGVuZ3RoOlwiICsgKEZyYW1lLnNpemVPZlVURjgodGhpcy5ib2R5KSkpO1xuICAgICAgfVxuICAgICAgbGluZXMucHVzaChCeXRlLkxGICsgdGhpcy5ib2R5KTtcbiAgICAgIHJldHVybiBsaW5lcy5qb2luKEJ5dGUuTEYpO1xuICAgIH07XG5cbiAgICBGcmFtZS5zaXplT2ZVVEY4ID0gZnVuY3Rpb24ocykge1xuICAgICAgaWYgKHMpIHtcbiAgICAgICAgcmV0dXJuIGVuY29kZVVSSShzKS5tYXRjaCgvJS4ufC4vZykubGVuZ3RoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHVubWFyc2hhbGxTaW5nbGUgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICB2YXIgYm9keSwgY2hyLCBjb21tYW5kLCBkaXZpZGVyLCBoZWFkZXJMaW5lcywgaGVhZGVycywgaSwgaWR4LCBsZW4sIGxpbmUsIHN0YXJ0LCB0cmltLCBfaSwgX2osIF9sZW4sIF9yZWYsIF9yZWYxO1xuICAgICAgZGl2aWRlciA9IGRhdGEuc2VhcmNoKFJlZ0V4cChcIlwiICsgQnl0ZS5MRiArIEJ5dGUuTEYpKTtcbiAgICAgIGhlYWRlckxpbmVzID0gZGF0YS5zdWJzdHJpbmcoMCwgZGl2aWRlcikuc3BsaXQoQnl0ZS5MRik7XG4gICAgICBjb21tYW5kID0gaGVhZGVyTGluZXMuc2hpZnQoKTtcbiAgICAgIGhlYWRlcnMgPSB7fTtcbiAgICAgIHRyaW0gPSBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gICAgICB9O1xuICAgICAgX3JlZiA9IGhlYWRlckxpbmVzLnJldmVyc2UoKTtcbiAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZi5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICBsaW5lID0gX3JlZltfaV07XG4gICAgICAgIGlkeCA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgICAgICBoZWFkZXJzW3RyaW0obGluZS5zdWJzdHJpbmcoMCwgaWR4KSldID0gdHJpbShsaW5lLnN1YnN0cmluZyhpZHggKyAxKSk7XG4gICAgICB9XG4gICAgICBib2R5ID0gJyc7XG4gICAgICBzdGFydCA9IGRpdmlkZXIgKyAyO1xuICAgICAgaWYgKGhlYWRlcnNbJ2NvbnRlbnQtbGVuZ3RoJ10pIHtcbiAgICAgICAgbGVuID0gcGFyc2VJbnQoaGVhZGVyc1snY29udGVudC1sZW5ndGgnXSk7XG4gICAgICAgIGJvZHkgPSAoJycgKyBkYXRhKS5zdWJzdHJpbmcoc3RhcnQsIHN0YXJ0ICsgbGVuKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNociA9IG51bGw7XG4gICAgICAgIGZvciAoaSA9IF9qID0gc3RhcnQsIF9yZWYxID0gZGF0YS5sZW5ndGg7IHN0YXJ0IDw9IF9yZWYxID8gX2ogPCBfcmVmMSA6IF9qID4gX3JlZjE7IGkgPSBzdGFydCA8PSBfcmVmMSA/ICsrX2ogOiAtLV9qKSB7XG4gICAgICAgICAgY2hyID0gZGF0YS5jaGFyQXQoaSk7XG4gICAgICAgICAgaWYgKGNociA9PT0gQnl0ZS5OVUxMKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgYm9keSArPSBjaHI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgRnJhbWUoY29tbWFuZCwgaGVhZGVycywgYm9keSk7XG4gICAgfTtcblxuICAgIEZyYW1lLnVubWFyc2hhbGwgPSBmdW5jdGlvbihkYXRhcykge1xuICAgICAgdmFyIGRhdGE7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgX2ksIF9sZW4sIF9yZWYsIF9yZXN1bHRzO1xuICAgICAgICBfcmVmID0gZGF0YXMuc3BsaXQoUmVnRXhwKFwiXCIgKyBCeXRlLk5VTEwgKyBCeXRlLkxGICsgXCIqXCIpKTtcbiAgICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgICAgZGF0YSA9IF9yZWZbX2ldO1xuICAgICAgICAgIGlmICgoZGF0YSAhPSBudWxsID8gZGF0YS5sZW5ndGggOiB2b2lkIDApID4gMCkge1xuICAgICAgICAgICAgX3Jlc3VsdHMucHVzaCh1bm1hcnNoYWxsU2luZ2xlKGRhdGEpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgICAgfSkoKTtcbiAgICB9O1xuXG4gICAgRnJhbWUubWFyc2hhbGwgPSBmdW5jdGlvbihjb21tYW5kLCBoZWFkZXJzLCBib2R5KSB7XG4gICAgICB2YXIgZnJhbWU7XG4gICAgICBmcmFtZSA9IG5ldyBGcmFtZShjb21tYW5kLCBoZWFkZXJzLCBib2R5KTtcbiAgICAgIHJldHVybiBmcmFtZS50b1N0cmluZygpICsgQnl0ZS5OVUxMO1xuICAgIH07XG5cbiAgICByZXR1cm4gRnJhbWU7XG5cbiAgfSkoKTtcblxuICBDbGllbnQgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5vdztcblxuICAgIGZ1bmN0aW9uIENsaWVudCh3cykge1xuICAgICAgdGhpcy53cyA9IHdzO1xuICAgICAgdGhpcy53cy5iaW5hcnlUeXBlID0gXCJhcnJheWJ1ZmZlclwiO1xuICAgICAgdGhpcy5jb3VudGVyID0gMDtcbiAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICB0aGlzLmhlYXJ0YmVhdCA9IHtcbiAgICAgICAgb3V0Z29pbmc6IDEwMDAwLFxuICAgICAgICBpbmNvbWluZzogMTAwMDBcbiAgICAgIH07XG4gICAgICB0aGlzLm1heFdlYlNvY2tldEZyYW1lU2l6ZSA9IDE2ICogMTAyNDtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IHt9O1xuICAgIH1cblxuICAgIENsaWVudC5wcm90b3R5cGUuZGVidWcgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICB2YXIgX3JlZjtcbiAgICAgIHJldHVybiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdyAhPT0gbnVsbCA/IChfcmVmID0gd2luZG93LmNvbnNvbGUpICE9IG51bGwgPyBfcmVmLmxvZyhtZXNzYWdlKSA6IHZvaWQgMCA6IHZvaWQgMDtcbiAgICB9O1xuXG4gICAgbm93ID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoRGF0ZS5ub3cpIHtcbiAgICAgICAgcmV0dXJuIERhdGUubm93KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoKS52YWx1ZU9mO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBDbGllbnQucHJvdG90eXBlLl90cmFuc21pdCA9IGZ1bmN0aW9uKGNvbW1hbmQsIGhlYWRlcnMsIGJvZHkpIHtcbiAgICAgIHZhciBvdXQ7XG4gICAgICBvdXQgPSBGcmFtZS5tYXJzaGFsbChjb21tYW5kLCBoZWFkZXJzLCBib2R5KTtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5kZWJ1ZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRoaXMuZGVidWcoXCI+Pj4gXCIgKyBvdXQpO1xuICAgICAgfVxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgaWYgKG91dC5sZW5ndGggPiB0aGlzLm1heFdlYlNvY2tldEZyYW1lU2l6ZSkge1xuICAgICAgICAgIHRoaXMud3Muc2VuZChvdXQuc3Vic3RyaW5nKDAsIHRoaXMubWF4V2ViU29ja2V0RnJhbWVTaXplKSk7XG4gICAgICAgICAgb3V0ID0gb3V0LnN1YnN0cmluZyh0aGlzLm1heFdlYlNvY2tldEZyYW1lU2l6ZSk7XG4gICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmRlYnVnID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZGVidWcoXCJyZW1haW5pbmcgPSBcIiArIG91dC5sZW5ndGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy53cy5zZW5kKG91dCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgQ2xpZW50LnByb3RvdHlwZS5fc2V0dXBIZWFydGJlYXQgPSBmdW5jdGlvbihoZWFkZXJzKSB7XG4gICAgICB2YXIgc2VydmVySW5jb21pbmcsIHNlcnZlck91dGdvaW5nLCB0dGwsIHYsIF9yZWYsIF9yZWYxO1xuICAgICAgaWYgKChfcmVmID0gaGVhZGVycy52ZXJzaW9uKSAhPT0gU3RvbXAuVkVSU0lPTlMuVjFfMSAmJiBfcmVmICE9PSBTdG9tcC5WRVJTSU9OUy5WMV8yKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIF9yZWYxID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgX2ksIF9sZW4sIF9yZWYxLCBfcmVzdWx0cztcbiAgICAgICAgX3JlZjEgPSBoZWFkZXJzWydoZWFydC1iZWF0J10uc3BsaXQoXCIsXCIpO1xuICAgICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYxLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgICAgdiA9IF9yZWYxW19pXTtcbiAgICAgICAgICBfcmVzdWx0cy5wdXNoKHBhcnNlSW50KHYpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgICB9KSgpLCBzZXJ2ZXJPdXRnb2luZyA9IF9yZWYxWzBdLCBzZXJ2ZXJJbmNvbWluZyA9IF9yZWYxWzFdO1xuICAgICAgaWYgKCEodGhpcy5oZWFydGJlYXQub3V0Z29pbmcgPT09IDAgfHwgc2VydmVySW5jb21pbmcgPT09IDApKSB7XG4gICAgICAgIHR0bCA9IE1hdGgubWF4KHRoaXMuaGVhcnRiZWF0Lm91dGdvaW5nLCBzZXJ2ZXJJbmNvbWluZyk7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5kZWJ1ZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgdGhpcy5kZWJ1ZyhcInNlbmQgUElORyBldmVyeSBcIiArIHR0bCArIFwibXNcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5waW5nZXIgPSBTdG9tcC5zZXRJbnRlcnZhbCh0dGwsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIF90aGlzLndzLnNlbmQoQnl0ZS5MRik7XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIF90aGlzLmRlYnVnID09PSBcImZ1bmN0aW9uXCIgPyBfdGhpcy5kZWJ1ZyhcIj4+PiBQSU5HXCIpIDogdm9pZCAwO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pKHRoaXMpKTtcbiAgICAgIH1cbiAgICAgIGlmICghKHRoaXMuaGVhcnRiZWF0LmluY29taW5nID09PSAwIHx8IHNlcnZlck91dGdvaW5nID09PSAwKSkge1xuICAgICAgICB0dGwgPSBNYXRoLm1heCh0aGlzLmhlYXJ0YmVhdC5pbmNvbWluZywgc2VydmVyT3V0Z29pbmcpO1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZGVidWcgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHRoaXMuZGVidWcoXCJjaGVjayBQT05HIGV2ZXJ5IFwiICsgdHRsICsgXCJtc1wiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wb25nZXIgPSBTdG9tcC5zZXRJbnRlcnZhbCh0dGwsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkZWx0YTtcbiAgICAgICAgICAgIGRlbHRhID0gbm93KCkgLSBfdGhpcy5zZXJ2ZXJBY3Rpdml0eTtcbiAgICAgICAgICAgIGlmIChkZWx0YSA+IHR0bCAqIDIpIHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBfdGhpcy5kZWJ1ZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuZGVidWcoXCJkaWQgbm90IHJlY2VpdmUgc2VydmVyIGFjdGl2aXR5IGZvciB0aGUgbGFzdCBcIiArIGRlbHRhICsgXCJtc1wiKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gX3RoaXMud3MuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KSh0aGlzKSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIENsaWVudC5wcm90b3R5cGUuX3BhcnNlQ29ubmVjdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MsIGNvbm5lY3RDYWxsYmFjaywgZXJyb3JDYWxsYmFjaywgaGVhZGVycztcbiAgICAgIGFyZ3MgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgICAgaGVhZGVycyA9IHt9O1xuICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgaGVhZGVycyA9IGFyZ3NbMF0sIGNvbm5lY3RDYWxsYmFjayA9IGFyZ3NbMV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBpZiAoYXJnc1sxXSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICBoZWFkZXJzID0gYXJnc1swXSwgY29ubmVjdENhbGxiYWNrID0gYXJnc1sxXSwgZXJyb3JDYWxsYmFjayA9IGFyZ3NbMl07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhlYWRlcnMubG9naW4gPSBhcmdzWzBdLCBoZWFkZXJzLnBhc3Njb2RlID0gYXJnc1sxXSwgY29ubmVjdENhbGxiYWNrID0gYXJnc1syXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICBoZWFkZXJzLmxvZ2luID0gYXJnc1swXSwgaGVhZGVycy5wYXNzY29kZSA9IGFyZ3NbMV0sIGNvbm5lY3RDYWxsYmFjayA9IGFyZ3NbMl0sIGVycm9yQ2FsbGJhY2sgPSBhcmdzWzNdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGhlYWRlcnMubG9naW4gPSBhcmdzWzBdLCBoZWFkZXJzLnBhc3Njb2RlID0gYXJnc1sxXSwgY29ubmVjdENhbGxiYWNrID0gYXJnc1syXSwgZXJyb3JDYWxsYmFjayA9IGFyZ3NbM10sIGhlYWRlcnMuaG9zdCA9IGFyZ3NbNF07XG4gICAgICB9XG4gICAgICByZXR1cm4gW2hlYWRlcnMsIGNvbm5lY3RDYWxsYmFjaywgZXJyb3JDYWxsYmFja107XG4gICAgfTtcblxuICAgIENsaWVudC5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MsIGVycm9yQ2FsbGJhY2ssIGhlYWRlcnMsIG91dDtcbiAgICAgIGFyZ3MgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgICAgb3V0ID0gdGhpcy5fcGFyc2VDb25uZWN0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgaGVhZGVycyA9IG91dFswXSwgdGhpcy5jb25uZWN0Q2FsbGJhY2sgPSBvdXRbMV0sIGVycm9yQ2FsbGJhY2sgPSBvdXRbMl07XG4gICAgICBpZiAodHlwZW9mIHRoaXMuZGVidWcgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0aGlzLmRlYnVnKFwiT3BlbmluZyBXZWIgU29ja2V0Li4uXCIpO1xuICAgICAgfVxuICAgICAgdGhpcy53cy5vbm1lc3NhZ2UgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgIHZhciBhcnIsIGMsIGNsaWVudCwgZGF0YSwgZnJhbWUsIG1lc3NhZ2VJRCwgb25yZWNlaXZlLCBzdWJzY3JpcHRpb24sIF9pLCBfbGVuLCBfcmVmLCBfcmVzdWx0cztcbiAgICAgICAgICBkYXRhID0gdHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiBldnQuZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyID8gKGFyciA9IG5ldyBVaW50OEFycmF5KGV2dC5kYXRhKSwgdHlwZW9mIF90aGlzLmRlYnVnID09PSBcImZ1bmN0aW9uXCIgPyBfdGhpcy5kZWJ1ZyhcIi0tLSBnb3QgZGF0YSBsZW5ndGg6IFwiICsgYXJyLmxlbmd0aCkgOiB2b2lkIDAsICgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgX2ksIF9sZW4sIF9yZXN1bHRzO1xuICAgICAgICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gYXJyLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgICAgICAgIGMgPSBhcnJbX2ldO1xuICAgICAgICAgICAgICBfcmVzdWx0cy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoYykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgICAgICAgIH0pKCkpLmpvaW4oJycpKSA6IGV2dC5kYXRhO1xuICAgICAgICAgIF90aGlzLnNlcnZlckFjdGl2aXR5ID0gbm93KCk7XG4gICAgICAgICAgaWYgKGRhdGEgPT09IEJ5dGUuTEYpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgX3RoaXMuZGVidWcgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICBfdGhpcy5kZWJ1ZyhcIjw8PCBQT05HXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodHlwZW9mIF90aGlzLmRlYnVnID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIF90aGlzLmRlYnVnKFwiPDw8IFwiICsgZGF0YSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIF9yZWYgPSBGcmFtZS51bm1hcnNoYWxsKGRhdGEpO1xuICAgICAgICAgIF9yZXN1bHRzID0gW107XG4gICAgICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgICAgICBmcmFtZSA9IF9yZWZbX2ldO1xuICAgICAgICAgICAgc3dpdGNoIChmcmFtZS5jb21tYW5kKSB7XG4gICAgICAgICAgICAgIGNhc2UgXCJDT05ORUNURURcIjpcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIF90aGlzLmRlYnVnID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgIF90aGlzLmRlYnVnKFwiY29ubmVjdGVkIHRvIHNlcnZlciBcIiArIGZyYW1lLmhlYWRlcnMuc2VydmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3RoaXMuY29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fc2V0dXBIZWFydGJlYXQoZnJhbWUuaGVhZGVycyk7XG4gICAgICAgICAgICAgICAgX3Jlc3VsdHMucHVzaCh0eXBlb2YgX3RoaXMuY29ubmVjdENhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIgPyBfdGhpcy5jb25uZWN0Q2FsbGJhY2soZnJhbWUpIDogdm9pZCAwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSBcIk1FU1NBR0VcIjpcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24gPSBmcmFtZS5oZWFkZXJzLnN1YnNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICBvbnJlY2VpdmUgPSBfdGhpcy5zdWJzY3JpcHRpb25zW3N1YnNjcmlwdGlvbl0gfHwgX3RoaXMub25yZWNlaXZlO1xuICAgICAgICAgICAgICAgIGlmIChvbnJlY2VpdmUpIHtcbiAgICAgICAgICAgICAgICAgIGNsaWVudCA9IF90aGlzO1xuICAgICAgICAgICAgICAgICAgbWVzc2FnZUlEID0gZnJhbWUuaGVhZGVyc1tcIm1lc3NhZ2UtaWRcIl07XG4gICAgICAgICAgICAgICAgICBmcmFtZS5hY2sgPSBmdW5jdGlvbihoZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChoZWFkZXJzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzID0ge307XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsaWVudC5hY2sobWVzc2FnZUlELCBzdWJzY3JpcHRpb24sIGhlYWRlcnMpO1xuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIGZyYW1lLm5hY2sgPSBmdW5jdGlvbihoZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChoZWFkZXJzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzID0ge307XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsaWVudC5uYWNrKG1lc3NhZ2VJRCwgc3Vic2NyaXB0aW9uLCBoZWFkZXJzKTtcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICBfcmVzdWx0cy5wdXNoKG9ucmVjZWl2ZShmcmFtZSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBfcmVzdWx0cy5wdXNoKHR5cGVvZiBfdGhpcy5kZWJ1ZyA9PT0gXCJmdW5jdGlvblwiID8gX3RoaXMuZGVidWcoXCJVbmhhbmRsZWQgcmVjZWl2ZWQgTUVTU0FHRTogXCIgKyBmcmFtZSkgOiB2b2lkIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSBcIlJFQ0VJUFRcIjpcbiAgICAgICAgICAgICAgICBfcmVzdWx0cy5wdXNoKHR5cGVvZiBfdGhpcy5vbnJlY2VpcHQgPT09IFwiZnVuY3Rpb25cIiA/IF90aGlzLm9ucmVjZWlwdChmcmFtZSkgOiB2b2lkIDApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIFwiRVJST1JcIjpcbiAgICAgICAgICAgICAgICBfcmVzdWx0cy5wdXNoKHR5cGVvZiBlcnJvckNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIgPyBlcnJvckNhbGxiYWNrKGZyYW1lKSA6IHZvaWQgMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgX3Jlc3VsdHMucHVzaCh0eXBlb2YgX3RoaXMuZGVidWcgPT09IFwiZnVuY3Rpb25cIiA/IF90aGlzLmRlYnVnKFwiVW5oYW5kbGVkIGZyYW1lOiBcIiArIGZyYW1lKSA6IHZvaWQgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpO1xuICAgICAgdGhpcy53cy5vbmNsb3NlID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgbXNnO1xuICAgICAgICAgIG1zZyA9IFwiV2hvb3BzISBMb3N0IGNvbm5lY3Rpb24gdG8gXCIgKyBfdGhpcy53cy51cmw7XG4gICAgICAgICAgaWYgKHR5cGVvZiBfdGhpcy5kZWJ1ZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBfdGhpcy5kZWJ1Zyhtc2cpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBfdGhpcy5fY2xlYW5VcCgpO1xuICAgICAgICAgIHJldHVybiB0eXBlb2YgZXJyb3JDYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiID8gZXJyb3JDYWxsYmFjayhtc2cpIDogdm9pZCAwO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcyk7XG4gICAgICByZXR1cm4gdGhpcy53cy5vbm9wZW4gPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgX3RoaXMuZGVidWcgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgX3RoaXMuZGVidWcoJ1dlYiBTb2NrZXQgT3BlbmVkLi4uJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGhlYWRlcnNbXCJhY2NlcHQtdmVyc2lvblwiXSA9IFN0b21wLlZFUlNJT05TLnN1cHBvcnRlZFZlcnNpb25zKCk7XG4gICAgICAgICAgaGVhZGVyc1tcImhlYXJ0LWJlYXRcIl0gPSBbX3RoaXMuaGVhcnRiZWF0Lm91dGdvaW5nLCBfdGhpcy5oZWFydGJlYXQuaW5jb21pbmddLmpvaW4oJywnKTtcbiAgICAgICAgICByZXR1cm4gX3RoaXMuX3RyYW5zbWl0KFwiQ09OTkVDVFwiLCBoZWFkZXJzKTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpO1xuICAgIH07XG5cbiAgICBDbGllbnQucHJvdG90eXBlLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbihkaXNjb25uZWN0Q2FsbGJhY2ssIGhlYWRlcnMpIHtcbiAgICAgIGlmIChoZWFkZXJzID09IG51bGwpIHtcbiAgICAgICAgaGVhZGVycyA9IHt9O1xuICAgICAgfVxuICAgICAgdGhpcy5fdHJhbnNtaXQoXCJESVNDT05ORUNUXCIsIGhlYWRlcnMpO1xuICAgICAgdGhpcy53cy5vbmNsb3NlID0gbnVsbDtcbiAgICAgIHRoaXMud3MuY2xvc2UoKTtcbiAgICAgIHRoaXMuX2NsZWFuVXAoKTtcbiAgICAgIHJldHVybiB0eXBlb2YgZGlzY29ubmVjdENhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIgPyBkaXNjb25uZWN0Q2FsbGJhY2soKSA6IHZvaWQgMDtcbiAgICB9O1xuXG4gICAgQ2xpZW50LnByb3RvdHlwZS5fY2xlYW5VcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgIGlmICh0aGlzLnBpbmdlcikge1xuICAgICAgICBTdG9tcC5jbGVhckludGVydmFsKHRoaXMucGluZ2VyKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnBvbmdlcikge1xuICAgICAgICByZXR1cm4gU3RvbXAuY2xlYXJJbnRlcnZhbCh0aGlzLnBvbmdlcik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIENsaWVudC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uKGRlc3RpbmF0aW9uLCBoZWFkZXJzLCBib2R5KSB7XG4gICAgICBpZiAoaGVhZGVycyA9PSBudWxsKSB7XG4gICAgICAgIGhlYWRlcnMgPSB7fTtcbiAgICAgIH1cbiAgICAgIGlmIChib2R5ID09IG51bGwpIHtcbiAgICAgICAgYm9keSA9ICcnO1xuICAgICAgfVxuICAgICAgaGVhZGVycy5kZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uO1xuICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zbWl0KFwiU0VORFwiLCBoZWFkZXJzLCBib2R5KTtcbiAgICB9O1xuXG4gICAgQ2xpZW50LnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbihkZXN0aW5hdGlvbiwgY2FsbGJhY2ssIGhlYWRlcnMpIHtcbiAgICAgIHZhciBjbGllbnQ7XG4gICAgICBpZiAoaGVhZGVycyA9PSBudWxsKSB7XG4gICAgICAgIGhlYWRlcnMgPSB7fTtcbiAgICAgIH1cbiAgICAgIGlmICghaGVhZGVycy5pZCkge1xuICAgICAgICBoZWFkZXJzLmlkID0gXCJzdWItXCIgKyB0aGlzLmNvdW50ZXIrKztcbiAgICAgIH1cbiAgICAgIGhlYWRlcnMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbjtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uc1toZWFkZXJzLmlkXSA9IGNhbGxiYWNrO1xuICAgICAgdGhpcy5fdHJhbnNtaXQoXCJTVUJTQ1JJQkVcIiwgaGVhZGVycyk7XG4gICAgICBjbGllbnQgPSB0aGlzO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IGhlYWRlcnMuaWQsXG4gICAgICAgIHVuc3Vic2NyaWJlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gY2xpZW50LnVuc3Vic2NyaWJlKGhlYWRlcnMuaWQpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG5cbiAgICBDbGllbnQucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24oaWQpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLnN1YnNjcmlwdGlvbnNbaWRdO1xuICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zbWl0KFwiVU5TVUJTQ1JJQkVcIiwge1xuICAgICAgICBpZDogaWRcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBDbGllbnQucHJvdG90eXBlLmJlZ2luID0gZnVuY3Rpb24odHJhbnNhY3Rpb24pIHtcbiAgICAgIHZhciBjbGllbnQsIHR4aWQ7XG4gICAgICB0eGlkID0gdHJhbnNhY3Rpb24gfHwgXCJ0eC1cIiArIHRoaXMuY291bnRlcisrO1xuICAgICAgdGhpcy5fdHJhbnNtaXQoXCJCRUdJTlwiLCB7XG4gICAgICAgIHRyYW5zYWN0aW9uOiB0eGlkXG4gICAgICB9KTtcbiAgICAgIGNsaWVudCA9IHRoaXM7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogdHhpZCxcbiAgICAgICAgY29tbWl0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gY2xpZW50LmNvbW1pdCh0eGlkKTtcbiAgICAgICAgfSxcbiAgICAgICAgYWJvcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBjbGllbnQuYWJvcnQodHhpZCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcblxuICAgIENsaWVudC5wcm90b3R5cGUuY29tbWl0ID0gZnVuY3Rpb24odHJhbnNhY3Rpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLl90cmFuc21pdChcIkNPTU1JVFwiLCB7XG4gICAgICAgIHRyYW5zYWN0aW9uOiB0cmFuc2FjdGlvblxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIENsaWVudC5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbih0cmFuc2FjdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zbWl0KFwiQUJPUlRcIiwge1xuICAgICAgICB0cmFuc2FjdGlvbjogdHJhbnNhY3Rpb25cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBDbGllbnQucHJvdG90eXBlLmFjayA9IGZ1bmN0aW9uKG1lc3NhZ2VJRCwgc3Vic2NyaXB0aW9uLCBoZWFkZXJzKSB7XG4gICAgICBpZiAoaGVhZGVycyA9PSBudWxsKSB7XG4gICAgICAgIGhlYWRlcnMgPSB7fTtcbiAgICAgIH1cbiAgICAgIGhlYWRlcnNbXCJtZXNzYWdlLWlkXCJdID0gbWVzc2FnZUlEO1xuICAgICAgaGVhZGVycy5zdWJzY3JpcHRpb24gPSBzdWJzY3JpcHRpb247XG4gICAgICByZXR1cm4gdGhpcy5fdHJhbnNtaXQoXCJBQ0tcIiwgaGVhZGVycyk7XG4gICAgfTtcblxuICAgIENsaWVudC5wcm90b3R5cGUubmFjayA9IGZ1bmN0aW9uKG1lc3NhZ2VJRCwgc3Vic2NyaXB0aW9uLCBoZWFkZXJzKSB7XG4gICAgICBpZiAoaGVhZGVycyA9PSBudWxsKSB7XG4gICAgICAgIGhlYWRlcnMgPSB7fTtcbiAgICAgIH1cbiAgICAgIGhlYWRlcnNbXCJtZXNzYWdlLWlkXCJdID0gbWVzc2FnZUlEO1xuICAgICAgaGVhZGVycy5zdWJzY3JpcHRpb24gPSBzdWJzY3JpcHRpb247XG4gICAgICByZXR1cm4gdGhpcy5fdHJhbnNtaXQoXCJOQUNLXCIsIGhlYWRlcnMpO1xuICAgIH07XG5cbiAgICByZXR1cm4gQ2xpZW50O1xuXG4gIH0pKCk7XG5cbiAgU3RvbXAgPSB7XG4gICAgVkVSU0lPTlM6IHtcbiAgICAgIFYxXzA6ICcxLjAnLFxuICAgICAgVjFfMTogJzEuMScsXG4gICAgICBWMV8yOiAnMS4yJyxcbiAgICAgIHN1cHBvcnRlZFZlcnNpb25zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICcxLjEsMS4wJztcbiAgICAgIH1cbiAgICB9LFxuICAgIGNsaWVudDogZnVuY3Rpb24odXJsLCBwcm90b2NvbHMpIHtcbiAgICAgIHZhciBrbGFzcywgd3M7XG4gICAgICBpZiAocHJvdG9jb2xzID09IG51bGwpIHtcbiAgICAgICAgcHJvdG9jb2xzID0gWyd2MTAuc3RvbXAnLCAndjExLnN0b21wJ107XG4gICAgICB9XG4gICAgICBrbGFzcyA9IFN0b21wLldlYlNvY2tldENsYXNzIHx8IFdlYlNvY2tldDtcbiAgICAgIHdzID0gbmV3IGtsYXNzKHVybCwgcHJvdG9jb2xzKTtcbiAgICAgIHJldHVybiBuZXcgQ2xpZW50KHdzKTtcbiAgICB9LFxuICAgIG92ZXI6IGZ1bmN0aW9uKHdzKSB7XG4gICAgICByZXR1cm4gbmV3IENsaWVudCh3cyk7XG4gICAgfSxcbiAgICBGcmFtZTogRnJhbWVcbiAgfTtcblxuICBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIgJiYgZXhwb3J0cyAhPT0gbnVsbCkge1xuICAgIGV4cG9ydHMuU3RvbXAgPSBTdG9tcDtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdyAhPT0gbnVsbCkge1xuICAgIFN0b21wLnNldEludGVydmFsID0gZnVuY3Rpb24oaW50ZXJ2YWwsIGYpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuc2V0SW50ZXJ2YWwoZiwgaW50ZXJ2YWwpO1xuICAgIH07XG4gICAgU3RvbXAuY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgICByZXR1cm4gd2luZG93LmNsZWFySW50ZXJ2YWwoaWQpO1xuICAgIH07XG4gICAgd2luZG93LlN0b21wID0gU3RvbXA7XG4gIH0gZWxzZSBpZiAoIWV4cG9ydHMpIHtcbiAgICBzZWxmLlN0b21wID0gU3RvbXA7XG4gIH1cblxufSkuY2FsbCh0aGlzKTtcbiIsImV4cG9ydCBmdW5jdGlvbiBmaW5kUGFyZW50KGVsbTpIVE1MRWxlbWVudCwgdGFnTmFtZTpzdHJpbmcpOiBIVE1MRWxlbWVudCB8IG51bGx7XG5cdFxuXHRpZih0YWdOYW1lID09PSBudWxsIHx8IHRhZ05hbWUgPT09IFwiXCIpIHJldHVybiBudWxsO1xuXHRpZihlbG0gPT09IG51bGwpIHJldHVybiBudWxsO1xuXHRsZXQgcGFyZW50ID0gZWxtO1xuXHRmb3IobGV0IGkgPSAwOyBpIDwgMjA7IGkrKyl7XG5cdFx0cGFyZW50ID0gPEhUTUxFbGVtZW50PnBhcmVudC5wYXJlbnROb2RlO1xuXHRcdGlmKHBhcmVudC50YWdOYW1lID09PSB0YWdOYW1lLnRvVXBwZXJDYXNlKCkpe1xuXHRcdFx0cmV0dXJuIHBhcmVudDtcblx0XHR9XG5cdH1cblx0cmV0dXJuIG51bGw7XG59IiwiaW1wb3J0ICogYXMgdXRpbCBmcm9tIFwiLi9Db21tb25cIjtcblxuZXhwb3J0IGNsYXNzIE1lc3NlbmdlciB7XG5cdFxuXHRwcml2YXRlIF9lbG06IEhUTUxFbGVtZW50O1xuXHRwcml2YXRlIF9tZXNzYWdlTGlzdDogSFRNTEVsZW1lbnQ7XG5cdHByaXZhdGUgX3RlbXBsYXRlTXNnSXRlbTogSFRNTEVsZW1lbnQ7XG5cblx0cHJpdmF0ZSBpZGxpc3QgPSB7XG5cdFx0XHRcdFx0XHRcIm1lc3NhZ2VBcmVhXCI6IFwibWVzc2FnZS1hcmVhXCIsXG5cdFx0XHRcdFx0XHRcIm1lc3NhZ2VMaXN0XCI6IFwibWVzc2FnZS1saXN0XCIsXG5cdFx0XHRcdFx0fTtcblx0XG5cdHByaXZhdGUgY2xhc3NsaXN0ID0ge1xuXHRcdFx0XHRcdFx0XCJtZXNzYWdlXCI6IFwibWVzc2FnZVwiLFxuXHRcdFx0XHRcdFx0XCJjb250ZW50XCI6IFwiY29udGVudFwiLFxuXHRcdFx0XHRcdFx0XCJkZWxldGVCdG5NZXNzYWdlXCI6IFwiZGVsZXRlLWJ0bi1tZXNzYWdlXCIsXG5cdFx0XHRcdFx0XHRcImhpZGVcIjogXCJoaWRlXCIsXG5cdFx0XHRcdFx0fTtcblxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHRoaXMuX2VsbSA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkbGlzdC5tZXNzYWdlQXJlYSk7XG5cdFx0dGhpcy5fbWVzc2FnZUxpc3QgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5pZGxpc3QubWVzc2FnZUxpc3QpO1xuXHRcdHRoaXMuX3RlbXBsYXRlTXNnSXRlbSA9IHRoaXMuY3JlYXRlVGVtcGxhdGVNc2dJdGVtKCk7XG5cdH1cbiAgICBcblx0cHJpdmF0ZSBjcmVhdGVUZW1wbGF0ZU1zZ0l0ZW0oKTogSFRNTEVsZW1lbnR7XG5cdFx0Y29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG5cdFx0bGkuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzbGlzdC5tZXNzYWdlKTtcblx0XHRjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGRpdi5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3NsaXN0LmNvbnRlbnQpO1xuXHRcdGNvbnN0IGRlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0ZGVsQnRuLnR5cGU9XCJidXR0b25cIjtcblx0XHRkZWxCdG4uY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzbGlzdC5kZWxldGVCdG5NZXNzYWdlKTtcblx0XHRkZWxCdG4uaW5uZXJUZXh0ID0gXCLDl1wiO1xuXG5cdFx0bGkuYXBwZW5kQ2hpbGQoZGVsQnRuKTtcblx0XHRsaS5hcHBlbmRDaGlsZChkaXYpO1xuXHRcdHJldHVybiBsaTtcblx0fVxuXHRwcml2YXRlIGFkZEV2ZW50RGVsZXRlTWVzc2FnZShkZWxCdG46IEhUTUxFbGVtZW50KTogdm9pZHtcblx0XHRkZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG5cdFx0XHRjb25zdCBsaSA9IDxIVE1MRWxlbWVudD51dGlsLmZpbmRQYXJlbnQoZGVsQnRuLCBcImxpXCIpO1xuXHRcdFx0bGkucmVtb3ZlKCk7XG5cdFx0fSwgZmFsc2UpO1xuXHR9XG5cdHB1YmxpYyBwdXNoTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcsIGV4cGlyZVRpbWU6IG51bWJlcik6IHZvaWR7XG5cdFx0Y29uc3QgbXNnID0gPEhUTUxFbGVtZW50PnRoaXMuX3RlbXBsYXRlTXNnSXRlbS5jbG9uZU5vZGUodHJ1ZSk7XG5cdFx0Y29uc3QgZGVsQnRuID0gPEhUTUxFbGVtZW50Pm1zZy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuY2xhc3NsaXN0LmRlbGV0ZUJ0bk1lc3NhZ2UpWzBdO1xuXHRcdHRoaXMuYWRkRXZlbnREZWxldGVNZXNzYWdlKGRlbEJ0bik7XG5cdFx0KDxIVE1MRWxlbWVudD5tc2cuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmNsYXNzbGlzdC5jb250ZW50KVswXSkuaW5uZXJIVE1MID0gbWVzc2FnZTtcblx0XHR0aGlzLl9tZXNzYWdlTGlzdC5hcHBlbmRDaGlsZChtc2cpO1xuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmhpZGVNZXNzYWdlKG1zZylcblx0XHR9LCBleHBpcmVUaW1lKTtcblx0fVxuXHRwdWJsaWMgaGlkZU1lc3NhZ2UobXNnRWxtOiBIVE1MRWxlbWVudCk6IHZvaWR7XG5cdFx0bXNnRWxtLmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2xpc3QuaGlkZSk7XG5cdH1cbn1cbiIsImltcG9ydCAqIGFzIHV0aWwgZnJvbSBcIi4uL0NvbW1vblwiO1xuaW1wb3J0IHsgVG9kb1ZpZXcsIFRPRE8gfSBmcm9tIFwiLi9Ub2RvVmlld1wiO1xuaW1wb3J0IHsgSUNoZWNrSXRlbURhdGEgfSBmcm9tIFwiLi9JQ2hlY2tJdGVtRGF0YVwiO1xuaW1wb3J0IHsgSVRvZG9EYXRhIH0gZnJvbSBcIi4vSVRvZG9EYXRhXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUVkaXRUb2RvQWRwIHtcblx0Y2xvc2VUb2RvKCk6IHZvaWQ7XG5cdHNhdmVUb2RvKHVybDogc3RyaW5nLCBqc29uOnN0cmluZyk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBFZGl0VG9kbyB7XG5cdC8vIOOCqOODquOCouacrOS9k1xuXHRfYXJlYUVsbTogSFRNTEVsZW1lbnQ7XG5cdC8vIOWQhOWFpeWKm+imgee0oFxuXHRfZXZlbnRJZEVsbTogSFRNTElucHV0RWxlbWVudDtcblx0X3RvZG9JZEVsbTogSFRNTElucHV0RWxlbWVudDtcblx0X3RpdGxlRWxtOiBIVE1MSW5wdXRFbGVtZW50O1xuXHRfY29udGVudEVsbTogSFRNTElucHV0RWxlbWVudDtcblx0X2NoZWNrbGlzdEFyZWE6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cdF9yZW1pbmRlck5vdGljZVRpbWVFbG06IEhUTUxJbnB1dEVsZW1lbnQ7XG5cdF9yZW1pbmRlclJlcGVhdEVsbTogSFRNTElucHV0RWxlbWVudDtcblx0X3N0YXJ0RGF0ZUVsbTogSFRNTElucHV0RWxlbWVudDtcblx0X3N0YXJ0VGltZUVsbTogSFRNTElucHV0RWxlbWVudDtcblx0Ly8g44OB44Kn44OD44Kv44Oq44K544OI44Gu44OG44Oz44OX44Os44O844OI6KaB57SgXG5cdF9jaGVja2xpc3RUZW1wbGF0ZTogSFRNTEVsZW1lbnQ7XG5cdC8vIOOCqOODquOCouS4i+mDqOOBruODnOOCv+ODs1xuXHRfYWRkQ2hlY2tCb3hCdG46IEhUTUxFbGVtZW50O1xuXHRfc2F2ZVRvZG9CdG46IEhUTUxFbGVtZW50O1xuXHRfY2FuY2VsQnRuOiBIVE1MRWxlbWVudDtcblx0Ly8g5L2c5oiQ5oOF5aCxXG5cdF9jcmVhdGVVc2VySWRFbG06IEhUTUxJbnB1dEVsZW1lbnQ7XG5cdF9jcmVhdGVVc2VyTmFtZUVsbTogSFRNTElucHV0RWxlbWVudDtcblx0X2NyZWF0ZURhdGV0aW1lRWxtOiBIVE1MSW5wdXRFbGVtZW50O1xuXHQvLyDmm7TmlrDmg4XloLFcblx0X3VwZGF0ZVVzZXJJZEVsbTogSFRNTElucHV0RWxlbWVudDtcblx0X3VwZGF0ZVVzZXJOYW1lRWxtOiBIVE1MSW5wdXRFbGVtZW50O1xuXHRfdXBkYXRlRGF0ZXRpbWVFbG06IEhUTUxJbnB1dEVsZW1lbnQ7XG5cdFxuXHQvLyDliJ3mnJ/ljJblh6bnkIZcblx0Y29uc3RydWN0b3IoKXtcblx0XHR0aGlzLl9ldmVudElkRWxtID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaWQtZWRpdC1ldmVudC1pZFwiKTtcblx0XHR0aGlzLl90b2RvSWRFbG0gPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhpZC1lZGl0LXRvZG8taWRcIik7XG5cdFx0dGhpcy5fY3JlYXRlVXNlcklkRWxtID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaWQtZWRpdC1jcmVhdGUtdXNlci1pZFwiKTtcblx0XHR0aGlzLl9jcmVhdGVVc2VyTmFtZUVsbSA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGlkLWVkaXQtY3JlYXRlLXVzZXItbmFtZVwiKTtcblx0XHR0aGlzLl9jcmVhdGVEYXRldGltZUVsbSA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGlkLWVkaXQtY3JlYXRlLWRhdGV0aW1lXCIpO1xuXHRcdHRoaXMuX3VwZGF0ZVVzZXJJZEVsbSA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGlkLWVkaXQtdXBkYXRlLXVzZXItaWRcIik7XG5cdFx0dGhpcy5fdXBkYXRlVXNlck5hbWVFbG0gPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhpZC1lZGl0LXVwZGF0ZS11c2VyLW5hbWVcIik7XG5cdFx0dGhpcy5fdXBkYXRlRGF0ZXRpbWVFbG0gPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhpZC1lZGl0LXVwZGF0ZS1kYXRldGltZVwiKTtcblxuXHRcdHRoaXMuX2FyZWFFbG0gPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0LXRvZG8tYXJlYVwiKTtcblx0XHR0aGlzLl90aXRsZUVsbSA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHh0LWVkaXQtdG9kby10aXRsZVwiKTtcblx0XHR0aGlzLl9jb250ZW50RWxtID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0eHRhLWVkaXQtdG9kby1jb250ZW50XCIpO1xuXHRcdHRoaXMuX2NoZWNrbGlzdEFyZWEgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI2NoZWNrbGlzdC1hcmVhIHVsLmNoZWNrbGlzdFwiKTtcblx0XHR0aGlzLl9hZGRDaGVja0JveEJ0biA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bi1hZGQtY2hlY2tsaXN0XCIpO1xuXHRcdHRoaXMuX3JlbWluZGVyTm90aWNlVGltZUVsbSA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2xjdC1lZGl0LXJlbWluZGVyLW5vdGljZS10aW1lXCIpO1xuXHRcdHRoaXMuX3JlbWluZGVyUmVwZWF0RWxtID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzbGN0LWVkaXQtcmVtaW5kZXItcmVwZWF0XCIpO1xuXHRcdHRoaXMuX3N0YXJ0RGF0ZUVsbSA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHh0LWVkaXQtc3RhcnQtZGF0ZVwiKTtcblx0XHR0aGlzLl9zdGFydFRpbWVFbG0gPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR4dC1lZGl0LXN0YXJ0LXRpbWVcIik7XG5cdFx0dGhpcy5fc2F2ZVRvZG9CdG4gPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG4tc2F2ZS10b2RvXCIpO1xuXHRcdHRoaXMuX2NhbmNlbEJ0biA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bi1jYW5jZWwtdG9kb1wiKTtcblx0XHR0aGlzLl9jaGVja2xpc3RUZW1wbGF0ZSA9IDxIVE1MRWxlbWVudD50aGlzLmNyZWF0ZVRlbXBsYXRlQ2hlY2tJdGVtKCk7XG5cdFx0dGhpcy5fYWRkRXZlbnRBZGRDaGVja0xpc3QoKTtcblx0XHR0aGlzLl9hZGRFdmVudFNhdmUoKTtcblx0XHR0aGlzLl9hZGRFdmVudENhbmNlbCgpO1xuXHR9XG5cdHNldFVwRWRpdENhcmQoZWxtOkVsZW1lbnQgfCB1bmRlZmluZWQpe1xuXHRcdHRoaXMuX2V2ZW50SWRFbG0udmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiLmNob29zZS1ldmVudC5zZWxlY3RcIik/LnZhbHVlIHx8IFwiXCI7XG5cdFx0aWYoIXRoaXMuX2V2ZW50SWRFbG0udmFsdWUpe3Rocm93IG5ldyBFcnJvcihcIuOCpOODmeODs+ODiElE44GM44GC44KK44G+44Gb44KT44CCXCIpO31cblx0XHRpZihlbG0gIT09IHVuZGVmaW5lZCl7XG5cdFx0XHR0aGlzLl9jb3B5VG9FZGl0Q2FyZChlbG0pO1xuXHRcdH1cblx0XHR0aGlzLl9hZGRFdmVudERlbGV0ZUNoZWNrSXRlbUJ0bigpO1xuXHR9XG5cdHB1YmxpYyBjb3B5VG9FZGl0Q2FyZChlbG06RWxlbWVudCl7XG5cdFx0dGhpcy5fY29weVRvRWRpdENhcmQoZWxtKTtcblx0fVxuXHRwcml2YXRlIF9jb3B5VG9FZGl0Q2FyZChlbG06RWxlbWVudCl7XHRcdFxuXHRcdHRoaXMuX3RvZG9JZEVsbS52YWx1ZSA9IGVsbS5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiLnRvZG8taWRcIik/LnZhbHVlIHx8IFwiXCI7XG5cdFx0dGhpcy5fdGl0bGVFbG0udmFsdWUgPSBlbG0ucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIi50ZXh0LnRpdGxlXCIpPy52YWx1ZSB8fCBcIlwiO1xuXHRcdHRoaXMuX2NvbnRlbnRFbG0udmFsdWU9IGVsbS5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiLnRleHQuY29udGVudFwiKT8udmFsdWUgfHwgXCJcIjtcblx0XHR0aGlzLl9yZW1pbmRlck5vdGljZVRpbWVFbG0udmFsdWU9IGVsbS5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiLnNlbGVjdC5yZW1pbmRlci1ub3RpY2UtdGltZVwiKT8udmFsdWUgfHwgXCJcIjtcblx0XHR0aGlzLl9yZW1pbmRlclJlcGVhdEVsbS52YWx1ZT0gZWxtLnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIuc2VsZWN0LnJlbWluZGVyLXJlcGVhdFwiKT8udmFsdWUgfHwgXCJcIjtcblx0XHR0aGlzLl9zdGFydERhdGVFbG0udmFsdWU9IGVsbS5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiLnRleHQudG9kby1zdGFydC1kYXRlXCIpPy52YWx1ZSB8fCBcIlwiO1xuXHRcdHRoaXMuX3N0YXJ0VGltZUVsbS52YWx1ZT0gZWxtLnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIudGV4dC50b2RvLXN0YXJ0LXRpbWVcIik/LnZhbHVlIHx8IFwiXCI7XG5cdFx0dGhpcy5fY3JlYXRlVXNlcklkRWxtLnZhbHVlPSBlbG0ucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIi5oaWQudG9kby1jcmVhdGUtdXNlci1pZFwiKT8udmFsdWUgfHwgXCJcIjtcblx0XHR0aGlzLl9jcmVhdGVVc2VyTmFtZUVsbS52YWx1ZT0gZWxtLnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIuaGlkLnRvZG8tY3JlYXRlLXVzZXItbmFtZVwiKT8udmFsdWUgfHwgXCJcIjtcblx0XHR0aGlzLl9jcmVhdGVEYXRldGltZUVsbS52YWx1ZT0gZWxtLnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIuaGlkLnRvZG8tY3JlYXRlLWRhdGV0aW1lXCIpPy52YWx1ZSB8fCBcIlwiO1xuXHRcdHRoaXMuX3VwZGF0ZVVzZXJJZEVsbS52YWx1ZT0gZWxtLnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIuaGlkLnRvZG8tdXBkYXRlLXVzZXItaWRcIik/LnZhbHVlIHx8IFwiXCI7XG5cdFx0dGhpcy5fdXBkYXRlVXNlck5hbWVFbG0udmFsdWU9IGVsbS5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiLmhpZC50b2RvLXVwZGF0ZS11c2VyLW5hbWVcIik/LnZhbHVlIHx8IFwiXCI7XG5cdFx0dGhpcy5fdXBkYXRlRGF0ZXRpbWVFbG0udmFsdWU9IGVsbS5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiLmhpZC50b2RvLXVwZGF0ZS1kYXRldGltZVwiKT8udmFsdWUgfHwgXCJcIjtcblx0XHRjb25zdCBjaGVja2xpc3QgPSBlbG0ucXVlcnlTZWxlY3RvckFsbChcInVsLmNoZWNrbGlzdCBsaVwiKTtcblx0XHRmb3IobGV0IGNoZWNrSXRlbSBvZiBjaGVja2xpc3Qpe1xuXHRcdFx0dGhpcy5fY2hlY2tsaXN0QXJlYS5hcHBlbmRDaGlsZChjaGVja0l0ZW0uY2xvbmVOb2RlKHRydWUpKTtcblx0XHR9XG5cdH1cblx0XG5cdGNsZWFyKCl7XG5cdFx0dGhpcy5fZXZlbnRJZEVsbS52YWx1ZSA9IFwiXCI7XG5cdFx0dGhpcy5fdG9kb0lkRWxtLnZhbHVlID0gXCJcIjtcblx0XHR0aGlzLl90aXRsZUVsbS52YWx1ZSA9IFwiXCI7XG5cdFx0dGhpcy5fY29udGVudEVsbS52YWx1ZT0gXCJcIjtcblx0XHR3aGlsZSh0aGlzLl9jaGVja2xpc3RBcmVhLmZpcnN0Q2hpbGQpe1xuXHRcdFx0dGhpcy5fY2hlY2tsaXN0QXJlYS5yZW1vdmVDaGlsZCh0aGlzLl9jaGVja2xpc3RBcmVhLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblx0XHR0aGlzLl9jcmVhdGVVc2VySWRFbG0udmFsdWUgPSBcIlwiO1xuXHRcdHRoaXMuX2NyZWF0ZVVzZXJOYW1lRWxtLnZhbHVlID0gXCJcIjtcblx0XHR0aGlzLl9jcmVhdGVEYXRldGltZUVsbS52YWx1ZSA9IFwiXCI7XG5cdFx0dGhpcy5fdXBkYXRlVXNlcklkRWxtLnZhbHVlID0gXCJcIjtcblx0XHR0aGlzLl91cGRhdGVVc2VyTmFtZUVsbS52YWx1ZSA9IFwiXCI7XG5cdFx0dGhpcy5fdXBkYXRlRGF0ZXRpbWVFbG0udmFsdWUgPSBcIlwiO1xuXHRcdHRoaXMuX3JlbWluZGVyTm90aWNlVGltZUVsbS52YWx1ZSA9IFwiXCI7XG5cdFx0dGhpcy5fcmVtaW5kZXJSZXBlYXRFbG0udmFsdWUgPSBcIlwiO1xuXHRcdHRoaXMuX3N0YXJ0RGF0ZUVsbS52YWx1ZSA9IFwiXCI7XG5cdFx0dGhpcy5fc3RhcnRUaW1lRWxtLnZhbHVlID0gXCJcIjtcblx0fVxuXG5cdC8vIOWQhOODnOOCv+ODs+OBruOCpOODmeODs+ODiOOCkuWumue+qeOBmeOCi1xuXHRwcml2YXRlIF9hZGRFdmVudEFkZENoZWNrTGlzdCgpe1xuXHRcdC8vIOi/veWKoOODnOOCv+ODs+OCr+ODquODg+OCr+aZguOBr+OAgeODgeOCp+ODg+OCr+ODnOODg+OCr+OCueimgee0oOOCkui/veWKoOOBmeOCi1xuXHRcdHRoaXMuX2FkZENoZWNrQm94QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRjb25zdCBjbG9uZUNoZWNrSXRlbSA9IDxIVE1MRWxlbWVudD50aGlzLl9jaGVja2xpc3RUZW1wbGF0ZS5jbG9uZU5vZGUodHJ1ZSk7XG5cdFx0XHR0aGlzLl9jaGVja2xpc3RBcmVhLmFwcGVuZENoaWxkKGNsb25lQ2hlY2tJdGVtKTtcblx0XHRcdGNvbnN0IGRlbEJ0biA9IGNsb25lQ2hlY2tJdGVtLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFwiLmRlbGV0ZS1idG4tY2hlY2tsaXN0XCIpO1xuXHRcdFx0aWYoZGVsQnRuID09PSBudWxsKSByZXR1cm47XG5cdFx0XHR0aGlzLl9hcHBseUV2ZW50RGVsZXRlQ2hlY2tJdGVtKGRlbEJ0bik7XG5cdFx0fSwgZmFsc2UpO1xuXHR9XG5cdHByaXZhdGUgX2FkZEV2ZW50U2F2ZSgpe1xuXHRcdC8vIOS/neWtmOODnOOCv+ODs+OCr+ODquODg+OCr+aZguOBr+OAgeePvuWcqOe3qOmbhuS4reOBrlRPRE/jg6rjgrnjg4jjga7lhoXlrrnjgpLjgrXjg7zjg5Djg7zjgavpgIHkv6HjgZfjgabjgIFUT0RP44Oq44K544OI44Gr5Y+N5pig44GV44Gb44KLXG5cdFx0dGhpcy5fc2F2ZVRvZG9CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdHRoaXMuc2VuZFRvZG9Kc29uKCk7XG5cdFx0fSwgZmFsc2UpO1xuXHR9XG5cdHByaXZhdGUgX2FkZEV2ZW50Q2FuY2VsKCl7XG5cdFx0Ly8g44Kt44Oj44Oz44K744Or44Oc44K/44Oz44Kv44Oq44OD44Kv5pmC44Gv44CB54++5Zyo57eo6ZuG5Lit44Gu5YaF5a6544KS56C05qOE44GX44Gm6ZaJ44GY44KLXG5cdFx0dGhpcy5fY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRUT0RPLm1lZGlhdG9yLmNsb3NlVG9kbygpO1xuXHRcdH0sIGZhbHNlKTtcblx0fVxuXHRwdWJsaWMgc2VuZFRvZG9Kc29uKCl7XG5cdFx0Y29uc3QganNvbiA9IHRoaXMuY3JlYXRlSnNvbigpO1xuXHRcdGNvbnN0IHRvZG9JZCA9IGpzb24udG9kb0lkO1xuXHRcdGxldCB1cmwgPSBgL3RvZG9saXN0LyR7anNvbi5ldmVudElkfS9uZXcvc2F2ZWA7XG5cdFx0aWYodG9kb0lkKXtcblx0XHRcdHVybCA9IGAvdG9kb2xpc3QvJHtqc29uLmV2ZW50SWR9LyR7anNvbi50b2RvSWR9L3NhdmVgO1xuXHRcdH1cblx0XHQvLyBUT0RPLm1lZGlhdG9yLnNhdmVUb2RvKHVybCwgSlNPTi5zdHJpbmdpZnkoanNvbikpO1xuXG5cdFx0Y29uc29sZS5sb2coanNvbik7XG5cdFx0Y29uc3QgY3NyZkhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTE1ldGFFbGVtZW50PignbWV0YVtuYW1lPVwiX2NzcmZfaGVhZGVyXCJdJyk/LmNvbnRlbnQgfHwgXCJcIjtcblx0XHRjb25zdCB0b2tlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTE1ldGFFbGVtZW50PignbWV0YVtuYW1lPVwiX2NzcmZcIl0nKT8uY29udGVudCB8fCBcIlwiO1xuXHRcdFxuXHRcdFRPRE8ubWVkaWF0b3IucXVldWVQdWJsaXNoZXJUb2RvKGpzb24uZXZlbnRJZCwganNvbi50b2RvSWQpO1xuXHRcdGZldGNoKHVybCx7XG5cdC8vXHRcdFx0Y3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcblx0XHRcdG1ldGhvZDogXCJQT1NUXCIsXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFwiY2hhcnNldFwiXHRcdDogXCJVVEYtOFwiLFxuXHRcdFx0XHRcIkNvbnRlbnQtVHlwZVwiXHQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxuXHRcdFx0XHRbY3NyZkhlYWRlcl1cdDogdG9rZW4sXG5cdFx0XHR9LFxuXHRcdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkoanNvbilcblx0XHR9KS50aGVuKChyZXMpPT57XG5cdFx0XHRpZighcmVzLm9rKXtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGAke3Jlcy5zdGF0dXN9JHtyZXMuc3RhdHVzVGV4dH1gKTtcblx0XHRcdH1cblx0XHRcdGNvbnNvbGUubG9nKHJlcyk7XG5cdFx0XHRyZXR1cm4gcmVzLmpzb24oKTtcblx0XHR9KS50aGVuKChkYXRhKT0+e1xuXHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XG5cdFx0XHRUT0RPLm1lZGlhdG9yLnJlcXVlc3RQdWJsaXNoVG9kbygpO1xuXHRcdFx0VE9ETy5tZWRpYXRvci5wdXNoTWVzc2FnZShgJHtkYXRhLm1lc3NhZ2V9YCwgMTAwMDApO1xuXHRcdH0pLmNhdGNoKChyZWFzb24pPT57XG5cdFx0XHRjb25zb2xlLmxvZyhyZWFzb24pO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly8g44OB44Kn44OD44Kv44Ki44Kk44OG44Og5qiq44Gr44GC44KL44CB5YmK6Zmk44Oc44K/44Oz44Gu44Kk44OZ44Oz44OI44KS5a6a576p44GZ44KLXG5cdHByaXZhdGUgX2FkZEV2ZW50RGVsZXRlQ2hlY2tJdGVtQnRuKCl7XG5cdFx0Y29uc3QgY2hlY2tJdGVtRGVsZXRlQnRucyA9IHRoaXMuX2NoZWNrbGlzdEFyZWEucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oXCIuZGVsZXRlLWJ0bi1jaGVja2xpc3RcIik7XG5cdFx0Zm9yKGxldCBidG4gb2YgY2hlY2tJdGVtRGVsZXRlQnRucyl7XG5cdFx0XHR0aGlzLl9hcHBseUV2ZW50RGVsZXRlQ2hlY2tJdGVtKGJ0bik7XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgX2FwcGx5RXZlbnREZWxldGVDaGVja0l0ZW0oZWxtOiBIVE1MRWxlbWVudCl7XG5cdFx0ZWxtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRsZXQgZGVsRWxtID0gPEhUTUxFbGVtZW50PnV0aWwuZmluZFBhcmVudChlbG0sIFwibGlcIik7XG5cdFx0XHRpZihkZWxFbG0gPT09IG51bGwpIHJldHVybjtcblx0XHRcdGRlbEVsbS5yZW1vdmUoKTtcblx0XHR9LCBmYWxzZSk7XG5cdH1cblx0XG5cdC8vIOODgeOCp+ODg+OCr+ODquOCueODiOOBruODhuODs+ODl+ODrOODvOODiOimgee0oOOCkuS9nOaIkOOBmeOCi1xuXHRjcmVhdGVUZW1wbGF0ZUNoZWNrSXRlbSgpOiBIVE1MRWxlbWVudHtcblx0XHRjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblx0XHRjb25zdCBoaWRzZXEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cdFx0aGlkc2VxLnR5cGUgPSBcImhpZGRlblwiO1xuXHRcdGhpZHNlcS5jbGFzc0xpc3QuYWRkKFwiY2hlY2tsaXN0XCIpO1xuXHRcdGhpZHNlcS5jbGFzc0xpc3QuYWRkKFwic2VxXCIpO1xuXHRcdGNvbnN0IGxhYmVsMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcblx0XHRjb25zdCBsYWJlbDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG5cdFx0Y29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlxcclxcblwiKTtcblx0XHRjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cdFx0c3Bhbi5jbGFzc0xpc3QuYWRkKFwibGFiZWxcIik7XG5cdFx0Y29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cdFx0Y2hlY2tib3gudHlwZSA9IFwiY2hlY2tib3hcIjtcblx0XHRjaGVja2JveC5jbGFzc0xpc3QuYWRkKFwiY2hlY2tsaXN0XCIpO1xuXHRcdGNoZWNrYm94LmNsYXNzTGlzdC5hZGQoXCJjaGVja2JveFwiKTtcblx0XHRjaGVja2JveC5jbGFzc0xpc3QuYWRkKFwic3RhdHVzXCIpO1xuXHRcdGNvbnN0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cdFx0dGV4dC50eXBlPVwidGV4dFwiO1xuXHRcdHRleHQuY2xhc3NMaXN0LmFkZChcImNoZWNrbGlzdFwiKTtcblx0XHR0ZXh0LmNsYXNzTGlzdC5hZGQoXCJ0ZXh0XCIpO1xuXHRcdHRleHQucGxhY2Vob2xkZXIgPSBcIuKXr+KXr+OCkuiyt+OBhuOAglwiO1xuXHRcdGNvbnN0IGRlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0ZGVsQnRuLnR5cGU9XCJidXR0b25cIjtcblx0XHRkZWxCdG4uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS1idG4tY2hlY2tsaXN0XCIpO1xuXHRcdGRlbEJ0bi5pbm5lclRleHQgPSBcIsOXXCI7XG5cdFx0bGFiZWwxLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcblx0XHRsYWJlbDIuYXBwZW5kQ2hpbGQoc3Bhbik7XG5cdFx0bGFiZWwyLmFwcGVuZENoaWxkKHRleHQpO1xuXHRcdGxhYmVsMi5hcHBlbmRDaGlsZCh0ZXh0Tm9kZS5jbG9uZU5vZGUodHJ1ZSkpO1xuXHRcdGxhYmVsMi5hcHBlbmRDaGlsZChkZWxCdG4pO1xuXHRcdGxpLmFwcGVuZENoaWxkKGhpZHNlcSk7XG5cdFx0bGkuYXBwZW5kQ2hpbGQobGFiZWwxKTtcblx0XHRsaS5hcHBlbmRDaGlsZCh0ZXh0Tm9kZS5jbG9uZU5vZGUodHJ1ZSkpO1xuXHRcdGxpLmFwcGVuZENoaWxkKGxhYmVsMik7XG5cdFx0cmV0dXJuIGxpO1xuXHR9XG5cdHB1YmxpYyBjcmVhdGVKc29uKCk6IElUb2RvRGF0YXtcblx0XHRjb25zdCBqc29uOklUb2RvRGF0YSA9IHtcblx0XHRcdGV2ZW50SWQ6XHR0aGlzLl9ldmVudElkRWxtLnZhbHVlLFxuXHRcdFx0dG9kb0lkOlx0XHR0aGlzLl90b2RvSWRFbG0udmFsdWUsXG5cdFx0XHR0aXRsZTpcdFx0dGhpcy5fdGl0bGVFbG0udmFsdWUsXG5cdFx0XHRjb250ZW50Olx0dGhpcy5fY29udGVudEVsbS52YWx1ZSxcblx0XHRcdGNoZWNrTGlzdDpcdHRoaXMuY29sbGVjdENoZWNrSXRlbXModGhpcy5fYXJlYUVsbSksXG5cdFx0XHR0b2RvU3RhcnREYXRlOnRoaXMuX3N0YXJ0RGF0ZUVsbS52YWx1ZSxcblx0XHRcdHRvZG9TdGFydFRpbWU6dGhpcy5fc3RhcnRUaW1lRWxtLnZhbHVlLFxuXHRcdFx0dG9kb0VuZERhdGVUaW1lOiBcIlwiLCAvLyBUT0RPOuacquWun+ijhVxuXHRcdFx0cmVtaW5kZXJSZXBlYXQ6IHRoaXMuX3JlbWluZGVyUmVwZWF0RWxtLnZhbHVlLFxuXHRcdFx0cmVtaW5kZXJOb3RpY2VUaW1lOiB0aGlzLl9yZW1pbmRlck5vdGljZVRpbWVFbG0udmFsdWUsXG5cdFx0XHRjcmVhdGVVc2VySWQ6IHRoaXMuX2NyZWF0ZVVzZXJJZEVsbS52YWx1ZSxcblx0XHRcdGNyZWF0ZVVzZXJOYW1lOiB0aGlzLl9jcmVhdGVVc2VyTmFtZUVsbS52YWx1ZSxcblx0XHRcdGNyZWF0ZURhdGV0aW1lOiB0aGlzLl9jcmVhdGVEYXRldGltZUVsbS52YWx1ZSxcblx0XHRcdHVwZGF0ZVVzZXJJZDogdGhpcy5fdXBkYXRlVXNlcklkRWxtLnZhbHVlLFxuXHRcdFx0dXBkYXRlVXNlck5hbWU6IHRoaXMuX3VwZGF0ZVVzZXJOYW1lRWxtLnZhbHVlLFxuXHRcdFx0dXBkYXRlRGF0ZXRpbWU6IHRoaXMuX3VwZGF0ZURhdGV0aW1lRWxtLnZhbHVlXG5cdFx0fTtcblx0XHRyZXR1cm4ganNvbjtcblx0fVxuXHQvLyDjg4Hjgqfjg4Pjgq/jg6rjgrnjg4jjga7phY3liJfjgpLov5TjgZnjgILphY3liJflhoXjga7opoHntKDjga9Kc29u5b2i5byPXG5cdGNvbGxlY3RDaGVja0l0ZW1zKHRvZG9BcmVhOiBIVE1MRWxlbWVudCk6IEFycmF5PElDaGVja0l0ZW1EYXRhPntcblx0XHRpZih0b2RvQXJlYSA9PT0gbnVsbCkgcmV0dXJuIG5ldyBBcnJheTxJQ2hlY2tJdGVtRGF0YT4oKTtcblx0XHRjb25zdCBjaGVja2xpc3QgPSB0b2RvQXJlYS5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihcInVsLmNoZWNrbGlzdCBsaVwiKTtcblx0XHRsZXQgbWF4U2VxID0gMDtcblx0XHRjb25zdCBqc29ucyA9IG5ldyBBcnJheTxJQ2hlY2tJdGVtRGF0YT4oKTtcblx0XHRjb25zdCBuZXdDaGVja0l0ZW1zID0gbmV3IEFycmF5PEhUTUxFbGVtZW50PigpO1xuXG5cdFx0Ly8g5YWo44OB44Kn44OD44Kv44Oq44K544OI44Gu5Yem55CGXG5cdFx0Zm9yKGxldCBjaGVja0l0ZW0gb2YgY2hlY2tsaXN0KXtcblx0XHRcdGNvbnN0IGNoZWNrSXRlbUV2ZW50SWQgPSB0b2RvQXJlYS5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiLmV2ZW50LWlkXCIpPy52YWx1ZSB8fCBcIlwiO1xuXHRcdFx0Y29uc3QgY2hlY2tJdGVtVG9kb0lkID0gdG9kb0FyZWEucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIi50b2RvLWlkXCIpPy52YWx1ZSB8fCBcIlwiO1xuXHRcdFx0Y29uc3QgY2hlY2tJdGVtU3RhdHVzID0gY2hlY2tJdGVtLnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIuY2hlY2tsaXN0LmNoZWNrYm94LnN0YXR1c1wiKT8udmFsdWUgfHwgXCJcIjtcblx0XHRcdGNvbnN0IGNoZWNrSXRlbUNvbnRlbnQgPSBjaGVja0l0ZW0ucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIi5jaGVja2xpc3QudGV4dFwiKT8udmFsdWUgfHwgXCJcIjtcblxuXHRcdFx0Y29uc3QgY2hlY2tJdGVtU2VxID0gY2hlY2tJdGVtLnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIuY2hlY2tsaXN0LnNlcVwiKT8udmFsdWUgfHwgXCJcIjtcblx0XHRcdC8vIOaWsOimj+OBp+S9nOaIkOOBleOCjOOBn+ODgeOCp+ODg+OCr+ODquOCueODiOOBr+OAgeW+jOOBp+WHpueQhuOBmeOCi+OBn+OCgeOBrumFjeWIl+OBq+WFpeOCjOOBpuOBiuOBj1xuXHRcdFx0aWYoIWNoZWNrSXRlbVNlcSl7XG5cdFx0XHRcdG5ld0NoZWNrSXRlbXMucHVzaChjaGVja0l0ZW0pO1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IG51bUNoZWNrSXRlbVNlcSA9IHBhcnNlSW50KGNoZWNrSXRlbVNlcSk7XG5cdFx0XHRpZihtYXhTZXEgPCBudW1DaGVja0l0ZW1TZXEpe1xuXHRcdFx0XHRtYXhTZXEgPSBudW1DaGVja0l0ZW1TZXE7XG5cdFx0XHR9XG5cdFx0XHRqc29ucy5wdXNoKHtcblx0XHRcdFx0ZXZlbnRJZDogY2hlY2tJdGVtRXZlbnRJZCxcblx0XHRcdFx0dG9kb0lkOiBjaGVja0l0ZW1Ub2RvSWQsXG5cdFx0XHRcdHNlcTogbnVtQ2hlY2tJdGVtU2VxLFxuXHRcdFx0XHRjb21wbGV0ZWQ6IFN0cmluZyhjaGVja0l0ZW1TdGF0dXMpPT09XCJvblwiID8gXCJ0cnVlXCIgOiBcImZhbHNlXCIsXG5cdFx0XHRcdGNvbnRlbnQ6IGNoZWNrSXRlbUNvbnRlbnRcblx0XHRcdH0pO1xuXHRcdH1cblx0XHQvLyDmlrDjgZfjgY/nlJ/miJDjgZXjgozjgZ/jg4Hjgqfjg4Pjgq/jg6rjgrnjg4jjga7lh6bnkIZcblx0XHRmb3IobGV0IG5ld0NoZWNrSXRlbSBvZiBuZXdDaGVja0l0ZW1zKXtcblx0XHRcdGNvbnN0IGNoZWNrSXRlbUV2ZW50SWQgPSB0b2RvQXJlYS5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiLmV2ZW50LWlkXCIpPy52YWx1ZSB8fCBcIlwiO1xuXHRcdFx0Y29uc3QgY2hlY2tJdGVtVG9kb0lkID0gdG9kb0FyZWEucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIi50b2RvLWlkXCIpPy52YWx1ZSB8fCBcIlwiO1xuXHRcdFx0Y29uc3QgY2hlY2tJdGVtU2VxID0gKyttYXhTZXE7XG5cdFx0XHRjb25zdCBjaGVja0l0ZW1TdGF0dXMgPSBuZXdDaGVja0l0ZW0ucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIi5jaGVja2xpc3QuY2hlY2tib3guc3RhdHVzXCIpPy5jaGVja2VkIHx8IGZhbHNlO1xuXHRcdFx0Y29uc3QgY2hlY2tJdGVtQ29udGVudCA9IG5ld0NoZWNrSXRlbS5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiLmNoZWNrbGlzdC50ZXh0XCIpPy52YWx1ZSB8fCBcIlwiO1xuXHRcdFx0anNvbnMucHVzaCh7XG5cdFx0XHRcdGV2ZW50SWQ6IGNoZWNrSXRlbUV2ZW50SWQsXG5cdFx0XHRcdHRvZG9JZDogY2hlY2tJdGVtVG9kb0lkLFxuXHRcdFx0XHRzZXE6IGNoZWNrSXRlbVNlcSxcblx0XHRcdFx0Y29tcGxldGVkOiBTdHJpbmcoY2hlY2tJdGVtU3RhdHVzKT09PVwib25cIiA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiLFxuXHRcdFx0XHRjb250ZW50OiBjaGVja0l0ZW1Db250ZW50XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0cmV0dXJuIGpzb25zO1xuXHR9XG5cdHB1YmxpYyBpc05ldygpOiBib29sZWFue1xuXHRcdHJldHVybiAhKHRoaXMuX3RvZG9JZEVsbS52YWx1ZSk7XG5cdH1cbn1cbiIsImltcG9ydCB7IE1lc3NlbmdlciB9IGZyb20gXCIuLi9NZXNzZW5nZXJcIjtcbmltcG9ydCB7IFlibVdlYlNvY2tldCB9IGZyb20gXCIuLi9ZYm1XZWJTb2NrZXRcIjtcbmltcG9ydCB7IEVkaXRUb2RvLCBJRWRpdFRvZG9BZHAgfSBmcm9tIFwiLi9FZGl0VG9kb1wiO1xuaW1wb3J0IHsgSVRvZG9EYXRhIH0gZnJvbSBcIi4vSVRvZG9EYXRhXCI7XG5pbXBvcnQgeyBJVG9kb1ZpZXdBZHAsIFRvZG9WaWV3IH0gZnJvbSBcIi4vVG9kb1ZpZXdcIjtcblxuaW50ZXJmYWNlIFF1ZXVlUHVibGlzaGVyVG9kbyB7XG5cdGV2ZW50SWQ6IHN0cmluZztcblx0dG9kb0lkOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBUb2RvTWVkaWF0b3IgaW1wbGVtZW50cyBJVG9kb1ZpZXdBZHAsIElFZGl0VG9kb0FkcHtcblxuXHRfdG9kb1ZpZXc6IFRvZG9WaWV3O1xuXHRfZWRpdFRvZG86IEVkaXRUb2RvO1xuXG5cdF93czogWWJtV2ViU29ja2V0O1xuXHRfbXNncjogTWVzc2VuZ2VyO1xuXG5cdF9xdWV1ZVB1Ymxpc2hUb2RvOiBBcnJheTxRdWV1ZVB1Ymxpc2hlclRvZG8+O1xuXG5cdGNvbnN0cnVjdG9yKHRvZG9WaWV3OlRvZG9WaWV3LCBlZGl0VG9kbzpFZGl0VG9kbyxcblx0XHRcdFx0eWJtV2ViU29ja2V0OiBZYm1XZWJTb2NrZXQsIG1lc3NlbmdlcjogTWVzc2VuZ2VyKXtcblx0XHR0aGlzLl90b2RvVmlldyA9IHRvZG9WaWV3O1xuXHRcdHRoaXMuX2VkaXRUb2RvID0gZWRpdFRvZG87XG5cdFx0dGhpcy5fd3MgPSB5Ym1XZWJTb2NrZXQ7XG5cdFx0dGhpcy5fbXNnciA9IG1lc3Nlbmdlcjtcblx0XHR0aGlzLl9xdWV1ZVB1Ymxpc2hUb2RvID0gW107XG5cdH1cblxuXHRwdWJsaWMgY29ubmVjdFdlYlNvY2tldChldmVudElkOiBzdHJpbmcpe1xuXHRcdC8vIOOCs+ODvOODq+ODkOODg+OCr+mWouaVsOOCkuOBneOBruOBvuOBvua4oeOBl+OBpuOBl+OBvuOBhuOBqOOAgemWouaVsOWGheOBrnRoaXPjga7lj4LnhafjgYx1bmRlZmluZWTjgavjgarjgaPjgabjgZfjgb7jgYZcblx0XHQvLyDjgqLjg63jg7zplqLmlbDjgpLkvb/jgaPjgabjgIHpnZnnmoTjgat0aGlz44KS5rG65a6a44GV44Gb44KL44CCXG5cdFx0dGhpcy5fd3MuY29ubmVjdFdlYlNvY2tldChgL3N1Yi90b2RvbGlzdC8ke2V2ZW50SWR9YCwgKGRhdGE6IGFueSkgPT4ge1xuXHRcdFx0dGhpcy5fdG9kb1ZpZXcucmVjZWl2ZVVwZGF0ZWRUb2RvKGRhdGEpO1xuXHRcdH0pO1xuXHRcdFxuXHR9XG5cdHB1YmxpYyBkaXNjb25uZWN0V2ViU29ja2V0KCl7XG5cdFx0dGhpcy5fd3MuZGlzY29ubmVjdFdlYlNvY2tldCgpO1xuXHR9XG5cdHB1YmxpYyBvcGVuVG9kbyhlbG06IEVsZW1lbnQgfCB1bmRlZmluZWQpe1xuXHRcdHRoaXMuX2VkaXRUb2RvLnNldFVwRWRpdENhcmQoZWxtKTtcblx0XHR0aGlzLl90b2RvVmlldy5vcGVuVG9kbygpO1xuXHR9XG5cdHB1YmxpYyBjbG9zZVRvZG8oKXtcblx0XHR0aGlzLl9lZGl0VG9kby5jbGVhcigpO1xuXHRcdHRoaXMuX3RvZG9WaWV3LmNsb3NlVG9kbygpO1xuXHR9XG5cdHB1YmxpYyBpc0VkaXRpbmcoKXtcblx0XHRyZXR1cm4gdGhpcy5fdG9kb1ZpZXcuaXNFZGl0aW5nKCk7XG5cdH1cblx0cHVibGljIGNvcHlFZGl0VG9kbyhlbG06IEVsZW1lbnQpe1xuXHRcdHRoaXMuX2VkaXRUb2RvLmNvcHlUb0VkaXRDYXJkKGVsbSk7XG5cdH1cblx0cHVibGljIHNhdmVUb2RvKHVybDogc3RyaW5nLCBzdHJpbmdpZmllZEpzb246IHN0cmluZyl7XG5cdFx0dGhpcy5fd3Muc2VuZCh1cmwsIHN0cmluZ2lmaWVkSnNvbik7XG5cdH1cblxuXHRwdWJsaWMgcXVldWVQdWJsaXNoZXJUb2RvKGV2ZW50SWQ6c3RyaW5nLCB0b2RvSWQ6IHN0cmluZyl7XG5cdFx0dGhpcy5fcXVldWVQdWJsaXNoVG9kby5wdXNoKHtldmVudElkLCB0b2RvSWR9KTtcblx0fVxuXHRwdWJsaWMgcmVxdWVzdFB1Ymxpc2hUb2RvKCl7XG5cdFx0Y29uc3QgcHVibGlzaFRvZG8gPSB0aGlzLl9xdWV1ZVB1Ymxpc2hUb2RvLnBvcCgpO1xuXHRcdGlmKCFwdWJsaXNoVG9kbykgcmV0dXJuO1xuXHRcdGlmKCFwdWJsaXNoVG9kby5ldmVudElkIHx8ICFwdWJsaXNoVG9kby50b2RvSWQpIHJldHVybjtcblx0XHR0aGlzLl93cy5zZW5kKGAvcHViL3RvZG9saXN0LyR7cHVibGlzaFRvZG8uZXZlbnRJZH0vJHtwdWJsaXNoVG9kby50b2RvSWR9L3B1Ymxpc2hgLCBcIlwiKTtcblx0fVxuXHRwdWJsaWMgcHVzaE1lc3NhZ2UobWVzc2FnZTogc3RyaW5nLCBleHBpcmVUaW1lOiBudW1iZXIpOiB2b2lke1xuXHRcdHRoaXMuX21zZ3IucHVzaE1lc3NhZ2UobWVzc2FnZSwgZXhwaXJlVGltZSk7XG5cdH1cbn1cbiIsImltcG9ydCB7IE1lc3NlbmdlciB9IGZyb20gXCIuLi9NZXNzZW5nZXJcIjtcbmltcG9ydCB7IFlibVdlYlNvY2tldCB9IGZyb20gXCIuLi9ZYm1XZWJTb2NrZXRcIjtcbmltcG9ydCB7IEVkaXRUb2RvIH0gZnJvbSBcIi4vRWRpdFRvZG9cIjtcbmltcG9ydCB7IElUb2RvRGF0YSB9IGZyb20gXCIuL0lUb2RvRGF0YVwiO1xuaW1wb3J0IHsgVG9kb2xpc3QgfSBmcm9tIFwiLi9Ub2RvbGlzdFwiO1xuaW1wb3J0IHsgVG9kb01lZGlhdG9yIH0gZnJvbSBcIi4vVG9kb01lZGlhdG9yXCI7XG5cbi8qKlxuICpET03opoHntKDjgYzoqq3jgb/ovrzjgb/lrozkuobjgaDjgaPjgZ/jgolPS+OBquWHpueQhlxuICovXG4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsZnVuY3Rpb24oKXtcblx0bmV3IFRPRE8oKTtcbn0sIGZhbHNlKTtcblxuZXhwb3J0IGNsYXNzIFRPRE8ge1xuXG5cdHB1YmxpYyBzdGF0aWMgbWVkaWF0b3I6VG9kb01lZGlhdG9yO1xuXG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0Y29uc3QgdG9kb1ZpZXcgPSBuZXcgVG9kb1ZpZXcoKTtcblx0XHRjb25zdCBlZGl0VG9kbyA9IG5ldyBFZGl0VG9kbygpO1xuXHRcdC8vIGV2ZW50SWTjga7mloflrZfliJfpg6jliIbjga/jgIHjgYTjgaXjgoznlLvpnaLjgYvjgonlj5blvpfjgZfjgZ/jgYRcblx0XHRjb25zdCB3ZWJTb2NrZXQgPSBuZXcgWWJtV2ViU29ja2V0KFwiL3dzLXN0b21wXCIpO1xuXHRcdGNvbnN0IG1lc3NlbmdlciA9IG5ldyBNZXNzZW5nZXIoKTtcblx0XHRUT0RPLm1lZGlhdG9yID0gbmV3IFRvZG9NZWRpYXRvcih0b2RvVmlldywgZWRpdFRvZG8sIHdlYlNvY2tldCwgbWVzc2VuZ2VyKTtcblxuXHRcdGNvbnN0IGV2ZW50SWRFbG0gPSA8SFRNTFNlbGVjdEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaG9vc2UtZXZlbnRcIik7XG5cdFx0aWYoZXZlbnRJZEVsbS52YWx1ZSl7XG5cdFx0XHRUT0RPLm1lZGlhdG9yLmNvbm5lY3RXZWJTb2NrZXQoZXZlbnRJZEVsbS52YWx1ZSk7XG5cdFx0fWVsc2V7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYOOCpOODmeODs+ODiElE44GM5Y+W5b6X44Gn44GN44Gq44GE44Gf44KB44CBU1RPTVDpgJrkv6HjgpLplovlp4vjgafjgY3jgb7jgZvjgpPjgIJbZXZlbnRJZDogJHtldmVudElkRWxtLnZhbHVlfV1gKTtcblx0XHR9XG5cdH1cbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIElUb2RvVmlld0FkcCB7XG5cblx0b3BlblRvZG8oZWxtOkhUTUxFbGVtZW50KTp2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgVG9kb1ZpZXcge1xuXG5cdF90b2RvQXJlYTogSFRNTEVsZW1lbnQ7XG5cdF9idG5PcGVuTmV3VG9kbzogSFRNTEVsZW1lbnQ7XG5cdF9lZGl0VG9kb0FyZWE6IEhUTUxFbGVtZW50O1xuXHRfZmlsdGVyOiBIVE1MRWxlbWVudDtcblx0X3RvZG9saXN0OiBUb2RvbGlzdDtcblx0X2VkaXRpbmc6IGJvb2xlYW47XG5cblx0Y29uc3RydWN0b3IoKXtcblx0XHR0aGlzLl90b2RvQXJlYSA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9saXN0LWNvbnRhaW5lclwiKTtcblx0XHR0aGlzLl9idG5PcGVuTmV3VG9kbyA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bi1vcGVuLW5ldy10b2RvXCIpO1xuXHRcdHRoaXMuX2VkaXRUb2RvQXJlYSA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXQtdG9kby1hcmVhXCIpO1xuXHRcdHRoaXMuX2ZpbHRlciA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXQtdG9kby1maWx0ZXJcIik7XG5cdFx0dGhpcy5fZWRpdGluZyA9IGZhbHNlO1xuXG5cdFx0dGhpcy5fdG9kb2xpc3QgPSBuZXcgVG9kb2xpc3QodGhpcy5fdG9kb0FyZWEsIHRoaXMuY3JlYXRlVG9kb0NhcmRUZW1wbGF0ZSgpKTtcblx0XHR0aGlzLmFkZEV2ZW50T3Blbk5ld1RvZG8oKTtcblx0XHR0aGlzLmFkZEV2ZW50T3BlbkVkaXRUb2RvKCk7XG5cdFx0dGhpcy5hZGRFdmVudENoYW5nZUV2ZW50KCk7XG5cdFx0dGhpcy5zdG9wUHJvcGFnYXRpb24oKTtcblx0fVxuXG5cdC8vIC0tLS0tIFRPRE/nlLvpnaLjga5UT0RP44Kr44O844OJ44Gu44OG44Oz44OX44Os44O844OIXG5cdHByaXZhdGUgY3JlYXRlVG9kb0NhcmRUZW1wbGF0ZSgpOkhUTUxFbGVtZW50e1xuXHRcdGNvbnN0IGVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0cmV0dXJuIGVsbTtcblx0fVxuXHRcblx0Ly8gLS0tLS0g5paw6KaPVE9ET+S9nOaIkCDlkajjgorjga7jgqTjg5njg7Pjg4jjgpLlrprnvqlcblx0cHJpdmF0ZSBhZGRFdmVudE9wZW5OZXdUb2RvKCk6dm9pZHtcblx0XHR0aGlzLl9idG5PcGVuTmV3VG9kby5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0VE9ETy5tZWRpYXRvci5vcGVuVG9kbyh1bmRlZmluZWQpO1xuXHRcdH0sIGZhbHNlKTtcblx0fVxuXG5cdC8vIC0tLS0tIFRPRE/mm7TmlrAg5ZGo44KK44Gu44Kk44OZ44Oz44OI44KS5a6a576pXG5cdHByaXZhdGUgYWRkRXZlbnRPcGVuRWRpdFRvZG8oKTp2b2lke1xuXHRcdGZvcihsZXQgZWxtIG9mIHRoaXMuX3RvZG9saXN0LmdldFRvZG9saXN0KCkpe1xuXHRcdFx0ZWxtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRcdFRPRE8ubWVkaWF0b3Iub3BlblRvZG8oZWxtKTtcblx0XHRcdH0sIGZhbHNlKTtcblx0XHR9XG5cdH1cblxuXHQvLyAtLS0tLSDjgqTjg5njg7Pjg4jjga7lpInmm7TjgpLmpJznn6Vcblx0cHJpdmF0ZSBhZGRFdmVudENoYW5nZUV2ZW50KCl7XG5cdFx0Y29uc3Qgc2VsZWN0RXZlbnRJZEVsbSA9IDxIVE1MU2VsZWN0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNob29zZS1ldmVudFwiKTtcblx0XHRzZWxlY3RFdmVudElkRWxtLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24oKXtcblx0XHRcdFRPRE8ubWVkaWF0b3IuZGlzY29ubmVjdFdlYlNvY2tldCgpO1xuXHRcdFx0VE9ETy5tZWRpYXRvci5jb25uZWN0V2ViU29ja2V0KHRoaXMudmFsdWUpO1xuXHRcdFx0Ly8gVE9ETyDku4rjga5Ub2RvbGlzdOaDheWgseOCkuOAgeOBneOBruOCpOODmeODs+ODiOOCiOOBhuOBq+a0l+abv+OBmeOCi+WHpueQhlxuXHRcdH0sIGZhbHNlKTtcblx0fVxuXG5cdC8vIC0tLS0tIFRPRE/jga7jgqrjg7zjg5fjg7Mv44Kv44Ot44O844K6XG5cdHB1YmxpYyBvcGVuVG9kbygpOnZvaWR7XG5cdFx0dGhpcy5fZmlsdGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG5cdFx0dGhpcy5fZWRpdFRvZG9BcmVhLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG5cdFx0dGhpcy5fZWRpdGluZyA9IHRydWU7XG5cdH1cblx0cHVibGljIGNsb3NlVG9kbygpOiB2b2lke1xuXHRcdHRoaXMuX2ZpbHRlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuXHRcdHRoaXMuX2VkaXRUb2RvQXJlYS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuXHRcdHRoaXMuX2VkaXRpbmcgPSBmYWxzZTtcblx0fVxuXG5cdC8vIC0tLS0tIOOCpOODmeODs+ODiOWItuW+oVxuXHRwcml2YXRlIHN0b3BQcm9wYWdhdGlvbigpe1xuXG5cdFx0bGV0IHN0b3BTZWxlY3RvcnMgPSBbXCIudG9kby1ib3ggLnNlbGVjdC5yZW1pbmRlci1ub3RpY2UtdGltZVwiLFxuXHRcdFx0XHRcdFx0XHRcIi50b2RvLWJveCAuc2VsZWN0LnJlbWluZGVyLXJlcGVhdFwiLFxuXHRcdFx0XHRcdFx0XHRcIi50b2RvLWJveCAuY2hlY2tsaXN0IGxpXCIsXG5cdFx0XHRcdFx0XHRcdFwiLmJ0bi1zYXZlLXRvZG9saXN0XCIsXG5cdFx0XHRcdFx0XHRcdFwiLnRvZG8tYm94IC50b2RvLWNvbnRyb2xlXCJdO1xuXHRcdGNvbnN0IHN0b3BFbG1BcnlzID0gc3RvcFNlbGVjdG9ycy5tYXAoc2VsZWN0b3IgPT4ge1xuXHRcdFx0cmV0dXJuIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oc2VsZWN0b3IpKTtcblx0XHR9KTtcblx0XHRjb25zdCBzdG9wRWxtcyA9IHN0b3BFbG1BcnlzLmZsYXQoKTtcblx0XHRmb3IobGV0IGVsbSBvZiBzdG9wRWxtcyl7XG5cdFx0XHR0aGlzLnN0b3BDbGlja1Byb3BhZ2F0aW9uKGVsbSk7XG5cdFx0fVxuXHR9XG5cdC8vIFRPRE8gYW5544Gv44KE44KB44Gf44GEXG5cdHJlY2VpdmVVcGRhdGVkVG9kbyhkYXRhOiBhbnkpe1xuXHRcdGNvbnNvbGUubG9nKFwid2ViIHNvY2tldOaIkOWKn1wiKTtcblx0XHRjb25zb2xlLmxvZyhkYXRhKTtcblx0XHRjb25zdCB0b2RvOiBJVG9kb0RhdGEgPSBKU09OLnBhcnNlKGRhdGEuYm9keSk7XG5cdFx0aWYodGhpcy5fdG9kb2xpc3QuY29udGFpbnModG9kby50b2RvSWQpKXtcblx0XHRcdHRoaXMuX3RvZG9saXN0LnVwZGF0ZVRvZG9DYXJkKHRvZG8pO1xuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5fdG9kb2xpc3QuY3JlYXRlVG9kb0NhcmQodG9kbyk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBzdG9wQ2xpY2tQcm9wYWdhdGlvbihlbG06IEhUTUxFbGVtZW50KXtcblx0XHRpZighZWxtKXtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0ZWxtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKXtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0fSwgZmFsc2UpO1xuXHR9XG5cdHB1YmxpYyBpc0VkaXRpbmcoKTogYm9vbGVhbntcblx0XHRyZXR1cm4gdGhpcy5fZWRpdGluZztcblx0fVxuXG59XG5cbiIsImltcG9ydCB7IElUb2RvRGF0YSB9IGZyb20gXCIuL0lUb2RvRGF0YVwiO1xuaW1wb3J0IHsgVE9ETyB9IGZyb20gXCIuL1RvZG9WaWV3XCI7XG5cbmV4cG9ydCBjbGFzcyBUb2RvbGlzdCB7XG5cbiAgICBfdG9kb0FyZWE6IEhUTUxFbGVtZW50O1xuICAgIF9jYXJkVGVtcGxhdGU6IEhUTUxFbGVtZW50O1xuICAgIF9saXN0OiBIVE1MQ29sbGVjdGlvbjtcbiAgICBfbWFwOiBNYXA8c3RyaW5nLCBFbGVtZW50PjtcblxuXHRjb25zdHJ1Y3Rvcih0b2RvQXJlYTogSFRNTEVsZW1lbnQsIGNhcmRUZW1wbGF0ZTogSFRNTEVsZW1lbnQpe1xuXHRcdHRoaXMuX3RvZG9BcmVhID0gdG9kb0FyZWE7XG5cdFx0dGhpcy5fY2FyZFRlbXBsYXRlID0gY2FyZFRlbXBsYXRlO1xuXG5cdFx0dGhpcy5fbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0b2RvLWJveFwiKTtcblx0XHR0aGlzLl9tYXAgPSBuZXcgTWFwKCk7XG5cdFx0Zm9yKGxldCBpID0gMCwgaWxlbiA9IHRoaXMuX2xpc3QubGVuZ3RoOyBpIDwgaWxlbjsgaSsrKXtcbiAgICAgICAgICAgIGxldCB0b2RvSWRFbG06IEhUTUxJbnB1dEVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLl9saXN0W2ldLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0b2RvLWlkXCIpWzBdO1xuICAgICAgICAgICAgaWYodG9kb0lkRWxtKXtcbiAgICAgICAgICAgICAgICBsZXQgdG9kb0lkID0gdG9kb0lkRWxtLnZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX21hcC5zZXQodG9kb0lkLCB0aGlzLl9saXN0W2ldKTtcbiAgICAgICAgICAgIH1cblx0XHR9XG5cdH1cblx0cHVibGljIGNvbnRhaW5zKHRvZG9JZDogc3RyaW5nKTogYm9vbGVhbntcblx0XHRpZighdG9kb0lkKSByZXR1cm4gZmFsc2U7XG5cdFx0cmV0dXJuIHRoaXMuX21hcC5oYXModG9kb0lkKTtcblx0fVxuXG5cdHB1YmxpYyByZWZsZWN0VG9kbyh0b2RvQ2FyZDogSFRNTEVsZW1lbnQsIHRvZG86IElUb2RvRGF0YSl7XG5cdFx0KDxIVE1MSW5wdXRFbGVtZW50PnRvZG9DYXJkLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJldmVudC1pZFwiKVswXSkudmFsdWUgPSB0b2RvLmV2ZW50SWQ7XG5cdFx0KDxIVE1MSW5wdXRFbGVtZW50PnRvZG9DYXJkLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0b2RvLWlkXCIpWzBdKS52YWx1ZSA9IHRvZG8udG9kb0lkO1xuXHRcdCg8SFRNTElucHV0RWxlbWVudD50b2RvQ2FyZC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidGV4dCB0aXRsZVwiKVswXSkudmFsdWUgPSB0b2RvLnRpdGxlO1xuXHRcdCg8SFRNTEVsZW1lbnQ+dG9kb0NhcmQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxhYmVsIHRpdGxlXCIpWzBdKS5pbm5lclRleHQgPSB0b2RvLnRpdGxlO1xuXHRcdCg8SFRNTElucHV0RWxlbWVudD50b2RvQ2FyZC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidGV4dCBjb250ZW50XCIpWzBdKS52YWx1ZSA9IHRvZG8uY29udGVudDtcblx0XHQoPEhUTUxFbGVtZW50PnRvZG9DYXJkLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsYWJlbCBjb250ZW50XCIpWzBdKS5pbm5lclRleHQgPSB0b2RvLmNvbnRlbnQ7XG5cdFx0KDxIVE1MSW5wdXRFbGVtZW50PnRvZG9DYXJkLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzZWxlY3QgcmVtaW5kZXItbm90aWNlLXRpbWVcIilbMF0pLnZhbHVlID0gdG9kby5yZW1pbmRlck5vdGljZVRpbWU7XG5cdFx0KDxIVE1MSW5wdXRFbGVtZW50PnRvZG9DYXJkLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzZWxlY3QgcmVtaW5kZXItcmVwZWF0XCIpWzBdKS52YWx1ZSA9IHRvZG8ucmVtaW5kZXJSZXBlYXQ7XG5cdFx0KDxIVE1MSW5wdXRFbGVtZW50PnRvZG9DYXJkLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0ZXh0IHRvZG8tc3RhcnQtZGF0ZVwiKVswXSkudmFsdWUgPSB0b2RvLnRvZG9TdGFydERhdGU7XG5cdFx0KDxIVE1MSW5wdXRFbGVtZW50PnRvZG9DYXJkLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0ZXh0IHRvZG8tc3RhcnQtdGltZVwiKVswXSkudmFsdWUgPSB0b2RvLnRvZG9TdGFydFRpbWU7XG5cdFx0KDxIVE1MSW5wdXRFbGVtZW50PnRvZG9DYXJkLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJoaWQgdG9kby1jcmVhdGUtdXNlci1pZFwiKVswXSkudmFsdWUgPSB0b2RvLmNyZWF0ZVVzZXJJZDtcblx0XHQoPEhUTUxJbnB1dEVsZW1lbnQ+dG9kb0NhcmQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImhpZCB0b2RvLWNyZWF0ZS11c2VyLW5hbWVcIilbMF0pLnZhbHVlID0gdG9kby5jcmVhdGVVc2VyTmFtZTtcblx0XHQoPEhUTUxJbnB1dEVsZW1lbnQ+dG9kb0NhcmQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImhpZCB0b2RvLWNyZWF0ZS1kYXRldGltZVwiKVswXSkudmFsdWUgPSB0b2RvLmNyZWF0ZURhdGV0aW1lO1xuXHRcdCg8SFRNTElucHV0RWxlbWVudD50b2RvQ2FyZC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaGlkIHRvZG8tdXBkYXRlLXVzZXItaWRcIilbMF0pLnZhbHVlID0gdG9kby51cGRhdGVVc2VySWQ7XG5cdFx0KDxIVE1MSW5wdXRFbGVtZW50PnRvZG9DYXJkLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJoaWQgdG9kby11cGRhdGUtdXNlci1uYW1lXCIpWzBdKS52YWx1ZSA9IHRvZG8udXBkYXRlVXNlck5hbWU7XG5cdFx0KDxIVE1MSW5wdXRFbGVtZW50PnRvZG9DYXJkLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJoaWQgdG9kby11cGRhdGUtZGF0ZXRpbWVcIilbMF0pLnZhbHVlID0gdG9kby51cGRhdGVEYXRldGltZTtcblx0XHRcblx0XHRjb25zdCBjaGVja2xpc3RBcmVhID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIiNjaGVja2xpc3QtYXJlYSB1bC5jaGVja2xpc3RcIik7XG5cdFx0Y29uc3QgY2hlY2tsaXN0ID0gdG9kb0NhcmQucXVlcnlTZWxlY3RvckFsbChcInVsLmNoZWNrbGlzdCBsaVwiKTtcblx0XHRmb3IobGV0IGNoZWNrSXRlbSBvZiBjaGVja2xpc3Qpe1xuXHRcdFx0Y2hlY2tsaXN0QXJlYS5hcHBlbmRDaGlsZChjaGVja0l0ZW0uY2xvbmVOb2RlKHRydWUpKTtcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgY3JlYXRlVG9kb0NhcmQodG9kbzogSVRvZG9EYXRhKTogSFRNTEVsZW1lbnR7XG5cdFx0Ly8g5paw6KaP44GuVE9ET+OCkuOAgeW8leaVsOOBrm9iauOBruaDheWgseOCkuWFg+OBq+S9nOaIkOOBmeOCi1xuXHRcdGNvbnN0IG5ld0NhcmQ6SFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+dGhpcy5fY2FyZFRlbXBsYXRlLmNsb25lTm9kZSh0cnVlKTtcblx0XHR0aGlzLnJlZmxlY3RUb2RvKG5ld0NhcmQsIHRvZG8pO1xuXHRcdHRoaXMuX3RvZG9BcmVhLmFwcGVuZENoaWxkKG5ld0NhcmQpO1xuICAgICAgICByZXR1cm4gbmV3Q2FyZDtcblx0fVxuXHRwdWJsaWMgdXBkYXRlVG9kb0NhcmQodG9kbzogSVRvZG9EYXRhKTogSFRNTEVsZW1lbnR7XG5cdFx0Ly8g5pei5a2Y44GuVE9ET+OCkuW8leaVsOOBruOCquODluOCuOOCp+OCr+ODiOOBrnRvZG9JZOOCkuWFg+OBq+W8leOBo+W8teOCiuWHuuOBl+OAgVxuXHRcdC8vIOW8leaVsOOBrnRvZG/jgqrjg5bjgrjjgqfjgq/jg4jjgafkuIrmm7jjgY3jgZnjgovjgIJcblx0XHRjb25zdCB1cGRhdGVDYXJkOkhUTUxFbGVtZW50ID0gPEhUTUxFbGVtZW50PnRoaXMuX21hcC5nZXQodG9kby50b2RvSWQpO1xuXHRcdHRoaXMucmVmbGVjdFRvZG8odXBkYXRlQ2FyZCwgdG9kbyk7XG5cdFx0aWYoVE9ETy5tZWRpYXRvci5pc0VkaXRpbmcoKSl7IFRPRE8ubWVkaWF0b3IuY29weUVkaXRUb2RvKHVwZGF0ZUNhcmQpOyB9XG5cdFx0cmV0dXJuIHVwZGF0ZUNhcmQ7XG5cdH1cblx0cHVibGljIGdldFRvZG9saXN0KCk6SFRNTENvbGxlY3Rpb257XG5cdFx0cmV0dXJuIHRoaXMuX2xpc3Q7XG5cdH1cblxufVxuXG5jbGFzcyBUb2RvQ2FyZCB7XG5cbn1cbiIsImltcG9ydCAqIGFzIFNvY2tKUyBmcm9tIFwic29ja2pzLWNsaWVudFwiO1xuaW1wb3J0ICogYXMgU3RvbXAgZnJvbSBcInN0b21wanNcIjtcbmltcG9ydCB7IE1lc3NlbmdlciB9IGZyb20gXCIuL01lc3NlbmdlclwiO1xuXG5leHBvcnQgY2xhc3MgWWJtV2ViU29ja2V0IHtcblxuXHRwcml2YXRlIF9zb2NrZXQ6IGFueTtcblx0cHJpdmF0ZSBfc3RvbXBDbGllbnQ6IGFueTtcblxuXHRjb25zdHJ1Y3RvcihlbmRwb2ludDogc3RyaW5nKXtcblx0XHR0aGlzLl9zb2NrZXQgPSBuZXcgU29ja0pTLmRlZmF1bHQoZW5kcG9pbnQpO1xuXHRcdHRoaXMuX3N0b21wQ2xpZW50ID0gU3RvbXAub3Zlcih0aGlzLl9zb2NrZXQpO1xuXHR9XG5cdFxuXHRjb25uZWN0V2ViU29ja2V0KHN1YlVybDogc3RyaW5nLCBjYWxsQmFjazogRnVuY3Rpb24pOiB2b2lke1xuXHRcdHRoaXMuX3N0b21wQ2xpZW50LmNvbm5lY3Qoe30sIChmcmFtZTpzdHJpbmcpID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKFwiQ29ubmVjdGVkOlwiICsgZnJhbWUpO1xuXHRcdFx0dGhpcy5fc3RvbXBDbGllbnQuc3Vic2NyaWJlKHN1YlVybCwgZnVuY3Rpb24oZGF0YTpzdHJpbmcpe1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKFwicmVjZWl2ZSBkYXRhOlwiICsgSlNPTi5wYXJzZShkYXRhLmJvZHkpLmNvbnRlbnQpO1xuXHRcdFx0XHRjYWxsQmFjayhkYXRhKTtcblx0XHRcdH0pXG5cdFx0fSk7XG5cdH1cblx0ZGlzY29ubmVjdFdlYlNvY2tldCgpOiB2b2lke1xuXHRcdGlmKHRoaXMuX3N0b21wQ2xpZW50ICE9PSBudWxsKXtcblx0XHRcdHRoaXMuX3N0b21wQ2xpZW50LmRpc2Nvbm5lY3QoKTtcblx0XHR9XG5cdH1cblx0c2VuZCh1cmw6c3RyaW5nLCBqc29uOnN0cmluZyl7XG5cdFx0dGhpcy5fc3RvbXBDbGllbnQuc2VuZCh1cmwsIHt9LCBqc29uKTtcblx0fVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVxdWlyZWQgPSByZXF1aXJlKCdyZXF1aXJlcy1wb3J0JylcbiAgLCBxcyA9IHJlcXVpcmUoJ3F1ZXJ5c3RyaW5naWZ5JylcbiAgLCBzbGFzaGVzID0gL15bQS1aYS16XVtBLVphLXowLTkrLS5dKjpcXC9cXC8vXG4gICwgcHJvdG9jb2xyZSA9IC9eKFthLXpdW2EtejAtOS4rLV0qOik/KFxcL1xcLyk/KFtcXFxcL10rKT8oW1xcU1xcc10qKS9pXG4gICwgd2luZG93c0RyaXZlTGV0dGVyID0gL15bYS16QS1aXTovXG4gICwgd2hpdGVzcGFjZSA9ICdbXFxcXHgwOVxcXFx4MEFcXFxceDBCXFxcXHgwQ1xcXFx4MERcXFxceDIwXFxcXHhBMFxcXFx1MTY4MFxcXFx1MTgwRVxcXFx1MjAwMFxcXFx1MjAwMVxcXFx1MjAwMlxcXFx1MjAwM1xcXFx1MjAwNFxcXFx1MjAwNVxcXFx1MjAwNlxcXFx1MjAwN1xcXFx1MjAwOFxcXFx1MjAwOVxcXFx1MjAwQVxcXFx1MjAyRlxcXFx1MjA1RlxcXFx1MzAwMFxcXFx1MjAyOFxcXFx1MjAyOVxcXFx1RkVGRl0nXG4gICwgbGVmdCA9IG5ldyBSZWdFeHAoJ14nKyB3aGl0ZXNwYWNlICsnKycpO1xuXG4vKipcbiAqIFRyaW0gYSBnaXZlbiBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBTdHJpbmcgdG8gdHJpbS5cbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gdHJpbUxlZnQoc3RyKSB7XG4gIHJldHVybiAoc3RyID8gc3RyIDogJycpLnRvU3RyaW5nKCkucmVwbGFjZShsZWZ0LCAnJyk7XG59XG5cbi8qKlxuICogVGhlc2UgYXJlIHRoZSBwYXJzZSBydWxlcyBmb3IgdGhlIFVSTCBwYXJzZXIsIGl0IGluZm9ybXMgdGhlIHBhcnNlclxuICogYWJvdXQ6XG4gKlxuICogMC4gVGhlIGNoYXIgaXQgTmVlZHMgdG8gcGFyc2UsIGlmIGl0J3MgYSBzdHJpbmcgaXQgc2hvdWxkIGJlIGRvbmUgdXNpbmdcbiAqICAgIGluZGV4T2YsIFJlZ0V4cCB1c2luZyBleGVjIGFuZCBOYU4gbWVhbnMgc2V0IGFzIGN1cnJlbnQgdmFsdWUuXG4gKiAxLiBUaGUgcHJvcGVydHkgd2Ugc2hvdWxkIHNldCB3aGVuIHBhcnNpbmcgdGhpcyB2YWx1ZS5cbiAqIDIuIEluZGljYXRpb24gaWYgaXQncyBiYWNrd2FyZHMgb3IgZm9yd2FyZCBwYXJzaW5nLCB3aGVuIHNldCBhcyBudW1iZXIgaXQnc1xuICogICAgdGhlIHZhbHVlIG9mIGV4dHJhIGNoYXJzIHRoYXQgc2hvdWxkIGJlIHNwbGl0IG9mZi5cbiAqIDMuIEluaGVyaXQgZnJvbSBsb2NhdGlvbiBpZiBub24gZXhpc3RpbmcgaW4gdGhlIHBhcnNlci5cbiAqIDQuIGB0b0xvd2VyQ2FzZWAgdGhlIHJlc3VsdGluZyB2YWx1ZS5cbiAqL1xudmFyIHJ1bGVzID0gW1xuICBbJyMnLCAnaGFzaCddLCAgICAgICAgICAgICAgICAgICAgICAgIC8vIEV4dHJhY3QgZnJvbSB0aGUgYmFjay5cbiAgWyc/JywgJ3F1ZXJ5J10sICAgICAgICAgICAgICAgICAgICAgICAvLyBFeHRyYWN0IGZyb20gdGhlIGJhY2suXG4gIGZ1bmN0aW9uIHNhbml0aXplKGFkZHJlc3MsIHVybCkgeyAgICAgLy8gU2FuaXRpemUgd2hhdCBpcyBsZWZ0IG9mIHRoZSBhZGRyZXNzXG4gICAgcmV0dXJuIGlzU3BlY2lhbCh1cmwucHJvdG9jb2wpID8gYWRkcmVzcy5yZXBsYWNlKC9cXFxcL2csICcvJykgOiBhZGRyZXNzO1xuICB9LFxuICBbJy8nLCAncGF0aG5hbWUnXSwgICAgICAgICAgICAgICAgICAgIC8vIEV4dHJhY3QgZnJvbSB0aGUgYmFjay5cbiAgWydAJywgJ2F1dGgnLCAxXSwgICAgICAgICAgICAgICAgICAgICAvLyBFeHRyYWN0IGZyb20gdGhlIGZyb250LlxuICBbTmFOLCAnaG9zdCcsIHVuZGVmaW5lZCwgMSwgMV0sICAgICAgIC8vIFNldCBsZWZ0IG92ZXIgdmFsdWUuXG4gIFsvOihcXGQrKSQvLCAncG9ydCcsIHVuZGVmaW5lZCwgMV0sICAgIC8vIFJlZ0V4cCB0aGUgYmFjay5cbiAgW05hTiwgJ2hvc3RuYW1lJywgdW5kZWZpbmVkLCAxLCAxXSAgICAvLyBTZXQgbGVmdCBvdmVyLlxuXTtcblxuLyoqXG4gKiBUaGVzZSBwcm9wZXJ0aWVzIHNob3VsZCBub3QgYmUgY29waWVkIG9yIGluaGVyaXRlZCBmcm9tLiBUaGlzIGlzIG9ubHkgbmVlZGVkXG4gKiBmb3IgYWxsIG5vbiBibG9iIFVSTCdzIGFzIGEgYmxvYiBVUkwgZG9lcyBub3QgaW5jbHVkZSBhIGhhc2gsIG9ubHkgdGhlXG4gKiBvcmlnaW4uXG4gKlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbnZhciBpZ25vcmUgPSB7IGhhc2g6IDEsIHF1ZXJ5OiAxIH07XG5cbi8qKlxuICogVGhlIGxvY2F0aW9uIG9iamVjdCBkaWZmZXJzIHdoZW4geW91ciBjb2RlIGlzIGxvYWRlZCB0aHJvdWdoIGEgbm9ybWFsIHBhZ2UsXG4gKiBXb3JrZXIgb3IgdGhyb3VnaCBhIHdvcmtlciB1c2luZyBhIGJsb2IuIEFuZCB3aXRoIHRoZSBibG9iYmxlIGJlZ2lucyB0aGVcbiAqIHRyb3VibGUgYXMgdGhlIGxvY2F0aW9uIG9iamVjdCB3aWxsIGNvbnRhaW4gdGhlIFVSTCBvZiB0aGUgYmxvYiwgbm90IHRoZVxuICogbG9jYXRpb24gb2YgdGhlIHBhZ2Ugd2hlcmUgb3VyIGNvZGUgaXMgbG9hZGVkIGluLiBUaGUgYWN0dWFsIG9yaWdpbiBpc1xuICogZW5jb2RlZCBpbiB0aGUgYHBhdGhuYW1lYCBzbyB3ZSBjYW4gdGhhbmtmdWxseSBnZW5lcmF0ZSBhIGdvb2QgXCJkZWZhdWx0XCJcbiAqIGxvY2F0aW9uIGZyb20gaXQgc28gd2UgY2FuIGdlbmVyYXRlIHByb3BlciByZWxhdGl2ZSBVUkwncyBhZ2Fpbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGxvYyBPcHRpb25hbCBkZWZhdWx0IGxvY2F0aW9uIG9iamVjdC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IGxvbGNhdGlvbiBvYmplY3QuXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIGxvbGNhdGlvbihsb2MpIHtcbiAgdmFyIGdsb2JhbFZhcjtcblxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIGdsb2JhbFZhciA9IHdpbmRvdztcbiAgZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIGdsb2JhbFZhciA9IGdsb2JhbDtcbiAgZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSBnbG9iYWxWYXIgPSBzZWxmO1xuICBlbHNlIGdsb2JhbFZhciA9IHt9O1xuXG4gIHZhciBsb2NhdGlvbiA9IGdsb2JhbFZhci5sb2NhdGlvbiB8fCB7fTtcbiAgbG9jID0gbG9jIHx8IGxvY2F0aW9uO1xuXG4gIHZhciBmaW5hbGRlc3RpbmF0aW9uID0ge31cbiAgICAsIHR5cGUgPSB0eXBlb2YgbG9jXG4gICAgLCBrZXk7XG5cbiAgaWYgKCdibG9iOicgPT09IGxvYy5wcm90b2NvbCkge1xuICAgIGZpbmFsZGVzdGluYXRpb24gPSBuZXcgVXJsKHVuZXNjYXBlKGxvYy5wYXRobmFtZSksIHt9KTtcbiAgfSBlbHNlIGlmICgnc3RyaW5nJyA9PT0gdHlwZSkge1xuICAgIGZpbmFsZGVzdGluYXRpb24gPSBuZXcgVXJsKGxvYywge30pO1xuICAgIGZvciAoa2V5IGluIGlnbm9yZSkgZGVsZXRlIGZpbmFsZGVzdGluYXRpb25ba2V5XTtcbiAgfSBlbHNlIGlmICgnb2JqZWN0JyA9PT0gdHlwZSkge1xuICAgIGZvciAoa2V5IGluIGxvYykge1xuICAgICAgaWYgKGtleSBpbiBpZ25vcmUpIGNvbnRpbnVlO1xuICAgICAgZmluYWxkZXN0aW5hdGlvbltrZXldID0gbG9jW2tleV07XG4gICAgfVxuXG4gICAgaWYgKGZpbmFsZGVzdGluYXRpb24uc2xhc2hlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBmaW5hbGRlc3RpbmF0aW9uLnNsYXNoZXMgPSBzbGFzaGVzLnRlc3QobG9jLmhyZWYpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmaW5hbGRlc3RpbmF0aW9uO1xufVxuXG4vKipcbiAqIENoZWNrIHdoZXRoZXIgYSBwcm90b2NvbCBzY2hlbWUgaXMgc3BlY2lhbC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gVGhlIHByb3RvY29sIHNjaGVtZSBvZiB0aGUgVVJMXG4gKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgdGhlIHByb3RvY29sIHNjaGVtZSBpcyBzcGVjaWFsLCBlbHNlIGBmYWxzZWBcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGlzU3BlY2lhbChzY2hlbWUpIHtcbiAgcmV0dXJuIChcbiAgICBzY2hlbWUgPT09ICdmaWxlOicgfHxcbiAgICBzY2hlbWUgPT09ICdmdHA6JyB8fFxuICAgIHNjaGVtZSA9PT0gJ2h0dHA6JyB8fFxuICAgIHNjaGVtZSA9PT0gJ2h0dHBzOicgfHxcbiAgICBzY2hlbWUgPT09ICd3czonIHx8XG4gICAgc2NoZW1lID09PSAnd3NzOidcbiAgKTtcbn1cblxuLyoqXG4gKiBAdHlwZWRlZiBQcm90b2NvbEV4dHJhY3RcbiAqIEB0eXBlIE9iamVjdFxuICogQHByb3BlcnR5IHtTdHJpbmd9IHByb3RvY29sIFByb3RvY29sIG1hdGNoZWQgaW4gdGhlIFVSTCwgaW4gbG93ZXJjYXNlLlxuICogQHByb3BlcnR5IHtCb29sZWFufSBzbGFzaGVzIGB0cnVlYCBpZiBwcm90b2NvbCBpcyBmb2xsb3dlZCBieSBcIi8vXCIsIGVsc2UgYGZhbHNlYC5cbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSByZXN0IFJlc3Qgb2YgdGhlIFVSTCB0aGF0IGlzIG5vdCBwYXJ0IG9mIHRoZSBwcm90b2NvbC5cbiAqL1xuXG4vKipcbiAqIEV4dHJhY3QgcHJvdG9jb2wgaW5mb3JtYXRpb24gZnJvbSBhIFVSTCB3aXRoL3dpdGhvdXQgZG91YmxlIHNsYXNoIChcIi8vXCIpLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzIFVSTCB3ZSB3YW50IHRvIGV4dHJhY3QgZnJvbS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBsb2NhdGlvblxuICogQHJldHVybiB7UHJvdG9jb2xFeHRyYWN0fSBFeHRyYWN0ZWQgaW5mb3JtYXRpb24uXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBleHRyYWN0UHJvdG9jb2woYWRkcmVzcywgbG9jYXRpb24pIHtcbiAgYWRkcmVzcyA9IHRyaW1MZWZ0KGFkZHJlc3MpO1xuICBsb2NhdGlvbiA9IGxvY2F0aW9uIHx8IHt9O1xuXG4gIHZhciBtYXRjaCA9IHByb3RvY29scmUuZXhlYyhhZGRyZXNzKTtcbiAgdmFyIHByb3RvY29sID0gbWF0Y2hbMV0gPyBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpIDogJyc7XG4gIHZhciBmb3J3YXJkU2xhc2hlcyA9ICEhbWF0Y2hbMl07XG4gIHZhciBvdGhlclNsYXNoZXMgPSAhIW1hdGNoWzNdO1xuICB2YXIgc2xhc2hlc0NvdW50ID0gMDtcbiAgdmFyIHJlc3Q7XG5cbiAgaWYgKGZvcndhcmRTbGFzaGVzKSB7XG4gICAgaWYgKG90aGVyU2xhc2hlcykge1xuICAgICAgcmVzdCA9IG1hdGNoWzJdICsgbWF0Y2hbM10gKyBtYXRjaFs0XTtcbiAgICAgIHNsYXNoZXNDb3VudCA9IG1hdGNoWzJdLmxlbmd0aCArIG1hdGNoWzNdLmxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdCA9IG1hdGNoWzJdICsgbWF0Y2hbNF07XG4gICAgICBzbGFzaGVzQ291bnQgPSBtYXRjaFsyXS5sZW5ndGg7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChvdGhlclNsYXNoZXMpIHtcbiAgICAgIHJlc3QgPSBtYXRjaFszXSArIG1hdGNoWzRdO1xuICAgICAgc2xhc2hlc0NvdW50ID0gbWF0Y2hbM10ubGVuZ3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN0ID0gbWF0Y2hbNF1cbiAgICB9XG4gIH1cblxuICBpZiAocHJvdG9jb2wgPT09ICdmaWxlOicpIHtcbiAgICBpZiAoc2xhc2hlc0NvdW50ID49IDIpIHtcbiAgICAgIHJlc3QgPSByZXN0LnNsaWNlKDIpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc1NwZWNpYWwocHJvdG9jb2wpKSB7XG4gICAgcmVzdCA9IG1hdGNoWzRdO1xuICB9IGVsc2UgaWYgKHByb3RvY29sKSB7XG4gICAgaWYgKGZvcndhcmRTbGFzaGVzKSB7XG4gICAgICByZXN0ID0gcmVzdC5zbGljZSgyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoc2xhc2hlc0NvdW50ID49IDIgJiYgaXNTcGVjaWFsKGxvY2F0aW9uLnByb3RvY29sKSkge1xuICAgIHJlc3QgPSBtYXRjaFs0XTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcHJvdG9jb2w6IHByb3RvY29sLFxuICAgIHNsYXNoZXM6IGZvcndhcmRTbGFzaGVzIHx8IGlzU3BlY2lhbChwcm90b2NvbCksXG4gICAgc2xhc2hlc0NvdW50OiBzbGFzaGVzQ291bnQsXG4gICAgcmVzdDogcmVzdFxuICB9O1xufVxuXG4vKipcbiAqIFJlc29sdmUgYSByZWxhdGl2ZSBVUkwgcGF0aG5hbWUgYWdhaW5zdCBhIGJhc2UgVVJMIHBhdGhuYW1lLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSByZWxhdGl2ZSBQYXRobmFtZSBvZiB0aGUgcmVsYXRpdmUgVVJMLlxuICogQHBhcmFtIHtTdHJpbmd9IGJhc2UgUGF0aG5hbWUgb2YgdGhlIGJhc2UgVVJMLlxuICogQHJldHVybiB7U3RyaW5nfSBSZXNvbHZlZCBwYXRobmFtZS5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHJlc29sdmUocmVsYXRpdmUsIGJhc2UpIHtcbiAgaWYgKHJlbGF0aXZlID09PSAnJykgcmV0dXJuIGJhc2U7XG5cbiAgdmFyIHBhdGggPSAoYmFzZSB8fCAnLycpLnNwbGl0KCcvJykuc2xpY2UoMCwgLTEpLmNvbmNhdChyZWxhdGl2ZS5zcGxpdCgnLycpKVxuICAgICwgaSA9IHBhdGgubGVuZ3RoXG4gICAgLCBsYXN0ID0gcGF0aFtpIC0gMV1cbiAgICAsIHVuc2hpZnQgPSBmYWxzZVxuICAgICwgdXAgPSAwO1xuXG4gIHdoaWxlIChpLS0pIHtcbiAgICBpZiAocGF0aFtpXSA9PT0gJy4nKSB7XG4gICAgICBwYXRoLnNwbGljZShpLCAxKTtcbiAgICB9IGVsc2UgaWYgKHBhdGhbaV0gPT09ICcuLicpIHtcbiAgICAgIHBhdGguc3BsaWNlKGksIDEpO1xuICAgICAgdXArKztcbiAgICB9IGVsc2UgaWYgKHVwKSB7XG4gICAgICBpZiAoaSA9PT0gMCkgdW5zaGlmdCA9IHRydWU7XG4gICAgICBwYXRoLnNwbGljZShpLCAxKTtcbiAgICAgIHVwLS07XG4gICAgfVxuICB9XG5cbiAgaWYgKHVuc2hpZnQpIHBhdGgudW5zaGlmdCgnJyk7XG4gIGlmIChsYXN0ID09PSAnLicgfHwgbGFzdCA9PT0gJy4uJykgcGF0aC5wdXNoKCcnKTtcblxuICByZXR1cm4gcGF0aC5qb2luKCcvJyk7XG59XG5cbi8qKlxuICogVGhlIGFjdHVhbCBVUkwgaW5zdGFuY2UuIEluc3RlYWQgb2YgcmV0dXJuaW5nIGFuIG9iamVjdCB3ZSd2ZSBvcHRlZC1pbiB0b1xuICogY3JlYXRlIGFuIGFjdHVhbCBjb25zdHJ1Y3RvciBhcyBpdCdzIG11Y2ggbW9yZSBtZW1vcnkgZWZmaWNpZW50IGFuZFxuICogZmFzdGVyIGFuZCBpdCBwbGVhc2VzIG15IE9DRC5cbiAqXG4gKiBJdCBpcyB3b3J0aCBub3RpbmcgdGhhdCB3ZSBzaG91bGQgbm90IHVzZSBgVVJMYCBhcyBjbGFzcyBuYW1lIHRvIHByZXZlbnRcbiAqIGNsYXNoZXMgd2l0aCB0aGUgZ2xvYmFsIFVSTCBpbnN0YW5jZSB0aGF0IGdvdCBpbnRyb2R1Y2VkIGluIGJyb3dzZXJzLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3MgVVJMIHdlIHdhbnQgdG8gcGFyc2UuXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IFtsb2NhdGlvbl0gTG9jYXRpb24gZGVmYXVsdHMgZm9yIHJlbGF0aXZlIHBhdGhzLlxuICogQHBhcmFtIHtCb29sZWFufEZ1bmN0aW9ufSBbcGFyc2VyXSBQYXJzZXIgZm9yIHRoZSBxdWVyeSBzdHJpbmcuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBVcmwoYWRkcmVzcywgbG9jYXRpb24sIHBhcnNlcikge1xuICBhZGRyZXNzID0gdHJpbUxlZnQoYWRkcmVzcyk7XG5cbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFVybCkpIHtcbiAgICByZXR1cm4gbmV3IFVybChhZGRyZXNzLCBsb2NhdGlvbiwgcGFyc2VyKTtcbiAgfVxuXG4gIHZhciByZWxhdGl2ZSwgZXh0cmFjdGVkLCBwYXJzZSwgaW5zdHJ1Y3Rpb24sIGluZGV4LCBrZXlcbiAgICAsIGluc3RydWN0aW9ucyA9IHJ1bGVzLnNsaWNlKClcbiAgICAsIHR5cGUgPSB0eXBlb2YgbG9jYXRpb25cbiAgICAsIHVybCA9IHRoaXNcbiAgICAsIGkgPSAwO1xuXG4gIC8vXG4gIC8vIFRoZSBmb2xsb3dpbmcgaWYgc3RhdGVtZW50cyBhbGxvd3MgdGhpcyBtb2R1bGUgdHdvIGhhdmUgY29tcGF0aWJpbGl0eSB3aXRoXG4gIC8vIDIgZGlmZmVyZW50IEFQSTpcbiAgLy9cbiAgLy8gMS4gTm9kZS5qcydzIGB1cmwucGFyc2VgIGFwaSB3aGljaCBhY2NlcHRzIGEgVVJMLCBib29sZWFuIGFzIGFyZ3VtZW50c1xuICAvLyAgICB3aGVyZSB0aGUgYm9vbGVhbiBpbmRpY2F0ZXMgdGhhdCB0aGUgcXVlcnkgc3RyaW5nIHNob3VsZCBhbHNvIGJlIHBhcnNlZC5cbiAgLy9cbiAgLy8gMi4gVGhlIGBVUkxgIGludGVyZmFjZSBvZiB0aGUgYnJvd3NlciB3aGljaCBhY2NlcHRzIGEgVVJMLCBvYmplY3QgYXNcbiAgLy8gICAgYXJndW1lbnRzLiBUaGUgc3VwcGxpZWQgb2JqZWN0IHdpbGwgYmUgdXNlZCBhcyBkZWZhdWx0IHZhbHVlcyAvIGZhbGwtYmFja1xuICAvLyAgICBmb3IgcmVsYXRpdmUgcGF0aHMuXG4gIC8vXG4gIGlmICgnb2JqZWN0JyAhPT0gdHlwZSAmJiAnc3RyaW5nJyAhPT0gdHlwZSkge1xuICAgIHBhcnNlciA9IGxvY2F0aW9uO1xuICAgIGxvY2F0aW9uID0gbnVsbDtcbiAgfVxuXG4gIGlmIChwYXJzZXIgJiYgJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mIHBhcnNlcikgcGFyc2VyID0gcXMucGFyc2U7XG5cbiAgbG9jYXRpb24gPSBsb2xjYXRpb24obG9jYXRpb24pO1xuXG4gIC8vXG4gIC8vIEV4dHJhY3QgcHJvdG9jb2wgaW5mb3JtYXRpb24gYmVmb3JlIHJ1bm5pbmcgdGhlIGluc3RydWN0aW9ucy5cbiAgLy9cbiAgZXh0cmFjdGVkID0gZXh0cmFjdFByb3RvY29sKGFkZHJlc3MgfHwgJycsIGxvY2F0aW9uKTtcbiAgcmVsYXRpdmUgPSAhZXh0cmFjdGVkLnByb3RvY29sICYmICFleHRyYWN0ZWQuc2xhc2hlcztcbiAgdXJsLnNsYXNoZXMgPSBleHRyYWN0ZWQuc2xhc2hlcyB8fCByZWxhdGl2ZSAmJiBsb2NhdGlvbi5zbGFzaGVzO1xuICB1cmwucHJvdG9jb2wgPSBleHRyYWN0ZWQucHJvdG9jb2wgfHwgbG9jYXRpb24ucHJvdG9jb2wgfHwgJyc7XG4gIGFkZHJlc3MgPSBleHRyYWN0ZWQucmVzdDtcblxuICAvL1xuICAvLyBXaGVuIHRoZSBhdXRob3JpdHkgY29tcG9uZW50IGlzIGFic2VudCB0aGUgVVJMIHN0YXJ0cyB3aXRoIGEgcGF0aFxuICAvLyBjb21wb25lbnQuXG4gIC8vXG4gIGlmIChcbiAgICBleHRyYWN0ZWQucHJvdG9jb2wgPT09ICdmaWxlOicgJiYgKFxuICAgICAgZXh0cmFjdGVkLnNsYXNoZXNDb3VudCAhPT0gMiB8fCB3aW5kb3dzRHJpdmVMZXR0ZXIudGVzdChhZGRyZXNzKSkgfHxcbiAgICAoIWV4dHJhY3RlZC5zbGFzaGVzICYmXG4gICAgICAoZXh0cmFjdGVkLnByb3RvY29sIHx8XG4gICAgICAgIGV4dHJhY3RlZC5zbGFzaGVzQ291bnQgPCAyIHx8XG4gICAgICAgICFpc1NwZWNpYWwodXJsLnByb3RvY29sKSkpXG4gICkge1xuICAgIGluc3RydWN0aW9uc1szXSA9IFsvKC4qKS8sICdwYXRobmFtZSddO1xuICB9XG5cbiAgZm9yICg7IGkgPCBpbnN0cnVjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICBpbnN0cnVjdGlvbiA9IGluc3RydWN0aW9uc1tpXTtcblxuICAgIGlmICh0eXBlb2YgaW5zdHJ1Y3Rpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFkZHJlc3MgPSBpbnN0cnVjdGlvbihhZGRyZXNzLCB1cmwpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgcGFyc2UgPSBpbnN0cnVjdGlvblswXTtcbiAgICBrZXkgPSBpbnN0cnVjdGlvblsxXTtcblxuICAgIGlmIChwYXJzZSAhPT0gcGFyc2UpIHtcbiAgICAgIHVybFtrZXldID0gYWRkcmVzcztcbiAgICB9IGVsc2UgaWYgKCdzdHJpbmcnID09PSB0eXBlb2YgcGFyc2UpIHtcbiAgICAgIGlmICh+KGluZGV4ID0gYWRkcmVzcy5pbmRleE9mKHBhcnNlKSkpIHtcbiAgICAgICAgaWYgKCdudW1iZXInID09PSB0eXBlb2YgaW5zdHJ1Y3Rpb25bMl0pIHtcbiAgICAgICAgICB1cmxba2V5XSA9IGFkZHJlc3Muc2xpY2UoMCwgaW5kZXgpO1xuICAgICAgICAgIGFkZHJlc3MgPSBhZGRyZXNzLnNsaWNlKGluZGV4ICsgaW5zdHJ1Y3Rpb25bMl0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVybFtrZXldID0gYWRkcmVzcy5zbGljZShpbmRleCk7XG4gICAgICAgICAgYWRkcmVzcyA9IGFkZHJlc3Muc2xpY2UoMCwgaW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICgoaW5kZXggPSBwYXJzZS5leGVjKGFkZHJlc3MpKSkge1xuICAgICAgdXJsW2tleV0gPSBpbmRleFsxXTtcbiAgICAgIGFkZHJlc3MgPSBhZGRyZXNzLnNsaWNlKDAsIGluZGV4LmluZGV4KTtcbiAgICB9XG5cbiAgICB1cmxba2V5XSA9IHVybFtrZXldIHx8IChcbiAgICAgIHJlbGF0aXZlICYmIGluc3RydWN0aW9uWzNdID8gbG9jYXRpb25ba2V5XSB8fCAnJyA6ICcnXG4gICAgKTtcblxuICAgIC8vXG4gICAgLy8gSG9zdG5hbWUsIGhvc3QgYW5kIHByb3RvY29sIHNob3VsZCBiZSBsb3dlcmNhc2VkIHNvIHRoZXkgY2FuIGJlIHVzZWQgdG9cbiAgICAvLyBjcmVhdGUgYSBwcm9wZXIgYG9yaWdpbmAuXG4gICAgLy9cbiAgICBpZiAoaW5zdHJ1Y3Rpb25bNF0pIHVybFtrZXldID0gdXJsW2tleV0udG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIC8vXG4gIC8vIEFsc28gcGFyc2UgdGhlIHN1cHBsaWVkIHF1ZXJ5IHN0cmluZyBpbiB0byBhbiBvYmplY3QuIElmIHdlJ3JlIHN1cHBsaWVkXG4gIC8vIHdpdGggYSBjdXN0b20gcGFyc2VyIGFzIGZ1bmN0aW9uIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIGRlZmF1bHQgYnVpbGQtaW5cbiAgLy8gcGFyc2VyLlxuICAvL1xuICBpZiAocGFyc2VyKSB1cmwucXVlcnkgPSBwYXJzZXIodXJsLnF1ZXJ5KTtcblxuICAvL1xuICAvLyBJZiB0aGUgVVJMIGlzIHJlbGF0aXZlLCByZXNvbHZlIHRoZSBwYXRobmFtZSBhZ2FpbnN0IHRoZSBiYXNlIFVSTC5cbiAgLy9cbiAgaWYgKFxuICAgICAgcmVsYXRpdmVcbiAgICAmJiBsb2NhdGlvbi5zbGFzaGVzXG4gICAgJiYgdXJsLnBhdGhuYW1lLmNoYXJBdCgwKSAhPT0gJy8nXG4gICAgJiYgKHVybC5wYXRobmFtZSAhPT0gJycgfHwgbG9jYXRpb24ucGF0aG5hbWUgIT09ICcnKVxuICApIHtcbiAgICB1cmwucGF0aG5hbWUgPSByZXNvbHZlKHVybC5wYXRobmFtZSwgbG9jYXRpb24ucGF0aG5hbWUpO1xuICB9XG5cbiAgLy9cbiAgLy8gRGVmYXVsdCB0byBhIC8gZm9yIHBhdGhuYW1lIGlmIG5vbmUgZXhpc3RzLiBUaGlzIG5vcm1hbGl6ZXMgdGhlIFVSTFxuICAvLyB0byBhbHdheXMgaGF2ZSBhIC9cbiAgLy9cbiAgaWYgKHVybC5wYXRobmFtZS5jaGFyQXQoMCkgIT09ICcvJyAmJiBpc1NwZWNpYWwodXJsLnByb3RvY29sKSkge1xuICAgIHVybC5wYXRobmFtZSA9ICcvJyArIHVybC5wYXRobmFtZTtcbiAgfVxuXG4gIC8vXG4gIC8vIFdlIHNob3VsZCBub3QgYWRkIHBvcnQgbnVtYmVycyBpZiB0aGV5IGFyZSBhbHJlYWR5IHRoZSBkZWZhdWx0IHBvcnQgbnVtYmVyXG4gIC8vIGZvciBhIGdpdmVuIHByb3RvY29sLiBBcyB0aGUgaG9zdCBhbHNvIGNvbnRhaW5zIHRoZSBwb3J0IG51bWJlciB3ZSdyZSBnb2luZ1xuICAvLyBvdmVycmlkZSBpdCB3aXRoIHRoZSBob3N0bmFtZSB3aGljaCBjb250YWlucyBubyBwb3J0IG51bWJlci5cbiAgLy9cbiAgaWYgKCFyZXF1aXJlZCh1cmwucG9ydCwgdXJsLnByb3RvY29sKSkge1xuICAgIHVybC5ob3N0ID0gdXJsLmhvc3RuYW1lO1xuICAgIHVybC5wb3J0ID0gJyc7XG4gIH1cblxuICAvL1xuICAvLyBQYXJzZSBkb3duIHRoZSBgYXV0aGAgZm9yIHRoZSB1c2VybmFtZSBhbmQgcGFzc3dvcmQuXG4gIC8vXG4gIHVybC51c2VybmFtZSA9IHVybC5wYXNzd29yZCA9ICcnO1xuICBpZiAodXJsLmF1dGgpIHtcbiAgICBpbnN0cnVjdGlvbiA9IHVybC5hdXRoLnNwbGl0KCc6Jyk7XG4gICAgdXJsLnVzZXJuYW1lID0gaW5zdHJ1Y3Rpb25bMF07XG4gICAgdXJsLnBhc3N3b3JkID0gaW5zdHJ1Y3Rpb25bMV0gfHwgJyc7XG4gIH1cblxuICB1cmwub3JpZ2luID0gdXJsLnByb3RvY29sICE9PSAnZmlsZTonICYmIGlzU3BlY2lhbCh1cmwucHJvdG9jb2wpICYmIHVybC5ob3N0XG4gICAgPyB1cmwucHJvdG9jb2wgKycvLycrIHVybC5ob3N0XG4gICAgOiAnbnVsbCc7XG5cbiAgLy9cbiAgLy8gVGhlIGhyZWYgaXMganVzdCB0aGUgY29tcGlsZWQgcmVzdWx0LlxuICAvL1xuICB1cmwuaHJlZiA9IHVybC50b1N0cmluZygpO1xufVxuXG4vKipcbiAqIFRoaXMgaXMgY29udmVuaWVuY2UgbWV0aG9kIGZvciBjaGFuZ2luZyBwcm9wZXJ0aWVzIGluIHRoZSBVUkwgaW5zdGFuY2UgdG9cbiAqIGluc3VyZSB0aGF0IHRoZXkgYWxsIHByb3BhZ2F0ZSBjb3JyZWN0bHkuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHBhcnQgICAgICAgICAgUHJvcGVydHkgd2UgbmVlZCB0byBhZGp1c3QuXG4gKiBAcGFyYW0ge01peGVkfSB2YWx1ZSAgICAgICAgICBUaGUgbmV3bHkgYXNzaWduZWQgdmFsdWUuXG4gKiBAcGFyYW0ge0Jvb2xlYW58RnVuY3Rpb259IGZuICBXaGVuIHNldHRpbmcgdGhlIHF1ZXJ5LCBpdCB3aWxsIGJlIHRoZSBmdW5jdGlvblxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlZCB0byBwYXJzZSB0aGUgcXVlcnkuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBXaGVuIHNldHRpbmcgdGhlIHByb3RvY29sLCBkb3VibGUgc2xhc2ggd2lsbCBiZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZCBmcm9tIHRoZSBmaW5hbCB1cmwgaWYgaXQgaXMgdHJ1ZS5cbiAqIEByZXR1cm5zIHtVUkx9IFVSTCBpbnN0YW5jZSBmb3IgY2hhaW5pbmcuXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIHNldChwYXJ0LCB2YWx1ZSwgZm4pIHtcbiAgdmFyIHVybCA9IHRoaXM7XG5cbiAgc3dpdGNoIChwYXJ0KSB7XG4gICAgY2FzZSAncXVlcnknOlxuICAgICAgaWYgKCdzdHJpbmcnID09PSB0eXBlb2YgdmFsdWUgJiYgdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgIHZhbHVlID0gKGZuIHx8IHFzLnBhcnNlKSh2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIHVybFtwYXJ0XSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdwb3J0JzpcbiAgICAgIHVybFtwYXJ0XSA9IHZhbHVlO1xuXG4gICAgICBpZiAoIXJlcXVpcmVkKHZhbHVlLCB1cmwucHJvdG9jb2wpKSB7XG4gICAgICAgIHVybC5ob3N0ID0gdXJsLmhvc3RuYW1lO1xuICAgICAgICB1cmxbcGFydF0gPSAnJztcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgICAgdXJsLmhvc3QgPSB1cmwuaG9zdG5hbWUgKyc6JysgdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnaG9zdG5hbWUnOlxuICAgICAgdXJsW3BhcnRdID0gdmFsdWU7XG5cbiAgICAgIGlmICh1cmwucG9ydCkgdmFsdWUgKz0gJzonKyB1cmwucG9ydDtcbiAgICAgIHVybC5ob3N0ID0gdmFsdWU7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2hvc3QnOlxuICAgICAgdXJsW3BhcnRdID0gdmFsdWU7XG5cbiAgICAgIGlmICgvOlxcZCskLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KCc6Jyk7XG4gICAgICAgIHVybC5wb3J0ID0gdmFsdWUucG9wKCk7XG4gICAgICAgIHVybC5ob3N0bmFtZSA9IHZhbHVlLmpvaW4oJzonKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVybC5ob3N0bmFtZSA9IHZhbHVlO1xuICAgICAgICB1cmwucG9ydCA9ICcnO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3Byb3RvY29sJzpcbiAgICAgIHVybC5wcm90b2NvbCA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICB1cmwuc2xhc2hlcyA9ICFmbjtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAncGF0aG5hbWUnOlxuICAgIGNhc2UgJ2hhc2gnOlxuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHZhciBjaGFyID0gcGFydCA9PT0gJ3BhdGhuYW1lJyA/ICcvJyA6ICcjJztcbiAgICAgICAgdXJsW3BhcnRdID0gdmFsdWUuY2hhckF0KDApICE9PSBjaGFyID8gY2hhciArIHZhbHVlIDogdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cmxbcGFydF0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAndXNlcm5hbWUnOlxuICAgIGNhc2UgJ3Bhc3N3b3JkJzpcbiAgICAgIHVybFtwYXJ0XSA9IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2F1dGgnOlxuICAgICAgdmFyIHNwbGl0cyA9IHZhbHVlLnNwbGl0KCc6Jyk7XG4gICAgICB1cmwudXNlcm5hbWUgPSBzcGxpdHNbMF07XG4gICAgICB1cmwucGFzc3dvcmQgPSBzcGxpdHMubGVuZ3RoID09PSAyID8gc3BsaXRzWzFdIDogJyc7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGlucyA9IHJ1bGVzW2ldO1xuXG4gICAgaWYgKGluc1s0XSkgdXJsW2luc1sxXV0gPSB1cmxbaW5zWzFdXS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgdXJsLmF1dGggPSB1cmwucGFzc3dvcmQgPyB1cmwudXNlcm5hbWUgKyc6JysgdXJsLnBhc3N3b3JkIDogdXJsLnVzZXJuYW1lO1xuXG4gIHVybC5vcmlnaW4gPSB1cmwucHJvdG9jb2wgIT09ICdmaWxlOicgJiYgaXNTcGVjaWFsKHVybC5wcm90b2NvbCkgJiYgdXJsLmhvc3RcbiAgICA/IHVybC5wcm90b2NvbCArJy8vJysgdXJsLmhvc3RcbiAgICA6ICdudWxsJztcblxuICB1cmwuaHJlZiA9IHVybC50b1N0cmluZygpO1xuXG4gIHJldHVybiB1cmw7XG59XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBwcm9wZXJ0aWVzIGJhY2sgaW4gdG8gYSB2YWxpZCBhbmQgZnVsbCBVUkwgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN0cmluZ2lmeSBPcHRpb25hbCBxdWVyeSBzdHJpbmdpZnkgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBDb21waWxlZCB2ZXJzaW9uIG9mIHRoZSBVUkwuXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKHN0cmluZ2lmeSkge1xuICBpZiAoIXN0cmluZ2lmeSB8fCAnZnVuY3Rpb24nICE9PSB0eXBlb2Ygc3RyaW5naWZ5KSBzdHJpbmdpZnkgPSBxcy5zdHJpbmdpZnk7XG5cbiAgdmFyIHF1ZXJ5XG4gICAgLCB1cmwgPSB0aGlzXG4gICAgLCBwcm90b2NvbCA9IHVybC5wcm90b2NvbDtcblxuICBpZiAocHJvdG9jb2wgJiYgcHJvdG9jb2wuY2hhckF0KHByb3RvY29sLmxlbmd0aCAtIDEpICE9PSAnOicpIHByb3RvY29sICs9ICc6JztcblxuICB2YXIgcmVzdWx0ID1cbiAgICBwcm90b2NvbCArXG4gICAgKCh1cmwucHJvdG9jb2wgJiYgdXJsLnNsYXNoZXMpIHx8IGlzU3BlY2lhbCh1cmwucHJvdG9jb2wpID8gJy8vJyA6ICcnKTtcblxuICBpZiAodXJsLnVzZXJuYW1lKSB7XG4gICAgcmVzdWx0ICs9IHVybC51c2VybmFtZTtcbiAgICBpZiAodXJsLnBhc3N3b3JkKSByZXN1bHQgKz0gJzonKyB1cmwucGFzc3dvcmQ7XG4gICAgcmVzdWx0ICs9ICdAJztcbiAgfSBlbHNlIGlmICh1cmwucGFzc3dvcmQpIHtcbiAgICByZXN1bHQgKz0gJzonKyB1cmwucGFzc3dvcmQ7XG4gICAgcmVzdWx0ICs9ICdAJztcbiAgfVxuXG4gIHJlc3VsdCArPSB1cmwuaG9zdCArIHVybC5wYXRobmFtZTtcblxuICBxdWVyeSA9ICdvYmplY3QnID09PSB0eXBlb2YgdXJsLnF1ZXJ5ID8gc3RyaW5naWZ5KHVybC5xdWVyeSkgOiB1cmwucXVlcnk7XG4gIGlmIChxdWVyeSkgcmVzdWx0ICs9ICc/JyAhPT0gcXVlcnkuY2hhckF0KDApID8gJz8nKyBxdWVyeSA6IHF1ZXJ5O1xuXG4gIGlmICh1cmwuaGFzaCkgcmVzdWx0ICs9IHVybC5oYXNoO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cblVybC5wcm90b3R5cGUgPSB7IHNldDogc2V0LCB0b1N0cmluZzogdG9TdHJpbmcgfTtcblxuLy9cbi8vIEV4cG9zZSB0aGUgVVJMIHBhcnNlciBhbmQgc29tZSBhZGRpdGlvbmFsIHByb3BlcnRpZXMgdGhhdCBtaWdodCBiZSB1c2VmdWwgZm9yXG4vLyBvdGhlcnMgb3IgdGVzdGluZy5cbi8vXG5VcmwuZXh0cmFjdFByb3RvY29sID0gZXh0cmFjdFByb3RvY29sO1xuVXJsLmxvY2F0aW9uID0gbG9sY2F0aW9uO1xuVXJsLnRyaW1MZWZ0ID0gdHJpbUxlZnQ7XG5VcmwucXMgPSBxcztcblxubW9kdWxlLmV4cG9ydHMgPSBVcmw7XG4iLCJ2YXIgX2dsb2JhbFRoaXM7XG5pZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSB7XG5cdF9nbG9iYWxUaGlzID0gZ2xvYmFsVGhpcztcbn0gZWxzZSB7XG5cdHRyeSB7XG5cdFx0X2dsb2JhbFRoaXMgPSByZXF1aXJlKCdlczUtZXh0L2dsb2JhbCcpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHR9IGZpbmFsbHkge1xuXHRcdGlmICghX2dsb2JhbFRoaXMgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHsgX2dsb2JhbFRoaXMgPSB3aW5kb3c7IH1cblx0XHRpZiAoIV9nbG9iYWxUaGlzKSB7IHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGRldGVybWluZSBnbG9iYWwgdGhpcycpOyB9XG5cdH1cbn1cblxudmFyIE5hdGl2ZVdlYlNvY2tldCA9IF9nbG9iYWxUaGlzLldlYlNvY2tldCB8fCBfZ2xvYmFsVGhpcy5Nb3pXZWJTb2NrZXQ7XG52YXIgd2Vic29ja2V0X3ZlcnNpb24gPSByZXF1aXJlKCcuL3ZlcnNpb24nKTtcblxuXG4vKipcbiAqIEV4cG9zZSBhIFczQyBXZWJTb2NrZXQgY2xhc3Mgd2l0aCBqdXN0IG9uZSBvciB0d28gYXJndW1lbnRzLlxuICovXG5mdW5jdGlvbiBXM0NXZWJTb2NrZXQodXJpLCBwcm90b2NvbHMpIHtcblx0dmFyIG5hdGl2ZV9pbnN0YW5jZTtcblxuXHRpZiAocHJvdG9jb2xzKSB7XG5cdFx0bmF0aXZlX2luc3RhbmNlID0gbmV3IE5hdGl2ZVdlYlNvY2tldCh1cmksIHByb3RvY29scyk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0bmF0aXZlX2luc3RhbmNlID0gbmV3IE5hdGl2ZVdlYlNvY2tldCh1cmkpO1xuXHR9XG5cblx0LyoqXG5cdCAqICduYXRpdmVfaW5zdGFuY2UnIGlzIGFuIGluc3RhbmNlIG9mIG5hdGl2ZVdlYlNvY2tldCAodGhlIGJyb3dzZXIncyBXZWJTb2NrZXRcblx0ICogY2xhc3MpLiBTaW5jZSBpdCBpcyBhbiBPYmplY3QgaXQgd2lsbCBiZSByZXR1cm5lZCBhcyBpdCBpcyB3aGVuIGNyZWF0aW5nIGFuXG5cdCAqIGluc3RhbmNlIG9mIFczQ1dlYlNvY2tldCB2aWEgJ25ldyBXM0NXZWJTb2NrZXQoKScuXG5cdCAqXG5cdCAqIEVDTUFTY3JpcHQgNTogaHR0cDovL2JjbGFyeS5jb20vMjAwNC8xMS8wNy8jYS0xMy4yLjJcblx0ICovXG5cdHJldHVybiBuYXRpdmVfaW5zdGFuY2U7XG59XG5pZiAoTmF0aXZlV2ViU29ja2V0KSB7XG5cdFsnQ09OTkVDVElORycsICdPUEVOJywgJ0NMT1NJTkcnLCAnQ0xPU0VEJ10uZm9yRWFjaChmdW5jdGlvbihwcm9wKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KFczQ1dlYlNvY2tldCwgcHJvcCwge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIE5hdGl2ZVdlYlNvY2tldFtwcm9wXTsgfVxuXHRcdH0pO1xuXHR9KTtcbn1cblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgJ3czY3dlYnNvY2tldCcgOiBOYXRpdmVXZWJTb2NrZXQgPyBXM0NXZWJTb2NrZXQgOiBudWxsLFxuICAgICd2ZXJzaW9uJyAgICAgIDogd2Vic29ja2V0X3ZlcnNpb25cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpLnZlcnNpb247XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmFtZE8gPSB7fTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWluL3RzL1RvZG9saXN0L1RvZG9WaWV3LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9