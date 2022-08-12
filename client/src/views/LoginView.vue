<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/AuthStore';

const username = ref("");
const password = ref("");

const authStore = useAuthStore();

</script>

<template>
	<input type="text" v-model="username"/>
	<input type="text" v-model="password"/>
	<button @click="authStore.login(username, password)">login</button>
</template>