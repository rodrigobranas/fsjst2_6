import Board from "../domain/entity/Board";
import BoardRepository from "../domain/repository/BoardRepository";

export default class BoardService {

	constructor (readonly boardRepository: BoardRepository) {
	}

	async getBoards (): Promise<Board[]> {
		const boards = await this.boardRepository.findAll();
		return boards;
	}

	async saveBoard (): Promise<void> {

	}

	async updateBoard (): Promise<void> {
	}
}