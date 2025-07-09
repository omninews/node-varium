module.exports = {
  env: {
    es2022: true,
    node: true,
    mocha: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  rules: {
    "import/extensions": "off",
    "no-redeclare": "off",
    "no-underscore-dangle": "off",
    "no-unused-vars": "off",
    "max-len": "off",
    "no-nested-ternary": "off",
    "import/no-import-module-exports": "off",
    "no-shadow": "off",
    "no-restricted-globals": "off",
  },
};
