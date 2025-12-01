const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false }, // Made optional
    price: { type: Number }, // Deprecated, kept for backward compatibility
    pricingOptions: [{
        label: { type: String, required: true }, // e.g., "1 Person", "Couple"
        price: { type: Number, required: true }
    }],
    features: [{ type: String }], // Bullet points
    duration: { type: String, required: true }, // e.g., "60 min"
    category: {
        type: String,
        required: true,
        // Enum removed to allow dynamic categories
        default: 'Otros'
    },
    image: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
