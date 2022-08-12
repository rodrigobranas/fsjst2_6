import Board from "../domain/entity/Board";
import BoardRepository from "../domain/repository/BoardRepository";
import CardRepository from "../domain/repository/CardRepository";
import ColumnRepository from "../domain/repository/ColumnRepository";

export default class BoardService {

	constructor (readonly boardRepository: BoardRepository, readonly columnRepository: ColumnRepository, readonly cardRepository: CardRepository) {
	}

	async getBoards (): Promise<{ idBoard?: number, name: string }[]> {
		const boards = await this.boardRepository.findAll();
		return boards.map((board) => ({ idBoard: board.idBoard, name: board.name }));
	}

	async getBoardByIdBoard (idBoard: number): Promise<{ idBoard?: number, name: string }> {
		const board = await this.boardRepository.get(idBoard);
		return board;
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
			if (!column.idColumn) continue;
			const cards = await this.cardRepository.findAllByIdColumn(column.idColumn);
			for (const card of cards) {
				columnOutput.estimative += card.estimative;
				output.estimative += card.estimative;
				columnOutput.cards.push({ idCard: card.idCard, title: card.title, estimative: card.estimative, color: card.color });
			}
			output.columns.push(columnOutput);
		}
		return output;
	}

	async saveBoard (name: string): Promise<number> {
		return this.boardRepository.save(new Board(undefined, name));
	}

	async updateBoard (idBoard: number, name: string): Promise<void> {
		await this.boardRepository.update(new Board(idBoard, name));
	}

	async deleteBoard (idBoard: number): Promise<void> {
		await this.boardRepository.delete(idBoard);
	}

	async updatePositionMap (input: { [idColumn: number]: number[] }): Promise<void> {
		for (const idColumn in input) {
			let index = 0;
			for (const idCard of input[idColumn]) {
				await this.cardRepository.updateIdColumnAndIndex(idCard, parseInt(idColumn), index++);
			}
		}
	}
}

type ColumnOutput = {
	idColumn?: number,
	name: string, 
	estimative: number, 
	hasEstimative: boolean, 
	cards: { 
		idCard?: number,
		title: string, 
		estimative: number,
		color: string
	}[] 
}

type BoardOutput = {
	idBoard?: number,
	name: string,
	estimative: number,
	columns: ColumnOutput[]
}
