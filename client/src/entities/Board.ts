import DomainEvent from "../events/DomainEvent";
import BaseEntity from "./BaseEntity";
import Card from "./Card";
import Column from "./Column";

export default class Board extends BaseEntity {
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
		const card = new Card(cardTitle, cardEstimative);
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

	getEstimative() {
		return this.columns.reduce((total: number, column: Column) => {
			total += column.getEstimative();
			return total;
		}, 0);
	}
}
