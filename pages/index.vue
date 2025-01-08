<template>
  <main
    class="font-montserat flex flex-col gap-y-6 md:gap-y-8 lg:gap-y-10 xl:gap-y-12 pb-6 md:pb-8 lg:pb-10 xl:pb-12"
  >
    <HomeHeroSection />
    <HomeResepTerbaruSection
      :data="data"
      :status="status"
      :error="
        error
          ? { statusCode: error.statusCode ?? 500, message: error.message }
          : null
      "
    />
    <HomeKategoriSection
      :data="data"
      :status="status"
      :error="
        error
          ? { statusCode: error.statusCode ?? 500, message: error.message }
          : null
      "
    />
  </main>
</template>

<script setup lang="ts">
import type { Recipe } from '~/types';

const { data, status, error } = await useFetch<Recipe>('/api/home', {
  retry: 3,
  retryDelay: 2000,
  onResponse({ response }) {
    if (response.status === 404) {
      throw new Error('Data tidak ditemukan, menghentikan percobaan ulang');
    }
  },
});
</script>
