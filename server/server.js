const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Cargar variables de entorno desde .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Para servir imágenes subidas

// --- CONEXIÓN A BASE DE DATOS ---

console.log("🚀 Iniciando conexión a MongoDB...");

// Usamos process.env.MONGODB_URI para leer la clave oculta del archivo .env
mongoose.connect(process.env.MONGODB_URI, {
    family: 4 // OBLIGATORIO: Fuerza IPv4 para evitar errores de red (ERR_INTERNAL_ASSERTION)
})
    .then(() => console.log('✅ MongoDB Conectado Exitosamente'))
    .catch(err => {
        console.error('❌ Error Fatal de Conexión:', err.message);
        // console.error(err); // Descomentar si necesitas ver el log técnico completo
    });

// --------------------------------

// Importar Rutas
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const offerRoutes = require('./routes/offerRoutes');
const blogRoutes = require('./routes/blogRoutes');
const infoRoutes = require('./routes/infoRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Usar Rutas
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/info', infoRoutes);
app.use('/api/contact', contactRoutes);

// Ruta base de prueba
app.get('/', (req, res) => {
    res.send('Amarilis Spa Ultimate API is Running');
});

// Iniciar Servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});