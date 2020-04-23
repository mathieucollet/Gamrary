# Gamrary

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

## Disclaimer sur le filtrage

Le système de filtrage est un peu cassé. Le filtre se fait une fois que les données paginées sont récupérées.
Il existe donc toujours autant de page après filtrage qu'avant, avec certaines pages vide.

L'autre solution eût été de passer par le système de filtrage de l'API mais il n'est pas fonctionnel entièrement.  
Si l'on essaye de filtrer les genres avec `?genres=1`, seul les jeux qui ont **UNIQUEMENT** ce genre ressortent.  
Si l'on essaye de filtrer les genres avec `?genres_like=1`, les jeux qui ont les genres 10, 11, 12, etc. ressortent aussi.  

Dans ces deux cas, je trouvent le résultat peu pertinent. J'ai donc fait le choix de ressortir les bonnes données, bien que la pagination perde du sens dans ce cas. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
