ENTRY_POINT := mod.ts
GO_TO_SOURCE := cd source

default:
	make dev

dev:
	$(GO_TO_SOURCE); denon $(ENTRY_POINT)

install:
	$(GO_TO_SOURCE);
	deno install --unstable --allow-read --allow-run -f https://deno.land/x/denon/denon.ts;

run:
	$(GO_TO_SOURCE); deno run $(ENTRY_POINT)