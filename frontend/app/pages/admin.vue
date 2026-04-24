<template>
  <div class="min-h-screen bg-white" style="font-family: 'Figtree', sans-serif;">

    <!-- Login -->
    <div v-if="!isAuthenticated" class="min-h-screen flex items-center justify-center px-6">
      <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-[#BA0B2F] mb-1">MICHELIN</h1>
          <p class="text-[#757575] text-sm">Administration</p>
        </div>

        <div class="flex flex-col gap-4">
          <div>
            <label class="text-xs font-medium text-[#191919] uppercase tracking-widest mb-1 block">Email</label>
            <input
              v-model="loginForm.email"
              type="email"
              autocomplete="off"
              placeholder=""
              class="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#BA0B2F] transition-colors"
            />
          </div>
          <div>
            <label class="text-xs font-medium text-[#191919] uppercase tracking-widest mb-1 block">Mot de passe</label>
            <input
              v-model="loginForm.password"
              type="password"
              autocomplete="new-password"
              placeholder=""
              class="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#BA0B2F] transition-colors"
              @keyup.enter="handleLogin"
            />
          </div>

          <p v-if="loginError" class="text-[#BA0B2F] text-xs text-center">{{ loginError }}</p>

          <button
            @click="handleLogin"
            :disabled="loading"
            class="bg-[#BA0B2F] text-white text-sm font-bold py-3 rounded-full hover:bg-[#9a0926] active:scale-95 transition-all mt-2 disabled:opacity-50"
          >
            {{ loading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Dashboard -->
    <div v-else>

      <!-- Header -->
      <div class="bg-[#BA0B2F] px-6 py-4 flex items-center justify-between">
        <h1 class="text-white font-bold text-lg">Admin Michelin</h1>
        <button @click="handleLogout" class="text-white/70 text-xs hover:text-white">
          Déconnexion
        </button>
      </div>

      <!-- Contenu -->
      <div class="px-6 py-8 max-w-2xl mx-auto">

        <div class="flex items-center justify-between mb-6">
          <h2 class="text-[#191919] font-bold text-lg">Questions du quiz</h2>
          <button
            @click="openModal()"
            class="bg-[#BA0B2F] text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#9a0926] active:scale-95 transition-all"
          >
            + Ajouter
          </button>
        </div>

        <p v-if="loadingQuestions" class="text-[#757575] text-sm text-center py-10">Chargement...</p>

        <div v-else class="flex flex-col gap-4">
          <div
            v-for="question in questions" :key="question.id"
            class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-start justify-between gap-4"
          >
            <div class="flex-1">
              <div class="flex gap-2 mb-1">
                <span class="text-[#BA0B2F] text-xs font-semibold uppercase tracking-widest">Type {{ question.question_type_id }}</span>
                <span class="text-[#757575] text-xs">Étape {{ question.step_id }}</span>
              </div>
              <p class="text-[#191919] text-sm font-medium">{{ question.label }}</p>
              <p v-if="question.timer" class="text-[#757575] text-xs mt-1">Timer : {{ question.timer }}s</p>
            </div>
            <div class="flex gap-2 shrink-0">
              <button
                @click="openModal(question)"
                class="text-xs text-[#4D4D4D] border border-gray-200 px-3 py-1.5 rounded-full hover:border-[#BA0B2F] hover:text-[#BA0B2F] transition-colors"
              >
                Éditer
              </button>
              <button
                @click="handleDelete(question.id)"
                class="text-xs text-[#BA0B2F] border border-[#BA0B2F] px-3 py-1.5 rounded-full hover:bg-[#BA0B2F] hover:text-white transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center px-6 z-50">
      <div class="bg-white rounded-2xl p-6 w-full max-w-md">
        <h3 class="text-[#191919] font-bold text-base mb-5">
          {{ editQuestion ? 'Modifier la question' : 'Nouvelle question' }}
        </h3>

        <div class="flex flex-col gap-4">
          <div>
            <label class="text-xs font-medium text-[#191919] uppercase tracking-widest mb-1 block">Question</label>
            <input
              v-model="form.label"
              type="text"
              placeholder="Votre question..."
              class="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#BA0B2F]"
            />
          </div>
          <div>
            <label class="text-xs font-medium text-[#191919] uppercase tracking-widest mb-1 block">Type de question (ID)</label>
            <input
              v-model.number="form.question_type_id"
              type="number"
              placeholder="1"
              class="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#BA0B2F]"
            />
          </div>
          <div>
            <label class="text-xs font-medium text-[#191919] uppercase tracking-widest mb-1 block">Étape (ID)</label>
            <input
              v-model.number="form.step_id"
              type="number"
              placeholder="1"
              class="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#BA0B2F]"
            />
          </div>
          <div>
            <label class="text-xs font-medium text-[#191919] uppercase tracking-widest mb-1 block">Timer (secondes, optionnel)</label>
            <input
              v-model.number="form.timer"
              type="number"
              placeholder="7"
              class="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#BA0B2F]"
            />
          </div>
        </div>

        <p v-if="formError" class="text-[#BA0B2F] text-xs mt-3 text-center">{{ formError }}</p>

        <div class="flex gap-3 mt-6">
          <button
            @click="showModal = false"
            class="flex-1 border border-gray-200 text-[#4D4D4D] text-sm font-medium py-3 rounded-full hover:border-[#BA0B2F] transition-colors"
          >
            Annuler
          </button>
          <button
            @click="handleSave"
            :disabled="loading"
            class="flex-1 bg-[#BA0B2F] text-white text-sm font-bold py-3 rounded-full hover:bg-[#9a0926] transition-colors disabled:opacity-50"
          >
            {{ loading ? '...' : editQuestion ? 'Modifier' : 'Ajouter' }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  ssr: false,
  layout: 'blank'
})

const { login, logout, getQuestions, createQuestion, updateQuestion, deleteQuestion } = useApi()

const isAuthenticated = ref(false)
const loading = ref(false)
const loginError = ref('')
const loginForm = ref<{ email: string; password: string }>({ email: '', password: '' })

async function handleLogin() {
  loading.value = true
  loginError.value = ''
  try {
    const data = await login(loginForm.value.email, loginForm.value.password)
    if (data.role !== 'admin') {
      loginError.value = 'Accès réservé aux administrateurs'
      return
    }
    isAuthenticated.value = true
    await loadQuestions()
  } catch (e: any) {
    loginError.value = e.message
  } finally {
    loading.value = false
  }
}

async function handleLogout() {
  await logout()
  isAuthenticated.value = false
}

const questions = ref<any[]>([])
const loadingQuestions = ref(false)

async function loadQuestions() {
  loadingQuestions.value = true
  try {
    questions.value = await getQuestions()
  } finally {
    loadingQuestions.value = false
  }
}

const showModal = ref(false)
const editQuestion = ref<any>(null)
const formError = ref('')
const form = ref<{ label: string; question_type_id: number; step_id: number; timer: number | null }>({
  label: '',
  question_type_id: 1,
  step_id: 1,
  timer: null
})

function openModal(question?: any) {
  editQuestion.value = question ?? null
  formError.value = ''
  form.value = question
    ? { label: question.label, question_type_id: question.question_type_id, step_id: question.step_id, timer: question.timer }
    : { label: '', question_type_id: 1, step_id: 1, timer: null }
  showModal.value = true
}

async function handleSave() {
  loading.value = true
  formError.value = ''
  try {
    const payload = {
      label: form.value.label,
      question_type_id: form.value.question_type_id,
      step_id: form.value.step_id,
      ...(form.value.timer ? { timer: form.value.timer } : {})
    }
    if (editQuestion.value) {
      await updateQuestion(editQuestion.value.id, payload)
    } else {
      await createQuestion(payload)
    }
    await loadQuestions()
    showModal.value = false
  } catch (e: any) {
    formError.value = e.message
  } finally {
    loading.value = false
  }
}

async function handleDelete(id: number) {
  if (!confirm('Supprimer cette question ?')) return
  try {
    await deleteQuestion(id)
    await loadQuestions()
  } catch (e: any) {
    alert(e.message)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&display=swap');
</style>