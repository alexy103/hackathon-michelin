export const useApi = () => {
  const config = useRuntimeConfig();
  const BASE_URL = config.public.apiBase;
  const token = useState<string | null>("token", () => null);
  const role = useState<string | null>("role", () => null);

  const headers = computed(() => ({
    "Content-Type": "application/json",
    "x-api-key": config.public.apiKey,
    ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
  }));

  async function login(email: string, password: string) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": config.public.apiKey,
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message ?? "Erreur de connexion");
    token.value = data.data.accessToken;
    role.value = data.data.role;
    return data.data;
  }

  async function getQuestions() {
    const res = await fetch(`${BASE_URL}/questions`, {
      headers: headers.value,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.data;
  }

  async function createQuestion(payload: object) {
    const res = await fetch(`${BASE_URL}/questions`, {
      method: "POST",
      headers: headers.value,
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.data;
  }

  async function updateQuestion(id: number, payload: object) {
    const res = await fetch(`${BASE_URL}/questions/${id}`, {
      method: "PUT",
      headers: headers.value,
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.data;
  }

  async function deleteQuestion(id: number) {
    const res = await fetch(`${BASE_URL}/questions/${id}`, {
      method: "DELETE",
      headers: headers.value,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.data;
  }

  async function logout() {
    await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: headers.value,
    });
    token.value = null;
    role.value = null;
  }

  return {
    login,
    logout,
    getQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    token,
    role,
  };
};
