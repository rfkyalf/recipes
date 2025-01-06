<template>
  <section class="container mx-auto p-4">
    <div class="flex flex-col gap-4">
      <div class="flex justify-between items-end">
        <h3 class="text-2xl md:text-3xl text-neutral-900 font-bold">
          Resep Terbaru
        </h3>
        <LihatSelengkapnyaButton to="/resep" class="hidden md:flex" />
      </div>
      <ErrorDisplay
        v-if="error && status === 'error'"
        :statusCode="error.statusCode"
        :message="error.message"
      />
      <ul
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4"
      >
        <li v-for="(recipe, index) in data?.data.newestRecipes" :key="index">
          <RecipeCardLoading v-if="status === 'pending'" />
          <RecipeCard
            v-if="status === 'success'"
            :to="`/detail/${recipe.slug}`"
            :title="recipe.title"
            :image="recipe.image"
            :duration="recipe.duration"
            :difficulty="recipe.difficulty"
            :calory="recipe.calory"
          />
        </li>
      </ul>
      <LihatSelengkapnyaButton
        to="/resep"
        class="flex justify-center md:hidden"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { FetchError, Recipe } from '~/types';

defineProps<{
  error: FetchError | null;
  status: string;
  data: Recipe | null;
}>();
</script>
