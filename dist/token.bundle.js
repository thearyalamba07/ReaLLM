/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/tiktoken/tiktoken.js":
/*!*******************************************!*\
  !*** ./node_modules/tiktoken/tiktoken.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Tiktoken: () => (/* reexport safe */ _tiktoken_bg_js__WEBPACK_IMPORTED_MODULE_1__.Tiktoken),\n/* harmony export */   __wbg_parse_06816e879d29d4df: () => (/* reexport safe */ _tiktoken_bg_js__WEBPACK_IMPORTED_MODULE_1__.__wbg_parse_06816e879d29d4df),\n/* harmony export */   __wbg_set_wasm: () => (/* reexport safe */ _tiktoken_bg_js__WEBPACK_IMPORTED_MODULE_1__.__wbg_set_wasm),\n/* harmony export */   __wbg_stringify_daa6661e90c04140: () => (/* reexport safe */ _tiktoken_bg_js__WEBPACK_IMPORTED_MODULE_1__.__wbg_stringify_daa6661e90c04140),\n/* harmony export */   __wbindgen_error_new: () => (/* reexport safe */ _tiktoken_bg_js__WEBPACK_IMPORTED_MODULE_1__.__wbindgen_error_new),\n/* harmony export */   __wbindgen_is_undefined: () => (/* reexport safe */ _tiktoken_bg_js__WEBPACK_IMPORTED_MODULE_1__.__wbindgen_is_undefined),\n/* harmony export */   __wbindgen_object_drop_ref: () => (/* reexport safe */ _tiktoken_bg_js__WEBPACK_IMPORTED_MODULE_1__.__wbindgen_object_drop_ref),\n/* harmony export */   __wbindgen_string_get: () => (/* reexport safe */ _tiktoken_bg_js__WEBPACK_IMPORTED_MODULE_1__.__wbindgen_string_get),\n/* harmony export */   __wbindgen_throw: () => (/* reexport safe */ _tiktoken_bg_js__WEBPACK_IMPORTED_MODULE_1__.__wbindgen_throw),\n/* harmony export */   encoding_for_model: () => (/* reexport safe */ _tiktoken_bg_js__WEBPACK_IMPORTED_MODULE_1__.encoding_for_model),\n/* harmony export */   get_encoding: () => (/* reexport safe */ _tiktoken_bg_js__WEBPACK_IMPORTED_MODULE_1__.get_encoding)\n/* harmony export */ });\n/* harmony import */ var _tiktoken_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tiktoken_bg.wasm */ \"./node_modules/tiktoken/tiktoken_bg.wasm\");\n/* harmony import */ var _tiktoken_bg_wasm__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tiktoken_bg_wasm__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _tiktoken_bg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tiktoken_bg.js */ \"./node_modules/tiktoken/tiktoken_bg.js\");\n\n\n(0,_tiktoken_bg_js__WEBPACK_IMPORTED_MODULE_1__.__wbg_set_wasm)(_tiktoken_bg_wasm__WEBPACK_IMPORTED_MODULE_0__);\n\n\n\n//# sourceURL=webpack:///./node_modules/tiktoken/tiktoken.js?");

/***/ }),

