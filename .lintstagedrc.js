module.exports = {
  '*.{ts,tsx}': ['npm run lint --fix', 'git add'],
  '*.{html,json,yaml,yml}': ['prettier --write', 'git add'],
};
