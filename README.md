# SynergySphere Web Application

A modern, responsive web application built with HTML5, Bootstrap, and Node.js.

## Features

- 🚀 **Modern UI**: Beautiful, responsive design with Bootstrap 5
- 🔧 **Real-time API Integration**: Live API status monitoring
- 📱 **Mobile Responsive**: Works perfectly on all devices
- ⚡ **Fast & Lightweight**: Optimized for performance
- 🛡️ **Security**: Built-in security middleware and rate limiting
- 🎨 **Custom Styling**: Custom CSS with smooth animations

## Technology Stack

- **Frontend**: HTML5, CSS3, Bootstrap 5, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Styling**: Custom CSS with Bootstrap integration
- **Icons**: Font Awesome 6
- **HTTP Client**: Axios

## Project Structure

```
├── index.html          # Main HTML file
├── server.js           # Express.js server
├── package.json        # Dependencies and scripts
├── css/
│   └── style.css       # Custom styles
├── js/
│   └── app.js          # Frontend JavaScript
└── node_modules/       # Dependencies
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3001
   ```

### Development Mode

For development with auto-restart:
```bash
npm run dev
```

## API Endpoints

- `GET /` - Main web application
- `GET /health` - Health check endpoint
- `GET /api` - API status and information
- `GET /api/status` - Detailed service status
- `POST /api/test` - Test endpoint for POST requests

## Features Overview

### Home Section
- Welcome message and application overview
- Technology stack showcase
- Real-time API status monitoring

### API Status
- Live connection status to backend services
- Health check monitoring
- Service status indicators

### Settings
- Configurable API endpoints
- Timeout settings
- Auto-refresh options
- Notification preferences

## Customization

### Styling
Edit `css/style.css` to customize the appearance:
- Color schemes
- Animations
- Layout adjustments
- Responsive breakpoints

### Functionality
Modify `js/app.js` to add new features:
- API integrations
- UI interactions
- Data processing
- Event handlers

### Backend
Update `server.js` to:
- Add new API endpoints
- Modify middleware
- Change server configuration
- Add database integration

## Security Features

- **Helmet.js**: Security headers
- **Rate Limiting**: Prevents abuse
- **CORS**: Cross-origin resource sharing
- **Input Validation**: Request validation
- **Error Handling**: Graceful error responses

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions or support, please open an issue in the repository.

---

**SynergySphere Web Application** - Built with ❤️ using modern web technologies.
