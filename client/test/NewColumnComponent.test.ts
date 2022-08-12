import { mount } from "@vue/test-utils";
import NewColumnComponentVue from "../src/components/NewColumnComponent.vue";
import Board from "../src/entities/Board";
import DomainEvent from "../src/events/DomainEvent";

test.skip("Deve testar o column component", async function () {
	const board = new Board(1, "Projeto 1");
	board.addColumn("Todo", true);
	board.addColumn("Doing", true);
	board.addColumn("Done", false);
	board.addCard("Todo", "Atividade 1", 3);
	board.addCard("Todo", "Atividade 2", 2);
	board.addCard("Todo", "Atividade 3", 1);
	const events: DomainEvent[] = [];
	board.on("addColumn", function (event: DomainEvent) {
		events.push(event);
	});
	const wrapper = mount(NewColumnComponentVue, {
		props: {
			board
		}
	});
	await wrapper.get(".new-column-input").setValue("Todo");
	await wrapper.get(".new-column-add").trigger("click");
	expect(board.columns).toHaveLength(4);
	expect(events).toHaveLength(1);
	const [event] = events;
	expect(event.name).toBe("addColumn");
	expect(event.data.name).toBe("Todo");
});
