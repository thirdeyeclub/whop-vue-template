<script setup lang="ts">
import { useWhop } from '../composables/useWhop';
import { ref, onMounted } from 'vue';

const { checkMembership, error } = useWhop();
const hasAccess = ref<boolean>(false);
const companyId = process.env.WHOP_COMPANY_ID;

onMounted(async () => {
  hasAccess.value = await checkMembership();
});
</script>

<template>
  <div class="p-4">
    <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>
    <div v-if="hasAccess" class="text-green-500">
      🎉 You have an active membership! Enjoy premium content.
    </div>
    <div v-else class="text-yellow-500">
      Please upgrade your membership to access premium content.
      <a
        :href="`https://whop.com/hub/${companyId}`"
        target="_blank"
        class="text-blue-500 underline"
      >
        Upgrade now
      </a>
    </div>
  </div>
</template>