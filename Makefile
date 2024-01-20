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

build-dev: ## Build and run bot at development mode
build-dev: build dev

##
## —— Docker 🐳 ————————————————————————————————————————————————————————————————
dc-stop: ## Stop bot at development mode with docker
dc-stop:
	@$(DC) stop

dc-start: ## Start bot at development mode with docker
dc-start: 
	@$(DC) up -d --build

dc-logs: ## Show logs
dc-logs:
	@$(DC) logs