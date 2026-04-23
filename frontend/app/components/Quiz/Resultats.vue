<template>
  <div class="flex min-h-screen items-start justify-center bg-gray-100">
    <div
      class="w-full max-w-[390px] bg-white"
      style="font-family: &quot;Figtree&quot;, sans-serif"
    >
      <!-- Header rouge -->
      <div
        class="relative flex items-center justify-between overflow-hidden bg-[#BA0B2F] px-6 py-8"
      >
        <img
          :src="`${config.app.baseURL}RedStar.png`"
          alt=""
          class="pointer-events-none absolute inset-0 h-full w-full scale-150 object-contain opacity-15"
        />
        <div class="relative z-10">
          <h1 class="mb-3 text-2xl font-bold text-white">L'EXPLORATEUR</h1>
          <ul class="space-y-1 text-sm text-white/80">
            <li>• Explorateur</li>
            <li>• Découvreur</li>
            <li>• Aventurier</li>
          </ul>
        </div>
        <img
          :src="`${config.app.baseURL}Explorateur.png`"
          alt="Explorateur"
          class="relative z-10 h-20 w-20 rounded-full border-4 border-white object-cover shadow-lg"
        />
      </div>

      <!-- Profil guidé par -->
      <div class="border-b border-gray-100 px-6 pt-6 pb-4 text-center">
        <p
          class="mb-1 text-xs font-medium tracking-widest text-[#191919] uppercase"
        >
          Vous êtes guidé(e) par
        </p>
        <h2 class="mb-3 text-3xl font-bold text-[#BA0B2F]">LA DÉCOUVERTE</h2>
        <p class="mb-2 text-sm leading-relaxed text-[#757575]">
          Vous aimez sortir des sentiers battus et tester de nouvelles adresses,
          même sans garantie.
        </p>
        <p class="mb-2 text-sm leading-relaxed text-[#757575]">
          Pour vous, une expérience réussie passe par la surprise, l'inattendu
          et la nouveauté.
        </p>
        <p class="text-sm leading-relaxed text-[#757575]">
          Vous privilégiez les lieux authentiques, les concepts originaux et les
          endroits que l'on ne connaît pas encore.
        </p>
      </div>

      <!-- Vous êtes -->
      <div class="border-b border-gray-100 px-6 py-4">
        <p
          class="mb-4 text-center text-xs font-medium tracking-widest text-[#191919] uppercase"
        >
          Vous êtes :
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <span
            class="rounded-full border border-[#BA0B2F] px-5 py-2 text-sm font-medium text-[#BA0B2F]"
            >Curieux</span
          >
          <span
            class="rounded-full border border-[#BA0B2F] px-5 py-2 text-sm font-medium text-[#BA0B2F]"
            >Ouvert</span
          >
          <span
            class="rounded-full border border-[#BA0B2F] px-5 py-2 text-sm font-medium text-[#BA0B2F]"
            >Spontané</span
          >
        </div>
        <p class="mt-4 text-center text-xs text-[#757575] italic">
          Vous n'avez pas peur de vous tromper : ce qui compte, c'est
          l'expérience vécue.
        </p>
      </div>

      <!-- Sélection + restaurants + personnes tout en rouge -->
      <div class="relative overflow-hidden bg-[#BA0B2F] px-6 pt-6 pb-10">
        <!-- Fleurs décoratives -->
        <img
          :src="`${config.app.baseURL}RedStar.png`"
          alt=""
          class="pointer-events-none absolute -top-10 -right-10 h-48 w-48 object-contain opacity-30"
        />
        <img
          :src="`${config.app.baseURL}RedStar.png`"
          alt=""
          class="pointer-events-none absolute top-1/3 -left-16 h-64 w-64 object-contain opacity-20"
        />
        <img
          :src="`${config.app.baseURL}RedStar.png`"
          alt=""
          class="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 object-contain opacity-20"
        />

        <div class="relative z-10 mb-8 text-center">
          <p
            class="mb-1 text-xs font-medium tracking-widest text-white uppercase"
          >
            Notre sélection pour
          </p>
          <h2 class="text-2xl font-bold text-white">CAMILLE</h2>
        </div>

        <!-- Restaurant 1 -->
        <div class="relative z-10 mb-8 border-b border-white/20 pb-8">
          <h3 class="mb-3 text-base font-bold text-white">LES P'TITS FAYOTS</h3>
          <div class="flex gap-4">
            <div class="flex-1">
              <p class="mb-1 text-xs text-white/70">
                <span class="font-semibold text-white">Type :</span> Bistronomie
              </p>
              <p class="mb-1 text-xs text-white/70">
                <span class="font-semibold text-white">Ambiance :</span>
                Créative, décontractée
              </p>
              <p class="mb-3 text-xs text-white/70">
                <span class="font-semibold text-white">Budget :</span> €€
              </p>
              <p class="mb-3 text-xs leading-relaxed text-white/70">
                <span class="font-semibold text-white">Pourquoi ce lieu :</span>
                Une cuisine inventive et moderne, parfaite pour une première
                découverte.
              </p>
              <a
                href="https://lespititsfayots-toulouse.fr/"
                class="text-xs text-white underline"
                >lespititsfayots-toulouse.fr</a
              >
            </div>
            <div class="h-20 w-20 shrink-0 rounded-xl bg-white/20"></div>
          </div>
        </div>

        <!-- Restaurant 2 -->
        <div class="relative z-10 mb-8 border-b border-white/20 pb-8">
          <h3 class="mb-3 text-right text-base font-bold text-white">
            LE GENTY MAGRE
          </h3>
          <div class="flex gap-4">
            <div class="h-20 w-20 shrink-0 rounded-xl bg-white/20"></div>
            <div class="flex-1">
              <p class="mb-1 text-right text-xs text-white/70">
                <span class="font-semibold text-white">Type :</span> Cuisine du
                Sud-Ouest revisitée
              </p>
              <p class="mb-1 text-right text-xs text-white/70">
                <span class="font-semibold text-white">Ambiance :</span>
                Authentique, chaleureuse
              </p>
              <p class="mb-3 text-right text-xs text-white/70">
                <span class="font-semibold text-white">Budget :</span> €€
              </p>
              <p class="mb-3 text-right text-xs leading-relaxed text-white/70">
                <span class="font-semibold text-white">Pourquoi ce lieu :</span>
                Une adresse discrète qui révèle les classiques du Sud-Ouest avec
                finesse.
              </p>
              <a
                href="https://www.legentymagre.com"
                class="block text-right text-xs text-white underline"
                >legentymagre.com</a
              >
            </div>
          </div>
        </div>

        <!-- Restaurant 3 -->
        <div class="relative z-10 mb-8 border-b border-white/20 pb-8">
          <h3 class="mb-3 text-base font-bold text-white">HORTÙS</h3>
          <div class="flex gap-4">
            <div class="flex-1">
              <p class="mb-1 text-xs text-white/70">
                <span class="font-semibold text-white">Type :</span>
                Gastronomique moderne
              </p>
              <p class="mb-1 text-xs text-white/70">
                <span class="font-semibold text-white">Ambiance :</span>
                Élégante, végétale
              </p>
              <p class="mb-3 text-xs text-white/70">
                <span class="font-semibold text-white">Budget :</span> €€
              </p>
              <p class="mb-3 text-xs leading-relaxed text-white/70">
                <span class="font-semibold text-white">Pourquoi ce lieu :</span>
                Une expérience immersive, tournée vers la nature et la
                créativité.
              </p>
              <a
                href="https://hortus-toulouse.fr/"
                class="text-xs text-white underline"
                >hortus-toulouse.fr</a
              >
            </div>
            <div class="h-20 w-20 shrink-0 rounded-xl bg-white/20"></div>
          </div>
        </div>

        <!-- Restaurant 4 -->
        <div class="relative z-10 mb-8 border-b border-white/20 pb-8">
          <h3 class="mb-3 text-right text-base font-bold text-white">
            M BY MO BACHIR
          </h3>
          <div class="flex gap-4">
            <div class="h-20 w-20 shrink-0 rounded-xl bg-white/20"></div>
            <div class="flex-1">
              <p class="mb-1 text-right text-xs text-white/70">
                <span class="font-semibold text-white">Type :</span> Fusion /
                moderne
              </p>
              <p class="mb-1 text-right text-xs text-white/70">
                <span class="font-semibold text-white">Ambiance :</span>
                Tendance, urbaine
              </p>
              <p class="mb-3 text-right text-xs text-white/70">
                <span class="font-semibold text-white">Budget :</span> €€
              </p>
              <p class="mb-3 text-right text-xs leading-relaxed text-white/70">
                <span class="font-semibold text-white">Pourquoi ce lieu :</span>
                Un lieu moderne avec une vraie identité, idéal pour tester
                quelque chose de différent.
              </p>
              <a
                href="https://mbymo.fr/"
                class="block text-right text-xs text-white underline"
                >mbymo.fr</a
              >
            </div>
          </div>
        </div>

        <!-- Personnes comme vous -->
        <div class="relative z-10 pt-2">
          <h3
            class="mb-2 text-sm font-bold tracking-widest text-white uppercase"
          >
            Personnes comme vous ont aimé
          </h3>
          <p class="mb-5 text-xs text-white/70">
            Basé sur votre profil Explorateur, ces expériences ont aussi été
            appréciées par des utilisateurs similaires :
          </p>
          <ul class="space-y-3">
            <li class="text-xs text-white/70">
              • <span class="font-semibold text-white">Les P'tits Fayots</span>
              → apprécié pour son côté créatif et surprenant
            </li>
            <li class="text-xs text-white/70">
              • <span class="font-semibold text-white">Le Genty Magre</span> →
              apprécié pour son authenticité locale
            </li>
            <li class="text-xs text-white/70">
              • <span class="font-semibold text-white">Hortùs Toulouse</span> →
              aimé pour son approche végétale et immersive
            </li>
            <li class="text-xs text-white/70">
              • <span class="font-semibold text-white">M by Mo Bachir</span> →
              aimé pour son identité moderne et urbaine
            </li>
          </ul>
        </div>
      </div>

      <!-- CTA -->
      <div
        class="relative z-10 flex flex-col items-center gap-6 bg-[#BA0B2F] px-6 pt-8 pb-12"
      >
        <button
          @click="emit('enregistrer')"
          class="w-full rounded-full bg-white px-10 py-4 text-sm font-bold text-[#BA0B2F] transition-all hover:bg-white/90 active:scale-95"
        >
          ENREGISTRER MON PROFIL
        </button>
        <div class="mt-4 flex flex-col items-center">
          <img
            :src="`${config.app.baseURL}Explorateur.png`"
            alt="Michelin"
            class="mb-4 h-16 w-16 rounded-full bg-white object-contain p-2"
          />
          <p class="text-xs text-white/70">TON GUIDE</p>
          <p class="text-sm font-bold tracking-widest text-white">MICHELIN</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

const emit = defineEmits<{
  (e: "enregistrer"): void;
}>();
</script>
