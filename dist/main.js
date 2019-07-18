/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor(array) {      // receives an array of HTML elements\n    this.array = array;\n  } \n\n  html(string) {\n    if (string === undefined) {\n      return this.array[0].innerHTML;   //=> returns content\n    } else {\n      this.array.forEach( (el)=> {\n        el.innerHTML = string         // inserts string into el element <p> 'hello' </p>\n      });\n    }\n  }\n\n  empty() {\n    this.array.forEach( el => {\n      el.innerHTML = '';          // before  <p> 'hello' </p>   ->    <p> </p>\n    });\n  }\n\n  append(arg) {         // <div> \n    this.array.forEach(el => {\n      if (typeof arg === 'string') {\n        el.innerHTML += arg;\n      } else if (arg instanceof HTMLElement) {\n        debugger\n        el.innerHTML += arg.outerHTML;       // <p> <div></div> <p>\n      } else {        // if we receive a jquery object\n        arg.array.forEach( (html) => {         // each thing inside the jquery object is an instance of HTML element\n          el.innerHTML += html.outerHTML;\n        } )\n      }\n    })\n  }\n\n  attr(attribute, value) {\n    if (value === undefined) {\n      for (let i = 0; i < this.array.length; i++) {\n        let el = this.array[i];\n        return el.getAttribute(attribute);\n      }\n    } else {\n      for (let i = 0; i < this.array.length; i++) {\n        let el = this.array[i];\n        return el.setAttribute(attribute, value);\n      }\n    }\n  }\n\n\n  addClass(className) {     // string ex. \"p\"\n    this.array.forEach( el=> {\n      el.classList.add(className);\n    });\n  }\n\n\n  removeClass(className) {     // string ex. \"p\"\n    this.array.forEach(el => {\n      el.classList.remove(className);\n    });\n  }\n\n  children(){\n    let allChildren = [];\n\n    this.array.forEach(el => {\n      let childrenArr = el.children  \n      allChildren = [...allChildren, ...childrenArr] \n      // allChildren = allChildren.concat(childrenArr) \n    });\n\n    return new DOMNodeCollection(allChildren);\n  }\n\n  parent() {\n    let allParents = [];\n    this.array.forEach( el=> {\n      allParents.push(el.parentNode);\n    });\n\n    return new DOMNodeCollection(allParents);\n  }\n\n\n  find(selector) {\n    let array = [];\n\n    this.array.forEach ( el=> {\n      let nodeList = el.querySelectorAll(selector);\n      array = [...array, ...Array.from(nodeList)];\n    })\n    return new DOMNodeCollection(array)\n  }\n  \n\n  remove() {\n    this.array.forEach( el=> {\n      el.remove();\n    });\n  }\n\n  on(eventType, callback) {\n    this.callback = callback;\n    this.array.forEach (el => {\n      el.addEventListener(eventType, this.callback)\n    })\n  }\n\n  off(eventType) {\n    this.array.forEach(el => {\n      el.removeEventListener(eventType, this.callback)\n    });\n  }\n}\n\nmodule.exports = DOMNodeCollection;\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./src/dom_node_collection.js\");\n\n// document.addEventListener(\"DOMContentLoaded\", (event) => {\n//   console.log('DOM is ready.')\n// });\nlet functions = [];\nlet docReady = false;\n\n// window.paragraph = document.createElement(\"P\")\nfunction $l(arg) {\n  \n  if (typeof arg === 'string') {\n    \n    const nodeList = document.querySelectorAll(arg);\n    const array = Array.from(nodeList);\n    // const dom = new DOMNodeCollection(array);\n    return new DOMNodeCollection(array);\n  } else if (arg instanceof HTMLElement) {    // arg is an html element\n    debugger\n    const htmlArray = [];\n    htmlArray.push(arg);\n    // const dom = new DOMNodeCollection(htmlArray);\n    return new DOMNodeCollection(htmlArray);\n  } else if (typeof arg === \"function\") {\n    if (docReady) {\n      arg();\n    } else {\n      functions.push(arg); \n    }\n  }\n  \n}\n\n// window.$l( ()=> console.log('finaltest') );\n\n$l.prototype.extend = function(...args) {\n  let result = {};\n  for (let i = 0; i < args.length; i++) {\n    let arg = args[i]; // {a: a, b: b}\n    result = {...result, ...arg} \n  }\n  return result;\n}\n\n$l.prototype.ajax = function(obj) {\n  let defaults = {\n    success: () => console.log('yay'),\n    error: () => console.log('oh no'),\n    url: google.com,\n    method: 'GET',\n    data: 'data',\n    contentType: 'json'\n  }\n\n  let options = this.extend(defaults, obj)\n\n  // step 1 - create xhr object\n  const xhr = new XMLHttpRequest();\n\n  // step 2 - specify path and verb\n  xhr.open(options['method'], options['url']);\n\n  // step 3 - register a callback\n  xhr.onload = function () {\n    console.log(xhr.status)         // for status info\n    console.log(xhr.responseType)   //the type of data that was returned\n    console.log(xhr.response)       //the actual response. For JSON api calls, this will be a JSON string\n  }\n\n  // step 4 - send off the request with optional data\n  const optionalData = options['data'];\n  xhr.send(optionalData);\n\n}\n\n\nwindow.$l = $l;\n\ndocument.addEventListener(\"DOMContentLoaded\", (event) => {\n  docReady = true;\n  // console.log('before')\n  // console.log(functions)\n  functions.forEach(func => func());\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });