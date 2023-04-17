"use strict";

const path = require('path');
const { isPathRelative } = require('../utils');

module.exports = {
  meta: {
    type: null,
    docs: {
      description: "featured sliced relative path checker",
      recommended: false,
      url: null,
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string',
          },
        },
      },
    ],
  },

  create(context) {
    const alias = context.options[0]?.alias || '';

    return {
      ImportDeclaration(node) {
        try {
          // example: app/entities/Comment
          const value = node.source.value;
          const importTo = alias ? value.replace(`${alias}/`, '') : value;

          // example: C:\Users\orestli\Desktop\web\project\src\entities\Article
          const fromFilename = context.getFilename();

          if (shouldBeRelative(fromFilename, importTo)) {
            context.report({
              node,
              message: 'Path must be relative',
              fix: (fixer) => {
                const normalizedPath = getNormalizedCurrentFilePath(fromFilename) // entities/Article/Article.tsx
                  .split('/')
                  .slice(0, -1)
                  .join('/');

                let relativePath = path.relative(normalizedPath, `/${importTo}`)
                  .split('\\')
                  .join('/');

                if (!relativePath.startsWith('.')) {
                  relativePath = './' + relativePath;
                }

                return fixer.replaceText(node.source, `'${relativePath}'`);
              },
            });
          }
        } catch {}
      }
    };
  },
};

const layers = {
  'entities': 'entities',
  'features': 'features',
  'shared': 'shared',
  'pages': 'pages',
  'widgets': 'widgets',
};

const getNormalizedCurrentFilePath = (currentFilePath) => {
  const normalizedPath = path.toNamespacedPath(currentFilePath);
  const projectFrom = normalizedPath.split('src')[1];

  return projectFrom.split('\\').join('/')
}

function shouldBeRelative(from, to) {
  if (isPathRelative(to)) {
    return false;
  }

  // example - entities/Comment
  const toArray = to.split('/');
  const toLayer = toArray[0]; // entities
  const toSlice = toArray[1]; // Comment

  if (!toLayer || !toSlice || !layers[toLayer]) {
    return false;
  }

  const projectFrom = getNormalizedCurrentFilePath(from);
  const fromArray = projectFrom.split('/');

  const fromLayer = fromArray[1];
  const fromSlice = fromArray[2];

  if (!fromLayer || !fromSlice || !layers[fromLayer]) {
    return false;
  }

  return fromSlice === toSlice && toLayer === fromLayer;
}

console.log(path.toNamespacedPath())