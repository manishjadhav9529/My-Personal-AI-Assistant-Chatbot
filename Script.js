// 🌌 Background particle animation
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

// Create particles
for (let i = 0; i < 250; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 200 + Math.random() * 60;
    particles.push({
        angle,
        radius,
        speed: Math.random() * 0.002 + 0.001,
        size: Math.random() * 2
    });
}

// Animate background
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
        p.angle += p.speed;
        const x = centerX + Math.cos(p.angle) * p.radius;
        const y = centerY + Math.sin(p.angle) * p.radius;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(100, 200, 255, 0.8)";
        ctx.fill();
    });
    requestAnimationFrame(animate);
}
animate();

// Handle window resize
window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
});

// 🎤 Mic click → redirect to assistant page
const micBtn = document.getElementById("micBtn");
if (micBtn) {
    micBtn.addEventListener("click", () => {
        window.location.href = "assistant.html";
    });
}

// 📁 Sidebar controls
const sidebar = document.getElementById("sidebar");
const openSidebarBtn = document.getElementById("openSidebar");
const closeSidebarBtn = document.getElementById("closeSidebar");

if (sidebar && openSidebarBtn && closeSidebarBtn) {
    openSidebarBtn.addEventListener("click", () => {
        sidebar.classList.remove("closed");
    });

    closeSidebarBtn.addEventListener("click", () => {
        sidebar.classList.add("closed");
    });
}

// Recent chats
document.addEventListener("DOMContentLoaded", () => {
    const newChatBtn = document.getElementById("newChatBtn");
    const chatList = document.getElementById("recentChatsList");

    let chats = JSON.parse(localStorage.getItem("recentChats")) || [];
    renderChats();

    function renderChats() {
        chatList.innerHTML = "";
        chats.forEach((chat) => {
            const li = document.createElement("li");
            li.textContent = chat;

            li.addEventListener("click", () => {
                alert(`Opening chat: ${chat}`);
            });

            chatList.appendChild(li);
        });
    }
});

// ================================
// 🔗 BACKEND API CONNECTION
// ================================
async function sendMessage(msg) {
    const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg })
    });

    const data = await res.json();
    return data.reply;
}

// 📩 Send button — only ONE event listener
const sendBtn = document.getElementById("sendBtn");

if (sendBtn) {
    sendBtn.addEventListener("click", async() => {
        const query = document.getElementById("promptInput").value.trim();

        if (!query) return alert("Please type something first!");

        const reply = await sendMessage(query);

        alert("AI: " + reply); // temporary output
    });
}

function openAdminLogin() {
    window.location.href = "Login.html";
}