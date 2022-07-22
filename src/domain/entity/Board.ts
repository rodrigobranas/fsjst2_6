export default class Board {
	
	constructor (readonly name: string) {
		if (name === "") throw new Error("Name is required");
	}
}
