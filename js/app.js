// SynergySphere Web Application - Project Management MVP

// Global state
let currentUser = null;
let currentProject = null;
let projects = [];
let tasks = [];
let currentSection = 'dashboard';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadUserData();
    checkAuthStatus();
});

// Initialize application
function initializeApp() {
    console.log('SynergySphere Web Application initialized');
    
    // Set up theme
    const savedTheme = localStorage.getItem('synergysphere-theme') || 'light';
    setTheme(savedTheme);
    
    // Set up navigation
    setupNavigation();
    
    // Set up form event listeners
    setupFormListeners();
    
    // Load initial data
    loadDashboardData();
}

// Set up form event listeners
function setupFormListeners() {
    console.log('Setting up form event listeners...');
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    console.log('Login form element:', loginForm);
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        console.log('Login form event listener added');
    } else {
        console.log('Login form not found!');
    }
    
    // Signup form
    const signupForm = document.getElementById('signupForm');
    console.log('Signup form element:', signupForm);
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
        console.log('Signup form event listener added');
    } else {
        console.log('Signup form not found!');
    }
}

// Theme Management
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('synergysphere-theme', newTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Authentication
function checkAuthStatus() {
    const user = localStorage.getItem('synergysphere-user');
    if (user) {
        currentUser = JSON.parse(user);
        showMainApp();
        loadUserData();
    } else {
        showAuthScreen();
    }
}

function showAuthScreen() {
    document.getElementById('auth-screen').style.display = 'block';
    document.getElementById('main-app').style.display = 'none';
}

function showMainApp() {
    console.log('Showing main app...');
    const authScreen = document.getElementById('auth-screen');
    const mainApp = document.getElementById('main-app');
    
    console.log('Auth screen element:', authScreen);
    console.log('Main app element:', mainApp);
    
    if (authScreen) {
        authScreen.style.display = 'none';
        console.log('Auth screen hidden');
    }
    
    if (mainApp) {
        mainApp.style.display = 'block';
        console.log('Main app shown');
    }
    
    updateUserInfo();
}

function handleLogin(event) {
    event.preventDefault();
    console.log('Login form submitted');
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    console.log('Email:', email);
    console.log('Password:', password);
    
    // Simulate login (in real app, this would be an API call)
    if (email && password) {
        console.log('Creating user...');
        currentUser = {
            id: Date.now(),
            name: email.split('@')[0],
            email: email,
            avatar: getInitials(email.split('@')[0])
        };
        
        console.log('User created:', currentUser);
        
        localStorage.setItem('synergysphere-user', JSON.stringify(currentUser));
        console.log('User saved to localStorage');
        
        showMainApp();
        loadUserData();
        
        // Clear form
        document.getElementById('login-email').value = '';
        document.getElementById('login-password').value = '';
        
        console.log('Login successful, showing main app');
    } else {
        console.log('Missing email or password');
        alert('Please enter both email and password');
    }
}

function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    // Simulate signup (in real app, this would be an API call)
    if (name && email && password) {
        currentUser = {
            id: Date.now(),
            name: name,
            email: email,
            avatar: getInitials(name)
        };
        
        localStorage.setItem('synergysphere-user', JSON.stringify(currentUser));
        showMainApp();
        loadUserData();
        
        // Clear form
        document.getElementById('signup-name').value = '';
        document.getElementById('signup-email').value = '';
        document.getElementById('signup-password').value = '';
    }
}

function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
}

function showSignupForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function showForgotPassword() {
    alert('Forgot password functionality would be implemented here');
}

function logout() {
    localStorage.removeItem('synergysphere-user');
    localStorage.removeItem('synergysphere-projects');
    localStorage.removeItem('synergysphere-tasks');
    currentUser = null;
    projects = [];
    tasks = [];
    showAuthScreen();
}

function updateUserInfo() {
    if (currentUser) {
        document.getElementById('user-name').textContent = currentUser.name;
        document.getElementById('profile-name').value = currentUser.name;
        document.getElementById('profile-email').value = currentUser.email;
    }
}

// Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('onclick')?.match(/showSection\('([^']+)'\)/)?.[1];
            if (section) {
                showSection(section);
            }
        });
    });
}

function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.add('section-hidden');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.remove('section-hidden');
        currentSection = sectionName;
    }
    
    // Update navigation
    updateNavigation(sectionName);
    
    // Load section-specific data
    if (sectionName === 'dashboard') {
        loadDashboardData();
    } else if (sectionName === 'projects') {
        loadProjects();
    } else if (sectionName === 'profile') {
        loadProfile();
    }
}

function updateNavigation(activeSection) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick')?.includes(activeSection)) {
            link.classList.add('active');
        }
    });
}

// Dashboard
function loadDashboardData() {
    loadProjects();
    updateDashboardStats();
    loadRecentProjects();
}

function updateDashboardStats() {
    const totalProjects = projects.length;
    const allTasks = tasks.flat();
    const activeTasks = allTasks.filter(task => task.status === 'todo' || task.status === 'in-progress').length;
    const completedTasks = allTasks.filter(task => task.status === 'done').length;
    const overdueTasks = allTasks.filter(task => {
        if (!task.dueDate) return false;
        return new Date(task.dueDate) < new Date() && task.status !== 'done';
    }).length;
    
    document.getElementById('total-projects').textContent = totalProjects;
    document.getElementById('active-tasks').textContent = activeTasks;
    document.getElementById('completed-tasks').textContent = completedTasks;
    document.getElementById('overdue-tasks').textContent = overdueTasks;
}

function loadRecentProjects() {
    const recentProjectsContainer = document.getElementById('recent-projects');
    const recentProjects = projects.slice(0, 3);
    
    if (recentProjects.length === 0) {
        recentProjectsContainer.innerHTML = `
            <div class="text-center text-muted py-4">
                <i class="fas fa-folder-open fa-3x mb-3"></i>
                <p>No projects yet. Create your first project to get started!</p>
            </div>
        `;
        return;
    }
    
    recentProjectsContainer.innerHTML = recentProjects.map(project => `
        <div class="project-card" onclick="openProject('${project.id}')">
            <div class="project-title">${project.name}</div>
            <div class="project-description">${project.description || 'No description'}</div>
            <div class="project-stats">
                <span><i class="fas fa-tasks me-1"></i>${getProjectTaskCount(project.id)} tasks</span>
                <span><i class="fas fa-users me-1"></i>${project.members.length} members</span>
                <span><i class="fas fa-calendar me-1"></i>${formatDate(project.createdAt)}</span>
            </div>
        </div>
    `).join('');
}

// Projects
function loadProjects() {
    const projectsContainer = document.getElementById('projects-list');
    
    if (projects.length === 0) {
        projectsContainer.innerHTML = `
            <div class="text-center text-muted py-5">
                <i class="fas fa-project-diagram fa-4x mb-4"></i>
                <h4>No Projects Yet</h4>
                <p>Create your first project to start collaborating with your team.</p>
                <button class="btn btn-primary" onclick="showCreateProjectModal()">
                    <i class="fas fa-plus me-1"></i>Create Project
                </button>
            </div>
        `;
        return;
    }
    
    projectsContainer.innerHTML = projects.map(project => `
        <div class="project-card" onclick="openProject('${project.id}')">
            <div class="project-title">${project.name}</div>
            <div class="project-description">${project.description || 'No description'}</div>
            <div class="project-stats">
                <span><i class="fas fa-tasks me-1"></i>${getProjectTaskCount(project.id)} tasks</span>
                <span><i class="fas fa-users me-1"></i>${project.members.length} members</span>
                <span><i class="fas fa-calendar me-1"></i>${formatDate(project.createdAt)}</span>
            </div>
        </div>
    `).join('');
}

function openProject(projectId) {
    currentProject = projects.find(p => p.id === projectId);
    if (currentProject) {
        showProjectDetail();
        loadProjectTasks();
    }
}

