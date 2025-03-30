const mongoose = require('mongoose');

const dbURI = "mongodb://localhost:27017/portfolyo";

mongoose.connect(dbURI)
    .then(() => console.log("MongoDB bağlantısı başarılı"))
    .catch(error => console.error("MongoDB bağlantı hatası:", error));
