const About = require('../db/Model/About');
const aboutValidationSchema = require('../db/validations/aboutValidation');

module.exports = {
	// Son eklenen veriyi getirir.
	getOneAbout: async (req, res) => {
		try {
			const about = await About.findOne().sort({ _id: -1 });
			if (!about) {
				return res.status(404).json({ error: "Hakkımda bilgisi bulunamadı." });
			}
			res.status(200).json(about);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	validateAbout: async (req) => {
		const { error } = aboutValidationSchema.validate(req.body, { abortEarly: false });

		if (error) {
			return error.details.reduce((acc, curr) => {
				acc[curr.path[0]] = curr.message;
				return acc;
			}, {});
		}
		return null;
	},

	addAbout: async (req, res) => {
		try {

			const validationErrors = await module.exports.validateAbout(req);

			if (validationErrors) {
				return res.status(400).json({ errors: validationErrors });
			}

			const newAbout = new About(req.body);
			await newAbout.save();

			res.status(200).json(newAbout);
		} catch (error) {
			res.status(500).json({ error: "Beklenmeyen bir hata oluştu." });
		}
	},

	listAbout: async (req, res) => {
		try {
			const aboutList = await About.find().sort({ _id: -1 });
			res.status(200).json(aboutList);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	updateAbout: async (req, res) => {
		try {
			if (!req.body._id) {
				return res.status(404).json({ error: "ID bilgisi bulunamadı." });
			}
			const validationErrors = await module.exports.validateAbout(req);

			if (validationErrors) {
				return res.status(400).json({ errors: validationErrors });
			}

			const updatedAbout = await About.findByIdAndUpdate(req.body._id, req.body, { new: true });

			if (!updatedAbout) {
				return res.status(404).json({ error: "Güncellenecek veri bulunamadı." });
			}

			res.status(200).json(updatedAbout);
		} catch (error) {
			res.status(500).json({ error: "Beklenmeyen bir hata oluştu." });
		}
	},


	// Hakkımda verisini siler.
	deleteAbout: async (req, res) => {
		try {
			const { _id } = req.body;

			if (!_id) {
				return res.status(400).json({ error: "Silinecek ID eksik." });
			}

			const deletedAbout = await About.findByIdAndDelete(_id);

			if (!deletedAbout) {
				return res.status(404).json({ error: "Silinecek kayıt bulunamadı." });
			}

			res.status(200).json({ message: "Kayıt başarıyla silindi." });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// Belirli bir hakkımda verisinin detaylarını getirir.
	detailsAbout: async (req, res) => {
		try {
			const { _id } = req.body;

			if (!_id) {
				return res.status(400).json({ error: "ID eksik." });
			}

			const aboutDetails = await About.findById(_id);

			if (!aboutDetails) {
				return res.status(404).json({ error: "Kayıt bulunamadı." });
			}

			res.status(200).json(aboutDetails);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
};
