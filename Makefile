SOURCE_FILES := $(shell find src -type f)

.PHONY: clean start dev

clean:
	@rm -rf ./dist

# Development mode

dev: dist/dev/index.html dist/dev/main.css
	yarn concurrently -c cyan,magenta -n tsc,srv --kill-others-on-fail --handle-input \
		"yarn tsc -w --preserveWatchOutput" \
		"deno run --allow-net --allow-read=${PWD} https://deno.land/std@0.71.0/http/file_server.ts dist/dev"

dist/dev:
	mkdir -p dist/dev

dist/dev/main.css: src/main.css dist/dev
	@cp src/main.css dist/dev/main.css

dist/dev/index.html: src/index.html src/scripts.dev.html jspm.importmap dist/dev
	@cat src/index.html | deno run --allow-read https://deno.land/x/replace@1.1.0/cli.ts -p "{{scripts}}" -f src/scripts.dev.html > dist/dev/index.html
	@jspm install -o dist/dev/index.html


# Production mode

start: dist/prod/index.html dist/prod/main.css dist/prod/app.js
	yarn concurrently -c cyan,magenta -n tsc,srv --kill-others-on-fail --handle-input \
		"yarn tsc -w --preserveWatchOutput" \
		"deno run --allow-net --allow-read=${PWD} https://deno.land/std@0.71.0/http/file_server.ts -p=8080 dist/prod"

dist/prod/main.css: src/main.css
	@mkdir -p dist/prod
	cp src/main.css dist/prod/main.css

dist/prod/app.js: $(SOURCE_FILES) jspm.importmap dist/prod/index.html
	@mkdir -p dist/prod
	yarn tsc
	jspm build ./dist/dev/app.js --dir dist/prod --inline -o dist/prod/index.html

dist/prod/index.html: src/index.html src/scripts.prod.html
	@mkdir -p dist/prod
	cat src/index.html | deno run --allow-read https://deno.land/x/replace@1.1.0/cli.ts -p "{{scripts}}" -f src/scripts.prod.html > dist/prod/index.html
