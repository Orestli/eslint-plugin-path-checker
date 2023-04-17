# eslint-plugin-path-checker

Plugin is designed for FSD architecture.

1. Checking for access of imports from different layers
2. Checking for imports from the API file
3. Check for relative and absolute paths

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-path-checker`:

```sh
npm install eslint-plugin-path-checker --save-dev
```

## Usage

Add `path-checker` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "path-checker"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "path-checker/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


