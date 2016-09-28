import cheerio from 'cheerio';

if (!self) {
  var self = global;
}

cheerio.prototype.options.withDomLvl1 = false;

const slice = Array.prototype.slice;

function copy(node, children, next, prev, parent) {
  return {
    // __proto__: node.__proto__, // uncomment if withDomLvl1 is true
    type: node.type,
    name: node.name,
    attribs: node.attribs,
    children,
    next,
    prev,
    parent,
  };
}

/**
 * @global
 * @param {string} name Name.
 * @param {Array.<string>} attribs Attributes.
 * @param {string} content Content.
 */
self.tag = function(name, attribs, content) {
  let type = name === 'script' || name === 'style' ? name : 'tag';
  return {
    // for some reason <script> and <style> aren't exactly elements in htmlparser2
    // __proto__: type == 'tag' ? ElementPrototype : NodePrototype, // uncomment if withDomLvl1 is true
    type,
    name,
    attribs: attribs || {},
    children: content ? [txt(content)] : [],
    next: null,
    prev: null,
    parent: null,
  };
};
/**
 * @global
 * @param {string} content Content.
 */
self.txt = function(content) {
  return {
    // __proto__: NodePrototype, // uncomment if withDomLvl1 is true
    data: content,
    type: 'text',
    next: null,
    prev: null,
    parent: null,
  };
};
/**
 * @method replace
 * @description Replace the old value of the attribute by a new value.
 * @param {string} attr Attributes.
 * @param {string} oldval Old value.
 * @param {string} newval New value.
 * @returns {Object} The updated form of the original Cheerio matched-set object.
 * @example
 * $body.find("div").replace("data-id", "0", "");
 */
cheerio.prototype.replace = function (attr, oldVal, newVal) {
  for (let i = 0, len = this.length; i < len; i++) {
    if (this[i].type === 'tag') {
      if (this[i].attribs[attr] !== undefined) {
        this[i].attribs[attr] = this[i].attribs[attr].replace(oldVal, newVal);
      }
    }
  }
  return this;
};
/**
 * @method name
 * @description Change the node names of each element in the matched set.
 * @param {string} tagName A string for the new tag name.
 * @returns {Object} The updated form of the original Cheerio matched-set object.
 * @example
 * $body.find("div").name("span");
 */
cheerio.prototype.name = function (tagName) {
  for (let i = 0, len = this.length; i < len; i++) {
    this[i].name = tagName;
  }
  return this;
};
/**
 * @method removeAttrs
 * @description Remove all attributes for each element in the matched set.
 * @returns {Object} The updated form of the original Cheerio matched-set object.
 * @example
 * $body.find("div").removeAttrs();
 */
cheerio.prototype.removeAttrs = function () {
  for (let i = 0, len = this.length; i < len; i++) {
    this[i].attribs = {};
  }
  return this;
};
// [Note: all .wrap()-related methods are all written with a specific signature,
// since the originals naturally accept "tag()" arguments. However, they are
// documented to coerce arguments into that form, so that they can take
// arguments in the way that tag() does.]
/**
 * @method wrapTextChildren
 * @description Wrap any text nodes for each element in the matched set. This includes text nodes that are comprised entirely of whitespace.
 * @param {String} name A string for an element name.
 * @param {Object} [options] An object containing a list of HTML attribute-value pairs.
 * @returns {Object} The updated form of the original Cheerio matched-set object.
 * @example
 * $body.find("div").wrapTextChildren("span", {class: "class"});
 */
