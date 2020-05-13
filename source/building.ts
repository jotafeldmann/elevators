import { EventsEmitter } from './event.ts'
import { Elevator } from './elevator.ts'

class Building {
    private elevators: Elevator[] = []
    private floors: number
    private emiter: EventsEmitter

    constructor(floors: number, elevators: Elevator[] = [], emiter: EventsEmitter) {
        this.floors = floors
        this.elevators = elevators
        this.emiter = emiter
    }

    getConfiguration () {
        return this.elevators.map(e => ({ elevator: e.getId(), floor: e.getFloor() }))
    }

    getFloors () {
        return this.floors
    }

    async requestElevatorAtFloor(floor: number): Promise<any> {
        this.emiter.emit('requestElevatorAtFloor', { floor })
        const elevator = this.getClosestElevatorToFloor(floor)
        return elevator.goToFloor(floor)
    }

    private getClosestElevatorToFloor(floor: number): Elevator {
        let lastDistance = this.floors
        let lastElevator = null
        
        this.elevators.forEach(e => {
            
            const distance = Math.abs(e.getFloor() - floor)

            if (distance < lastDistance) {
                lastDistance = distance
                lastElevator = e
            }
        })

        return lastElevator
    }
}

export {
    Building,
}