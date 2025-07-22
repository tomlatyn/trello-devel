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
    // Get approval data and show badge based on status
    return t.get('card', 'shared', 'approvals', null)
    .then(function(approvalData) {
      if (!approvalData || !approvalData.members || Object.keys(approvalData.members).length === 0) {
        return [];
      }
      
      var members = Object.values(approvalData.members);
      
      // Count each status type
      var statusCounts = {
        pending: 0,
        approved: 0,
        rejected: 0
      };
      
      members.forEach(function(member) {
        if (statusCounts.hasOwnProperty(member.status)) {
          statusCounts[member.status]++;
        }
      });
      
      // Determine overall status
      var overallStatus;
      if (statusCounts.rejected > 0) {
        overallStatus = 'rejected';
      } else if (statusCounts.pending > 0) {
        overallStatus = 'pending';
      } else if (statusCounts.approved > 0) {
        overallStatus = 'approved';
      } else {
        overallStatus = 'pending';
      }
      
      // Return badge with appropriate color and text
      var badgeColor = overallStatus === 'approved' ? 'green' : 
                      overallStatus === 'rejected' ? 'red' : 'yellow';
      
      return [{
        text: overallStatus.charAt(0).toUpperCase() + overallStatus.slice(1),
        color: badgeColor
      }];
    })
    .catch(function(error) {
      console.error('Error in card-badges:', error);
      return [];
    });
  }
});