<script setup lang="ts">
import { ref } from 'vue';
defineProps(["board"]);
let columnName = ref("");
</script>

<template>
	<div class="new-column">
		<input class="new-column-input" type="text" v-model="columnName" @keypress.enter="board?.addColumn(columnName, true)" placeholder="New Column"/>
	</div>
</template>

<style scoped>
.new-column {
	text-align: center;
}
</style>