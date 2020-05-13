import { equal } from "https://deno.land/std/testing/asserts.ts";

import { EventsCollector, EventsEmitter } from "./event.ts";

Deno.test("Testing EventsCollector class", () => {
    const logger = new EventsCollector("logger");

    logger.collect({ source: 'test', event: 'testing', data: 'here comes the data' })

    let events = logger.getEvents()
    let result = events[Object.keys(events)[0]]

    if (!equal(result, { source: 'test', event: 'testing', data: 'here comes the data' })) {
        console.log(result)
        throw Error('Error on logger.collect');
    }
  });


  Deno.test("Testing EventsEmitter class", () => {
    const logger = new EventsCollector("logger");
    const emitter = new EventsEmitter("Emitter", logger);

    emitter.emit('new test', { foo: 1 })

    let events = logger.getEvents()
    let result = events[Object.keys(events)[0]]

    if (!equal(result, { source: 'Emitter', event: 'new test', data: { foo: 1 } })) {
        console.log(result)
        throw Error('Error on emitter.emit');
    }
  
  });
  



  