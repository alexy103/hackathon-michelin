<template>
  <div class="min-h-screen bg-gray-100 flex items-start justify-center">
    <div class="w-full max-w-[390px] bg-white" style="font-family: 'Figtree', sans-serif;">

      <!-- Header rouge -->
      <div class="bg-[#BA0B2F] px-6 py-8 flex items-center justify-between relative overflow-hidden">
        <img src="/FleurRouge.png" alt="" class="absolute inset-0 w-full h-full object-contain opacity-15 pointer-events-none scale-150" />
        <div class="relative z-10">
          <h1 class="text-white text-2xl font-bold mb-3">L'EXPLORATEUR</h1>
          <ul class="text-white/80 text-sm space-y-1">
            <li>• Explorateur</li>
            <li>• Découvreur</li>
            <li>• Aventurier</li>
          </ul>
        </div>
        <img src="/Explorateur.png" alt="Explorateur" class="w-20 h-20 object-cover rounded-full border-4 border-white shadow-lg relative z-10" />
      </div>

      <!-- Profil guidé par -->
      <div class="px-6 pt-6 pb-4 text-center border-b border-gray-100">
        <p class="text-[#191919] text-xs font-medium uppercase tracking-widest mb-1">Vous êtes guidé(e) par</p>
        <h2 class="text-[#BA0B2F] text-3xl font-bold mb-3">LA DÉCOUVERTE</h2>
        <p class="text-[#757575] text-sm leading-relaxed mb-2">
          Vous aimez sortir des sentiers battus et tester de nouvelles adresses, même sans garantie.
        </p>
        <p class="text-[#757575] text-sm leading-relaxed mb-2">
          Pour vous, une expérience réussie passe par la surprise, l'inattendu et la nouveauté.
        </p>
        <p class="text-[#757575] text-sm leading-relaxed">
          Vous privilégiez les lieux authentiques, les concepts originaux et les endroits que l'on ne connaît pas encore.
        </p>
      </div>

      <!-- Vous êtes -->
      <div class="px-6 py-4 border-b border-gray-100">
        <p class="text-[#191919] text-xs font-medium uppercase tracking-widest text-center mb-4">Vous êtes :</p>
        <div class="flex gap-3 justify-center flex-wrap">
          <span class="border border-[#BA0B2F] text-[#BA0B2F] text-sm font-medium px-5 py-2 rounded-full">Curieux</span>
          <span class="border border-[#BA0B2F] text-[#BA0B2F] text-sm font-medium px-5 py-2 rounded-full">Ouvert</span>
          <span class="border border-[#BA0B2F] text-[#BA0B2F] text-sm font-medium px-5 py-2 rounded-full">Spontané</span>
        </div>
        <p class="text-[#757575] text-xs text-center mt-4 italic">
          Vous n'avez pas peur de vous tromper : ce qui compte, c'est l'expérience vécue.
        </p>
      </div>

      <!-- Sélection + restaurants + personnes tout en rouge -->
      <div class="bg-[#BA0B2F] px-6 pt-6 pb-10 relative overflow-hidden">

        <!-- Fleurs décoratives -->
        <img src="/FleurRouge.png" alt="" class="absolute -top-10 -right-10 w-48 h-48 object-contain opacity-30 pointer-events-none" />
        <img src="/FleurRouge.png" alt="" class="absolute top-1/3 -left-16 w-64 h-64 object-contain opacity-20 pointer-events-none" />
        <img src="/FleurRouge.png" alt="" class="absolute bottom-10 -right-16 w-72 h-72 object-contain opacity-20 pointer-events-none" />

        <div class="text-center mb-8 relative z-10">
          <p class="text-white text-xs font-medium uppercase tracking-widest mb-1">Notre sélection pour</p>
          <h2 class="text-white text-2xl font-bold">CAMILLE</h2>
        </div>

        <!-- Restaurant 1 -->
        <div class="mb-8 border-b border-white/20 pb-8 relative z-10">
          <h3 class="text-white text-base font-bold mb-3">LES P'TITS FAYOTS</h3>
          <div class="flex gap-4">
            <div class="flex-1">
              <p class="text-white/70 text-xs mb-1"><span class="font-semibold text-white">Type :</span> Bistronomie</p>
              <p class="text-white/70 text-xs mb-1"><span class="font-semibold text-white">Ambiance :</span> Créative, décontractée</p>
              <p class="text-white/70 text-xs mb-3"><span class="font-semibold text-white">Budget :</span> €€</p>
              <p class="text-white/70 text-xs leading-relaxed mb-3">
                <span class="font-semibold text-white">Pourquoi ce lieu :</span> Une cuisine inventive et moderne, parfaite pour une première découverte.
              </p>
              <a href="https://lespititsfayots-toulouse.fr/" class="text-white text-xs underline">lespititsfayots-toulouse.fr</a>
            </div>
            <div class="w-20 h-20 bg-white/20 rounded-xl shrink-0"></div>
          </div>
        </div>

        <!-- Restaurant 2 -->
        <div class="mb-8 border-b border-white/20 pb-8 relative z-10">
          <h3 class="text-white text-base font-bold mb-3 text-right">LE GENTY MAGRE</h3>
          <div class="flex gap-4">
            <div class="w-20 h-20 bg-white/20 rounded-xl shrink-0"></div>
            <div class="flex-1">
              <p class="text-white/70 text-xs mb-1 text-right"><span class="font-semibold text-white">Type :</span> Cuisine du Sud-Ouest revisitée</p>
              <p class="text-white/70 text-xs mb-1 text-right"><span class="font-semibold text-white">Ambiance :</span> Authentique, chaleureuse</p>
              <p class="text-white/70 text-xs mb-3 text-right"><span class="font-semibold text-white">Budget :</span> €€</p>
              <p class="text-white/70 text-xs leading-relaxed mb-3 text-right">
                <span class="font-semibold text-white">Pourquoi ce lieu :</span> Une adresse discrète qui révèle les classiques du Sud-Ouest avec finesse.
              </p>
              <a href="https://www.legentymagre.com" class="text-white text-xs underline block text-right">legentymagre.com</a>
            </div>
          </div>
        </div>

        <!-- Restaurant 3 -->
        <div class="mb-8 border-b border-white/20 pb-8 relative z-10">
          <h3 class="text-white text-base font-bold mb-3">HORTÙS</h3>
          <div class="flex gap-4">
            <div class="flex-1">
              <p class="text-white/70 text-xs mb-1"><span class="font-semibold text-white">Type :</span> Gastronomique moderne</p>
              <p class="text-white/70 text-xs mb-1"><span class="font-semibold text-white">Ambiance :</span> Élégante, végétale</p>
              <p class="text-white/70 text-xs mb-3"><span class="font-semibold text-white">Budget :</span> €€</p>
              <p class="text-white/70 text-xs leading-relaxed mb-3">
                <span class="font-semibold text-white">Pourquoi ce lieu :</span> Une expérience immersive, tournée vers la nature et la créativité.
              </p>
              <a href="https://hortus-toulouse.fr/" class="text-white text-xs underline">hortus-toulouse.fr</a>
            </div>
            <div class="w-20 h-20 bg-white/20 rounded-xl shrink-0"></div>
          </div>
        </div>

        <!-- Restaurant 4 -->
        <div class="mb-8 border-b border-white/20 pb-8 relative z-10">
          <h3 class="text-white text-base font-bold mb-3 text-right">M BY MO BACHIR</h3>
          <div class="flex gap-4">
            <div class="w-20 h-20 bg-white/20 rounded-xl shrink-0"></div>
            <div class="flex-1">
              <p class="text-white/70 text-xs mb-1 text-right"><span class="font-semibold text-white">Type :</span> Fusion / moderne</p>
              <p class="text-white/70 text-xs mb-1 text-right"><span class="font-semibold text-white">Ambiance :</span> Tendance, urbaine</p>
              <p class="text-white/70 text-xs mb-3 text-right"><span class="font-semibold text-white">Budget :</span> €€</p>
              <p class="text-white/70 text-xs leading-relaxed mb-3 text-right">
                <span class="font-semibold text-white">Pourquoi ce lieu :</span> Un lieu moderne avec une vraie identité, idéal pour tester quelque chose de différent.
              </p>
              <a href="https://mbymo.fr/" class="text-white text-xs underline block text-right">mbymo.fr</a>
            </div>
          </div>
        </div>

        <!-- Personnes comme vous -->
        <div class="pt-2 relative z-10">
          <h3 class="text-white text-sm font-bold uppercase tracking-widest mb-2">Personnes comme vous ont aimé</h3>
          <p class="text-white/70 text-xs mb-5">
            Basé sur votre profil Explorateur, ces expériences ont aussi été appréciées par des utilisateurs similaires :
          </p>
          <ul class="space-y-3">
            <li class="text-white/70 text-xs">• <span class="font-semibold text-white">Les P'tits Fayots</span> → apprécié pour son côté créatif et surprenant</li>
            <li class="text-white/70 text-xs">• <span class="font-semibold text-white">Le Genty Magre</span> → apprécié pour son authenticité locale</li>
            <li class="text-white/70 text-xs">• <span class="font-semibold text-white">Hortùs Toulouse</span> → aimé pour son approche végétale et immersive</li>
            <li class="text-white/70 text-xs">• <span class="font-semibold text-white">M by Mo Bachir</span> → aimé pour son identité moderne et urbaine</li>
          </ul>
        </div>

      </div>

      <!-- CTA -->
      <div class="bg-[#BA0B2F] px-6 pb-12 flex flex-col items-center gap-6 pt-8 relative z-10">
        <button
          @click="emit('enregistrer')"
          class="bg-white text-[#BA0B2F] text-sm font-bold px-10 py-4 rounded-full w-full hover:bg-white/90 active:scale-95 transition-all"
        >
          ENREGISTRER MON PROFIL
        </button>
        <div class="flex flex-col items-center mt-4">
          <img src="/Explorateur.png" alt="Michelin" class="w-16 h-16 object-contain rounded-full bg-white p-2 mb-4" />
          <p class="text-white/70 text-xs">TON GUIDE</p>
          <p class="text-white text-sm font-bold tracking-widest">MICHELIN</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'enregistrer'): void
}>()
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&display=swap');
</style>