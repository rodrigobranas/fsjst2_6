export default class Card {

	constructor (readonly idColumn: number | undefined, readonly idCard: number | undefined, readonly title: string, readonly estimative: number, readonly color: string = "yellow") {
		if (title === "") throw new Error("Title is required");
		if (estimative < 0) throw new Error("Estimative must be positive");
	}
}
