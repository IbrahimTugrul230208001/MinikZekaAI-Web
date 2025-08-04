function setupPasswordToggle(inputId, toggleId, eyeOpenId, eyeClosedId) {
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);
    const eyeOpen = document.getElementById(eyeOpenId);
    const eyeClosed = document.getElementById(eyeClosedId);

    toggle.addEventListener('click', function () {
        const isPwd = input.type === 'password';
        input.type = isPwd ? 'text' : 'password';
        eyeOpen.classList.toggle('hidden', !isPwd);
        eyeClosed.classList.toggle('hidden', isPwd);
    });
}

setupPasswordToggle('password', 'togglePassword', 'eyeOpen', 'eyeClosed');
setupPasswordToggle('password-again', 'togglePasswordAgain', 'eyeOpenAgain', 'eyeClosedAgain');
