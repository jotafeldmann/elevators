import { equal } from "https://deno.land/std/testing/asserts.ts";

import { EventsCollector, EventsEmitter } from "./event.ts";
import { Elevator } from "./elevator.ts";

const speedInMiliseconds = 1;

const logger = new EventsCollector("logger");

const loggerElevator = new EventsEmitter("Elevator", logger);


Deno.test("Testing Elevator class", async () => {
 const elevator = new Elevator("1", 1, speedInMiliseconds, loggerElevator);

  if (elevator.getFloor() != 1) {
    throw Error("Error on getFloor");
  }

  if (elevator.getId() != '1') {
    throw Error("Error on getId");
  }

  await elevator.goToFloor(10)

  if (elevator.getFloor() != 10) {
    throw Error("Error on goToFloor");
  }

});
