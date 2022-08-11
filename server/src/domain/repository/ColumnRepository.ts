import Column from "../entity/Column";

export default interface ColumnRepository {
	findAllByIdBoard (idBoard: number): Promise<Column[]>;
	save (column: Column): Promise<number>;
	get (idColumn: number): Promise<Column>;
	update (column: Column): Promise<void>;
	delete (idColumn: number): Promise<void>;
}
