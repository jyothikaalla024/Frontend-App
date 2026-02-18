const API_BASE_URL = "/api";

// ================= Generic Fetch Helper =================
async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get("content-type");

    // If response is not OK (non-2xx)
    if (!res.ok) {
      let errorMessage = `HTTP ${res.status} ${res.statusText}`;

      if (contentType && contentType.includes("application/json")) {
        const errorData = await res.json();
        errorMessage = errorData.message || JSON.stringify(errorData);
      } else {
        const errorText = await res.text(); // Could be HTML
        console.warn("Non-JSON error response:", errorText);

        // Friendly messages for common HTTP errors
        if (res.status === 405) {
          errorMessage = "Action not allowed (405). Check HTTP method or endpoint.";
        } else if (res.status === 404) {
          errorMessage = "Resource not found (404). Check endpoint URL.";
        } else {
          errorMessage = `Server returned non-JSON response: ${res.statusText}`;
        }
      }

      throw new Error(errorMessage);
    }

    // Parse JSON if content type is JSON
    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    } else {
      return await res.text(); // Return plain text if not JSON
    }
  } catch (err) {
    console.error("Fetch failed:", err);
    document.getElementById("result").innerText = `Error: ${err.message}`;
    return null;
  }
}

// ================= REGISTER =================
async function registerUser() {
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  const data = await safeFetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (data) {
    document.getElementById("result").innerText =
      typeof data === "string" ? data : JSON.stringify(data, null, 2);
  }
}

// ================= LOGIN =================
async function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const data = await safeFetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (data) {
    document.getElementById("result").innerText =
      typeof data === "string" ? data : JSON.stringify(data, null, 2);
  }
}

// ================= LOAD USERS =================
async function loadUsers() {
  const data = await safeFetch(`${API_BASE_URL}/users`);
  if (data) {
    document.getElementById("result").innerText =
      typeof data === "string" ? data : JSON.stringify(data, null, 2);
  }
}

// ================= LOAD ORDERS =================
async function loadOrders() {
  const data = await safeFetch(`${API_BASE_URL}/orders`);
  if (data) {
    document.getElementById("result").innerText =
      typeof data === "string" ? data : JSON.stringify(data, null, 2);
  }
}
