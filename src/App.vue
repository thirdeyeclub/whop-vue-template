<script setup lang="ts">
import { useWhop } from './composables/useWhop';
import { onMounted } from 'vue';
import MembershipGate from './components/MembershipGate.vue';

const { currentUser, fetchUser } = useWhop();

onMounted(() => {
  const userId = process.env.WHOP_USER_ID || 'demo_user';
  fetchUser(userId);
});
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold mb-4">Vue Whop App Template</h1>
    <div v-if="currentUser" class="mb-4">
      Welcome, {{ currentUser.username }}!
    </div>
    <MembershipGate />
  </div>
</template>