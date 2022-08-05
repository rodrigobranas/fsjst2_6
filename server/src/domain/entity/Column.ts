export default class Column {

	constructor (readonly idBoard: number, readonly idColumn: number, readonly name: string, readonly hasEstimative: boolean) {
		if (name === "") throw new Error("Name is required");
	}
}
