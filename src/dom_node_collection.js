class DOMNodeCollection {
  constructor(array) {      // receives an array of HTML elements
    this.array = array;
  } 

  html(string) {
    if (string === undefined) {
      return this.array[0].innerHTML;   //=> returns content
    } else {
      this.array.forEach( (el)=> {
        el.innerHTML = string         // inserts string into el element <p> 'hello' </p>
      });
    }
  }

  empty() {
    this.array.forEach( el => {
      el.innerHTML = '';          // before  <p> 'hello' </p>   ->    <p> </p>
    });
  }

  append(arg) {         // <div> 
    this.array.forEach(el => {
      if (typeof arg === 'string') {
        el.innerHTML += arg;
      } else if (arg instanceof HTMLElement) {
        debugger
        el.innerHTML += arg.outerHTML;       // <p> <div></div> <p>
      } else {        // if we receive a jquery object
        arg.array.forEach( (html) => {         // each thing inside the jquery object is an instance of HTML element
          el.innerHTML += html.outerHTML;
        } )
      }
    })
  }

  attr(attribute, value) {
    if (value === undefined) {
      for (let i = 0; i < this.array.length; i++) {
        let el = this.array[i];
        return el.getAttribute(attribute);
      }
    } else {
      for (let i = 0; i < this.array.length; i++) {
        let el = this.array[i];
        return el.setAttribute(attribute, value);
      }
    }
  }


  addClass(className) {     // string ex. "p"
    this.array.forEach( el=> {
      el.classList.add(className);
    });
  }


  removeClass(className) {     // string ex. "p"
    this.array.forEach(el => {
      el.classList.remove(className);
    });
  }

  children(){
    let allChildren = [];

    this.array.forEach(el => {
      let childrenArr = el.children  
      allChildren = [...allChildren, ...childrenArr] 
      // allChildren = allChildren.concat(childrenArr) 
    });

    return new DOMNodeCollection(allChildren);
  }

  parent() {
    let allParents = [];
    this.array.forEach( el=> {
      allParents.push(el.parentNode);
    });

    return new DOMNodeCollection(allParents);
  }


  find(selector) {
    let array = [];

    this.array.forEach ( el=> {
      let nodeList = el.querySelectorAll(selector);
      array = [...array, ...Array.from(nodeList)];
    })
    return new DOMNodeCollection(array)
  }
  

  remove() {
    this.array.forEach( el=> {
      el.remove();
    });
  }

  on(eventType, callback) {
    this.callback = callback;
    this.array.forEach (el => {
      el.addEventListener(eventType, this.callback)
    })
  }

  off(eventType) {
    this.array.forEach(el => {
      el.removeEventListener(eventType, this.callback)
    });
  }
}

module.exports = DOMNodeCollection;