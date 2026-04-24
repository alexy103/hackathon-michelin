export function useQuestionTypes() {
  return useApiFetch("/question-types");
}

export function useQuestionType(id: string | string[] | undefined) {
  return useApiFetch(`/question-types/${id}`);
}
