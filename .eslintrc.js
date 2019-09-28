// https://eslint.org/docs/user-guide/configuring

module.exports = {
  globals: {
    "$": true,
    "jQuery": true
  },
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard',
	// https://github.com/prettier/eslint-plugin-prettier
	"eslint:recommended",
	"plugin:prettier/recommended"
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
	//"space-before-blocks": "off",
    //"quotes": "off",
    //"no-extra-semi": "off",
	"no-console": "off",
	"no-useless-escape": "off",
	"eqeqeq": "off",
	"no-prototype-builtins": "off",
	"no-use-before-define": "off",
	"no-undef": "off",
	"no-unused-vars": "off",
    // allow async-await
    'generator-star-spacing': 'off',
	'prettier/prettier': 'error',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
