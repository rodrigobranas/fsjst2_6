import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import ColumnRepositoryDatabase from "../../src/infra/repository/ColumnRepositoryDatabase";
import ColumnService from "../../src/service/ColumnService";

test("Deve listar as colunas", async function () {
	const connection = new PgPromiseConnection();
	const columnRepository = new ColumnRepositoryDatabase(connection);
	const columnService = new ColumnService(columnRepository);
	const columns = await columnService.getColumns(1);
	expect(columns).toHaveLength(3);
	await connection.close();
});