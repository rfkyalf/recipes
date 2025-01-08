<template>
  <section class="container mx-auto px-4">
    <div class="flex flex-col gap-4">
      <HeaderSection title="Cari Berdasarkan Kategori" />
      <ErrorDisplay
        v-if="error && status === 'error'"
        :statusCode="error.statusCode"
        :message="error.message"
      />
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
      >
        <div
          v-if="status === 'pending'"
          class="h-[150px] w-full bg-neutral-300 rounded animate-pulse"
          v-for="index in 10"
          :key="index"
        />
        <NuxtLink
          v-if="status === 'success' && data?.data.categories"
          :to="`/resep/${kategori.slug}`"
          :title="kategori.title"
          v-for="kategori in data?.data.categories"
          class="h-[150px] w-full rounded overflow-hidden relative group"
        >
          <NuxtImg
            :alt="kategori.title"
            :src="kategori.image"
            format="webp"
            class="h-full w-full object-cover object-center absolute inset-0"
          />
          <div
            class="absolute inset-0 h-full w-full bg-neutral-950/40 group-hover:bg-neutral-950/60 text-neutral-50 font-semibold text-xl md:text-2xl text-center flex items-center justify-center"
          >
            {{ kategori.title }}
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { FetchError, Recipe } from '~/types';

defineProps<{
  error: FetchError | null;
  data: Recipe | null;
  status: string;
}>();
</script>
