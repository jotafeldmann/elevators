import { EventsCollector, EventsEmitter } from './event.ts'
import { Elevator } from './elevator.ts'
import { Building } from './building.ts'
import { build, print } from './interface.ts'

const floors = 10
const speedInMiliseconds = 200

const logger = new EventsCollector('logger')

const loggerElevator = new EventsEmitter('Elevator', logger)
const loggerBuilding = new EventsEmitter('Building', logger)

const elevatorsList = [
    new Elevator('1', 1, speedInMiliseconds, loggerElevator),
    new Elevator('2', 1, speedInMiliseconds, loggerElevator),
    new Elevator('3', 1, speedInMiliseconds, loggerElevator),
]

const building = new Building(floors, elevatorsList, loggerBuilding)

const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max + 1);
    return Math.floor(Math.random() * (max - min)) + min;
  }

const init = async () => {
    build(building, elevatorsList)
    logger.stream('logger', (e: Elevator) => {
        build(building, elevatorsList)
        print(building.getConfiguration())
        print(e)
    })
    setInterval(async() => building.requestElevatorAtFloor(getRandomInt(1, floors)), speedInMiliseconds)
}

init()


