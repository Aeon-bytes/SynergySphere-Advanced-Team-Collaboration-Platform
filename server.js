const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3001', 'http://127.0.0.1:3001'],
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(morgan('combined'));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

// API routes
app.get('/api', (req, res) => {
  res.json({
    message: 'SynergySphere Project Management API is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/health',
      api: '/api',
      status: '/api/status',
      auth: '/api/auth',
      projects: '/api/projects',
      tasks: '/api/tasks',
      users: '/api/users'
    }
  });
});

// Additional API endpoints
app.get('/api/status', (req, res) => {
  res.json({
    status: 'operational',
    services: {
      database: 'connected',
      cache: 'connected',
      queue: 'connected'
    },
    timestamp: new Date().toISOString()
  });
});

// Authentication endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }
  
  // Simulate authentication (in real app, verify credentials)
  res.json({
    success: true,
    message: 'Login successful',
    user: {
      id: Date.now(),
      name: email.split('@')[0],
      email: email,
      avatar: email.split('@')[0].substring(0, 2).toUpperCase()
    },
    token: 'mock-jwt-token-' + Date.now()
  });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and password are required'
    });
  }
  
  // Simulate registration (in real app, create user in database)
  res.json({
    success: true,
    message: 'Registration successful',
    user: {
      id: Date.now(),
      name: name,
      email: email,
      avatar: name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
    },
    token: 'mock-jwt-token-' + Date.now()
  });
});

// Projects endpoints
app.get('/api/projects', (req, res) => {
  // In real app, fetch from database
  res.json({
    success: true,
    projects: []
  });
});

app.post('/api/projects', (req, res) => {
  const { name, description, members } = req.body;
  
  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'Project name is required'
    });
  }
  
  const project = {
    id: Date.now().toString(),
    name: name,
    description: description || '',
    members: members || [],
    status: 'active',
    createdAt: new Date().toISOString()
  };
  
  res.json({
    success: true,
    message: 'Project created successfully',
    project: project
  });
});

app.get('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  
  // In real app, fetch from database
  res.json({
    success: true,
    project: {
      id: id,
      name: 'Sample Project',
      description: 'This is a sample project',
      members: ['user@example.com'],
      status: 'active',
      createdAt: new Date().toISOString()
    }
  });
});

// Tasks endpoints
app.get('/api/tasks', (req, res) => {
  const { projectId } = req.query;
  
  // In real app, fetch from database
  res.json({
    success: true,
    tasks: []
  });
});

app.post('/api/tasks', (req, res) => {
  const { projectId, title, description, assignee, dueDate, priority } = req.body;
  
  if (!projectId || !title || !assignee) {
    return res.status(400).json({
      success: false,
      message: 'Project ID, title, and assignee are required'
    });
  }
  
  const task = {
    id: Date.now().toString(),
    projectId: projectId,
    title: title,
    description: description || '',
    assignee: assignee,
    dueDate: dueDate || null,
    priority: priority || 'medium',
    status: 'todo',
    createdAt: new Date().toISOString()
  };
  
  res.json({
    success: true,
    message: 'Task created successfully',
    task: task
  });
});

app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  // In real app, update in database
  res.json({
    success: true,
    message: 'Task updated successfully',
    task: {
      id: id,
      ...updates,
      updatedAt: new Date().toISOString()
    }
  });
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  
  // In real app, delete from database
  res.json({
    success: true,
    message: 'Task deleted successfully'
  });
});

// Users endpoints
app.get('/api/users/profile', (req, res) => {
  // In real app, get from JWT token
  res.json({
    success: true,
    user: {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'JD'
    }
  });
});

app.put('/api/users/profile', (req, res) => {
  const { name, email } = req.body;
  
  // In real app, update in database
  res.json({
    success: true,
    message: 'Profile updated successfully',
    user: {
      id: 1,
      name: name,
      email: email,
      avatar: name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
    }
  });
});

// Test endpoint for POST requests
app.post('/api/test', (req, res) => {
  const { message } = req.body;
  res.json({
    success: true,
    message: `Received: ${message}`,
    timestamp: new Date().toISOString(),
    echo: message
  });
});

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 SynergySphere Web App running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API endpoint: http://localhost:${PORT}/api`);
  console.log(`🌐 Web app: http://localhost:${PORT}`);
});

module.exports = app;
