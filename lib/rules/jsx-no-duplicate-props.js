/**
 * @fileoverview Enforce no duplicate props
 * @author Markus Ånöstam
 */

'use strict';

const has = require('has');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce no duplicate props',
      category: 'Possible Errors',
      recommended: true
    },

    schema: [{
      type: 'object',
      properties: {
        ignoreCase: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: function (context) {
    const configuration = context.options[0] || {};
    const ignoreCase = configuration.ignoreCase || false;

    return {
      JSXOpeningElement: function (node) {
        const props = {};

        node.attributes.forEach(decl => {
          if (decl.type === 'JSXSpreadAttribute') {
            return;
          }

          let name = decl.name.name;

          if (typeof name !== 'string') {
            return;
          }

          if (ignoreCase) {
            name = name.toLowerCase();
          }

          if (has(props, name)) {
            context.report({
              node: decl,
              message: 'No duplicate props allowed'
            });
          } else {
            props[name] = 1;
          }
        });
      }
    };
  }
};
