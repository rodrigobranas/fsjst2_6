<script setup lang="ts">
import { useAuthStore } from '../stores/AuthStore';

const authStore = useAuthStore();
</script>

<template>
	<div class="nav">
		{{ authStore.session.token }}
		<button @click="authStore.logout()">Logout</button>
	</div>
</template>

<style>
.nav {
	text-align: right;
	margin-bottom: 20px;
}
</style>