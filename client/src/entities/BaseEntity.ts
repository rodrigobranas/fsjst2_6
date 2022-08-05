import DomainEvent from "../events/DomainEvent";

export default class BaseEntity {
	callbacks: { eventName: string, callback: Function }[];

	constructor () {
		this.callbacks = [];
	}

	on (eventName: string, callback: Function) {
		this.callbacks.push({ eventName, callback });
	}

	publish (event: DomainEvent) {
		for (const callback of this.callbacks) {
			if (callback.eventName === event.name) {
				callback.callback(event);
			}
		}
	}
}
