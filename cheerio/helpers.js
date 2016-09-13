
export default function(cheerio, global) {
  helpers(cheerio, global)
}

function helpers(cheerio, global) {
  // rename tag e.g. $("div").name("span")
  cheerio.prototype.name = function(tagName) {
      return this.each(function(_, elem) {
          elem.name = tagName;
      });
  };

  cheerio.prototype.hide = function() {
    this.addClass("mw-hide");
  };

  cheerio.prototype.options.withDomLvl1 = false;

  function copy(node, children, next, prev, parent) {
    let attribs = {};
    for(let a in node.attribs) {
      if(node.attribs.hasOwnProperty(a)) {
        attribs[a] = node.attribs[a];
      }
    }
    return {
      type: node.type,
      name: node.name,
      attribs: attribs,
      children: children,
      next: next,
      prev: prev,
      parent: parent
    };
  }

  global.tag = function(name, attribs, content) {
      return {
          type: name === "script" || name === "style" ? name : "tag",
          name: name,
          attribs: attribs || {},
          children: content ? [global.txt(content)] : [],
          next: null,
          prev: null,
          parent: null
      };
  };

  global.txt = function(content) {
      return {
          data: content,
          type: "text",
          next: null,
          prev: null,
          parent: null
      };
  };

  // rename tag e.g. $("div").name("span")
  cheerio.prototype.name = function(tagName) {
      for (let i = 0, len = this.length; i < len; i++) {
          this[i].name = tagName;
      }
      return this;
  };

  // remove all attributes e.g. $("div").removeAttrs()
  cheerio.prototype.removeAttrs = function() {
      for (let i = 0, len = this.length; i < len; i++) {
          this[i].attribs = {};
      }
      return this;
  };

  // string mutators //
  //--------------------

  // mutator function replaces reg1 with reg2
  cheerio.prototype.setText = function(reg1, reg2) {
      this.each(function() {
          var new_text = $(this).text().replace(reg1, reg2);
          $(this).text(new_text);
      });
      return this;
  };

  // mutator sets the text of $this to uppercase
  cheerio.prototype.setUpper = function() {
      var text_upper = this.text().toUpperCase();
      this.text(text_upper);
      return this;
  };

  // mutator sets the text of $this to lowercase
  cheerio.prototype.setLower = function() {
      var text_lower = this.text().toLowerCase();
      this.text(text_lower);
      return this;
  };

  // unwrap
  cheerio.prototype.unwrap = function() {
      var copies = this.children();
      this.after(copies);
      this.remove();
      return this;
  };

  // inject text
  cheerio.prototype.prependText = function(str) {
      var currentString = this.text();
      this.text(str + currentString);
      return this;
  };

  cheerio.prototype.appendText = function(str) {
      var currentString = this.text();
      this.text(currentString + str);
      return this;
  };

  // table dump
  cheerio.prototype.dumpTable = function() {
      this.name("div").addClass("mw-was-table").attr("width", "");
      var nodeName = "";
      this.find("table, tr, td, th, thead, tfoot, tbody").each(function() {
          nodeName = this.name;
          $(this).name("div").attr("width", "").addClass("mw-was-" + nodeName);
      });
  };

  // wrap all text children e.g. $("div").wrapTextChildren("span", {class: "class"})
  // Ignores empty text children if ignore_empty is set to true
  cheerio.prototype.wrapTextChildren = function(node, ignore_empty) {
      if (typeof node !== "object") {
          node = tag.apply(null, arguments);
      }

      for (let i = 0, len = this.length; i < len; i++) {
          let elem = this[i], children = elem.children;
          for (let i = 0, len = children.length; i < len; i++) {
              let child = children[i];
              if (child.type === "text") {
                  if ( (child.data === null || child.data.trim() === "") && ignore_empty === true) {
                      // if empty and we are ignoring empty, do nothing
                  } else {
                      let clone = copy(node, [child], child.next, child.prev, child.parent);
                      let next = child.next, prev = child.prev, root = child.root;
                      if (next) {
                          next.prev = clone;
                      }
                      if (prev) {
                          prev.next = clone;
                      }
                      if (root) {
                          clone.root = root;
                          child.root = null;
                      }
                      child.next = child.prev = null;
                      child.parent = clone;
                      children[i] = clone;
                  }
              }
          }
      }

      return this;
  };

  // wrap all elements e.g. $("span").wrap("div", {class: "class"})
  cheerio.prototype.wrap = function(node) {
      if (typeof node !== "object") {
          node = tag.apply(null, arguments);
      }
      for (let i = 0, len = this.length; i < len; i++) {
          let elem = this[i], parent = elem.parent;
          let siblings = parent ? parent.children : elem.root.children;
          let clone = copy(node, [elem], elem.next, elem.prev, elem.parent);
          let next = elem.next, prev = elem.prev, root = elem.root;
          if (next) {
              next.prev = clone;
          }
          if (prev) {
              prev.next = clone;
          }
          if (root) {
              clone.root = root;
              elem.root = null;
          }
          elem.next = elem.prev = null;
          elem.parent = clone;
          siblings[siblings.indexOf(elem)] = clone;
      }
      return this;
  };

  // wrap inner contents of elements e.g. $("section").wrapInner("div", {class: "class"})
  cheerio.prototype.wrapInner = function(node) {
      if (typeof node !== "object") {
          node = tag.apply(null, arguments);
      }
      for (let i = 0, len = this.length; i < len; i++) {
          let elem = this[i], children = elem.children;
          let clone = copy(node, children, null, null, elem);
          for (let i = 0, len = children.length; i < len; i++) {
              children[i].parent = clone;
          }
          elem.children = [clone];
      }
      return this;
  };

  //add array reverse
  cheerio.prototype.reverse = Array.prototype.reverse;

  // wrap together elements under one node e.g. $("span").wrapTogether("div", {class: "class"})
  // node will inserted before the first element
  cheerio.prototype.wrapTogether = function(node) {
      if (typeof node !== "object") {
          node = tag.apply(null, arguments);
      }
      if (this.length === 0) {
          return this;
      }
      let first = this[0],
          parent = first.parent,
          siblings = parent.children,
          root = first.root;
      first.parent = {};
      let clone = copy(node, Array.prototype.slice.call(this), first.next, first.prev, parent);
      if (root) {
          clone.root = root;
      }

      for (let i = 0, len = this.length; i < len; i++) {
          let elem = this[i],
              next = elem.next,
              prev = elem.prev,
              parent = elem.parent,
              siblings = parent ? parent.children : elem.root.children,
              root = elem.root;
          if (next) {
              next.prev = prev;
          }
          if (prev) {
              prev.next = next;
          }
          elem.next = this[i+1] || null;
          elem.prev = this[i-1] || null;
          elem.parent = clone;
          if (root) {
              elem.root = null;
          }
          if (siblings) {
              siblings.splice(siblings.indexOf(elem), 1);
          }
      }
      siblings[siblings.indexOf(first)] = clone;
      return this;
  };

  cheerio.prototype.replace = function(attr, oldVal, newVal){
      for (let i = 0, len = this.length; i < len; i++) {
          if(this[i].type === "tag") {
              if(this[i].attribs[attr] !== undefined){
                  this[i].attribs[attr] = this[i].attribs[attr].replace(oldVal, newVal);
              }
          }
      }
      return this;
  };

  // Update each selected node with a set of attributes
  // ex $('a').attributes({"data-ur-toggler-component": "button", "class": "mw-button"})
  cheerio.prototype.attributes = function(attributes) {
      for (let i = 0, len = this.length; i < len; i++) {
          for (let attr in attributes) {
            if(attributes.hasOwnProperty(attr)) {
              this[i].attribs[attr] = attributes[attr];
            }
          }
      }
      return this;
  };

  // Remove text nodes from within a selection
  // ex <span><div></div>blah<div></div>blah</span>
  // $("span").removeTextnodes
  // => <span><div></div><div></div></span>
  cheerio.prototype.removeTextNodes = function(){
      for (let i = 0, len = this.length; i < len; i++) {
          let elem = this[i], children = elem.children;
          if(elem.type === "text") {
              elem.remove();
          }
          for (let i = 0, len = children.length; i < len; i++) {
              let child = children[i];
              if (child !== undefined && child.type === "text") {
                  if(child.next !== null){
                      let next_child = child.next;
                      next_child.prev = child.prev;
                  }
                  elem.children.splice(i,1);
              }
          }
      }
      return this;
  };

  // Trim whitespace found within selection
  // Only looks one level deep for whitespace, nested text nodes are untouched
  // ex "<div     >     <a     >        </a></div >"
  // $("div").trim();
  // => "<div><a>        </a></div>"
  cheerio.prototype.trim = function(){
      for (let i = 0, len = this.length; i < len; i++) {
          let elem = this[i], children = elem.children;
          if(elem.type === "text") {
              elem.data.trim();
          }
          for (let i = 0, len = children.length; i < len; i++) {
              let child = children[i];
              if(child.type === "text") {
                  child.data = child.data.trim();
              }
          }
      }
      return this;
  };

  // Remove nodes in selection with no content inside of them
  // Trims the selection, then removes any nodes that have no
  cheerio.prototype.removeIfEmpty = function(){
      this.trim();
      for (let i = 0, len = this.length; i < len; i++) {
          let elem = this[i], children = elem.children;
          if (children === undefined || children.length === 0){
              this.remove(elem);
          }
          if(children.length === 1){
              let child = this.trim.apply(children[0]);
              if (child !== undefined && child.type === "text" && child.data === ""){
                  this.remove(elem);
              }
          }
      }
      return this;
  };

  // Alias for wrapTextChildren with ignore_empty set to true
  cheerio.prototype.wrapNonemptyTextChildren = function(node) {
      return this.wrapTextChildren(node, true);
  };

  // returns a helper function that can do things like:
  // $("div", function() {
  //     this.addClass("class1"); // or $this.addClass("class2");
  //     $("div").addClass("class3"); // only selects descendants
  //     $("span", func...); // only selects descendants
  //     $child("span", func...); // only selects children
  // });
  exports.proxy$ = function($) {

      var proxy = function(selector, context) { // selector, context, root
          if (typeof context !== "function") {
              return $.apply(this, arguments);
          }
          var query = $(selector);
          return query.each(function() {
              var $this = $(this);

              var _$ = global.$;
              var _$this = global.$this;

              // new nested $
              global.$ = function(sel, fn) { return proxy($(sel, query), fn); };
              global.$this = $this;

              var ret = context.call($this);
              global.$ = _$;
              global.$this = _$this;
              return ret;
          });
      };

      global.$child = function(sel, fn) {
          if (typeof sel === "function") {
              fn = sel;
              sel = null;
          }
          return proxy($this.children(sel), fn);
      };

      proxy.$ = $; // keep original cheerio function
      Object.keys($).forEach(function(i) {
          proxy[i] = $[i];
      });
      return proxy;
  };
}
