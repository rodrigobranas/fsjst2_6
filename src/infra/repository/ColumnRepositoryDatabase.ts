import Column from "../../domain/entity/Column";
import ColumnRepository from "../../domain/repository/ColumnRepository";
import Connection from "../database/Connection";

export default class ColumnRepositoryDatabase implements ColumnRepository {

	constructor (readonly connection: Connection) {
	}

	async findAllByIdBoard(idBoard: number): Promise<Column[]> {
		const columnsData = await this.connection.query("select name, has_estimative from branas.column where id_board = $1", [idBoard]);
		const columns: Column[] = [];
		for (const columnData of columnsData) {
			columns.push(new Column(columnData.name, columnData.has_estimative));
		}
		return columns;
	}

}