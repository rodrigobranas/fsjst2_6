import Board from "../domain/entity/Board";
import BoardRepository from "../domain/repository/BoardRepository";
import CardRepository from "../domain/repository/CardRepository";
import ColumnRepository from "../domain/repository/ColumnRepository";

export default class BoardService {

	constructor (readonly boardRepository: BoardRepository, readonly columnRepository: ColumnRepository, readonly cardRepository: CardRepository) {
	}

	async getBoards (): Promise<{ name: string }[]> {
		const boards = await this.boardRepository.findAll();
		return boards.map((board) => ({ name: board.name }));
	}

	async getBoard (idBoard: number): Promise<BoardOutput> {
		const board = await this.boardRepository.get(idBoard);
		const output: BoardOutput = {
			name: board.name,
			estimative: 0,
			columns: []
		}
		const columns = await this.columnRepository.findAllByIdBoard(idBoard);
		for (const column of columns) {
			const columnOutput: ColumnOutput = { name: column.name, hasEstimative: column.hasEstimative, estimative: 0, cards: []};
			const cards = await this.cardRepository.findAllByIdColumn(column.idColumn);
			for (const card of cards) {
				columnOutput.estimative += card.estimative;
				output.estimative += card.estimative;
				columnOutput.cards.push({ title: card.title, estimative: card.estimative });
			}
			output.columns.push(columnOutput);
		}
		return output;
	}

	async saveBoard (): Promise<void> {

	}

	async updateBoard (): Promise<void> {
	}
}

type ColumnOutput = { 
	name: string, 
	estimative: number, 
	hasEstimative: boolean, 
	cards: { 
		title: string, 
		estimative: number
	}[] 
}

type BoardOutput = {
	name: string,
	estimative: number,
	columns: ColumnOutput[]
}
