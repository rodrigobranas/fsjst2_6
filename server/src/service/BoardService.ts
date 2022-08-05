import BoardRepository from "../domain/repository/BoardRepository";
import CardRepository from "../domain/repository/CardRepository";
import ColumnRepository from "../domain/repository/ColumnRepository";

export default class BoardService {

	constructor (readonly boardRepository: BoardRepository, readonly columnRepository: ColumnRepository, readonly cardRepository: CardRepository) {
	}

	async getBoards (): Promise<{ idBoard: number, name: string }[]> {
		const boards = await this.boardRepository.findAll();
		return boards.map((board) => ({ idBoard: board.idBoard, name: board.name }));
	}

	async getBoard (idBoard: number): Promise<BoardOutput> {
		const board = await this.boardRepository.get(idBoard);
		const output: BoardOutput = {
			idBoard: board.idBoard,
			name: board.name,
			estimative: 0,
			columns: []
		}
		const columns = await this.columnRepository.findAllByIdBoard(idBoard);
		for (const column of columns) {
			const columnOutput: ColumnOutput = { idColumn: column.idColumn, name: column.name, hasEstimative: column.hasEstimative, estimative: 0, cards: []};
			const cards = await this.cardRepository.findAllByIdColumn(column.idColumn);
			for (const card of cards) {
				columnOutput.estimative += card.estimative;
				output.estimative += card.estimative;
				columnOutput.cards.push({ idCard: card.idCard, title: card.title, estimative: card.estimative });
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
	idColumn: number,
	name: string, 
	estimative: number, 
	hasEstimative: boolean, 
	cards: { 
		idCard: number,
		title: string, 
		estimative: number
	}[] 
}

type BoardOutput = {
	idBoard: number,
	name: string,
	estimative: number,
	columns: ColumnOutput[]
}
