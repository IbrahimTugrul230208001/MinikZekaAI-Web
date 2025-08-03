const input = document.getElementById('answer');
const toggle = document.getElementById('togglePassword');
const eyeOpen = document.getElementById('eyeOpen');
const eyeClosed = document.getElementById('eyeClosed');

toggle.addEventListener('click', function () {
    const isPwd = input.type === 'password';
    input.type = isPwd ? 'text' : 'password';
    eyeOpen.classList.toggle('hidden', !isPwd);
    eyeClosed.classList.toggle('hidden', isPwd);
});
