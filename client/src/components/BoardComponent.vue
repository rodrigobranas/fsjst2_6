<script setup lang="ts">
import ColumnComponent from './ColumnComponent.vue';
import NewCardComponent from './NewCardComponent.vue';
import NewColumnComponent from './NewColumnComponent.vue';
defineProps(["board"]);
</script>

<template>
	<div v-if="board">
		<h3>{{ board.name }} (<span id="estimative">{{ board.getEstimative() }}</span>)</h3>
		<div class="columns">
			<div v-for="column in board.columns">
				<ColumnComponent :board="board" :column="column"></ColumnComponent>
				<NewCardComponent :board="board" :column="column"></NewCardComponent>
			</div>
			<NewColumnComponent :board="board"></NewColumnComponent>
		</div>
	</div>
</template>

<style scoped>
.columns {
	display: flex;
	flex-direction: row;
}
</style>