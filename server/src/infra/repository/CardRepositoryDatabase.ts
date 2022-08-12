import Card from "../../domain/entity/Card";
import CardRepository from "../../domain/repository/CardRepository";
import Connection from "../database/Connection";

export default class CardRepositoryDatabase implements CardRepository {

	constructor (readonly connection: Connection) {
	}

	async findAllByIdColumn(idColumn: number): Promise<Card[]> {
		const cardsData = await this.connection.query("select id_column, id_card, title, estimative, color from branas.card where id_column = $1 order by index", [idColumn]);
		const cards: Card[] = [];
		for (const cardData of cardsData) {
			cards.push(new Card(cardData.id_column, cardData.id_card, cardData.title, cardData.estimative, cardData.color));
		}
		return cards;
	}

	async save(card: Card): Promise<number> {
		const [cardData] = await this.connection.query("insert into branas.card (id_column, title, estimative) values ($1, $2, $3) returning *", [card.idColumn, card.title, card.estimative]);
		return cardData.id_card;
	}

	async update(card: Card): Promise<void> {
		await this.connection.query("update branas.card set title = $1, estimative = $2 where id_card = $3", [card.title, card.estimative, card.idCard]);
	}
	
	async delete(idCard: number): Promise<void> {
		await this.connection.query("delete from branas.card where id_card = $1", [idCard]);
	}

	async updateIdColumnAndIndex(idCard: number, idColumn: number, index: number): Promise<void> {
		await this.connection.query("update branas.card set id_column = $1, index = $2 where id_card = $3", [idColumn, index, idCard]);
	}

	list (title: string): Promise<Card[]> {
		if (!title) {
			return this.connection.query("select * from branas.card", []);
		} else {
			return this.connection.query("select * from branas.card where title like $1", [`%${title}%`]);
		}
	}

	async get(idCard: number): Promise<Card> {
		const [cardData] = await this.connection.query("select * from branas.card where id_card = $1", [idCard]);
		if (!cardData) throw new Error("Card not found");
		return new Card(cardData.id_column, cardData.id_card, cardData.title, cardData.estimative, cardData.color);
	}
}
