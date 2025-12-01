const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    discountPercentage: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Offer', offerSchema);
