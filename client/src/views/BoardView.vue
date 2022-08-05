<script setup lang="ts">
import { inject, onMounted, reactive, ref } from "vue";
import Board from "../entities/Board.js";
import BoardService from "../services/BoardService.js";
import BoardComponent from "../components/BoardComponent.vue";
import DomainEvent from "../events/DomainEvent.js";

const data: { board: Board | undefined } = reactive({ board: undefined });

onMounted(async () => {
	const boardService = inject("boardService") as BoardService;
	const board = await boardService.getBoard(1);
	board.on("addColumn", async function (event: DomainEvent) {
		await boardService.saveColumn(event.data);
	});
	data.board = board;
});
</script>

<template>
	<BoardComponent :board="data.board"></BoardComponent>
</template>

<style scoped>
</style>