/***/ "./node_modules/tiktoken/tiktoken_bg.js":
/*!**********************************************!*\
  !*** ./node_modules/tiktoken/tiktoken_bg.js ***!
  \**********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Tiktoken: () => (/* binding */ Tiktoken),\n/* harmony export */   __wbg_parse_06816e879d29d4df: () => (/* binding */ __wbg_parse_06816e879d29d4df),\n/* harmony export */   __wbg_set_wasm: () => (/* binding */ __wbg_set_wasm),\n/* harmony export */   __wbg_stringify_daa6661e90c04140: () => (/* binding */ __wbg_stringify_daa6661e90c04140),\n/* harmony export */   __wbindgen_error_new: () => (/* binding */ __wbindgen_error_new),\n/* harmony export */   __wbindgen_is_undefined: () => (/* binding */ __wbindgen_is_undefined),\n/* harmony export */   __wbindgen_object_drop_ref: () => (/* binding */ __wbindgen_object_drop_ref),\n/* harmony export */   __wbindgen_string_get: () => (/* binding */ __wbindgen_string_get),\n/* harmony export */   __wbindgen_throw: () => (/* binding */ __wbindgen_throw),\n/* harmony export */   encoding_for_model: () => (/* binding */ encoding_for_model),\n/* harmony export */   get_encoding: () => (/* binding */ get_encoding)\n/* harmony export */ });\n/* module decorator */ module = __webpack_require__.hmd(module);\nlet wasm;\nfunction __wbg_set_wasm(val) {\n    wasm = val;\n}\n\n\nconst heap = new Array(128).fill(undefined);\n\nheap.push(undefined, null, true, false);\n\nfunction getObject(idx) { return heap[idx]; }\n\nlet heap_next = heap.length;\n\nfunction dropObject(idx) {\n    if (idx < 132) return;\n    heap[idx] = heap_next;\n    heap_next = idx;\n}\n\nfunction takeObject(idx) {\n    const ret = getObject(idx);\n    dropObject(idx);\n    return ret;\n}\n\nlet WASM_VECTOR_LEN = 0;\n\nlet cachedUint8Memory0 = null;\n\nfunction getUint8Memory0() {\n    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {\n        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);\n    }\n    return cachedUint8Memory0;\n}\n\nconst lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;\n\nlet cachedTextEncoder = new lTextEncoder('utf-8');\n\nconst encodeString = (typeof cachedTextEncoder.encodeInto === 'function'\n    ? function (arg, view) {\n    return cachedTextEncoder.encodeInto(arg, view);\n}\n    : function (arg, view) {\n    const buf = cachedTextEncoder.encode(arg);\n    view.set(buf);\n    return {\n        read: arg.length,\n        written: buf.length\n    };\n});\n\nfunction passStringToWasm0(arg, malloc, realloc) {\n\n    if (realloc === undefined) {\n        const buf = cachedTextEncoder.encode(arg);\n        const ptr = malloc(buf.length, 1) >>> 0;\n        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);\n        WASM_VECTOR_LEN = buf.length;\n        return ptr;\n    }\n\n    let len = arg.length;\n    let ptr = malloc(len, 1) >>> 0;\n\n    const mem = getUint8Memory0();\n\n    let offset = 0;\n\n    for (; offset < len; offset++) {\n        const code = arg.charCodeAt(offset);\n        if (code > 0x7F) break;\n        mem[ptr + offset] = code;\n    }\n\n    if (offset !== len) {\n        if (offset !== 0) {\n            arg = arg.slice(offset);\n        }\n        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;\n        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);\n        const ret = encodeString(arg, view);\n\n        offset += ret.written;\n    }\n\n    WASM_VECTOR_LEN = offset;\n    return ptr;\n}\n\nfunction isLikeNone(x) {\n    return x === undefined || x === null;\n}\n\nlet cachedInt32Memory0 = null;\n\nfunction getInt32Memory0() {\n    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {\n        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);\n    }\n    return cachedInt32Memory0;\n}\n\nconst lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;\n\nlet cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });\n\ncachedTextDecoder.decode();\n\nfunction getStringFromWasm0(ptr, len) {\n    ptr = ptr >>> 0;\n    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));\n}\n\nfunction addHeapObject(obj) {\n    if (heap_next === heap.length) heap.push(heap.length + 1);\n    const idx = heap_next;\n    heap_next = heap[idx];\n\n    heap[idx] = obj;\n    return idx;\n}\n\nlet cachedUint32Memory0 = null;\n\nfunction getUint32Memory0() {\n    if (cachedUint32Memory0 === null || cachedUint32Memory0.byteLength === 0) {\n        cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);\n    }\n    return cachedUint32Memory0;\n}\n\nfunction getArrayU32FromWasm0(ptr, len) {\n    ptr = ptr >>> 0;\n    return getUint32Memory0().subarray(ptr / 4, ptr / 4 + len);\n}\n\nfunction passArray8ToWasm0(arg, malloc) {\n    const ptr = malloc(arg.length * 1, 1) >>> 0;\n    getUint8Memory0().set(arg, ptr / 1);\n    WASM_VECTOR_LEN = arg.length;\n    return ptr;\n}\n\nfunction passArray32ToWasm0(arg, malloc) {\n    const ptr = malloc(arg.length * 4, 4) >>> 0;\n    getUint32Memory0().set(arg, ptr / 4);\n    WASM_VECTOR_LEN = arg.length;\n    return ptr;\n}\n\nfunction getArrayU8FromWasm0(ptr, len) {\n    ptr = ptr >>> 0;\n    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);\n}\n/**\n* @param {string} encoding\n* @param {any} extend_special_tokens\n* @returns {Tiktoken}\n*/\nfunction get_encoding(encoding, extend_special_tokens) {\n    if (wasm == null) throw new Error(\"tiktoken: WASM binary has not been propery initialized.\");\n    try {\n        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);\n        const ptr0 = passStringToWasm0(encoding, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);\n        const len0 = WASM_VECTOR_LEN;\n        wasm.get_encoding(retptr, ptr0, len0, addHeapObject(extend_special_tokens));\n        var r0 = getInt32Memory0()[retptr / 4 + 0];\n        var r1 = getInt32Memory0()[retptr / 4 + 1];\n        var r2 = getInt32Memory0()[retptr / 4 + 2];\n        if (r2) {\n            throw takeObject(r1);\n        }\n        return Tiktoken.__wrap(r0);\n    } finally {\n        wasm.__wbindgen_add_to_stack_pointer(16);\n    }\n}\n\n/**\n* @param {string} model\n* @param {any} extend_special_tokens\n* @returns {Tiktoken}\n*/\nfunction encoding_for_model(model, extend_special_tokens) {\n    if (wasm == null) throw new Error(\"tiktoken: WASM binary has not been propery initialized.\");\n    try {\n        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);\n        const ptr0 = passStringToWasm0(model, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);\n        const len0 = WASM_VECTOR_LEN;\n        wasm.encoding_for_model(retptr, ptr0, len0, addHeapObject(extend_special_tokens));\n        var r0 = getInt32Memory0()[retptr / 4 + 0];\n        var r1 = getInt32Memory0()[retptr / 4 + 1];\n        var r2 = getInt32Memory0()[retptr / 4 + 2];\n        if (r2) {\n            throw takeObject(r1);\n        }\n        return Tiktoken.__wrap(r0);\n    } finally {\n        wasm.__wbindgen_add_to_stack_pointer(16);\n    }\n}\n\nfunction handleError(f, args) {\n    try {\n        return f.apply(this, args);\n    } catch (e) {\n        wasm.__wbindgen_export_3(addHeapObject(e));\n    }\n}\n\nconst TiktokenFinalization = new FinalizationRegistry(ptr => wasm.__wbg_tiktoken_free(ptr >>> 0));\n/**\n*/\nclass Tiktoken {\n\n    static __wrap(ptr) {\n        ptr = ptr >>> 0;\n        const obj = Object.create(Tiktoken.prototype);\n        obj.__wbg_ptr = ptr;\n        TiktokenFinalization.register(obj, obj.__wbg_ptr, obj);\n        return obj;\n    }\n\n    __destroy_into_raw() {\n        const ptr = this.__wbg_ptr;\n        this.__wbg_ptr = 0;\n        TiktokenFinalization.unregister(this);\n        return ptr;\n    }\n\n    free() {\n        if (wasm == null) throw new Error(\"tiktoken: WASM binary has not been propery initialized.\");\n        const ptr = this.__destroy_into_raw();\n        wasm.__wbg_tiktoken_free(ptr);\n    }\n    /**\n    * @param {string} tiktoken_bfe\n    * @param {any} special_tokens\n    * @param {string} pat_str\n    */\n    constructor(tiktoken_bfe, special_tokens, pat_str) {\n        if (wasm == null) throw new Error(\"tiktoken: WASM binary has not been propery initialized.\");\n        const ptr0 = passStringToWasm0(tiktoken_bfe, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);\n        const len0 = WASM_VECTOR_LEN;\n        const ptr1 = passStringToWasm0(pat_str, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);\n        const len1 = WASM_VECTOR_LEN;\n        const ret = wasm.tiktoken_new(ptr0, len0, addHeapObject(special_tokens), ptr1, len1);\n        this.__wbg_ptr = ret >>> 0;\n        return this;\n    }\n    /**\n    * @returns {string | undefined}\n    */\n    get name() {\n        try {\n            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);\n            wasm.tiktoken_name(retptr, this.__wbg_ptr);\n            var r0 = getInt32Memory0()[retptr / 4 + 0];\n            var r1 = getInt32Memory0()[retptr / 4 + 1];\n            let v1;\n            if (r0 !== 0) {\n                v1 = getStringFromWasm0(r0, r1).slice();\n                wasm.__wbindgen_export_2(r0, r1 * 1, 1);\n            }\n            return v1;\n        } finally {\n            wasm.__wbindgen_add_to_stack_pointer(16);\n        }\n    }\n    /**\n    * @param {string} text\n    * @param {any} allowed_special\n    * @param {any} disallowed_special\n    * @returns {Uint32Array}\n    */\n    encode(text, allowed_special, disallowed_special) {\n        if (wasm == null) throw new Error(\"tiktoken: WASM binary has not been propery initialized.\");\n        try {\n            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);\n            const ptr0 = passStringToWasm0(text, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);\n            const len0 = WASM_VECTOR_LEN;\n            wasm.tiktoken_encode(retptr, this.__wbg_ptr, ptr0, len0, addHeapObject(allowed_special), addHeapObject(disallowed_special));\n            var r0 = getInt32Memory0()[retptr / 4 + 0];\n            var r1 = getInt32Memory0()[retptr / 4 + 1];\n            var r2 = getInt32Memory0()[retptr / 4 + 2];\n            var r3 = getInt32Memory0()[retptr / 4 + 3];\n            if (r3) {\n                throw takeObject(r2);\n            }\n            var v2 = getArrayU32FromWasm0(r0, r1).slice();\n            wasm.__wbindgen_export_2(r0, r1 * 4, 4);\n            return v2;\n        } finally {\n            wasm.__wbindgen_add_to_stack_pointer(16);\n        }\n    }\n    /**\n    * @param {string} text\n    * @returns {Uint32Array}\n    */\n    encode_ordinary(text) {\n        if (wasm == null) throw new Error(\"tiktoken: WASM binary has not been propery initialized.\");\n        try {\n            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);\n            const ptr0 = passStringToWasm0(text, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);\n            const len0 = WASM_VECTOR_LEN;\n            wasm.tiktoken_encode_ordinary(retptr, this.__wbg_ptr, ptr0, len0);\n            var r0 = getInt32Memory0()[retptr / 4 + 0];\n            var r1 = getInt32Memory0()[retptr / 4 + 1];\n            var v2 = getArrayU32FromWasm0(r0, r1).slice();\n            wasm.__wbindgen_export_2(r0, r1 * 4, 4);\n            return v2;\n        } finally {\n            wasm.__wbindgen_add_to_stack_pointer(16);\n        }\n    }\n    /**\n    * @param {string} text\n    * @param {any} allowed_special\n    * @param {any} disallowed_special\n    * @returns {any}\n    */\n    encode_with_unstable(text, allowed_special, disallowed_special) {\n        if (wasm == null) throw new Error(\"tiktoken: WASM binary has not been propery initialized.\");\n        try {\n            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);\n            const ptr0 = passStringToWasm0(text, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);\n            const len0 = WASM_VECTOR_LEN;\n            wasm.tiktoken_encode_with_unstable(retptr, this.__wbg_ptr, ptr0, len0, addHeapObject(allowed_special), addHeapObject(disallowed_special));\n            var r0 = getInt32Memory0()[retptr / 4 + 0];\n            var r1 = getInt32Memory0()[retptr / 4 + 1];\n            var r2 = getInt32Memory0()[retptr / 4 + 2];\n            if (r2) {\n                throw takeObject(r1);\n            }\n            return takeObject(r0);\n        } finally {\n            wasm.__wbindgen_add_to_stack_pointer(16);\n        }\n    }\n    /**\n    * @param {Uint8Array} bytes\n    * @returns {number}\n    */\n    encode_single_token(bytes) {\n        if (wasm == null) throw new Error(\"tiktoken: WASM binary has not been propery initialized.\");\n        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_export_0);\n        const len0 = WASM_VECTOR_LEN;\n        const ret = wasm.tiktoken_encode_single_token(this.__wbg_ptr, ptr0, len0);\n        return ret >>> 0;\n    }\n    /**\n    * @param {Uint32Array} tokens\n    * @returns {Uint8Array}\n    */\n    decode(tokens) {\n        if (wasm == null) throw new Error(\"tiktoken: WASM binary has not been propery initialized.\");\n        try {\n            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);\n            const ptr0 = passArray32ToWasm0(tokens, wasm.__wbindgen_export_0);\n            const len0 = WASM_VECTOR_LEN;\n            wasm.tiktoken_decode(retptr, this.__wbg_ptr, ptr0, len0);\n            var r0 = getInt32Memory0()[retptr / 4 + 0];\n            var r1 = getInt32Memory0()[retptr / 4 + 1];\n            var v2 = getArrayU8FromWasm0(r0, r1).slice();\n            wasm.__wbindgen_export_2(r0, r1 * 1, 1);\n            return v2;\n        } finally {\n            wasm.__wbindgen_add_to_stack_pointer(16);\n        }\n    }\n    /**\n    * @param {number} token\n    * @returns {Uint8Array}\n    */\n    decode_single_token_bytes(token) {\n        if (wasm == null) throw new Error(\"tiktoken: WASM binary has not been propery initialized.\");\n        try {\n            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);\n            wasm.tiktoken_decode_single_token_bytes(retptr, this.__wbg_ptr, token);\n            var r0 = getInt32Memory0()[retptr / 4 + 0];\n            var r1 = getInt32Memory0()[retptr / 4 + 1];\n            var v1 = getArrayU8FromWasm0(r0, r1).slice();\n            wasm.__wbindgen_export_2(r0, r1 * 1, 1);\n            return v1;\n        } finally {\n            wasm.__wbindgen_add_to_stack_pointer(16);\n        }\n    }\n    /**\n    * @returns {any}\n    */\n    token_byte_values() {\n        if (wasm == null) throw new Error(\"tiktoken: WASM binary has not been propery initialized.\");\n        const ret = wasm.tiktoken_token_byte_values(this.__wbg_ptr);\n        return takeObject(ret);\n    }\n}\n\nfunction __wbindgen_object_drop_ref(arg0) {\n    takeObject(arg0);\n};\n\nfunction __wbindgen_is_undefined(arg0) {\n    const ret = getObject(arg0) === undefined;\n    return ret;\n};\n\nfunction __wbg_stringify_daa6661e90c04140() { return handleError(function (arg0) {\n    const ret = JSON.stringify(getObject(arg0));\n    return addHeapObject(ret);\n}, arguments) };\n\nfunction __wbindgen_string_get(arg0, arg1) {\n    if (wasm == null) throw new Error(\"tiktoken: WASM binary has not been propery initialized.\");\n    const obj = getObject(arg1);\n    const ret = typeof(obj) === 'string' ? obj : undefined;\n    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);\n    var len1 = WASM_VECTOR_LEN;\n    getInt32Memory0()[arg0 / 4 + 1] = len1;\n    getInt32Memory0()[arg0 / 4 + 0] = ptr1;\n};\n\nfunction __wbindgen_error_new(arg0, arg1) {\n    const ret = new Error(getStringFromWasm0(arg0, arg1));\n    return addHeapObject(ret);\n};\n\nfunction __wbg_parse_06816e879d29d4df() { return handleError(function (arg0, arg1) {\n    const ret = JSON.parse(getStringFromWasm0(arg0, arg1));\n    return addHeapObject(ret);\n}, arguments) };\n\nfunction __wbindgen_throw(arg0, arg1) {\n    throw new Error(getStringFromWasm0(arg0, arg1));\n};\n\n\n\n//# sourceURL=webpack:///./node_modules/tiktoken/tiktoken_bg.js?");

/***/ }),

