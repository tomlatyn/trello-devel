TrelloPowerUp.initialize({
  'card-back-section': function(t) {
    console.log('card-back-section called');
    return Promise.all([
      t.card('all'),  // Get all card fields including custom fields
      t.getAll()      // Get data stored by this power-up
    ])
    .then(function(results) {
      console.log('Card data retrieved:', results);
      var cardData = results[0];
      var powerUpData = results[1];

      var allData = {
        card: cardData,
        powerUpData: powerUpData
      };

      var encodedData = encodeURIComponent(JSON.stringify(allData));

      var section = {
        title: 'Card Data',
        icon: 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421',
        content: {
          type: 'iframe',
          url: t.signUrl('./card-back-section.html?data=' + encodedData)
        }
      };

      console.log('Returning section:', section);
      return section;
    })
    .catch(function(error) {
      console.error('Error in card-back-section:', error);
      return null;
    });
  }
});