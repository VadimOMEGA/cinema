const loginBox = document.querySelector('#loginBox');
const signupBox = document.querySelector('#signupBox');
const goToSignup = document.querySelector('#goToSignUp');
const goToLogin = document.querySelector('#goToLogin');

goToSignup.addEventListener('click', () => {
    loginBox.classList.toggle('hidden');
    signupBox.classList.toggle('hidden');
});

goToLogin.addEventListener('click', () => {
    loginBox.classList.toggle('hidden');
    signupBox.classList.toggle('hidden');
});