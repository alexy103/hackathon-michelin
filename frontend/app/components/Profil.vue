<template>
  <div class="flex min-h-screen items-start justify-center bg-gray-100">
    <div
      class="flex min-h-screen w-full max-w-[390px] flex-col items-center justify-between bg-[#BA0B2F] px-6 py-12"
      style="font-family: &quot;Figtree&quot;, sans-serif"
    >
      <div class="text-center">
        <p class="mb-1 text-xs tracking-widest text-white/70 uppercase">
          TON GUIDE
        </p>
        <p class="text-2xl font-bold tracking-widest text-white">MICHELIN</p>
      </div>

      <div class="flex flex-col items-center gap-10 text-center">
        <div>
          <h1
            class="mb-4 text-2xl leading-tight font-bold text-white uppercase"
          >
            TON PROFIL A ÉTÉ<br />ENREGISTRÉ
          </h1>
          <p class="text-sm leading-relaxed text-white/80">
            Tu peux désormais retrouver tes recommandations personnalisées à
            tout moment.
          </p>
        </div>

        <img
          :src="`${config.app.baseURL}WhiteStar.png`"
          alt="Fleur Michelin"
          class="h-40 w-40 object-contain"
        />

        <div class="flex flex-col items-center gap-4">
          <p class="text-base font-bold tracking-widest text-white uppercase">
            PARTAGE TON EXPÉRIENCE
          </p>
          <button
            class="rounded-xl bg-white px-12 py-4 text-base font-bold text-[#BA0B2F] transition-all hover:bg-white/90 active:scale-95"
          >
            #MONBIBMICHELIN
          </button>
        </div>
      </div>

      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
</script>
