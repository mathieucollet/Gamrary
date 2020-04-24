# Gamrary

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

## Disclaimer sur le filtrage

Le système de filtrage est un peu cassé. Le filtre se fait une fois que les données paginées sont récupérées.
Il existe donc toujours autant de page après filtrage qu'avant, avec certaines pages vide.

L'autre solution eût été de passer par le système de filtrage de l'API mais il n'est pas fonctionnel entièrement.  
Si l'on essaye de filtrer les genres avec `?genres=1`, seul les jeux qui ont **UNIQUEMENT** ce genre ressortent.  
Si l'on essaye de filtrer les genres avec `?genres_like=1`, les jeux qui ont les genres 10, 11, 12, etc. ressortent aussi.  

Dans ces deux cas, je trouvent le résultat peu pertinent. J'ai donc fait le choix de ressortir les bonnes données, bien que la pagination perde du sens dans ce cas. 

## Disclaimer sur le truncate de la description des jeux

J'ai laissé la méthode truncate sensé réduire la taille de la description de chacun des jeux
pour éviter de trop casser l'affichage.

Mais je me suis permis de ne pas l'utiliser de faire cette opération en CSS ce qui me garantie le nombre maximal de ligne.
