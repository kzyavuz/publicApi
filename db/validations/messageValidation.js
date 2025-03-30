const validator = require('validator');

const validateInput = (data) => {
    const errors = [];
    const alphanumericRegex = /^[a-zA-ZÇçĞğİıÖöŞşÜü0-9\s]+$/; // Harf, rakam, Türkçe karakter ve boşluk kontrolü

    // Her alanın tanımlı olup olmadığını kontrol et ve varsayılan değer ata
    data.fullName = data.fullName || "";
    data.title = data.title || "";
    data.email = data.email || "";
    data.message = data.message || "";


    // İsim kontrolü (Türkçe karakterlere izin ver)
    if (validator.isEmpty(data.fullName)) {
        errors.push('Ad Soyad alanı boş bırakılamaz');
    } else if (data.fullName.length < 3 || data.fullName.length > 30) {
        errors.push('Ad Soyad 3 ile 30 karakter arasında olmalıdır');
    } else if (!/^[a-zA-ZÇçĞğİıÖöŞşÜü\s]+$/.test(data.fullName)) {
        errors.push('Özel karakter kullanmadan yalnızca harflerle isim giriniz (Türkçe karakterlere izin verilir)');
    }

    // Başlık kontrolü (Harf, rakam, Türkçe karakter ve boşluklara izin ver)
    if (validator.isEmpty(data.title)) {
        errors.push('Başlık alanı boş bırakılamaz');
    } else if (data.title.length < 3 || data.title.length > 30) {
        errors.push('Başlık 3 ile 30 karakter arasında olmalıdır');
    } else if (!alphanumericRegex.test(data.title)) {
        errors.push('Başlık yalnızca harf, rakam, Türkçe karakter ve boşluk içerebilir');
    }

    // İçerik kontrolü (Harf, rakam, Türkçe karakter ve boşluklara izin ver)
    if (validator.isEmpty(data.message)) {
        errors.push('Mesaj alanı boş bırakılamaz');
    } else if (data.message.length < 10 || data.message.length > 300) {
        errors.push('Mesaj 10 ile 300 karakter arasında olmalıdır');
    } else if (!alphanumericRegex.test(data.message)) {
        errors.push('Mesaj yalnızca harf, rakam, Türkçe karakter ve boşluk içerebilir');
    }

    if (validator.isEmpty(data.email)) {
        errors.push('E-posta adresi boş bırakılamaz');
    } else if (data.email.length < 5 || data.email.length > 30) {
        errors.push('E-posta adresi 5 ile 30 karakter arasında olmalıdır');
    } else if (!validator.isEmail(data.email)) {
        errors.push('E-posta adresini doğru formatta giriniz');
    }
    return errors;
};

module.exports = validateInput;
