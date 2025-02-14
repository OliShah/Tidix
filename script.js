const popupContents = {
    rules: '<h2>Rules</h2><p>1. first rule<br>2. second rule<br>3. third rule</p>',
    story: '<h2>Story Mode</h2><p>Story mode description...</p>',
    challenge: '<h2>Challenge Mode</h2><p>Challenge mode description...</p>',
    settings: '<h2>Settings</h2><p>Settings description...</p>',
    default: '<h2>Unknown</h2><p>Unknown content type.</p>'
};

function getPopupContent(type) {
    return popupContents[type] || popupContents.default;
}

function showRules() {
    try {
        createPopup(getPopupContent('rules'));
    } catch (error) {
        console.error('Error showing rules:', error);
    }
}

function playStoryMode() {
    try {
        createPopup(getPopupContent('story'));
    } catch (error) {
        console.error('Error playing story mode:', error);
    }
}

function playChallengeMode() {
    try {
        createPopup(getPopupContent('challenge'));
    } catch (error) {
        console.error('Error playing challenge mode:', error);
    }
}

function showSettings() {
    try {
        createPopup(getPopupContent('settings'));
    } catch (error) {
        console.error('Error showing settings:', error);
    }
}

function setTitle(title) {
    document.getElementById('title').innerText = title;
}