function showProjectDetail() {
    showSection('project-detail');
    document.getElementById('project-detail-title').textContent = currentProject.name;
    document.getElementById('project-description').textContent = currentProject.description || 'No description';
    document.getElementById('project-created').textContent = formatDate(currentProject.createdAt);
    document.getElementById('project-task-count').textContent = getProjectTaskCount(currentProject.id);
    document.getElementById('project-members').textContent = currentProject.members.length;
    document.getElementById('project-status').textContent = currentProject.status || 'Active';
}

function loadProjectTasks() {
    if (!currentProject) return;
    
    const projectTasks = tasks.filter(task => task.projectId === currentProject.id);
    
    // Update task counts
    const todoTasks = projectTasks.filter(task => task.status === 'todo');
    const inProgressTasks = projectTasks.filter(task => task.status === 'in-progress');
    const doneTasks = projectTasks.filter(task => task.status === 'done');
    
    document.getElementById('todo-count').textContent = todoTasks.length;
    document.getElementById('in-progress-count').textContent = inProgressTasks.length;
    document.getElementById('done-count').textContent = doneTasks.length;
    
    // Render task lists
    renderTaskList('todo-tasks', todoTasks);
    renderTaskList('in-progress-tasks', inProgressTasks);
    renderTaskList('done-tasks', doneTasks);
}

