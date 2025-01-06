<template>
  <div
    class="h-[100px] w-full bg-red-300 rounded text-base text-red-900 font-medium flex items-center justify-center"
  >
    Failed to fetch data || status:
    {{ statusCode }} || message: {{ message }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  statusCode?: number;
  message?: string;
}>();
</script>
