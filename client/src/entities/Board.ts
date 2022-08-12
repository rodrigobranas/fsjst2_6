import DomainEvent from "../events/DomainEvent";
import BaseEntity from "./BaseEntity";
import Card from "./Card";
import Column from "./Column";

export default class Board extends BaseEntity {
	selectedColumn?: Column;
	selectedCard?: Card;
	columns: Column[];

	constructor (readonly idBoard: number, readonly name: string) {
		super();
		this.columns = [];
	}

	addColumn (columnName: string, hasEstimative: boolean) {
		const column = new Column(columnName, hasEstimative);
		this.columns.push(column);
		this.publish(new DomainEvent("addColumn", { idBoard: this.idBoard, name: columnName, hasEstimative, column }));
	}

	addCard (columnName: string, cardTitle: string, cardEstimative: number) {
		const column = this.columns.find(column => column.name === columnName);
		if (!column) throw new Error("Column not found");
		const card = new Card(cardTitle, cardEstimative, "white");
		column.addCard(card);
		this.publish(new DomainEvent("addCard", { idBoard: this.idBoard, idColumn: column.idColumn, title: cardTitle, estimative: cardEstimative, card }));
	}

	deleteColumn (idColumn: number) {
		const column = this.columns.find(column => column.idColumn === idColumn);
		if (!column) throw new Error("Column not found");
		this.columns.splice(this.columns.indexOf(column), 1);
		this.publish(new DomainEvent("deleteColumn", { idBoard: this.idBoard, idColumn: column.idColumn }));
	}

	deleteCard (column: Column, idCard: number) {
		column.deleteCard(idCard);
		this.publish(new DomainEvent("deleteCard", { idBoard: this.idBoard, idColumn: column.idColumn, idCard }));
	}

	increaseEstimative (column: Column, card: Card) {
		card.increaseEstimative();
		this.publish(new DomainEvent("increaseEstimative", { idBoard: this.idBoard, idColumn: column.idColumn, idCard: card.idCard, title: card.title, estimative: card.estimative }));
	}

	decreaseEstimative (column: Column, card: Card) {
		card.decreaseEstimative();
		this.publish(new DomainEvent("decreaseEstimative", { idBoard: this.idBoard, idColumn: column.idColumn, idCard: card.idCard, title: card.title, estimative: card.estimative }));
	}

	selectCard (column: Column, card: Card) {
		this.selectedColumn = column;
		this.selectedCard = card;
	}

	moveCard (column: Column) {
		if (!this.selectedColumn || !this.selectedCard || !this.selectedCard.idCard) return;
		if (this.selectedColumn === column) return;
		this.selectedColumn.deleteCard(this.selectedCard.idCard);
		column.addCard(this.selectedCard);
		this.selectedColumn = column;
		this.publish(new DomainEvent("updatePositionMap", { idBoard: this.idBoard, positionMap: this.generatePositionMap() }));
	}

	swap (card: Card) {
		if (this.selectedCard === card) return;
		if (!this.selectedColumn || !this.selectedCard || !this.selectedCard.idCard) return;
		const a = this.selectedColumn.cards.indexOf(card);
		const b = this.selectedColumn.cards.indexOf(this.selectedCard);
		const temp = this.selectedColumn.cards[a];
		this.selectedColumn.cards[a] = this.selectedColumn.cards[b];
		this.selectedColumn.cards[b] = temp;
		this.publish(new DomainEvent("updatePositionMap", { idBoard: this.idBoard, positionMap: this.generatePositionMap() }));
	}

	resetCard () {
		this.selectedColumn = undefined;
		this.selectedCard = undefined;
	}

	generatePositionMap () {
		const positionMap: any = {};
		for (const column of this.columns) {
			if (!column.idColumn) continue;
			positionMap[column.idColumn] = [];
			for (const card of column.cards) {
				positionMap[column.idColumn].push(card.idCard);
			}
		}
		console.log(positionMap);
		return positionMap;
	}

	getEstimative() {
		return this.columns.reduce((total: number, column: Column) => {
			total += column.getEstimative();
			return total;
		}, 0);
	}
}
