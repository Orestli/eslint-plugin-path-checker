"use strict";

const rule = require("../../../lib/rules/path-checker"),
  RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 6, sourceType: 'module' },
});
ruleTester.run("path-checker", rule, {
  valid: [
    {
      filename: 'C:\\Users\\orestli\\Desktop\\web\\project\\src\\entities\\Article',
      code: "import { addCommentFormActions } from '../../model/slices/AddCommentFormSlice'",
      errors: [],
    },
  ],

  invalid: [
    {
      filename: 'C:\\Users\\orestli\\Desktop\\web\\project\\src\\entities\\Article',
      code: "import { addCommentFormActions } from 'entities/Article/model/slices/AddCommentFormSlice'",
      errors: [{ message: "Path must be relative" }],
    },
    {
      filename: 'C:\\Users\\orestli\\Desktop\\web\\project\\src\\entities\\Article',
      code: "import { addCommentFormActions } from '@/entities/Article/model/slices/AddCommentFormSlice'",
      errors: [{ message: "Path must be relative" }],
      options: [{ alias: '@' }],
    },
  ],
});
