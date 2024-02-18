
//script.name=Genso import
//script.description=Import genso from WorldMachine

//script.param.extent.type=string
//script.param.extent.description=Extent that was generated
//script.param.extent.displayName=Extent
//script.param.extent.default=Main extent

//script.param.resolution.type=integer
//script.param.resolution.description=Resolution of generated images
//script.param.resolution.displayName=Resolution
//script.param.resolution.default=8192

//script.param.wmOutput.type=file
//script.param.wmOutput.description=Where WM generated it's outputs
//script.param.wmOutput.displayName=WM output directory

'use strict';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$a =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var objectGetOwnPropertyDescriptor = {};

var fails$b = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$a = fails$b;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$a(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});

var fails$9 = fails$b;

var functionBindNative = !fails$9(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

var NATIVE_BIND$2 = functionBindNative;

var call$4 = Function.prototype.call;

var functionCall = NATIVE_BIND$2 ? call$4.bind(call$4) : function () {
  return call$4.apply(call$4, arguments);
};

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$1(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

var createPropertyDescriptor$3 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var NATIVE_BIND$1 = functionBindNative;

var FunctionPrototype$1 = Function.prototype;
var call$3 = FunctionPrototype$1.call;
var uncurryThisWithBind = NATIVE_BIND$1 && FunctionPrototype$1.bind.bind(call$3, call$3);

var functionUncurryThis = NATIVE_BIND$1 ? uncurryThisWithBind : function (fn) {
  return function () {
    return call$3.apply(fn, arguments);
  };
};

var uncurryThis$c = functionUncurryThis;

var toString$2 = uncurryThis$c({}.toString);
var stringSlice$1 = uncurryThis$c(''.slice);

var classofRaw$2 = function (it) {
  return stringSlice$1(toString$2(it), 8, -1);
};

var uncurryThis$b = functionUncurryThis;
var fails$8 = fails$b;
var classof$4 = classofRaw$2;

var $Object$3 = Object;
var split = uncurryThis$b(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$8(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object$3('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$4(it) === 'String' ? split(it, '') : $Object$3(it);
} : $Object$3;

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
var isNullOrUndefined$2 = function (it) {
  return it === null || it === undefined;
};

var isNullOrUndefined$1 = isNullOrUndefined$2;

var $TypeError$6 = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$2 = function (it) {
  if (isNullOrUndefined$1(it)) throw new $TypeError$6("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject$1 = indexedObject;
var requireObjectCoercible$1 = requireObjectCoercible$2;

var toIndexedObject$3 = function (it) {
  return IndexedObject$1(requireObjectCoercible$1(it));
};

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
var isCallable$c = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};

var isCallable$b = isCallable$c;

var isObject$7 = function (it) {
  return typeof it == 'object' ? it !== null : isCallable$b(it);
};

var global$9 = global$a;
var isCallable$a = isCallable$c;

var aFunction = function (argument) {
  return isCallable$a(argument) ? argument : undefined;
};

var getBuiltIn$3 = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global$9[namespace]) : global$9[namespace] && global$9[namespace][method];
};

var uncurryThis$a = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$a({}.isPrototypeOf);

var engineUserAgent = typeof navigator != 'undefined' && String(navigator.userAgent) || '';

var global$8 = global$a;
var userAgent = engineUserAgent;

var process = global$8.process;
var Deno = global$8.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

var engineV8Version = version;

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION$2 = engineV8Version;
var fails$7 = fails$b;
var global$7 = global$a;

var $String$3 = global$7.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$7(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String$3(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
});

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL$1 = symbolConstructorDetection;

var useSymbolAsUid = NATIVE_SYMBOL$1
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var getBuiltIn$2 = getBuiltIn$3;
var isCallable$9 = isCallable$c;
var isPrototypeOf = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var $Object$2 = Object;

var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$2('Symbol');
  return isCallable$9($Symbol) && isPrototypeOf($Symbol.prototype, $Object$2(it));
};

var $String$2 = String;

var tryToString$1 = function (argument) {
  try {
    return $String$2(argument);
  } catch (error) {
    return 'Object';
  }
};

var isCallable$8 = isCallable$c;
var tryToString = tryToString$1;

var $TypeError$5 = TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$2 = function (argument) {
  if (isCallable$8(argument)) return argument;
  throw new $TypeError$5(tryToString(argument) + ' is not a function');
};

var aCallable$1 = aCallable$2;
var isNullOrUndefined = isNullOrUndefined$2;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$1 = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable$1(func);
};

var call$2 = functionCall;
var isCallable$7 = isCallable$c;
var isObject$6 = isObject$7;

var $TypeError$4 = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$7(fn = input.toString) && !isObject$6(val = call$2(fn, input))) return val;
  if (isCallable$7(fn = input.valueOf) && !isObject$6(val = call$2(fn, input))) return val;
  if (pref !== 'string' && isCallable$7(fn = input.toString) && !isObject$6(val = call$2(fn, input))) return val;
  throw new $TypeError$4("Can't convert object to primitive value");
};

