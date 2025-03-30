const Joi = require("joi");

module.exports = Joi.object({
    _id: Joi.string().optional(),
    title: Joi.string().required().messages({
        "string.empty": "Başlık alanı boş olamaz.",
        "any.required": "Başlık zorunludur."
    }),
    description: Joi.string()
        .min(30)
        .max(800)
        .required()
        .messages({
            "string.empty": "Açıklama alanı boş olamaz.",
            "any.required": "Açıklama zorunludur.",
            "string.min": "Açıklama en az 30 karakter olmalıdır.",
            "string.max": "Açıklama en fazla 800 karakter olabilir."
        }),
    name: Joi.string()
        .required()
        .messages({
            "string.empty": "İsim alanı boş olamaz.",
            "any.required": "İsim zorunludur."
        }),
    mail: Joi.string().email().required().messages({
        "string.empty": "E-posta alanı boş olamaz.",
        "any.required": "E-posta zorunludur.",
        "string.email": "Geçerli bir e-posta giriniz."
    }),
    introduction: Joi.string().
        required()
        .messages({
            "string.empty": "karsılama yazısı boş olamaz.",
            "any.required": "İsim zorunludur."
        }),
    whatsappNumber: Joi.string().required()
        .messages({
            "string.empty": "Telefon numarası boş olamaz.",
            "any.required": "İsim zorunludur."
        }),
    animationText: Joi.string().required()
        .messages({
            "string.empty": "Animasyon yazısı boş olamaz.",
            "any.required": "İsim zorunludur."
        }),
    github: Joi.string().allow('').optional(),
    instagram: Joi.string().allow('').optional(),
    linkedin: Joi.string().allow('').optional(),
    profilePicture: Joi.string().allow('').optional(),

});
