import { mount } from "@vue/test-utils";
import BoardComponentVue from "../src/components/BoardComponent.vue";
import Board from "../src/entities/Board";

test.skip("Deve testar o board component", async function () {
	const board = new Board(1, "Projeto 1");
	board.addColumn("Todo", true);
	board.addColumn("Doing", true);
	board.addColumn("Done", false);
	board.addCard("Todo", "Atividade 1", 3);
	board.addCard("Todo", "Atividade 2", 2);
	board.addCard("Todo", "Atividade 3", 1);
	board.addCard("Todo", "Atividade 4", 2);
	const wrapper = mount(BoardComponentVue, {
		props: {
			board
		}
	});
	expect(wrapper.get("#estimative").text()).toBe("8");
});
