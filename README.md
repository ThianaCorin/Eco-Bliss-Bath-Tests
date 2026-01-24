<div align="center">

# OpenClassrooms - Eco-Bliss-Bath

</div>

<p align="center">
    <img src="https://img.shields.io/badge/MariaDB-v11.7.2-blue">
    <img src="https://img.shields.io/badge/Symfony-v6.2-blue">
    <img src="https://img.shields.io/badge/Angular-v13.3.0-blue">
    <img src="https://img.shields.io/badge/Cypress-v13.x-green">
    <img src="https://img.shields.io/badge/docker--build-passing-brightgreen">
  <br><br><br>
</p>

# Tests automatisés Cypress

Ce projet contient une suite de tests automatisés réalisée avec Cypress pour l'application e-commerce **EcoBlissBath**.  
Les tests couvrent les fonctionnalités critiques du site (API, UI, sécurité XSS).

---

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- Docker
- Node.js (version 14 ou supérieure)
- npm
- Git

---

## Installation du projet

**Cloner le dépôt :**
```bash
git clone https://github.com/ThianaCorin/Eco-Bliss-Bath-Tests.git
```

**Installer les dépendances :**
```bash
cd frontend
npm install
```

**Installer Cypress (si nécessaire) :**
```bash
npm install cypress --save-dev
```

---

## Démarrage de l'application

L'application doit être lancée avant l'exécution des tests.

**Démarrer l'API et la base de données :**
```bash
docker-compose up
```

**Démarrer le frontend :**
```bash
cd frontend
npm start
```

**Le site est accessible sur :**

http://localhost:4200

---

## Lancer les tests Cypress

**Lancer tous les tests en mode headless :**
```bash
npx cypress run
```

**Lancer Cypress avec l'interface graphique :**
```bash
npx cypress open
```

---

## Génération du rapport

Le rapport est généré automatiquement lors de l'exécution des tests avec `cypress run`.

Les résultats sont affichés dans la console.

**Des captures d'écran des tests en échec sont générées dans le dossier :**
```
cypress/screenshots/
```

**Des vidéos d'exécution peuvent également être générées dans :**
```
cypress/videos/
```

---

## Auteur

**Angela Merlin** - Testeuse QA

---

**Version** : 1.0  
**Dernière mise à jour** : Janvier 2026
