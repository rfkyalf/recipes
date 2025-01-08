<template>
  <h3 class="text-2xl md:text-3xl text-neutral-900 font-bold">{{ title }}</h3>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
