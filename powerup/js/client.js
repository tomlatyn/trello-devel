TrelloPowerUp.initialize({
  'card-back-section': function(t) {
    console.log('card-back-section called');

    // Get all data from all scopes
    t.getAll()
      .then(function (allData) {
        console.log('All data:', JSON.stringify(allData, null, 2));

        // Get and display just card shared data
        return t.get('card', 'shared');
      })
      .then(function(cardShared) {
        console.log('Card shared data:', JSON.stringify(cardShared, null, 2));

        // Display keys
        var keys = cardShared ? Object.keys(cardShared) : [];
        console.log('Available keys:', keys);

        // Get approvals data specifically
        return t.get('card', 'shared', 'approvals');
      })
      .then(function(approvalsData) {
        if (approvalsData) {
          console.log('Approvals data:', JSON.stringify(approvalsData, null, 2));
        } else {
          console.log('No approvals data found');
        }
      })
      .catch(function(error) {
        console.error('Error loading plugin data:', error);
      });

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