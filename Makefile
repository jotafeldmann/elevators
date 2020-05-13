ENTRY_POINT := index.ts
GO_TO_SOURCE := cd source

default:
	make dev

dev:
	$(GO_TO_SOURCE); npx ts-node-dev --respawn --notify false $(ENTRY_POINT)

install:
	$(GO_TO_SOURCE);
	deno install --unstable --allow-read --allow-run -f https://deno.land/x/denon/denon.ts;

run:
	$(GO_TO_SOURCE); npx ts-node -H $(ENTRY_POINT)