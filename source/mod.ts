import { EventsCollector, EventsEmitter } from "./event.ts";
import { Elevator } from "./elevator.ts";
import { Building } from "./building.ts";
import { Interface } from "./interface.ts";

const floors = 10;
const speedInMiliseconds = 200;

const logger = new EventsCollector("logger");

const loggerElevator = new EventsEmitter("Elevator", logger);
const loggerBuilding = new EventsEmitter("Building", logger);

const elevatorsList = [
  new Elevator("1", 1, speedInMiliseconds, loggerElevator),
  new Elevator("2", 10, speedInMiliseconds, loggerElevator),
];

const building = new Building(floors, elevatorsList, loggerBuilding);

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max + 1);
  return Math.floor(Math.random() * (max - min)) + min;
};

const ui = new Interface(building, elevatorsList)

const init = async () => {
  ui.build()

  logger.stream('logger', (e: Elevator) => {
      ui.clear()
      ui.build()
      ui.print(building.getConfiguration())
      ui.print(e)
  })
  
  setInterval(async() => building.requestElevatorAtFloor(getRandomInt(1, floors)), speedInMiliseconds)

  console.log(building.getConfiguration());
};

init();