cheerio.prototype.wrapTextChildren = function (node, ignoreEmpty) {
  if (typeof node !== 'object') {
    node = tag.apply(null, arguments);
  }
  for (let i = 0, len = this.length; i < len; i++) {
    let elem = this[i], children = elem.children;
    for (let i = 0, len = children.length; i < len; i++) {
      let child = children[i];
      if (child.type === 'text') {
        if ((child.data === null || child.data.trim() === '') && ignoreEmpty === true) {
          // if empty and we are ignoring empty, do nothing
        } else {
          let clone = copy(node, [child], child.next, child.prev, child.parent);
          let next = child.next;
          let prev = child.prev;
          let root = child.root;

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
/**
 * @method wrap
 * @description Wrap each element in the matched set with a newly-defined input element. Note that this is different from the original Cheerio's .wrap() implementation.
 * @param {String} name A string for an element name.
 * @param {Object} [options] An object containing a list of HTML attribute-value pairs.
 * @returns {Object} The updated form of the original Cheerio matched-set object.
 * @example
 * $body.find("span").wrap("div", {class: "class"})
 */
cheerio.prototype.wrap = function(node) {
    if (typeof node !== 'object') {
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
/**
 * @method wrapInner
 * @description Wrap inner contents of each element in the matched set.
 * @param {String} name A string for an element name.
 * @param {Object} [options] An object containing a list of HTML attribute-value pairs.
 * @returns {Object} The updated form of the original Cheerio matched-set object.
 * @example
 * $body.find("section").wrapInner("div", {class: "class"})
 */
cheerio.prototype.wrapInner = function(node) {
    if (typeof node !== 'object') {
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
/**
 * @method wrapTogether
 * @description Wrap all elements in a matched set under a single newly-defined element, and insert this new element where the first element in the matched set once was.
 * @param {String} name A string for an element name.
 * @param {Object} [options] An object containing a list of HTML attribute-value pairs.
 * @returns {Object} The updated form of the original Cheerio matched-set object.
 * @example
 * $body.find("span").wrapTogether("div", {class: "class"})
 */
cheerio.prototype.wrapTogether = function(node) {
    if (typeof node !== 'object') {
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
    let clone = copy(node, slice.call(this), first.next, first.prev, parent);
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
/**
 * @method unwrap
 * @description Remove the wrapping element while retaining selected element itself, for each element in the matched set.
 * @returns {Object} The updated form of the original Cheerio matched-set object.
 * @example
 * $body.find("div").unwrap();
 */
cheerio.prototype.unwrap = function() {
    var copies = this.children();
    this.replaceWith(copies);
};
/**
 * @method attributes
 * @description For each element in the matched set, update its set of attributes. If an attribute in the input is undefined, it will remove that attribute from the selected nodes.
 * @param {Object} attributes Attribute-value pairs in key-value object notation.
 * @returns {Object} The updated form of the original Cheerio matched-set object.
 * @example
 * $body.find("a").attributes({"data-ur-toggler-component": "button", "class": "mw-button"});
 */
cheerio.prototype.attributes = function(attributes) {
    for (let i = 0, len = this.length; i < len; i++) {
        for (let attr in attributes) {
            if (attributes[attr] !== undefined) {
                this[i].attribs[attr] = attributes[attr];
            }
            else {
                delete this[i].attribs[attr];
            }
        }
    }
    return this;
};
/**
 * @method removeTextNodes
 * @description Remove text nodes for each element in the matched set.
 * @returns {Object} The updated form of the original Cheerio matched-set object.
 * @example
 * $body.find("span").removeTextnodes();
 */
cheerio.prototype.removeTextNodes = function() {
    for (let i = 0, len = this.length; i < len; i++) {
        let elem = this[i], children = elem.children;
        if (elem.type === 'text') {
            elem.remove();
        }
        for (let i = 0, len = children.length; i < len; i++) {
            let child = children[i];
            if (child !== undefined && child.type === 'text') {
                if (child.next !== null) {
                    let next_child = child.next;
                    next_child.prev = child.prev;
                }
                elem.children.splice(i,1);
            }
        }
    }
    return this;
};
/**
 * @method trim
 * @description Trim whitespace for each element in the matched set. Only looks one level deep for whitespace; nested text nodes remain untouched.
 * @returns {Object} The updated form of the original Cheerio matched-set object.
 * @example
 * $body.find("div").trim();
 */
cheerio.prototype.trim = function() {
    for (let i = 0, len = this.length; i < len; i++) {
        let elem = this[i], children = elem.children;
        if (elem.type === 'text') {
            elem.data.trim();
        }
        for (let i = 0, len = children.length; i < len; i++) {
            let child = children[i];
            if (child.type === 'text') {
                child.data = child.data.trim();
            }
        }
    }
    return this;
};
/**
 * @method removeIfEmpty
 * @description Remove each element in a matched set, if it has no content inside. Trims the selection, then removes any nodes that have no hide param is for when we can't remove the element(s).
 * @param  {Object}  [options] An object of options.
 * @param  {Boolean} [options.hide] A boolean stating whether the elements should instead have "mw-hide" and "mw-hidden-empty-element" classes added, instead of being removed completely.
 * @return {Object} The updated form of the original Cheerio matched-set object.
 * @example
 * $body.find("#menu").removeIfEmpty();
 */
cheerio.prototype.removeIfEmpty = function (options) {
    options = options || {};
    let elements = this.filter(':not(.mw-not-remove)');
    let elementsKeys = Object.keys(this).reverse().filter(function (value) {
        return !isNaN(+value);
    });
    elementsKeys.forEach(function (key) {
        let element = cheerio(elements[key]);
        element.contents().each(function () {
          let content = cheerio(this);
          if( content[0].type === "text" && content.text().trim() === "") {
            content.remove();
          }
        });
        if(element.contents().length === 0) {
          if(options.hide) {
            element.addClass('mw-hide mw-hidden-empty-element');
          } else {
            element.remove();
          }
        }
    });
    return this;
};
/**
 * @method wrapNonemptyTextChildren
 * @description Wrap any text nodes for each element in the matched set. This differs from wrapTextChildren(), since this ignores text nodes that are comprised entirely of whitespace.
 * @param {String} name A string for an element name.
 * @param {Object} [options] An object containing a list of HTML attribute-value pairs.
 * @returns {Object} The updated form of the original Cheerio matched-set object.
 * @example
 * $body.find("div").wrapNonemptyTextChildren("span", {class: "class"});
 */
cheerio.prototype.wrapNonemptyTextChildren = function(node) {
    if (typeof node !== 'object') {
        node = tag.apply(null, arguments);
    }
    return this.wrapTextChildren(node, true);
};
/**
 * @method setText
 * @description Performs a regular expression replacement for each element in the matched set.
 * @param {string} reg1 Original text.
 * @param {string} reg2 New text.
 * @returns {Object} The updated form of the original Cheerio matched-set object
 * @example
 * $body.find("span").replace("My", "Your");
 */
cheerio.prototype.setText = function(reg1, reg2) {
  this.each(function(i, elem) {
    var new_text = cheerio(elem).text().replace(reg1, reg2);
    cheerio(elem).text(new_text);
  });
  return this;
};
/**
 * @method setUpper
 * @description Sets the text of each element in the matched set to uppercase.
 * @returns {Object} The updated form of the original Cheerio matched-set object
 * @example
 * $body.find("div").setUpper();
 */
cheerio.prototype.setUpper = function() {
  this.each(function(i, elem) {
    var new_text = cheerio(elem).text().toUpperCase();
    cheerio(elem).text(new_text);
  });
  return this;
};
/**
 * @method setLower
 * @description Sets the text of each element in the matched set to lowercase.
 * @returns {Object} The updated form of the original Cheerio matched-set object.
 * @example
 * $body.find("div").setLower();
 */
cheerio.prototype.setLower = function() {
  this.each(function(i, elem) {
    var new_text = cheerio(elem).text().toLowerCase();
    cheerio(elem).text(new_text);
  });
  return this;
};
/**
 * @method dumpTables
 * @description Dumps all tables under each element of the matched set.
 * @return {Object} The updated form of the original Cheerio matched-set object.
 * @example
 * $body.dumpTables();
 */
cheerio.prototype.dumpTables = function() {
  this.find("table, thead, tbody, tfoot, tr, td, th").each(function(){
    let nodeName = this.name;
    cheerio(this).name("div")
      .removeAttr("width")
      .removeAttr("height")
      .removeAttr("style")
      .removeAttr("cellpadding")
      .removeAttr("cellspacing")
      .removeAttr("colspan")
      .removeAttr("rowspan")
      .addClass("mw-was-" + nodeName);
  });
  return this;
}
/**
 * @method dumpTable
 * @description <p>Convert selected tables into a div structure. It removes the original table attributes and adds classnames corresponding to its former node name. The following conversions are made:</p><ul><li>table => div.mw-was-table</li><li>thead => div.mw-was-thead</li><li>tbody => div.mw-was-tbody</li><li>tfoot => div.mw-was-foot</li><li>tr => div.mw-was-tr</li><li>td => div.mw-was-td</li><li>th => div.mw-was-th</li></ul>
 * @return {Object} The updated form of the original Cheerio matched-set object.
 * @example
 * $body.find("table").dumpTable();
 */
cheerio.prototype.dumpTable = function() {
  this.each(function(){
    let nodeName = "";
    if( this.name === "table" ) {
      cheerio(this).name("div")
        .removeAttr("width")
        .removeAttr("height")
        .removeAttr("style")
        .removeAttr("cellpadding")
        .removeAttr("cellspacing")
        .removeAttr("colspan")
        .removeAttr("rowspan")
        .addClass("mw-was-table")
        .find("thead, tbody, tfoot, tr, td, th").each(function(){
          nodeName = this.name;
          cheerio(this).name("div")
            .removeAttr("width")
            .removeAttr("height")
            .removeAttr("style")
            .removeAttr("cellpadding")
            .removeAttr("cellspacing")
            .removeAttr("colspan")
            .removeAttr("rowspan")
            .addClass("mw-was-" + nodeName);
        });
    }
  });
  return this;
}
/**
 * @method revertDumpTable
 * @description Reverts the cheerio.dumpTable back to a table, using the ".mw-was-" classes ascribed by calls to the original .dumpTable() or .dumpTables() methods.
 * @return {Cheerio} The updated form of the original Cheerio matched-set object.
 * @example
 * $body.find(".mw-was-table").revertDumpTable();
 */
cheerio.prototype.revertDumpTable = function() {
  this.each(function(){
    let node = cheerio(this);
    let nodeName = "";
    if(node.hasClass('mw-was-table')) {
      node.name("table")
        .removeClass('mw-was-table')
        .addClass('mw-no-changes mw-table-dump-reverted')
        .find(".mw-was-thead, .mw-was-tbody, .mw-was-tfoot, .mw-was-tr, .mw-was-td, .mw-was-th").each(function() {
            nodeName = cheerio(this).attr('class').match(/mw-was-(.+?)(\s|$)/)[1];
            cheerio(this)
              .removeClass('mw-was-thead mw-was-tbody mw-was-tfoot mw-was-tr mw-was-td mw-was-th')
              .addClass('mw-table-dump-reverted-' + nodeName)
              .name(nodeName);
        });
    }
  });
  return this;
}
/**
 * @method domManipulator
 * @description Manipulates the DOM elements around each of the elements in the matched set, by creating new or moving existing elements around them. Generic wrapper of the .create() and .move() methods (see for more details on positioning specifics).
 * @param {String|Object} element A string for an element name, or a Cheerio object containing a matched set
 * @param {String} position A string for the position where the element should be created ("top", "bottom", "before", or "after")
 * @param {Object} [options] An object containing a list of HTML attribute-value pairs
 * @param {Object} [options.content] A reserved property name within the options object containing the content of the element
 * @return {Object} The updated form of the original Cheerio matched-set object.
 * @example
 * // Create an element and move it to a position
 * $body.find("div").domManipulator("span", "top");
 * @example
 * // Create an element passing some attributes
 * $body.find("div").domManipulator("span", "top", {content: "content of the span", id: * "test"});
 * @example
 * // Move an element to a position
 * $body.find("div").domManipulator($body.find("span"), "after");
 */
cheerio.prototype.domManipulator = function(element, position, options) {
    let currentElement = this;
    options = options || {};
    if(typeof element === 'undefined') {
        throw new TypeError("Cheerio domManipulator - the element param must be an object or a string");
    }
    if(typeof position === 'undefined') {
        throw new TypeError("Cheerio domManipulator - the position param must be a string");
    }
    element = typeof element === 'string'
                    ?
                        cheerio(!/<.*?>/.test(element)
                            ? tag(element)
                            : element)
                    : element;
    if(!element.length) {
        return this;
    }
    if(options.content) {
        element.text(options.content);
        delete options.content;
    }
    if(Object.keys(options).length) {
        element.attr(options);
    }
    //Data dictionary of cheerio positions
    let positions = {
        top     : 'prepend',
        bottom  : 'append',
        after   : 'after',
        before  : 'before'
    };
    //Get cheerio position(it will be used as cheerio function, like $('.element').append..)
    let cheerioPosition = positions[position];
    if(typeof cheerioPosition === 'undefined') {
        throw new TypeError("Cheerio Create - The position " + position + ' doesn\'t exist.');
    }
    //Execute the cheerio function
    currentElement[cheerioPosition](element);
    return currentElement;
};
/**
 * @method create
 * @description Creates a new element for each of the elements in the matched set, at the specified position.
 * @param  {String} element A string for an element name
 * @param  {String} position A string for the position where the element should be created ("top", "bottom", "before", or "after")
 * @param  {Object} [options] An object containing a list of HTML attribute-value pairs
 * @param  {Object} [options.content] A reserved property name within the options object containing the content of the element
 * @return {Object} The updated form of the original Cheerio matched-set object.
 * @example
 * let $testElement = $body.find("a").create("span", "top", {class: "mw-test", content: "New test element"});
 * $testElement.attr("data-test", "This modifies the anchors, not the newly-created spans");
 */
cheerio.prototype.create = function(element, position, options) {
    if(typeof element !== 'string') {
        throw new TypeError("Cheerio create - the element param must be a string");
    }
    if(typeof position === 'undefined') {
        throw new TypeError("Cheerio create - the position param must be a string");
    }
    this.domManipulator.apply(this, arguments);
    return this;
};
/**
 * @method createTop
 * @description Creates a new element at the top of each element in the matched set. Synonymous to the legacy .create_top() method.
 * @param  {String} element A string for an element name
 * @param  {Object} [options] An object containing a list of HTML attribute-value pairs
 * @param  {Object} [options.content] A reserved property name within the options object containing the content of the element
 * @return {Object} The updated form of the original Cheerio matched-set object.
 * @example
 * let $testElement = $body.find("a").createTop("span", {class: "mw-test", content: "New test element"});
 * $testElement.attr("data-test", "This modifies the anchors, not the newly-created spans");
 */
cheerio.prototype.createTop = cheerio.prototype.create_top = function(element, options) {
  this.create.call(this, element, 'top', options);
  return this;
};
/**
 * @method createBottom
 * @description Creates a new element at the bottom of each element in the matched set. Synonymous to the legacy .create_bottom() method.
 * @param  {String} element A string for an element name
 * @param  {Object} [options] An object containing a list of HTML attribute-value pairs
 * @param  {Object} [options.content] A reserved property name within the options object containing the content of the element
 * @return {Object} The updated form of the original Cheerio matched-set object.
 * let $testElement = $body.find("a").createBottom("span", {class: "mw-test", content: "New test element"});
 * $testElement.attr("data-test", "This modifies the anchors, not the newly-created spans");
 */
cheerio.prototype.createBottom = cheerio.prototype.create_bottom = function(element, options) {
  this.create.call(this, element, 'bottom', options);
  return this;
};
/**
 * @method createAfter
 * @description Creates a new element after each element in the matched set. Synonymous to the legacy .create_after() method.
 * @param  {String} element A string for an element name
 * @param  {Object} [options] An object containing a list of HTML attribute-value pairs
 * @param  {Object} [options.content] A reserved property name within the options object containing the content of the element
 * @return {Object} The updated form of the original Cheerio matched-set object.
 * let $testElement = $body.find("a").createAfter("span", {class: "mw-test", content: "New test element"});
 * $testElement.attr("data-test", "This modifies the anchors, not the newly-created spans");
 */
cheerio.prototype.createAfter = cheerio.prototype.create_after = function(element, options) {
  this.create.call(this, element, 'after', options);
  return this;
};
/**
 * @method createBefore
 * @description Creates a new element before each element in the matched set. Synonymous to the legacy .create_before() method.
 * @param  {String} element A string for an element name
 * @param  {Object} [options] An object containing a list of HTML attribute-value pairs
 * @param  {Object} [options.content] A reserved property name within the options object containing the content of the element
 * @return {Object} The updated form of the original Cheerio matched-set object.
 * let $testElement = $body.find("a").createBefore("span", {class: "mw-test", content: "New test element"});
 * $testElement.attr("data-test", "This modifies the anchors, not the newly-created spans");
 */
cheerio.prototype.createBefore = cheerio.prototype.create_before = function(element, options) {
  this.create.call(this, element, 'before', options);
  return this;
};
/**
 * @method move
 * @description Moves all elements in an input matched set to a specified position of each element in the selected matched set. If there's more than one element in the selected matched set, each "moved" element is duplicated.
 * @param {Object} element A Cheerio object containing a matched set
 * @param {String} position A string for a position where the element should be moved ("top", "bottom", "before", or "after")
 * @param  {Object} [options] An object containing a list of HTML attribute-value pairs to add to or replace any existing set of attributes.
 * @param  {Object} [options.content] A reserved property name within the options object containing the content of the element
 * @return {Object} The updated form of the original Cheerio matched-set object.
 * @example
 * let $testElement = $body.find("#top").move($body.find("a"), "bottom", {class: "mw-test"});
 * $testElement.attr("data-test", "This modifies the #top element");
 */
cheerio.prototype.move = function(element, position, options) {
    if(typeof element === 'undefined' || Object.prototype.toString.call(element) !== '[object Object]') {
        throw new TypeError("Cheerio create - the element param must be an object");
    }
    if(typeof position === 'undefined') {
        throw new TypeError("Cheerio create - the position param must be a string");
    }
    this.domManipulator.apply(this, arguments);
    return this;
};
/**
 * @method moveTop
 * @description Moves all elements in an input matched set to the top of each element in the selected matched set. If there's more than one element in the selected matched set, each "moved" element is duplicated.
 * @param {Object} element A Cheerio object containing a matched set
 * @param  {Object} [options] An object containing a list of HTML attribute-value pairs to add to or replace any existing set of attributes.
 * @param  {Object} [options.content] A reserved property name within the options object containing the content of the element
 * @return {Object} The updated form of the original Cheerio matched-set object.
 * @example
 * let $testElement = $body.find("#top").moveTop($body.find("a"), {class: "mw-test"});
 * $testElement.attr("data-test", "This modifies the #top element");
 */
cheerio.prototype.moveTop = cheerio.prototype.move_top = function(element, options) {
  this.move.call(this, element, 'top', options);
  return this;
};
/**
 * @method moveBottom
 * @description Moves all elements in an input matched set to the bottom of each element in the selected matched set. If there's more than one element in the selected matched set, each "moved" element is duplicated.
 * @param {Object} element A Cheerio object containing a matched set
 * @param  {Object} [options] An object containing a list of HTML attribute-value pairs to add to or replace any existing set of attributes.
 * @param  {Object} [options.content] A reserved property name within the options object containing the content of the element
 * @return {Object} The updated form of the original Cheerio matched-set object.
 * @example
 * let $testElement = $body.find("#top").moveBottom($body.find("a"), {class: "mw-test"});
 * $testElement.attr("data-test", "This modifies the #top element");
 */
cheerio.prototype.moveBottom = cheerio.prototype.move_bottom = function(element, options) {
  this.move.call(this, element, 'bottom', options);
  return this;
};
/**
 * @method moveAfter
 * @description Moves all elements in an input matched set after each element in the selected matched set. If there's more than one element in the selected matched set, each "moved" element is duplicated.
 * @param {Object} element A Cheerio object containing a matched set
 * @param  {Object} [options] An object containing a list of HTML attribute-value pairs to add to or replace any existing set of attributes.
 * @param  {Object} [options.content] A reserved property name within the options object containing the content of the element
 * @return {Object} The updated form of the original Cheerio matched-set object.
 * @example
 * let $testElement = $body.find("#top").moveAfter($body.find("a"), {class: "mw-test"});
 * $testElement.attr("data-test", "This modifies the #top element");
 */
cheerio.prototype.moveAfter = cheerio.prototype.move_after = function(element, options) {
  this.move.call(this, element, 'after', options);
  return this;
};
/**
 * @method moveBefore
 * @description Moves all elements in an input matched set before each element in the selected matched set. If there's more than one element in the selected matched set, each "moved" element is duplicated.
 * @param {Object} element A Cheerio object containing a matched set
 * @param  {Object} [options] An object containing a list of HTML attribute-value pairs to add to or replace any existing set of attributes.
 * @param  {Object} [options.content] A reserved property name within the options object containing the content of the element
 * @return {Object} The updated form of the original Cheerio matched-set object.
 * @example
 * let $testElement = $body.find("#top").moveBefore($body.find("a"), {class: "mw-test"});
 * $testElement.attr("data-test", "This modifies the #top element");
 */
cheerio.prototype.moveBefore = cheerio.prototype.move_before = function(element, options) {
  this.move.call(this, element, 'before', options);
  return this;
};
/**
 * @method prependText
 * @description Prepends an input string to each element in the matched set. This coerces any text or any children into text, before prepending the input string.
 * @param {string} str Text to be prepended for each matched element.
 * @returns {Object} The updated form of the original Cheerio matched-set object.
 * @example
 * let $headline = $body.find(".headline").prependText(", some extra text");
 * $headline.text(", and even more text");
 */
cheerio.prototype.prependText = function(str) {
  this.each(function(i, elem) {
    var currentString = cheerio(elem).text();
    cheerio(elem).text(str + currentString);
  });
  return this;
};
/**
 * @method appendText
 * @description Appends an input string to each element in the matched set. This coerces any text or any children into text, before appending the input string.
 * @param {string} str Text to be appended for each matched element.
 * @returns {Object} The updated form of the original Cheerio matched-set object.
 * @example
 * let $headline = $body.find(".headline").appendText(", some extra text");
 * $headline.text(", and even more text");
 */
cheerio.prototype.appendText = function(str) {
  this.each(function(i, elem) {
    var currentString = cheerio(elem).text();
    cheerio(elem).text(currentString + str);
  });
  return this;
};
/**
 * @method makeToggler
 * @description Create a Uranium toggler using the default classes and elements of the project, retaining the consistency between them.
 * @param {Object} options An object containing specified toggler options.
 * @param {String} options.container A string for the selector for the toggler container (data-ur-set="toggler").
 * @param {String} options.button A string for the selector for the toggler button (data-ur-toggler-component="button").
 * @param {String} options.content A string for the selector for the toggler content (data-ur-toggler-component="content").
 * @param {String} [options.skin] A string for a class that "skins" the toggler container.
 * @param {Boolean} [options.keepOpened] A boolean for whether all togglers should be opened by default.
 * @param {String} [options.viewMoreText] It's the text of the main category. It's the main category created by wrapLink
 * @param {String} [options.wrapLink] A string for a wrapper element around the toggler button.
 * @return {Object} The updated form of the original Cheerio matched-set object.
 * @example
 * // Simple Toggler
 * $body.find("ul").makeToggler({content: "li", button: "a", content: "ul"});
 * @example
 * // Toggler with skin
 * $body.find("ul").makeToggler({content: "li", button: "a", content: "ul" skin: "mw-blue-toggler"});
 * @example
 * // Toggler with wrapLink
 * $body.find("ul").makeToggler({content: "li", button: "a", content: "ul", wrapLink: "link", viewMoreText: "View all"});
 */
cheerio.prototype.makeToggler = function(options) {
    if(Object.prototype.toString.call(options) !== '[object Object]') {
        throw new TypeError("Cheerio makeToggler - the options should an object");
    }
    let wrap = this;
    let container = wrap.find(options.container);
    let wrapLink = options.wrapLink;
    let skin = options.skin;
    wrap.addClass('mw-toggler-main-wrap');
    container.removeIfEmpty();
    if(!container.length) {
        return this;
    }
    options.content = options.content || '';
    wrap.children(container).addClass('mw-toggle-depth-1');
    // Wrap link
    if(wrapLink) {
        let firstDepthButtons = wrap.find('.mw-toggle-depth-1').children(options.button);
        if(options.content === '') {
            throw new TypeError("Cheerio makeToggler - the option.content must be passed if wrapLink is required");
        }
        firstDepthButtons.each(function () {
            let firstDepthButton = cheerio(this);
            let firstDepthContainer = firstDepthButton.parent();
            let firstDepthContent = firstDepthContainer.children(options.content);
            if(wrapLink && firstDepthButton.is('a')) {
                let buttonCopy = firstDepthButton.clone();
                buttonCopy.text(options.viewMoreText || 'See all');
                buttonCopy = cheerio(tag(wrapLink, { class: 'mw-wrap-link-toggler' })).append(buttonCopy);
                firstDepthContent.prepend(buttonCopy);
                firstDepthButton.name('div').removeAttr('href');
            }
        });
        container = wrap.find(options.container);
    }
    container.each(function () {
        container = cheerio(this);
        let button = container.children(options.button, '.mw-toggler-was-link-button');
        let content = container.children(options.content);
        container.addClass('mw-toggler-container mw-default-toggler');
        if(skin) {
          container.addClass(skin);
          container.closest('.mw-toggler-main-wrap').addClass(skin + '-wrap');
        }
        button.addClass('mw-toggler-button');
        if(button.find('img').length || button.find('.mw-icon').length) {
          let togglerIcon = button.children('img');
          if(!togglerIcon.length) {
            togglerIcon = button.children('.mw-icon');
          }
          togglerIcon.addClass('mw-toggler-button-icon');
          button.wrapTextChildren('span', { class: 'mw-toggler-button-text' });
          button.filter(':not(.mw-toggler-button-icon)').wrapTogether('span', { class: 'mw-toggler-button-content' });
          button.closest('.mw-toggler-container').addClass('mw-toggler-with-icon');
        }
        if(content.children().length) {
          let urState = typeof options.keepOpened !== 'undefined' ? 'enabled' : 'disabled';
          content.addClass('mw-toggler-content');
          if(!options.keepOpened) {
            container.attr('data-ur-set', 'toggler');
            content.attr({
                      'data-ur-toggler-component': 'content',
                      'data-ur-state': urState
                    });
            button.attr({
                    'data-ur-toggler-component': 'button',
                    'data-ur-state': urState
                   });
          }
        } else {
            container.addClass('mw-toggler-no-content');
        }
    });
    return this;
};
