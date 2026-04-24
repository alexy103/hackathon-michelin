<script setup>
const props = defineProps({
  question: Object,
});

const emit = defineEmits(["answer"]);

const selectedChoice = ref(0);

function validateAnswer() {
  if (!selectedChoice.value) return;

  emit("answer", selectedChoice.value);
  selectedChoice.value = 0;
}
</script>
