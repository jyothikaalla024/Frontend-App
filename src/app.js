const API_BASE_URL = "http://localhost:4000";

async function registerUser() {
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  try {
    console.log("Attempting to connect to:", `${API_BASE_URL}/register`);
    
    const res = await fetch('http://127.0.0.1:4000/users')
{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    
    console.log("Response status:", res.status);
    
    const data = await res.json();
    document.getElementById("result").innerText = JSON.stringify(data, null, 2);
  } catch (error) {
    console.error("Full error:", error);
    document.getElementById("result").innerText = 
      `Error: ${error.message}\n\nMake sure your backend is running at ${API_BASE_URL}`;
  }
}
