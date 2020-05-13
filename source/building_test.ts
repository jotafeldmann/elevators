import { equal } from "https://deno.land/std/testing/asserts.ts";

import { EventsCollector, EventsEmitter } from "./event.ts";
import { Elevator } from "./elevator.ts";
import { Building } from "./building.ts";

const floors = 10;
const speedInMiliseconds = 200;

const logger = new EventsCollector("logger");

const loggerElevator = new EventsEmitter("Elevator", logger);
const loggerBuilding = new EventsEmitter("Building", logger);

const el1 = new Elevator("1", 1, speedInMiliseconds, loggerElevator);
const el2 = new Elevator("2", 10, speedInMiliseconds, loggerElevator);

const elevatorsList = [
  el1,
  el2,
];

const building = new Building(floors, elevatorsList, loggerBuilding);

Deno.test("Testing Building class", () => {
  const configuration = building.getConfiguration();

  if (
    !equal(
      configuration,
      [{ elevator: "1", floor: 1 }, { elevator: "2", floor: 10 }],
    )
  ) {
    throw Error("Error on configuration");
  }

  if (building.getFloors() != 10) {
    throw Error("Error on getFloors");
  }

  if (building.getClosestElevatorToFloor(1) != el1) {
    throw Error("Error on getClosestElevatorToFloor");
  }
});
