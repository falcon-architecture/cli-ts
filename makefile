build:
	tsc

run:
	ts-node src/cli.ts --help

tools:
	npm install -g ts-node typescript

clean:
	rm -rf dist

install:
	npm install -g npm-check-updates

check:
	ncu

.PHONY: clean build tools run 