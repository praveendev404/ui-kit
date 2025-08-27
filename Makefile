all: clean install build

test:
	npx ng test --code-coverage=true --watch=false --browsers=ChromeHeadless

install:
	npm install --legacy-peer-deps

build:
	npm run build-demo
	sentry-cli releases new ${BUILD_NUMBER} || true
	sentry-cli releases files ${BUILD_NUMBER} upload-sourcemaps ./dist/demo/ || true
	sentry-cli releases set-commits --auto ${BUILD_NUMBER} || true
	sentry-cli releases finalize ${BUILD_NUMBER} || true

build-lib:
	npm run build-kit

clean:
	rm -rf dist
