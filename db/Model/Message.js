const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			match: [/\S+@\S+\.\S+/, 'Geçerli bir e-posta adresi giriniz.'],
		},
		message: {
			type: String,
			required: true,
			trim: true,
		},
		title: {
			type: String,
			required: true,
			trim: true,
		},
		status: {
			type: Boolean,
			default: false,
		},
		date: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
