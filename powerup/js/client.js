TrelloPowerUp.initialize({
  'board-buttons': function(t) {
    return [{
      icon: 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421',
      text: 'Calculate Hours',
      callback: function(t) {
        return t.popup({
          title: 'Board Hours Summary',
          url: './hours-summary.html',
          height: 500
        });
      }
    }];
  }
});