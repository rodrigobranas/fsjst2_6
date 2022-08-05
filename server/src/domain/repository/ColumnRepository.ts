import Column from "../entity/Column";

export default interface ColumnRepository {
	findAllByIdBoard (idBoard: number): Promise<Column[]>;
	save (column: Column): Promise<number>;
	get (idColumn: number): Promise<Column>;
	delete (idColumn: number): Promise<void>;
}
