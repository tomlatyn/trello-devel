const STORAGE_KEY = 'customText';

// Initialize the Trello Power-Up
TrelloPowerUp.initialize({
  // Card buttons capability - shows "Add Text" or "Edit Text" button
  'card-buttons': function(t) {
    return t.get('card', 'private', STORAGE_KEY)
      .then(function(customText) {
        return [{
          icon: 'https://cdn.trello.com/power-ups/formatting/icon-gray.svg',
          text: customText ? 'Edit Text' : 'Add Text',
          callback: function(t) {
            // Use relative path to avoid cross-origin issues
            return t.popup({
              title: 'Manage Text Content',
              url: './popup.html',
              height: 300
            });
          }
        }];
      })
      .catch(function(error) {
        console.error('Error in card-buttons:', error);
        // Return default button even if data loading fails
        return [{
          icon: 'https://cdn.trello.com/power-ups/formatting/icon-gray.svg',
          text: 'Add Text',
          callback: function(t) {
            return t.popup({
              title: 'Manage Text Content',
              url: './popup.html',
              height: 300
            });
          }
        }];
      });
  },
  
  // Card back section - shows text content directly (no iframe to avoid cross-origin issues)
  'card-back-section': function(t) {
    return t.get('card', 'private', STORAGE_KEY)
      .then(function(customText) {
        if (!customText || customText.trim() === '') {
          return null; // Don't show section if no content
        }
        
        // Return direct content instead of iframe to avoid cross-origin issues
        return {
          title: 'Custom Text Content',
          icon: 'https://cdn.trello.com/power-ups/formatting/icon-gray.svg',
          content: {
            type: 'text',
            text: customText
          }
        };
      })
      .catch(function(error) {
        console.error('Error in card-back-section:', error);
        return null; // Hide section on error
      });
  }
});