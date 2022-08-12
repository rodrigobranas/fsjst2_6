import { mount } from "@vue/test-utils";
import CardComponentVue from "../src/components/CardComponent.vue";
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
	const [card] = column.cards;
	const wrapper = mount(CardComponentVue, {
		props: {
			board,
			column,
			card
		}
	});
	expect(wrapper.get(".card-title").text()).toBe("Atividade 1");
	expect(wrapper.get(".card-estimative").text()).toBe("3");
	await wrapper.get(".card-increase-estimative").trigger("click");
	await wrapper.get(".card-increase-estimative").trigger("click");
	await wrapper.get(".card-increase-estimative").trigger("click");
	expect(wrapper.get(".card-estimative").text()).toBe("6");
});

