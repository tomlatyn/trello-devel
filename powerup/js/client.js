TrelloPowerUp.initialize({
  'card-back-section': function(t) {
    console.log('card-back-section called');
    return {
      title: 'Plugin Data',
      icon: 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421',
      content: {
        type: 'iframe',
        url: t.signUrl('./card-back-section.html')
      }
    };
  }
});