/***/ "./node_modules/tiktoken/tiktoken_bg.wasm":
/*!************************************************!*\
  !*** ./node_modules/tiktoken/tiktoken_bg.wasm ***!
  \************************************************/
/***/ (() => {

eval("throw new Error(\"Module parse failed: Unexpected character '\\u0000' (1:0)\\nThe module seem to be a WebAssembly module, but module is not flagged as WebAssembly module for webpack.\\nBREAKING CHANGE: Since webpack 5 WebAssembly is not enabled by default and flagged as experimental feature.\\nYou need to enable one of the WebAssembly experiments via 'experiments.asyncWebAssembly: true' (based on async modules) or 'experiments.syncWebAssembly: true' (like webpack 4, deprecated).\\nFor files that transpile to WebAssembly, make sure to set the module type in the 'module.rules' section of the config (e. g. 'type: \\\"webassembly/async\\\"').\\n(Source code omitted for this binary file)\");\n\n//# sourceURL=webpack:///./node_modules/tiktoken/tiktoken_bg.wasm?");

/***/ }),

/***/ "./src/processes/tokenCount.js":
/*!*************************************!*\
  !*** ./src/processes/tokenCount.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("function numTokens(text) {\n  const assert = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'assert'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\n  const { get_encoding } = __webpack_require__(/*! tiktoken */ \"./node_modules/tiktoken/tiktoken.js\");\n\n  const enc = get_encoding(\"gpt2\");\n\n  const encoded = enc.encode(text);\n  const decoded = new TextDecoder().decode(encoded);\n\n  const numToken = encoded.length;\n\n  enc.free();\n  return numToken;\n}\n\nmodule.exports = {\n  numTokens,\n};\n\n\n//# sourceURL=webpack:///./src/processes/tokenCount.js?");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/processes/tokenCount.js");
/******/ 	
/******/ })()
;