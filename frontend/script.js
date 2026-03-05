const API_URL = ''; // Use relative paths for deployed and local

const urlInput = document.getElementById('urlInput');
const shortenBtn = document.getElementById('shortenBtn');
const resultDiv = document.getElementById('result');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const shortUrlSpan = document.getElementById('shortUrl');
const originalUrlSpan = document.getElementById('originalUrl');
const copyBtn = document.getElementById('copyBtn');
const newBtn = document.getElementById('newBtn');
const statsText = document.getElementById('statsText');

let urlCount = 0;

// Shorten URL
shortenBtn.addEventListener('click', shortenURL);
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') shortenURL();
});

async function shortenURL() {
    const url = urlInput.value.trim();

    if (!url) {
        showError('Please enter a URL');
        return;
    }

    // Basic URL validation
    if (!isValidURL(url)) {
        showError('Please enter a valid URL');
        return;
    }

    showLoading(true);
    hideError();
    resultDiv.classList.add('hidden');

    try {
        const response = await fetch(`${API_URL}/shorten`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to shorten URL');
        }

        const data = await response.json();
        displayResult(data);
        urlCount++;
        updateStats();
    } catch (error) {
        showError(error.message || 'Error connecting to server. Make sure backend is running!');
    } finally {
        showLoading(false);
    }
}

function displayResult(data) {
    shortUrlSpan.textContent = data.shortUrl;
    originalUrlSpan.textContent = data.originalUrl;
    resultDiv.classList.remove('hidden');
    urlInput.value = '';
}

copyBtn.addEventListener('click', () => {
    const text = shortUrlSpan.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✅ Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    });
});

newBtn.addEventListener('click', () => {
    resultDiv.classList.add('hidden');
    urlInput.focus();
});

function showLoading(show) {
    if (show) {
        loadingDiv.classList.remove('hidden');
    } else {
        loadingDiv.classList.add('hidden');
    }
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

function hideError() {
    errorDiv.classList.add('hidden');
}

function updateStats() {
    statsText.textContent = `URLs created: ${urlCount}`;
}

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Focus input on load
window.addEventListener('load', () => {
    urlInput.focus();
});
