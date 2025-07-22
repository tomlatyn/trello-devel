const STORAGE_KEY = 'customText';

// Get Trello Power-Up iframe context
const t = TrelloPowerUp.iframe();

// DOM elements - will be initialized after DOM loads
let elements = {};

let isEditMode = false;

// Show success or error messages to the user
function showMessage(message, isError = false) {
    const messageEl = isError ? elements.errorMessage : elements.successMessage;
    const otherMessageEl = isError ? elements.successMessage : elements.errorMessage;
    
    if (otherMessageEl) otherMessageEl.style.display = 'none';
    if (messageEl) {
        messageEl.textContent = message;
        messageEl.style.display = 'block';
        
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 3000);
    }
}

// Initialize the popup when DOM is loaded
function initializePopup() {
    // Initialize DOM elements
    elements = {
        textInput: document.getElementById('customTextInput'),
        saveBtn: document.getElementById('saveBtn'),
        deleteBtn: document.getElementById('deleteBtn'),
        cancelBtn: document.getElementById('cancelBtn'),
        errorMessage: document.getElementById('errorMessage'),
        successMessage: document.getElementById('successMessage')
    };
    
    // Check if all elements exist
    if (!elements.textInput || !elements.saveBtn || !elements.deleteBtn || !elements.cancelBtn) {
        console.error('Required DOM elements not found');
        return;
    }
    
    // Focus on text input
    elements.textInput.focus();
    
    // Load existing text data
    t.get('card', 'private', STORAGE_KEY)
        .then(function(existingText) {
            if (existingText && existingText.trim() !== '') {
                isEditMode = true;
                elements.textInput.value = existingText;
                elements.deleteBtn.style.display = 'inline-block';
            } else {
                isEditMode = false;
                elements.deleteBtn.style.display = 'none';
            }
        })
        .catch(function(error) {
            console.error('Error loading existing text:', error);
            showMessage('Error loading existing content', true);
        });
    
    // Set up event listeners
    setupEventListeners();
}

// Set up all event listeners
function setupEventListeners() {
    elements.saveBtn.addEventListener('click', saveText);
    elements.deleteBtn.addEventListener('click', deleteText);
    elements.cancelBtn.addEventListener('click', cancelEdit);
    
    elements.textInput.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'Enter') {
            event.preventDefault();
            saveText();
        }
        if (event.key === 'Escape') {
            event.preventDefault();
            cancelEdit();
        }
    });
}

// Save text content and close popup
function saveText() {
    const text = elements.textInput.value.trim();
    
    if (!text) {
        showMessage('Please enter some text', true);
        elements.textInput.focus();
        return;
    }
    
    // Update UI to show saving state
    elements.saveBtn.disabled = true;
    elements.saveBtn.textContent = 'Saving...';
    
    // Save data using Trello API
    t.set('card', 'private', STORAGE_KEY, text)
        .then(function() {
            showMessage('Text saved successfully!');
            // Close popup after short delay to show success message
            setTimeout(() => {
                t.closePopup();
            }, 800);
        })
        .catch(function(error) {
            console.error('Error saving text:', error);
            showMessage('Error saving text. Please try again.', true);
            // Reset button state on error
            elements.saveBtn.disabled = false;
            elements.saveBtn.textContent = 'Save';
        });
}

// Delete text content and close popup
function deleteText() {
    if (!confirm('Are you sure you want to delete this text content?')) {
        return;
    }
    
    // Update UI to show deleting state
    elements.deleteBtn.disabled = true;
    elements.deleteBtn.textContent = 'Deleting...';
    
    // Remove data using Trello API
    t.remove('card', 'private', STORAGE_KEY)
        .then(function() {
            showMessage('Text deleted successfully!');
            // Close popup after short delay to show success message
            setTimeout(() => {
                t.closePopup();
            }, 800);
        })
        .catch(function(error) {
            console.error('Error deleting text:', error);
            showMessage('Error deleting text. Please try again.', true);
            // Reset button state on error
            elements.deleteBtn.disabled = false;
            elements.deleteBtn.textContent = 'Delete';
        });
}

// Cancel editing and close popup
function cancelEdit() {
    t.closePopup();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializePopup);