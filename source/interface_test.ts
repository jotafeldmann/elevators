import { equal } from "https://deno.land/std/testing/asserts.ts";

import { EventsCollector, EventsEmitter } from "./event.ts";
import { Elevator } from "./elevator.ts";
import { Building } from "./building.ts";
import { Interface } from "./interface.ts";

const floors = 1;
const speedInMiliseconds = 200;

const logger = new EventsCollector("logger");

const loggerElevator = new EventsEmitter("Elevator", logger);
const loggerBuilding = new EventsEmitter("Building", logger);

const elevatorsList = [
  new Elevator("1", 1, speedInMiliseconds, loggerElevator),
  new Elevator("2", 1, speedInMiliseconds, loggerElevator),
];

const building = new Building(floors, elevatorsList, loggerBuilding);

Deno.test("Testing Interface class", () => {
  let print = ['']
  const ui = new Interface(building, elevatorsList, (p: any) => {
      print.push(p)
  })

  ui.build()

  const result = print.join('\n')

  if (result !== ('\n' +

  ' __________ \n' +
  '|_[1]__[2]_| 1\n' +
  '""""""""""""')) {
    console.log(`${result}`)
    throw Error("PEI")
  }

});
