import Board from "../../domain/entity/Board";
import BoardRepository from "../../domain/repository/BoardRepository";
import Connection from "../database/Connection";

export default class BoardRepositoryDatabase implements BoardRepository {

	constructor (readonly connection: Connection) {
	}

	async findAll(): Promise<Board[]> {
		const boardsData = await this.connection.query("select id_board, name from branas.board", []);
		const boards: Board[] = [];
		for (const boardData of boardsData) {
			const board = new Board(boardData.id_board, boardData.name);
			boards.push(board);
		}
		return boards;
	}

	async get(idBoard: number): Promise<Board> {
		const [boardData] = await this.connection.query("select * from branas.board where id_board = $1", [idBoard]);
		if (!boardData) throw new Error("Board not found");
		const board = new Board(boardData.id_board, boardData.name);
		return board;
	}

	async save(board: Board): Promise<number> {
		const [boardData] = await this.connection.query("insert into branas.board (name) values ($1) returning *", [board.name]);
		return boardData.id_board;
	}

	async update(board: Board): Promise<void> {
		await this.connection.query("update branas.board set name = $1 where id_board = $2", [board.name, board.idBoard]);
	}

	async delete(idBoard: number): Promise<void> {
		await this.connection.query("delete from branas.board where id_board = $1", [idBoard]);
	}
}
