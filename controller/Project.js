const Project = require('../db/Model/Project');

module.exports = {
	// Proje verisi ekler.
	addProject: async (req, res) => {
		try {
			const { title, projectImage, technologies, link, position, category, status, description, startDate, finishDate, } = req.body;

			// Zorunlu alan kontrolü
			if (!title || !position || !category || !startDate) {
				return res.status(406).json({ message: "Eksik veya hatalı veri gönderildi." });
			}

			const newProject = new Project({
				title,
				projectImage,
				technologies,
				link,
				position,
				category,
				status,
				startDate,
				finishDate,
				description,
			});
			await newProject.save();
			res.status(200).json(newProject);

		} catch (error) {
			if (error.name === 'ValidationError') {
				const errorMessages = Object.values(error.errors).map(err => err.message);
				return res.status(400).json({ errors: errorMessages });
			}
			res.status(500).json({ message: 'Sunucu hatası' });
		}
	},

	listProject: async (req, res) => {
		try {
			const { category, sortBy } = req.query;

			const query = category ? { category } : {};
			const data = await Project.find(query).sort(sortBy ? { [sortBy]: 1 } : { createdAt: -1 });
			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},


	// Hakkımda verilerini günceller.
	updateProject: async (req, res) => {
		try {
			const { title, projectImage, technologies, link, position, category, status, description, startDate, finishDate, _id } = req.body;

			// Zorunlu alan kontrolü
			if (!title || !position || !category || !startDate) {
				return res.status(406).json({ message: "Eksik veya hatalı veri gönderildi." });
			}

			const project = await Project.findById(_id);

			if (!project) {
				return res.status(404).json({ message: "Proje bulunamadı." });
			}

			// Güncelleme işlemi
			const updatedProject = await Project.findByIdAndUpdate(
				_id,
				{
					title,
					projectImage: projectImage || project.projectImage,
					technologies,
					link,
					startDate,
					finishDate,
					position,
					category,
					status: status || project.status, // Varsayılan durumu koru
					description,
				},
				{ new: true } // Güncellenmiş veriyi döndürmek için
			);

			res.status(200).json(updatedProject);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	//Hakkımda verisini siler.
	deleteProject: async (req, res) => {
		try {
			const { _id } = req.body;
			const project = await Project.findById(_id);

			if (!project) {
				return res.status(404).json({ message: "Proje bulunamadı." });
			}

			await Project.findByIdAndDelete(_id);
			res.status(200).json({ message: "Proje başarıyla silindi." });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	detailsProject: async (req, res) => {
		try {
			const { _id } = req.body;
			const projectDetails = await Project.findById(_id);

			if (!projectDetails) {
				return res.status(404).json({ message: "Proje bulunamadı." });
			}

			res.status(200).json(projectDetails);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
};
