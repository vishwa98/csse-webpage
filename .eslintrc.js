module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: "vuetify",
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "wrap-iife": [2, "inside"],
    "no-with": 2,
    "no-implicit-coercion": [
      2,
      {
        string: true,
      },
    ],
    camelcase: [
      2,
      {
        properties: "never",
      },
    ],
    quotes: [2, "double"],
    "object-curly-spacing": "off",
    semi: [2, "always"],
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};
