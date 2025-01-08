<template>
  <section
    class="relative overflow-hidden lg:h-screen w-full bg-[#F1F1F1] flex items-center justify-center"
  >
    <div
      class="container mx-auto px-4 py-4 md:py-12 lg:py-0 flex flex-col gap-y-8 md:flex-row md:items-center md:justify-between"
    >
      <div class="flex flex-col gap-y-1 md:gap-y-2 lg:gap-y-4">
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px]"
        >
          <span class="text-pink-500">Inspirasi</span>
          Masakan Sehari-hari
        </h2>
        <p
          class="text-base lg:text-lg text-neutral-700 md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] text-pretty"
        >
          {{ PARAGRAPH }}
        </p>
        <NuxtLink
          to="/resep"
          class="w-fit bg-pink-500 hover:bg-pink-700 text-base lg:text-lg text-white px-6 py-2 rounded mt-4"
        >
          Jelajahi Resep
        </NuxtLink>
      </div>
      <NuxtImg
        src="/images/hero.png"
        alt="Hero Image"
        class="size-[90%] md:size-[300px] lg:size-[400px] xl:size-[500px] object-cover self-center"
      />
    </div>
  </section>
</template>

<script setup>
const PARAGRAPH =
  'Temukan berbagai resep masakan yang mudah dan praktis untuk menemani setiap hari Anda. Dari sarapan hingga makan malam, kami menyediakan inspirasi untuk menciptakan hidangan lezat dan sehat, tanpa ribet!';
</script>
