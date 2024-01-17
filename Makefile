.PHONY: build-prod
build-prod: ## Build the prod React application.
	npm i
	CI=false npm run build
	ls -al ./build
