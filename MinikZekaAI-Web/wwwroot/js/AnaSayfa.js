const openBtn = document.querySelector('[aria-label="Chat with AI"]');
const chatBox = document.getElementById('chatBox');
const closeBtn = document.getElementById('closeChat');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatContent = document.getElementById('chatContent');


// Hide chat box
closeBtn.addEventListener('click', () => {
    chatBox.classList.remove('scale-100', 'opacity-100');
    chatBox.classList.add('scale-0', 'opacity-0');
});

// Close chat on outside click
openBtn.addEventListener('click', () => {
    const isOpen = chatBox.classList.contains('scale-100') && chatBox.classList.contains('opacity-100');
    if (isOpen) {
        // Hide
        chatBox.classList.remove('scale-100', 'opacity-100');
        chatBox.classList.add('scale-0', 'opacity-0');
    } else {
        // Show
        chatBox.classList.remove('scale-0', 'opacity-0');
        chatBox.classList.add('scale-100', 'opacity-100');
        setTimeout(() => chatInput.focus(), 250);
    }
});

// Close chat on escape key
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        chatBox.classList.remove('scale-100', 'opacity-100');
        chatBox.classList.add('scale-0', 'opacity-0');
    }
});


function removeImageIfChatHasContent() {
    chatContent = document.getElementById("chatContent");
    const img = chatContent.querySelector("img");
    // If chatContent has more than 1 child, remove the image
    if (chatContent.children.length > 1 && img) {
        img.remove();
    }
}

// Call this after adding any new message
