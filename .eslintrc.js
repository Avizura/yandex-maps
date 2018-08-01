module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  plugins: ['react', 'jsx-a11y', 'import'],
  env: {
    browser: true,
    jest: true,
  },
  settings: {
    'import/extensions': ['.js', '.jsx'],
    'import/ignore': ['node_modules'],
    'import/resolver': {
      node: {
        moduleDirectory: ['src/', 'node_modules'],
      },
    },
  },
  rules: {
    'comma-dangle': ['error', 'only-multiline'],
    'no-console': 1,
    allowEmptyReject: 0,
    'import/prefer-default-export': 0,
    'jsx-a11y/label-has-for': 0,
    'no-fallthrough': 0,
    'object-curly-newline': 0,
    'react/jsx-filename-extension': 0,
    'react/require-default-props': 0,
    'react/no-array-index-key': 0,
    'max-len': ['error', 130],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.stories.js', '**/*.test.js'] }],
    'no-debugger': 0,
  },
};
