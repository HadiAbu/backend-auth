let CSRF_TOKEN = null;
const statusEl = document.getElementById("status");

// 1. Fetch the token as soon as the page loads
async function fetchToken() {
  try {
    // This hits your app.get('/api/get-config')
    const response = await fetch("http://localhost:3000/api/get-config", {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Response not OK");

    const data = await response.json();
    CSRF_TOKEN = data.csrfToken;
    console.log("✅ CSRF Token Acquired");
  } catch (err) {
    statusEl.innerText = "Failed to load security token.";
    statusEl.style.color = "red";
  }
}

// 2. The Register function
async function handleRegister() {
  const username = document.getElementById("username").value.toString();
  const pass = document.getElementById("pass").value.toString();

  if (!CSRF_TOKEN) {
    alert("Security token not loaded yet. Please wait.");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // This is the crucial part:
        "X-CSRF-Token": CSRF_TOKEN,
      },
      // Crucial if your frontend is on a different port than 3000
      // It ensures the _csrf cookie is sent with the request
      credentials: "include",
      body: JSON.stringify({ username, pass }),
    });

    const result = await response.json();

    if (response.ok) {
      statusEl.innerText = "Success: " + result.message;
      statusEl.style.color = "green";
    } else {
      statusEl.innerText = "Error: " + result.message;
      statusEl.style.color = "red";
    }
  } catch (err) {
    statusEl.innerText = "Server connection failed.";
  }
}

// Initialize
fetchToken();
