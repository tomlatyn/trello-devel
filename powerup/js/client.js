TrelloPowerUp.initialize({
  'card-back-section': function(t) {
    return Promise.all([
      t.card('all'),  // Get all card fields
      t.getAll()      // Get data stored by this power-up
    ])
    .then(function(results) {
      var cardData = results[0];
      var powerUpData = results[1];

      var allData = {
        card: cardData,
        powerUpData: powerUpData
      };

      var encodedData = encodeURIComponent(JSON.stringify(allData));

      return {
        title: 'Card Data',
        content: {
          type: 'iframe',
          url: t.signUrl('./card-back-section.html?data=' + encodedData)
        }
      };
    })
    .catch(function(error) {
      console.error('Error in card-back-section:', error);
      return null;
    });
  }
});