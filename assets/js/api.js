const API_BASE_URL = '/api';

async function fetchAPI(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        return null;
    }
}

async function loadHomeData() {
    const data = await fetchAPI('/');
    if (data) {
        updateHomeContent(data.data);
    }
}

async function loadChatData() {
    const data = await fetchAPI('/chat');
    if (data) {
        updateChatContent(data.data);
    }
}

function updateHomeContent(data) {
    const title = document.querySelector('.ac-home-title');
    const lead = document.querySelector('.ac-home-lead');
    
    if (title && data.slogan) {
        title.textContent = data.slogan;
    }
    if (lead && data.description) {
        lead.textContent = data.description;
    }
}

function updateChatContent(data) {
    const onlineCount = document.querySelector('.online-count');
    if (onlineCount && data.onlineCount) {
        onlineCount.textContent = `${data.onlineCount} 人在线`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('page-home')) {
        loadHomeData();
        loadChatData();
    }
});

export { fetchAPI, loadHomeData, loadChatData };
