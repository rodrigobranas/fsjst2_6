export default class Column {

	constructor (readonly idBoard: number | undefined, readonly idColumn: number | undefined, readonly name: string, readonly hasEstimative: boolean) {
		if (name === "") throw new Error("Name is required");
	}
}
