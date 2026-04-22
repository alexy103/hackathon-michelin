type QuestionAnswer = number | string;

export function useQuestion(
  emit: (event: "answer", choice: QuestionAnswer) => void,
) {
  const selectedChoice = ref<QuestionAnswer | null>(null);
  const isFlipping = ref(false);

  function selectAndValidate(choice: QuestionAnswer) {
    selectedChoice.value = choice;

    setTimeout(() => {
      isFlipping.value = true;
      emit("answer", choice);
      selectedChoice.value = null;
    }, 600);
  }

  return {
    selectedChoice,
    isFlipping,
    selectAndValidate,
  };
}
