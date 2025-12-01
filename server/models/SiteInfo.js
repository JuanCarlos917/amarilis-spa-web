const mongoose = require('mongoose');

const siteInfoSchema = new mongoose.Schema({
    aboutText: { type: String },
    contactPhone: { type: String },
    contactEmail: { type: String },
    address: { type: String },
    socialLinks: {
        instagram: String,
        facebook: String,
        whatsapp: String
    },
    heroTitle: { type: String },
    heroSubtitle: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('SiteInfo', siteInfoSchema);
