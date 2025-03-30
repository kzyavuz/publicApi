const Education = require('../db/Model/Education');

module.exports = {
	// Yeni eğitim verisi ekler
	addEducation: async (req, res) => {
		try {
			const { title, description, date } = req.body;

			if (!title || !description || !date) {
				return res.status(400).json({ error: "Tüm alanlar zorunludur." });
			}

			const newEducation = new Education({ title, description, date });

			await newEducation.save();

			res.status(200).json(newEducation);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// Tüm eğitim verilerini getirir
	listEducation: async (req, res) => {
		try {
			const data = await Education.find().sort({ createdAt: -1 });
			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// Eğitim verisini günceller
	updateEducation: async (req, res) => {
		try {
			const { _id, title, description, date } = req.body;

			if (!_id) {
				return res.status(400).json({ error: "Güncellenecek ID eksik." });
			}

			const updatedEducation = await Education.findByIdAndUpdate(
				_id,
				{ title, description, date },
				{ new: true } // Güncellenmiş veriyi döndür
			);

			if (!updatedEducation) {
				return res.status(404).json({ error: "Eğitim verisi bulunamadı." });
			}

			res.status(200).json(updatedEducation);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// Eğitim verisini siler
	deleteEducation: async (req, res) => {
		try {
			const { _id } = req.body;

			if (!_id) {
				return res.status(400).json({ error: "Silinecek ID eksik." });
			}

			const education = await Education.findByIdAndDelete(_id);

			if (!education) {
				return res.status(404).json({ error: "Silinecek veri bulunamadı." });
			}

			res.status(200).json({ message: "Eğitim verisi başarıyla silindi." });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// Belirli bir eğitim verisini getirir
	detailsEducation: async (req, res) => {
		try {
			const { _id } = req.body;

			if (!_id) {
				return res.status(400).json({ error: "ID eksik." });
			}

			const education = await Education.findById(_id);

			if (!education) {
				return res.status(404).json({ error: "Eğitim verisi bulunamadı." });
			}

			res.status(200).json(education);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
};
