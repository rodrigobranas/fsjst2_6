export default class Card {
	idCard?: number;

	constructor (readonly title: string, public estimative: number) {
	}

	increaseEstimative () {
		this.estimative++;
	}

	decreaseEstimative () {
		this.estimative--;
	}
}
