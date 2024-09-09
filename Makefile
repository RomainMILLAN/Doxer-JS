.DEFAULT_GOAL = help
NPM = npm
DOCKER = docker
DC = $(DOCKER) compose

##
## —— Utils ⚙️ ————————————————————————————————————————————————————————————————
help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z0-9\./_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

install: .env	## Install dependencies
	$(NPM) install
	
build:	## Build typescript
build:
	@npx tsc

dev: ## Run bot at development mode
dev: build
	@$(NPM) run start

##
## —— Configuration 📝 ————————————————————————————————————————————————————————————————
.env: ## Setup env file
	@cp .env.dist .env

##
## —— Déploiement 🚀 ————————————————————————————————————————————————————————————————
deploy-botasete:	## Deploy on prod
deploy-botasete:
	@echo "🚩 Deploying to production server (prod)"
	@ssh -A prod 'cd /opt/stacks/botasete && git pull origin main && make deploy ENV=prod'

deploy: vendor-build build
	@echo "Stopping project"
	@$(DC) down
	@echo "Rebooting project"
	@$(DC) up -d --build
