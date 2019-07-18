const DOMNodeCollection = require('./dom_node_collection.js');

// document.addEventListener("DOMContentLoaded", (event) => {
//   console.log('DOM is ready.')
// });
let functions = [];
let docReady = false;

// window.paragraph = document.createElement("P")
function $l(arg) {
  
  if (typeof arg === 'string') {
    
    const nodeList = document.querySelectorAll(arg);
    const array = Array.from(nodeList);
    // const dom = new DOMNodeCollection(array);
    return new DOMNodeCollection(array);
  } else if (arg instanceof HTMLElement) {    // arg is an html element
    debugger
    const htmlArray = [];
    htmlArray.push(arg);
    // const dom = new DOMNodeCollection(htmlArray);
    return new DOMNodeCollection(htmlArray);
  } else if (typeof arg === "function") {
    if (docReady) {
      arg();
    } else {
      functions.push(arg); 
    }
  }
  
}

// window.$l( ()=> console.log('finaltest') );

$l.prototype.extend = function(...args) {
  let result = {};
  for (let i = 0; i < args.length; i++) {
    let arg = args[i]; // {a: a, b: b}
    result = {...result, ...arg} 
  }
  return result;
}

$l.prototype.ajax = function(obj) {
  let defaults = {
    success: () => console.log('yay'),
    error: () => console.log('oh no'),
    url: google.com,
    method: 'GET',
    data: 'data',
    contentType: 'json'
  }

  let options = this.extend(defaults, obj)

  // step 1 - create xhr object
  const xhr = new XMLHttpRequest();

  // step 2 - specify path and verb
  xhr.open(options['method'], options['url']);

  // step 3 - register a callback
  xhr.onload = function () {
    console.log(xhr.status)         // for status info
    console.log(xhr.responseType)   //the type of data that was returned
    console.log(xhr.response)       //the actual response. For JSON api calls, this will be a JSON string
  }

  // step 4 - send off the request with optional data
  const optionalData = options['data'];
  xhr.send(optionalData);

}


window.$l = $l;

document.addEventListener("DOMContentLoaded", (event) => {
  docReady = true;
  // console.log('before')
  // console.log(functions)
  functions.forEach(func => func());
});