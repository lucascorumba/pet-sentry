// Add functionality to modal's login button
const login_form = document.getElementById("login-form");
document.querySelector("#login-button").addEventListener("click", () => {
    login_form.submit();
});

// Add functionality to modal's register button
const register_form = document.getElementById("register-form");
document.querySelector("#register-button").addEventListener("click", () => {
    register_form.submit();
});