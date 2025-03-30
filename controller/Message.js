const Message = require('../db/Model/Message');
const validateInput = require('../db/validations/messageValidation');

module.exports = {
	addMessage: async (req, res) => {
		try {
			const { fullName, email, message, title } = req.body;

			const errors = validateInput({ fullName, email, message, title });

			if (errors.length > 0) {
				return res.status(400).json({ errors });
			}

			const newMessage = new Message({ title, fullName, email, message, status: false });

			await newMessage.save();
			res.status(200).json({ success: true, message: "Mesaj başarıyla gönderildi." });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	readMessage: async (req, res) => {
		const { _id } = req.body;
		try {
			const message = await Message.findById(_id).lean();
			if (!message) {
				return res.status(404).json({ error: "Mesaj bulunamadı." });
			}
			await Message.findByIdAndUpdate(_id, { status: true });
			res.status(200).json({ success: true, message: "Mesaj okundu olarak işaretlendi." });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	datailsMessage: async (req, res) => {
		try {
			const { _id } = req.body;
			const messageDetails = await Message.findById(_id).lean();

			if (!messageDetails) {
				return res.status(404).json({ error: "Mesaj bulunamadı." });
			}

			res.status(200).json(messageDetails);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	listMessage: async (req, res) => {
		try {
			const messages = await Message.find({ status: true }).sort({ createdAt: -1 }).lean();
			res.status(200).json(messages);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	newListMessage: async (req, res) => {
		try {
			const newMessages = await Message.find({ status: false }).sort({ createdAt: -1 }).lean();
			res.status(200).json(newMessages);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	countMessage: async (req, res) => {
		try {
			const count = await Message.countDocuments({ status: false });
			res.status(200).json({ count });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
};
