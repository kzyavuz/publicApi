const SkillsCategories = require("../db/Model/SkillsCategories");

module.exports = {
    // Yeni yetenek kategorisi ekler
    addSkillsCategory: async (req, res) => {
        const { title, skills } = req.body;

        // Zorunlu alan kontrolü
        if (!title || !Array.isArray(skills)) {
            return res.status(406).json({ message: "Eksik veya hatalı veri gönderildi." });
        }

        try {
            const newSkillsCategory = new SkillsCategories({
                title,
                skills,
            });
            await newSkillsCategory.save();
            res.status(200).json(newSkillsCategory);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Tüm yetenek kategorilerini listeler
    listSkillsCategory: async (req, res) => {
        try {
            const data = await SkillsCategories.find();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Yetenek kategorisini günceller
    updateSkillsCategory: async (req, res) => {
        const { _id, title, skills } = req.body;

        // Zorunlu alan kontrolü
        if (!_id || !title || !Array.isArray(skills)) {
            return res.status(406).json({ message: "Eksik veya hatalı veri gönderildi." });
        }

        try {
            const existingCategory = await SkillsCategories.findById(_id);
            if (!existingCategory) {
                return res.status(404).json({ message: "Yetenek Kategorisi bulunamadı." });
            }

            // Güncelleme işlemi
            existingCategory.title = title;
            existingCategory.skills = skills;

            await existingCategory.save();
            res.status(200).json(existingCategory);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Yetenek kategorisini siler
    deleteSkillsCategory: async (req, res) => {
        try {
            const { _id } = req.body;

            const deletedCategory = await SkillsCategories.findByIdAndDelete(_id);
            if (!deletedCategory) {
                return res.status(404).json({ message: "Yetenek kategorisi bulunamadı." });
            }

            res.status(200).json({ message: "Yetenek kategorisi başarıyla silindi." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Belirli bir yetenek kategorisini getirir
    detailsSkillsCategory: async (req, res) => {
        try {
            const { _id } = req.body;
            const skillsCategoryDetails = await SkillsCategories.findById(_id);

            if (!skillsCategoryDetails) {
                return res.status(404).json({ message: "Yetenek bulunamadı." });
            }

            res.status(200).json(skillsCategoryDetails);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
