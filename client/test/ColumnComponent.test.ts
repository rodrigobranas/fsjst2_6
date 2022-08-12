import { mount } from "@vue/test-utils";
import ColumnComponentVue from "../src/components/ColumnComponent.vue";
import Board from "../src/entities/Board";

test.skip("Deve testar o column component", async function () {
	const board = new Board(1, "Projeto 1");
	board.addColumn("Todo", true);
	board.addColumn("Doing", true);
	board.addColumn("Done", false);
	board.addCard("Todo", "Atividade 1", 3);
	board.addCard("Todo", "Atividade 2", 2);
	board.addCard("Todo", "Atividade 3", 1);
	const [column] = board.columns;
	const wrapper = mount(ColumnComponentVue, {
		props: {
			board,
			column
		}
	});
	expect(wrapper.get(".estimative").text()).toBe("6");
});
