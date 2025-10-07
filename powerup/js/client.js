TrelloPowerUp.initialize({
  // Board Button - Shows in the top toolbar of the board
  'board-buttons': function(t) {
    return [{
      icon: './icon.png', // Your power-up icon (or use a URL to an icon)
      text: 'Calculate Hours',
      callback: function(t) {
        return t.popup({
          title: 'Board Hours Summary',
          url: './hours-summary.html',
          height: 500 // Adjust height as needed
        });
      }
    }];
  }
});

// Helper function to extract hours from card badges
function extractHoursFromBadges(badges) {
  if (!badges) return null;
  
  // Method 1: Check if there's a custom badge with hours
  // Many estimation power-ups use attachments or custom fields
  // which appear in the badges object
  
  // Log all badges to help debug
  console.log('Analyzing badges:', badges);
  
  // Method 2: Check for common patterns in badge text
  // Some power-ups add text badges like "3h" or "3 hours"
  if (badges.attachments) {
    // Check attachments badge
    console.log('Attachments:', badges.attachments);
  }
  
  if (badges.checkItems) {
    console.log('Check items:', badges.checkItems);
  }
  
  // Method 3: Parse from description or comments if badge shows it
  if (badges.description === true) {
    // Card has a description - might need to fetch it
  }
  
  // You'll need to inspect the actual badge structure
  // from the third-party power-up to know which property contains hours
  
  // Example: If the power-up adds a custom field badge
  // if (badges.customFieldItems && badges.customFieldItems.length > 0) {
  //   // Parse custom field for hours
  // }
  
  return null; // Return the extracted hours or null
}