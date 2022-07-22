import Board from "../entity/Board";

export default interface BoardRepository {
	findAll (): Promise<Board[]>;
	get (idBoard: number): Promise<Board>;
}
