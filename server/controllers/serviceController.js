const Service = require('../models/Service');

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find();

        // On-the-fly migration for frontend compatibility
        const migratedServices = services.map(service => {
            const s = service.toObject();
            if ((!s.pricingOptions || s.pricingOptions.length === 0) && s.price) {
                s.pricingOptions = [{ label: 'Standard', price: s.price }];
            }
            if (!s.features) s.features = [];
            return s;
        });

        res.json(migratedServices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createService = async (req, res) => {
    try {
        const service = new Service(req.body);
        const newService = await service.save();
        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateService = async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(service);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteService = async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: 'Service deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
