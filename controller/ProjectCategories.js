const ProjectCategory = require('../db/Model/ProjectCategories');

module.exports = {
    // Proje verisi ekler.
    addProjectCategory: async (req, res) => {
        const { title } = req.body;

        // Zorunlu alan kontrolü
        if (!title) {
            return res.status(406).json({ message: "Eksik veya hatalı veri gönderildi." });
        }

        try {
            const newProjectCategory = new ProjectCategory({
                title,
            });
            await newProjectCategory.save();
            res.status(200).json(newProjectCategory);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    listProjectCategory: async (req, res) => {
        try {
            const data = await ProjectCategory.find()
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    // Hakkımda verilerini günceller.
    updateProjectCategory: async (req, res) => {
        const { title } = req.body;

        // Zorunlu alan kontrolü
        if (!title) {
            return res.status(406).json({ message: "Eksik veya hatalı veri gönderildi." });
        }

        try {
            const ProjectCategory = await ProjectCategory.findById(_id);
            if (!ProjectCategory) {
                return res.status(404).json({ message: "Proje Kategorisi bulunamadı." });
            }

            // Güncelleme işlemi
            const updatedProjectCategory = await ProjectCategory.findByIdAndUpdate(
                _id,
                {
                    title,
                },
                { new: true } // Güncellenmiş veriyi döndürmek için
            );

            res.status(200).json(updatedProjectCategory);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    //Hakkımda verisini siler.
    deleteProjectCategory: async (req, res) => {
        try {
            const { _id } = req.body;
            const ProjectCategory = await ProjectCategory.findById(_id);

            if (!ProjectCategory) {
                return res.status(404).json({ message: "Proje kategorisi bulunamadı." });
            }

            await ProjectCategory.findByIdAndDelete(_id);
            res.status(200).json({ message: "Proje kategorisi başarıyla silindi." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    detailsProjectCategory: async (req, res) => {
        try {
            const { _id } = req.body;
            const ProjectCategoryDetails = await ProjectCategory.findById(_id);

            if (!ProjectCategoryDetails) {
                return res.status(404).json({ message: "Proje bulunamadı." });
            }

            res.status(200).json(ProjectCategoryDetails);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
