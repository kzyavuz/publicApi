const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB Bağlantısı Başarılı!');
        console.log(`📡 Veritabanı: ${process.env.MONGODB_URI}`);
    })
    .catch(err => {
        console.error('❌ MongoDB Bağlantı Hatası:', err);
        console.log('🔴 Uygulama kapatılıyor...');
        process.exit(1);
    });

mongoose.connection.on('error', err => {
    console.error('🔴 MongoDB bağlantı hatası:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('🔸 MongoDB bağlantısı kesildi');
});
