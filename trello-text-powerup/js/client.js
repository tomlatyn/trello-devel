// Use Trello's provided Bluebird Promise for better browser compatibility
var Promise = window.TrelloPowerUp.Promise;

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
              return t.popup({
                title: 'Reset All Approvals',
                url: './reset-confirmation.html',
                height: 200
              });
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
  
  // Rest of your code remains the same...
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
            return Promise.resolve();
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

// Function to reset all approvals to pending status
function resetAllApprovals(t) {
  console.log('🔄 Reset all approvals function called!');
  
  if (!confirm('Are you sure you want to reset all approvals to pending status?')) {
    return Promise.resolve();
  }
  
  return t.get('card', 'shared', 'approvals', null)
  .then(function(approvalData) {
    console.log('📄 Got approval data:', approvalData);
    if (!approvalData || !approvalData.members) {
      console.log('❌ No approval data or members found');
      return;
    }
    
    console.log('🔄 Resetting statuses for', Object.keys(approvalData.members).length, 'members');
    // Reset all members to pending status
    Object.keys(approvalData.members).forEach(function(memberId) {
      console.log('Resetting member:', memberId, 'from', approvalData.members[memberId].status, 'to pending');
      approvalData.members[memberId].status = 'pending';
      approvalData.members[memberId].actionDate = new Date().toISOString();
    });
    
    console.log('💾 Saving updated approval data...');
    // Save the updated data
    return t.set('card', 'shared', 'approvals', approvalData);
  })
  .then(function() {
    console.log('✅ Data saved successfully!');
    // Data change via t.set() will automatically refresh the card-back-section
    return Promise.resolve();
  })
  .catch(function(error) {
    console.error('❌ Error resetting approvals:', error);
    alert('Failed to reset approvals. Please try again.');
    return Promise.resolve();
  });
}