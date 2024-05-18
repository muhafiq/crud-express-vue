import { ref } from "vue";
import { jwtDecode } from "jwt-decode";

async function checkAccessToken(token) {
  const payload = jwtDecode(token);
  if (new Date().getTime() > payload.exp * 1000) {
    const { data, error, fetchData } = useFetch("/auth/token", { auth: false });
    await fetchData();
    if (error.value) {
      return;
    }

    localStorage.setItem("user", JSON.stringify({ accessToken: data.value.accessToken }));
    return data.value.accessToken;
  } else {
    return token;
  }
}

export function useFetch(endpoint, options = {}) {
  const baseUrl = "http://localhost:3000/api/v1";
  let accessToken = "";

  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const fetchData = async () => {
    if (options.auth) {
      accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
      accessToken = await checkAccessToken(accessToken);
    }

    loading.value = true;
    error.value = null;

    const fetchOptions = {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: options.auth ? "Bearer " + accessToken : null,
      },
      body: options.body ? JSON.stringify(options.body) : null,
      credentials: "include",
    };

    try {
      const res = await fetch(`${baseUrl}${endpoint}`, fetchOptions);
      if (!res.ok) {
        error.value = await res.json();
        return;
      }
      data.value = await res.json();
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return { data, error, loading, fetchData };
}
