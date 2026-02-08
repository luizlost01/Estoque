const API_URL = "http://localhost:3000";

// Elementos
const tabButtons = document.querySelectorAll(".tab-btn");
const formLogin = document.getElementById("formLogin");
const formRegister = document.getElementById("formRegister");
const authMessage = document.getElementById("authMessage");

// Se já estiver logado, redirecionar para o estoque
if (localStorage.getItem("token")) {
    window.location.href = "index.html";
}

// Alternar entre abas Login / Cadastro
tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        tabButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        hideMessage();

        if (btn.dataset.tab === "login") {
            formLogin.style.display = "flex";
            formRegister.style.display = "none";
        } else {
            formLogin.style.display = "none";
            formRegister.style.display = "flex";
        }
    });
});

// Mostrar mensagem
function showMessage(text, type) {
    authMessage.textContent = text;
    authMessage.className = `auth-message ${type}`;
    authMessage.style.display = "block";
}

function hideMessage() {
    authMessage.style.display = "none";
}

// Login
formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideMessage();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const submitBtn = formLogin.querySelector("button[type=submit]");

    submitBtn.classList.add("loading");
    submitBtn.textContent = "Entrando...";

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Erro ao fazer login");
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.user.name);
        showMessage("Login realizado com sucesso!", "success");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 500);
    } catch (error) {
        showMessage(error.message, "error");
    } finally {
        submitBtn.classList.remove("loading");
        submitBtn.textContent = "Entrar";
    }
});

// Cadastro
formRegister.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideMessage();

    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const submitBtn = formRegister.querySelector("button[type=submit]");

    submitBtn.classList.add("loading");
    submitBtn.textContent = "Cadastrando...";

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Erro ao cadastrar");
        }

        showMessage("Cadastro realizado! Faça login para continuar.", "success");

        // Mudar para aba de login
        setTimeout(() => {
            tabButtons[0].click();
        }, 1500);
    } catch (error) {
        showMessage(error.message, "error");
    } finally {
        submitBtn.classList.remove("loading");
        submitBtn.textContent = "Cadastrar";
    }
});
