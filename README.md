# Website Audit Platform

A comprehensive website auditing platform with Google Tag Manager analysis, built with FastAPI backend and React frontend.

## Features

### Website Auditing
- **SEO Analysis**: Title tags, meta descriptions, headings, images, internal/external links
- **Performance Analysis**: Page size, external resources, compression, caching
- **GTM Analysis**: Tag Manager implementation, best practices, recommendations
- **Security Analysis**: Security headers and vulnerabilities
- **Accessibility Analysis**: WCAG compliance and usability

### Google Tag Manager Integration
- OAuth integration with Google Tag Manager API
- Container and tag analysis
- Best practices recommendations
- Tag, trigger, and variable auditing

### Additional Features
- User authentication via Google OAuth
- Audit history with pagination
- Real-time audit status updates
- Responsive web interface
- Supabase database integration

## Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **Supabase**: PostgreSQL database and authentication
- **Selenium**: Browser automation for JavaScript-heavy sites
- **BeautifulSoup**: HTML parsing and analysis
- **Authlib**: OAuth implementation
- **Pandas**: Data processing for table extraction

### Frontend
- **React**: Modern JavaScript framework
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Data visualization

## Setup Instructions

### Prerequisites
- Python 3.11+
- Node.js 16+
- Google Cloud Console project
- Supabase account

### Backend Setup

1. **Clone and navigate to project**
```bash
git clone <repository>
cd website-audit-backend
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Set up environment variables**
```bash
cp .env.example .env
```
Edit `.env` with your credentials:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_KEY`: Your Supabase anon key
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `SECRET_KEY`: Random secret key for sessions

4. **Set up Supabase database**
   Run the SQL commands from the deployment files in your Supabase SQL editor.

5. **Configure Google OAuth**
   In Google Cloud Console:
- Enable Google Tag Manager API
- Add authorized redirect URI: `http://localhost:8000/auth/google/callback`
- For production: `https://your-backend-domain.com/auth/google/callback`

6. **Run the backend**
```bash
uvicorn main:app --reload
```

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd website-audit-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```
Edit `.env`:
- `REACT_APP_API_URL`: Backend URL (http://localhost:8000 for development)

4. **Run the frontend**
```bash
npm start
```

## Deployment

### Backend Deployment (Render)

1. **Create new web service on Render**
2. **Connect your GitHub repository**
3. **Configure build settings**:
    - Build command: `pip install -r requirements.txt`
    - Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

4. **Set environment variables** in Render dashboard:
    - `SUPABASE_URL`
    - `SUPABASE_KEY`
    - `GOOGLE_CLIENT_ID`
    - `GOOGLE_CLIENT_SECRET`
    - `SECRET_KEY`
    - `FRONTEND_URL`

5. **Update Google OAuth redirect URIs** with your Render domain

### Frontend Deployment (Render/Netlify/Vercel)

1. **Build the React app**
```bash
npm run build
```

2. **Deploy using your preferred platform**
3. **Update environment variables** with production API URL

## API Documentation

Once the backend is running, visit `http://localhost:8000/docs` for interactive API documentation.

### Key Endpoints

- `POST /audit`: Start a new website audit
- `GET /audit/{audit_id}`: Get audit results
- `GET /audits/history`: Get audit history with pagination
- `GET /auth/google`: Initiate Google OAuth flow
- `GET /gtm/accounts/{user_id}`: Get GTM accounts for user
- `POST /gtm/analyze`: Analyze GTM setup

## Usage Guide

### Starting a Website Audit

1. Navigate to "New Audit" page
2. Enter website URL
3. Select audit type (Full, SEO, Performance, or GTM)
4. Click "Start Audit"
5. View real-time results as audit completes

### Google Tag Manager Analysis

1. Click "Connect with Google" to authenticate
2. Navigate to "GTM Analysis" page
3. Select your GTM account and container
4. Click "Analyze GTM Setup"
5. Review recommendations and best practices

### Viewing Audit History

1. Navigate to "History" page
2. View all previous audits with status
3. Click "View Results" to see detailed analysis
4. Use pagination to browse older audits

## Project Structure

```
website-audit-platform/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   ├── Dockerfile          # Docker configuration
│   └── .env.example        # Environment variables template
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js         # Main application
│   │   └── App.css        # Styles
│   ├── package.json       # Node.js dependencies
│   └── .env.example       # Environment variables template
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
1. Check the documentation
2. Search existing GitHub issues
3. Create a new issue with detailed description

## Security Considerations

- Never commit `.env` files to version control
- Use strong, unique secret keys in production
- Regularly rotate API keys and secrets
- Keep dependencies updated
- Use HTTPS in production
- Implement rate limiting for production deployments

## Performance Tips

- Enable Redis caching for frequent database queries
- Use CDN for frontend assets
- Implement request queuing for high-volume audits
- Monitor and optimize database queries
- Consider implementing background job processing

## Monitoring and Analytics

- Set up application monitoring (e.g., Sentry)
- Implement logging for audit activities
- Monitor API response times
- Track user engagement metrics
- Set up alerts for system failures