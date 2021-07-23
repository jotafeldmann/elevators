# elevators ![CI](https://github.com/jotafeldmann/elevators/workflows/CI/badge.svg)
Simulate elevator's service, given a number of floors X elevators.

**Try it online:**
- Go to https://replit.com/@jotafeldmann/elevators
- Click the "shell" tab
- Run `make dev`

## Motivation
We use elevators everyday. But everytime I think "all this elevator's behaviours can be improved, somehow".  
So, as a programmer, I'm thinking how to describe this challenge in a generic model, just for fun.

## Purpose

- Simulate elevator's service, given a number of floors X elevators
- Learn Deno

## How to use

- Install [Deno 1.0.0](https://deno.land/)

- Clone
```bash
git clone https://github.com/jotafeldmann/elevators
```

- Install
```bash
make install
```

- Test
```bash
make test
```

- Default/dev (dev mode, watch changes and reload)
```bash
make

#or

make dev
```

- Run (prod env)
```bash
make run
```

## Preview

![Preview](docs/preview.png)

## Deno styleguide

- https://github.com/denoland/deno/blob/master/docs/contributing/style_guide.md

## Testing

- https://github.com/denoland/deno/blob/master/docs/testing.md
- https://deno.land/std/testing/

## Roadmap

- [x] [TypeScript setup](https://www.typescriptlang.org/docs/handbook)
- [x] Request elevator at floors
- [x] Add watch changes and reload task
- [x] Add event controller
- [x] Add basic visual interface
- [x] Add continuous flow of requests
- [x] [Converted to Deno](https://dev.to/jotafeldmann/converting-a-node-project-to-deno-9dp)
- [x] Add `make tests` to basic classes
- [x] Add `make fmt`
- [x] Add CI (Github Actions)
- [ ] Add CLI/dynamic parameters (number of floors, elevators, speed)
- [ ] Add metrics (e.g. waiting time, movements)
- [ ] Add simulation cases results
- [ ] Request floors from elevators (`building.requestElevatorAtFloor().then(e => e.requestFloor(5))`)
- [ ] Limit and control number of people inside elevators
- [ ] Add different rules for elevators (e.g. elevator 2 only receive requests from last floors)
- [ ] Prediction (AI?) max efficiency
