import Card from "../domain/entity/Card";
import CardRepository from "../domain/repository/CardRepository";

export default class CardService {

	constructor (readonly cardRepository: CardRepository) {
	}

	async list (title: string) {
		return this.cardRepository.list(title);
	}

	async getCards (idColumn: number) {
		const cards = await this.cardRepository.findAllByIdColumn(idColumn);
		return cards;
	}

	async getCard (idCard: number) {
		const card = await this.cardRepository.get(idCard);
		return card;
	}

	async saveCard (input: SaveInput): Promise<number> {
		const idCard = await this.cardRepository.save(new Card(input.idColumn, undefined, input.title, input.estimative));
		return idCard;
	}

	async updateCard (input: UpdateInput): Promise<void> {
		const card = new Card(input.idColumn, input.idCard, input.title, input.estimative);
		await this.cardRepository.update(card);
	}

	async deleteCard (idCard: number): Promise<void> {
		await this.cardRepository.delete(idCard);
	}
}

type SaveInput = {
	idColumn: number,
	title: string,
	estimative: number
}

type UpdateInput = {
	idCard: number,
	idColumn: number,
	title: string,
	estimative: number
}