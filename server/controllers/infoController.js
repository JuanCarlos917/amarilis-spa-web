const SiteInfo = require('../models/SiteInfo');

// Obtener la información del sitio (Pública)
exports.getSiteInfo = async (req, res) => {
    try {
        // Busca el primer documento que encuentre
        const info = await SiteInfo.findOne();

        if (!info) {
            return res.json({
                heroTitle: 'Welcome',
                heroSubtitle: 'Subtitle here',
                aboutText: '',
                contactPhone: '',
                contactEmail: '',
                address: ''
            });
        }

        res.json(info);
    } catch (error) {
        console.error("Error al obtener SiteInfo:", error);
        res.status(500).json({ message: "Error al cargar la información del sitio" });
    }
};

// Actualizar o Crear la información (Protegida)
exports.updateSiteInfo = async (req, res) => {
    try {
        console.log("📝 Recibiendo actualización de Site Info:", req.body);

        const updatedInfo = await SiteInfo.findOneAndUpdate(
            {},
            req.body,
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        console.log("✅ Site Info guardado correctamente.");
        res.json(updatedInfo);

    } catch (error) {
        console.error("❌ Error al guardar SiteInfo:", error);
        res.status(500).json({ message: "No se pudo guardar la información" });
    }
};
