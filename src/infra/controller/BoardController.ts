import BoardRepository from "../../domain/repository/BoardRepository";
import BoardService from "../../service/BoardService";
import CardService from "../../service/CardService";
import ColumnService from "../../service/ColumnService";
import Connection from "../database/Connection";
import Http from "../http/Http";
import BoardRepositoryDatabase from "../repository/BoardRepositoryDatabase";
import CardRepositoryDatabase from "../repository/CardRepositoryDatabase";
import ColumnRepositoryDatabase from "../repository/ColumnRepositoryDatabase";

export default class BoardController {

	constructor (readonly http: Http, readonly connection: Connection, readonly boardRepository: BoardRepository) {
		http.route("get", "/boards", async function (params: any, body: any) {
			const boardService = new BoardService(boardRepository);
			const boards = await boardService.getBoards();
			return boards;
		});

		http.route("get", "/boards/:idBoard/columns", async function (params: any, body: any) {
			const columnRepository = new ColumnRepositoryDatabase(connection);
			const columnService = new ColumnService(columnRepository);
			const columns = await columnService.getColumns(parseInt(params.idBoard));
			return columns;
		});

		http.route("get", "/boards/:idBoard/columns/:idColumn/cards", async function (params: any, body: any) {
			const cardRepository = new CardRepositoryDatabase(connection);
			const cardService = new CardService(cardRepository);
			const cards = await cardService.getCards(parseInt(params.idColumn));
			return cards;
		});
	}
}