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
  
  // Card back section - shows text content in iframe (required by Trello)
  'card-back-section': function(t) {
    return t.get('card', 'private', STORAGE_KEY)
      .then(function(customText) {
        if (!customText || customText.trim() === '') {
          return null; // Don't show section if no content
        }
        
        // Use iframe with URL parameters to pass content (required by Trello)
        return {
          title: 'Custom Text Content',
          icon: 'https://cdn.trello.com/power-ups/formatting/icon-gray.svg',
          content: {
            type: 'iframe',
            url: './card-back.html?text=' + encodeURIComponent(customText),
            height: 100
          }
        };
      })
      .catch(function(error) {
        console.error('Error in card-back-section:', error);
        return null; // Hide section on error
      });
  }
});