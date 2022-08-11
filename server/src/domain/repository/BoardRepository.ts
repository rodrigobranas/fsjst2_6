import Board from "../entity/Board";

export default interface BoardRepository {
	findAll (): Promise<Board[]>;
	get (idBoard: number): Promise<Board>;
	save (board: Board): Promise<number>;
	update (board: Board): Promise<void>;
	delete (idBoard: number): Promise<void>;
}
