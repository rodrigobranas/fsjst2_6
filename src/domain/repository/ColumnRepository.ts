import Column from "../entity/Column";

export default interface ColumnRepository {
	findAllByIdBoard (idBoard: number): Promise<Column[]>;
}