export default class Board {
	
	constructor (readonly idBoard: number | undefined, readonly name: string) {
		if (name === "") throw new Error("Name is required");
	}
}
