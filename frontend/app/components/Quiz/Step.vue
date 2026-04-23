<script setup>
const props = defineProps({
  step: Number,
  label: String,
});

const config = useRuntimeConfig();
</script>

<template>
  <div class="relative min-h-screen text-center">
    <div class="flex items-center justify-center gap-2 pt-20">
      <p class="text-2xl">Étape</p>
      <img
        v-for="i in step"
        :key="i"
        :src="`${config.app.baseURL}WhiteStar.png`"
        alt=""
        class="h-6 w-5.5"
      />
    </div>

    <h1
      class="absolute top-1/2 left-1/2 z-2 w-full -translate-1/2 text-4xl font-extrabold uppercase"
    >
      {{ label }}
    </h1>

    <img
      class="absolute top-1/2 left-1/2 w-64 -translate-1/2 animate-spin [animation-duration:5s]"
      :src="`${config.app.baseURL}DarkRedStar.png`"
      alt=""
    />
  </div>
</template>
