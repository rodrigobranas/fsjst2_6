<script setup lang="ts">
defineProps(["board", "column", "card"]);
</script>

<template>
	<div class="card">
		<span @click="board.deleteCard(column, card.idCard)">delete</span>
		<span class="card-title">{{ card.title }}</span> <span class="card-estimative">{{ card.estimative }}</span>
		<br/>
		<button class="card-increase-estimative" @click="board?.increaseEstimative(column, card)">+</button>
		<button class="card-increase-estimative" @click="board?.decreaseEstimative(column, card)">-</button>
	</div>
</template>

<style scoped>
.card {
	text-align: center;
	width: 100%;
	height: 80px;
	background-color: #F3E779;
	border: 1px solid #000;
	margin-bottom: 10px;
	display: flex;
	align-items: center;
	justify-content: space-around;
}
</style>