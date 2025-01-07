<template>
  <main class="flex flex-col gap-y-4">
    <section class="h-screen w-full flex items-center justify-center">
      Hero Section
    </section>
    <HomeResepTerbaruSection
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

const { data, status, error } = await useFetch<Recipe>('/api/home');
</script>
