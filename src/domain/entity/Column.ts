export default class Column {

	constructor (readonly name: string, readonly hasEstimative: boolean) {
		if (name === "") throw new Error("Name is required");
	}
}
