NPM = npm
DOCKER = docker
DC = $(DOCKER) compose

help:		## Shows this help hint
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) \
	| sed 's/.*Makefile://' \
	| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' \
	| sed -e 's/\[32m##/[33m/' \


##---------------------------------------------------------------------------
## Node
##
install:	## Install dependencies
	$(NPM) install


##---------------------------------------------------------------------------
## Docker
##
start:	## Run bot at development mode
	$(DC) up -d --build

start-prod:	## Run bot at production mode
	$(DC) -f docker-compose.yml -f docker-compose.prod.yml up --build

stop:	## Stop bot
	$(DC) down

restart:	## Restart bot
restart: stop start