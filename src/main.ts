import BoardController from "./infra/controller/BoardController";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import BoardRepositoryDatabase from "./infra/repository/BoardRepositoryDatabase";

const connection = new PgPromiseConnection();
const boardRepository = new BoardRepositoryDatabase(connection);
const http = new ExpressAdapter();
new BoardController(http, connection, boardRepository);
http.listen(3000);
process.on("exit", async function () {
	await connection.close();
});