const t = TrelloPowerUp.iframe();

function renderTextContent() {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedText = urlParams.get('text');
    
    if (encodedText) {
        const text = decodeURIComponent(encodedText);
        const contentEl = document.getElementById('text-content');
        
        contentEl.textContent = text;
        
        t.sizeTo('#card-back-content')
            .catch(function(error) {
                console.error('Error sizing iframe:', error);
            });
    } else {
        const STORAGE_KEY = 'customText';
        
        t.get('card', 'private', STORAGE_KEY)
            .then(function(customText) {
                if (customText) {
                    const contentEl = document.getElementById('text-content');
                    contentEl.textContent = customText;
                    
                    return t.sizeTo('#card-back-content');
                }
            })
            .catch(function(error) {
                console.error('Error loading text content:', error);
            });
    }
}

document.addEventListener('DOMContentLoaded', renderTextContent);