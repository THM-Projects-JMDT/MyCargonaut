module.exports = {
  plugins: ["prettier", "react-hooks"],
  extends: ["react-app", "react-app/jest", "plugin:prettier/recommended"],
  rules: { "react-hooks/exhaustive-deps": "error" },
};
