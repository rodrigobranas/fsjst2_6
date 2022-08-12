import { ApolloServer } from "apollo-server";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import BoardRepositoryDatabase from "./infra/repository/BoardRepositoryDatabase";
import CardRepositoryDatabase from "./infra/repository/CardRepositoryDatabase";
import ColumnRepositoryDatabase from "./infra/repository/ColumnRepositoryDatabase";
import BoardService from "./service/BoardService";
import CardService from "./service/CardService";
import ColumnService from "./service/ColumnService";

const connection = new PgPromiseConnection();
const boardRepository = new BoardRepositoryDatabase(connection);
const columnRepository = new ColumnRepositoryDatabase(connection);
const cardRepository = new CardRepositoryDatabase(connection);
const boardService = new BoardService(boardRepository, columnRepository, cardRepository);
const columnService = new ColumnService(columnRepository);
const cardService = new CardService(cardRepository);

const typeDefs = `

	type Board {
		idBoard: Int
		name: String
		columns: [Column]
	}

	type Column {
		idColumn: Int
		name: String
		hasEstimative: Boolean
		cards: [Card]
	}

	type Card {
		idCard: Int
		title: String
		estimative: Int
	}

	type Query {
		boards: [Board]
		board (idBoard: Int): Board
		cards (title: String): [Card]
	}

	input CardInput {
		idColumn: Int
		title: String
		estimative: Int
	}

	type Mutation {
		saveBoard (name: String): Board
		saveCard (card: CardInput): Card
	}
`;

const resolvers = {
	Query: {
		boards (parent: any, params: any) {
			return boardService.getBoards();
		},
		board (parent: any, params: any) {
			const board = boardService.getBoardByIdBoard(params.idBoard);
			return board;
		},
		cards (parent: any, params: any) {
			return cardService.list(params.title);
		}
	},
	Mutation: {
		async saveBoard (parent: any, params: any) {
			const idBoard = await boardService.saveBoard(params.name);
			const board = await boardService.getBoard(idBoard);
			return board;
		},
		async saveCard (parent: any, params: any) {
			const idCard = await cardService.saveCard(params.card);
			const card = await cardService.getCard(idCard);
			return card;
		}
	},
	Board: {
		columns (parent: any) {
			const idBoard = parent.idBoard;
			return columnService.getColumns(idBoard);
		}
	},
	Column: {
		cards (parent: any) {
			const idColumn = parent.idColumn;
			return cardService.getCards(idColumn);
		}
	}
}

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(3002);
