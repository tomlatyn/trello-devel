TrelloPowerUp.initialize({
  'card-back-section': function(t) {
    return t.getAll()
    .then(function(allData) {
      if (!allData || Object.keys(allData).length === 0) {
        return null;
      }

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