// ===========================================
// Smooth Scrolling
// ===========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===========================================
// Product Card Hover Effect
// ===========================================
document.querySelectorAll('.gm-product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px)';
        card.style.transition = '0.3s ease';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// ===========================================
// Sticky Header
// ===========================================
window.addEventListener('scroll', () => {
    const header = document.querySelector("header");
    if (window.scrollY > 50) header.classList.add("gm-sticky");
    else header.classList.remove("gm-sticky");
});

// ===========================================
// MODALS
// ===========================================
const signinModal = document.getElementById("signinModal");
const registerModal = document.getElementById("registerModal");

// OPEN SIGN IN
document.getElementById("open-signin").addEventListener("click", () => {
    signinModal.style.display = "flex";
});

// CLOSE SIGN IN
document.getElementById("closeSignin").onclick = () => {
    signinModal.style.display = "none";
};

// OPEN REGISTER FROM SIGNIN
document.getElementById("openRegister").onclick = () => {
    signinModal.style.display = "none";
    registerModal.style.display = "flex";
};

// CLOSE REGISTER
document.getElementById("closeRegister").onclick = () => {
    registerModal.style.display = "none";
};

// BACK TO SIGN IN
document.getElementById("openSignin").onclick = () => {
    registerModal.style.display = "none";
    signinModal.style.display = "flex";
};

// CLOSE BY CLICKING OUTSIDE
window.onclick = (e) => {
    if (e.target === signinModal) signinModal.style.display = "none";
    if (e.target === registerModal) registerModal.style.display = "none";
};

// ===========================================
// GET FORM INPUTS properly!
// ===========================================
const regFirstname = document.getElementById("regFirstname");
const regLastname  = document.getElementById("regLastname");
const regEmail     = document.getElementById("regEmail");
const regPassword  = document.getElementById("regPassword");

const signinEmail = document.getElementById("signinEmail");
const signinPassword = document.getElementById("signinPassword");

// ===========================================
// REGISTER USER
// ===========================================
document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const user = {
        firstname: regFirstname.value,
        lastname: regLastname.value,
        email: regEmail.value,
        password: regPassword.value
    };

    localStorage.setItem("brewhavenUser", JSON.stringify(user));

    alert("Account created successfully!");

    registerModal.style.display = "none";
    signinModal.style.display = "flex";
});

// ===========================================
// LOGIN USER
// ===========================================
document.getElementById("signinForm").addEventListener("submit", function(e){
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("brewhavenUser"));

    if (!savedUser) {
       alert("⚠️ No account found.\nPlease register to continue.");

        return;
    }

    if (signinEmail.value === savedUser.email && signinPassword.value === savedUser.password) {
        alert("Signed in successfully!");
        signinModal.style.display = "none";
        showUserNavbar(savedUser.firstname);
    } else {
        alert("Incorrect email or password!");
    }
});

// ===========================================
// SHOW USER IN NAVBAR
// ===========================================
function showUserNavbar(name) {
    document.getElementById("gm-nav-buttons").innerHTML = `
        <span style="color:white; margin-right:10px;">Hello, ${name}</span>
        <button id="logout-btn" class="btn gm-btn-secondary">Logout</button>
    `;
}

// ===========================================
// LOGOUT
// ===========================================
document.addEventListener("click", (e) => {
    if (e.target.id === "logout-btn") {
        localStorage.removeItem("brewhavenUser");
        location.reload();
    }
});

// ===========================================
// AUTO LOGIN
// ===========================================
window.addEventListener("load", () => {
    const savedUser = JSON.parse(localStorage.getItem("brewhavenUser"));
    if (savedUser) {
        showUserNavbar(savedUser.firstname);
    }
});
document.getElementById("openLocation").addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById("mapOptions").style.display = "flex";
});

// === SHOW MAP OPTIONS WHEN CLICKING "LOCATION" IN NAVBAR ===
document.getElementById("locationLink").addEventListener("click", function(e) {
    e.preventDefault(); // ndal scroll te #location
    document.getElementById("mapOptions").style.display = "flex";
});

// === COORDINATES ===
const latitude = 42.6629;
const longitude = 21.1655;

// === OPEN GOOGLE MAPS ===
document.getElementById("gmaps").addEventListener("click", () => {
    window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, "_blank");
});

// === OPEN APPLE MAPS ===
document.getElementById("applemaps").addEventListener("click", () => {
    window.open(`https://maps.apple.com/?q=${latitude},${longitude}`, "_blank");
});

// === OPEN WAZE ===
document.getElementById("waze").addEventListener("click", () => {
    window.open(`https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`, "_blank");
});

// === CLOSE POPUP WHEN CLICKING OUTSIDE ===
window.addEventListener("click", function(e) {
    const box = document.getElementById("mapOptions");
    if (e.target !== box && !box.contains(e.target) && e.target.id !== "locationLink") {
        box.style.display = "none";
    }
});
