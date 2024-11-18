# Produits API
## Description

Produits API est une API RESTful qui permet à des utilisateurs de gérer un ensemble de produits stockés dans une base de données. Les employés peuvent afficher et trier les produits tandis que les gestionnaires (admin) ont la possibilité d'ajouter, modifier ou supprimer un produit. Avant d'utiliser l'API, vous devez ajouter les informations dans le fichier *.env*.

### Pré-requis
- Node.js
- Fichier .env

#### Fichier env:
```
PORT=[PORT]
JWT_SECRET=[JWT_KEY]
ENV=[ENV OU PROD]
DB_URL=[MANGODB_URI]
```

### Installation
   ```sh
   # Cloner le projet
    git clone https://github.com/QuocDungTran380/produits-api
    cd produits-api

   # Installer les dépendances
    npm install

   # Mettre les données sensibles dans le fichier .env
   .env

    # Run
    npm run start

    # Build
    npm run build

    # API Test
    npm run test

    # Artillery Tests
    npx artillery run test.load.yaml
   ```