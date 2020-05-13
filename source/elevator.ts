import { EventsEmitter } from './event.ts'

class Elevator {
    private floor: number
    private id: string
    private speed: number = 10
    private targetFloorsMap: any = {}
    private targetFloorCurrent: number = 0
    private movement: any
    private emiter: EventsEmitter

    constructor(id: string, initialFloor: number, speed: number = 100, emiter: EventsEmitter ) {
        this.id = id
        this.floor = initialFloor
        this.emiter = emiter
        this.speed = speed
    }

    getFloor () {
        return this.floor
    }

    getId () {
        return this.id
    }

    async goToFloor (floor: number): Promise<any> {
        this.emiter.emit('goToFloor', { elevator: this.id, floor })
        return new Promise((resolve) => {
            this.targetFloorsMap[floor] = resolve
            this.move()
        })
    }

    private isRequestedFloor(floor: number) {
        return !!this.targetFloorsMap[floor]
    }

    private getNextFloor () {
        return parseInt(Object.keys(this.targetFloorsMap)[0], 10)
    }

    private stop(floor: number) {
        clearInterval(this.movement)
        this.movement = null
        this.targetFloorsMap[floor]({ floor, elevator: this.id })
        delete this.targetFloorsMap[floor]
        if (Object.keys(this.targetFloorsMap).length !== 0) this.move()
    }

    private move () {

        if (this.movement) return
        this.targetFloorCurrent = this.getNextFloor()
        this.movement = setInterval(() => {
            this.emiter.emit('move', { elevator: this.id, floor: this.floor })

            if (this.isRequestedFloor(this.floor)) {
                this.stop(this.floor)
                return
            }

            if (this.targetFloorCurrent > this.floor) {
                this.floor++
                return
            }

            if (this.targetFloorCurrent < this.floor) {
                this.floor--
                return
            }
        }, this.speed)
    }
}

export {
    Elevator,
}