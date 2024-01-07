.DEFAULT_GOAL = help
NPM = npm
DOCKER = docker
DC = $(DOCKER) compose

##
## —— Utils ⚙️ ————————————————————————————————————————————————————————————————
help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z0-9\./_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

install:	## Install dependencies
	$(NPM) install
	
build:	## Build typescript
build:
	@npx tsc

dev: ## Run bot at development mode
dev: build
	@$(NPM) run start

##
## —— Docker 🐳 ————————————————————————————————————————————————————————————————
dc-stop: ## Stop bot at development mode with docker
dc-stop:
	@$(DC) stop

dc-logs: ## Show logs
dc-logs:
	@$(DC) logs

dc-prod: ## Run bot at production mode with docker
dc-prod: build
	@$(DC) -f compose.yml -f compose.prod.yml up -d --build

dc-prod-reload: ## Reload bot at development mode with docker
dc-prod-reload:
	@$(DC) -f compose.yml -f compose.prod.yml stop
	@$(DC) -f compose.yml -f compose.prod.yml up -d

dc-staging: ## Run bot at production mode with docker
dc-staging: build
	@$(DC) -f compose.yml -f compose.staging.yml up -d --build

dc-staging-reload: ## Reload bot at development mode with docker
dc-staging-reload:
	@$(DC) -f compose.yml -f compose.staging.yml stop
	@$(DC) -f compose.yml -f compose.staging.yml up -d

dc-dev: ## Run bot at development mode with docker
dc-dev: build
	@$(DC) -f compose.yml -f compose.dev.yml up -d

dc-dev-reload: ## Reload bot at development mode with docker
dc-dev-reload:
	@$(DC) -f compose.yml -f compose.dev.yml stop
	@npx tsc
	@$(DC) -f compose.yml -f compose.dev.yml up -d