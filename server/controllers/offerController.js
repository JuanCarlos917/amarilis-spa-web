const Offer = require('../models/Offer');

exports.getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.find();
        res.json(offers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getActiveOffers = async (req, res) => {
    try {
        const offers = await Offer.find({ isActive: true, expiryDate: { $gte: new Date() } });
        res.json(offers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createOffer = async (req, res) => {
    try {
        const offer = new Offer(req.body);
        const newOffer = await offer.save();
        res.status(201).json(newOffer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateOffer = async (req, res) => {
    try {
        const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(offer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteOffer = async (req, res) => {
    try {
        await Offer.findByIdAndDelete(req.params.id);
        res.json({ message: 'Offer deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
