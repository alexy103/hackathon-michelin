<template>
  <StepSlider
    v-if="currentStep === 1"
    :currentStep="1"
    :totalSteps="8"
    question="Quel budget souhaitez-vous consacrer à cette expérience ?"
    :labels="['€', '€€', '€€€']"
    :steps="5"
    v-model="budgetValue"
    @next="handleNext"
    @back="handleBack"
  />

  <StepSlider
    v-else-if="currentStep === 2"
    :currentStep="2"
    :totalSteps="8"
    question="Quand souhaitez-vous vivre cette expérience ?"
    :labels="['Matin', 'Midi', 'Soir']"
    :steps="3"
    v-model="momentValue"
    @next="handleNext"
    @back="handleBack"
  />

  <StepChoix
    v-else-if="currentStep === 3"
    :currentStep="3"
    :totalSteps="8"
    question="Quel type d'expérience souhaitez-vous faire ?"
    :options="['Un restaurant', 'Un hôtel', 'Une activité']"
    v-model="typeValue"
    @next="handleNext"
    @back="handleBack"
  />

  <StepMotsCaches
    v-else-if="currentStep === 4"
    :currentStep="4"
    :totalSteps="8"
    @next="handleNext"
    @back="handleBack"
  />

  <Resultats
    v-else-if="currentStep === 5"
    @enregistrer="currentStep = 6"
  />

  <Profil v-else-if="currentStep === 6" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StepSlider from './components/TestPersonnalite.vue'
import StepChoix from './components/StepChoix.vue'
import StepMotsCaches from './components/StepMotsCaches.vue'
import Resultats from './components/Resultats.vue'
import Profil from './components/Profil.vue'

const currentStep = ref(1)
const budgetValue = ref(2)
const momentValue = ref(1)
const typeValue = ref<number[]>([])

const labelsBudget = ['€', '€€', '€€€', '€€€€', '€€€€€']
const labelsMoment = ['Matin', 'Midi', 'Soir']
const labelsType = ['Un restaurant', 'Un hôtel', 'Une activité']

const reponses = ref({
  budget: '€€',
  moment: 'Midi',
  type: [] as string[],
  mot: '',
})

function handleNext(value?: any) {
  if (currentStep.value === 1) reponses.value.budget = labelsBudget[budgetValue.value]
  if (currentStep.value === 2) reponses.value.moment = labelsMoment[momentValue.value]
  if (currentStep.value === 3) reponses.value.type = typeValue.value.map(i => labelsType[i])
  if (currentStep.value === 4) reponses.value.mot = value

  if (currentStep.value < 4) {
    currentStep.value++
  } else {
    console.log('Réponses finales :', reponses.value)
    currentStep.value++
  }
}

function handleBack() {
  if (currentStep.value > 1) currentStep.value--
}
</script>