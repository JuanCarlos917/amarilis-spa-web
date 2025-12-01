const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');
const Service = require('./models/Service');
const Offer = require('./models/Offer');
const BlogPost = require('./models/BlogPost');
const SiteInfo = require('./models/SiteInfo');

dotenv.config();

const seedDatabase = async () => {
    try {
        console.log("🌱 Iniciando Siembra con Categorías Específicas...");
        await mongoose.connect(process.env.MONGODB_URI, { family: 4 });

        // Limpieza
        await User.deleteMany({});
        await Service.deleteMany({});
        await Offer.deleteMany({});
        await BlogPost.deleteMany({});
        await SiteInfo.deleteMany({});

        // Admin
        const hashedPassword = await bcrypt.hash('password123', 10);
        await User.create({
            username: "Admin Amarilis",
            email: "admin@amarilis.com",
            password: hashedPassword,
            role: 'admin',
            isAdmin: true
        });

        // Site Info
        await SiteInfo.create({
            heroTitle: "Tu Belleza, Nuestro Arte",
            heroSubtitle: "El momento que decides ser tú misma.",
            aboutText: "En Amarilis Spa nos dedicamos a curar tu cuerpo y alma. Ofrecemos una experiencia única de relajación.",
            contactPhone: "+57 313 207 4757",
            contactEmail: "info@amarilisspa.com",
            address: "Calle 14 # 11 - 30, Chía"
        });

        // --- SERVICIOS CON CATEGORÍAS EXACTAS ---
        const servicesData = [
            // 1. TRATAMIENTOS FACIALES
            {
                title: 'Limpieza Facial Profunda',
                category: 'Tratamientos Faciales', // <--- CATEGORÍA EXACTA
                duration: '1.5 Horas',
                image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
                features: ['Vaporozono', 'Extracción', 'Alta frecuencia', 'Mascarilla'],
                pricingOptions: [{ label: 'Sesión', price: 120000 }]
            },

            // 2. DEPILACIÓN
            {
                title: 'Depilación por Zonas (Cera)',
                category: 'Depilación',
                duration: 'Variable',
                image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=800&q=80',
                features: ['Cera suave', 'Cuidado piel'],
                pricingOptions: [
                    { label: 'Cara', price: 60000 },
                    { label: 'Axilas', price: 60000 },
                    { label: 'Bikini', price: 50000 },
                    { label: 'Pierna Completa', price: 80000 }
                ]
            },

            // 3. MASAJES RELAJANTES
            {
                title: 'Masaje Relajante',
                category: 'Masajes Relajantes',
                duration: '1 Hora',
                image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80',
                features: ['Técnicas manuales', 'Aromaterapia', 'Música suave'],
                pricingOptions: [{ label: 'Sesión', price: 90000 }]
            },

            // 4. COMBOS DE MASAJES (RITUALES)
            {
                title: 'Ritual Energía',
                category: 'Combos de Masajes',
                duration: '3 Horas',
                image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
                features: ['Masaje cuerpo completo', 'Sauna 45 min', 'Jacuzzi 1h', 'Bebida'],
                pricingOptions: [
                    { label: '1 Persona', price: 200000 },
                    { label: '2 Personas', price: 380000 }
                ]
            },

            // 5. PAQUETES REDUCTORES
            {
                title: 'Paquete Reductor Pro',
                category: 'Paquetes Reductores',
                duration: '1 Hora',
                image: 'https://images.unsplash.com/photo-1519823551278-64ac927accc9?auto=format&fit=crop&w=800&q=80',
                features: ['Maderoterapia', 'Cavitación', 'Radiofrecuencia', '12 Sesiones'],
                pricingOptions: [
                    { label: 'Por Sesión', price: 90000 },
                    { label: 'Paquete Completo', price: 900000 }
                ]
            },

            // 6. SPA NIÑOS
            {
                title: 'Combo Princess',
                category: 'Spa Niños',
                duration: '2 Horas',
                image: 'https://images.unsplash.com/photo-1596178060671-7a8d2a6b4c22?auto=format&fit=crop&w=800&q=80',
                features: ['Jacuzzi', 'Peinado', 'Manicure'],
                pricingOptions: [{ label: 'Por Niña', price: 100000 }]
            },

            // 7. ZONAS HÚMEDAS
            {
                title: 'Jacuzzi Hidromasaje',
                category: 'Zonas Húmedas',
                duration: '1 Hora',
                image: 'https://images.unsplash.com/photo-1531862590793-272bd8450e8d?auto=format&fit=crop&w=800&q=80',
                features: ['Hidromasaje', 'Privado'],
                pricingOptions: [{ label: 'Por Persona', price: 50000 }]
            },

            // 8. CEJAS Y PESTAÑAS
            {
                title: 'Diseño de Cejas & Henna',
                category: 'Cejas y Pestañas',
                duration: '45 Min',
                image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80',
                features: ['Visagismo', 'Depilación', 'Pigmentación'],
                pricingOptions: [
                    { label: 'Solo Depilación', price: 20000 },
                    { label: 'Con Henna', price: 40000 }
                ]
            },
            {
                title: 'Lifting de Pestañas',
                category: 'Cejas y Pestañas',
                duration: '1 Hora',
                image: 'https://images.unsplash.com/photo-1583001931096-959e9ad7b535?auto=format&fit=crop&w=800&q=80',
                features: ['Rizado natural', 'Tinte negro'],
                pricingOptions: [{ label: 'Sesión', price: 70000 }]
            },

            // 9. UÑAS
            {
                title: 'Manicure Semipermanente',
                category: 'Uñas',
                duration: '1.5 Horas',
                image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
                features: ['Limpieza rusa', 'Esmaltado gel', 'Duración 15+ días'],
                pricingOptions: [{ label: 'Manos', price: 60000 }]
            },

            // 10. PELUQUERÍA
            {
                title: 'Corte y Cepillado',
                category: 'Peluquería',
                duration: '1 Hora',
                image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80',
                features: ['Lavado capilar', 'Corte puntas', 'Blower'],
                pricingOptions: [
                    { label: 'Corte Bordado', price: 40000 },
                    { label: 'Cepillado', price: 30000 }
                ]
            },

            // 11. MAQUILLAJE
            {
                title: 'Maquillaje Social',
                category: 'Maquillaje',
                duration: '1 Hora',
                image: 'https://images.unsplash.com/photo-1487412947132-28c53b29153f?auto=format&fit=crop&w=800&q=80',
                features: ['Preparación piel', 'Pestañas postizas', 'Larga duración'],
                pricingOptions: [{ label: 'Sesión', price: 90000 }]
            }
        ];

        await Service.insertMany(servicesData);
        console.log(`✨ ${servicesData.length} Servicios creados.`);
        console.log("✅ BASE DE DATOS COMPLETAMENTE RESTAURADA.");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error seed:", error);
        process.exit(1);
    }
};
seedDatabase();