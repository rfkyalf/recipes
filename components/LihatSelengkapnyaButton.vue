<template>
  <NuxtLink
    :to="to"
    class="text-sm lg:text-base text-pink-600 hover:text-pink-400 font-medium items-center gap-x-1"
    :class="class"
  >
    Lihat Selengkapnya
    <Icon name="tabler:chevrons-right" class="size-4 md:size-5" />
  </NuxtLink>
</template>
<script setup lang="ts">
defineProps<{
  to: string;
  class: string;
}>();
</script>
