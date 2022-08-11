import Column from "../domain/entity/Column";
import ColumnRepository from "../domain/repository/ColumnRepository";

export default class ColumnService {

	constructor (readonly columnRepository: ColumnRepository) {
	}

	async getColumns (idBoard: number) {
		const columns = await this.columnRepository.findAllByIdBoard(idBoard);
		return columns;
	}

	async saveColumn (input: SaveInput): Promise<number> {
		const idColumn = await this.columnRepository.save(new Column(input.idBoard, undefined, input.name, input.hasEstimative));
		return idColumn;
	}

	async getColumn (idColumn: number): Promise<Column> {
		return this.columnRepository.get(idColumn);
	}

	async updateColumn (input: UpdateInput): Promise<void> {
		const column = new Column(input.idBoard, input.idColumn, input.name, input.hasEstimative)
		await this.columnRepository.update(column);
	}

	async deleteColumn (idColumn: number): Promise<void> {
		await this.columnRepository.delete(idColumn);
	}
}

type SaveInput = {
	idBoard: number,
	name: string,
	hasEstimative: boolean
}

type UpdateInput = {
	idBoard: number,
	idColumn: number,
	name: string,
	hasEstimative: boolean
}