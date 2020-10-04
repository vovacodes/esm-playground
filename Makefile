# Development mode

install-dev:
	jspm install -o src/index.html

run-dev: install-dev
	deno run --allow-net --allow-read=${PWD} https://deno.land/std@0.71.0/http/file_server.ts src


# Production mode

build:
	jspm build ./src/app.js -f esm --dir dist --inline

run: build
	deno run --allow-net --allow-read=${PWD} https://deno.land/std@0.71.0/http/file_server.ts -p=8080 dist

.PHONY: install-dev run-dev build run