/**
 * JSX transpiler.
 */

module.exports = {
  transform: transform,
  transformFile: transformFile,
  tags: require('./tags')
};

/**
 * Dependencies.
 */

var fs = require('fs');
var jstransform = require('jstransform').transform;
var Syntax = require('jstransform/node_modules/esprima-fb').Syntax;
var utils = require('jstransform/src/utils');
var knownTags = require('./tags');

/**
 * Desugar JSX and return transformed string.
 *
 * Known tags are passed as arguments to JSX ident (assume `@jsx virtualdom.h`):
 *
 *   `<div class="blue"></div>` => `virtualdom.h('div', { class: 'blue' })`
 *
 * Unknown tags are assumed to be function names in scope:
 *
 *   `<FrontPage class="blue"></FrontPage>` => `FrontPage({ class: 'blue' })`
 *
 * @param {String} str
 * @param {Object=} options
 * @param {Boolean=false} options.ignoreDocblock Parse files without docblock. If true
 * `options.jsx` must also be set.
 * @param {Array=} options.tags list of known tags (default: exports.tags)
 * @param {Boolean=false} options.tagMethods Use tag name as method of jsx ident
 * instead of argument. If true `DOM.h1()` instead of `DOM("h1")`.
 * @param {String} options.jsx Constructor name (default: set by docblock).
 * @return {String}
 * @api public
 */

function transform(str, options) {
  if (options && options.ignoreDocblock && !options.jsx) {
    throw new Error("options.jsx must be specified if ignoring docblocks");
  }
  return jstransform([visitNode], str, options).code;
};

/**
 * @see {@link transform} for usage.
 */

function transformFile(path, options) {
  return transform(fs.readFileSync(path, 'utf8'), options);
};

/**
 * Visit tag node and desugar JSX.
 *
 * @see {@link https://github.com/facebook/jstransform}
 * @api private
 */

function visitNode(traverse, object, path, state) {
  var options = state.g.opts;
  var ident = (options.jsx || utils.getDocblock(state).jsx);
  var openingEl = object.openingElement;
  var closingEl = object.closingElement;
  var nameObj = openingEl.name;
  var attributes = openingEl.attributes;

  utils.catchup(openingEl.range[0], state, trimLeft);

  var knownTag = (~knownTags.indexOf(nameObj.name)
                  && nameObj.type === Syntax.XJSIdentifier);

  if (knownTag) {
    utils.append(ident + (options.tagMethods ? '.' : "('"), state);
  }

  utils.move(nameObj.range[0], state);
  utils.catchup(nameObj.range[1], state);

  utils.append((!knownTag || options.tagMethods) ? '(' : "', ", state);

  if (attributes.length) {
    utils.append('{', state);
  } else {
    utils.append('null', state);
  }

  attributes.forEach(function(attr, index) {
    var isLast = (index === (attributes.length - 1));
    var name = attr.name.name;

    utils.catchup(attr.range[0], state, trimLeft);

    utils.append(quoteJSObjKey(name) + ': ', state);

    if (attr.value) {
      utils.move(attr.name.range[1], state);
      utils.catchupNewlines(attr.value.range[0], state);
      if (attr.value.type === Syntax.Literal) {
        renderXJSLiteral(attr.value, isLast, state);
      } else {
        renderXJSExpressionContainer(traverse, attr.value, isLast, path, state);
      }
    } else {
      state.g.buffer += 'true';
      state.g.position = attr.name.range[1];
      if (!isLast) {
        utils.append(', ', state);
      }
    }

    utils.catchup(attr.range[1], state, trimLeft);
  });

  if (!openingEl.selfClosing) {
    utils.catchup(openingEl.range[1] - 1, state, trimLeft);
    utils.move(openingEl.range[1], state);
  }

  if (attributes.length) {
    utils.append('}', state);
  }

  var children = object.children.filter(function(child) {
    return !(child.type === Syntax.Literal
             && typeof child.value === 'string'
             && child.value.match(/^[ \t]*[\r\n][ \t\r\n]*$/));
  });

  if (children.length) {
    var lastRenderableIndex;

    children.forEach(function(child, index) {
      if (child.type !== Syntax.XJSExpressionContainer ||
          child.expression.type !== Syntax.XJSEmptyExpression) {
        lastRenderableIndex = index;
      }
    });

    if (lastRenderableIndex !== undefined) {
      utils.append(', ', state);
    }

    if (children.length) {
      utils.append('[', state);
    }

    children.forEach(function(child, index) {
      utils.catchup(child.range[0], state, trimLeft);

      var isFirst = index === 0;
      var isLast = index >= lastRenderableIndex;

      if (child.type === Syntax.Literal) {
        renderXJSLiteral(child, isLast, state);
      } else if (child.type === Syntax.XJSExpressionContainer) {
        renderXJSExpressionContainer(traverse, child, isLast, path, state);
      } else {
        traverse(child, path, state);
        if (!isLast) {
          utils.append(',', state);
        }
      }

      utils.catchup(child.range[1], state, trimLeft);
    });
  }

  if (openingEl.selfClosing) {
    // everything up to />
    utils.catchup(openingEl.range[1] - 2, state, trimLeft);
    utils.move(openingEl.range[1], state);
  } else {
    // everything up to </close>
    utils.catchup(closingEl.range[0], state, trimLeft);
    utils.move(closingEl.range[1], state);
  }

  if (children.length) {
    utils.append(']', state);
  }

  utils.append(')', state);

  return false;
};

