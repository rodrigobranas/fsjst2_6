export default class Card {
	idCard?: number;

	constructor (readonly title: string, public estimative: number, public color: string = "yellow") {
	}

	increaseEstimative () {
		this.estimative++;
	}

	decreaseEstimative () {
		this.estimative--;
	}
}
