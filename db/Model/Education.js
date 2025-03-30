const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Başlık alanı zorunludur."],
			trim: true,
			maxlength: [100, "Başlık en fazla 100 karakter olabilir."],
			index: true, // Daha hızlı arama için indeksleme
		},
		description: {
			type: String,
			required: [true, "Açıklama alanı zorunludur."],
			trim: true,
			maxlength: [500, "Açıklama en fazla 500 karakter olabilir."],
		},
		date: {
			type: String,
			required: [true, "Tarih alanı zorunludur."],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Education', educationSchema);
