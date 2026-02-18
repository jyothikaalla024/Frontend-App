const API_BASE_URL = "https://api.amznpro.online";

// ================= HELPERS =================
async function safeFetch(url, options = {}) {
    try {
        const res = await fetch(url, options);

        if (!res.ok) {
            // Show HTTP error
            document.getElementById("result").innerText =
                `Error ${res.status}: ${res.statusText}`;
            return null;
        }

        // Try parsing JSON
        try {
            const data = await res.json();
            return data;
        } catch (err) {
            document.getElementById("result").innerText =
                "Error parsing JSON: " + err;
            return null;
        }

    } catch (err) {
        document.getElementById("result").innerText =
            "Network error: " + err;
        return null;
    }
}

// ================= REGISTER =================
async function registerUser() {
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    // Optional: Use mock response if API blocked
    const useMock = false; // set true for testing without server
    if (useMock) {
        const mockData = { success: true, message: `Registered ${name} (${email})` };
        document.getElementById("result").innerText = JSON.stringify(mockData, null, 2);
        return;
    }

    const data = await safeFetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_API_KEY" // remove if not required
        },
        body: JSON.stringify({ name, email, password })
    });

    if (data) {
        document.getElementById("result").innerText = JSON.stringify(data, null, 2);
    }
}

// ================= LOGIN =================
async function loginUser() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const data = await safeFetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    if (data) {
        document.getElementById("result").innerText = JSON.stringify(data, null, 2);
    }
}

// ================= LOAD USERS =================
async function loadUsers() {
    const data = await safeFetch(`${API_BASE_URL}/users`);
    if (data) document.getElementById("result").innerText = JSON.stringify(data, null, 2);
}

// ================= LOAD ORDERS =================
async function loadOrders() {
    const data = await safeFetch(`${API_BASE_URL}/orders`);
    if (data) document.getElementById("result").innerText = JSON.stringify(data, null, 2);
}  
