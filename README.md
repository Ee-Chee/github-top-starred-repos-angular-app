# Main Objective
This app allows user to use his/her own generated github api token to login and search for the top github repos with most starred and their corresponding details information using Angular 17 + Ngrx + Github Graphql API.

# Features
- Angular 17 latest features
- Nx => Prettier, ESLint, Jest, Cypress
- Stylelint
- Husky and Lint-staged => run prettier code formatting before committing
- Angular material
- Global error handling (client and api)
- Route guard
- Ngrx (Root Store and Feature Stores)
- GitHub API Graphql (Login with token, each store resets to initial state upon logout)
- Responsiveness
- Accessibility
- High performance app => onPush change detection strategy with signals and reactive Rxjs Observables, lazy loading, ng-for trackBy, etc...

# Project Setup
- clone the repo
- npm install
- run serve script

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
