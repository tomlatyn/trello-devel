const STORAGE_KEY = 'customText';
const t = TrelloPowerUp.iframe();

const elements = {
    textInput: document.getElementById('customTextInput'),
    saveBtn: document.getElementById('saveBtn'),
    deleteBtn: document.getElementById('deleteBtn'),
    cancelBtn: document.getElementById('cancelBtn'),
    errorMessage: document.getElementById('errorMessage'),
    successMessage: document.getElementById('successMessage')
};

let isEditMode = false;

function showMessage(message, isError = false) {
    const messageEl = isError ? elements.errorMessage : elements.successMessage;
    const otherMessageEl = isError ? elements.successMessage : elements.errorMessage;
    
    otherMessageEl.style.display = 'none';
    messageEl.textContent = message;
    messageEl.style.display = 'block';
    
    setTimeout(() => {
        messageEl.style.display = 'none';
    }, 3000);
}

function initializePopup() {
    elements.textInput.focus();
    
    t.get('card', 'private', STORAGE_KEY)
        .then(function(existingText) {
            if (existingText) {
                isEditMode = true;
                elements.textInput.value = existingText;
                elements.deleteBtn.style.display = 'inline-block';
            }
        })
        .catch(function(error) {
            console.error('Error loading existing text:', error);
            showMessage('Error loading existing content', true);
        });
}

function saveText() {
    const text = elements.textInput.value.trim();
    
    if (!text) {
        showMessage('Please enter some text', true);
        elements.textInput.focus();
        return;
    }
    
    elements.saveBtn.disabled = true;
    elements.saveBtn.textContent = 'Saving...';
    
    t.set('card', 'private', STORAGE_KEY, text)
        .then(function() {
            showMessage('Text saved successfully!');
            setTimeout(() => {
                t.closePopup();
            }, 1500);
        })
        .catch(function(error) {
            console.error('Error saving text:', error);
            showMessage('Error saving text. Please try again.', true);
            elements.saveBtn.disabled = false;
            elements.saveBtn.textContent = 'Save';
        });
}

function deleteText() {
    if (!confirm('Are you sure you want to delete this text content?')) {
        return;
    }
    
    elements.deleteBtn.disabled = true;
    elements.deleteBtn.textContent = 'Deleting...';
    
    t.remove('card', 'private', STORAGE_KEY)
        .then(function() {
            showMessage('Text deleted successfully!');
            setTimeout(() => {
                t.closePopup();
            }, 1500);
        })
        .catch(function(error) {
            console.error('Error deleting text:', error);
            showMessage('Error deleting text. Please try again.', true);
            elements.deleteBtn.disabled = false;
            elements.deleteBtn.textContent = 'Delete';
        });
}

function cancelEdit() {
    t.closePopup();
}

elements.saveBtn.addEventListener('click', saveText);
elements.deleteBtn.addEventListener('click', deleteText);
elements.cancelBtn.addEventListener('click', cancelEdit);

elements.textInput.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'Enter') {
        saveText();
    }
    if (event.key === 'Escape') {
        cancelEdit();
    }
});

document.addEventListener('DOMContentLoaded', initializePopup);