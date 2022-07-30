<script setup lang="ts">
import axios from "axios";
import { computed, onMounted, reactive, ref } from "vue";

let data: any = reactive({});
let columnName: any = ref("");
let cardTitle = "";

function addColumn (columnName: string) {
	data.board.columns.push({ name: columnName, cards: [] });
}
function addCard (column: any, cardTitle: string) {
	column.cards.push({ title: cardTitle, estimative: 3 });
	column.estimative += 3;
}
function increaseEstimative (card: any) {
	card.estimative++;
}
const boardEstimative = computed(() => {
	return data.board.columns.reduce((total: number, column: any) => {
		total += column.cards.reduce((total: number, card: any) => {
			total += card.estimative;
			return total;
		}, 0);
		return total;
	}, 0);
});

onMounted(async () => {
	const response = await axios({
		url: "http://localhost:3000/boards/1",
		method: "get"
	});
	data.board = response.data;
});


const users = reactive([{ name: "Alice" }]);
const addUser = function (name: string) {
	users.push({ name });
}
onMounted(() => {
	// getUsers
});

</script>

<template>
	<div v-if="data.board">
		<h3>{{ data.board.name }} {{ boardEstimative }}</h3>
		<div class="columns">
			<div class="column" v-for="column in data.board.columns">
				<h3>{{ column.name }} {{ column.estimative }}</h3>
				<div class="card" v-for="card in column.cards">
					{{ card.title }} {{ card.estimative }}
					<br/>
					<button @click="increaseEstimative(card)">+</button><button>-</button>
				</div>
				<div class="card new-card">
					<input type="text" v-model="cardTitle" />
					<button v-on:click="addCard(column, cardTitle)">Add</button>	
				</div>
			</div>
			<div class="column new-column">
				{{ columnName }}
				<input type="text" v-model="columnName" />
				<button v-on:click="addColumn(columnName)">Add</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.columns {
	display: flex;
	flex-direction: row;
}
.column {
	width: 200px;
	text-align: center;
	background-color: #CCC;
	margin-right: 5px;
	padding: 10px;
	border: 1px solid #000;
}

.new-column {
	background-color: #EEE;
	border: 1px dashed #CCC;
	display: block;
}

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
.new-card {
	background-color: #EEE;
	border: 1px dashed #CCC;
	display: block;
}
</style>
