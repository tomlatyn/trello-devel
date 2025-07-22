# Text Content Manager - Trello Power-Up

A simple Trello Power-Up that allows users to add, edit, and delete custom text content on Trello cards. The text is displayed in a card-back-section and managed through a popup interface.

## Features

- **Add Custom Text**: Add custom text content to any Trello card
- **Edit Text**: Modify existing text content with a user-friendly interface
- **Delete Text**: Remove text content when no longer needed
- **Card Back Display**: View text content directly on the card back
- **Private Storage**: Text content is stored privately per card

## Installation

### Step 1: Host the Files

1. Upload all files to a web server accessible via HTTPS
2. Update the `manifest.json` file to point to your domain:
   ```json
   "connectors": {
     "iframe": {
       "url": "https://your-domain.com/index.html"
     }
   }
   ```

### Step 2: Add Power-Up to Trello

1. Go to your Trello board
2. Click the "Show Menu" button (top right)
3. Select "Power-Ups"
4. Click "Custom Power-Up"
5. Enter the URL to your `manifest.json` file
6. Click "Add Power-Up"

## File Structure

```
trello-text-powerup/
├── manifest.json          # Power-Up configuration
├── index.html            # Entry point HTML
├── popup.html            # Popup interface HTML
├── card-back.html        # Card back section HTML
├── js/
│   ├── client.js         # Main Power-Up logic
│   ├── popup.js          # Popup functionality
│   └── card-back.js      # Card back section logic
├── css/
│   ├── styles.css        # Main styles
│   └── popup.css         # Popup styles
└── README.md             # This file
```

## Usage

### Adding Text Content

1. Open a Trello card
2. Click the "Add Text" button (appears in card buttons)
3. Enter your text in the popup window
4. Click "Save"
5. The text will appear in the card back section

### Editing Text Content

1. Open a card that has existing text content
2. Click the "Edit Text" button
3. Modify the text in the popup window
4. Click "Save" to update, or "Delete" to remove completely

### Viewing Text Content

- Text content is automatically displayed in the card back section
- Only shows when text content exists
- Section title: "Custom Text Content"

## Development

### Local Development Setup

1. Clone or download the project files
2. Serve the files using a local web server with HTTPS
3. Update `manifest.json` with your local server URL
4. Use Trello's Power-Up development features for testing

### Hosting Requirements

- **HTTPS Required**: Trello requires all Power-Up content to be served over HTTPS
- **CORS Headers**: Ensure your server allows cross-origin requests from Trello domains
- **Static File Serving**: All files can be served as static content

### Testing

1. Test the complete user flow:
   - Add text content to a card
   - Edit existing text content
   - Delete text content
   - Verify card back section updates correctly

2. Test edge cases:
   - Empty text input
   - Very long text content
   - Special characters and formatting

## Technical Details

### Data Storage

- Uses Trello's `pluginData` API
- Scope: `card` (data is stored per card)
- Visibility: `private` (data is private to the Power-Up)
- Storage key: `customText`

### API Integration

- Trello Power-Up Client Library: `https://p.trellocdn.com/power-up.min.js`
- Capabilities used:
  - `card-buttons`: Adds button to card interface
  - `card-back-section`: Displays content in card back

### Browser Support

- Modern browsers with ES6+ support
- Compatible with Trello's supported browser list
- Responsive design works on desktop and mobile

## Troubleshooting

### Power-Up Not Loading

1. Verify all files are accessible via HTTPS
2. Check browser console for JavaScript errors
3. Ensure `manifest.json` URLs are correct
4. Verify CORS headers are properly configured

### Text Not Saving

1. Check browser console for API errors
2. Verify Trello Power-Up permissions
3. Test with different text content lengths
4. Ensure popup.js is loading correctly

### Card Back Section Not Showing

1. Verify text content exists for the card
2. Check that `card-back.html` and `card-back.js` are accessible
3. Review browser console for iframe loading errors

## Customization

### Styling

- Modify `css/styles.css` for card back section appearance
- Modify `css/popup.css` for popup interface styling
- Colors and fonts can be customized to match your brand

### Functionality

- Extend `popup.js` to add text formatting options
- Modify `card-back.js` to change how text is displayed
- Add validation rules in `popup.js` for text content

## License

This project is provided as-is for educational and development purposes.

## Support

For issues related to Trello Power-Up development, consult the [Trello Power-Up Documentation](https://developer.atlassian.com/cloud/trello/power-ups/).