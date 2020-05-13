// TODO: refactor everything
import { Elevator } from './elevator.ts'
import { Building } from './building.ts'

const print = (c) => console.log(c)

const makeFloors = (width, building: Building, elevators: Elevator[] = []) => {
    const floors = building.getFloors()
    const elevatorsQt = elevators.length
    const elevatorMap = {}
    
    let floor = `|${'_'.repeat(width)}|`

    elevators.forEach((e, i) => {
        const floor = e.getFloor()
        elevatorMap[floor] = elevatorMap[floor] ? elevatorMap[floor] : {}
        elevatorMap[floor][e.getId()] = {
            elevator: e,
            icon: `[${e.getId()}]`,
            index: i + 1,
        }
    })

    for (let count = floors; count > 0; count --) {

        let e = elevatorMap[count]

        if (e) {
            const ks = Object.keys(elevatorMap)
            const q = ks.length
            const middle = ((floor.length - 2) / elevatorsQt)
            const template = []

            template[0] = `|`

            for (let c = 1; c <= width; c++) {
                template[c] = '_'
            }

            template[width + 1] = `| ${count}`

            Object.keys(e).forEach(k => {
                const iconLength = e[k].icon.length
                const i = e[k].index
                let index = Math.floor(middle * i) - iconLength
                for(let icounter = 0; icounter < iconLength; icounter++) {
                    template[index + icounter] = e[k].icon[icounter]
                }
            })

            print(template.join(''))
            
            continue
        }

        print(floor + ` ${count}`)
    }
}

const makeRoofTop = (width) => {
    print(` ${'_'.repeat(width)} `)
}

const makeGround = (width) => {
    print(`${'"'.repeat(width+2)}`)
}

const build = (building: Building, elevators: Elevator[] = []) => {
    console.clear()
    const width = (elevators.length * 5)
    makeRoofTop(width)
    makeFloors(width, building, elevators)
    makeGround(width)
}

export {
    build,
    print,
}