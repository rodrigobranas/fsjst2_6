export default class Card {

	constructor (readonly title: string, public estimative: number) {
	}

	increaseEstimative () {
		this.estimative++;
	}
}
