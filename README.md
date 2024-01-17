# Doxer JS

Ce dépôt contient le code du bot discord Doxer, initialement développer en Java<br/>
Ce bot est maintenant refacto en JavaScript pour plus de légéreter et revoir les commandes essentielles.

## Configuration

### Application ID

La variable d'environnement `APP_ID` est disponible lors de la création de votre bot discord sur la platform discord developper.

### Token Bot

La variable d'environnement `BOT_TOKEN` est disponible sur le portail développeur.

### Identifiant de Guild

La variable d'environnement `GUILD_ID` est l'identifiant de votre serveur discord (_Pour récupérer celui-ci il vous suffit d'avoir le mode développeur activé et d'effectuer un click droit et "copier l'identifiant"_).

### Opérateur Role

La variable d'environnement `R_OP` est le role opérateur qui aura toutes les permissions sur le bot discord.

### Staff Role

La variable d'environnement `R_STAFF` est le role staff qui aura quelques permissions sur le bot discord.

### Channel Sentry

La variable d'environnement `TC_SENTRY` indique à Sentry ou ces messages doivent être envoyer.
Cette variable doit contenir l'identifiant d'un channel texte.

### Channel DiscordSentry

La variable d'environnement `TC_DISCORD_SENTRY` indique à Discord Sentry ou les messages recus doivent être envoyer.
Cette variable doit contenir l'identifiant d'un channel texte.

### VoiceClick Category

La variable d'environnement `VC_CATEGORY` indique à VoiceClick la catégorie ou crée les channels vocaux.

### Open Weather API

La variable d'environnement `OPEN_WEATHER_API` est la clef API pour faire appelle aux service de l'API de Open Weather Map.

### Ville par défaut

La variable d'environnement `WEATHER_DEFAULT_CITY` est la ville par défaut appeller pour la commande `/weather`.

### Liste des mots non logger

La variable d'environnement `DISCORD_SENTRY_BLACKLIST` sert à spécifier les messages qui ne seront pas enregistrés par DiscordSentry. Pour l'utiliser, il suffit de lister tous les mots en minuscules, séparés par des virgules, comme suit : <br/>`DISCORD_SENTRY_BLACKLIST="hello,world,how"` => ainsi, les messages contenant exactement les mots `hello`, `world` et `how` seront ignorés par Discord Sentry.


<br>

### Environnement

`APP_ENV` désigne l'environnement de l'application, plusieurs valeurs possible.
`DEV`, `STAGING`, `PROD`

### Débugging

`APP_DEBUG` désigne si l'application doit envoyer les messages de débug.
Plusieurs valeurs possible: `FALSE` ou `TRUE`

### Sentry

`APP_SENTRY` désigne si sentry doit s'activer.
Plusieurs valeurs possible: `FALSE` ou `TRUE`

<br>

### Webhook

`DISCORD_WEBHOOK_URL` désigne l'url de la webhook de monitoring.

<br>
<br>
<br>

_Fait par Romain MILLAN._
