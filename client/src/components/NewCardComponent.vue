<script setup lang="ts">
import { ref } from 'vue';
defineProps(["board", "column"]);
let cardTitle = ref("");
</script>

<template>
	<div class="new-card">
		<input class="new-card-input" type="text" v-model="cardTitle" />
		<button class="new-card-add" v-on:click="board?.addCard(column.name, cardTitle, 0)">Add</button>	
	</div>
</template>

<style scoped>
.new-card {
	text-align: center;
	width: 100%;
	height: 80px;
	margin-bottom: 10px;
	align-items: center;
	justify-content: space-around;
	background-color: #EEE;
	border: 1px dashed #CCC;
	display: block;
}
</style>