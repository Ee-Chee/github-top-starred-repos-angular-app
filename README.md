# Features
- Nx => Prettier, ESLint, Jest, Cypress
- Stylelint
- Husky and Lint-staged => run prettier code formatting before committing
- Angular material
- Global error handling (client and api)
- Ngrx
- Route guard
- Graphql

## Pre-settings
- Configure stylelint in settings to enable auto-detection
- Configure eslint in settings to enable auto-detection

## Generators
### App
- component => nx g @nx/angular:component home --directory=apps/angular-github-app/src/app

### library
- lib => nx g @nx/angular:library libs/common --standalone=false --skipModule
- service => nx g @nx/angular:service services/global-error-handler/global-error-handler --project=common
- component => nx g @nx/angular:component error-message-snackbar --directory=libs/common/src/lib --export

### Ngrx
- root => nx g @nx/angular:ngrx-root-store --project=angular-github-app --addDevTools
