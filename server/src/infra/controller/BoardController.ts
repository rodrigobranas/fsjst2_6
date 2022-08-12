import BoardRepository from "../../domain/repository/BoardRepository";
import CardRepository from "../../domain/repository/CardRepository";
import ColumnRepository from "../../domain/repository/ColumnRepository";
import BoardService from "../../service/BoardService";
import CardService from "../../service/CardService";
import ColumnService from "../../service/ColumnService";
import Connection from "../database/Connection";
import Http from "../http/Http";
import CardRepositoryDatabase from "../repository/CardRepositoryDatabase";
import ColumnRepositoryDatabase from "../repository/ColumnRepositoryDatabase";

export default class BoardController {

	constructor (readonly http: Http, readonly connection: Connection, readonly boardRepository: BoardRepository, readonly columnRepository: ColumnRepository, readonly cardRepository: CardRepository) {
		http.route("get", "/boards", async function (params: any, body: any) {
			const boardService = new BoardService(boardRepository, columnRepository, cardRepository);
			const boards = await boardService.getBoards();
			return boards;
		});

		http.route("get", "/boards/:idBoard", async function (params: any, body: any) {
			const boardService = new BoardService(boardRepository, columnRepository, cardRepository);
			const boards = await boardService.getBoard(params.idBoard);
			return boards;
		});

		http.route("get", "/boards/:idBoard/columns", async function (params: any, body: any) {
			const columnRepository = new ColumnRepositoryDatabase(connection);
			const columnService = new ColumnService(columnRepository);
			const columns = await columnService.getColumns(parseInt(params.idBoard));
			return columns;
		});

		http.route("get", "/boards/:idBoard/columns/:idColumn", async function (params: any, body: any) {
			const columnRepository = new ColumnRepositoryDatabase(connection);
			const columnService = new ColumnService(columnRepository);
			const column = await columnService.getColumn(parseInt(params.idColumn));
			return column;
		});

		http.route("post", "/boards/:idBoard/columns", async function (params: any, body: any) {
			const columnRepository = new ColumnRepositoryDatabase(connection);
			const columnService = new ColumnService(columnRepository);
			const idColumn = await columnService.saveColumn(body);
			return idColumn;
		});

		http.route("post", "/boards/:idBoard/columns/:idColumn/cards", async function (params: any, body: any) {
			const cardRepository = new CardRepositoryDatabase(connection);
			const cardService = new CardService(cardRepository);
			const idCard = await cardService.saveCard(body);
			return idCard;
		});

		http.route("put", "/boards/:idBoard/columns/:idColumn/cards/:idCard", async function (params: any, body: any) {
			const cardRepository = new CardRepositoryDatabase(connection);
			const cardService = new CardService(cardRepository);
			await cardService.updateCard(body);
		});

		http.route("delete", "/boards/:idBoard/columns/:idColumn", async function (params: any, body: any) {
			const columnRepository = new ColumnRepositoryDatabase(connection);
			const columnService = new ColumnService(columnRepository);
			await columnService.deleteColumn(parseInt(params.idColumn));
		});

		http.route("get", "/boards/:idBoard/columns/:idColumn/cards", async function (params: any, body: any) {
			const cardRepository = new CardRepositoryDatabase(connection);
			const cardService = new CardService(cardRepository);
			const cards = await cardService.getCards(parseInt(params.idColumn));
			return cards;
		});

		http.route("delete", "/boards/:idBoard/columns/:idColumn/cards/:idCard", async function (params: any, body: any) {
			const cardRepository = new CardRepositoryDatabase(connection);
			const cardService = new CardService(cardRepository);
			await cardService.deleteCard(parseInt(params.idCard));
		});

		http.route("post", "/boards/:idBoard/updatePositionMap", async function (params: any, body: any) {
			const boardService = new BoardService(boardRepository, columnRepository, cardRepository);
			await boardService.updatePositionMap(body);
		});
	}
}