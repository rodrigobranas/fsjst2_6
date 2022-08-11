import Card from "../entity/Card";

export default interface CardRepository {
	findAllByIdColumn (idColumn: number): Promise<Card[]>;
	save (card: Card): Promise<number>;
	update (card: Card): Promise<void>;
	delete (idCard: number): Promise<void>;
}