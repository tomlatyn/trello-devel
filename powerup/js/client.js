TrelloPowerUp.initialize({
  // Add a card button to inspect individual cards
  'card-buttons': function(t, options) {
    return [{
      icon: 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421',
      text: 'Inspect Card Data',
      callback: function(t) {
        return t.popup({
          title: 'Card Data Inspector',
          url: './card-inspector.html',
          height: 500
        });
      }
    }];
  },
  
  // Board button - shows summary of all cards
  'board-buttons': function(t) {
    return [{
      icon: 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421',
      text: 'Card Size Summary',
      callback: function(t) {
        return t.popup({
          title: 'Board Card Size Summary',
          url: './board-summary.html',
          height: 500
        });
      }
    }];
  }
});