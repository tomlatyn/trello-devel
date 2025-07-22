TrelloPowerUp.initialize({
  // Card back section - shows approval table in the card details
  'card-back-section': function(t, opts) {
    return t.get('card', 'shared', 'approvals', null)
    .then(function(approvalData) {
      if (!approvalData || !approvalData.members) {
        return null;
      }
      
      // Check if current user is the creator
      return t.member('id').then(function(currentUserId) {
        var isCreator = (approvalData.createdBy === currentUserId.id);
        
        var result = {
          title: 'Approvals SM',
          icon: './icon.png',
          content: {
            type: 'iframe',
            url: t.signUrl('./approval-section.html')
          }
        };

        if (isCreator) {
          result.action = {
            text: 'Reset all',
            callback: function(t) {
              // Show confirmation dialog directly
              if (confirm('Are you sure you want to reset all approvals to pending status?\n\nThis action cannot be undone.')) {
                return resetAllApprovals(t);
              }
            }
          };
        }
        
        console.log('Final result object:', result);
        return result;
      });
    })
    .catch(function(error) {
      console.error('Error in card-back-section:', error);
      return null;
    });
  },
  
  'card-buttons': function(t, opts) {
    return [{
      icon: './icon.png',
      text: 'Approvals SM',
      callback: function(t) {
        return t.popup({
          title: 'Manage Approvals',
          url: './manage-approvals.html',
          height: 700,
          callback: function(t, opts) {
            // This callback runs when t.notifyParent('done') is called from the popup
            // Card-back-section iframe will automatically reload due to t.set() changing pluginData
            console.log('Manage approvals popup completed, card-back-section will auto-refresh');
          }
        });
      }
    }];
  },
  
  'card-badges': function(t, opts) {
    // Use the centralized badge logic
    return TrelloApprovalBadges.getCardBadges(t, opts);
  },
});