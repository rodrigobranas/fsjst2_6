import Card from "./Card";

export default class Column {
	idColumn?: number;
	cards: Card[];

	constructor (readonly name: string, readonly hasEstimative: boolean) {
		this.cards = [];
	}

	addCard (card: Card) {
		this.cards.push(card);
	}

	deleteCard (idCard: number) {
		const card = this.cards.find(card => card.idCard === idCard);
		if (!card) throw new Error("Card not found");
		this.cards.splice(this.cards.indexOf(card), 1);
	}

	getEstimative() {
		return this.cards.reduce((total: number, card: any) => {
			total += card.estimative;
			return total;
		}, 0);
	}
}