/**
 * Test if tag is JSX tag.
 *
 * @param {Object} object
 * @param {String} path
 * @param {Object} state
 * @api private
 */

visitNode.test = function(object, path, state) {
  var jsx = utils.getDocblock(state).jsx || state.g.opts.ignoreDocblock;
  return object.type === Syntax.XJSElement && jsx;
};

/**
 * Taken from {@link https://github.com/facebook/react/blob/0.10-stable/vendor/fbtransform/transforms/xjs.js}
 */

function renderXJSLiteral(object, isLast, state, start, end) {
  var lines = object.value.split(/\r\n|\n|\r/);

  if (start) {
    utils.append(start, state);
  }

  var lastNonEmptyLine = 0;

  lines.forEach(function (line, index) {
    if (line.match(/[^ \t]/)) {
      lastNonEmptyLine = index;
    }
  });

  lines.forEach(function (line, index) {
    var isFirstLine = index === 0;
    var isLastLine = index === lines.length - 1;
    var isLastNonEmptyLine = index === lastNonEmptyLine;

    // replace rendered whitespace tabs with spaces
    var trimmedLine = line.replace(/\t/g, ' ');

    // trim whitespace touching a newline
    if (!isFirstLine) {
      trimmedLine = trimmedLine.replace(/^[ ]+/, '');
    }
    if (!isLastLine) {
      trimmedLine = trimmedLine.replace(/[ ]+$/, '');
    }

    if (!isFirstLine) {
      utils.append(line.match(/^[ \t]*/)[0], state);
    }

    if (trimmedLine || isLastNonEmptyLine) {
      utils.append(
        JSON.stringify(trimmedLine) +
        (!isLastNonEmptyLine ? " + ' ' +" : ''),
        state);

      if (isLastNonEmptyLine) {
        if (end) {
          utils.append(end, state);
        }
        if (!isLast) {
          utils.append(', ', state);
        }
      }

      // only restore tail whitespace if line had literals
      if (trimmedLine && !isLastLine) {
        utils.append(line.match(/[ \t]*$/)[0], state);
      }
    }

    if (!isLastLine) {
      utils.append('\n', state);
    }
  });

  utils.move(object.range[1], state);
}

/**
 * Taken from {@link https://github.com/facebook/react/blob/0.10-stable/vendor/fbtransform/transforms/xjs.js}
 */

function renderXJSExpressionContainer(traverse, object, isLast, path, state) {
  // Plus 1 to skip `{`.
  utils.move(object.range[0] + 1, state);
  traverse(object.expression, path, state);

  if (!isLast && object.expression.type !== Syntax.XJSEmptyExpression) {
    // If we need to append a comma, make sure to do so after the expression.
    utils.catchup(object.expression.range[1], state, trimLeft);
    utils.append(', ', state);
  }

  // Minus 1 to skip `}`.
  utils.catchup(object.range[1] - 1, state, trimLeft);
  utils.move(object.range[1], state);
  return false;
}

// Quote invalid object literal keys.
function quoteJSObjKey(name) {
  if (!/^[a-z_$][a-z\d_$]*$/i.test(name)) {
    return "'" + name + "'";
  }
  return name;
};

// Trim whitespace left of `val`.
function trimLeft(val) {
  return val.replace(/^ +/, '');
};
