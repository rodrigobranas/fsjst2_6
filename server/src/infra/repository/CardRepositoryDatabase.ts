import Card from "../../domain/entity/Card";
import CardRepository from "../../domain/repository/CardRepository";
import Connection from "../database/Connection";

export default class CardRepositoryDatabase implements CardRepository {

	constructor (readonly connection: Connection) {
	}

	async findAllByIdColumn(idColumn: number): Promise<Card[]> {
		const cardsData = await this.connection.query("select id_column, id_card, title, estimative from branas.card where id_column = $1", [idColumn]);
		const cards: Card[] = [];
		for (const cardData of cardsData) {
			cards.push(new Card(cardData.id_column, cardData.id_card, cardData.title, cardData.estimative));
		}
		return cards;
	}

}