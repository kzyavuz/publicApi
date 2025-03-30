const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	name: { type: String, required: true },
	mail: { type: String, required: true },
	introduction: { type: String, required: true },
	whatsappNumber: { type: String, required: true },
	animationText: { type: String, required: true },
	github: { type: String, required: false },
	instagram: { type: String, required: false },
	linkedin: { type: String, required: false },
	profilePicture: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);



