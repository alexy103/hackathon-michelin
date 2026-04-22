<script setup>
const props = defineProps({
  step: Number,
  label: String,
});
</script>

<template>
  <div class="relative min-h-screen text-center">
    <p class="pt-20 text-2xl">Étape {{ step }}</p>
    <h1
      class="absolute top-1/2 left-1/2 z-2 w-full -translate-1/2 text-4xl font-extrabold uppercase"
    >
      {{ label }}
    </h1>
    <img
      class="absolute top-1/2 left-1/2 w-64 -translate-1/2 animate-spin [animation-duration:5s]"
      src="/RedStar.png"
      alt=""
    />
  </div>
</template>
