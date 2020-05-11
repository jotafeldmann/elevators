class EventsCollector {
    private name: string
    private events: object = {}
    private listeners: object = {}

    constructor(name: string) {
        this.name = name
    }

    collect({ source, event, data }) {
        const id = Date.now()
        this.events[id] = { source, event, data }
        const e = this.events[id]
        Object.keys(this.listeners).forEach(l => this.listeners[l]({
            ...e,
            id,
        }))
    }

    getEvents () {
        return this.events
    }

    stream(name, callback) {
        this.listeners[name] = callback
    }
}

class EventsEmitter {
    private name: string
    private eventsCollector: EventsCollector
    
    constructor(name: string, eventsCollector: EventsCollector) {
        this.name = name
        this.eventsCollector = eventsCollector
        this.eventsCollector.collect({
            source: this.name,
            event: 'connect',
            data: {
                time: Date.now(),
            }
        })
    }

    emit(event: string, data:any) {
        this.eventsCollector.collect({
            source: this.name,
            event,
            data,
        })
    }
}

export {
    EventsCollector,
    EventsEmitter,
}