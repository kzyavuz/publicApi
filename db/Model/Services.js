const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
    icon: { type: String, required: false },
    title: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Services', servicesSchema);



