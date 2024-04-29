# Features
- Nx => Prettier, ESLint, Jest, Cypress
- Stylelint
- Husky and Lint-staged => run prettier code formatting before committing
- Angular material
- Global error handling (client and api)

## Pre-settings
- Configure stylelint in settings to enable auto-detection
- Configure eslint in settings to enable auto-detection

## Generators
### library
- lib => nx g @nx/angular:library libs/common --standalone=false --skipModule
- service => nx g @nx/angular:service services/global-error-handler --project=common
- component => nx g @nx/angular:component error-message-snackbar --directory=libs/common/src/lib --export
