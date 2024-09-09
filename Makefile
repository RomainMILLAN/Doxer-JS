.DEFAULT_GOAL = help
DOCKER = docker
DC = $(DOCKER) compose

##
## —— Utils ⚙️ ————————————————————————————————————————————————————————————————
help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z0-9\./_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

dev: ## Run bot at development mode
dev: .env
	@$(DC) up --build

down: ## Stop bot
down:
	@$(DC) down

up: ## Start bot
up:
	@$(DC) up

build: ## Build bot
build:
	@$(DC) up -d --build

restart: ## Restart bot
restart: down up

rebuild: ## Rebuild bot
rebuild: down build

##
## —— Configuration 📝 ————————————————————————————————————————————————————————————————
.env: ## Setup env file
	@cp -n .env.dist .env