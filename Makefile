.DEFAULT_GLOBAL = help
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
## Typescript
##
build:	## Build typescript
build:
	npx tsc

start-dev: ## Run bot at development mode
start-dev: build
	$(NPM) run start

rebuild-dev: ## Build and run bot at development mode
rebuild-dev: build
	$(NPM) run start

##---------------------------------------------------------------------------
## Docker
##
restart:	## Restart bot
restart: stop start

start:	## Run bot at production mode
	$(DC) -f docker-compose.yml up --build

stop:	## Stop bot
	$(DC) down