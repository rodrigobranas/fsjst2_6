<script setup lang="ts">
import { inject, onMounted, reactive } from "vue";
import Board from "../entities/Board.js";
import BoardService from "../services/BoardService.js";
import BoardComponent from "../components/BoardComponent.vue";
import DomainEvent from "../events/DomainEvent.js";

const data: { board: Board | undefined } = reactive({ board: undefined });

onMounted(async () => {
	const boardService = inject("boardService") as BoardService;
	const board = await boardService.getBoard(1);
	data.board = board;
	board.on("addColumn", async function (event: DomainEvent) {
		const idColumn = await boardService.saveColumn(event.data);
		event.data.column.idColumn = idColumn;
	});
	board.on("addCard", async function (event: DomainEvent) {
		const idCard = await boardService.saveCard(event.data);
		event.data.card.idCard = idCard;
	});
	board.on("deleteColumn", async function (event: DomainEvent) {
		await boardService.deleteColumn(event.data.idBoard, event.data.idColumn);
	});
	board.on("deleteCard", async function (event: DomainEvent) {
		await boardService.deleteCard(event.data.idBoard, event.data.idColumn, event.data.idCard);
	});
	board.on("increaseEstimative", async function (event: DomainEvent) {
		await boardService.updateCard(event.data);
	});
	board.on("decreaseEstimative", async function (event: DomainEvent) {
		await boardService.updateCard(event.data);
	});
});
</script>

<template>
	<BoardComponent :board="data.board"></BoardComponent>
</template>

<style scoped>
</style>
