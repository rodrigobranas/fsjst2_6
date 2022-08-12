<script setup lang="ts">
defineProps(["board", "column", "card"]);
</script>

<template>
	<div :style="{'background-color': card.color }" class="card" draggable="true" @dragstart="board.selectCard(column, card)" @dragend="board.resetCard()" @dragover="board.swap(card)">
		<div class="card-title">
			{{ card.idCard }} {{ card.title }} (<span class="card-estimative">{{ card.estimative }}</span>)
		</div>
		<div>
			<button class="card-increase-estimative" @click="board?.increaseEstimative(column, card)">+</button>
			<button class="card-increase-estimative" @click="board?.decreaseEstimative(column, card)">-</button>
			<button @click="board.deleteCard(column, card.idCard)">delete</button>
		</div>
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
}

.card-title {
	padding: 15px;
}
</style>