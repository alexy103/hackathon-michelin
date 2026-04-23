<script setup lang="ts">
const {
  public: { apiBase },
} = useRuntimeConfig();

const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMsg = ref("");
const successMsg = ref("");

async function handleLogin() {
  loading.value = true;
  errorMsg.value = "";
  successMsg.value = "";

  try {
    const res = await $fetch<{
      success: boolean;
      data: { accessToken: string };
    }>(`${apiBase}/api/auth/login`, {
      method: "POST",
      body: { email: email.value, password: password.value },
    });
    successMsg.value = `Connecté ! Token reçu : ${res.data.accessToken.slice(0, 30)}…`;
  } catch (err: any) {
    errorMsg.value = err?.data?.error ?? err?.message ?? "Erreur de connexion";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-900">
    <div
      class="relative flex min-h-screen w-full max-w-[390px] flex-col bg-[#BA0B2F] px-6 py-10"
      style="font-family: &quot;Figtree&quot;, sans-serif"
    >
      <h1 class="mb-2 text-3xl font-semibold text-white">Connexion</h1>
      <p class="mb-10 text-sm text-white/60">
        Entrez vos identifiants pour continuer
      </p>

      <div class="flex flex-col gap-5">
        <div class="flex flex-col gap-1.5">
          <label
            class="text-xs font-semibold tracking-widest text-white/70 uppercase"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            placeholder="votre@email.com"
            class="rounded-lg border border-white/20 bg-white/10 px-4 py-3.5 text-sm text-white placeholder-white/30 transition outline-none focus:border-white/60 focus:bg-white/15"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label
            class="text-xs font-semibold tracking-widest text-white/70 uppercase"
            >Mot de passe</label
          >
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="rounded-lg border border-white/20 bg-white/10 px-4 py-3.5 text-sm text-white placeholder-white/30 transition outline-none focus:border-white/60 focus:bg-white/15"
          />
        </div>
      </div>

      <div
        v-if="errorMsg"
        class="mt-6 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white"
      >
        {{ errorMsg }}
      </div>

      <div
        v-if="successMsg"
        class="mt-6 rounded-lg border border-green-300/30 bg-green-400/10 px-4 py-3 text-sm text-green-200"
      >
        {{ successMsg }}
      </div>

      <div class="mt-auto pt-10">
        <button
          @click="handleLogin"
          :disabled="loading || !email || !password"
          class="w-full rounded-full bg-white py-4 text-sm font-semibold text-[#BA0B2F] transition-all duration-150"
          :class="
            !loading && email && password
              ? 'opacity-100 hover:bg-white/90 active:scale-95'
              : 'cursor-not-allowed opacity-40'
          "
        >
          <span v-if="loading">Connexion…</span>
          <span v-else>Se connecter</span>
        </button>
      </div>
    </div>
  </div>
</template>
