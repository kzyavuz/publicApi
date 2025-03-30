const mongoose = require("mongoose");

const skillsCategorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    skills: [
        {
            name: { type: String, required: true },
            image: { type: String, required: false }
        }
    ]
});

module.exports = mongoose.model("SkillsCategories", skillsCategorySchema);
