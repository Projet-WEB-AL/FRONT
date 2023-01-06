# Rendu Front

Ce document témoigne des ajouts au sujet initial, et des choix de

## Ajouts au sujet

- Pour se connecte, vous devez renseigner un pseudonyme et non un id. Vous devez donc renseigner un pseudonyme quand vous vous enregistrez.

- Vous pouvez vous désabonner des associations sur votre page d'accueil.

- L'utilisateur connecté est affiché en permanance dans la barre de navigation.
 

## Choix de modélisation

Choix d'utilisation d'un composant spécifique pour :

- Une barre de recherche sous forme de composant, utilisable sur plusieurs pages.
  Cela permet d'éviter la duplication de code, et de pouvoir modifier l'apparance du site rapidement.
  Elle permet de trier les éléments en fonctions de leurs attributs.
  Elle fait une requette au backend contenant un string.
  Chaque element ayant un attribut commencant par ce string, est renvoyé au front-End.
  ils sont ainsis affichés dans la table




- Une barre de navigation superieur.
  Pour les memes raisons que la barre de recherche, cela simplifie la modification. Etant donné que cet élément est identique pour chaques pages, cela etait une bonne solution

- Choix d'utiliser des Popups, pour modifier un utilisateur, visualiser en détail les informations d'un utilisateur, ou encore certaines popups permettent de créer et modifier les associations.


## Choix de design

Les éléments présents dans le site web sont reactifs.

Cela permet la visibilitée des actions possible sur le site et facilite les interractions.
