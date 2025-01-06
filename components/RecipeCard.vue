<template>
  <NuxtLink :to="to" class="flex flex-col gap-y-1 md:gap-y-2">
    <div
      class="w-full h-[170px] md:h-[200px] lg:h-[250px] overflow-hidden rounded"
    >
      <NuxtImg
        :src="image"
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>
    <h4
      class="text-base lg:text-lg text-neutral-900 font-medium hover:underline"
    >
      {{ title }}
    </h4>
    <p class="text-sm lg:text-base text-neutral-600 flex items-center gap-x-4">
      <span class="flex items-center gap-x-2">
        <Icon name="mdi-light:clock" class="size-4 lg:size-5" />
        {{ duration }}
      </span>
      <span v-if="calory" class="flex items-center gap-x-2">
        <Icon name="ph:chef-hat-light" class="size-4 lg:size-5" />
        {{ calory }}
      </span>
      <span class="flex items-center gap-x-2">
        <Icon name="ph:chef-hat-light" class="size-4 lg:size-5" />
        {{ difficulty }}
      </span>
    </p>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string;
  image: string;
  title: string;
  duration: string;
  calory?: string;
  difficulty: string;
}>();
</script>
