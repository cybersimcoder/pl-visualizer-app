# P&L Visualizer

A production-ready financial data visualization application with drag-and-drop dashboard, secure file upload, and comprehensive analytics.

## Features

- **Interactive Dashboard**: Drag-and-drop interface for customizing financial visualizations
- **Secure File Upload**: Upload and process P&L statements with data validation
- **JWT Authentication**: Secure user authentication and authorization
- **Real-time Analytics**: Live financial data processing and visualization
- **Responsive Design**: Mobile-friendly interface
- **Docker Support**: Containerized deployment
- **CI/CD Pipeline**: Automated testing and deployment

## Tech Stack

### Frontend
- React 18 with TypeScript
- Material-UI for components
- Chart.js for visualizations
- React DnD for drag-and-drop
- Axios for API calls

### Backend
- Node.js with Express
- TypeScript
- JWT authentication
- Multer for file uploads
- PostgreSQL with TypeORM
- Input validation with Joi

### Infrastructure
- Docker & Docker Compose
- PostgreSQL database
- GitHub Actions CI/CD
- Environment-based configuration

## Quick Start

### Using Docker (Recommended)

1. Clone the repository
2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
3. Start the application:
   ```bash
   npm run docker:up
   ```

### Local Development

1. Install dependencies:
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

2. Set up PostgreSQL database

3. Configure environment variables in `.env`

4. Run database migrations:
   ```bash
   cd server && npm run migrate
   ```

5. Start development servers:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token

### P&L Data
- `GET /api/pl` - Get P&L statements
- `POST /api/pl` - Create P&L statement
- `PUT /api/pl/:id` - Update P&L statement
- `DELETE /api/pl/:id` - Delete P&L statement

### File Upload
- `POST /api/upload` - Upload P&L files
- `GET /api/upload/:id` - Get uploaded file

## Environment Variables

See `.env.example` for required environment variables.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details.