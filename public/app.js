// ================= MOCK DATA =================
let users = [];
let orders = [
  { id: 1, item: "Laptop", user: "alice@example.com" },
  { id: 2, item: "Phone", user: "bob@example.com" },
];

// Helper to update result box
function showResult(data) {
  document.getElementById("result").innerText = JSON.stringify(data, null, 2);
}

// ================= REGISTER =================
function registerUser() {
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  if (!name || !email || !password) {
    showResult({ success: false, message: "All fields are required!" });
    return;
  }

  if (users.find(u => u.email === email)) {
    showResult({ success: false, message: "User already registered!" });
    return;
  }

  users.push({ name, email, password });
  showResult({ success: true, message: `Registered ${name} (${email}) successfully!` });

  // Clear input fields
  document.getElementById("regName").value = "";
  document.getElementById("regEmail").value = "";
  document.getElementById("regPassword").value = "";
}

// ================= LOGIN =================
function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    showResult({ success: true, message: `Welcome back, ${user.name}!` });
  } else {
    showResult({ success: false, message: "Invalid email or password!" });
  }

  document.getElementById("loginEmail").value = "";
  document.getElementById("loginPassword").value = "";
}

// ================= LOAD USERS =================
function loadUsers() {
  if (users.length === 0) {
    showResult({ message: "No users registered yet." });
  } else {
    const safeUsers = users.map(u => ({ name: u.name, email: u.email }));
    showResult(safeUsers);
  }
}

// ================= LOAD ORDERS =================
function loadOrders() {
  showResult(orders);
}