function renderTaskList(containerId, taskList) {
    const container = document.getElementById(containerId);
    
    if (taskList.length === 0) {
        container.innerHTML = `
            <div class="text-center text-muted py-3">
                <i class="fas fa-clipboard-list fa-2x mb-2"></i>
                <p class="mb-0">No tasks</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = taskList.map(task => `
        <div class="task-card" onclick="showTaskDetail('${task.id}')">
            <div class="task-title">${task.title}</div>
            <div class="task-description">${task.description || 'No description'}</div>
            <div class="task-meta">
                <div class="task-assignee">
                    <div class="assignee-avatar">${getInitials(task.assignee)}</div>
                    <span>${task.assignee}</span>
                </div>
                <div>
                    <span class="status-indicator status-${task.status}"></span>
                    ${task.dueDate ? formatDate(task.dueDate) : 'No due date'}
                </div>
            </div>
        </div>
    `).join('');
}

// Project Management
function showCreateProjectModal() {
    const modal = new bootstrap.Modal(document.getElementById('createProjectModal'));
    modal.show();
}

function createProject() {
    const name = document.getElementById('project-name').value;
    const description = document.getElementById('project-description').value;
    const membersText = document.getElementById('project-members').value;
    
    if (!name.trim()) {
        alert('Please enter a project name');
        return;
    }
    
    const members = membersText ? membersText.split(',').map(email => email.trim()).filter(email => email) : [];
    
    const project = {
        id: Date.now().toString(),
        name: name,
        description: description,
        members: members,
        status: 'active',
        createdAt: new Date().toISOString(),
        createdBy: currentUser.id
    };
    
    projects.push(project);
    saveProjects();
    
    // Close modal and clear form
    const modal = bootstrap.Modal.getInstance(document.getElementById('createProjectModal'));
    modal.hide();
    document.getElementById('project-name').value = '';
    document.getElementById('project-description').value = '';
    document.getElementById('project-members').value = '';
    
    // Refresh views
    loadProjects();
    loadDashboardData();
    
    alert('Project created successfully!');
}

// Task Management
function showCreateTaskModal() {
    if (!currentProject) {
        alert('Please select a project first');
        return;
    }
    
    // Populate assignee dropdown
    const assigneeSelect = document.getElementById('task-assignee');
    assigneeSelect.innerHTML = '<option value="">Select assignee</option>';
    
    // Add current user
    assigneeSelect.innerHTML += `<option value="${currentUser.name}">${currentUser.name} (You)</option>`;
    
    // Add project members
    currentProject.members.forEach(member => {
        if (member !== currentUser.email) {
            assigneeSelect.innerHTML += `<option value="${member}">${member}</option>`;
        }
    });
    
    const modal = new bootstrap.Modal(document.getElementById('createTaskModal'));
    modal.show();
}

function createTask() {
    if (!currentProject) {
        alert('Please select a project first');
        return;
    }
    
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const assignee = document.getElementById('task-assignee').value;
    const dueDate = document.getElementById('task-due-date').value;
    const priority = document.getElementById('task-priority').value;
    
    if (!title.trim()) {
        alert('Please enter a task title');
        return;
    }
    
    if (!assignee) {
        alert('Please select an assignee');
        return;
    }
    
    const task = {
        id: Date.now().toString(),
        projectId: currentProject.id,
        title: title,
        description: description,
        assignee: assignee,
        dueDate: dueDate,
        priority: priority,
        status: 'todo',
        createdAt: new Date().toISOString(),
        createdBy: currentUser.id
    };
    
    tasks.push(task);
    saveTasks();
    
    // Close modal and clear form
    const modal = bootstrap.Modal.getInstance(document.getElementById('createTaskModal'));
    modal.hide();
    document.getElementById('task-title').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('task-assignee').value = '';
    document.getElementById('task-due-date').value = '';
    document.getElementById('task-priority').value = 'medium';
    
    // Refresh project tasks
    loadProjectTasks();
    loadDashboardData();
    
    alert('Task created successfully!');
}

function showTaskDetail(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    document.getElementById('task-detail-title').textContent = task.title;
    document.getElementById('task-detail-description').textContent = task.description || 'No description';
    document.getElementById('task-detail-status').value = task.status;
    document.getElementById('task-detail-assignee').textContent = task.assignee;
    document.getElementById('task-detail-due-date').textContent = task.dueDate ? formatDate(task.dueDate) : 'No due date';
    document.getElementById('task-detail-priority').textContent = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
    
    // Store current task for updates
    window.currentTask = task;
    
    const modal = new bootstrap.Modal(document.getElementById('taskDetailModal'));
    modal.show();
}

function updateTaskStatus() {
    if (!window.currentTask) return;
    
    const newStatus = document.getElementById('task-detail-status').value;
    const task = tasks.find(t => t.id === window.currentTask.id);
    
    if (task) {
        task.status = newStatus;
        saveTasks();
        loadProjectTasks();
        loadDashboardData();
    }
}

function deleteTask() {
    if (!window.currentTask) return;
    
    if (confirm('Are you sure you want to delete this task?')) {
        const taskIndex = tasks.findIndex(t => t.id === window.currentTask.id);
        if (taskIndex > -1) {
            tasks.splice(taskIndex, 1);
            saveTasks();
            loadProjectTasks();
            loadDashboardData();
            
            const modal = bootstrap.Modal.getInstance(document.getElementById('taskDetailModal'));
            modal.hide();
        }
    }
}

// Profile Management
function loadProfile() {
    if (currentUser) {
        document.getElementById('profile-name').value = currentUser.name;
        document.getElementById('profile-email').value = currentUser.email;
    }
}

function updateProfile(event) {
    event.preventDefault();
    
    const name = document.getElementById('profile-name').value;
    const email = document.getElementById('profile-email').value;
    
    if (name && email) {
        currentUser.name = name;
        currentUser.email = email;
        currentUser.avatar = getInitials(name);
        
        localStorage.setItem('synergysphere-user', JSON.stringify(currentUser));
        updateUserInfo();
        alert('Profile updated successfully!');
    }
}

// Data Management
function loadUserData() {
    const savedProjects = localStorage.getItem('synergysphere-projects');
    const savedTasks = localStorage.getItem('synergysphere-tasks');
    
    if (savedProjects) {
        projects = JSON.parse(savedProjects);
    }
    
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

function saveProjects() {
    localStorage.setItem('synergysphere-projects', JSON.stringify(projects));
}

function saveTasks() {
    localStorage.setItem('synergysphere-tasks', JSON.stringify(tasks));
}

// Utility Functions
function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function getProjectTaskCount(projectId) {
    return tasks.filter(task => task.projectId === projectId).length;
}

// API Integration (for future backend integration)
async function checkApiStatus() {
    try {
        const response = await axios.get('/api/status');
        console.log('API Status:', response.data);
        return true;
    } catch (error) {
        console.error('API Error:', error.message);
        return false;
    }
}

// Initialize API check on load
checkApiStatus();