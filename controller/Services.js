const model = require('../db/Model/Services');

module.exports = {

    addServices: async (req, res) => {
        try {
            const { icon, title, description } = req.body;

            const newServices = new model({
                icon,
                title,
                description,
            });
            await newServices.save();
            res.status(200).json(newServices);

        } catch (error) {
            if (error.name === 'ValidationError') {
                const errorMessages = Object.values(error.errors).map(err => err.message);
                return res.status(400).json({ errors: errorMessages });
            }
            res.status(500).json({ message: 'Sunucu hatası' });
        }
    },

    listServices: async (req, res) => {
        try {
            const data = await model.find().sort({ createdAt: -1 });
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateServices: async (req, res) => {
        try {
            const { icon, title, description, _id } = req.body;

            const data = await model.findById(_id);

            if (!data) {
                return res.status(404).json({ message: "Güncelleneck hizmet bulunamadı." });
            }

            const updatedServices = await model.findByIdAndUpdate(_id, {
                icon,
                title,
                description,
            }, { new: true });
            res.status(200).json(updatedServices);

        } catch (error) {
            if (error.name === 'ValidationError') {
                const errorMessages = Object.values(error.errors).map(err => err.message);
                return res.status(400).json({ errors: errorMessages });
            }
            res.status(500).json({ message: 'Sunucu hatası' });
        }
    },

    deleteServices: async (req, res) => {
        try {
            const { _id } = req.body;

            if (!_id) {
                return res.status(406).json({ message: "Eksik veya hatalı veri gönderildi." });
            }

            const project = await model.findById(_id);

            if (!project) {
                return res.status(404).json({ message: "Proje bulunamadı." });
            }

            await Project.findByIdAndDelete(_id);
            res.status(200).json({ message: "Proje başarıyla silindi." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};