const STORAGE_KEY = 'customText';

TrelloPowerUp.initialize({
  'card-buttons': function(t) {
    return t.get('card', 'private', STORAGE_KEY)
      .then(function(customText) {
        return [{
          icon: 'https://cdn.trello.com/power-ups/formatting/icon-gray.svg',
          text: customText ? 'Edit Text' : 'Add Text',
          callback: function(t) {
            return t.popup({
              title: customText ? 'Edit Custom Text' : 'Add Custom Text',
              url: 'popup.html',
              height: 300,
              width: 400
            });
          }
        }];
      });
  },
  
  'card-back-section': function(t) {
    return t.get('card', 'private', STORAGE_KEY)
      .then(function(customText) {
        if (!customText) {
          return null;
        }
        
        return {
          title: 'Custom Text Content',
          icon: 'https://cdn.trello.com/power-ups/formatting/icon-gray.svg',
          content: {
            type: 'iframe',
            url: t.signUrl('./card-back.html', {
              text: encodeURIComponent(customText)
            }),
            height: 200
          }
        };
      });
  }
});