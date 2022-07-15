export default class Board {
	estimative?: number;
	
	constructor (readonly name: string) {
		if (name === "") throw new Error("Name is required");
	}
}
