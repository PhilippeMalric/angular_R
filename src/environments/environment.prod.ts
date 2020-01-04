import{apiKey} from "../../apikey"

const packageJson = require('../../package.json');

export const environment = {
  appName: 'Liste de lecture',
  envName: 'PROD',
  production: true,
  test: false,
  i18nPrefix: '',
  firebaseConfig: {
    apiKey: apiKey,
    authDomain: "angular-r-dad5f.firebaseapp.com",
    databaseURL: "https://angular-r-dad5f.firebaseio.com",
    projectId: "angular-r-dad5f",
    storageBucket: "angular-r-dad5f.appspot.com",
    messagingSenderId: "467839362596",
    appId: "1:467839362596:web:806595d1d84f04973adab1",
    measurementId: "G-R0SYTLQBYJ"
  },
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    fontAwesome:
      packageJson.dependencies['@fortawesome/fontawesome-free-webfonts'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
    cypress: packageJson.devDependencies['cypress']
  }
};
