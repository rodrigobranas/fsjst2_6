<script setup lang="ts">
import CardComponent from './CardComponent.vue';
defineProps(["board", "column"]);
</script>

<template>
	<div class="column" @dragover="board.moveCard(column)">
		<h3>{{ column.name }} <span class="estimative">{{ column.getEstimative() }}</span></h3>
		<button @click="board.deleteColumn(column.idColumn)">delete</button>
		<hr/>
		<div v-for="card in column.cards">
			<CardComponent :board="board" :column="column" :card="card"></CardComponent>
		</div>
	</div>
</template>

<style scoped>
.column {
	width: 200px;
	text-align: center;
	background-color: #CCC;
	margin-right: 5px;
	padding: 10px;
	border: 1px solid #000;
	min-height: 500px;
}
</style>