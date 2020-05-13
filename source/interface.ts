// TODO: refactor everything
import { Elevator } from "./elevator.ts";
import { Building } from "./building.ts";

const print = function (p: any) { console.log(p) }

class Interface {
  print: Function
  private building: Building
  private elevators: Elevator[] = []
  
  constructor (building: Building, elevators: Elevator[] = [], print: any = console.log) {
    this.building = building
    this.elevators = elevators
    this.print = print
  }

   private makeFloors (
    width: number,
    building: Building,
    elevators: Elevator[] = [],
  ) {

    const floors = building.getFloors();
    const elevatorsQt = elevators.length;
    const elevatorMap: any = {};
  
    let floor = `|${"_".repeat(width)}|`;
  
    elevators.forEach((e, i) => {
      const floor = e.getFloor();
      elevatorMap[floor] = elevatorMap[floor] ? elevatorMap[floor] : {};
      elevatorMap[floor][e.getId()] = {
        elevator: e,
        icon: `[${e.getId()}]`,
        index: i + 1,
      };
    });
    
  
    for (let count = floors; count > 0; count--) {
      let e = elevatorMap[count];
  
      if (e) {
        const ks = Object.keys(elevatorMap);
        const q = ks.length;
        const middle = ((floor.length - 2) / elevatorsQt);
        const template = [];
  
        template[0] = `|`;
  
        for (let c = 1; c <= width; c++) {
          template[c] = "_";
        }
  
        template[width + 1] = `| ${count}`;
  
        Object.keys(e).forEach((k) => {
          const iconLength = e[k].icon.length;
          const i = e[k].index;
          let index = Math.floor(middle * i) - iconLength;
          for (let icounter = 0; icounter < iconLength; icounter++) {
            template[index + icounter] = e[k].icon[icounter];
          }
        });
  
        this.print(template.join(""));
  
        continue;
      }
  
      this.print(floor + ` ${count}`);
    }
  };
  
  private makeRoofTop = (width: number) => {
    this.print(` ${"_".repeat(width)} `);
  };
  
  private makeGround = (width: number) => {
    this.print(`${'"'.repeat(width + 2)}`);
  };

  build () {
    const width = (this.elevators.length * 5);
    this.makeRoofTop(width);
    this.makeFloors(width, this.building, this.elevators);
    this.makeGround(width);
  };

  clear () {
    console.clear();
  }
}

export {
  Interface
};