var sharedStore = {exports: {}};

var global$6 = global$a;

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$1 = Object.defineProperty;

var defineGlobalProperty$3 = function (key, value) {
  try {
    defineProperty$1(global$6, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global$6[key] = value;
  } return value;
};

var globalThis$1 = global$a;
var defineGlobalProperty$2 = defineGlobalProperty$3;

var SHARED = '__core-js_shared__';
var store$3 = sharedStore.exports = globalThis$1[SHARED] || defineGlobalProperty$2(SHARED, {});

(store$3.versions || (store$3.versions = [])).push({
  version: '3.36.0',
  mode: 'global',
  copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.36.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

var sharedStoreExports = sharedStore.exports;

var store$2 = sharedStoreExports;

var shared$3 = function (key, value) {
  return store$2[key] || (store$2[key] = value || {});
};

var requireObjectCoercible = requireObjectCoercible$2;

var $Object$1 = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$3 = function (argument) {
  return $Object$1(requireObjectCoercible(argument));
};

var uncurryThis$9 = functionUncurryThis;
var toObject$2 = toObject$3;

var hasOwnProperty = uncurryThis$9({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject$2(it), key);
};

var uncurryThis$8 = functionUncurryThis;

var id = 0;
var postfix = Math.random();
var toString$1 = uncurryThis$8(1.0.toString);

var uid$2 = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$1(++id + postfix, 36);
};

var global$5 = global$a;
var shared$2 = shared$3;
var hasOwn$6 = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = symbolConstructorDetection;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var Symbol$1 = global$5.Symbol;
var WellKnownSymbolsStore = shared$2('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1['for'] || Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

var wellKnownSymbol$6 = function (name) {
  if (!hasOwn$6(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn$6(Symbol$1, name)
      ? Symbol$1[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

var call$1 = functionCall;
var isObject$5 = isObject$7;
var isSymbol$1 = isSymbol$2;
var getMethod = getMethod$1;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$5 = wellKnownSymbol$6;

var $TypeError$3 = TypeError;
var TO_PRIMITIVE = wellKnownSymbol$5('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$1 = function (input, pref) {
  if (!isObject$5(input) || isSymbol$1(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call$1(exoticToPrim, input, pref);
    if (!isObject$5(result) || isSymbol$1(result)) return result;
    throw new $TypeError$3("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;
var isSymbol = isSymbol$2;

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey$2 = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

var global$4 = global$a;
var isObject$4 = isObject$7;

var document$1 = global$4.document;
// typeof document.createElement is 'object' in old IE
var EXISTS$1 = isObject$4(document$1) && isObject$4(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS$1 ? document$1.createElement(it) : {};
};

var DESCRIPTORS$7 = descriptors;
var fails$6 = fails$b;
var createElement = documentCreateElement;

// Thanks to IE8 for its funny defineProperty
var ie8DomDefine = !DESCRIPTORS$7 && !fails$6(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});

var DESCRIPTORS$6 = descriptors;
var call = functionCall;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var createPropertyDescriptor$2 = createPropertyDescriptor$3;
var toIndexedObject$2 = toIndexedObject$3;
var toPropertyKey$1 = toPropertyKey$2;
var hasOwn$5 = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$6 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$2(O);
  P = toPropertyKey$1(P);
  if (IE8_DOM_DEFINE$1) try {
    return $getOwnPropertyDescriptor$1(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn$5(O, P)) return createPropertyDescriptor$2(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};

var objectDefineProperty = {};

var DESCRIPTORS$5 = descriptors;
var fails$5 = fails$b;

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
var v8PrototypeDefineBug = DESCRIPTORS$5 && fails$5(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});

var isObject$3 = isObject$7;

var $String$1 = String;
var $TypeError$2 = TypeError;

// `Assert: Type(argument) is Object`
var anObject$2 = function (argument) {
  if (isObject$3(argument)) return argument;
  throw new $TypeError$2($String$1(argument) + ' is not an object');
};

var DESCRIPTORS$4 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var anObject$1 = anObject$2;
var toPropertyKey = toPropertyKey$2;

var $TypeError$1 = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE$1 = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$4 ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject$1(O);
  P = toPropertyKey(P);
  anObject$1(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject$1(O);
  P = toPropertyKey(P);
  anObject$1(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError$1('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS$3 = descriptors;
var definePropertyModule$3 = objectDefineProperty;
var createPropertyDescriptor$1 = createPropertyDescriptor$3;

var createNonEnumerableProperty$2 = DESCRIPTORS$3 ? function (object, key, value) {
  return definePropertyModule$3.f(object, key, createPropertyDescriptor$1(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var makeBuiltIn$2 = {exports: {}};

var DESCRIPTORS$2 = descriptors;
var hasOwn$4 = hasOwnProperty_1;

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS$2 && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn$4(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS$2 || (DESCRIPTORS$2 && getDescriptor(FunctionPrototype, 'name').configurable));

var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

var uncurryThis$7 = functionUncurryThis;
var isCallable$6 = isCallable$c;
var store$1 = sharedStoreExports;

var functionToString = uncurryThis$7(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable$6(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it);
  };
}

var inspectSource$2 = store$1.inspectSource;

var global$3 = global$a;
var isCallable$5 = isCallable$c;

var WeakMap$1 = global$3.WeakMap;

var weakMapBasicDetection = isCallable$5(WeakMap$1) && /native code/.test(String(WeakMap$1));

var shared$1 = shared$3;
var uid = uid$2;

var keys = shared$1('keys');

var sharedKey$1 = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys$3 = {};

var NATIVE_WEAK_MAP = weakMapBasicDetection;
var global$2 = global$a;
var isObject$2 = isObject$7;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$2;
var hasOwn$3 = hasOwnProperty_1;
var shared = sharedStoreExports;
var sharedKey = sharedKey$1;
var hiddenKeys$2 = hiddenKeys$3;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError$1 = global$2.TypeError;
var WeakMap = global$2.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$2(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError$1('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys$2[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn$3(it, STATE)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$1(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn$3(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn$3(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

var uncurryThis$6 = functionUncurryThis;
var fails$4 = fails$b;
var isCallable$4 = isCallable$c;
var hasOwn$2 = hasOwnProperty_1;
var DESCRIPTORS$1 = descriptors;
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
var inspectSource$1 = inspectSource$2;
var InternalStateModule = internalState;

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis$6(''.slice);
var replace = uncurryThis$6(''.replace);
var join = uncurryThis$6([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS$1 && !fails$4(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn$1 = makeBuiltIn$2.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn$2(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS$1) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn$2(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn$2(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS$1) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn$2(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn$1(function toString() {
  return isCallable$4(this) && getInternalState(this).source || inspectSource$1(this);
}, 'toString');

var makeBuiltInExports = makeBuiltIn$2.exports;

var isCallable$3 = isCallable$c;
var definePropertyModule$2 = objectDefineProperty;
var makeBuiltIn = makeBuiltInExports;
var defineGlobalProperty$1 = defineGlobalProperty$3;

var defineBuiltIn$2 = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable$3(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty$1(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule$2.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};

var objectGetOwnPropertyNames = {};

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
var mathTrunc = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};

var trunc = mathTrunc;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
var toIntegerOrInfinity$2 = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};

var toIntegerOrInfinity$1 = toIntegerOrInfinity$2;

var max = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$1 = function (index, length) {
  var integer = toIntegerOrInfinity$1(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};

var toIntegerOrInfinity = toIntegerOrInfinity$2;

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$1 = function (argument) {
  var len = toIntegerOrInfinity(argument);
  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toLength = toLength$1;

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
var lengthOfArrayLike$3 = function (obj) {
  return toLength(obj.length);
};

var toIndexedObject$1 = toIndexedObject$3;
var toAbsoluteIndex = toAbsoluteIndex$1;
var lengthOfArrayLike$2 = lengthOfArrayLike$3;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod$1 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$1($this);
    var length = lengthOfArrayLike$2(O);
    if (length === 0) return !IS_INCLUDES && -1;
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod$1(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$1(false)
};

var uncurryThis$5 = functionUncurryThis;
var hasOwn$1 = hasOwnProperty_1;
var toIndexedObject = toIndexedObject$3;
var indexOf = arrayIncludes.indexOf;
var hiddenKeys$1 = hiddenKeys$3;

var push$1 = uncurryThis$5([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn$1(hiddenKeys$1, key) && hasOwn$1(O, key) && push$1(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn$1(O, key = names[i++])) {
    ~indexOf(result, key) || push$1(result, key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys$1 = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var internalObjectKeys = objectKeysInternal;
var enumBugKeys = enumBugKeys$1;

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$1 = getBuiltIn$3;
var uncurryThis$4 = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var anObject = anObject$2;

var concat = uncurryThis$4([].concat);

// all object keys, includes non-enumerable and symbols
var ownKeys$1 = getBuiltIn$1('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

var hasOwn = hasOwnProperty_1;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule$1 = objectDefineProperty;

var copyConstructorProperties$1 = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule$1.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

var fails$3 = fails$b;
var isCallable$2 = isCallable$c;

var replacement = /#|\.prototype\./;

var isForced$1 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable$2(detection) ? fails$3(detection)
    : !!detection;
};

var normalize = isForced$1.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$1.data = {};
var NATIVE = isForced$1.NATIVE = 'N';
var POLYFILL = isForced$1.POLYFILL = 'P';

var isForced_1 = isForced$1;

var global$1 = global$a;
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty = createNonEnumerableProperty$2;
var defineBuiltIn$1 = defineBuiltIn$2;
var defineGlobalProperty = defineGlobalProperty$3;
var copyConstructorProperties = copyConstructorProperties$1;
var isForced = isForced_1;

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$1;
  } else if (STATIC) {
    target = global$1[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = global$1[TARGET] && global$1[TARGET].prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn$1(target, key, sourceProperty, options);
  }
};

var classof$3 = classofRaw$2;

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
var isArray$2 = Array.isArray || function isArray(argument) {
  return classof$3(argument) === 'Array';
};

var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

var doesNotExceedSafeInteger$1 = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};

var DESCRIPTORS = descriptors;
var definePropertyModule = objectDefineProperty;
var createPropertyDescriptor = createPropertyDescriptor$3;

var createProperty$1 = function (object, key, value) {
  if (DESCRIPTORS) definePropertyModule.f(object, key, createPropertyDescriptor(0, value));
  else object[key] = value;
};

var wellKnownSymbol$4 = wellKnownSymbol$6;

var TO_STRING_TAG$1 = wellKnownSymbol$4('toStringTag');
var test = {};

test[TO_STRING_TAG$1] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
var isCallable$1 = isCallable$c;
var classofRaw$1 = classofRaw$2;
var wellKnownSymbol$3 = wellKnownSymbol$6;

var TO_STRING_TAG = wellKnownSymbol$3('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw$1(function () { return arguments; }()) === 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$2 = TO_STRING_TAG_SUPPORT$2 ? classofRaw$1 : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw$1(O)
    // ES3 arguments fallback
    : (result = classofRaw$1(O)) === 'Object' && isCallable$1(O.callee) ? 'Arguments' : result;
};

var uncurryThis$3 = functionUncurryThis;
var fails$2 = fails$b;
var isCallable = isCallable$c;
var classof$1 = classof$2;
var getBuiltIn = getBuiltIn$3;
var inspectSource = inspectSource$2;

var noop = function () { /* empty */ };
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis$3(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, [], argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  switch (classof$1(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
var isConstructor$1 = !construct || fails$2(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;

var isArray$1 = isArray$2;
var isConstructor = isConstructor$1;
var isObject$1 = isObject$7;
var wellKnownSymbol$2 = wellKnownSymbol$6;

var SPECIES$1 = wellKnownSymbol$2('species');
var $Array = Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesConstructor$1 = function (originalArray) {
  var C;
  if (isArray$1(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === $Array || isArray$1(C.prototype))) C = undefined;
    else if (isObject$1(C)) {
      C = C[SPECIES$1];
      if (C === null) C = undefined;
    }
  } return C === undefined ? $Array : C;
};

var arraySpeciesConstructor = arraySpeciesConstructor$1;

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate$2 = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

var fails$1 = fails$b;
var wellKnownSymbol$1 = wellKnownSymbol$6;
var V8_VERSION$1 = engineV8Version;

var SPECIES = wellKnownSymbol$1('species');

var arrayMethodHasSpeciesSupport$2 = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION$1 >= 51 || !fails$1(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var $$1 = _export;
var fails = fails$b;
var isArray = isArray$2;
var isObject = isObject$7;
var toObject$1 = toObject$3;
var lengthOfArrayLike$1 = lengthOfArrayLike$3;
var doesNotExceedSafeInteger = doesNotExceedSafeInteger$1;
var createProperty = createProperty$1;
var arraySpeciesCreate$1 = arraySpeciesCreate$2;
var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$2;
var wellKnownSymbol = wellKnownSymbol$6;
var V8_VERSION = engineV8Version;

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport$1('concat');

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$$1({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject$1(this);
    var A = arraySpeciesCreate$1(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = lengthOfArrayLike$1(E);
        doesNotExceedSafeInteger(n + len);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        doesNotExceedSafeInteger(n + 1);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var classofRaw = classofRaw$2;
var uncurryThis$2 = functionUncurryThis;

var functionUncurryThisClause = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis$2(fn);
};

var uncurryThis$1 = functionUncurryThisClause;
var aCallable = aCallable$2;
var NATIVE_BIND = functionBindNative;

var bind$1 = uncurryThis$1(uncurryThis$1.bind);

// optional / simple context binding
var functionBindContext = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind$1(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var bind = functionBindContext;
var uncurryThis = functionUncurryThis;
var IndexedObject = indexedObject;
var toObject = toObject$3;
var lengthOfArrayLike = lengthOfArrayLike$3;
var arraySpeciesCreate = arraySpeciesCreate$2;

var push = uncurryThis([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE === 1;
  var IS_FILTER = TYPE === 2;
  var IS_SOME = TYPE === 3;
  var IS_EVERY = TYPE === 4;
  var IS_FIND_INDEX = TYPE === 6;
  var IS_FILTER_REJECT = TYPE === 7;
  var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var length = lengthOfArrayLike(self);
    var boundFunction = bind(callbackfn, that);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};

var $ = _export;
var $filter = arrayIteration.filter;
var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$2;

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
var classof = classof$2;

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var defineBuiltIn = defineBuiltIn$2;
var toString = objectToString;

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  defineBuiltIn(Object.prototype, 'toString', toString, { unsafe: true });
}

// noinspection JSUnusedGlobalSymbols
wp.MapFormat;
wp.ApplyBaseWp;
function saveWorld(world, file) {
  wp.saveWorld(world).toFile(file).go();
}
function getLayer(name) {
  return wp.getLayer().withName(name).go();
}
function getHeightMap(file, channel) {
  var t = wp.getHeightMap().fromFile(file);
  if (channel) {
    switch (channel) {
      case 'red':
        return t.selectRedChannel().go();
      case 'green':
        return t.selectGreenChannel().go();
      case 'blue':
        return t.selectBlueChannel().go();
    }
  }
  return t.go();
}
function getMapFormat(id) {
  return wp.getMapFormat().withId(id).go();
}
function createWorldFromHeightMap(heightMap, args) {
  var t = wp.createWorld().fromHeightMap(heightMap);
  if (args !== null && args !== void 0 && args.scale) {
    t = t.scale(args.scale);
  }
  if (args !== null && args !== void 0 && args.shift) {
    t = t.shift(args.shift.x, args.shift.y);
  }
  if (args !== null && args !== void 0 && args.levels) {
    var _args$levels = args.levels,
      from = _args$levels.from,
      to = _args$levels.to;
    t = t.fromLevels(from.lower, from.upper).toLevels(to.lower, to.upper);
  }
  if (args !== null && args !== void 0 && args.waterLevel) {
    t = t.withWaterLevel(args.waterLevel);
  }
  if (args !== null && args !== void 0 && args.mapFormat) {
    t = t.withMapFormat(args.mapFormat);
  }
  if (args !== null && args !== void 0 && args.lowerBuildLimit) {
    t = t.withLowerBuildLimit(args.lowerBuildLimit);
  }
  if (args !== null && args !== void 0 && args.upperBuildLimit) {
    t = t.withUpperBuildLimit(args.upperBuildLimit);
  }
  return t.go();
}
function applyCommon(makeWp, args) {
  var filter = null;
  if (args !== null && args !== void 0 && args.filter && !args.filterArgs) {
    filter = args.filter;
  }
  if (args !== null && args !== void 0 && args.filterArgs) {
    filter = createFilter(args.filterArgs);
  }
  var t = makeWp();
  if (filter) {
    t = t.withFilter(filter);
  }
  if (args !== null && args !== void 0 && args.applyTo) {
    switch (args.applyTo) {
      case 'surface':
        t = t.applyToSurface();
        break;
      case 'nether':
        t = t.applyToNether();
        break;
      case 'end':
        t = t.applyToEnd();
        break;
      case 'surfaceCeiling':
        t = t.applyToSurfaceCeiling();
        break;
      case 'netherCeiling':
        t = t.applyToNetherCeiling();
        break;
      case 'endCeiling':
        t = t.applyToEndCeiling();
        break;
    }
  }
  return t;
}
function applyHeightMapCommon(heightMap, world, args) {
  var t = applyCommon(function () {
    return wp.applyHeightMap(heightMap).toWorld(world);
  }, args);
  if (args !== null && args !== void 0 && args.scale) {
    t = t.scale(args.scale);
  }
  if (args !== null && args !== void 0 && args.shift) {
    t = t.shift(args.shift.x, args.shift.y);
  }
  return t;
}
function applyHeightMapAsLayer(heightMap, world, layer, levels, args) {
  function applyLevel(t, level) {
    if ('fromLevel' in level) {
      return t.fromLevel(level.fromLevel).toLevel(level.toLevel);
    } else if ('fromLevels' in level) {
      var from = level.fromLevels;
      if ('toLevels' in level) {
        return t.fromLevels(from.lower, from.upper).toLevels(level.toLevels.lower, level.toLevels.upper);
      } else {
        return t.fromLevels(from.lower, from.upper).toLevel(level.toLevel);
      }
    } else {
      var _level$fromColor = level.fromColor,
        red = _level$fromColor.red,
        green = _level$fromColor.green,
        blue = _level$fromColor.blue;
      if (level.fromColor.alpha) {
        return t.fromColour(level.fromColor.alpha, red, green, blue).toLevel(level.toLevel);
      } else {
        return t.fromColour(red, green, blue).toLevel(level.toLevel);
      }
    }
  }
  var levelsArr = _toConsumableArray(levels);
  var t1 = applyHeightMapCommon(heightMap, world, args);
  var t2 = applyLevel(t1.applyToLayer(layer), levelsArr.shift());
  var t3 = levelsArr.reduce(function (acc, level) {
    return applyLevel(acc, level);
  }, t2);
  if (args !== null && args !== void 0 && args.set) {
    switch (args.set) {
      case 'always':
        return t3.setAlways().go();
      case 'whenLower':
        return t3.setWhenLower().go();
      case 'whenHigher':
        return t3.setWhenHigher().go();
    }
  }
  return t3.go();
}
function applyHeightMapToTerrain(heightMap, world, levels, args) {
  function applyLevel(t, level) {
    if ('fromLevel' in level) {
      return t.fromLevel(level.fromLevel).toTerrain(level.toTerrain);
    } else if ('fromLevels' in level) {
      var from = level.fromLevels;
      return t.fromLevels(from.lower, from.upper).toTerrain(level.toTerrain);
    } else {
      var _level$fromColor2 = level.fromColor,
        red = _level$fromColor2.red,
        green = _level$fromColor2.green,
        blue = _level$fromColor2.blue;
      if (level.fromColor.alpha) {
        return t.fromColour(level.fromColor.alpha, red, green, blue).toTerrain(level.toTerrain);
      } else {
        return t.fromColour(red, green, blue).toTerrain(level.toTerrain);
      }
    }
  }
  var levelsArr = _toConsumableArray(levels);
  var t1 = applyHeightMapCommon(heightMap, world, args).applyToTerrain();
  var t2 = applyLevel(t1, levelsArr.shift());
  var t3 = levelsArr.reduce(function (acc, level) {
    return applyLevel(acc, level);
  }, t2);
  return t3.go();
}
function createFilter(args) {
  var t = wp.createFilter();
  if ('height' in args) {
    switch (args.height.set) {
      case 'above':
        t = t.aboveLevel(args.height.level);
        break;
      case 'below':
        t = t.belowLevel(args.height.level);
        break;
    }
    if (args.height.feather) {
      t = t.feather();
    }
  }
  if ('slope' in args) {
    switch (args.slope.set) {
      case 'above':
        t = t.aboveDegrees(args.slope.degrees);
        break;
      case 'below':
        t = t.belowDegrees(args.slope.degrees);
        break;
    }
  }
  if ('on' in args) {
    switch (args.on.set) {
      case 'exceptOnTerrain':
        t = t.exceptOnTerrain(args.on.terrain);
        break;
      case 'onlyOnTerrain':
        t = t.onlyOnTerrain(args.on.terrain);
        break;
      case 'exceptOnLayer':
        t = t.exceptOnLayer(args.on.layer);
        break;
      case 'onlyOnLayer':
        t = t.onlyOnLayer(args.on.layer);
        break;
      case 'exceptOnBiome':
        t = t.exceptOnBiome(args.on.biome);
        break;
      case 'onlyOnBiome':
        t = t.onlyOnBiome(args.on.biome);
        break;
      case 'exceptOnAutoBiome':
        if (args.on.autoBiome) {
          t = t.exceptOnAutoBiome(args.on.autoBiome);
        } else {
          t = t.exceptOnAutoBiomes();
        }
        break;
      case 'onlyOnAutoBiome':
        if (args.on.autoBiome) {
          t = t.onlyOnAutoBiome(args.on.autoBiome);
        } else {
          t = t.onlyOnAutoBiomes();
        }
        break;
      case 'exceptOnWater':
        t = t.exceptOnWater();
        break;
      case 'onlyOnWater':
        t = t.onlyOnWater();
        break;
      case 'exceptOnLand':
        t = t.exceptOnLand();
        break;
      case 'onlyOnLand':
        t = t.onlyOnLand();
        break;
    }
  }
  return t.go();
}

// noinspection JSUnusedGlobalSymbols
var Annotation;
(function (_Annotation) {
  _Annotation.none = 0;
  _Annotation.white = 1;
  _Annotation.orange = 2;
  _Annotation.magenta = 3;
  _Annotation.lightBlue = 4;
  _Annotation.yellow = 5;
  _Annotation.lime = 6;
  _Annotation.pink = 7;
  _Annotation.lightGray = 8;
  _Annotation.cyan = 9;
  _Annotation.purple = 10;
  _Annotation.blue = 11;
  _Annotation.brown = 12;
  _Annotation.green = 13;
  _Annotation.red = 14;
  _Annotation.black = 15;
})(Annotation || (Annotation = {}));
var Terrain;
(function (_Terrain) {
  _Terrain.grass = 0;
  _Terrain.bareGrass = 1;
  _Terrain.dirt = 2;
  _Terrain.coarseDirt = 3;
  _Terrain.podzol = 4;
  _Terrain.sand = 5;
  _Terrain.RedSand = 6;
  _Terrain.desert = 7;
  _Terrain.redDesert = 8;
  _Terrain.mesa = 9;
  _Terrain.terracotta = 10;
  var StainedTerracotta;
  (function (_StainedTerracotta) {
    _StainedTerracotta.white = 11;
    _StainedTerracotta.orange = 12;
    _StainedTerracotta.magenta = 13;
    _StainedTerracotta.lightBlue = 14;
    _StainedTerracotta.yellow = 15;
    _StainedTerracotta.lime = 16;
    _StainedTerracotta.pink = 17;
    _StainedTerracotta.grey = 18;
    _StainedTerracotta.lightGrey = 19;
    _StainedTerracotta.cyan = 20;
    _StainedTerracotta.purple = 21;
    _StainedTerracotta.blue = 22;
    _StainedTerracotta.brown = 23;
    _StainedTerracotta.green = 24;
    _StainedTerracotta.red = 25;
    _StainedTerracotta.black = 26;
  })(StainedTerracotta || (StainedTerracotta = _Terrain.StainedTerracotta || (_Terrain.StainedTerracotta = {})));
  _Terrain.sandstone = 27;
  _Terrain.stone = 28;
  _Terrain.Rock = 29;
  _Terrain.cobblestone = 30;
  _Terrain.mossyCobblestone = 31;
  _Terrain.obsidian = 32;
  _Terrain.bedrock = 33;
  _Terrain.gravel = 34;
  _Terrain.clay = 35;
  _Terrain.beaches = 36;
  _Terrain.water = 37;
  _Terrain.lava = 38;
  _Terrain.deepSnow = 40;
  _Terrain.netherrack = 41;
  _Terrain.soulSand = 42;
  _Terrain.netherlike = 43;
  _Terrain.mycelium = 44;
  _Terrain.endStone = 45;
  _Terrain.redSandstone = 71;
  _Terrain.granite = 72;
  _Terrain.diorite = 73;
  _Terrain.andesite = 74;
  _Terrain.StoneMix = 75;
  _Terrain.dirtPath = 100;
  _Terrain.magma = 101;
  function custom(slot) {
    switch (slot) {
      case 1:
        return 47;
      case 2:
        return 48;
      case 3:
        return 49;
      case 4:
        return 50;
      case 5:
        return 51;
      case 6:
        return 52;
      case 7:
        return 53;
      case 8:
        return 54;
      case 9:
        return 55;
      case 10:
        return 56;
      case 11:
        return 57;
      case 12:
        return 58;
      case 13:
        return 59;
      case 14:
        return 60;
      case 15:
        return 61;
      case 16:
        return 62;
      case 17:
        return 63;
      case 18:
        return 64;
      case 19:
        return 65;
      case 20:
        return 66;
      case 21:
        return 67;
      case 22:
        return 68;
      case 23:
        return 69;
      case 24:
        return 70;
      case 25:
        return 76;
      case 26:
        return 77;
      case 27:
        return 78;
      case 28:
        return 79;
      case 29:
        return 80;
      case 30:
        return 81;
      case 31:
        return 82;
      case 32:
        return 83;
      case 33:
        return 84;
      case 34:
        return 85;
      case 35:
        return 86;
      case 36:
        return 87;
      case 37:
        return 88;
      case 38:
        return 89;
      case 39:
        return 90;
      case 40:
        return 91;
      case 41:
        return 92;
      case 42:
        return 93;
      case 43:
        return 94;
      case 44:
        return 95;
      case 45:
        return 96;
      case 46:
        return 97;
      case 47:
        return 98;
      case 48:
        return 99;
      case 49:
        return 102;
      case 50:
        return 103;
      case 51:
        return 104;
      case 52:
        return 105;
      case 53:
        return 106;
      case 54:
        return 107;
      case 55:
        return 108;
      case 56:
        return 109;
      case 57:
        return 110;
      case 58:
        return 111;
      case 59:
        return 112;
      case 60:
        return 113;
      case 61:
        return 114;
      case 62:
        return 115;
      case 63:
        return 116;
      case 64:
        return 117;
      case 65:
        return 118;
      case 66:
        return 119;
      case 67:
        return 120;
      case 68:
        return 121;
      case 69:
        return 122;
      case 70:
        return 123;
      case 71:
        return 124;
      case 72:
        return 125;
      case 73:
        return 126;
      case 74:
        return 127;
      case 75:
        return 128;
      case 76:
        return 129;
      case 77:
        return 130;
      case 78:
        return 131;
      case 79:
        return 132;
      case 80:
        return 133;
      case 81:
        return 134;
      case 82:
        return 135;
      case 83:
        return 136;
      case 84:
        return 137;
      case 85:
        return 138;
      case 86:
        return 139;
      case 87:
        return 140;
      case 88:
        return 141;
      case 89:
        return 142;
      case 90:
        return 143;
      case 91:
        return 144;
      case 92:
        return 145;
      case 93:
        return 146;
      case 94:
        return 147;
      case 95:
        return 148;
      case 96:
        return 149;
    }
  }
  _Terrain.custom = custom;
  _Terrain.deepslate = 150;
  _Terrain.tuff = 151;
  _Terrain.basalt = 152;
  _Terrain.blackstone = 153;
  _Terrain.soulSoil = 154;
  _Terrain.warpedNylium = 155;
  _Terrain.crimsonNylium = 156;
  _Terrain.calcite = 157;
  _Terrain.mud = 158;
  _Terrain.bareBeaches = 159;
  _Terrain.moss = 160;
})(Terrain || (Terrain = {}));

// @ts-expect-error WP global
var _ref = params,
  extent = _ref.extent,
  resolution = _ref.resolution,
  wmOutput = _ref.wmOutput;
print(wmOutput);
//// @ts-expect-error WP global
//const scriptDirLoc = scriptDir

function outputFile(outputType) {
  return "".concat(wmOutput, "/").concat(extent, "/").concat(resolution, "/").concat(outputType, " out.png");
}
var heightmap = getHeightMap(outputFile('Heightmap'));
print('Got heightmap');
var I2_MAX = 65535;
var world = createWorldFromHeightMap(heightmap, {
  levels: {
    from: {
      lower: 0,
      upper: I2_MAX
    },
    to: {
      lower: 0,
      upper: 512
    }
  },
  waterLevel: -64,
  mapFormat: getMapFormat('org.pepsoft.anvil.1.18'),
  lowerBuildLimit: -64,
  upperBuildLimit: 512
});
print('Created world');
function leveli2(blocks) {
  return blocks * 256;
}
function anglei2(angle) {
  var ratio = angle / 90;
  return ratio * I2_MAX;
}
applyHeightMapToTerrain(heightmap, world, [{
  fromLevels: {
    lower: 0,
    upper: leveli2(180) - 1
  },
  toTerrain: Terrain.grass
}, {
  fromLevels: {
    lower: leveli2(180),
    upper: leveli2(200) - 1
  },
  toTerrain: Terrain.andesite
}, {
  fromLevels: {
    lower: leveli2(200),
    upper: I2_MAX
  },
  toTerrain: Terrain.stone
}]);
print('Applied heightmap terrain');
var slope = getHeightMap(outputFile('Slope'));
applyHeightMapToTerrain(slope, world, [{
  fromLevels: {
    lower: anglei2(45),
    upper: anglei2(48) - 1
  },
  toTerrain: Terrain.mossyCobblestone
}, {
  fromLevels: {
    lower: anglei2(48),
    upper: anglei2(51) - 1
  },
  toTerrain: Terrain.cobblestone
}, {
  fromLevels: {
    lower: anglei2(51),
    upper: anglei2(54) - 1
  },
  toTerrain: Terrain.andesite
}, {
  fromLevels: {
    lower: anglei2(54),
    upper: I2_MAX
  },
  toTerrain: Terrain.stone
}]);
print('Applied slope terrain');
applyHeightMapToTerrain(getHeightMap(outputFile('Erosion deposit')), world, [{
  fromLevel: I2_MAX,
  toTerrain: Terrain.tuff
}]);
print('Applied erosion deposit terrain');
applyHeightMapToTerrain(getHeightMap(outputFile('Talus')), world, [{
  fromLevel: I2_MAX,
  toTerrain: Terrain.gravel
}]);
print('Applied talus terrain');
applyHeightMapToTerrain(getHeightMap(outputFile('Riverbank')), world, [{
  fromLevels: {
    lower: I2_MAX * 0.8,
    upper: I2_MAX
  },
  toTerrain: Terrain.sand
}], {
  filterArgs: {
    on: {
      set: 'onlyOnTerrain',
      terrain: Terrain.grass
    }
  }
});
print('Applied riverbank terrain');
var river = getHeightMap(outputFile('River'));
applyHeightMapToTerrain(river, world, [{
  fromLevel: I2_MAX,
  toTerrain: Terrain.coarseDirt
}], {
  filterArgs: {
    on: {
      set: 'onlyOnTerrain',
      terrain: Terrain.grass
    }
  }
});
applyHeightMapToTerrain(river, world, [{
  fromLevel: I2_MAX,
  toTerrain: Terrain.coarseDirt
}], {
  filterArgs: {
    on: {
      set: 'onlyOnTerrain',
      terrain: Terrain.sand
    }
  }
});
print('Applied river terrain');
var snow = getHeightMap(outputFile('Snow'));
applyHeightMapToTerrain(snow, world, [{
  fromLevel: I2_MAX,
  toTerrain: Terrain.deepSnow // TODO: Make a custom terrain for snow eventually
}]);
applyHeightMapAsLayer(snow, world, getLayer('Frost'), [{
  fromLevels: {
    lower: 0,
    upper: I2_MAX - 1
  },
  toLevel: 0
}, {
  fromLevel: I2_MAX,
  toLevel: 1
}]);
print('Applied snow terrain');
saveWorld(world, "".concat(extent, "-").concat(resolution, ".world"));
world.setAllowCheats(true);
world.setCreateGoodiesChest(false);
//world.setGameType('CREATIVE')

print('Saved world');
