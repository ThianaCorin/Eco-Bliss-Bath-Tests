# Eco-Bliss-Bath

<p align="center">
  <img src="https://img.shields.io/badge/MariaDB-v11.7.2-blue">
  <img src="https://img.shields.io/badge/Symfony-v6.2-blue">
  <img src="https://img.shields.io/badge/Angular-v13.3.0-blue">
  <img src="https://img.shields.io/badge/Cypress-v13.x-green">
  <img src="https://img.shields.io/badge/docker--build-passing-brightgreen">
</p>

## Contexte

Eco Bliss Bath s'apprête à lancer la première version de son site e-commerce dédié à la vente de produits de beauté éco-responsables, dont le produit principal est un savon solide. Dans un contexte de mise en production prochaine et de contraintes budgétaires, une première campagne de tests manuels a été réalisée afin d'identifier les principaux risques fonctionnels et techniques. La présente campagne de tests automatisés s'inscrit dans la continuité de ce travail initial et vise à fournir un niveau de confiance suffisant pour éclairer la décision de mise en production.

## Tests automatisés Cypress

Ce projet contient une suite de tests automatisés réalisée avec Cypress pour l'application e-commerce **EcoBlissBath**. Les tests couvrent les fonctionnalités critiques du site (API, UI, sécurité XSS).

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

### Accès à l'API

- URL : http://localhost:8081
- L'API doit être démarrée avant l'exécution des tests Cypress.

### Documentation de l'API

Une documentation est disponible une fois l'API lancée : http://localhost:8081/api/doc

### Vérification de la disponibilité de l'API

Un endpoint de health check permet de vérifier rapidement que l'API est bien opérationnelle : http://localhost:8081/api/health

**Démarrer le frontend :**
```bash
cd frontend
npm start
```

Le site est accessible sur : http://localhost:4200

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

---

## Auteur

**Angela Merlin** - Testeuse QA

---

**Version** : 1.0  
**Dernière mise à jour** : Janvier 2026
