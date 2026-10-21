async function adminLogin() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    // Hide old error
    errorMsg.style.display = "none";
    errorMsg.innerText = "";

    // Validation
    if (!username || !password) {
        errorMsg.innerText = "Please enter username and password.";
        errorMsg.style.display = "block";
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:5000/admin-login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();

        // Backend error
        if (!response.ok || !data.success) {
            errorMsg.innerText = data.message || "Invalid admin credentials.";
            errorMsg.style.display = "block";
            return;
        }

        // Success → redirect to admin dashboard
        window.location.href = "admin-dashboard.html";

    } catch (error) {
        errorMsg.innerText = "Server connection error.";
        errorMsg.style.display = "block";
    }
}