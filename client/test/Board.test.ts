import Board from "../src/entities/Board";

test("Deve criar um quadro", function () {
	const board = new Board(1, "Projeto 1");
	expect(board.name).toBe("Projeto 1");
	expect(board.columns).toHaveLength(0);
	expect(board.getEstimative()).toBe(0);
});

test("Deve criar um quadro com 3 colunas", function () {
	const board = new Board(1, "Projeto 1");
	board.addColumn("Todo", true);
	board.addColumn("Doing", true);
	board.addColumn("Done", false);
	expect(board.columns).toHaveLength(3);
});

test("Deve criar um quadro com 3 colunas e cartões", function () {
	const board = new Board(1, "Projeto 1");
	board.addColumn("Todo", true);
	board.addColumn("Doing", true);
	board.addColumn("Done", false);
	board.addCard("Todo", "Atividade 1", 3);
	board.addCard("Todo", "Atividade 2", 2);
	board.addCard("Todo", "Atividade 3", 1);
	expect(board.getEstimative()).toBe(6);
});


test("Deve criar um quadro com 3 colunas e cartões e mover os cartões entre colunas", function () {
	const board = new Board(1, "Projeto 1");
	board.addColumn("Todo", true);
	board.columns[0].idColumn = 1;
	board.addColumn("Doing", true);
	board.columns[1].idColumn = 2;
	board.addColumn("Done", false);
	board.columns[2].idColumn = 3;
	board.addCard("Todo", "Atividade 1", 3);
	board.columns[0].cards[0].idCard = 1;
	board.addCard("Todo", "Atividade 2", 2);
	board.columns[0].cards[1].idCard = 2;
	board.addCard("Todo", "Atividade 3", 1);
	board.columns[0].cards[2].idCard = 3;
	board.selectCard(board.columns[0], board.columns[0].cards[1]);
	board.moveCard(board.columns[1]);
	// console.log(board.columns[0].cards);
	// console.log(board.columns[1].cards);
});

test("Deve criar um quadro com 3 colunas e cartões e mover os cartões entre cartões", function () {
	const board = new Board(1, "Projeto 1");
	board.addColumn("Todo", true);
	board.columns[0].idColumn = 1;
	board.addColumn("Doing", true);
	board.columns[1].idColumn = 2;
	board.addColumn("Done", false);
	board.columns[2].idColumn = 3;
	board.addCard("Todo", "Atividade 1", 3);
	board.columns[0].cards[0].idCard = 1;
	board.addCard("Todo", "Atividade 2", 2);
	board.columns[0].cards[1].idCard = 2;
	board.addCard("Todo", "Atividade 3", 1);
	board.columns[0].cards[2].idCard = 3;
	board.selectCard(board.columns[0], board.columns[0].cards[1]);
	board.swap(board.columns[0].cards[0]);
	console.log(board.columns[0].cards);
});