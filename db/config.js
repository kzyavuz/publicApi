const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 30000,
            heartbeatFrequencyMS: 2000,
            retryWrites: true,
            w: 'majority'
        };

        await mongoose.connect(process.env.MONGODB_URI, options);
        console.log('✅ MongoDB Bağlantısı Başarılı!');

        // Bağlantıyı test et
        await mongoose.connection.db.admin().ping();
        console.log('📡 MongoDB ping başarılı');

    } catch (err) {
        console.error('❌ MongoDB Bağlantı Hatası:', err);
        throw err; // Hatayı yukarı fırlat
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
