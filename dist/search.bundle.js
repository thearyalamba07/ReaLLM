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

/***/ "./src/processes/googleSearch.js":
/*!***************************************!*\
  !*** ./src/processes/googleSearch.js ***!
  \***************************************/
/***/ ((module) => {

eval("function googleSearch(query) {\n  const apiKey = \"AIzaSyCYzjs8J5sX4R75sI6fuN7Zwm1YyDX9tMw\";\n  const cx = \"a11f3384e1cf243a3\";\n  const encodedQuery = encodeURIComponent(query);\n  const numResults = 3;\n  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodedQuery}&num=${numResults}`;\n\n  fetch(url)\n    .then((response) => response.json())\n    .then((data) => {\n      const results = data.items.map((item) => ({\n        title: item.title,\n        link: item.link,\n      }));\n      console.log(results);\n    })\n    .catch((error) => {\n      console.error(\"Error fetching search results:\", error);\n    });\n}\n\nmodule.exports = {\n  googleSearch,\n};\n\n\n//# sourceURL=webpack:///./src/processes/googleSearch.js?");

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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/processes/googleSearch.js");
/******/ 	
/******/ })()
;