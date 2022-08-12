import Board from "../entities/Board";
import Card from "../entities/Card";
import Column from "../entities/Column";
import HttpClient from "../infra/http/HttpClient";
import BoardService, { SaveBoardInput, SaveCardInput, SaveColumnInput, UpdateCardInput } from "./BoardService";

export default class BoardServiceHttp implements BoardService {

	constructor (readonly httpClient: HttpClient, readonly baseUrl: string) {
	}

	async getBoard(idBoard: number): Promise<Board> {
		const boardData = await this.httpClient.get(`${this.baseUrl}/boards/${idBoard}`);
		const board = new Board(boardData.idBoard, boardData.name);
		for (const columnData of boardData.columns) {
			const column = new Column(columnData.name, columnData.hasEstimative);
			column.idColumn = columnData.idColumn;
			board.columns.push(column);
			for (const cardData of columnData.cards) {
				const card = new Card(cardData.title, cardData.estimative, cardData.color);
				card.idCard = cardData.idCard;
				column.cards.push(card);
			}
		}
		return board;
	}

	async saveBoard(board: SaveBoardInput): Promise<number> {
		const idBoard = await this.httpClient.post(`${this.baseUrl}/boards`, board);
		return idBoard;
	}

	async saveColumn(column: SaveColumnInput): Promise<number> {
		const idColumn = await this.httpClient.post(`${this.baseUrl}/boards/${column.idBoard}/columns`, column);
		return idColumn;
	}

	async deleteColumn(idBoard: number, idColumn: number): Promise<void> {
		await this.httpClient.delete(`${this.baseUrl}/boards/${idBoard}/columns/${idColumn}`);
	}

	async saveCard(card: SaveCardInput): Promise<number> {
		const idCard = await this.httpClient.post(`${this.baseUrl}/boards/${card.idBoard}/columns/${card.idColumn}/cards`, card);
		return idCard;
	}

	async deleteCard(idBoard: number, idColumn: number, idCard: number): Promise<void> {
		await this.httpClient.delete(`${this.baseUrl}/boards/${idBoard}/columns/${idColumn}/cards/${idCard}`);
	}

	async updateCard(card: UpdateCardInput): Promise<void> {
		await this.httpClient.put(`${this.baseUrl}/boards/${card.idBoard}/columns/${card.idColumn}/cards/${card.idCard}`, card);
	}

	async updatePositionMap(input: { idBoard: number; positionMap: { [idColumn: number]: number[]; }; }): Promise<void> {
		await this.httpClient.post(`${this.baseUrl}/boards/${input.idBoard}/updatePositionMap`, input.positionMap);
	}	
	
}
