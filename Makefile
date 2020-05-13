ENTRY_POINT := mod.ts
GO_TO_SOURCE := cd source

default:
	make dev

dev:
	$(GO_TO_SOURCE); denon $(ENTRY_POINT)

format:
	$(GO_TO_SOURCE); deno fmt

install:
	$(GO_TO_SOURCE); deno install --unstable --allow-read --allow-run -f https://deno.land/x/denon/denon.ts;

run:
	$(GO_TO_SOURCE); deno run $(ENTRY_POINT)

test:
	$(GO_TO_SOURCE); deno test

test/watch:
	$(GO_TO_SOURCE); denon test *_test.js