import Card from "./Card";

export default class Column {
	cards: Card[];

	constructor (readonly name: string, readonly hasEstimative: boolean) {
		this.cards = [];
	}

	addCard (card: Card) {
		this.cards.push(card);
	}

	getEstimative() {
		return this.cards.reduce((total: number, card: any) => {
			total += card.estimative;
			return total;
		}, 0);
	}
}
