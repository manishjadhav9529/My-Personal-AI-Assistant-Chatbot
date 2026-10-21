async function adminLogin() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    // Clear old error
    errorMsg.style.display = "none";

    // Input validation
    if (!username || !password) {
        errorMsg.innerText = "Please enter both username and password.";
        errorMsg.style.display = "block";
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:5000/admin-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            errorMsg.innerText = "Server error. Try again later.";
            errorMsg.style.display = "block";
            return;
        }

        const data = await response.json();

        if (data.success) {
            // save login state
            localStorage.setItem("adminLoggedIn", "true");

            // redirect
            window.location.href = "index.html";
        } else {
            errorMsg.innerText = "Invalid username or password!";
            errorMsg.style.display = "block";
        }
    } catch (err) {
        errorMsg.innerText = "Unable to connect to server.";
        errorMsg.style.display = "block";
        console.error(err);
    }
}