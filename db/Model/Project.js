const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
	position: {
		type: String,
		required: [true, 'Pozisyon gerekli'],
		minlength: [3, 'Pozisyon adı en az 3 karakter olmalıdır'],
		maxlength: [50, 'Pozisyon adı en fazla 50 karakter olmalıdır']
	},
	projectImage: {
		type: String
	},
	technologies: {
		type: [String],
		validate: {
			validator: (value) => Array.isArray(value),
			message: 'Teknolojiler dizisi olmalıdır'
		}
	},
	title: {
		type: String,
		required: [true, 'Proje başlığı gerekli'],
		maxlength: [100, 'Başlık en fazla 100 karakter olmalıdır']
	},
	description: {
		type: String,
		maxlength: [500, 'Açıklama en fazla 500 karakter olmalıdır']
	},
	link: {
		type: String,
		validate: {
			validator: (value) => /^(ftp|http|https):\/\/[^ "]+$/.test(value),
			message: 'Geçerli bir bağlantı URL\'si giriniz'
		}
	},
	category: {
		type: String,
		required: [true, 'Kategori gerekli']
	},
	status: {
		type: String,
		enum: ['Tamamlandı', 'Devam Ediyor'],
		default: 'Tamamlandı'
	},
	startDate: {
		type: Date,
		required: [true, 'Başlangıç tarihi gerekli']
	},
	finishDate: {
		type: Date,
		validate: {
			validator: function (value) {
				return value >= this.startDate || !value;
			},
			message: 'Bitiş tarihi başlangıç tarihinden önce olamaz'
		}
	},
	createDate: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Project", projectSchema);
