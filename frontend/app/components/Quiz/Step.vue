<script setup>
const props = defineProps({
  step: Number,
  label: String,
});
</script>

<template>
  <div class="relative min-h-screen text-center">
    <div class="flex items-center justify-center gap-2 pt-20">
      <p class="text-2xl">Étape {{ step }}</p>
      <img v-for="i in step" src="/WhiteStar.png" alt="" class="h-6 w-5.5" />
    </div>
    <h1
      class="absolute top-1/2 left-1/2 z-2 w-full -translate-1/2 text-4xl font-extrabold uppercase"
    >
      {{ label }}
    </h1>
    <img
      class="absolute top-1/2 left-1/2 w-64 -translate-1/2 animate-spin [animation-duration:5s]"
      src="/DarkRedStar.png"
      alt=""
    />
  </div>
</template>
