module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'git add'],
  '*.{html,json,yaml,yml}': ['prettier --write', 'git add'],
};
