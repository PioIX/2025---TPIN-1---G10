const loginTab = document.getElementById('btn-login');
   
const registerTab = document.getElementById('btn-register');
const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
loginTab.addEventListener('click', () => {
    // Activar pestaña y sección de login
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginSection.classList.add('active');
    registerSection.classList.remove('active');
    document.getElementById("login").style.display = "";
    document.getElementById("register").style.display = "none";
});

registerTab.addEventListener('click', () => {
    // Activar pestaña y sección de registro
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerSection.classList.add('active');
    loginSection.classList.remove('active');
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "";
    
});
