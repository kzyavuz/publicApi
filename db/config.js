const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 30000,
            heartbeatFrequencyMS: 2000
        };

        await mongoose.connect(process.env.MONGODB_URI, options);
        console.log('✅ MongoDB Bağlantısı Başarılı!');
    } catch (err) {
        console.error('❌ MongoDB Bağlantı Hatası:', err);
        process.exit(1);
    }
};

mongoose.connection.on('error', err => {
    console.error('🔴 MongoDB bağlantı hatası:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('🔸 MongoDB bağlantısı kesildi, yeniden bağlanmaya çalışılıyor...');
    connectDB();
});

module.exports = connectDB;
