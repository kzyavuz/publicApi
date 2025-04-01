require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/config');

require('./db/config');

const aboutRoutes = require('./controller/About');
const projectRoutes = require('./controller/Project');
const messageRoutes = require('./controller/Message');
const workRoutes = require('./controller/Work');
const educationRoutes = require('./controller/Education');
const userRoutes = require('./controller/Users');
const projectCategoryRoutes = require('./controller/ProjectCategories');
const skillsCategoryRoutes = require('./controller/SkillsCategories');

const Token = require('./Token');
const app = express();
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));
app.use(express.json());

const corsOptions = process.env.NODE_ENV === 'production'
	? {
		origin: [
			'https://yavuzkoz.netlify.app',
			'http://yavuzkoz.com.tr',
			'https://yavuzkoz.com.tr'
		],
		methods: ['GET', 'POST', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
		preflightContinue: false,
		optionsSuccessStatus: 204
	}
	: {
		origin: '*',
		methods: ['GET', 'POST', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true
	};

app.use(cors(corsOptions));

// Options istekleri için özel handler
app.options('*', cors(corsOptions));

app.get('/', (req, res) => {
	res.send('controller Çalısıyor.');
});

// MongoDB bağlantısını başlat ve hataları yakala
connectDB().catch(err => {
	console.error('MongoDB bağlantı hatası:', err);
	process.exit(1);
});

// About methods
app.get('/getOneAbout', aboutRoutes.getOneAbout);
app.get('/listAbout', Token, aboutRoutes.listAbout);
app.post('/detailsAbout', Token, aboutRoutes.detailsAbout);
app.post('/addAbout', Token, aboutRoutes.addAbout);
app.post('/updateAbout', Token, aboutRoutes.updateAbout);
app.post('/deleteAbout', Token, aboutRoutes.deleteAbout);

//Project methodss
app.get('/listProject', projectRoutes.listProject);
app.post('/detailsProject', projectRoutes.detailsProject);
app.post('/addProject', Token, projectRoutes.addProject);
app.post('/updateProject', Token, projectRoutes.updateProject);
app.post('/deleteProject', Token, projectRoutes.deleteProject);

//Project Categotu Methods
app.get('/listProjectCategory', projectCategoryRoutes.listProjectCategory);
app.post('/addProjectCategory', Token, projectCategoryRoutes.addProjectCategory);
app.post('/updateProjectCategory', Token, projectCategoryRoutes.updateProjectCategory);

//Skills Categotu Methods
app.get('/listSkillsCategory', skillsCategoryRoutes.listSkillsCategory);
app.post('/addSkillsCategory', skillsCategoryRoutes.addSkillsCategory);
app.post('/updateSkillsCategory', skillsCategoryRoutes.updateSkillsCategory);
app.post('/detailsSkillsCategory', skillsCategoryRoutes.detailsSkillsCategory);
app.post('/deleteSkillsCategory', skillsCategoryRoutes.deleteSkillsCategory);

// Work methods
app.get('/listWork', workRoutes.listWork);
app.post('/addWork', Token, workRoutes.addWork);
app.post('/updateWork', Token, workRoutes.updateWork);
app.post('/deleteWork', Token, workRoutes.deleteWork);
app.post('/datailsWork', Token, workRoutes.datailsWork);

// Education methods
app.get('/listEducation', educationRoutes.listEducation);
app.post('/addEducation', Token, educationRoutes.addEducation);
app.post('/updateEducation', Token, educationRoutes.updateEducation);
app.post('/deleteEducation', Token, educationRoutes.deleteEducation);
app.post('/datailsEducation', Token, educationRoutes.detailsEducation);

// Mesajları methods.
app.post('/addMessage', messageRoutes.addMessage);
app.get('/listMessage', Token, messageRoutes.listMessage);
app.get('/newListMessage', Token, messageRoutes.newListMessage);
app.post('/readMessage', Token, messageRoutes.readMessage);
app.post('/detailsMessage', Token, messageRoutes.datailsMessage);
app.post('/countMessage', Token, messageRoutes.countMessage);

// User methods
app.post('/SignIn', userRoutes.SignIn);
app.post('/listUser', Token, userRoutes.listUser);
app.post('/SignUp', Token, userRoutes.SignUp);

// Global error handler'ı güçlendir
app.use((err, req, res, next) => {
	console.error('Global Error:', err);
	res.status(500).json({
		status: 'error',
		message: 'Internal Server Error',
		error: process.env.NODE_ENV === 'development' ? {
			message: err.message,
			stack: err.stack
		} : undefined
	});
});

// PORT'u .env'den al
const PORT = process.env.PORT || 10000;

app.listen(PORT, '0.0.0.0', () => {
	console.log(`Server is running on port ${PORT}`);
});
