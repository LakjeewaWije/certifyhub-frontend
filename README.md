# This project is made for CA2 of B9IS123 PROGRAMMING FOR INFORMATION SYSTEMS (B9IS123_2425_TMD1S)

## How to run

npm install

npm run dev

## How to run test

npm run test

## Hosted Url

https://certifyhub-frontend.vercel.app/auth


## References

https://medium.com/@miahossain8888/how-to-create-a-react-app-with-vite-571883b100ef
https://www.creative-tim.com/twcomponents/component/login-form-with-floating-labels
https://react-hook-form.com/get-started
https://www.npmjs.com/package/react-toastify
https://tailwindflex.com/@samuel33/border-gradient
https://www.npmjs.com/package/axios
https://axios-http.com/docs/interceptors
https://learn.cypress.io/advanced-cypress-concepts/integration-and-api-tests


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
