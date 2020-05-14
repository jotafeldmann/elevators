import { EventsEmitter } from "./event.ts";
import { Elevator } from "./elevator.ts";

class Building {
  private elevators: Elevator[] = [];
  private floors: number;
  private emiter: EventsEmitter;

  constructor(
    floors: number,
    elevators: Elevator[] = [],
    emiter: EventsEmitter,
  ) {
    this.floors = floors;
    this.elevators = elevators;
    this.emiter = emiter;
  }

  getConfiguration() {
    return this.elevators.map((e) => ({
      elevator: e.getId(),
      floor: e.getFloor(),
    }));
  }

  getFloors() {
    return this.floors;
  }

  async requestElevatorAtFloor(floor: number): Promise<any> {
    this.emiter.emit("requestElevatorAtFloor", { floor });
    const elevator = this.getDesignatedElevatorToFloor(floor);
    return elevator.goToFloor(floor);
  }

  private sortArrayByClosestDistance = (floor: number) =>
    (prev: Elevator, actual: Elevator) => {
      if (
        Math.abs(prev.getFloor() - floor) < Math.abs(actual.getFloor() - floor)
      ) {
        return -1;
      }
      return 1;
    };

  getDesignatedElevatorToFloor(floor: number): Elevator {
    const elevators = this.elevators.slice(0);
    elevators.sort(this.sortArrayByClosestDistance(floor));
    return elevators[0];
  }
}

export {
  Building,
};
