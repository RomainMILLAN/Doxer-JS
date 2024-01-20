# Doxer-JS | Déployement

Documentation sur le déploiement du projet DoxerJS.
<br/>

## Prérequis

Les prérequis pour pouvoir utiliser DoxerJS sont:

- Docker
- Docker Compose

## Déploiement

Pour déployer le projet, il vous suffit de cloner le projet et de faire les modifications nécessaires dans le fichier [compose.yml](../compose.yml) pour différencier les environnements de déploiement.

### Explication

Dans le fichier [compose.yml](../compose.yml), plusieurs points sont essentiels :

- `build`: Indique le fichier Dockerfile et la base pour construire le container.
- `environment`: Permet de déclarer l'environnement de déploiement, voir la [documentation sur la configuration](./configuration.md).
- `volumes`: Indique le code de DoxerJS.
- `command`: Indique la commande à éxécuter lors du démarrage du container.

#### Environment

Les variables d'environnements à déclarer **obligatoirement** sont:

- `TZ`: Avec la valeur **obligatoirement** `Europe/Paris`
- `NODE_ENV`: Avec une la valeur de votre fichier d'environnement nomée `.env.xxx` soit `xxx`

### Développement

Pour utiliser DoxerJS en mode `Développement`, il vous suffit d'utiliser le fichier compose.yml ci-dessous:

```YAML
version: '3.7'

services:
  ts-node-docker:
    container_name: doxerjs-dev
    build:
      context: .
      dockerfile: Dockerfile
      target: base
    volumes:
      - ./src:/home/node/app/src
      - ./node_modules.json:/home/node/app/nodemon.json
    environment:
      - TZ=Europe/Paris
      - NODE_ENV=dev
    command: npm run start
```

### Préproduction

Pour utiliser DoxerJS en mode `Préproduction`, il vous suffit d'utiliser le fichier compose.yml ci-dessous:

```YAML
version: '3.7'

services:
  ts-node-docker:
    container_name: doxerjs-staging
    build:
      context: .
      dockerfile: Dockerfile
      target: base
    volumes:
      - ./src:/home/node/app/src
      - ./node_modules.json:/home/node/app/nodemon.json
    environment:
      - TZ=Europe/Paris
      - NODE_ENV=staging
    command: npm run start
```

### Production

Pour utiliser DoxerJS en mode `Production`, il vous suffit d'utiliser le fichier compose.yml ci-dessous:

```YAML
version: '3.7'

services:
  ts-node-docker:
    container_name: doxerjs-prod
    build:
      context: .
      dockerfile: Dockerfile
      target: production
    volumes:
      - ./src:/home/node/app/src
      - ./node_modules.json:/home/node/app/nodemon.json
    environment:
      - TZ=Europe/Paris
      - NODE_ENV=prod
    command: npm run start
```